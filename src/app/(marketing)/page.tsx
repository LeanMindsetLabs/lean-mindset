import Image from "next/image";
import Link from "next/link";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { MarketingPhoneMock } from "@/components/marketing/MarketingPhoneMock";
import { media } from "@/lib/media";

/** Marketing `/` — mock-inspired composition: full-bleed hero, brand-first, mission, phone previews */
export default async function MarketingPage() {
  let signedIn = false;
  try {
    const session = await getSessionProfile();
    signedIn = Boolean(session);
  } catch {
    signedIn = false;
  }

  const primaryCta = signedIn ? { href: "/home", label: "Open app" } : { href: "/signup", label: "Start your lab" };
  const secondaryCta = signedIn
    ? { href: "/check-in", label: "Check-in" }
    : { href: "/login", label: "Log in" };

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* ═══ HERO COMPOSITION ═══ */}
      <section className="relative isolate overflow-hidden">
        {/* Full-bleed athletic photo — moody B&W treatment */}
        <div className="absolute inset-0">
          <Image
            src={media.marketing.hero}
            alt=""
            fill
            priority
            className="object-cover object-[center_25%] grayscale contrast-125 brightness-90"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.75) 70%, #000 100%), linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.55) 100%), radial-gradient(ellipse 45% 40% at 75% 40%, rgba(255,107,0,0.18), transparent 60%)",
            }}
          />
        </div>

        {/* Tasteful HUD metric overlays — Lean Mindset signals only */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
          <HudChip className="left-[58%] top-[28%]" label="551 kcal" icon="flame" />
          <HudChip className="left-[72%] top-[48%]" label="Check-in ✓" icon="check" />
          <HudChip className="left-[52%] top-[62%]" label="2.3 / 3.5L" icon="drop" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-[4.75rem] sm:px-6 lg:min-h-[100dvh] lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-10 lg:pb-14 lg:pt-28">
          {/* Left: brand + promise + CTAs (+ phones on desktop) */}
          <div className="flex flex-col justify-end">
            <p className="font-display text-[2.75rem] uppercase leading-[0.92] tracking-wide text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-7xl xl:text-8xl">
              Lean
              <br />
              Mindset
            </p>
            <h1 className="mt-4 max-w-md text-sm font-medium leading-relaxed text-white/85 sm:text-base">
              Drop up to 20 lb in 6 weeks — structured meals, training, and daily chat check-ins. No extremes. Real food. Real accountability.
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={primaryCta.href}
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_10px_32px_rgba(255,107,0,0.45)] hover:bg-accent-hover"
              >
                {primaryCta.label}
              </Link>
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:border-accent"
              >
                {secondaryCta.label}
              </Link>
            </div>

            {/* Mobile HUD chips */}
            <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                <span className="mr-1 text-accent">●</span>551 kcal
              </span>
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                Check-in done
              </span>
              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                2.3 / 3.5L
              </span>
            </div>

            {/* Phone stack — desktop sits in hero; mobile below fold lightly */}
            <div className="relative mt-8 hidden h-[340px] lg:block">
              <div className="absolute left-0 top-0 z-10 origin-bottom -rotate-6">
                <MarketingPhoneMock compact />
              </div>
              <div className="absolute left-[150px] top-6 z-0 origin-bottom rotate-3 opacity-95">
                <MarketingPhoneMock compact variant="score" />
              </div>
            </div>
          </div>

          {/* Right column: feature card + mission (desktop); stacked on mobile after hero copy */}
          <div className="flex flex-col gap-4 lg:pb-4">
            <div className="rounded-3xl border border-white/10 bg-black/55 p-5 backdrop-blur-md sm:p-6">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Smart labs &amp; daily metrics
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                One system for meals, water, training, and chat-first coaching — so you stay consistent without living in a spreadsheet.
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {["Daily check-in coaching", "4-meal precision plan", "Adaptive training labs"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                        ✓
                      </span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="/labs"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-accent"
              >
                See benefits →
              </Link>
            </div>

            <div className="rounded-3xl bg-accent p-5 text-white shadow-[0_16px_48px_rgba(255,107,0,0.35)] sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Our mission
              </p>
              <p className="mt-3 text-lg font-semibold leading-snug sm:text-xl">
                Empower busy people to hit real fat-loss goals with{" "}
                <span className="rounded-full bg-black px-2.5 py-0.5 text-[0.95em]">
                  structured labs + coaching
                </span>
                .
              </p>
              <Link
                href={primaryCta.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-white/90"
              >
                <DownloadIcon />
                {signedIn ? "Open member app" : "Start free"}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile phone previews — one compact row, not endless scroll */}
        <div className="relative mx-auto flex max-w-6xl justify-center gap-3 px-4 pb-10 lg:hidden">
          <MarketingPhoneMock compact />
          <div className="hidden scale-95 sm:block">
            <MarketingPhoneMock compact variant="score" />
          </div>
        </div>
      </section>

      {/* Thin explore strip — destinations, not long scroll */}
      <section className="border-t border-white/10 bg-black">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-5 sm:px-6 [scrollbar-width:none]">
          {[
            { href: "/labs", label: "Labs", img: media.cards.athlete },
            { href: "/blog", label: "Blog", img: media.cards.mealEggs },
            { href: signedIn ? "/nutrition" : "/signup", label: "Meals", img: media.cards.mealChicken },
            { href: signedIn ? "/check-in" : "/signup", label: "Coach", img: media.cards.chat },
          ].map((d) => (
            <Link
              key={d.label}
              href={d.href}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4"
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={d.img} alt="" fill className="object-cover" sizes="32px" />
              </span>
              <span className="text-sm font-semibold text-white">{d.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function HudChip({
  className,
  label,
  icon,
}: {
  className: string;
  label: string;
  icon: "flame" | "check" | "drop";
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
        {icon === "flame" && (
          <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2s4 4.5 4 9a4 4 0 1 1-8 0c0-2.5 1.5-4.5 3-6.5C9.5 7 10 9 10 10c0-3 2-6 2-8z" />
          </svg>
        )}
        {icon === "check" && (
          <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {icon === "drop" && (
          <svg className="h-3.5 w-3.5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z" />
          </svg>
        )}
        {label}
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 4v12M7 11l5 5 5-5M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
