import { ProgramPage } from "@/components/ProgramPage";
import { supplements } from "@/data/program";

export default function SupplementsPage() {
  return (
    <ProgramPage title={supplements.title} subtitle={supplements.subtitle}>
      <p className="rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-2 text-xs text-foreground-muted">
        {supplements.disclaimer}
      </p>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Recommended core
        </h2>
        <ul className="grid gap-3">
          {supplements.core.map((s, i) => (
            <li
              key={s.name}
              className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card"
            >
              <div
                className="h-16"
                style={{
                  background: `linear-gradient(135deg,#1a1a0a ${i * 10}%,var(--accent))`,
                }}
              />
              <div className="p-4">
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-foreground-muted">{s.why}</p>
                <p className="mt-2 text-xs font-semibold text-accent">{s.how}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Optional
        </h2>
        <ul className="grid gap-3">
          {supplements.optional.map((s, i) => (
            <li
              key={s.name}
              className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card"
            >
              <div
                className="h-12"
                style={{
                  background: `linear-gradient(120deg,#121212,var(--accent-hover) ${40 + i * 20}%)`,
                }}
              />
              <div className="p-4">
                <p className="font-semibold">{s.name}</p>
                <p className="mt-1 text-sm text-foreground-muted">{s.why}</p>
                <p className="mt-2 text-xs font-semibold text-accent">{s.how}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
