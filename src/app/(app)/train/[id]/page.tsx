import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession, trainingSessions } from "@/data/training";
import { AiBadge } from "@/components/ui/VisualKit";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { trainThumbs } from "@/lib/media";

export default async function TrainSessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();
  const thumbIdx = Math.max(0, trainingSessions.findIndex((s) => s.id === id));

  return (
    <div className="flex flex-col gap-4 pt-2">
      <Link href="/train" className="text-sm text-accent">
        ← Training
      </Link>

      <div className="relative overflow-hidden rounded-[var(--lm-radius-xl)] border border-border">
        <div className="relative aspect-[16/9]">
          <Image
            src={trainThumbs[thumbIdx % trainThumbs.length]}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: `${30 + (thumbIdx % 4) * 12}% 30%` }}
            sizes="512px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <div className="flex gap-2">
              {session.aiSuggested && <AiBadge />}
              <span className="rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white">
                {session.level}
              </span>
            </div>
            <div>
              <h1 className="font-display text-4xl uppercase text-white">{session.name}</h1>
              <p className="mt-1 text-sm text-white/85">
                {session.duration} · {session.focus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="flex items-center gap-4 rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <ProgressRing percent={0} size={72} stroke={8} label="0%" sublabel="done" />
        <div>
          <p className="text-sm font-semibold">{session.caloriesHint}</p>
          <p className="mt-1 text-xs text-foreground-muted">{session.detail}</p>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold">Exercises</h2>
        <ul className="flex flex-col gap-2">
          {session.exercises.map((ex, i) => (
            <li
              key={ex.name}
              className="flex items-center gap-3 rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{ex.name}</p>
                <p className="text-xs text-foreground-muted">
                  {ex.sets}
                  {ex.note ? ` · ${ex.note}` : ""}
                </p>
              </div>
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-accent/40 to-transparent" />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/music"
          className="rounded-full border border-border py-3 text-center text-sm font-semibold"
        >
          Pick music
        </Link>
        <Link
          href="/logs/workouts"
          className="rounded-full bg-accent py-3 text-center text-sm font-bold text-white"
        >
          Log workout
        </Link>
      </div>
    </div>
  );
}
