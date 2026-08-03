import Link from "next/link";
import { aiSessions } from "@/data/training";
import { AiBadge, MediaCard } from "@/components/ui/VisualKit";
import { trainThumbs } from "@/lib/media";

export default function AiTrainPage() {
  const list = aiSessions();

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/train" className="text-sm text-accent">
          ← Training
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <h1 className="font-display text-3xl uppercase">AI exercises</h1>
          <AiBadge />
        </div>
        <p className="mt-1 text-sm text-foreground-muted">
          Suggested sessions for desk days, finishers, and acceleration.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {list.map((s, i) => (
          <MediaCard
            key={s.id}
            href={`/train/${s.id}`}
            gradient={
              s.phase === "acceleration"
                ? "linear-gradient(135deg,#2a0a0a,var(--accent))"
                : "linear-gradient(135deg,#0a1a2a,var(--accent-hover))"
            }
            image={trainThumbs[i % trainThumbs.length]}
            title={s.name}
            subtitle={`${s.duration} · ${s.focus} · ${s.caloriesHint}`}
            badge={<AiBadge />}
          />
        ))}
      </div>
    </div>
  );
}
