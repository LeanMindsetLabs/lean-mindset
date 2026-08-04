"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile, requireCoach } from "@/lib/auth/role";
import {
  hasParsedMetrics,
  softParseCheckIn,
} from "@/lib/checkin/parse";

export type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type ConversationRow = {
  id: string;
  client_id: string;
  cohort_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CheckInRow = {
  id: string;
  message_id: string;
  user_id: string;
  conversation_id: string;
  check_in_day: number | null;
  weight_lb: number | null;
  change_lb: number | null;
  total_change_lb: number | null;
  bm: number | null;
  water: number | null;
  meals: string[];
  created_at: string;
};

export type CohortBoardStatus = "sent_today" | "missing" | "needs_reply";

export type CohortBoardItem = {
  user_id: string;
  conversation_id: string | null;
  client_name: string | null;
  client_email: string | null;
  last_check_in_at: string | null;
  day: number | null;
  weight_lb: number | null;
  change_lb: number | null;
  water: number | null;
  statuses: CohortBoardStatus[];
};

async function ensureDefaultCohortMembership(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
): Promise<string | null> {
  const { data: existing } = await supabase
    .from("cohort_members")
    .select("cohort_id")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();

  if (existing?.cohort_id) return existing.cohort_id as string;

  const { data: cohort } = await supabase
    .from("cohorts")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!cohort?.id) return null;

  await supabase.from("cohort_members").upsert(
    { cohort_id: cohort.id, user_id: userId },
    { onConflict: "cohort_id,user_id" },
  );

  return cohort.id as string;
}

/** Get or create the signed-in client's conversation. */
export async function ensureClientConversation(): Promise<{
  conversation: ConversationRow | null;
  error?: string;
}> {
  const session = await getSessionProfile();
  if (!session) return { conversation: null, error: "Not signed in." };

  const supabase = await createClient();
  const cohortId = await ensureDefaultCohortMembership(supabase, session.userId);

  const { data: existing } = await supabase
    .from("conversations")
    .select("id, client_id, cohort_id, created_at, updated_at")
    .eq("client_id", session.userId)
    .maybeSingle();

  if (existing) {
    if (!existing.cohort_id && cohortId) {
      await supabase
        .from("conversations")
        .update({ cohort_id: cohortId })
        .eq("id", existing.id);
      return {
        conversation: { ...existing, cohort_id: cohortId } as ConversationRow,
      };
    }
    return { conversation: existing as ConversationRow };
  }

  const { data: created, error } = await supabase
    .from("conversations")
    .insert({
      client_id: session.userId,
      cohort_id: cohortId,
    })
    .select("id, client_id, cohort_id, created_at, updated_at")
    .single();

  if (error) return { conversation: null, error: error.message };
  return { conversation: created as ConversationRow };
}

export async function listMessages(
  conversationId: string,
): Promise<{ messages: MessageRow[]; error?: string }> {
  const session = await getSessionProfile();
  if (!session) return { messages: [], error: "Not signed in." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, body, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return { messages: [], error: error.message };
  return { messages: (data ?? []) as MessageRow[] };
}

async function trySoftParseCheckIn(
  supabase: Awaited<ReturnType<typeof createClient>>,
  opts: {
    messageId: string;
    conversationId: string;
    userId: string;
    body: string;
  },
): Promise<void> {
  try {
    const parsed = softParseCheckIn(opts.body);
    if (!parsed || !hasParsedMetrics(parsed)) return;

    const { error } = await supabase.from("check_ins").insert({
      message_id: opts.messageId,
      user_id: opts.userId,
      conversation_id: opts.conversationId,
      check_in_day: parsed.day,
      weight_lb: parsed.weightLb,
      change_lb: parsed.changeLb,
      total_change_lb: parsed.totalChangeLb,
      bm: parsed.bm,
      water: parsed.water,
      meals: parsed.meals,
    });
    // Ignore parse/insert failures - raw message already saved
    void error;
  } catch {
    // Soft-parse must never block send
  }
}

export async function sendMessage(
  conversationId: string,
  body: string,
): Promise<{ message: MessageRow | null; error?: string }> {
  const trimmed = body.trim();
  if (!trimmed) return { message: null, error: "Message is empty." };

  const session = await getSessionProfile();
  if (!session) return { message: null, error: "Not signed in." };

  const supabase = await createClient();

  const { data: conv, error: convError } = await supabase
    .from("conversations")
    .select("id, client_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (convError || !conv) {
    return { message: null, error: convError?.message ?? "Conversation not found." };
  }

  const isOwner = conv.client_id === session.userId;
  const isCoach =
    session.profile?.role === "coach" &&
    (await requireCoach()) !== null;

  if (!isOwner && !isCoach) {
    return { message: null, error: "Not allowed to send in this conversation." };
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: session.userId,
      body: trimmed,
    })
    .select("id, conversation_id, sender_id, body, created_at")
    .single();

  if (error) return { message: null, error: error.message };

  await supabase
    .from("conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  // Soft-parse client check-ins only (never block on failure)
  if (isOwner && data) {
    await trySoftParseCheckIn(supabase, {
      messageId: data.id,
      conversationId,
      userId: session.userId,
      body: trimmed,
    });
  }

  revalidatePath("/check-in");
  revalidatePath("/coach");
  revalidatePath(`/coach/${conversationId}`);

  return { message: data as MessageRow };
}

export type InboxItem = {
  id: string;
  client_id: string;
  updated_at: string;
  client_name: string | null;
  client_email: string | null;
  last_body: string | null;
};

export async function listCoachInbox(): Promise<{
  items: InboxItem[];
  error?: string;
}> {
  const coach = await requireCoach();
  if (!coach) return { items: [], error: "Coach access required." };

  const supabase = await createClient();
  const { data: conversations, error } = await supabase
    .from("conversations")
    .select("id, client_id, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return { items: [], error: error.message };
  if (!conversations?.length) return { items: [] };

  const clientIds = conversations.map((c) => c.client_id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", clientIds);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id as string, p]),
  );

  const items: InboxItem[] = [];
  for (const conv of conversations) {
    const { data: last } = await supabase
      .from("messages")
      .select("body")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const profile = profileMap.get(conv.client_id);
    items.push({
      id: conv.id,
      client_id: conv.client_id,
      updated_at: conv.updated_at,
      client_name: profile?.full_name ?? null,
      client_email: profile?.email ?? null,
      last_body: last?.body ?? null,
    });
  }

  return { items };
}

function startOfLocalDayIso(d = new Date()): string {
  const local = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return local.toISOString();
}

/** Cohort board: all members + last parsed check-in + status badges. */
export async function listCoachCohortBoard(): Promise<{
  items: CohortBoardItem[];
  error?: string;
}> {
  const coach = await requireCoach();
  if (!coach) return { items: [], error: "Coach access required." };

  const supabase = await createClient();

  const { data: cohorts, error: cohortErr } = await supabase
    .from("cohorts")
    .select("id")
    .eq("coach_id", coach.userId);

  if (cohortErr) return { items: [], error: cohortErr.message };
  if (!cohorts?.length) return { items: [] };

  const cohortIds = cohorts.map((c) => c.id as string);
  const { data: members, error: memErr } = await supabase
    .from("cohort_members")
    .select("user_id, cohort_id")
    .in("cohort_id", cohortIds);

  if (memErr) return { items: [], error: memErr.message };
  if (!members?.length) return { items: [] };

  const userIds = [...new Set(members.map((m) => m.user_id as string))];

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", userIds);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id as string, p]),
  );

  const { data: conversations } = await supabase
    .from("conversations")
    .select("id, client_id")
    .in("client_id", userIds);

  const convByClient = new Map(
    (conversations ?? []).map((c) => [c.client_id as string, c.id as string]),
  );

  const dayStart = startOfLocalDayIso();
  const items: CohortBoardItem[] = [];

  for (const userId of userIds) {
    const profile = profileMap.get(userId);
    const conversationId = convByClient.get(userId) ?? null;

    let lastCheckIn: {
      created_at: string;
      check_in_day: number | null;
      weight_lb: number | null;
      change_lb: number | null;
      water: number | null;
    } | null = null;

    let lastMessage: { sender_id: string; created_at: string } | null = null;
    let clientMessageToday = false;

    if (conversationId) {
      const { data: checkIn } = await supabase
        .from("check_ins")
        .select(
          "created_at, check_in_day, weight_lb, change_lb, water",
        )
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (checkIn) lastCheckIn = checkIn;

      const { data: lastMsg } = await supabase
        .from("messages")
        .select("sender_id, created_at")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lastMsg) lastMessage = lastMsg;

      const { data: todayClientMsg } = await supabase
        .from("messages")
        .select("id")
        .eq("conversation_id", conversationId)
        .eq("sender_id", userId)
        .gte("created_at", dayStart)
        .limit(1)
        .maybeSingle();

      clientMessageToday = Boolean(todayClientMsg);
    }

    const statuses: CohortBoardStatus[] = [];
    if (clientMessageToday || (lastCheckIn && lastCheckIn.created_at >= dayStart)) {
      statuses.push("sent_today");
    } else {
      statuses.push("missing");
    }
    if (
      lastMessage &&
      lastMessage.sender_id === userId
    ) {
      statuses.push("needs_reply");
    }

    items.push({
      user_id: userId,
      conversation_id: conversationId,
      client_name: profile?.full_name ?? null,
      client_email: profile?.email ?? null,
      last_check_in_at: lastCheckIn?.created_at ?? null,
      day: lastCheckIn?.check_in_day ?? null,
      weight_lb:
        lastCheckIn?.weight_lb != null
          ? Number(lastCheckIn.weight_lb)
          : null,
      change_lb:
        lastCheckIn?.change_lb != null
          ? Number(lastCheckIn.change_lb)
          : null,
      water:
        lastCheckIn?.water != null ? Number(lastCheckIn.water) : null,
      statuses,
    });
  }

  items.sort((a, b) => {
    const aNeed = a.statuses.includes("needs_reply") ? 0 : 1;
    const bNeed = b.statuses.includes("needs_reply") ? 0 : 1;
    if (aNeed !== bNeed) return aNeed - bNeed;
    const aMiss = a.statuses.includes("missing") ? 0 : 1;
    const bMiss = b.statuses.includes("missing") ? 0 : 1;
    if (aMiss !== bMiss) return aMiss - bMiss;
    return (a.client_name || a.client_email || "").localeCompare(
      b.client_name || b.client_email || "",
    );
  });

  return { items };
}

/** Parsed weight history for sparkline (oldest → newest). */
export async function listWeightHistory(
  conversationId: string,
  limit = 30,
): Promise<{ weights: number[]; error?: string }> {
  const session = await getSessionProfile();
  if (!session) return { weights: [], error: "Not signed in." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("check_ins")
    .select("weight_lb, created_at")
    .eq("conversation_id", conversationId)
    .not("weight_lb", "is", null)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) return { weights: [], error: error.message };

  const weights = (data ?? [])
    .map((r) => Number(r.weight_lb))
    .filter((n) => Number.isFinite(n));

  return { weights };
}
