import Image from "next/image";
import Link from "next/link";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { labs } from "@/data/labs";
import { media } from "@/lib/media";

const STEPS = [
  {
    n: "01",
    title: "Pick a lab",
    body: "Choose a 6-week focus — fat loss, energy, or composition.",
  },
  {
    n: "02",
    title: "Follow the plan",
    body: "Meals, training, and water targets — structured, not extreme.",
  },
  {
    n: "03",
    title: "Check in daily",
    body: "Chat coaching keeps you accountable without the spreadsheet grind.",
  },
] as const;

/** Marketing `/` — minimal brand-first landing */
export default async function MarketingPage() {
  let signedIn = false;
  try {
    const session = await getSessionProfile();
    signedIn = Boolean(session);
  } catch {
    signedIn = false;
  }

  const primaryCta = signedIn
    ? { href: "/home", label: "Open app" }
    : { href: "/signup", label: "Start your lab" };
  const secondaryCta = signedIn
    ? { href: "/check-in", label: "Check-in" }
    : { href: "/login", label: "Log in" };

  const featuredLabs = labs.slice(0, 3);

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* ═══ HERO — brand, one line, CTAs, full-bleed athletic ═══ */}
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
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.78) 100%), linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.45) 100%)",
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
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 flex flex-col gap-8">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-5">
                <span className="font-display text-sm font-bold text-accent">{step.n}</span>
                <div>
                  <p className="text-base font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ LABS ═══ */}
      <section className="border-t border-white/10 bg-black pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              Labs
            </h2>
            <Link href="/labs" className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover">
              View all →
            </Link>
          </div>
          <ul className="mt-8 flex flex-col gap-0 divide-y divide-white/10 border-y border-white/10">
            {featuredLabs.map((lab) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="flex items-baseline justify-between gap-4 py-5 transition hover:text-accent"
                >
                  <span>
                    <span className="block text-base font-semibold text-white">{lab.name}</span>
                    <span className="mt-0.5 block text-sm text-white/50">{lab.focus}</span>
                  </span>
                  <span className="shrink-0 text-xs font-medium text-white/40">
                    {lab.durationWeeks} wk
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
