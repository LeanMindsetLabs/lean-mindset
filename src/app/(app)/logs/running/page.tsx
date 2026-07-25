"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocalStorageList } from "@/lib/useLocalStorage";
import { SparkBars } from "@/components/ui/Charts";

type RunEntry = {
  id: string;
  date: string;
  distanceKm: number;
  minutes: number;
  note: string;
};

const seed: RunEntry[] = [
  {
    id: "r1",
    date: "2026-07-22",
    distanceKm: 3.2,
    minutes: 28,
    note: "Easy pace after Meal 2",
  },
  {
    id: "r2",
    date: "2026-07-20",
    distanceKm: 5.0,
    minutes: 42,
    note: "NEAT day push",
  },
];

export default function RunningLogsPage() {
  const { items, add, remove, ready } = useLocalStorageList<RunEntry>(
    "lm-running-logs",
    seed,
  );
  const [distance, setDistance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [note, setNote] = useState("");

  const distances = items.map((i) => i.distanceKm).reverse();

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const d = Number.parseFloat(distance);
    const m = Number.parseFloat(minutes);
    if (!Number.isFinite(d) || !Number.isFinite(m)) return;
    add({
      id: `r-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      distanceKm: d,
      minutes: m,
      note: note.trim() || "Run logged",
    });
    setDistance("");
    setMinutes("");
    setNote("");
  }

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/logs" className="text-sm text-accent">
          ← Logs
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Running</h1>
      </header>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-xs text-foreground-muted">Distance trend (km)</p>
        <div className="mt-2">
          <SparkBars values={distances.length ? distances : [2, 3, 4]} height={48} />
        </div>
      </section>

      <form
        onSubmit={onAdd}
        className="flex flex-col gap-2 rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated p-4"
      >
        <p className="text-sm font-semibold">Add run</p>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="km"
            inputMode="decimal"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <input
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="minutes"
            inputMode="numeric"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="rounded-full bg-accent py-2.5 text-sm font-bold text-white"
        >
          Save run
        </button>
      </form>

      {!ready ? (
        <p className="text-xs text-foreground-subtle">Loading…</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-3"
            >
              <div
                className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-accent-soft"
              >
                <span className="text-sm font-bold text-accent">{entry.distanceKm}</span>
                <span className="text-[8px] text-accent">km</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{entry.date}</p>
                <p className="text-xs text-foreground-muted">
                  {entry.minutes} min · {entry.note}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(entry.id)}
                className="text-[10px] text-foreground-subtle hover:text-danger"
              >
                Del
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
