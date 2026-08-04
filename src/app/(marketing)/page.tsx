import Image from "next/image";
import Link from "next/link";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { labs } from "@/data/labs";
import { ALL_ACCESS_FREE, MEMBERSHIP_PLANS } from "@/data/product-config";
import { MOBILE_APP_ENTRY, mobilePreviewUrl } from "@/lib/device/mobile-preview";
import { media } from "@/lib/media";

const STEPS = [
  {
    n: "01",
    title: "Pick a lab",
    body: "Choose a 6-week focus — fat loss, energy, or composition.",
    img: "/marketing/sections/step-pick-lab.jpg",
  },
  {
    n: "02",
    title: "Follow the plan",
    body: "Meals, training, and water targets — structured, not extreme.",
    img: "/marketing/sections/step-follow-plan.jpg",
  },
  {
    n: "03",
    title: "Check in daily",
    body: "Chat coaching keeps you accountable without the spreadsheet grind.",
    img: "/marketing/sections/step-check-in.jpg",
  },
] as const;

const LAB_IMAGES: Record<string, string> = {
  "summer-lab": "/marketing/sections/lab-summer.jpg",
  "bikini-body-lab": "/marketing/sections/lab-bikini.jpg",
  "executive-reset": "/marketing/sections/lab-executive.jpg",
};

/**
 * Marketing pricing — imported from product-config (single source of truth).
 */
const PLANS = MEMBERSHIP_PLANS;

const FAQS = [
  {
    q: "How long is a lab?",
    a: "A Lab is a 6-week program (same idea as a challenge) — structured meals, training, water targets, and daily check-ins from day one.",
  },
  {
    q: "Is this just another calorie tracker?",
    a: "No. You follow a clear plan with swaps when life happens. Check-ins keep you accountable without logging every bite forever.",
  },
  {
    q: "Who is Lean Mindset for?",
    a: "Busy adults who want fat loss or composition change with real food — not crash diets or endless spreadsheet tracking.",
  },
  {
    q: "What does coaching include?",
    a: "Daily chat check-ins plus coach review of your progress. You get accountability and course-correction, not a one-off PDF.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly and yearly plans can be canceled anytime. Yearly is billed once per year at the rate shown.",
  },
  {
    q: "Is my data private?",
    a: "Account and check-in data are used only to run labs and coaching. We don’t sell personal information. See Privacy for details.",
  },
] as const;

/** Marketing `/` — hero, how it works, labs, pricing, FAQ, short footer */
export default async function MarketingPage() {
  let signedIn = false;
  try {
    const session = await getSessionProfile();
    signedIn = Boolean(session);
  } catch {
    signedIn = false;
  }

  const primaryCta = signedIn
    ? { href: MOBILE_APP_ENTRY, label: "Open app" }
    : { href: "/start", label: "Start your lab" };
  const secondaryCta = signedIn
    ? { href: mobilePreviewUrl("/v2/check-in"), label: "Check-in" }
    : { href: "/login", label: "Log in" };

  const featuredLabs = labs.slice(0, 3);

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* ═══ HERO ═══ */}
      <section className="relative isolate min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={media.marketing.hero}
            alt=""
            fill
            priority
            className="object-cover object-[72%_35%] brightness-[0.88] contrast-[1.05] sm:object-[center_28%] lg:object-[58%_30%]"
            sizes="100vw"
            quality={90}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.48) 40%, rgba(0,0,0,0.85) 100%), linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-end px-4 pb-16 pt-[4.5rem] sm:px-6 sm:pb-20 lg:pb-24">
          <h1 className="font-display text-[clamp(2.75rem,11vw,5.5rem)] uppercase leading-[0.92] tracking-wide text-white">
            Lean
            <br />
            Mindset
          </h1>
          <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-white/80 sm:text-lg">
            Drop up to 20 lb in 6 weeks — real food, structured training, daily check-ins.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={primaryCta.href}
              className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition hover:bg-accent-hover"
            >
              {primaryCta.label}
            </Link>
            <Link
              href={secondaryCta.href}
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={step.img}
                    alt=""
                    fill
                    className="object-cover object-center grayscale contrast-[1.2] brightness-[0.9]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute left-3 top-3 font-display text-sm font-bold text-accent">
                    {step.n}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ LABS ═══ */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
                Pick your track
              </h2>
              <p className="mt-2 text-sm text-white/55">6-week labs. Real food. Daily check-ins.</p>
            </div>
            <Link
              href="/labs"
              className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {featuredLabs.map((lab) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10"
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={LAB_IMAGES[lab.slug] ?? media.marketing.hero}
                      alt=""
                      fill
                      className="object-cover object-center grayscale contrast-[1.25] brightness-[0.88] transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                        {lab.durationWeeks} weeks
                      </p>
                      <p className="mt-1 font-display text-xl uppercase tracking-wide text-white">
                        {lab.name.replace(/ Lab$/, "")}
                      </p>
                      <p className="mt-1 text-sm text-white/65">{lab.focus}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            Pricing
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/55">
            {ALL_ACCESS_FREE
              ? "Full access is free while we launch. Pick a lab and start today."
              : "Buy a single Lab, or unlock membership monthly or yearly."}
          </p>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <li
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-[#0a0a0a] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4)] ${
                  plan.highlight
                    ? "border-2 border-accent"
                    : "border border-white/10"
                }`}
              >
                {plan.badge ? (
                  <span className="absolute right-4 top-4 rounded-full bg-accent/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-accent">
                    {plan.badge}
                  </span>
                ) : null}
                <p className="font-display text-xl uppercase tracking-wide text-white">
                  {plan.name}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  {ALL_ACCESS_FREE ? (
                    <>
                      <span className="text-lg text-white/40 line-through">{plan.priceLabel}</span>
                      <span className="text-4xl font-bold text-accent">FREE</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-white">{plan.priceLabel}</span>
                  )}
                  <span className="text-sm text-white/50">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                      <span className="mt-0.5 text-accent" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={signedIn ? MOBILE_APP_ENTRY : "/start"}
                  className="mt-7 block rounded-full bg-accent py-3 text-center text-sm font-bold text-white transition hover:bg-accent-hover"
                >
                  {plan.cta}
                </Link>
                {plan.note ? (
                  <p className="mt-3 text-center text-[11px] text-white/40">{plan.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            FAQ
          </h2>
          <ul className="mt-10 space-y-3">
            {FAQS.map((item) => (
              <li key={item.q}>
                <details className="group rounded-2xl border border-white/10 bg-[#0a0a0a] open:border-accent/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span
                      className="shrink-0 text-lg font-light text-accent transition group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="border-t border-white/10 px-5 pb-4 pt-3 text-sm leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
