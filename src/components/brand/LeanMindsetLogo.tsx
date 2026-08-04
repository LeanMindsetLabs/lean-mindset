import Image from "next/image";
import Link from "next/link";
import { NAV_TAB_SLOT_H } from "@/components/nav/nav-metrics";

export { NAV_TAB_SLOT_H };

/** Official brand colors from Logo_leanmindset masters */
const BRAND_BLUE = "#2F5FD1";
const BRAND_BLUE_LIGHT = "#5B8DEF";
const BRAND_INK = "#12151A";

/** Master lockup aspect (900×240). */
const LOCKUP_ASPECT = 900 / 240;

const ICON_SRC = "/brand/icon_180.png";
const LOCKUP_DARK_SRC = "/brand/lockup_dark_bg_3x.png";
const LOCKUP_LIGHT_SRC = "/brand/lockup_light_bg_3x.png";

type LogoVariant = "icon" | "wordmark" | "lockup" | "app-icon";
type LogoTone = "dark" | "light";

type LeanMindsetLogoProps = {
  variant?: LogoVariant;
  /** Lockup / icon height in px — default matches bottom App tab (`NAV_TAB_SLOT_H`). */
  iconSize?: number;
  /** dark lockup (white lean) vs light lockup (ink lean) */
  tone?: LogoTone;
  className?: string;
  href?: string;
};

function BrandIcon({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={ICON_SRC}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      draggable={false}
      unoptimized
      priority={false}
    />
  );
}

/** Official PNG lockup — exact attached branding. */
function BrandLockup({
  height,
  tone = "dark",
  className = "",
}: {
  height: number;
  tone?: LogoTone;
  className?: string;
}) {
  const width = Math.round(height * LOCKUP_ASPECT);
  const src = tone === "light" ? LOCKUP_LIGHT_SRC : LOCKUP_DARK_SRC;
  return (
    <Image
      src={src}
      alt="leanmindset"
      width={width}
      height={height}
      className={`shrink-0 ${className}`}
      draggable={false}
      unoptimized
      priority
    />
  );
}

export function LeanMindsetLogo({
  variant = "lockup",
  iconSize = NAV_TAB_SLOT_H,
  tone = "dark",
  className = "",
  href,
}: LeanMindsetLogoProps) {
  const content =
    variant === "icon" || variant === "app-icon" ? (
      <BrandIcon size={iconSize} />
    ) : variant === "wordmark" ? (
      <BrandLockup height={iconSize} tone={tone} className="!w-auto" />
    ) : (
      <BrandLockup height={iconSize} tone={tone} />
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
 * Bottom nav App tab — official icon PNG only (no wordmark).
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
        boxShadow: active ? "0 0 14px rgba(91,141,239,0.35)" : undefined,
      }}
      aria-hidden
    >
      <BrandIcon size={height} className="h-full w-full object-cover" />
    </span>
  );
}

export { BRAND_BLUE, BRAND_BLUE_LIGHT, BRAND_INK };
