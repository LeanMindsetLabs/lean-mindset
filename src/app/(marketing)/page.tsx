import Image from "next/image";
import Link from "next/link";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { labs } from "@/data/labs";
import { blogPosts } from "@/data/blogs";
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

const PROMISE = [
  {
    title: "Nutrition",
    body: "Four precise meals. Real food. Travel swaps built in.",
    img: "/marketing/sections/promise-nutrition.jpg",
  },
  {
    title: "Training",
    body: "Walks to HIIT — progressive, not punishing.",
    img: "/marketing/sections/promise-training.jpg",
  },
  {
    title: "Hydration",
    body: "Clear daily water targets with simple checkpoints.",
    img: "/marketing/sections/promise-hydration.jpg",
  },
  {
    title: "Coaching",
    body: "Daily check-ins that keep you honest and moving.",
    img: "/marketing/sections/promise-coaching.jpg",
  },
] as const;

const LAB_IMAGES: Record<string, string> = {
  "summer-lab": "/marketing/sections/lab-summer.jpg",
  "bikini-body-lab": "/marketing/sections/lab-bikini.jpg",
  "executive-reset": "/marketing/sections/lab-executive.jpg",
};

const BLOG_IMAGES: Record<string, string> = {
  Nutrition: "/marketing/sections/blog-nutrition.jpg",
  Habits: "/marketing/sections/blog-habits.jpg",
  Training: "/marketing/sections/blog-training.jpg",
};

/** Marketing `/` — clean hero + below-fold real photo cards */
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
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* ═══ HERO — brand, one line, CTAs, muted athletic ═══ */}
      <section className="relative isolate min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={media.marketing.hero}
            alt=""
            fill
            priority
            className="object-cover object-[72%_35%] brightness-[0.82] contrast-[0.9] sm:object-[center_28%] lg:object-[58%_30%]"
            sizes="100vw"
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

      {/* ═══ HOW IT WORKS — 3 photo cards ═══ */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={step.img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
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

      {/* ═══ PROMISE 2×2 ═══ */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
            The promise
          </h2>
          <p className="mt-2 max-w-lg text-sm text-white/55">
            One system — meals, training, water, and coaching — without living in a spreadsheet.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {PROMISE.map((item) => (
              <li
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/10"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-lg font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/70">{item.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ LABS — large lifestyle cards ═══ */}
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
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
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

      {/* ═══ BLOG — mindset reads ═══ */}
      <section className="border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl">
              Mindset reads
            </h2>
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover"
            >
              All posts →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {featuredPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={
                        BLOG_IMAGES[post.category] ??
                        "/marketing/sections/blog-habits.jpg"
                      }
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
                      {post.category}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold leading-snug text-white">
                      {post.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/50">
                      {post.excerpt}
                    </p>
                  </div>
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
