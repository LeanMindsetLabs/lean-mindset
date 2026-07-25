import Link from "next/link";
import { sessionsByPhase, aiSessions } from "@/data/training";
import { AiBadge } from "@/components/ui/VisualKit";
import { MiniRing } from "@/components/ui/ProgressRing";

export default function TrainPage() {
  const foundation = sessionsByPhase("foundation");
  const acceleration = sessionsByPhase("acceleration");
  const aiCount = aiSessions().length;

  return (
    <div className="flex flex-col gap-5 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Train</h1>
        <p className="text-sm text-foreground-muted">Foundation → acceleration</p>
      </header>

      <section
        className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border p-5"
        style={{ background: "linear-gradient(135deg,#1a0800 0%,#3a1500 50%,#121212 100%)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-accent">This lab</p>
            <p className="font-display mt-1 text-4xl">6 sessions</p>
            <p className="mt-1 text-xs text-foreground-muted">+ {aiCount} AI suggested</p>
          </div>
          <div className="relative">
            <MiniRing percent={35} size={72} stroke={8} />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              35%
            </span>
          </div>
        </div>
        <Link
          href="/train/ai"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white"
        >
          <AiBadge /> Browse AI picks
        </Link>
      </section>

      <PhaseBlock label="Weeks 1–2 · Foundation" sessions={foundation} />
      <PhaseBlock label="Weeks 3–6 · Acceleration" sessions={acceleration} />
    </div>
  );
}

function PhaseBlock({
  label,
  sessions,
}: {
  label: string;
  sessions: ReturnType<typeof sessionsByPhase>;
}) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{label}</h2>
      <ul className="flex flex-col gap-3">
        {sessions.map((s) => (
          <li key={s.id}>
            <Link
              href={`/train/${s.id}`}
              className="block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
            >
              <div
                className="flex aspect-[5/2] items-end justify-between p-3"
                style={{
                  background:
                    s.phase === "acceleration"
                      ? "linear-gradient(120deg,#2a0a0a,#ff6b00)"
                      : "linear-gradient(120deg,#0a1a2a,#ff8533)",
                }}
              >
                <div>
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="text-[10px] text-white/80">
                    {s.duration} · {s.level}
                  </p>
                </div>
                {s.aiSuggested && <AiBadge />}
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <p className="text-xs text-foreground-muted">{s.focus}</p>
                <span className="text-[10px] text-accent">{s.caloriesHint}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
