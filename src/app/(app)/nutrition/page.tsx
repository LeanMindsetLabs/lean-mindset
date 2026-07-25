import Link from "next/link";
import { eatingSchedule } from "@/data/program";
import { nutritionRingsMock } from "@/data/dashboard";
import { ProgressRing, MiniRing } from "@/components/ui/ProgressRing";
import { CalorieGauge, MacroGauges, WeekBars } from "@/components/ui/Charts";
import { ImageBanner } from "@/components/ui/VisualKit";
import { getMemberMetrics } from "@/lib/member-metrics";
import { media } from "@/lib/media";
import { weekAdherence } from "@/data/dashboard";

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

  const nowHour = new Date().getHours();
  const nextMeal =
    eatingSchedule.meals.find((m) => {
      const h = Number.parseInt(m.time, 10);
      const isPm = /pm/i.test(m.time) && h !== 12;
      const hour24 = isPm ? h + 12 : h === 12 && /am/i.test(m.time) ? 0 : h;
      return hour24 > nowHour;
    }) ?? eatingSchedule.meals[0];

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Nutrition</h1>
        <p className="text-sm text-foreground-muted">Today · 4-meal precision</p>
      </header>

      <ImageBanner
        src={media.ui.nutrition}
        position="35% 15%"
        heightClass="aspect-[21/9] min-h-[110px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
          Fuel day
        </p>
        <p className="text-sm font-semibold text-white">Macros · timing · water</p>
      </ImageBanner>

      <section className="lm-fade-in rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-5">
        <CalorieGauge
          current={kcalCurrent}
          target={kcalTarget}
          proteinPct={38}
          carbsPct={37}
          fatPct={25}
        />
      </section>

      <section className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, rgba(255,107,0,0.35), transparent 50%)",
          }}
        />
        <div className="relative flex items-center gap-5">
          <ProgressRing
            percent={(mealsDone / mealsTarget) * 100}
            label={`${mealsDone}/${mealsTarget}`}
            sublabel="meals"
          />
          <div>
            <p className="text-xs font-semibold uppercase text-accent">When to eat</p>
            <p className="mt-1 text-lg font-bold">
              {nextMeal.name.replace(/^Meal \d+ — /, "")}
            </p>
            <p className="font-display text-2xl text-accent">{nextMeal.time}</p>
            <p className="mt-1 text-xs text-foreground-muted">{nextMeal.focus}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-3 text-sm font-semibold">Macro gauges</h2>
        <MacroGauges
          macros={[
            { label: "Protein", value: 78, max: 140, color: "#ff6b00" },
            { label: "Carbs", value: 95, max: 180, color: "#3b82f6" },
            { label: "Fat", value: 32, max: 65, color: "#fbbf24" },
          ]}
        />
      </section>

      <section className="grid grid-cols-3 gap-2">
        {[
          { label: "Protein", pct: nutritionRingsMock.proteinPct },
          { label: "Water", pct: waterPct },
          { label: "Timing", pct: nutritionRingsMock.timingPct },
        ].map((r) => (
          <div
            key={r.label}
            className="flex flex-col items-center rounded-[var(--lm-radius-md)] border border-border bg-background-elevated py-3"
          >
            <div className="relative">
              <MiniRing percent={r.pct} size={64} stroke={7} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                {Math.round(r.pct)}%
              </span>
            </div>
            <p className="mt-2 text-[10px] uppercase text-foreground-muted">{r.label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Weekly fuel adherence</h2>
          <span className="text-[10px] text-foreground-subtle">%</span>
        </div>
        <WeekBars data={weekAdherence} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">Today&apos;s schedule</h2>
        {eatingSchedule.meals.map((meal, i) => {
          const done = i < mealsDone;
          const thumbs = [
            media.marketing.lifestyle,
            media.ui.recipe1,
            media.ui.recipe2,
            media.ui.nutrition,
          ];
          return (
            <article
              key={meal.name}
              className={`overflow-hidden rounded-[var(--lm-radius-lg)] border ${
                done ? "border-accent/50" : "border-border"
              } bg-background-card`}
            >
              <div className="relative h-16 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbs[i % thumbs.length]}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ objectPosition: `${20 + i * 15}% ${30 + i * 10}%` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: done
                      ? "linear-gradient(90deg,rgba(255,107,0,0.55),transparent)"
                      : "linear-gradient(90deg,rgba(0,0,0,0.65),transparent)",
                  }}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-display text-2xl text-white">
                  {i + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold">
                      {meal.name.replace(/^Meal \d+ — /, "")}
                    </h3>
                    <span className="shrink-0 text-xs font-bold text-accent">{meal.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-foreground-muted">{meal.focus}</p>
                  <p className="mt-1 line-clamp-1 text-[11px] text-foreground-subtle">
                    {meal.example}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <Link href="/program/eating-schedule" className="text-center text-sm text-accent">
        Full schedule + swaps →
      </Link>
      <Link
        href="/check-in"
        className="rounded-full bg-accent py-3 text-center text-sm font-bold text-white"
      >
        Log meals in check-in
      </Link>
    </div>
  );
}
