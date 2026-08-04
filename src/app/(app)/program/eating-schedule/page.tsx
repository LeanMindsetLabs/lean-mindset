import { ProgramPage } from "@/components/ProgramPage";
import { eatingSchedule } from "@/data/program";

export default function EatingSchedulePage() {
  return (
    <ProgramPage title={eatingSchedule.title} subtitle={eatingSchedule.subtitle}>
      <ul className="flex flex-col gap-3">
        {eatingSchedule.meals.map((meal, index) => (
          <li
            key={meal.name}
            className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card"
          >
            <div className="border-b border-border bg-background-elevated px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  Meal {index + 1}
                </span>
                <span className="text-xs font-semibold text-accent">{meal.time}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{meal.name.replace(/^Meal \d+ - /, "")}</h2>
              <p className="mt-0.5 text-xs text-foreground-subtle">{meal.focus}</p>
            </div>

            <div className="space-y-3 p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground-subtle">
                  On-plan example
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{meal.example}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-foreground-subtle">
                  Smart swaps
                </p>
                <ul className="mt-2 space-y-2">
                  {meal.swaps.map((swap) => (
                    <li
                      key={swap}
                      className="rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-2 text-sm text-foreground-muted"
                    >
                      <span className="mr-2 font-semibold text-accent">↔</span>
                      {swap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
