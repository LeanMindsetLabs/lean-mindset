"use client";

import Link from "next/link";
import { labs } from "@/data/labs";
import { programMeta } from "@/data/program";
import { isFreeAccess } from "@/data/product-config";
import { loadOnboardingSelection } from "@/lib/onboarding/onboarding-selection";
import { HeroHeartIcon, HeroPlusIcon, HOME_HERO_BORDER } from "./home-ui";

export type HomeHeroStat = {
  value: string;
  unit: string;
  title: string;
  subtitle: string;
};

export function HomeScoreHero({
  stat,
  day,
}: {
  stat: HomeHeroStat;
  day: number;
}) {
  const selection = loadOnboardingSelection();
  const lab = labs.find((l) => l.slug === selection?.labSlug);
  const labName = lab?.name ?? programMeta.name;
  const showFreeNote = isFreeAccess() || selection?.founderFree;

  return (
    <Link
      href="/home/score"
      className={`mt-4 flex items-center gap-2.5 rounded-[20px] bg-[#2563eb] p-3 ${HOME_HERO_BORDER}`}
    >
      <div className="flex h-[66px] w-[66px] shrink-0 flex-col items-center justify-center rounded-[13px] border border-[#7dd3fc]/28 bg-[#0a1f4d] px-1">
        <span className="text-[1.75rem] font-bold leading-none tracking-tight text-white">
          {stat.value}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#93c5fd]">
          {stat.unit}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#bfdbfe]">
          You&apos;re in · {labName}
        </p>
        <p className="mt-0.5 text-[15px] font-bold leading-tight text-white">{stat.title}</p>
        <p className="mt-0.5 text-[12px] text-white/88">{stat.subtitle}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
          <span className="inline-flex items-center gap-1 text-[#bfdbfe]">
            <HeroHeartIcon />
            On track
          </span>
          <span className="inline-flex items-center gap-1 text-[#bfdbfe]">
            <HeroPlusIcon />
            Lab day {day}
          </span>
          {showFreeNote ? (
            <span className="text-[#dbeafe]">Free while we launch</span>
          ) : null}
        </div>
      </div>
      <span className="pr-0.5 text-[1.2rem] font-light leading-none text-white/85">›</span>
    </Link>
  );
}
