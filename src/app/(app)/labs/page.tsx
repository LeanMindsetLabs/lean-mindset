import Link from "next/link";
import { labs } from "@/data/labs";

export default function LabsPage() {
  return (
    <div className="flex flex-col gap-5">
      <header className="pt-2">
        <p className="text-sm text-foreground-muted">Choose your challenge</p>
        <h1 className="text-2xl font-bold">Labs</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          All labs run 6 weeks. Join with your Lean Mindset account.
        </p>
      </header>

      <ul className="flex flex-col gap-3">
        {labs.map((lab) => (
          <li key={lab.slug}>
            <Link
              href={`/labs/${lab.slug}`}
              className="block rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4 transition hover:border-accent"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-black"
                  style={{ background: lab.accent }}
                >
                  {lab.durationWeeks} weeks
                </span>
                <span className="text-xs text-foreground-subtle">{lab.level}</span>
              </div>
              <h2 className="text-lg font-semibold">{lab.name}</h2>
              <p className="mt-1 text-sm text-foreground-muted">{lab.tagline}</p>
              <p className="mt-3 text-xs font-medium text-accent">{lab.focus} →</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
