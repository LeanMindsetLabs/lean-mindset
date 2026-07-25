import Link from "next/link";
import { listCoachCohortBoard } from "@/app/check-in/actions";
import { requireCoach } from "@/lib/auth/role";
import { redirect } from "next/navigation";

export default async function CoachInboxPage() {
  const coach = await requireCoach();
  if (!coach) redirect("/");

  const { items, error } = await listCoachCohortBoard();

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Coach
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Cohort board</h1>
        <p className="text-sm text-foreground-muted">
          Members · last check-in · reply in-thread
        </p>
      </header>

      {error && <p className="text-sm text-danger">{error}</p>}

      {!error && items.length === 0 && (
        <p className="rounded-[var(--lm-radius-md)] border border-border bg-background-card p-4 text-sm text-foreground-muted">
          No cohort members yet. Create a cohort, promote yourself as coach, and
          have clients open Check-in (they auto-join the default cohort).
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const label =
            item.client_name?.trim() ||
            item.client_email ||
            "Client";
          const href = item.conversation_id
            ? `/coach/${item.conversation_id}`
            : null;
          const metrics = [
            item.day != null ? `Day ${item.day}` : null,
            item.weight_lb != null ? `${item.weight_lb} lb` : null,
            item.change_lb != null
              ? `Δ ${item.change_lb > 0 ? "+" : ""}${item.change_lb}`
              : null,
            item.water != null ? `Water ${item.water}` : null,
          ].filter(Boolean);

          const inner = (
            <>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold">{label}</p>
                <time className="shrink-0 text-[10px] text-foreground-subtle">
                  {item.last_check_in_at
                    ? formatShort(item.last_check_in_at)
                    : "—"}
                </time>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {item.statuses.map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
              </div>
              {metrics.length > 0 && (
                <p className="mt-1.5 text-xs text-foreground-muted">
                  {metrics.join(" · ")}
                </p>
              )}
              {!item.conversation_id && (
                <p className="mt-1 text-[10px] text-foreground-subtle">
                  No thread yet
                </p>
              )}
            </>
          );

          return (
            <li key={item.user_id}>
              {href ? (
                <Link
                  href={href}
                  className="block rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3 transition hover:border-accent"
                >
                  {inner}
                </Link>
              ) : (
                <div className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3 opacity-80">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "sent_today" | "missing" | "needs_reply";
}) {
  const map = {
    sent_today: {
      label: "Sent today",
      className: "border-accent/40 bg-accent-soft text-accent",
    },
    missing: {
      label: "Missing",
      className: "border-border bg-background-elevated text-foreground-muted",
    },
    needs_reply: {
      label: "Needs reply",
      className: "border-orange-500/50 bg-orange-500/15 text-orange-300",
    },
  } as const;
  const cfg = map[status];
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

function formatShort(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}
