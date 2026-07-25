import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { CheckInChat } from "@/components/CheckInChat";
import { WeightSparkline } from "@/components/WeightSparkline";
import {
  listMessages,
  listWeightHistory,
} from "@/app/check-in/actions";
import { requireCoach } from "@/lib/auth/role";
import { createClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ conversationId: string }> };

export default async function CoachThreadPage({ params }: Props) {
  const coach = await requireCoach();
  if (!coach) redirect("/");

  const { conversationId } = await params;
  const supabase = await createClient();

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id, client_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (!conversation) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", conversation.client_id)
    .maybeSingle();

  const label =
    profile?.full_name?.trim() || profile?.email || "Client";

  const [{ messages, error }, { weights }] = await Promise.all([
    listMessages(conversationId),
    listWeightHistory(conversationId),
  ]);

  return (
    <div>
      <div className="mb-2">
        <Link href="/coach" className="text-xs font-semibold text-accent">
          ← Cohort board
        </Link>
      </div>
      <div className="mb-3 rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-2.5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-subtle">
          Weight
        </p>
        <WeightSparkline weights={weights} label={`${label} weight trend`} />
      </div>
      {error && <p className="mb-2 text-xs text-danger">{error}</p>}
      <CheckInChat
        conversationId={conversationId}
        currentUserId={coach.userId}
        initialMessages={messages}
        title={label}
        subtitle="Check-in thread"
        showTemplateChip={false}
      />
    </div>
  );
}
