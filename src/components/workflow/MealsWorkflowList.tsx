"use client";

import Link from "next/link";
import { useState } from "react";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";
import { useBowlLibraryStore } from "@/hooks/useDailyWorkflowProgress";
import { MealLogSheet } from "@/components/workflow/MealLogSheet";
import {
  entryToSelection,
  selectionHasContent,
  summarizeMealLogSelection,
} from "@/lib/workflow/meal-log-selection";

type MealItem = {
  id: string;
  label: string;
  focus: string;
  time: string;
  thumb: string;
};

export function MealsWorkflowList({
  meals,
  initialDone = 0,
}: {
  meals: MealItem[];
  initialDone?: number;
}) {
  const { progress, logMeal, clearMeal } = useDailyWorkflowProgress();
  const library = useBowlLibraryStore();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeMeal = activeIndex != null ? meals[activeIndex] : null;

  return (
    <>
      <ul className="flex flex-col gap-2.5">
        {meals.map((meal, i) => {
          const entry = progress.mealLogs[i];
          const done = entry?.logged || i < initialDone;
          const summary =
            entry?.logged && selectionHasContent(entryToSelection(entry))
              ? summarizeMealLogSelection(entryToSelection(entry), library)
              : null;

          return (
            <li key={meal.id}>
              <article className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-border/80 transition hover:border-accent/50"
                  aria-label={done ? `Edit ${meal.label} log` : `Log ${meal.label}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={meal.thumb} alt="" className="h-full w-full object-cover" />
                  {done ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-[#2563eb]/75 text-lg font-bold text-white">
                      ✓
                    </span>
                  ) : (
                    <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-[8px] font-bold uppercase text-white">
                      Log
                    </span>
                  )}
                </button>
                <div
                  className={`flex min-h-12 min-w-0 flex-1 flex-col justify-center gap-1 rounded-[18px] border px-4 py-2 transition ${
                    done
                      ? "border-[#2563eb]/35 bg-[#2563eb]/10"
                      : "border-border bg-background-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold leading-tight">{meal.label}</h3>
                      <p className="truncate text-[10px] text-foreground-muted">
                        {summary ?? meal.focus}
                      </p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap text-[10px] font-medium text-foreground-muted">
                      {meal.time}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                      done
                        ? "bg-[#2563eb]/20 text-[#60a5fa]"
                        : "bg-accent text-white hover:bg-accent-hover"
                    }`}
                  >
                    {done ? "Edit log" : "Log meal"}
                  </button>
                </div>
              </article>
            </li>
          );
        })}
        <li>
          <Link
            href="/check-in"
            className="mt-1 block rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 py-2.5 text-center text-xs font-bold text-[#60a5fa]"
          >
            Send meals in daily check-in →
          </Link>
        </li>
      </ul>

      {activeMeal && activeIndex != null ? (
        <MealLogSheet
          open
          mealIndex={activeIndex}
          mealLabel={activeMeal.label}
          mealTime={activeMeal.time}
          existing={progress.mealLogs[activeIndex]}
          onClose={() => setActiveIndex(null)}
          onSave={(entry) => logMeal(activeIndex, entry)}
          onClear={() => clearMeal(activeIndex)}
        />
      ) : null}
    </>
  );
}
