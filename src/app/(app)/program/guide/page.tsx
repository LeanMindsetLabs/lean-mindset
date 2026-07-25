import { ProgramPage } from "@/components/ProgramPage";
import { programGuide } from "@/data/program";

export default function GuidePage() {
  return (
    <ProgramPage title={programGuide.title} subtitle="How your 6-week lab is structured">
      <div className="flex flex-col gap-3">
        {programGuide.phases.map((phase) => (
          <section
            key={phase.name}
            className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4"
          >
            <h2 className="font-semibold">{phase.name}</h2>
            <p className="mt-1 text-xs text-accent">
              {phase.days} · {phase.goal}
            </p>
            <ul className="mt-3 space-y-1.5">
              {phase.bullets.map((b) => (
                <li key={b} className="text-sm text-foreground-muted">
                  • {b}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <h2 className="mb-2 font-semibold">Core rules</h2>
        <ul className="space-y-1.5">
          {programGuide.rules.map((r) => (
            <li key={r} className="text-sm text-foreground-muted">
              • {r}
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
