import Link from "next/link";

const BRAND_BLUE = "#2563EB";
const MINDSET_MUTED = "#64748b";

type LogoVariant = "icon" | "wordmark" | "lockup" | "app-icon";

type LeanMindsetLogoProps = {
  variant?: LogoVariant;
  /** Icon / lockup circle size in px */
  iconSize?: number;
  className?: string;
  href?: string;
};

function LmMark({ size, squircle = false }: { size: number; squircle?: boolean }) {
  const fontSize = Math.round(size * 0.38);
  const inner = (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-bold lowercase leading-none text-white"
      style={{
        width: size,
        height: size,
        background: BRAND_BLUE,
        fontSize,
        letterSpacing: "-0.04em",
      }}
      aria-hidden
    >
      lm
    </span>
  );

  if (!squircle) return inner;

  const pad = Math.round(size * 0.22);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-[22%]"
      style={{
        width: size + pad * 2,
        height: size + pad * 2,
        background: BRAND_BLUE,
      }}
    >
      {inner}
    </span>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-semibold lowercase tracking-[-0.02em] ${className}`}
    >
      <span className="text-white">lean</span>
      <span style={{ color: MINDSET_MUTED }}>mindset</span>
    </span>
  );
}

export function LeanMindsetLogo({
  variant = "lockup",
  iconSize = 28,
  className = "",
  href,
}: LeanMindsetLogoProps) {
  const content =
    variant === "icon" ? (
      <LmMark size={iconSize} />
    ) : variant === "app-icon" ? (
      <LmMark size={iconSize} squircle />
    ) : variant === "wordmark" ? (
      <Wordmark className="text-lg" />
    ) : (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <LmMark size={iconSize} />
        <Wordmark className="text-[1.05rem] sm:text-lg" />
      </span>
    );

  if (href) {
    return (
      <Link href={href} className={`inline-flex items-center ${className}`} aria-label="LeanMindset home">
        {content}
      </Link>
    );
  }

  return <span className={className}>{content}</span>;
}

/**
 * Bottom nav app icon — blue squircle + lm only (no wordmark).
 * Height = NAV_TAB_SLOT_H: top aligns with adjacent icon tops, bottom with label bottoms.
 */
export function LeanMindsetNavAppIcon({
  height,
  active = true,
  className = "",
  /** Fraction of box height for “lm” (default 0.36; V2 nav uses ~0.5). */
  fontRatio = 0.36,
}: {
  height: number;
  active?: boolean;
  className?: string;
  fontRatio?: number;
}) {
  const fontSize = Math.round(height * fontRatio);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[22%] font-bold lowercase leading-none text-white transition ${
        active ? "opacity-100" : "opacity-45"
      } ${className}`}
      style={{
        width: height,
        height,
        background: `linear-gradient(180deg, #3b82f6 0%, ${BRAND_BLUE} 100%)`,
        fontSize,
        letterSpacing: "-0.05em",
        boxShadow: active ? "0 0 14px rgba(59,130,246,0.35)" : undefined,
      }}
      aria-hidden
    >
      lm
    </span>
  );
}

export { BRAND_BLUE, MINDSET_MUTED };
