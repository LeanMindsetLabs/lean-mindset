"use client";

import { useState } from "react";
import {
  DEFAULT_MEAL_SCHEDULE,
  MEAL_TYPE_FOCUS,
} from "@/lib/workflow/meal-schedule";
import { useDailyWorkflowProgress, useMealScheduleStore } from "@/hooks/useDailyWorkflowProgress";
import { media, recipeThumbs } from "@/lib/media";
import { ClientOnly } from "@/components/workflow/ClientOnly";
import { BowlLibrarySheet } from "@/components/workflow/BowlLibrarySheet";
import { MealsWorkflowList } from "@/components/workflow/MealsWorkflowList";
import { MealScheduleEditor } from "@/components/workflow/MealScheduleEditor";

function MealsDaySectionSkeleton({ initialDone = 0 }: { initialDone?: number }) {
  const target = DEFAULT_MEAL_SCHEDULE.length;
  return (
    <section>
      <div className="mb-2 flex items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Today&apos;s meals</h2>
          <p className="mt-0.5 text-[11px] text-foreground-muted">Loading your meal plan…</p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-[#60a5fa]">
          {initialDone}/{target} logged
        </span>
      </div>
    </section>
  );
}

function MealsDaySectionLive({ initialDone = 0 }: { initialDone?: number }) {
  const schedule = useMealScheduleStore();
  const { mealsDone, mealsTarget } = useDailyWorkflowProgress();
  const [planOpen, setPlanOpen] = useState(false);
  const [bowlsOpen, setBowlsOpen] = useState(false);

  const done = mealsDone || initialDone;
  const target = mealsTarget;

  const meals = schedule.map((slot, i) => ({
    id: slot.id,
    label: slot.label,
    focus: MEAL_TYPE_FOCUS[slot.type],
    time: slot.time,
    thumb: recipeThumbs[i % recipeThumbs.length] ?? media.cards.mealEggs,
  }));

  return (
    <section>
      <div className="mb-2 flex items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Today&apos;s meals</h2>
          <p className="mt-0.5 text-[11px] text-foreground-muted">
            <button
              type="button"
              onClick={() => setBowlsOpen(true)}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              My bowls
            </button>
            {" · "}
            Tap <span className="font-semibold text-accent">Log meal</span> or{" "}
            <button
              type="button"
              onClick={() => setPlanOpen((v) => !v)}
              className="font-semibold text-accent underline-offset-2 hover:underline"
            >
              plan your day
            </button>
            .
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-[#60a5fa]">
          {done}/{target} logged
        </span>
      </div>

      {planOpen ? (
        <div className="mb-3">
          <MealScheduleEditor onClose={() => setPlanOpen(false)} />
        </div>
      ) : null}

      <MealsWorkflowList initialDone={initialDone} meals={meals} />
      <BowlLibrarySheet open={bowlsOpen} onClose={() => setBowlsOpen(false)} />
    </section>
  );
}

export function MealsDaySection({ initialDone = 0 }: { initialDone?: number }) {
  return (
    <ClientOnly fallback={<MealsDaySectionSkeleton initialDone={initialDone} />}>
      <MealsDaySectionLive initialDone={initialDone} />
    </ClientOnly>
  );
}
