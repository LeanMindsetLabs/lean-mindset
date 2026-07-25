import { ProgramPage } from "@/components/ProgramPage";
import { waterPlan } from "@/data/program";

export default function WaterPage() {
  return (
    <ProgramPage title={waterPlan.title} subtitle={waterPlan.subtitle}>
      <ul className="flex flex-col gap-2">
        {waterPlan.checkpoints.map((c) => (
          <li
            key={c.time}
            className="flex items-center justify-between rounded-[var(--lm-radius-lg)] border border-border bg-background-card px-4 py-3"
          >
            <span className="text-sm">{c.time}</span>
            <span className="font-display text-xl text-accent">{c.amount}</span>
          </li>
        ))}
      </ul>
      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <h2 className="mb-2 text-sm font-semibold">Tips</h2>
        <ul className="space-y-1.5">
          {waterPlan.tips.map((t) => (
            <li key={t} className="text-sm text-foreground-muted">
              • {t}
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
