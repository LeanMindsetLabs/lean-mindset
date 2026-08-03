import type { ReactNode } from "react";
import Image from "next/image";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { RadarScore } from "@/components/ui/Charts";
import { media } from "@/lib/media";

const meals = [
  { name: "Eggs · avocado", kcal: 551, protein: "42g", img: media.cards.mealEggs },
  { name: "Chicken bowl", kcal: 480, protein: "48g", img: media.cards.mealChicken },
] as const;

function PhoneChrome({ children, width }: { children: ReactNode; width: string }) {
  return (
    <div className={`relative mx-auto ${width}`}>
      <div
        className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-3xl lm-glow-radial"
        aria-hidden
      />
      <div className="overflow-hidden rounded-[2.1rem] border border-white/20 bg-[#0a0a0a] shadow-[0_32px_64px_rgba(0,0,0,0.75)]">
        <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
          <span className="text-[9px] font-semibold text-white/80">9:41</span>
          <div className="h-4 w-16 rounded-full bg-black" />
          <span className="text-[9px] text-white/50">■■■</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Circular score orb — matches hero mock */
function ScoreOrb({ score = 72 }: { score?: number }) {
  return (
    <div className="relative mx-auto flex h-[7.25rem] w-[7.25rem] items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 116 116" aria-hidden>
        <circle cx="58" cy="58" r="52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="8" />
        <circle
          cx="58"
          cy="58"
          r="52"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 52}`}
          strokeDashoffset={`${2 * Math.PI * 52 * 0.28}`}
          className="lm-glow-accent-sm"
        />
      </svg>
      <div className="flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-full bg-accent text-white lm-shadow-accent-md">
        <p className="font-display text-[2.35rem] leading-none">{score}</p>
        <p className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-white/85">Score</p>
      </div>
    </div>
  );
}

/** Dashboard / score / nutrition / AI / celebrate / reviews phone previews */
export function MarketingPhoneMock({
  compact = false,
  variant = "home",
}: {
  compact?: boolean;
  variant?: "home" | "score" | "nutrition" | "ai" | "celebrate" | "reviews";
}) {
  const width = compact ? "w-[200px] sm:w-[220px]" : "w-[240px] sm:w-[260px]";

  if (variant === "score") {
    return (
      <PhoneChrome width={width}>
        <div className="px-3 pb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent">Breakdown</p>
          <p className="text-sm font-bold text-white">Lean Mindset Score</p>
          <div className="mt-2 flex justify-center">
            <ScoreOrb />
          </div>
          <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            <RadarScore
              axes={[
                { label: "Meals", value: 80 },
                { label: "Protein", value: 62 },
                { label: "Water", value: 70 },
                { label: "Train", value: 45 },
                { label: "Rest", value: 72 },
              ]}
              size={compact ? 148 : 168}
            />
          </div>
        </div>
      </PhoneChrome>
    );
  }

  if (variant === "nutrition") {
    return (
      <PhoneChrome width={width}>
        <div className="px-3 pb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent">Nutrition</p>
          <p className="font-display text-3xl leading-none text-white">1,745</p>
          <p className="text-[10px] text-white/55">kcal · 312 left today</p>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[78%] rounded-full bg-accent lm-shadow-accent-md" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { l: "Protein", v: "120g" },
              { l: "Carbs", v: "148g" },
              { l: "Fat", v: "52g" },
            ].map((m) => (
              <div key={m.l} className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-center">
                <p className="text-[10px] font-bold text-white">{m.v}</p>
                <p className="text-[8px] text-white/45">{m.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center">
            <ProgressRing percent={72} size={72} stroke={8} label="2.3" sublabel="L" />
          </div>
        </div>
      </PhoneChrome>
    );
  }

  if (variant === "ai") {
    return (
      <PhoneChrome width={width}>
        <div className="px-3 pb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent">AI picks</p>
          <p className="text-sm font-bold text-white">Recommended meals</p>
          <ul className="mt-2 space-y-1.5">
            {[
              { name: "Eggs · avocado", kcal: 551, img: media.cards.mealEggs, stars: "★★★★★" },
              { name: "Chicken bowl", kcal: 480, img: media.cards.mealChicken, stars: "★★★★☆" },
              { name: "Green pesto plate", kcal: 420, img: media.cards.mealPesto, stars: "★★★★☆" },
            ].map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1.5"
              >
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                  <Image src={m.img} alt="" fill className="object-cover" sizes="36px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold text-white">{m.name}</p>
                  <p className="text-[8px] text-accent">{m.stars}</p>
                </div>
                <span className="text-[9px] font-bold text-white/70">{m.kcal}</span>
              </li>
            ))}
          </ul>
        </div>
      </PhoneChrome>
    );
  }

  if (variant === "celebrate") {
    return (
      <PhoneChrome width={width}>
        <div className="flex flex-col items-center px-3 pb-5 pt-2 text-center">
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent">Goal reached</p>
          <div className="mt-3 flex h-24 w-24 items-center justify-center rounded-full bg-accent lm-shadow-accent-lg">
            <span className="font-display text-4xl text-white">✓</span>
          </div>
          <p className="mt-3 text-base font-bold text-white">2,187 kcal</p>
          <p className="mt-1 text-[10px] text-white/60">Daily target hit — keep the streak.</p>
          <span className="mt-3 rounded-full bg-white px-4 py-1.5 text-[10px] font-bold text-black">
            Got it
          </span>
        </div>
      </PhoneChrome>
    );
  }

  if (variant === "reviews") {
    return (
      <PhoneChrome width={width}>
        <div className="px-3 pb-4">
          <p className="text-[9px] font-bold uppercase tracking-widest text-accent">Reviews</p>
          <div className="mt-2 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-2.5">
            <div>
              <p className="font-display text-3xl leading-none text-white">4.2</p>
              <p className="text-[8px] text-white/50">1,215 users</p>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5">
              {[92, 70, 35, 18, 8].map((w, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="w-2 text-[7px] text-white/40">{5 - i}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {["Skill", "Conversation", "Attitude"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[8px] text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white">
                J
              </span>
              <p className="text-[10px] font-bold text-white">Amazingly Talented!</p>
            </div>
            <p className="mt-1 text-[8px] leading-snug text-white/55">
              Insightful coaching — improved my patterns fast.
            </p>
            <p className="mt-1 text-[8px] text-accent">★★★★★ · Verified</p>
          </div>
        </div>
      </PhoneChrome>
    );
  }

  return (
    <PhoneChrome width={width}>
      <div className="px-3 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
            M
          </span>
          <div>
            <p className="text-[11px] font-bold text-white">Hello, Member!</p>
            <p className="text-[9px] text-white/50">Day 12 · Summer Lab</p>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-white/50">
            Lean Mindset Score
          </p>
          <ScoreOrb />
          <p className="mt-1.5 text-[9px] text-white/55">Average fitness · On track</p>
        </div>

        <div className="mt-2.5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-2">
          <ProgressRing percent={66} size={52} stroke={6} label="2.3" sublabel="L" />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-white/55">Water</span>
              <span className="font-semibold text-white">2.3 / 3.5L</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[66%] rounded-full bg-accent" />
            </div>
          </div>
        </div>

        <ul className="mt-2 space-y-1.5">
          {meals.map((m) => (
            <li
              key={m.name}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-1 pr-1.5"
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                <Image src={m.img} alt="" fill className="object-cover" sizes="32px" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-white">{m.name}</p>
                <p className="text-[9px] text-white/50">
                  {m.kcal} kcal · {m.protein}
                </p>
              </div>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[8px] font-bold text-white">
                ADD
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PhoneChrome>
  );
}
