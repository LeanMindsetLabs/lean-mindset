import Link from "next/link";
import { nutritionRingsMock } from "@/data/dashboard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { HorizontalBar } from "@/components/ui/Charts";
import { getMemberMetrics } from "@/lib/member-metrics";
import { DEFAULT_MEAL_SCHEDULE } from "@/lib/workflow/meal-schedule";
import { DailyWorkflowStrip } from "@/components/workflow/DailyWorkflow";
import { MealsDaySection } from "@/components/workflow/MealsDaySection";
import { NutritionMealStats } from "@/components/workflow/NutritionMealStats";

/** Sandow-style nutrition + honest recovery card — compact phone viewport */
export default async function NutritionPage() {
  const metrics = await getMemberMetrics();
  const mealsDone = metrics.mealsCount || nutritionRingsMock.mealsDone;
  const waterPct =
    metrics.water != null
      ? Math.min(100, Math.round((metrics.water / 3.5) * 100))
      : nutritionRingsMock.waterPct;

  const kcalCurrent = 900 + mealsDone * 350;
  const kcalTarget = 2200;
  const kcalPct = Math.min(100, Math.round((kcalCurrent / kcalTarget) * 100));

  const protein = { value: 23 + mealsDone * 28, max: 140 };
  const fat = { value: 15 + mealsDone * 8, max: 65 };
  const carbs = { value: 45 + mealsDone * 40, max: 180 };

  const recoveryScore = 84;
  const recoveryHrs = "7 hr 10 min";

  return (
    <div className="flex flex-col gap-3 pt-1">
      <DailyWorkflowStrip active="meals" />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Meals</h1>
          <p className="text-xs text-foreground-muted">Today · your meal plan</p>
        </div>
        <Link href="/program/eating-schedule" className="text-xs font-semibold text-accent">
          Lab guide →
        </Link>
      </header>

      <section className="rounded-2xl border border-border bg-background-card p-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <ProgressRing
              percent={kcalPct}
              size={112}
              stroke={11}
              label={kcalCurrent.toLocaleString()}
              sublabel="kcal"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent">
              Target {kcalTarget.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-foreground-muted">
              {kcalPct >= 85 && kcalPct <= 110
                ? "You're on track for your calorie goal today — keep it up."
                : kcalPct < 85
                  ? "Room left in today's fuel budget."
                  : "Slightly over target — fine if protein is solid."}
            </p>
            <Link href="/check-in" className="mt-2 inline-flex text-xs font-bold text-accent">
              Log meals →
            </Link>
          </div>
        </div>
        <div className="mt-4 space-y-2.5">
          <HorizontalBar label="Protein" value={protein.value} max={protein.max} unit="g" color="var(--accent)" />
          <HorizontalBar label="Fat" value={fat.value} max={fat.max} unit="g" color="#fbbf24" />
          <HorizontalBar label="Carbs" value={carbs.value} max={carbs.max} unit="g" color="#3b82f6" />
        </div>
      </section>

      <NutritionMealStats
        waterPct={waterPct}
        initialDone={mealsDone}
        initialTarget={DEFAULT_MEAL_SCHEDULE.length}
      />

      <section className="rounded-2xl border border-border bg-background-card p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
              Recovery / rest
            </p>
            <p className="mt-1 text-2xl font-bold">{recoveryHrs}</p>
            <p className="mt-0.5 text-xs text-foreground-muted">
              Suggested rest window · not from a sleep tracker
            </p>
          </div>
          <div className="rounded-xl bg-emerald-500/15 px-2.5 py-1.5 text-center">
            <p className="text-lg font-bold text-emerald-400">{recoveryScore}</p>
            <p className="text-[9px] font-semibold uppercase text-emerald-400/80">score</p>
          </div>
        </div>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full">
          <div className="w-[12%] bg-foreground-subtle" title="Awake" />
          <div className="w-[22%] bg-accent" title="Active rest" />
          <div className="w-[38%] bg-sky-600" title="Deep rest" />
          <div className="w-[28%] bg-sky-400/70" title="Light rest" />
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-foreground-muted">
          <span>Wind-down 22:30</span>
          <span>Wake target 06:00</span>
        </div>
      </section>

      <MealsDaySection initialDone={mealsDone} />
    </div>
  );
}
