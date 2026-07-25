import Link from "next/link";
import { labs } from "@/data/labs";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
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

  const featured = labs.slice(0, 3);

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-foreground-muted">
            {email ? `Hi, ${email.split("@")[0]}` : "Welcome"}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Lean Mindset</h1>
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
            Unlock grocery lists, workouts, eating schedule, water plan, and more.
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

      <section className="rounded-[var(--lm-radius-lg)] bg-accent p-5 text-white">
        <p className="text-sm font-medium text-white/80">Active lab style</p>
        <p className="font-display mt-1 text-5xl leading-none">6 weeks</p>
        <p className="mt-2 text-sm text-white/85">
          Multiple labs · same Lean Mindset system
        </p>
        <Link
          href="/labs"
          className="mt-4 inline-block rounded-full bg-black/25 px-4 py-2 text-sm font-semibold"
        >
          Browse labs →
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured labs</h2>
          <Link href="/labs" className="text-xs font-medium text-accent">
            See all
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          {featured.map((lab) => (
            <li key={lab.slug}>
              <Link
                href={`/labs/${lab.slug}`}
                className="block rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3"
              >
                <p className="text-sm font-semibold">{lab.name}</p>
                <p className="text-xs text-foreground-muted">{lab.tagline}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {email && (
        <Link
          href="/program"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-4 py-3 text-center text-sm font-semibold text-accent"
        >
          Open program hub →
        </Link>
      )}
    </div>
  );
}
