"use client";

import Link from "next/link";
import { CheckInChat } from "@/components/CheckInChat";
import type { MessageRow } from "@/app/check-in/actions";
import { DailyWorkflowStrip } from "@/components/workflow/DailyWorkflow";
import { TodayWorkflowSummary } from "@/components/workflow/TodayWorkflowSummary";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";
import {
  buildCheckInMessage,
  defaultCheckInMetrics,
  type CheckInDraftMetrics,
} from "@/lib/checkin/template";

type AuthProps = {
  mode: "auth";
  conversationId: string;
  currentUserId: string;
  initialMessages: MessageRow[];
  day: number;
  labName: string;
};

type GuestProps = {
  mode: "guest";
  day?: number;
  labName?: string;
};

export function CheckInWorkflowScreen(props: AuthProps | GuestProps) {
  const { progress, mealsDone, mealsTarget, markCheckInSent } = useDailyWorkflowProgress();
  const day = props.mode === "auth" ? props.day : (props.day ?? 12);
  const labName = props.mode === "auth" ? props.labName : (props.labName ?? "Summer Lab");

  const metrics: CheckInDraftMetrics = defaultCheckInMetrics({
    day,
    labName,
    mealsDone,
    mealsTarget,
    trainDone: progress.trainCompleted,
  });

  const previewMessage = buildCheckInMessage(metrics);

  if (props.mode === "guest") {
    return (
      <div className="flex flex-col gap-3">
        <DailyWorkflowStrip active="checkin" />
        <TodayWorkflowSummary />
        <header>
          <h1 className="text-xl font-bold">Check-in</h1>
          <p className="text-xs text-[#94a3b8]">
            Day {day} · {labName}
          </p>
        </header>

        <section className="rounded-[16px] border border-[#64748b]/28 bg-[#0d1118] p-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
            Preview · your update looks like
          </p>
          <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-[#2563eb] px-3 py-2.5 text-xs leading-relaxed text-white whitespace-pre-wrap">
            {previewMessage}
          </div>
          <div className="mt-2 max-w-[90%] rounded-2xl rounded-tl-sm bg-[#1a2438] px-3 py-2.5 text-xs text-[#94a3b8]">
            Solid day - log in to send this to your coach and get feedback.
          </div>
        </section>

        <Link
          href="/login?next=/check-in"
          className="rounded-full bg-[#2563eb] py-3 text-center text-sm font-bold text-white"
        >
          Log in to send check-in
        </Link>
        <p className="text-center text-[10px] text-[#64748b]">
          Meals & train progress sync from today&apos;s workflow screens.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <DailyWorkflowStrip active="checkin" />
      <TodayWorkflowSummary />
      <CheckInChat
        conversationId={props.conversationId}
        currentUserId={props.currentUserId}
        initialMessages={props.initialMessages}
        title="Check-in"
        subtitle={`Day ${day} · ${labName}`}
        draftMetrics={metrics}
        onSent={() => markCheckInSent()}
      />
    </div>
  );
}
