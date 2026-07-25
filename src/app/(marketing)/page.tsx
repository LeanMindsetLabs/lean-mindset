import Image from "next/image";
import Link from "next/link";
import { labs } from "@/data/labs";
import { blogPosts } from "@/data/blogs";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { media } from "@/lib/media";
import { AreaSparkline, RadarScore, WeekBars } from "@/components/ui/Charts";
import { weekAdherence } from "@/data/dashboard";

export default async function MarketingPage() {
  let signedIn = false;
  try {
    const session = await getSessionProfile();
    signedIn = Boolean(session);
  } catch {
    signedIn = false;
  }

  const previewLabs = labs.slice(0, 3);
  const teaserPosts = blogPosts.slice(0, 3);
  const labImages = [media.ui.dashboard, media.ui.train, media.marketing.lifestyle];
  const blogImages = [media.ui.blog, media.ui.nutrition, media.ui.progress];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader signedIn={signedIn} />

      <section className="relative isolate overflow-hidden">
        <Image
          src={media.marketing.hero}
          alt=""
          fill
          priority
          className="object-cover object-[center_20%] opacity-55"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 -z-[0]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 45%, #000 100%), radial-gradient(ellipse 70% 50% at 70% 20%, rgba(255,107,0,0.35), transparent 55%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[92dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:justify-center lg:pb-24 lg:pt-32">
          <p className="lm-fade-in font-display text-5xl uppercase leading-none tracking-wide text-white sm:text-7xl lg:text-8xl">
            Lean Mindset
          </p>
          <h1 className="mt-5 max-w-xl text-xl font-semibold leading-snug text-white/95 sm:text-2xl">
            Drop up to 20 lb in 6 weeks — structured meals, training, and daily check-in coaching.
          </h1>
          <p className="mt-3 max-w-md text-sm text-foreground-muted sm:text-base">
            No starving. No extremes. Real food, precise timing, and accountability that fits a busy calendar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {signedIn ? (
              <Link
                href="/home"
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_8px_28px_rgba(255,107,0,0.4)] hover:bg-accent-hover"
              >
                Open member app
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-white shadow-[0_8px_28px_rgba(255,107,0,0.4)] hover:bg-accent-hover"
                >
                  Start your lab
                </Link>
                <Link
                  href="/login"
                  className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:border-accent"
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-2 sm:max-w-lg sm:gap-3">
            {[
              { k: "6", v: "week labs" },
              { k: "4", v: "meals / day" },
              { k: "1:1", v: "check-ins" },
            ].map((m) => (
              <div
                key={m.v}
                className="rounded-[var(--lm-radius-md)] border border-white/10 bg-black/50 px-3 py-4 text-center backdrop-blur"
              >
                <p className="font-display text-3xl text-accent sm:text-4xl">{m.k}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-foreground-muted sm:text-xs">
                  {m.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="program" className="border-t border-border bg-background-elevated">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent">The promise</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">
              A system, not a crash diet
            </h2>
            <p className="mt-4 text-sm text-foreground-muted sm:text-base">
              Lean Mindset labs combine a 4-meal precision plan, adaptive training, hydration targets, and chat-first daily check-ins — so you stay on track without living in a spreadsheet.
            </p>
            <div className="mt-6 rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
              <p className="mb-2 text-xs font-semibold text-foreground-muted">Sample adherence</p>
              <WeekBars data={weekAdherence} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { t: "Nutrition", d: "4 meals · timing · swaps", img: media.ui.nutrition, pos: "30% 20%" },
              { t: "Training", d: "Foundation → HIIT", img: media.ui.train, pos: "60% 30%" },
              { t: "Hydration", d: "~3.5L checkpoints", img: media.ui.progress, pos: "40% 40%" },
              { t: "Coaching", d: "Daily chat check-ins", img: media.ui.dashboard, pos: "25% 15%" },
            ].map((c) => (
              <div
                key={c.t}
                className="lm-card-lift relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={c.img}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: c.pos }}
                    sizes="(max-width: 768px) 50vw, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="font-semibold text-white">{c.t}</p>
                    <p className="text-xs text-white/75">{c.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="labs" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Labs</p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none">Pick your track</h2>
            </div>
            <Link href="/labs" className="text-sm font-semibold text-accent">
              See all →
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previewLabs.map((lab, i) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group lm-card-lift block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={labImages[i % labImages.length]}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      style={{ objectPosition: `${30 + i * 20}% ${20 + i * 10}%` }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-accent">
                      {lab.durationWeeks} weeks · {lab.level}
                    </p>
                    <h3 className="mt-1 font-semibold">{lab.name}</h3>
                    <p className="mt-1 text-xs text-foreground-muted line-clamp-2">{lab.tagline}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="how" className="border-t border-border bg-background-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">How it works</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none">Three moves</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "Join a lab",
                d: "Get your eating schedule, grocery list, workouts, and water plan.",
                img: media.marketing.lift,
              },
              {
                n: "02",
                t: "Check in daily",
                d: "Chat your weight, meals, water, and blockers — coach sees the trend.",
                img: media.ui.dashboard,
              },
              {
                n: "03",
                t: "Adjust weekly",
                d: "Fine-tune portions and training as the lab progresses.",
                img: media.ui.progress,
              },
            ].map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card"
              >
                <div className="relative h-28">
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    className="object-cover opacity-70"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-card to-transparent" />
                </div>
                <div className="p-5 pt-0">
                  <span className="font-display text-5xl text-accent/40">{s.n}</span>
                  <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-foreground-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="relative min-h-[380px] overflow-hidden rounded-[var(--lm-radius-xl)] border border-border">
            <Image
              src={media.ui.dashboard}
              alt="Member dashboard preview"
              fill
              className="object-cover object-[20%_10%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
            <div className="absolute inset-4 flex flex-col justify-end rounded-[var(--lm-radius-lg)] border border-white/10 bg-black/55 p-4 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-wide text-accent">
                Daily check-in
              </p>
              <p className="mt-2 text-sm text-white/90">
                Day 12 · 178.4 lb · Water 2.3L · 4 meals ✓
              </p>
              <div className="mt-3">
                <AreaSparkline
                  values={[182, 181, 180.5, 180.2, 179.4, 178.9, 178.4]}
                  height={56}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Coaching</p>
            <h2 className="mt-2 font-display text-4xl uppercase leading-none">
              Chat-first accountability
            </h2>
            <p className="mt-4 text-sm text-foreground-muted sm:text-base">
              No video calls required. Send your daily check-in in chat — your coach reviews weight trends, adherence, and blockers, then replies with clear next steps.
            </p>
            <div className="mt-6 max-w-xs rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-3">
              <RadarScore
                axes={[
                  { label: "Meals", value: 80 },
                  { label: "Protein", value: 62 },
                  { label: "Water", value: 70 },
                  { label: "Train", value: 55 },
                  { label: "Sleep", value: 72 },
                ]}
                size={180}
              />
            </div>
            <Link
              href={signedIn ? "/check-in" : "/signup"}
              className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
            >
              {signedIn ? "Open check-in →" : "Get daily coaching →"}
            </Link>
          </div>
        </div>
      </section>

      <section id="blog" className="border-t border-border bg-background-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Blog</p>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none">Mindset reads</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-accent">
              All posts →
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {teaserPosts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="lm-card-lift block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card hover:border-accent"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={blogImages[i % blogImages.length]}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: `${25 + i * 15}% center` }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] uppercase text-accent">{post.category}</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug">{post.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border">
        <Image
          src={media.marketing.lifestyle}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <h2 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            Ready to run your lab?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-foreground-muted">
            Create your account, pick a lab, and start checking in. Mobile-first member app — works on desktop too.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={signedIn ? "/home" : "/signup"}
              className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-white shadow-[0_8px_28px_rgba(255,107,0,0.35)] hover:bg-accent-hover"
            >
              {signedIn ? "Go to dashboard" : "Sign up free"}
            </Link>
            <Link
              href="/labs"
              className="rounded-full border border-border bg-black/40 px-8 py-3 text-sm font-semibold backdrop-blur hover:border-accent"
            >
              Browse labs
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
