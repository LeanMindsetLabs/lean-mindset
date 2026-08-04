"use client";

import Link from "next/link";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";

export function TodayWorkflowSummary() {
  const { progress, mealsDone, mealsTarget } = useDailyWorkflowProgress();

  return (
    <section className="rounded-[14px] border border-border bg-background-card p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
          Today&apos;s loop
        </p>
        {progress.checkInSent ? (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
            Sent ✓
          </span>
        ) : null}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <Link
          href="/nutrition"
          className="rounded-[10px] border border-[#2563eb]/25 bg-[#2563eb]/8 px-2.5 py-2 transition hover:border-[#2563eb]/45"
        >
          <p className="font-bold text-white">
            Meals {mealsDone}/{mealsTarget}
          </p>
          <p className="text-[10px] text-foreground-muted">Tap to log</p>
        </Link>
        <Link
          href="/train"
          className="rounded-[10px] border border-border bg-background-elevated px-2.5 py-2 transition hover:border-accent/40"
        >
          <p className="font-bold text-white">
            Train {progress.trainCompleted ? "✓" : "—"}
          </p>
          <p className="text-[10px] text-foreground-muted">
            {progress.trainCompleted ? "Done today" : "Not logged"}
          </p>
        </Link>
      </div>
    </section>
  );
}
