import Link from "next/link";
import { ProgramPage } from "@/components/ProgramPage";
import { waterPlan, programMeta } from "@/data/program";
import { ProgressRing, MiniRing } from "@/components/ui/ProgressRing";
import { HorizontalBar } from "@/components/ui/Charts";
import { getMemberMetrics } from "@/lib/member-metrics";

export default async function WaterPage() {
  const metrics = await getMemberMetrics();
  const done = metrics.water ?? 2.3;
  const target = programMeta.waterLitersTarget;
  const pct = Math.min(100, Math.round((done / target) * 100));

  return (
    <ProgramPage title={waterPlan.title} subtitle={waterPlan.subtitle}>
      <section className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-5">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgba(255,107,0,0.25), transparent 55%)",
          }}
        />
        <div className="relative flex items-center gap-5">
          <ProgressRing
            percent={pct}
            label={`${done}`}
            sublabel={`/ ${target} L`}
          />
          <div>
            <p className="text-xs font-semibold uppercase text-accent">Today</p>
            <p className="font-display text-3xl">{pct}%</p>
            <p className="text-sm text-foreground-muted">
              {(target - done).toFixed(1)} L remaining
            </p>
            <Link href="/check-in" className="mt-2 inline-block text-xs font-semibold text-accent">
              Log in check-in →
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <HorizontalBar label="Hydration" value={done} max={target} unit=" L" />
      </section>

      <ul className="flex flex-col gap-2">
        {waterPlan.checkpoints.map((c, i) => {
          const segmentPct = Math.min(100, Math.max(0, (pct - i * 18) * 1.2));
          return (
            <li
              key={c.time}
              className="flex items-center gap-3 rounded-[var(--lm-radius-lg)] border border-border bg-background-card px-3 py-3"
            >
              <div className="relative shrink-0">
                <MiniRing percent={segmentPct} size={48} stroke={5} />
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{c.time}</p>
              </div>
              <span className="font-display text-xl text-accent">{c.amount}</span>
            </li>
          );
        })}
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
