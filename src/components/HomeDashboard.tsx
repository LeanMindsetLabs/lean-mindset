import Link from "next/link";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SparkBars, AreaSparkline } from "@/components/ui/Charts";
import { dashboardMock } from "@/components/homeMock";
import type { MemberMetrics } from "@/lib/member-metrics";

function capitalize(name: string) {
  if (!name) return "there";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function scoreLabel(score: number) {
  if (score >= 80) return "Excellent fitness";
  if (score >= 60) return "Average fitness";
  if (score >= 40) return "Building fitness";
  return "Needs focus";
}

/** Sandow-style home density — Lean Mindset dark + #FF6B00; phone-first */
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
  const mealsDone = metrics?.mealsCount || m.mealsDone;
  const mealsTarget = m.mealsTarget;
  const streak = metrics?.streakHint || m.streakDays;
  const weightLabel =
    metrics?.weightLb != null ? `${metrics.weightLb}` : "178.4";
  const weights = metrics?.weights?.length
    ? metrics.weights
    : [182, 181.2, 180.5, 180.8, 179.4, 178.9, 178.4];
  const fitnessScore = Math.round(55 + pct * 0.35);
  const workoutsDone = m.workoutLogged ? 2 : 1;
  const workoutsTarget = 5;
  const activitiesLeft = Math.max(0, workoutsTarget - workoutsDone);
  const waterBars = [40, 55, 50, 70, 65, 80, Math.round((waterDone / waterTarget) * 100)];
  const mealBars = [100, 75, 50, 25].map((v, i) => (i < mealsDone ? v : 15));
  const adherenceBars = [62, 70, 55, 80, 75, 88, pct];

  return (
    <div className="flex flex-col gap-3">
      {/* Header: avatar · Hello · bell */}
      <header className="flex items-center gap-3 pt-0.5">
        <Link
          href="/profile"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
        >
          {firstName.slice(0, 1).toUpperCase()}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-400" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold leading-tight">Hello, {capitalize(firstName)}!</p>
          <p className="text-[11px] text-foreground-muted">
            Day {day}/{totalDays} · {streak}-day streak
          </p>
        </div>
        <Link
          href="/check-in"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-card"
        >
          <BellIcon />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
            2
          </span>
        </Link>
      </header>

      {/* Lean Mindset Score card → breakdown */}
      <Link
        href="/home/score"
        className="flex items-center gap-3 rounded-2xl bg-accent p-3 text-white shadow-[0_12px_32px_rgba(255,107,0,0.28)]"
      >
        <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl bg-black/20">
          <span className="font-display text-4xl leading-none">{fitnessScore}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold leading-tight">Lean Mindset Score</p>
          <p className="mt-0.5 text-xs text-white/85">{scoreLabel(fitnessScore)}</p>
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/80">
            <span className="inline-flex items-center gap-1">
              <HeartMini /> On track
            </span>
            <span className="inline-flex items-center gap-1">
              <PlusMini /> Lab day {day}
            </span>
          </div>
        </div>
        <ChevronIcon />
      </Link>

      {/* Search */}
      <Link
        href="/more"
        className="flex items-center gap-2 rounded-2xl border border-border bg-background-card px-3 py-2.5 text-sm text-foreground-muted"
      >
        <SearchIcon />
        <span>Search Lean Mindset…</span>
      </Link>

      {/* Metric cards with mini charts */}
      <section className="flex flex-col gap-2">
        <MetricRow
          href="/profile"
          icon={<ScaleIcon />}
          title="Weight"
          value={`${weightLabel} lb`}
          hint={metrics?.changeLb != null ? `${metrics.changeLb} lb` : "Stable trend"}
          chart={<SparkBars values={weights.map((w) => 200 - w)} height={36} />}
        />
        <MetricRow
          href="/program/water"
          icon={<DropIcon />}
          title="Water"
          value={`${waterDone} / ${waterTarget} L`}
          hint={waterDone >= waterTarget ? "Target hit" : `${(waterTarget - waterDone).toFixed(1)}L left`}
          chart={<SparkBars values={waterBars} height={36} />}
        />
        <MetricRow
          href="/nutrition"
          icon={<PlateIcon />}
          title="Meals"
          value={`${mealsDone} / ${mealsTarget}`}
          hint="4-meal precision"
          chart={<SparkBars values={mealBars} height={36} />}
        />
        <MetricRow
          href="/home/score"
          icon={<TrendIcon />}
          title="Adherence"
          value={`${pct}%`}
          hint="Lab progress"
          chart={<AreaSparkline values={adherenceBars} width={120} height={36} />}
        />
      </section>

      {/* Activity snippet */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Activity</h2>
          <Link href="/train" className="text-xs font-semibold text-accent">
            See all
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-background-card p-3">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">
                {activitiesLeft} out of {workoutsTarget} activities left this week
              </p>
              <p className="mt-0.5 text-[11px] text-foreground-muted">
                Foundation walks → HIIT as the lab progresses
              </p>
            </div>
            <ProgressRing
              percent={(workoutsDone / workoutsTarget) * 100}
              size={64}
              stroke={7}
              label={`${workoutsDone}/${workoutsTarget}`}
            />
          </div>
          <ul className="mt-3 divide-y divide-border">
            {[
              { name: "Foundation walk", meta: "Today · 30 min · 128 kcal", href: "/train" },
              { name: "Daily check-in", meta: streak > 0 ? "Logged" : "Due today", href: "/check-in" },
            ].map((a) => (
              <li key={a.name}>
                <Link href={a.href} className="flex items-center justify-between gap-2 py-2.5">
                  <div>
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-[11px] text-foreground-muted">{a.meta}</p>
                  </div>
                  <ChevronIcon className="text-foreground-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function MetricRow({
  href,
  icon,
  title,
  value,
  hint,
  chart,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  value: string;
  hint: string;
  chart: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-border bg-background-card p-3"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-foreground-muted">{title}</p>
        <p className="text-base font-bold leading-tight">{value}</p>
        <p className="text-[10px] text-foreground-subtle">{hint}</p>
      </div>
      <div className="w-[88px] shrink-0">{chart}</div>
    </Link>
  );
}

function BellIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 7H3s3 0 3-7" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon({ className = "text-white/80" }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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
function TrendIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 16 9 11l4 4 7-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HeartMini() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}
function PlusMini() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
