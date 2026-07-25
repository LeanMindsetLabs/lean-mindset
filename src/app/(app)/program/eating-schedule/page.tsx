import { ProgramPage } from "@/components/ProgramPage";
import { eatingSchedule } from "@/data/program";

export default function EatingSchedulePage() {
  return (
    <ProgramPage title={eatingSchedule.title} subtitle={eatingSchedule.subtitle}>
      <ul className="flex flex-col gap-3">
        {eatingSchedule.meals.map((meal) => (
          <li
            key={meal.name}
            className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{meal.name}</h2>
              <span className="shrink-0 text-xs font-medium text-accent">{meal.time}</span>
            </div>
            <p className="mt-1 text-xs text-foreground-subtle">{meal.focus}</p>
            <p className="mt-2 text-sm text-foreground-muted">{meal.example}</p>
          </li>
        ))}
      </ul>
      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <h2 className="mb-2 text-sm font-semibold">Notes</h2>
        <ul className="space-y-1.5">
          {eatingSchedule.notes.map((n) => (
            <li key={n} className="text-sm text-foreground-muted">
              • {n}
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
