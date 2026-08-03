import { CheckInChat } from "@/components/CheckInChat";
import { WeightSparkline } from "@/components/WeightSparkline";
import {
  ensureClientConversation,
  listMessages,
  listWeightHistory,
} from "@/app/check-in/actions";
import { getSessionProfile } from "@/lib/auth/role";
import Link from "next/link";

export default async function CheckInPage() {
  const session = await getSessionProfile();

  if (!session) {
    return (
      <div className="flex min-h-[50dvh] flex-col justify-center gap-3">
        <h1 className="text-2xl font-bold">Daily check-in</h1>
        <p className="text-sm text-foreground-muted">
          Sign in to message your coach.
        </p>
        <Link
          href="/login?next=/check-in"
          className="mt-2 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          Log in
        </Link>
      </div>
    );
  }

  const { conversation, error: convError } = await ensureClientConversation();
  if (!conversation) {
    return (
      <div className="flex min-h-[50dvh] flex-col justify-center gap-2">
        <h1 className="text-2xl font-bold">Daily check-in</h1>
        <p className="text-sm text-danger">
          {convError ??
            "Could not open chat. Run supabase/checkin.sql in your project, then try again."}
        </p>
      </div>
    );
  }

  const [{ messages, error: msgError }, { weights }] = await Promise.all([
    listMessages(conversation.id),
    listWeightHistory(conversation.id),
  ]);

  return (
    <div>
      <header className="mb-3">
        <h1 className="text-xl font-bold">Check-in</h1>
        <p className="text-xs text-[#94a3b8]">Day 12 · Summer Lab</p>
      </header>
      {weights.length > 0 && (
        <div className="mb-3 rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-2.5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-subtle">
            Your weight
          </p>
          <WeightSparkline weights={weights} />
        </div>
      )}
      {msgError && (
        <p className="mb-2 text-xs text-danger">{msgError}</p>
      )}
      <CheckInChat
        conversationId={conversation.id}
        currentUserId={session.userId}
        initialMessages={messages}
      />
    </div>
  );
}
