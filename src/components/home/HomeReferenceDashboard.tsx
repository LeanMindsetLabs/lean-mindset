import Link from "next/link";
import { dashboardMock } from "@/components/homeMock";
import type { MemberMetrics } from "@/lib/member-metrics";
import { programMeta } from "@/data/program";
import {
  HealthMetricCard,
  HeartOutlineIcon,
  HeartRateLineIcon,
  HOME_CARD_BORDER,
  MealsMetricIcon,
  SearchOutlineIcon,
  SegmentedActivityRing,
  StreakBadge,
  WaterDropIcon,
} from "./home-ui";
import { TodayLabPlanSection } from "@/components/workflow/TodayLabPlanSection";
import { HomeScoreHero, type HomeHeroStat } from "./HomeScoreHero";

function buildHeroStat(
  day: number,
  totalDays: number,
  changeLb: number | null | undefined,
): HomeHeroStat {
  const daysLeft = Math.max(0, totalDays - day);

  if (changeLb != null && changeLb < -0.05) {
    const lost = Math.abs(changeLb);
    const value = lost >= 10 ? lost.toFixed(0) : lost.toFixed(1).replace(/\.0$/, "");
    return {
      value,
      unit: "lb",
      title: "Lost so far",
      subtitle: `${daysLeft} days left · day ${day} of ${totalDays}`,
    };
  }

  return {
    value: String(daysLeft),
    unit: daysLeft === 1 ? "day" : "days",
    title: "Left in your lab",
    subtitle: `Day ${day} of ${totalDays} · 6-week focus`,
  };
}

function capitalize(name: string) {
  if (!name) return "Member";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function formatHeaderDate(d = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(d);
}

/** Approved home layout — wired to lab metrics for daily workflow */
export function HomeReferenceDashboard({
  firstName,
  metrics,
}: {
  firstName: string;
  metrics?: MemberMetrics | null;
}) {
  const m = dashboardMock;
  const day = metrics?.day ?? m.day;
  const totalDays = m.totalDays;
  const heroStat = buildHeroStat(day, totalDays, metrics?.changeLb);
  const streak = metrics?.streakHint ?? m.streakDays;
  const weightLabel = metrics?.weightLb != null ? `${metrics.weightLb}` : "178.4";
  const waterDone = metrics?.water ?? m.waterLitersDone;
  const waterTarget = m.waterLitersTarget;
  const mealsDone = metrics?.mealsCount || m.mealsDone;
  const mealsTarget = m.mealsTarget;
  const heartRateBpm = m.restingHeartRateBpm;
  const workoutsDone = m.workoutLogged ? 2 : 1;
  const workoutsTarget = 5;
  const activitiesLeft = Math.max(0, workoutsTarget - workoutsDone);
  const initial = firstName.slice(0, 1).toUpperCase() || "M";

  return (
    <div className="flex flex-col pb-2">
      <header>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-[#94a3b8]">
              <span>{formatHeaderDate()}</span>
              <StreakBadge count={streak} />
            </div>
            <h1 className="mt-2 text-[1.62rem] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              Hello, {capitalize(firstName)}!
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/[0.04]"
              aria-label="Search"
            >
              <SearchOutlineIcon />
            </Link>
            <Link
              href="/profile"
              className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-[#334155]"
            >
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                {initial}
              </span>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0f18] bg-[#22c55e]" />
            </Link>
          </div>
        </div>
      </header>

      <HomeScoreHero stat={heroStat} day={day} />

      <div className="mt-5">
        <TodayLabPlanSection
          serverMealsDone={mealsDone}
          serverMealsTarget={mealsTarget}
          workoutsDone={workoutsDone}
          workoutsTarget={workoutsTarget}
        />
      </div>

      <section className="mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">Health Metrics</h2>
          <Link href="/home/score" className="text-[12px] font-semibold text-[#60a5fa]">
            See All
          </Link>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <HealthMetricCard
            href="/check-in"
            icon={<HeartOutlineIcon />}
            value={`${weightLabel} lb`}
            label="Weight"
          />
          <HealthMetricCard
            href="/home/score"
            icon={<HeartRateLineIcon />}
            value={`${heartRateBpm} bpm`}
            label="Heart rate"
          />
          <HealthMetricCard
            href="/program/water"
            icon={<WaterDropIcon />}
            value={`${waterDone} / ${waterTarget} L`}
            label="Water"
          />
          <HealthMetricCard
            href="/nutrition"
            icon={<MealsMetricIcon />}
            value={`${mealsDone} / ${mealsTarget}`}
            label="Meals"
            peek
          />
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
          <span className="h-[5px] w-[20px] rounded-full bg-[#3b82f6]" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">Activity</h2>
          <Link href="/train" className="text-[12px] font-semibold text-[#60a5fa]">
            See All
          </Link>
        </div>
        <Link
          href="/train"
          className={`flex items-center gap-3 rounded-[18px] bg-[#0d1118] px-4 py-[15px] ${HOME_CARD_BORDER}`}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight text-white">
              {activitiesLeft === 0 ? "Week complete" : "On Track"}
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-[#64748b]">
              {activitiesLeft === 0
                ? "All lab sessions logged this week."
                : `You need ${activitiesLeft} more activities.`}
            </p>
          </div>
          <SegmentedActivityRing filled={workoutsDone} total={workoutsTarget} />
        </Link>
      </section>

      <p className="mt-5 text-center text-[10px] text-[#64748b]">
        {programMeta.name} · Day {day}/{totalDays}
      </p>
    </div>
  );
}
