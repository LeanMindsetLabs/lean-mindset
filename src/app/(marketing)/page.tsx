import Link from "next/link";
import { labs } from "@/data/labs";
import { blogPosts } from "@/data/blogs";
import { getSessionProfile } from "@/lib/auth/role";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

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

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader signedIn={signedIn} />

      {/* Hero — brand first, full-bleed athletic */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 40%, rgba(255,107,0,0.12), transparent 50%), linear-gradient(180deg, #0a0a0a 0%, #000 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b00' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="mx-auto flex min-h-[92dvh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:justify-center lg:pb-24 lg:pt-32">
          <p className="font-display text-5xl uppercase leading-none tracking-wide text-white sm:text-7xl lg:text-8xl">
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

          {/* Hero metric strip — visual, not text wall */}
          <div className="mt-12 grid grid-cols-3 gap-2 sm:max-w-lg sm:gap-3">
            {[
              { k: "6", v: "week labs" },
              { k: "4", v: "meals / day" },
              { k: "1:1", v: "check-ins" },
            ].map((m) => (
              <div
                key={m.v}
                className="rounded-[var(--lm-radius-md)] border border-white/10 bg-black/40 px-3 py-4 text-center backdrop-blur"
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

      {/* Promise */}
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
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { t: "Nutrition", d: "4 meals · timing · swaps", g: "linear-gradient(135deg,#2a1508,#ff6b00)" },
              { t: "Training", d: "Foundation → HIIT", g: "linear-gradient(145deg,#1a0a0a,#ff6b00)" },
              { t: "Hydration", d: "~3.5L checkpoints", g: "linear-gradient(140deg,#0a1a2a,#ff8533)" },
              { t: "Coaching", d: "Daily chat check-ins", g: "linear-gradient(150deg,#1a1020,#ff6b00)" },
            ].map((c) => (
              <div
                key={c.t}
                className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
              >
                <div className="aspect-[4/3]" style={{ background: c.g }}>
                  <div className="flex h-full flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="font-semibold">{c.t}</p>
                    <p className="text-xs text-white/75">{c.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs preview */}
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
            {previewLabs.map((lab) => (
              <li key={lab.slug}>
                <Link
                  href={`/labs/${lab.slug}`}
                  className="group block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
                >
                  <div
                    className="aspect-[16/10] transition group-hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg,#111,${lab.accent})`,
                    }}
                  />
                  <div className="p-4">
                    <p className="text-xs text-accent">{lab.durationWeeks} weeks · {lab.level}</p>
                    <h3 className="mt-1 font-semibold">{lab.name}</h3>
                    <p className="mt-1 text-xs text-foreground-muted line-clamp-2">{lab.tagline}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-border bg-background-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">How it works</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none">Three moves</h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: "01", t: "Join a lab", d: "Get your eating schedule, grocery list, workouts, and water plan." },
              { n: "02", t: "Check in daily", d: "Chat your weight, meals, water, and blockers — coach sees the trend." },
              { n: "03", t: "Adjust weekly", d: "Fine-tune portions and training as the lab progresses." },
            ].map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-5"
              >
                <span className="font-display text-5xl text-accent/30">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-foreground-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Check-in angle */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[var(--lm-radius-xl)] border border-border sm:aspect-[16/12] lg:aspect-auto lg:min-h-[380px]"
            style={{
              background:
                "linear-gradient(160deg,#1a0a00 0%,#3a1800 40%,#ff6b00 120%)",
            }}
          >
            <div className="absolute inset-4 flex flex-col justify-end rounded-[var(--lm-radius-lg)] border border-white/10 bg-black/50 p-4 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-wide text-accent">Daily check-in</p>
              <p className="mt-2 text-sm text-white/90">Day 12 · 178.4 lb · Water 2.3L · 4 meals ✓</p>
              <div className="mt-4 flex gap-1">
                {[40, 70, 55, 90, 65, 80, 45].map((h, i) => (
                  <div key={i} className="flex h-12 flex-1 items-end rounded-sm bg-white/10">
                    <div className="w-full rounded-sm bg-accent" style={{ height: `${h}%` }} />
                  </div>
                ))}
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
            <Link
              href={signedIn ? "/check-in" : "/signup"}
              className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent-hover"
            >
              {signedIn ? "Open check-in →" : "Get daily coaching →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Blog teaser */}
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
            {teaserPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card hover:border-accent"
                >
                  <div className="aspect-[16/10]" style={{ background: post.imageGradient }} />
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

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:py-24">
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
              className="rounded-full border border-border px-8 py-3 text-sm font-semibold hover:border-accent"
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
