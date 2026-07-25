import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { getSessionProfile, passesCoachGate } from "@/lib/auth/role";
import { getMemberMetrics } from "@/lib/member-metrics";
import { SparkBars, HorizontalBar } from "@/components/ui/Charts";
import { dashboardMock } from "@/components/homeMock";

export default async function ProfilePage() {
  const session = await getSessionProfile();
  const email = session?.email ?? null;
  const name = session?.profile?.full_name ?? email?.split("@")[0] ?? "Member";
  const isCoach = passesCoachGate(session?.profile?.role, email);
  const metrics = await getMemberMetrics();

  const day = metrics.day ?? dashboardMock.day;
  const pct = Math.min(100, Math.round((day / dashboardMock.totalDays) * 100));
  const fitnessScore = Math.round(55 + pct * 0.35);
  const streak = metrics.streakHint || dashboardMock.streakDays;
  const weights =
    metrics.weights.length > 0
      ? metrics.weights
      : [182, 181.2, 180.5, 180.8, 179.4, 178.9, 178.4];

  return (
    <div className="flex flex-col gap-3 pt-1">
      <header className="flex items-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
          {name.slice(0, 1).toUpperCase()}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold">{name}</h1>
          <p className="truncate text-xs text-foreground-muted">{email || "Guest"}</p>
        </div>
        {isCoach && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
            Coach
          </span>
        )}
      </header>

      <Link
        href="/home/score"
        className="flex items-center gap-3 rounded-2xl bg-accent p-3 text-white shadow-[0_12px_28px_rgba(255,107,0,0.25)]"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-black/20">
          <span className="font-display text-3xl leading-none">{fitnessScore}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Lean Mindset Score</p>
          <p className="text-xs text-white/85">
            Day {day}/{dashboardMock.totalDays} · {streak}-day streak
          </p>
        </div>
        <span className="text-white/80">›</span>
      </Link>

      <section className="rounded-2xl border border-border bg-background-card p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Weight</h2>
          <span className="text-[10px] text-foreground-subtle">
            {metrics.weights.length ? "Live" : "Mock until logged"}
          </span>
        </div>
        <p className="text-xl font-bold">
          {metrics.weightLb != null ? `${metrics.weightLb} lb` : "178.4 lb"}
          {metrics.changeLb != null ? (
            <span className="ml-2 text-sm font-semibold text-accent">{metrics.changeLb} lb</span>
          ) : null}
        </p>
        <div className="mt-2">
          <SparkBars values={weights.map((w) => 200 - w)} height={40} />
        </div>
        <div className="mt-3">
          <HorizontalBar label="Lab progress" value={day} max={dashboardMock.totalDays} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/program"
          className="rounded-2xl border border-border bg-background-elevated px-3 py-3 text-sm font-semibold"
        >
          Program →
        </Link>
        <Link
          href="/check-in"
          className="rounded-2xl border border-border bg-background-elevated px-3 py-3 text-sm font-semibold"
        >
          Check-in →
        </Link>
      </div>

      {isCoach && (
        <Link
          href="/coach"
          className="rounded-2xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm font-semibold text-accent"
        >
          Coach inbox →
        </Link>
      )}

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground-muted hover:border-danger hover:text-danger"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
