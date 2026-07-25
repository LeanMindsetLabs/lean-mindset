import { ProgramPage } from "@/components/ProgramPage";
import { supplements } from "@/data/program";

export default function SupplementsPage() {
  return (
    <ProgramPage title={supplements.title} subtitle={supplements.subtitle}>
      <p className="rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-2 text-xs text-foreground-muted">
        {supplements.disclaimer}
      </p>
      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-3 font-semibold">Recommended core</h2>
        <ul className="space-y-4">
          {supplements.core.map((s) => (
            <li key={s.name}>
              <p className="font-medium">{s.name}</p>
              <p className="mt-1 text-sm text-foreground-muted">{s.why}</p>
              <p className="mt-1 text-xs text-accent">{s.how}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-3 font-semibold">Optional</h2>
        <ul className="space-y-4">
          {supplements.optional.map((s) => (
            <li key={s.name}>
              <p className="font-medium">{s.name}</p>
              <p className="mt-1 text-sm text-foreground-muted">{s.why}</p>
              <p className="mt-1 text-xs text-accent">{s.how}</p>
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
