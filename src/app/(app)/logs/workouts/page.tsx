"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocalStorageList } from "@/lib/useLocalStorage";
import { trainingSessions } from "@/data/training";
import { WeekBars } from "@/components/ui/Charts";

type WorkoutEntry = {
  id: string;
  date: string;
  sessionName: string;
  minutes: number;
  rpe: number;
};

const seed: WorkoutEntry[] = [
  {
    id: "w1",
    date: "2026-07-23",
    sessionName: "Walk + Core A",
    minutes: 28,
    rpe: 5,
  },
  {
    id: "w2",
    date: "2026-07-21",
    sessionName: "Full Body Light",
    minutes: 32,
    rpe: 6,
  },
];

export default function WorkoutLogsPage() {
  const { items, add, remove, ready } = useLocalStorageList<WorkoutEntry>(
    "lm-workout-logs",
    seed,
  );
  const [sessionName, setSessionName] = useState(trainingSessions[0]?.name ?? "");
  const [minutes, setMinutes] = useState("");
  const [rpe, setRpe] = useState("6");

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const m = Number.parseFloat(minutes);
    const r = Number.parseFloat(rpe);
    if (!sessionName || !Number.isFinite(m)) return;
    add({
      id: `w-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      sessionName,
      minutes: m,
      rpe: Number.isFinite(r) ? r : 5,
    });
    setMinutes("");
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/logs" className="text-sm text-accent">
          ← Logs
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Workouts</h1>
      </header>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="mb-2 text-xs text-foreground-muted">Weekly volume feel</p>
        <WeekBars
          data={[
            { day: "M", pct: 70 },
            { day: "T", pct: 40 },
            { day: "W", pct: 90 },
            { day: "T", pct: 55 },
            { day: "F", pct: 80 },
            { day: "S", pct: 30 },
            { day: "S", pct: 20 },
          ]}
        />
      </section>

      <form
        onSubmit={onAdd}
        className="flex flex-col gap-2 rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4"
      >
        <p className="text-sm font-semibold">Log session</p>
        <select
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        >
          {trainingSessions.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="minutes"
            inputMode="numeric"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <input
            value={rpe}
            onChange={(e) => setRpe(e.target.value)}
            placeholder="RPE 1–10"
            inputMode="numeric"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-accent py-2.5 text-sm font-bold text-white"
        >
          Save workout
        </button>
      </form>

      {!ready ? (
        <p className="text-xs text-foreground-subtle">Loading…</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((entry) => (
            <li
              key={entry.id}
              className="overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-card"
            >
              <div
                className="h-1.5"
                style={{
                  width: `${Math.min(100, entry.rpe * 10)}%`,
                  background: "var(--accent)",
                }}
              />
              <div className="flex items-center gap-3 p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-[var(--lm-radius-md)] bg-accent-soft">
                  <span className="text-sm font-bold text-accent">{entry.minutes}</span>
                  <span className="text-[8px] text-accent">min</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{entry.sessionName}</p>
                  <p className="text-xs text-foreground-muted">
                    {entry.date} · RPE {entry.rpe}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(entry.id)}
                  className="text-[10px] text-foreground-subtle hover:text-danger"
                >
                  Del
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
