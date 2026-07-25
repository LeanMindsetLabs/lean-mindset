import Link from "next/link";
import { SparkBars } from "@/components/ui/Charts";

export default function LogsHubPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Logs</h1>
        <p className="text-sm text-foreground-muted">Running & workout history</p>
      </header>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-xs text-foreground-muted">7-day activity (mock)</p>
        <div className="mt-2">
          <SparkBars values={[20, 45, 30, 60, 40, 75, 55]} height={56} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3">
        <Link
          href="/logs/running"
          className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
        >
          <div
            className="flex aspect-[5/2] flex-col justify-end p-4"
            style={{ background: "linear-gradient(120deg,#0a1a2a,#ff6b00)" }}
          >
            <p className="font-display text-3xl uppercase text-white">Running</p>
            <p className="text-xs text-white/80">Distance · pace · notes</p>
          </div>
        </Link>
        <Link
          href="/logs/workouts"
          className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
        >
          <div
            className="flex aspect-[5/2] flex-col justify-end p-4"
            style={{ background: "linear-gradient(120deg,#2a0a0a,#ff8533)" }}
          >
            <p className="font-display text-3xl uppercase text-white">Workouts</p>
            <p className="text-xs text-white/80">Sessions · duration · RPE</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
