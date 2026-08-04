"use client";

import Link from "next/link";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";

export function TrainSessionComplete({
  sessionId,
  sessionName,
}: {
  sessionId: string;
  sessionName: string;
}) {
  const { progress, markTrainComplete } = useDailyWorkflowProgress();
  const done = progress.trainCompleted && progress.trainSessionId === sessionId;

  return (
    <div className="grid grid-cols-2 gap-2">
      <Link
        href="/music"
        className="rounded-full border border-border py-3 text-center text-sm font-semibold"
      >
        Pick music
      </Link>
      {done ? (
        <Link
          href="/check-in"
          className="rounded-full bg-[#2563eb] py-3 text-center text-sm font-bold text-white"
        >
          Check-in →
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => markTrainComplete(sessionId)}
          className="rounded-full bg-accent py-3 text-center text-sm font-bold text-white"
        >
          Complete {sessionName.split(" ")[0]}
        </button>
      )}
    </div>
  );
}
