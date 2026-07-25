"use client";

import { useMemo, useState } from "react";

type Review = {
  id: string;
  name: string;
  initial: string;
  date: string;
  title: string;
  body: string;
  stars: number;
  verified: boolean;
  tags: string[];
};

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Julia White",
    initial: "J",
    date: "Jan 2, 2025",
    title: "Amazingly Talented!",
    body: "Coaching was insightful and compassionate. Improved my fitness patterns without extremes.",
    stars: 5,
    verified: true,
    tags: ["Skill", "Conversation"],
  },
  {
    id: "2",
    name: "Marcus Lee",
    initial: "M",
    date: "Dec 18, 2024",
    title: "Labs that stick",
    body: "Daily check-ins + meal structure finally made fat loss feel doable on busy weeks.",
    stars: 5,
    verified: true,
    tags: ["Skill", "Attitude"],
  },
  {
    id: "3",
    name: "Sam Ortiz",
    initial: "S",
    date: "Nov 9, 2024",
    title: "Solid accountability",
    body: "Chat-first coaching kept me honest. Protein and water finally consistent.",
    stars: 4,
    verified: true,
    tags: ["Conversation", "Attitude"],
  },
  {
    id: "4",
    name: "Riley Chen",
    initial: "R",
    date: "Oct 22, 2024",
    title: "Mixed start",
    body: "Took a week to click with the cadence. Once I did, results showed up.",
    stars: 3,
    verified: false,
    tags: ["Conversation"],
  },
];

const POSITIVE = ["Skill", "Conversation", "Muscle Bro", "Attitude"] as const;
const NEGATIVE = ["Rude", "Arrogant", "Selfish", "Greedy"] as const;

const BAR_WIDTHS = [88, 62, 28, 14, 6];

function Stars({ n }: { n: number }) {
  return (
    <span className="tracking-tight text-accent" aria-label={`${n} stars`}>
      {"★".repeat(Math.floor(n))}
      {n % 1 >= 0.5 ? "½" : ""}
      <span className="text-white/20">{"★".repeat(5 - Math.ceil(n))}</span>
    </span>
  );
}

/** Coach reviews UI — rating bars, filter pills, review cards */
export function CoachReviews({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return REVIEWS.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.body.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q);
      const matchesTag = !tag || r.tags.includes(tag);
      return matchesQ && matchesTag;
    });
  }, [query, tag]);

  return (
    <div className={`flex flex-col gap-3 ${compact ? "" : "pt-1"}`}>
      <div className="rounded-2xl border border-border bg-background-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Reviews</h2>
          <span className="text-xs font-semibold text-accent">See All</span>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0">
            <p className="font-display text-4xl leading-none">4.2</p>
            <p className="mt-1 text-[10px] text-foreground-muted">Avr Rating</p>
            <p className="text-[10px] text-foreground-subtle">1,215 users</p>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            {BAR_WIDTHS.map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 text-[10px] text-foreground-subtle">{5 - i}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
          Positive
        </p>
        <div className="flex flex-wrap gap-1.5">
          {POSITIVE.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                tag === t
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="mb-1.5 mt-3 text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
          Negative
        </p>
        <div className="flex flex-wrap gap-1.5">
          {NEGATIVE.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                tag === t
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-background-elevated text-foreground-muted hover:border-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 rounded-2xl border border-border bg-background-card px-3 py-2.5">
        <SearchIcon />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a review..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-foreground-subtle"
        />
      </label>

      <ul className="flex flex-col gap-2">
        {filtered.map((r) => (
          <li key={r.id} className="rounded-2xl border border-border bg-background-card p-3">
            <div className="flex items-start gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {r.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{r.name}</p>
                  <time className="shrink-0 text-[10px] text-foreground-subtle">{r.date}</time>
                </div>
                <p className="mt-0.5 text-sm font-bold">{r.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{r.body}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
                  <Stars n={r.stars} />
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                      <CheckMini /> Verified Review
                    </span>
                  )}
                </div>
                <div className="mt-2 flex gap-3 text-[10px] font-semibold text-foreground-subtle">
                  <button type="button" className="hover:text-accent">
                    Like
                  </button>
                  <button type="button" className="hover:text-accent">
                    Dislike
                  </button>
                  <button type="button" className="hover:text-accent">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-border bg-background-card p-4 text-sm text-foreground-muted">
            No reviews match that filter.
          </li>
        )}
      </ul>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-foreground-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
