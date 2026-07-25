import Link from "next/link";
import { notFound } from "next/navigation";
import { getLab } from "@/data/labs";

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  return (
    <div className="flex flex-col gap-5">
      <Link href="/labs" className="text-sm text-accent">
        ← All labs
      </Link>

      <header>
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-black"
          style={{ background: lab.accent }}
        >
          {lab.durationWeeks}-week lab
        </span>
        <h1 className="mt-3 text-3xl font-bold">{lab.name}</h1>
        <p className="mt-2 text-sm text-foreground-muted">{lab.tagline}</p>
      </header>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="text-sm font-semibold text-foreground-muted">Who it&apos;s for</h2>
        <p className="mt-2 text-sm">{lab.whoFor}</p>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground-muted">Highlights</h2>
        <ul className="space-y-2">
          {lab.highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm">
              <span className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-3 text-sm font-semibold text-foreground-muted">
          What you unlock
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          {lab.includes.map((item) => (
            <li
              key={item}
              className="rounded-[var(--lm-radius-md)] bg-background-elevated px-3 py-2 text-xs font-medium"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <Link
        href={`/signup?next=${encodeURIComponent("/program")}`}
        className="rounded-[var(--lm-radius-md)] bg-accent px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Create account to join →
      </Link>
      <Link
        href={`/login?next=${encodeURIComponent("/program")}`}
        className="text-center text-sm text-foreground-muted"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
}
