import Image from "next/image";
import Link from "next/link";
import { NAV_TAB_SLOT_H } from "@/components/nav/nav-metrics";

export { NAV_TAB_SLOT_H };

/** Official brand colors - match Logo_leanmindset dark lockup */
const BRAND_BLUE = "#2F5FD1";
/** Icon / “mindset” blue on dark UI (same family as app icon) */
const BRAND_BLUE_LIGHT = "#4A86E8";
const BRAND_INK = "#12151A";

/**
 * Official app mark (squircle + white “lm”) - user-provided master.
 * Replaces the old CSS circle + gray “mindset” header lockup.
 */
const ICON_SRC = "/brand/lm-app-icon.png";

type LogoVariant = "icon" | "wordmark" | "lockup" | "app-icon";
type LogoTone = "dark" | "light";

type LeanMindsetLogoProps = {
  variant?: LogoVariant;
  /** Icon size in px - default matches bottom App tab (`NAV_TAB_SLOT_H`). */
  iconSize?: number;
  /** dark = white lean + blue mindset; light = ink lean + brand mindset */
  tone?: LogoTone;
  className?: string;
  href?: string;
};

function BrandIcon({
  size,
  className = "",
  priority = false,
}: {
  size: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={ICON_SRC}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ borderRadius: "22%" }}
      draggable={false}
      unoptimized
      priority={priority}
    />
  );
}

function Wordmark({
  tone = "dark",
  fontSize,
  className = "",
}: {
  tone?: LogoTone;
  fontSize: number;
  className?: string;
}) {
  const leanColor = tone === "light" ? BRAND_INK : "#FFFFFF";
  const mindsetColor = tone === "light" ? BRAND_BLUE : BRAND_BLUE_LIGHT;

  return (
    <span
      className={`inline-flex items-baseline font-bold lowercase leading-none tracking-[-0.02em] ${className}`}
      style={{ fontSize, fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <span style={{ color: leanColor }}>lean</span>
      <span style={{ color: mindsetColor }}>mindset</span>
    </span>
  );
}

export function LeanMindsetLogo({
  variant = "lockup",
  iconSize = NAV_TAB_SLOT_H,
  tone = "dark",
  className = "",
  href,
}: LeanMindsetLogoProps) {
  // Lockup masters: word ~46% of icon height; gap ~21% of icon
  const wordSize = Math.max(13, Math.round(iconSize * 0.46));
  const gap = Math.max(8, Math.round(iconSize * 0.2));

  const content =
    variant === "icon" || variant === "app-icon" ? (
      <BrandIcon size={iconSize} priority />
    ) : variant === "wordmark" ? (
      <Wordmark tone={tone} fontSize={wordSize} />
    ) : (
      <span className="inline-flex items-center" style={{ gap }}>
        <BrandIcon size={iconSize} priority />
        <Wordmark tone={tone} fontSize={wordSize} />
      </span>
    );

  if (href) {
    return (
      <Link href={href} className={`inline-flex items-center ${className}`} aria-label="Lean Mindset home">
        {content}
      </Link>
    );
  }

  return <span className={`inline-flex items-center ${className}`}>{content}</span>;
}

/**
 * Bottom nav App tab - official squircle icon only (no wordmark).
 * Height = NAV_TAB_SLOT_H (40).
 */
export function LeanMindsetNavAppIcon({
  height = NAV_TAB_SLOT_H,
  active = true,
  className = "",
}: {
  height?: number;
  active?: boolean;
  className?: string;
  /** @deprecated Official PNG has fixed “lm” scale; ignored. */
  fontRatio?: number;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden transition ${
        active ? "opacity-100" : "opacity-45"
      } ${className}`}
      style={{
        width: height,
        height,
        borderRadius: "22%",
        boxShadow: active ? "0 0 14px rgba(74,134,232,0.35)" : undefined,
      }}
      aria-hidden
    >
      <BrandIcon size={height} className="h-full w-full object-cover" />
    </span>
  );
}

export { BRAND_BLUE, BRAND_BLUE_LIGHT, BRAND_INK };
