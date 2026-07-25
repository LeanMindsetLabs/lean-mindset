import Link from "next/link";
import { programMeta, programNav } from "@/data/program";

export default function ProgramHubPage() {
  return (
    <div className="flex flex-col gap-5">
      <header className="pt-2">
        <p className="text-sm text-foreground-muted">Your Lean program</p>
        <h1 className="text-2xl font-bold">{programMeta.name}</h1>
        <p className="mt-2 text-sm text-foreground-muted">{programMeta.promise}</p>
      </header>

      <section className="rounded-[var(--lm-radius-lg)] bg-accent p-4 text-white">
        <p className="text-sm text-white/80">Active structure</p>
        <p className="font-display mt-1 text-4xl leading-none">
          {programMeta.durationWeeks} weeks
        </p>
        <p className="mt-2 text-sm text-white/90">
          {programMeta.mealsPerDay} meals/day · {programMeta.waterLitersTarget}L water target
        </p>
      </section>

      <ul className="flex flex-col gap-2">
        {programNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between rounded-[var(--lm-radius-lg)] border border-border bg-background-card px-4 py-3.5 transition hover:border-accent"
            >
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-foreground-muted">{item.desc}</p>
              </div>
              <span className="text-accent">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
