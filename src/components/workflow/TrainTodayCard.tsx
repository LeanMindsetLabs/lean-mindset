"use client";

import Link from "next/link";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";

export function TrainTodayCard({
  sessionId,
  name,
  duration,
  level,
  focus,
}: {
  sessionId: string;
  name: string;
  duration: string;
  level: string;
  focus: string;
}) {
  const { progress, markTrainComplete } = useDailyWorkflowProgress();
  const isToday = progress.trainSessionId === sessionId || !progress.trainSessionId;
  const done = progress.trainCompleted && progress.trainSessionId === sessionId;

  if (!isToday && progress.trainCompleted) return null;

  return (
    <section
      className={`rounded-[18px] border p-3.5 ${
        done
          ? "border-[#2563eb]/35 bg-[#2563eb]/10"
          : "border-[#64748b]/28 bg-[#0d1118]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#60a5fa]">
            {done ? "Completed today" : "Today's Workout Session"}
          </p>
          <p className="mt-1 font-semibold text-white">{name}</p>
          <p className="text-[10px] text-[#64748b]">
            {duration} · {level} · {focus}
          </p>
        </div>
        {done ? (
          <span className="rounded-full bg-[#2563eb] px-2 py-0.5 text-[10px] font-bold text-white">
            ✓
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex gap-2">
        {!done ? (
          <>
            <Link
              href={`/train/${sessionId}`}
              className="flex-1 rounded-full bg-[#2563eb] py-2.5 text-center text-xs font-bold text-white"
            >
              Start session
            </Link>
            <button
              type="button"
              onClick={() => markTrainComplete(sessionId)}
              className="rounded-full border border-[#64748b]/40 px-3 py-2.5 text-xs font-semibold text-[#94a3b8]"
            >
              Mark done
            </button>
          </>
        ) : (
          <Link
            href="/check-in"
            className="flex-1 rounded-full border border-[#2563eb]/40 py-2.5 text-center text-xs font-bold text-[#60a5fa]"
          >
            Log in check-in →
          </Link>
        )}
      </div>
    </section>
  );
}
