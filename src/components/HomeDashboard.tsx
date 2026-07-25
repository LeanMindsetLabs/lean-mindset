import Link from "next/link";
import { ProgressRing, MiniRing } from "@/components/ui/ProgressRing";
import { WeekBars, SparkBars, HorizontalBar } from "@/components/ui/Charts";
import { CalendarStrip, MetricTile } from "@/components/ui/VisualKit";
import { weekAdherence, buildCalendarStrip, nutritionRingsMock } from "@/data/dashboard";
import { dashboardMock } from "@/components/homeMock";
import type { MemberMetrics } from "@/lib/member-metrics";

export function HomeDashboard({
  firstName,
  metrics,
}: {
  firstName: string;
  metrics?: MemberMetrics | null;
}) {
  const m = dashboardMock;
  const day = metrics?.day ?? m.day;
  const totalDays = m.totalDays;
  const pct = Math.min(100, Math.round((day / totalDays) * 100));
  const waterDone = metrics?.water ?? m.waterLitersDone;
  const waterTarget = m.waterLitersTarget;
  const waterLeft = Math.max(0, +(waterTarget - waterDone).toFixed(1));
  const mealsDone = metrics?.mealsCount || m.mealsDone;
  const mealsLeft = Math.max(0, m.mealsTarget - mealsDone);
  const streak = metrics?.streakHint || m.streakDays;
  const weightLabel =
    metrics?.weightLb != null ? `${metrics.weightLb}` : "—";
  const calendar = buildCalendarStrip();

  return (
    <div className="flex flex-col gap-3">
      <section className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-5">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(255,107,0,0.5), transparent 70%)",
          }}
        />
        <p className="text-sm text-foreground-muted">Good day, {firstName}</p>
        <div className="mt-4 flex items-center gap-5">
          <ProgressRing percent={pct} label={`${pct}%`} sublabel="on track" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              Lab progress
            </p>
            <p className="font-display mt-1 text-4xl leading-none">
              Day {day}
              <span className="text-lg text-foreground-muted"> / {totalDays}</span>
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              Keep the 4-meal rhythm — consistency beats perfection.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/check-in"
                className="inline-block rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover"
              >
                Daily check-in →
              </Link>
              <Link
                href="/nutrition"
                className="inline-block rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground-muted"
              >
                Nutrition
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">This week</h2>
          <span className="text-[10px] text-foreground-subtle">Adherence %</span>
        </div>
        <WeekBars data={weekAdherence} />
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Calendar</h2>
          <span className="text-[10px] text-accent">Check-ins</span>
        </div>
        <CalendarStrip days={calendar} />
      </section>

      <section className="flex items-center justify-between rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
            {streak}
          </span>
          <div>
            <p className="text-sm font-semibold">{streak}-day check-in streak</p>
            <p className="text-xs text-foreground-muted">Consistency beats perfection</p>
          </div>
        </div>
        <Link href="/check-in" className="text-xs font-semibold text-accent">
          Log today
        </Link>
      </section>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <MetricTile
          href="/program/water"
          label="Water left"
          value={`${waterLeft} L`}
          hint={`${waterDone} / ${waterTarget} L`}
          icon={<DropIcon />}
        />
        <MetricTile
          href="/nutrition"
          label="Meals left"
          value={`${mealsLeft}`}
          hint={`${mealsDone} of ${m.mealsTarget}`}
          icon={<PlateIcon />}
        />
        <MetricTile
          href="/profile"
          label="Weight"
          value={weightLabel}
          hint={metrics?.changeLb != null ? `${metrics.changeLb} lb` : "lb"}
          icon={<ScaleIcon />}
        />
        <MetricTile
          href="/train"
          label="Workout"
          value={m.workoutLogged ? "Done" : "Open"}
          hint={m.workoutLogged ? "Logged" : "Not logged"}
          warn={!m.workoutLogged}
          icon={<BoltIcon />}
        />
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Today rings</h2>
          <Link href="/nutrition" className="text-xs text-accent">
            Details
          </Link>
        </div>
        <div className="flex justify-around">
          {[
            { label: "Meals", pct: (mealsDone / m.mealsTarget) * 100 },
            { label: "Protein", pct: nutritionRingsMock.proteinPct },
            { label: "Water", pct: (waterDone / waterTarget) * 100 },
            { label: "Timing", pct: nutritionRingsMock.timingPct },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-1">
              <div className="relative">
                <MiniRing percent={r.pct} />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                  {Math.round(r.pct)}
                </span>
              </div>
              <span className="text-[10px] text-foreground-muted">{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Weight trend</h2>
          <span className="text-[10px] text-foreground-subtle">
            {metrics?.weights?.length ? "From check-ins" : "Mock until logged"}
          </span>
        </div>
        <SparkBars
          values={
            metrics?.weights?.length
              ? metrics.weights
              : [182, 181.2, 180.5, 180.8, 179.4, 178.9, 178.4]
          }
          height={48}
        />
        <div className="mt-3">
          <HorizontalBar
            label="Lab day progress"
            value={day}
            max={totalDays}
            unit=""
          />
        </div>
      </section>
    </div>
  );
}

function DropIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z" />
    </svg>
  );
}
function PlateIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function ScaleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 8h16M12 8v12M8 20h8M7 8l-2 4h4L7 8zm10 0l-2 4h4l-2-4z" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-14h-7l1-6z" />
    </svg>
  );
}
