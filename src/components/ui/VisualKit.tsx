import Link from "next/link";
import type { ReactNode } from "react";

export function CalendarStrip({
  days,
}: {
  days: {
    key: string;
    label: string;
    date: number;
    isToday: boolean;
    hasCheckIn: boolean;
  }[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {days.map((d) => (
        <div
          key={d.key}
          className={`flex min-w-[44px] flex-col items-center rounded-[var(--lm-radius-md)] border px-2 py-2 ${
            d.isToday
              ? "border-accent bg-accent text-white"
              : "border-border bg-background-card"
          }`}
        >
          <span
            className={`text-[10px] font-medium uppercase ${
              d.isToday ? "text-white/80" : "text-foreground-subtle"
            }`}
          >
            {d.label}
          </span>
          <span className="mt-0.5 text-sm font-bold">{d.date}</span>
          <span
            className={`mt-1 h-1.5 w-1.5 rounded-full ${
              d.hasCheckIn
                ? d.isToday
                  ? "bg-white"
                  : "bg-accent"
                : "bg-border"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export function AiBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent ${className}`}
    >
      <span aria-hidden>✦</span> AI suggested
    </span>
  );
}

export function SectionHeader({
  title,
  href,
  linkLabel = "See all",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {href && (
        <Link href={href} className="text-xs font-medium text-accent">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

export function MetricTile({
  icon,
  label,
  value,
  hint,
  href,
  warn,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  href?: string;
  warn?: boolean;
}) {
  const inner = (
    <>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
        {icon}
      </div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-foreground-subtle">
        {label}
      </p>
      <p className={`mt-1 text-lg font-bold leading-none ${warn ? "text-accent" : ""}`}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[10px] text-foreground-muted">{hint}</p>}
    </>
  );

  const cls =
    "rounded-[var(--lm-radius-md)] border border-border bg-background-card px-2.5 py-3 transition hover:border-accent";

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}

/** Decorative fitness silhouette / photo placeholder */
export function MediaCard({
  gradient,
  title,
  subtitle,
  badge,
  href,
  aspect = "photo",
}: {
  gradient: string;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  href?: string;
  aspect?: "photo" | "wide" | "square";
}) {
  const aspectClass =
    aspect === "wide" ? "aspect-[16/9]" : aspect === "square" ? "aspect-square" : "aspect-[4/3]";

  const body = (
    <article className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent">
      <div
        className={`relative ${aspectClass} w-full`}
        style={{ background: gradient }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.25), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,107,0,0.4), transparent 40%)",
          }}
        />
        <svg
          className="absolute bottom-2 right-2 h-16 w-16 text-white/20"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden
        >
          <path d="M32 8c-4 0-7 3-7 7v4h-4c-2 0-4 2-4 4v6c0 8 5 14 12 16v7h-5c-1.5 0-3 1.5-3 3v3h20v-3c0-1.5-1.5-3-3-3h-5v-7c7-2 12-8 12-16v-6c0-2-2-4-4-4h-4v-4c0-4-3-7-7-7z" />
        </svg>
        {badge && <div className="absolute left-2 top-2">{badge}</div>}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs text-foreground-muted line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {body}
      </Link>
    );
  }
  return body;
}
