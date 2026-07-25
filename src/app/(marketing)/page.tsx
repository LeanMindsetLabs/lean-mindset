import Image from "next/image";
import Link from "next/link";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { MarketingPhoneMock } from "@/components/marketing/MarketingPhoneMock";
import { CoachReviews } from "@/components/CoachReviews";
import { media } from "@/lib/media";

/** Marketing `/` — Lean Mindset mock composition (hero + app showcases) */
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

  const quick = [
    { href: "/labs", label: "Labs", img: media.cards.athlete },
    { href: "/blog", label: "Blog", img: media.cards.mealEggs },
    { href: signedIn ? "/nutrition" : "/signup", label: "Meals", img: media.cards.mealChicken },
    { href: signedIn ? "/check-in" : "/signup", label: "Coach", img: media.cards.chat },
  ];

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* ═══ HERO — matches Lean Mindset branded mock ═══ */}
      <section className="relative isolate min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={media.marketing.hero}
            alt=""
            fill
            priority
            className="object-cover object-[72%_35%] sm:object-[center_28%] lg:object-[58%_30%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 32%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.92) 100%), linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 48%, rgba(0,0,0,0.55) 100%), radial-gradient(ellipse 42% 38% at 78% 42%, rgba(255,107,0,0.22), transparent 62%)",
            }}
          />
        </div>

        {/* Floating HUD — desktop */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
          <HudChip className="left-[56%] top-[22%]" label="551 kcal" icon="flame" />
          <HudChip className="left-[74%] top-[38%]" label="Check-in ✓" icon="check" />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-4 pb-5 pt-[4.5rem] sm:px-6 lg:pb-8 lg:pt-24">
          <div className="grid flex-1 gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-10">
            {/* Left: brand + CTAs + phones */}
            <div className="flex flex-col justify-end">
              <h1 className="font-display text-[clamp(2.6rem,9vw,5.75rem)] uppercase leading-[0.9] tracking-wide text-white drop-shadow-[0_6px_40px_rgba(0,0,0,0.7)]">
                Lean
                <br />
                Mindset.
              </h1>
              <p className="mt-3 max-w-md text-[13px] font-medium leading-relaxed text-white/88 sm:mt-4 sm:text-base">
                Drop up to 20 lb in 6 weeks — structured meals, training, and daily chat check-ins. No
                extremes. Real food. Real accountability.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href={primaryCta.href}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_0_0_1px_rgba(255,107,0,0.35),0_12px_40px_rgba(255,107,0,0.55)] transition hover:bg-accent-hover"
                >
                  {primaryCta.label}
                </Link>
                <Link
                  href={secondaryCta.href}
                  className="rounded-full border border-white/35 bg-black/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md hover:border-accent"
                >
                  {secondaryCta.label}
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  <FlameMini /> 551 kcal
                </span>
                <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  Check-in ✓
                </span>
              </div>

              {/* Phone stack — visible on all breakpoints for complete first viewport */}
              <div className="relative mt-5 h-[250px] sm:h-[300px] lg:mt-8 lg:h-[340px]">
                <div className="absolute left-0 top-2 z-10 origin-bottom scale-[0.92] -rotate-6 sm:scale-100 sm:top-0">
                  <MarketingPhoneMock compact />
                </div>
                <div className="absolute left-[118px] top-8 z-0 origin-bottom scale-[0.88] rotate-3 opacity-95 sm:left-[145px] sm:top-6 sm:scale-100">
                  <MarketingPhoneMock compact variant="score" />
                </div>
              </div>
            </div>

            {/* Right: glass + mission */}
            <div className="flex flex-col gap-3 lg:pb-2">
              <div className="rounded-[1.6rem] border border-white/12 bg-black/55 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
                <h2 className="text-lg font-bold text-white sm:text-xl">Smart labs &amp; daily metrics</h2>
                <p className="mt-2 text-xs leading-relaxed text-white/65 sm:text-sm">
                  One system for meals, water, training, and chat-first coaching — so you stay consistent
                  without living in a spreadsheet.
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

              <div className="rounded-[1.6rem] bg-accent p-4 text-white shadow-[0_16px_56px_rgba(255,107,0,0.42)] sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
                  Our mission
                </p>
                <p className="mt-3 text-base font-semibold leading-snug sm:text-xl">
                  Empower busy people to hit real fat-loss goals with{" "}
                  <span className="whitespace-nowrap rounded-full bg-black px-2.5 py-0.5 text-[0.95em]">
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

          {/* Bottom quick pills — part of hero composition */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-6">
            {quick.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/12 bg-black/50 py-1.5 pl-1.5 pr-4 backdrop-blur-md"
              >
                <span className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src={d.img} alt="" fill className="object-cover" sizes="32px" />
                </span>
                <span className="text-sm font-semibold text-white">{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ APP SHOWCASE — nutrition / AI / celebrate / reviews ═══ */}
      <section className="border-t border-white/10 bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Member app</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
            Labs that feel like a product
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            Calorie rings, AI meal picks, goal celebrations, and coach reviews — dark + #FF6B00, phone-first.
          </p>

          <div className="mt-10 flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 lg:gap-6">
            {(
              [
                { v: "nutrition" as const, label: "Daily calories" },
                { v: "ai" as const, label: "AI recommendations" },
                { v: "celebrate" as const, label: "Goal reached" },
                { v: "reviews" as const, label: "Coach reviews" },
              ] as const
            ).map((item) => (
              <div key={item.v} className="flex w-[220px] shrink-0 flex-col items-center sm:w-auto">
                <MarketingPhoneMock compact variant={item.v} />
                <p className="mt-3 text-center text-xs font-semibold text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS PANEL ═══ */}
      <section className="border-t border-white/10 bg-[#0a0a0a] py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">Social proof</p>
            <h2 className="mt-2 font-display text-3xl uppercase leading-none text-white sm:text-4xl">
              Coach reviews
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Rating summary bars, filter pills, and verified review cards — same UI members see in the app.
            </p>
            <Link
              href={signedIn ? "/reviews" : "/signup"}
              className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_28px_rgba(255,107,0,0.4)] hover:bg-accent-hover"
            >
              {signedIn ? "Open reviews" : "Join & read reviews"}
            </Link>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4 sm:p-5">
            <CoachReviews compact />
          </div>
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
  icon: "flame" | "check";
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
        {icon === "flame" ? <FlameMini /> : <CheckMini />}
        {label}
      </div>
    </div>
  );
}

function FlameMini() {
  return (
    <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2s4 4.5 4 9a4 4 0 1 1-8 0c0-2.5 1.5-4.5 3-6.5C9.5 7 10 9 10 10c0-3 2-6 2-8z" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M12 4v12M7 11l5 5 5-5M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
