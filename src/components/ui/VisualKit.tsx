import Image from "next/image";
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
              : d.hasCheckIn
                ? "border-accent/40 bg-accent-soft"
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
  chart,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  href?: string;
  warn?: boolean;
  chart?: ReactNode;
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
      {chart && <div className="mt-2">{chart}</div>}
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

/** Photo or gradient card — never empty gray */
export function MediaCard({
  gradient,
  image,
  imagePosition = "center",
  title,
  subtitle,
  badge,
  href,
  aspect = "photo",
}: {
  gradient: string;
  image?: string;
  imagePosition?: string;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  href?: string;
  aspect?: "photo" | "wide" | "square";
}) {
  const aspectClass =
    aspect === "wide" ? "aspect-[16/9]" : aspect === "square" ? "aspect-square" : "aspect-[4/3]";

  const body = (
    <article className="lm-card-lift overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent">
      <div className={`relative ${aspectClass} w-full`} style={{ background: gradient }}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            sizes="(max-width: 430px) 50vw, 200px"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        {!image && (
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.25), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,107,0,0.45), transparent 40%)",
            }}
          />
        )}
        {badge && <div className="absolute left-2 top-2 z-10">{badge}</div>}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs text-foreground-muted line-clamp-2">{subtitle}</p>
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

/** Full-bleed image panel with overlay content */
export function ImageBanner({
  src,
  alt = "",
  children,
  className = "",
  heightClass = "aspect-[16/9]",
  position = "center",
}: {
  src: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  heightClass?: string;
  position?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border ${heightClass} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition: position }}
        sizes="(max-width: 512px) 100vw, 512px"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">{children}</div>
      )}
    </div>
  );
}
