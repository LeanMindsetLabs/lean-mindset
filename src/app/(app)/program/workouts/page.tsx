import Link from "next/link";
import { ProgramPage } from "@/components/ProgramPage";
import { workouts } from "@/data/program";
import { trainingSessions } from "@/data/training";

export default function WorkoutsPage() {
  return (
    <ProgramPage title={workouts.title} subtitle={workouts.subtitle}>
      <Link
        href="/train"
        className="mb-2 block overflow-hidden rounded-[var(--lm-radius-lg)] border border-accent/40"
      >
        <div
          className="flex aspect-[5/2] flex-col justify-end p-4"
          style={{ background: "linear-gradient(120deg,#1a0800,var(--accent))" }}
        >
          <p className="font-display text-2xl uppercase text-white">Open Train hub</p>
          <p className="text-xs text-white/80">Session cards · AI picks · log</p>
        </div>
      </Link>

      {workouts.weeks.map((block) => (
        <section key={block.label} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-accent">{block.label}</h2>
          {block.sessions.map((session) => {
            const match = trainingSessions.find((t) => t.name === session.name);
            const body = (
              <article className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card">
                <div
                  className="h-14"
                  style={{
                    background:
                      "linear-gradient(90deg,rgba(var(--accent-rgb),0.35),transparent)",
                  }}
                />
                <div className="-mt-6 px-4 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{session.name}</h3>
                    <span className="shrink-0 text-xs text-foreground-subtle">
                      {session.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground-muted">{session.detail}</p>
                </div>
              </article>
            );
            return match ? (
              <Link key={session.name} href={`/train/${match.id}`}>
                {body}
              </Link>
            ) : (
              <div key={session.name}>{body}</div>
            );
          })}
        </section>
      ))}
    </ProgramPage>
  );
}
