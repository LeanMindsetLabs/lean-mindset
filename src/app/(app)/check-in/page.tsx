import Link from "next/link";
import { WeightSparkline } from "@/components/WeightSparkline";
import { CheckInWorkflowScreen } from "@/components/workflow/CheckInWorkflowScreen";
import {
  ensureClientConversation,
  listMessages,
  listWeightHistory,
} from "@/app/check-in/actions";
import { getSessionProfile } from "@/lib/auth/role";
import { dashboardMock } from "@/components/homeMock";

export default async function CheckInPage() {
  const session = await getSessionProfile();

  if (!session) {
    return <CheckInWorkflowScreen mode="guest" day={dashboardMock.day} labName="Summer Lab" />;
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
        <Link href="/home" className="text-sm text-accent">
          ← Home
        </Link>
      </div>
    );
  }

  const [{ messages, error: msgError }, { weights }] = await Promise.all([
    listMessages(conversation.id),
    listWeightHistory(conversation.id),
  ]);

  return (
    <div>
      {weights.length > 0 && (
        <div className="mb-3 rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-2.5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-subtle">
            Your weight
          </p>
          <WeightSparkline weights={weights} />
        </div>
      )}
      {msgError && <p className="mb-2 text-xs text-danger">{msgError}</p>}
      <CheckInWorkflowScreen
        mode="auth"
        conversationId={conversation.id}
        currentUserId={session.userId}
        initialMessages={messages}
        day={dashboardMock.day}
        labName="Summer Lab"
      />
    </div>
  );
}
