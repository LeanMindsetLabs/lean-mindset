import Link from "next/link";
import { RadarScore, HorizontalBar } from "@/components/ui/Charts";
import { getMemberMetrics } from "@/lib/member-metrics";
import { nutritionRingsMock, weekAdherence } from "@/data/dashboard";
import { dashboardMock } from "@/components/homeMock";

export default async function ScoreBreakdownPage() {
  const metrics = await getMemberMetrics();
  const day = metrics.day ?? dashboardMock.day;
  const totalDays = dashboardMock.totalDays;
  const pct = Math.min(100, Math.round((day / totalDays) * 100));
  const waterDone = metrics.water ?? dashboardMock.waterLitersDone;
  const waterTarget = dashboardMock.waterLitersTarget;
  const mealsDone = metrics.mealsCount || dashboardMock.mealsDone;
  const mealsTarget = dashboardMock.mealsTarget;
  const fitnessScore = Math.round(55 + pct * 0.35);

  const axes = [
    { label: "Meals", value: (mealsDone / mealsTarget) * 100 },
    { label: "Protein", value: nutritionRingsMock.proteinPct },
    { label: "Water", value: (waterDone / waterTarget) * 100 },
    { label: "Train", value: dashboardMock.workoutLogged ? 90 : 35 },
    { label: "Rest", value: 72 },
  ];

  return (
    <div className="flex flex-col gap-4 pt-1">
      <header className="flex items-center justify-between">
        <Link href="/home" className="text-sm font-semibold text-accent">
          ← Home
        </Link>
        <h1 className="text-base font-bold">Score breakdown</h1>
        <span className="w-10" aria-hidden />
      </header>

      <section className="rounded-2xl bg-accent p-4 text-white shadow-[0_12px_32px_rgba(255,107,0,0.25)]">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/80">
          Lean Mindset Score
        </p>
        <p className="font-display mt-1 text-5xl leading-none">{fitnessScore}</p>
        <p className="mt-1 text-xs text-white/85">
          Day {day}/{totalDays} · {pct}% of lab complete
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-background-card p-4">
        <p className="mb-2 text-center text-xs text-foreground-muted">
          Orange = you · Blue dashed = goal band
        </p>
        <RadarScore axes={axes} size={240} />
      </section>

      <section className="rounded-2xl border border-border bg-background-elevated p-4">
        <h2 className="mb-3 text-sm font-semibold">You as…</h2>
        <ul className="space-y-3">
          {axes.map((a) => (
            <li key={a.label}>
              <HorizontalBar label={a.label} value={Math.round(a.value)} max={100} unit="%" />
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-background-card p-4">
        <h2 className="mb-2 text-sm font-semibold">This week</h2>
        <div className="flex h-16 items-end justify-between gap-1">
          {weekAdherence.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full max-w-[22px] rounded-t-md bg-accent"
                style={{ height: `${Math.max(12, d.pct)}%` }}
              />
              <span className="text-[9px] text-foreground-subtle">{d.day}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
