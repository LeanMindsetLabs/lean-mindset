/**
 * Pre-screens only — static mocks for review. Not wired to app data.
 * All frames use iPhone 15 dimensions (393×852) via PhoneFrame.
 */
import type { CSSProperties } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { BottomNavShell, type BottomNavTabId } from "@/components/nav/BottomNavShell";

const SCREENS = [
  { id: "home", label: "① Home (reference layout)" },
  { id: "meals", label: "② Meals" },
  { id: "checkin", label: "③ Check-in" },
  { id: "train", label: "④ Train" },
  { id: "program", label: "⑤ Program" },
] as const;

export default function PrescreensPage() {
  return (
    <div className="min-h-screen bg-[#050508] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#3b82f6]">Pre-screens</p>
        <h1 className="mt-2 font-display text-3xl uppercase">Proposed app flow</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Quick static mocks in <strong className="text-white/80">iPhone 15</strong> frames (393×852).
          Home matches your reference image. Approve before we implement in the real app.
        </p>
        <p className="mt-3 text-xs text-white/40">
          Jump:{" "}
          {SCREENS.map((s, i) => (
            <span key={s.id}>
              <a href={`#${s.id}`} className="text-[#60a5fa] hover:underline">
                {s.label}
              </a>
              {i < SCREENS.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col gap-16">
          <ScreenBlock id="home" title="Home — reference layout (Lean Mindset labels)" note="Exact structure: date + streak, hello, search + avatar, hero score card, horizontal metric cards, activity ring.">
            <HomeReferenceMock />
          </ScreenBlock>

          <ScreenBlock id="meals" title="Meals — nutrition day" note="Calorie ring + macro bars + photo + short ellipse meal rows (as built).">
            <MealsMock />
          </ScreenBlock>

          <ScreenBlock id="checkin" title="Check-in — daily chat" note="Center + action; structured coach thread.">
            <CheckInMock />
          </ScreenBlock>

          <ScreenBlock id="train" title="Train — this lab only" note="Phase sections + adherence + session cards.">
            <TrainMock />
          </ScreenBlock>

          <ScreenBlock id="program" title="Program — 6-week lab hub" note="Grocery, guide, water, eating schedule.">
            <ProgramMock />
          </ScreenBlock>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          <p className="font-semibold text-white">Nav shell (all member screens)</p>
          <p className="mt-1">Home · Meals · + Check-in · Train · Profile</p>
          <Link href="/home" className="mt-3 inline-block text-[#60a5fa]">
            ← Back to live app (current home)
          </Link>
        </div>
      </div>
    </div>
  );
}

function ScreenBlock({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-1 text-xs text-white/50">{note}</p>
      <div className="mt-4 flex justify-center">{children}</div>
    </section>
  );
}

function BottomNavMock({ active }: { active: BottomNavTabId }) {
  return <BottomNavShell active={active} />;
}

/** Reference card outline tokens */
const HOME_HERO_BORDER = "border border-[#93c5fd]/38";
const HOME_CARD_BORDER = "border border-[#64748b]/28";
const HOME_SCREEN_GRADIENT: CSSProperties = {
  background:
    "linear-gradient(180deg, #1e4d9b 0%, #183868 14%, #101c33 32%, #0a0f18 52%, #06080d 100%)",
};

/** Pixel-faithful to reference mock: top gradient bg, solid outlined cards, streak pill */
function HomeReferenceMock() {
  return (
    <PhoneFrame
      footer={<BottomNavMock active="home" />}
      screenClassName="bg-transparent"
      screenStyle={HOME_SCREEN_GRADIENT}
    >
      <header>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-[#94a3b8]">
              <span>Wed, Jun 25</span>
              <StreakBadge count={7} />
            </div>
            <h1 className="mt-2 text-[1.62rem] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              Hello, Member!
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/[0.04]">
              <SearchOutlineIcon />
            </span>
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-[#334155]">
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                M
              </span>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0a0f18] bg-[#22c55e]" />
            </span>
          </div>
        </div>
      </header>

      <Link
        href="/home/score"
        className={`mt-4 flex items-center gap-2.5 rounded-[20px] bg-[#2563eb] p-3 ${HOME_HERO_BORDER}`}
      >
        <div
          className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-[13px] border border-[#7dd3fc]/28 bg-[#0a1f4d]"
        >
          <span className="text-[2rem] font-bold leading-none tracking-tight text-white">65</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold leading-tight text-white">Lean Mindset Score</p>
          <p className="mt-0.5 text-[12px] text-white/88">Average fitness</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
            <span className="inline-flex items-center gap-1 text-[#bfdbfe]">
              <HeroHeartIcon />
              On track
            </span>
            <span className="inline-flex items-center gap-1 text-[#bfdbfe]">
              <HeroPlusIcon />
              Lab day 12
            </span>
          </div>
        </div>
        <span className="pr-0.5 text-[1.2rem] font-light leading-none text-white/85">›</span>
      </Link>

      <section className="mt-6">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">Health Metrics</h2>
          <span className="text-[12px] font-semibold text-[#60a5fa]">See All</span>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <HealthMetricCard icon={<HeartOutlineIcon />} value="178.4 lb" label="Weight" />
          <HealthMetricCard icon={<HeartRateLineIcon />} value="72 bpm" label="Heart rate" />
          <HealthMetricCard icon={<WaterDropIcon />} value="2.3 / 3.5 L" label="Water" />
          <HealthMetricCard icon={<MealsMetricIcon />} value="2 / 4" label="Meals" peek />
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
          <span className="h-[5px] w-[20px] rounded-full bg-[#3b82f6]" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
          <span className="h-[5px] w-[5px] rounded-full bg-white/18" />
        </div>
      </section>

      <section className="mt-6 pb-2">
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">Activity</h2>
          <span className="text-[12px] font-semibold text-[#60a5fa]">See All</span>
        </div>
        <div className={`flex items-center gap-3 rounded-[18px] bg-[#0d1118] px-4 py-[15px] ${HOME_CARD_BORDER}`}>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight text-white">On Track</p>
            <p className="mt-0.5 text-[11px] leading-snug text-[#64748b]">You need 3 more activities.</p>
          </div>
          <SegmentedActivityRing filled={2} total={5} />
        </div>
      </section>
    </PhoneFrame>
  );
}

function StreakBadge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ef4444] px-[5px]"
      aria-label={`${count} day streak`}
    >
      <span className="text-[11px] font-bold leading-none text-white">{count}</span>
    </span>
  );
}

function HealthMetricCard({
  icon,
  value,
  label,
  peek = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  peek?: boolean;
}) {
  return (
    <div
      className={`shrink-0 rounded-[18px] bg-[#0d1118] px-[15px] py-[14px] ${HOME_CARD_BORDER} ${peek ? "w-[124px]" : "w-[160px]"}`}
    >
      {icon}
      <p className="mt-3 text-[1.22rem] font-bold leading-none tracking-tight text-white">{value}</p>
      <p className="mt-1.5 text-[11px] text-[#64748b]">{label}</p>
    </div>
  );
}

function SegmentedActivityRing({ filled, total }: { filled: number; total: number }) {
  const size = 82;
  const cx = size / 2;
  const cy = size / 2;
  const r = 30;
  const stroke = 9;
  const gapDeg = 11;
  const segDeg = (360 - gapDeg * total) / total;
  const activeColor = "#5ca8ff";
  const inactiveColor = "#434d63";

  function polar(angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function arcPath(startDeg: number, endDeg: number) {
    const start = polar(startDeg);
    const end = polar(endDeg);
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
  }

  return (
    <div className="relative flex h-[82px] w-[82px] shrink-0 items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        {Array.from({ length: total }, (_, i) => {
          const start = i * (segDeg + gapDeg);
          const end = start + segDeg;
          const active = i < filled;
          return (
            <path
              key={i}
              d={arcPath(start, end)}
              fill="none"
              stroke={active ? activeColor : inactiveColor}
              strokeWidth={stroke}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <span className="absolute text-[11px] font-bold tracking-tight text-white">2/5</span>
    </div>
  );
}

function SearchOutlineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="text-white/70">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function HeroHeartIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" aria-hidden>
      <path d="M5.5 9.5S1.5 7 1.5 4.2a2 2 0 0 1 3.7-.9A2 2 0 0 1 9.5 4.2C9.5 7 5.5 9.5 5.5 9.5Z" />
    </svg>
  );
}

function HeroPlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M5.5 2.2v6.6M2.2 5.5h6.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Reference: blue outline heart — no badge background */
function HeartOutlineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M11 18.5S4.5 14.5 4.5 9.5a3.5 3.5 0 0 1 6.5-1.8A3.5 3.5 0 0 1 17.5 9.5C17.5 14.5 11 18.5 11 18.5Z"
        stroke="#4da3ff"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

/** Reference: red EKG line — no badge background */
function HeartRateLineIcon() {
  return (
    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden>
      <path
        d="M1 8h4l1.3-4 2.5 8 2.3-6L14 10h3l1.2-2.5 1.8 4.5H23"
        stroke="#ef4444"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WaterDropIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden>
      <path
        d="M10 1.5C10 1.5 3.5 9.2 3.5 13.5a6.5 6.5 0 0 0 13 0C16.5 9.2 10 1.5 10 1.5Z"
        stroke="#38bdf8"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function MealsMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="#38bdf8" strokeWidth="1.4" />
      <circle cx="11" cy="11" r="2.2" fill="#38bdf8" />
    </svg>
  );
}

function MealsMock() {
  return (
    <PhoneFrame footer={<BottomNavMock active="meals" />}>
      <h1 className="text-xl font-bold">Nutrition</h1>
      <p className="text-xs text-white/45">Today · 4-meal precision</p>
      <div className="mt-4 flex gap-3 rounded-2xl bg-[#141e32] p-3">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#2563eb] text-center text-xs font-bold">
          1,740
          <br />
          kcal
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1 text-xs">
          <div className="h-1.5 rounded-full bg-white/10">
            <div className="h-full w-[72%] rounded-full bg-[#2563eb]" />
          </div>
          <span className="text-white/45">Protein · Fat · Carbs bars</span>
        </div>
      </div>
      <p className="mb-2 mt-5 text-sm font-semibold">Today&apos;s meals</p>
      {[
        { name: "Breakfast", time: "8:00 AM", logged: true },
        { name: "Midday", time: "12:30 PM", logged: true },
        { name: "Afternoon", time: "3:30 PM", logged: false },
        { name: "Evening", time: "7:00 PM", logged: false },
      ].map((m) => (
        <div key={m.name} className="mb-2 flex items-center gap-2">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-white/10" />
          <div className="flex h-12 min-w-0 flex-1 items-center justify-between gap-2 rounded-full border border-white/10 bg-[#141e32] px-4">
            <span className="truncate text-sm font-semibold">{m.name}</span>
            <span className="shrink-0 text-[10px] text-white/45">
              {m.time}
              {m.logged ? " · Logged" : ""}
            </span>
          </div>
        </div>
      ))}
    </PhoneFrame>
  );
}

function CheckInMock() {
  return (
    <PhoneFrame footer={<BottomNavMock active="checkin" />}>
      <h1 className="text-xl font-bold">Check-in</h1>
      <p className="text-xs text-white/45">Day 12 · Summer Lab</p>
      <div className="mt-4 space-y-2 rounded-2xl bg-[#141e32] p-3">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-[#2563eb] px-3 py-2 text-xs">
          Weight 178.4 · Meals 2/4 · Water 2.3L
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1a2438] px-3 py-2 text-xs text-white/70">
          Solid day — protein at midday was light. Add eggs at afternoon meal.
        </div>
      </div>
      <div className="mt-4 rounded-full border border-white/15 bg-[#141e32] px-4 py-3 text-xs text-white/40">
        Type today&apos;s check-in…
      </div>
    </PhoneFrame>
  );
}

function TrainMock() {
  return (
    <PhoneFrame footer={<BottomNavMock active="train" />}>
      <h1 className="font-display text-2xl uppercase">Train</h1>
      <p className="text-xs text-white/45">Foundation → acceleration</p>
      <div className="mt-3 rounded-2xl bg-[#141e32] p-3">
        <p className="text-xs text-[#60a5fa]">WEEKS 1–2</p>
        <p className="font-semibold">Walk + Core A</p>
        <p className="text-[10px] text-white/45">25–30 min · Beginner</p>
      </div>
      <div className="mt-2 rounded-2xl bg-[#141e32] p-3 opacity-80">
        <p className="font-semibold">Full Body Light</p>
      </div>
    </PhoneFrame>
  );
}

function ProgramMock() {
  return (
    <PhoneFrame footer={<BottomNavMock active="profile" />}>
      <h1 className="text-xl font-bold">Program</h1>
      <div className="mt-3 rounded-2xl bg-[#2563eb] p-4">
        <p className="text-3xl font-bold">6 weeks</p>
        <p className="text-sm text-white/85">4 meals · 3.5L water</p>
      </div>
      {["Guide", "Grocery list", "Eating schedule", "Water"].map((l) => (
        <div key={l} className="mt-2 flex justify-between rounded-xl border border-white/10 bg-[#141e32] px-3 py-3 text-sm">
          <span>{l}</span>
          <span className="text-[#60a5fa]">→</span>
        </div>
      ))}
    </PhoneFrame>
  );
}
