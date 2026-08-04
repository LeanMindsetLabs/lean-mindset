import Link from "next/link";
import type { ReactNode } from "react";

export const HOME_HERO_BORDER = "border border-[#93c5fd]/38";
export const HOME_CARD_BORDER = "border border-[#64748b]/28";

export function StreakBadge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#ef4444] px-[5px]"
      aria-label={`${count} day streak`}
    >
      <span className="text-[11px] font-bold leading-none text-white">{count}</span>
    </span>
  );
}

export function HealthMetricCard({
  href,
  icon,
  value,
  label,
  peek = false,
}: {
  href?: string;
  icon: ReactNode;
  value: string;
  label: string;
  peek?: boolean;
}) {
  const inner = (
    <>
      {icon}
      <p className="mt-3 text-[1.22rem] font-bold leading-none tracking-tight text-white">{value}</p>
      <p className="mt-1.5 text-[11px] text-[#64748b]">{label}</p>
    </>
  );
  const className = `block shrink-0 rounded-[18px] bg-[#0d1118] px-[15px] py-[14px] ${HOME_CARD_BORDER} ${
    peek ? "w-[124px]" : "w-[160px]"
  }`;
  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return <div className={className}>{inner}</div>;
}

export function SegmentedActivityRing({
  filled,
  total,
  label,
}: {
  filled: number;
  total: number;
  label?: string;
}) {
  const size = 82;
  const cx = size / 2;
  const cy = size / 2;
  const r = 30;
  const stroke = 9;
  const gapDeg = 11;
  const segDeg = (360 - gapDeg * total) / total;

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

  const centerLabel = label ?? `${filled}/${total}`;

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
              stroke={active ? "#5ca8ff" : "#434d63"}
              strokeWidth={stroke}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <span className="absolute text-[11px] font-bold tracking-tight text-white">{centerLabel}</span>
    </div>
  );
}

export function SearchOutlineIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="text-white/70">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function HeroHeartIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" aria-hidden>
      <path d="M5.5 9.5S1.5 7 1.5 4.2a2 2 0 0 1 3.7-.9A2 2 0 0 1 9.5 4.2C9.5 7 5.5 9.5 5.5 9.5Z" />
    </svg>
  );
}

export function HeroPlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M5.5 2.2v6.6M2.2 5.5h6.6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HeartOutlineIcon() {
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

export function HeartRateLineIcon() {
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

/** Water hydration — droplet outline (not the EKG pulse). */
export function WaterDropIcon() {
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

export function MealsMetricIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke="#38bdf8" strokeWidth="1.4" />
      <circle cx="11" cy="11" r="2.2" fill="#38bdf8" />
    </svg>
  );
}
