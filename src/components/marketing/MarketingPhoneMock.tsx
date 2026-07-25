import Image from "next/image";
import Link from "next/link";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { RadarScore } from "@/components/ui/Charts";
import { media } from "@/lib/media";

const meals = [
  { name: "Eggs · avocado", kcal: 551, protein: "42g", img: media.cards.mealEggs },
  { name: "Chicken bowl", kcal: 480, protein: "48g", img: media.cards.mealChicken },
] as const;

/** Dashboard phone — VPP-style product preview */
export function MarketingPhoneMock({
  compact = false,
  variant = "home",
}: {
  compact?: boolean;
  variant?: "home" | "score";
}) {
  const width = compact ? "w-[220px] sm:w-[240px]" : "w-[260px] sm:w-[280px]";

  if (variant === "score") {
    return (
      <div className={`relative mx-auto ${width}`}>
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0a0a] shadow-[0_28px_56px_rgba(0,0,0,0.7)]">
          <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
            <span className="text-[9px] font-semibold text-white/80">9:41</span>
            <div className="h-4 w-16 rounded-full bg-black" />
            <span className="text-[9px] text-white/50">■■■</span>
          </div>
          <div className="px-3 pb-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-accent">Score</p>
            <p className="text-sm font-bold text-white">Lean Mindset Score</p>
            <div className="mt-2 rounded-2xl bg-accent/90 p-3 text-center text-white">
              <p className="font-display text-4xl leading-none">72</p>
              <p className="mt-1 text-[10px] text-white/85">On track · Day 12</p>
            </div>
            <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <RadarScore
                axes={[
                  { label: "Meals", value: 80 },
                  { label: "Protein", value: 62 },
                  { label: "Water", value: 70 },
                  { label: "Train", value: 45 },
                  { label: "Rest", value: 72 },
                ]}
                size={160}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto ${width}`}>
      <div
        className="absolute -inset-5 -z-10 rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,107,0,0.35) 0%, transparent 70%)",
        }}
      />
      <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#0a0a0a] shadow-[0_28px_56px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
          <span className="text-[9px] font-semibold text-white/80">9:41</span>
          <div className="h-4 w-16 rounded-full bg-black" />
          <span className="text-[9px] text-white/50">■■■</span>
        </div>
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

          <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-accent p-2 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/20 font-display text-xl">
              72
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold">Lean Mindset Score</p>
              <p className="text-[9px] text-white/80">Average fitness</p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-2">
            <ProgressRing percent={66} size={56} stroke={6} label="2.3" sublabel="L" />
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
      </div>
    </div>
  );
}
