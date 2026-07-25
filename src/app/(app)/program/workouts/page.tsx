import { ProgramPage } from "@/components/ProgramPage";
import { workouts } from "@/data/program";

export default function WorkoutsPage() {
  return (
    <ProgramPage title={workouts.title} subtitle={workouts.subtitle}>
      {workouts.weeks.map((block) => (
        <section key={block.label} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-accent">{block.label}</h2>
          {block.sessions.map((session) => (
            <article
              key={session.name}
              className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{session.name}</h3>
                <span className="shrink-0 text-xs text-foreground-subtle">
                  {session.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground-muted">{session.detail}</p>
            </article>
          ))}
        </section>
      ))}
    </ProgramPage>
  );
}
