"use client";

import { useEffect, useMemo, useState } from "react";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useDailyWorkflowProgress, useMealScheduleStore } from "@/hooks/useDailyWorkflowProgress";
import { DEFAULT_MEAL_SCHEDULE, parseMealTime } from "@/lib/workflow/meal-schedule";
import { ClientOnly } from "@/components/workflow/ClientOnly";

function StatsPlaceholder({
  waterPct,
  mealsDone,
  mealsTarget,
}: {
  waterPct: number;
  mealsDone: number;
  mealsTarget: number;
}) {
  const first = DEFAULT_MEAL_SCHEDULE[0];
  const pct = mealsTarget ? (mealsDone / mealsTarget) * 100 : 0;

  return (
    <section className="flex items-center gap-3 rounded-2xl border border-border bg-background-elevated p-3">
      <ProgressRing
        percent={pct}
        size={64}
        stroke={7}
        label={`${mealsDone}/${mealsTarget}`}
        sublabel="meals"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase text-accent">Next meal</p>
        <p className="truncate text-sm font-bold">{first?.label ?? "Breakfast"}</p>
        <p className="font-display text-xl text-accent">{first?.time ?? "8:00 AM"}</p>
      </div>
      <span className="text-[10px] text-foreground-muted">Water {waterPct}%</span>
    </section>
  );
}

function StatsLive({
  waterPct,
  initialDone,
  initialTarget,
}: {
  waterPct: number;
  initialDone: number;
  initialTarget: number;
}) {
  const schedule = useMealScheduleStore();
  const { mealsDone, mealsTarget } = useDailyWorkflowProgress();
  const [nowMins, setNowMins] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNowMins(new Date().getHours() * 60 + new Date().getMinutes());
    update();
  }, []);

  const done = mealsDone || initialDone;
  const target = mealsTarget || initialTarget;

  const nextMeal = useMemo(() => {
    if (nowMins == null) return schedule[0] ?? null;
    return schedule.find((m) => parseMealTime(m.time) > nowMins) ?? schedule[0] ?? null;
  }, [schedule, nowMins]);

  return (
    <section className="flex items-center gap-3 rounded-2xl border border-border bg-background-elevated p-3">
      <ProgressRing
        percent={target ? (done / target) * 100 : 0}
        size={64}
        stroke={7}
        label={`${done}/${target}`}
        sublabel="meals"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase text-accent">Next meal</p>
        {nextMeal ? (
          <>
            <p className="truncate text-sm font-bold">{nextMeal.label}</p>
            <p className="font-display text-xl text-accent">{nextMeal.time}</p>
          </>
        ) : (
          <p className="text-sm text-foreground-muted">Plan your day</p>
        )}
      </div>
      <span className="text-[10px] text-foreground-muted">Water {waterPct}%</span>
    </section>
  );
}

export function NutritionMealStats({
  waterPct,
  initialDone = 0,
  initialTarget = DEFAULT_MEAL_SCHEDULE.length,
}: {
  waterPct: number;
  initialDone?: number;
  initialTarget?: number;
}) {
  return (
    <ClientOnly
      fallback={
        <StatsPlaceholder
          waterPct={waterPct}
          mealsDone={initialDone}
          mealsTarget={initialTarget}
        />
      }
    >
      <StatsLive
        waterPct={waterPct}
        initialDone={initialDone}
        initialTarget={initialTarget}
      />
    </ClientOnly>
  );
}
