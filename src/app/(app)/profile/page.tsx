import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { getSessionProfile, passesCoachGate } from "@/lib/auth/role";
import { getMemberMetrics } from "@/lib/member-metrics";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SparkBars, HorizontalBar } from "@/components/ui/Charts";
import { dashboardMock } from "@/components/homeMock";

export default async function ProfilePage() {
  const session = await getSessionProfile();
  const email = session?.email ?? null;
  const name = session?.profile?.full_name ?? null;
  const isCoach = passesCoachGate(session?.profile?.role, email);
  const metrics = await getMemberMetrics();

  const day = metrics.day ?? dashboardMock.day;
  const pct = Math.min(100, Math.round((day / dashboardMock.totalDays) * 100));
  const weights =
    metrics.weights.length > 0
      ? metrics.weights
      : [182, 181.2, 180.5, 180.8, 179.4, 178.9, 178.4];

  return (
    <div className="flex min-h-[60dvh] flex-col gap-4 pt-4">
      <h1 className="font-display text-3xl uppercase">Profile</h1>

      <div className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(255,107,0,0.45), transparent 70%)",
          }}
        />
        <p className="text-sm text-foreground-muted">Signed in as</p>
        <p className="mt-1 text-lg font-semibold">{name || "Member"}</p>
        <p className="text-sm text-foreground-muted">{email || "Not connected"}</p>
        {isCoach && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent">
            Coach
          </p>
        )}
      </div>

      <section className="flex items-center gap-4 rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4">
        <ProgressRing percent={pct} size={88} stroke={9} sublabel="lab" />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase text-accent">Metrics</p>
          <p className="font-display text-3xl">Day {day}</p>
          <p className="text-sm text-foreground-muted">
            {metrics.weightLb != null
              ? `${metrics.weightLb} lb`
              : "Log weight in check-in"}
            {metrics.changeLb != null ? ` · ${metrics.changeLb} lb` : ""}
          </p>
          <p className="mt-1 text-xs text-foreground-subtle">
            Streak hint: {metrics.streakHint || dashboardMock.streakDays} days
          </p>
        </div>
      </section>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Weight sparkline</h2>
          <span className="text-[10px] text-foreground-subtle">
            {metrics.weights.length ? "Live" : "Mock"}
          </span>
        </div>
        <SparkBars values={weights} height={52} />
        <div className="mt-3">
          <HorizontalBar label="Lab progress" value={day} max={dashboardMock.totalDays} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/program"
          className="overflow-hidden rounded-[var(--lm-radius-md)] border border-border"
        >
          <div
            className="flex aspect-[2/1] items-end p-3"
            style={{ background: "linear-gradient(135deg,#1a1408,#ff6b00)" }}
          >
            <span className="text-sm font-bold text-white">Program</span>
          </div>
        </Link>
        <Link
          href="/check-in"
          className="overflow-hidden rounded-[var(--lm-radius-md)] border border-border"
        >
          <div
            className="flex aspect-[2/1] items-end p-3"
            style={{ background: "linear-gradient(135deg,#0a1a2a,#ff8533)" }}
          >
            <span className="text-sm font-bold text-white">Check-in</span>
          </div>
        </Link>
      </div>

      {isCoach && (
        <Link
          href="/coach"
          className="rounded-[var(--lm-radius-md)] border border-accent/40 bg-accent-soft px-4 py-3 text-sm font-semibold text-accent"
        >
          Coach inbox →
        </Link>
      )}

      <div className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-sm text-foreground-muted">Coming soon</p>
        <p className="mt-1 text-xs text-foreground-subtle">
          Body-scan AI · video calls · hardware BP/HR — stub only
        </p>
      </div>

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-[var(--lm-radius-md)] border border-border px-4 py-3 text-sm font-medium text-foreground-muted hover:border-danger hover:text-danger"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
