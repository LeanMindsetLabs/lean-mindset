import Image from "next/image";
import Link from "next/link";
import { sessionsByPhase } from "@/data/training";
import { AiBadge } from "@/components/ui/VisualKit";
import { WeekBars } from "@/components/ui/Charts";
import { trainThumbs } from "@/lib/media";
import { weekAdherence } from "@/data/dashboard";

export default function TrainPage() {
  const foundation = sessionsByPhase("foundation");
  const acceleration = sessionsByPhase("acceleration");

  return (
    <div className="flex flex-col gap-4 pt-1">
      <header>
        <h1 className="font-display text-2xl uppercase">Train</h1>
        <p className="text-xs text-[#94a3b8]">Foundation → acceleration · this lab only</p>
      </header>

      <section className="rounded-[18px] border border-[#64748b]/28 bg-[#0d1118] p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-[#60a5fa]">Weeks 1–2</p>
        <p className="mt-1 font-semibold text-white">Walk + Core A</p>
        <p className="text-[10px] text-[#64748b]">25–30 min · Beginner</p>
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
