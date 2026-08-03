import Link from "next/link";
import { eatingSchedule } from "@/data/program";
import { nutritionRingsMock } from "@/data/dashboard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { HorizontalBar } from "@/components/ui/Charts";
import { getMemberMetrics } from "@/lib/member-metrics";
import { media, recipeThumbs } from "@/lib/media";

/** Sandow-style nutrition + honest recovery card — compact phone viewport */
export default async function NutritionPage() {
  const metrics = await getMemberMetrics();
  const mealsDone = metrics.mealsCount || nutritionRingsMock.mealsDone;
  const mealsTarget = nutritionRingsMock.mealsTarget;
  const waterPct =
    metrics.water != null
      ? Math.min(100, Math.round((metrics.water / 3.5) * 100))
      : nutritionRingsMock.waterPct;

  const kcalCurrent = 900 + mealsDone * 420;
  const kcalTarget = 2200;
  const kcalPct = Math.min(100, Math.round((kcalCurrent / kcalTarget) * 100));

  const protein = { value: 23 + mealsDone * 28, max: 140 };
  const fat = { value: 15 + mealsDone * 8, max: 65 };
  const carbs = { value: 45 + mealsDone * 40, max: 180 };

  const nowHour = new Date().getHours();
  const nextMeal =
    eatingSchedule.meals.find((m) => {
      const h = Number.parseInt(m.time, 10);
      const isPm = /pm/i.test(m.time) && h !== 12;
      const hour24 = isPm ? h + 12 : h === 12 && /am/i.test(m.time) ? 0 : h;
      return hour24 > nowHour;
    }) ?? eatingSchedule.meals[0];

  // Honest recovery stub — not tracked sleep hardware
  const recoveryScore = 84;
  const recoveryHrs = "7 hr 10 min";

  return (
    <div className="flex flex-col gap-3 pt-1">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Meals</h1>
          <p className="text-xs text-foreground-muted">Today · 4-meal precision</p>
        </div>
        <Link href="/program/eating-schedule" className="text-xs font-semibold text-accent">
          Schedule →
        </Link>
      </header>

      {/* Calorie donut + macros */}
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

      {/* Meals + next window */}
      <section className="flex items-center gap-3 rounded-2xl border border-border bg-background-elevated p-3">
        <ProgressRing
          percent={(mealsDone / mealsTarget) * 100}
          size={64}
          stroke={7}
          label={`${mealsDone}/${mealsTarget}`}
          sublabel="meals"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase text-accent">Next meal</p>
          <p className="truncate text-sm font-bold">
            {nextMeal.name.replace(/^Meal \d+ — /, "")}
          </p>
          <p className="font-display text-xl text-accent">{nextMeal.time}</p>
        </div>
        <span className="text-[10px] text-foreground-muted">Water {waterPct}%</span>
      </section>

      {/* Recovery / rest — honest label (not device sleep) */}
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

      {/* Meal list — photo left, full-width ellipse pill */}
      <section>
        <h2 className="mb-2 text-sm font-semibold">Today&apos;s meals</h2>
        <ul className="flex flex-col gap-2.5">
          {eatingSchedule.meals.map((meal, i) => {
            const done = i < mealsDone;
            const label = meal.name.replace(/^Meal \d+ — /, "");
            return (
              <li key={meal.name}>
                <article className="flex items-center gap-2">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={recipeThumbs[i % recipeThumbs.length] ?? media.cards.mealEggs}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-full border border-border bg-background-card px-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold leading-tight">{label}</h3>
                      <p className="truncate text-[10px] text-foreground-muted">{meal.focus}</p>
                    </div>
                    <div className="shrink-0 border-l border-border/60 pl-3 text-right">
                      <p className="whitespace-nowrap text-[10px] font-medium text-foreground-muted">
                        {meal.time}
                      </p>
                      {done ? (
                        <p className="text-[9px] font-medium text-foreground-subtle">Logged</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <Link
        href="/check-in"
        className="rounded-full bg-accent py-3 text-center text-sm font-bold text-white"
      >
        Log meals in check-in
      </Link>
    </div>
  );
}
