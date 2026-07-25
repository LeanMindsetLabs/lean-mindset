import Link from "next/link";
import { HomeDashboard } from "@/components/HomeDashboard";
import { labs } from "@/data/labs";
import { recipes } from "@/data/recipes";
import { MediaCard, AiBadge, SectionHeader } from "@/components/ui/VisualKit";
import { getMemberMetrics } from "@/lib/member-metrics";
import { createClient } from "@/lib/supabase/server";

export default async function MemberHomePage() {
  let email: string | null = null;
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email ?? null;
    } catch {
      email = null;
    }
  }

  const metrics = email ? await getMemberMetrics() : null;
  const featured = labs.slice(0, 2);
  const aiRecipe = recipes.find((r) => r.aiSuggested);
  const firstName = email?.split("@")[0] ?? "there";

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-foreground-muted">
            {email ? `Hi, ${firstName}` : "Welcome"}
          </p>
          <h1 className="font-display text-3xl uppercase tracking-wide">Lean Mindset</h1>
        </div>
        <Link
          href={email ? "/profile" : "/signup"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
        >
          LM
        </Link>
      </header>

      {!email && (
        <section className="rounded-[var(--lm-radius-lg)] border border-accent/40 bg-accent-soft p-4">
          <p className="text-sm font-semibold">Create your account</p>
          <p className="mt-1 text-xs text-foreground-muted">
            Unlock dashboard rings, recipes, training, logs, and check-ins.
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href="/signup"
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold"
            >
              Log in
            </Link>
          </div>
        </section>
      )}

      <HomeDashboard firstName={firstName} metrics={metrics} />

      {aiRecipe && (
        <section>
          <SectionHeader title="AI recipe pick" href="/recipes/ai" linkLabel="More" />
          <MediaCard
            href={`/recipes/${aiRecipe.id}`}
            gradient={aiRecipe.imageGradient}
            title={aiRecipe.title}
            subtitle={`${aiRecipe.minutes} min · ${aiRecipe.proteinG}g protein`}
            badge={<AiBadge />}
            aspect="wide"
          />
        </section>
      )}

      <section>
        <SectionHeader title="Quick launch" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { href: "/nutrition", label: "Nutrition", g: "linear-gradient(135deg,#2a1508,#ff6b00)" },
            { href: "/train", label: "Train", g: "linear-gradient(145deg,#1a0808,#ff6b00)" },
            { href: "/music", label: "Music", g: "linear-gradient(140deg,#1a1028,#ff8533)" },
            { href: "/logs", label: "Logs", g: "linear-gradient(150deg,#0a1a2a,#ff6b00)" },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="overflow-hidden rounded-[var(--lm-radius-md)] border border-border"
            >
              <div className="flex aspect-[2/1] items-end p-3" style={{ background: q.g }}>
                <span className="text-sm font-bold text-white">{q.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Your labs" href="/labs" />
        <ul className="flex flex-col gap-2">
          {featured.map((lab) => (
            <li key={lab.slug}>
              <Link
                href={`/labs/${lab.slug}`}
                className="flex overflow-hidden rounded-[var(--lm-radius-md)] border border-border bg-background-card"
              >
                <div
                  className="w-2 shrink-0"
                  style={{ background: lab.accent }}
                />
                <div className="flex-1 px-3 py-3">
                  <p className="text-sm font-semibold">{lab.name}</p>
                  <p className="text-xs text-foreground-muted">{lab.tagline}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
