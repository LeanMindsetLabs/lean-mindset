import Image from "next/image";
import Link from "next/link";
import { sessionsByPhase, aiSessions } from "@/data/training";
import { AiBadge } from "@/components/ui/VisualKit";
import { MiniRing } from "@/components/ui/ProgressRing";
import { WeekBars } from "@/components/ui/Charts";
import { media, trainThumbs } from "@/lib/media";
import { weekAdherence } from "@/data/dashboard";

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

      <section className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border">
        <div className="relative aspect-[21/9] min-h-[100px]">
          <Image
            src={media.ui.train}
            alt=""
            fill
            className="object-cover object-[55%_25%]"
            sizes="512px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        <div className="relative -mt-16 px-5 pb-5">
          <div className="flex items-end justify-between gap-4 rounded-[var(--lm-radius-lg)] border border-border bg-background-card/95 p-4 backdrop-blur">
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
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white"
          >
            <AiBadge /> Browse AI picks
          </Link>
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <p className="mb-2 text-xs font-semibold text-foreground-muted">Training adherence</p>
        <WeekBars data={weekAdherence} />
      </section>

      <PhaseBlock label="Weeks 1–2 · Foundation" sessions={foundation} offset={0} />
      <PhaseBlock label="Weeks 3–6 · Acceleration" sessions={acceleration} offset={3} />
    </div>
  );
}

function PhaseBlock({
  label,
  sessions,
  offset,
}: {
  label: string;
  sessions: ReturnType<typeof sessionsByPhase>;
  offset: number;
}) {
  return (
    <section>
      <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{label}</h2>
      <ul className="flex flex-col gap-3">
        {sessions.map((s, i) => (
          <li key={s.id}>
            <Link
              href={`/train/${s.id}`}
              className="lm-card-lift block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card transition hover:border-accent"
            >
              <div className="relative flex aspect-[5/2] items-end justify-between p-3">
                <Image
                  src={trainThumbs[(offset + i) % trainThumbs.length]}
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: `${30 + i * 12}% ${25 + i * 8}%` }}
                  sizes="512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                <div className="relative z-10">
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="text-[10px] text-white/80">
                    {s.duration} · {s.level}
                  </p>
                </div>
                {s.aiSuggested && (
                  <div className="relative z-10">
                    <AiBadge />
                  </div>
                )}
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
