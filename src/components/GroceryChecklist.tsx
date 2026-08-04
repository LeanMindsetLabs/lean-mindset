"use client";

import { useEffect, useMemo, useState } from "react";

import {
  GROCERY_STORAGE_KEY,
  groceryItemKey,
  parseGroceryItemKey,
} from "@/lib/grocery/grocery-keys";

type GrocerySection = {
  aisle: string;
  items: string[];
};

const STORAGE_KEY = GROCERY_STORAGE_KEY;

function itemKey(aisle: string, item: string) {
  return groceryItemKey(aisle, item);
}

function parseKey(key: string) {
  return parseGroceryItemKey(key);
}

export function GroceryChecklist({ sections }: { sections: GrocerySection[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState<"yours" | string>(sections[0]?.aisle ?? "yours");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setSelected(new Set(parsed));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
  }, [selected, hydrated]);

  const tabs = useMemo(
    () => [
      { id: "yours", label: "Your List", count: selected.size },
      ...sections.map((s) => ({
        id: s.aisle,
        label: shortAisle(s.aisle),
        count: s.items.filter((item) => selected.has(itemKey(s.aisle, item)))
          .length,
      })),
    ],
    [sections, selected],
  );

  function toggle(aisle: string, item: string) {
    const key = itemKey(aisle, item);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function clearAll() {
    setSelected(new Set());
  }

  const yourItems = useMemo(() => {
    return [...selected]
      .map(parseKey)
      .sort((a, b) => a.aisle.localeCompare(b.aisle) || a.item.localeCompare(b.item));
  }, [selected]);

  const activeSection = sections.find((s) => s.aisle === tab);

  return (
    <div className="relative flex flex-col gap-3 pb-20">
      <div
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1"
        role="tablist"
        aria-label="Grocery sections"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "bg-accent text-white"
                  : "border border-border bg-background-card text-foreground-muted hover:border-accent"
              }`}
            >
              {t.label}
              {t.count > 0 ? (
                <span className={`ml-1.5 ${active ? "text-white/80" : "text-accent"}`}>
                  {t.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {tab === "yours" ? (
        <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-accent">Your List</h2>
            {yourItems.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-foreground-muted hover:text-danger"
              >
                Clear all
              </button>
            )}
          </div>
          {!hydrated ? (
            <p className="text-sm text-foreground-muted">Loading…</p>
          ) : yourItems.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              Use Add on Proteins, Vegetables, and other tabs to build your list.
            </p>
          ) : (
            <ul className="space-y-2">
              {yourItems.map(({ aisle, item }) => {
                const key = itemKey(aisle, item);
                return (
                  <li key={key}>
                    <div className="flex items-center gap-3 rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-2.5">
                      <CheckBox checked />
                      <button
                        type="button"
                        onClick={() => toggle(aisle, item)}
                        className="min-w-0 flex-1 text-left text-sm"
                      >
                        <span className="block font-medium">{item}</span>
                        <span className="text-[10px] text-foreground-subtle">{aisle}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggle(aisle, item)}
                        className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-foreground-muted hover:border-danger hover:text-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : activeSection ? (
        <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
          <h2 className="mb-3 font-semibold text-accent">{activeSection.aisle}</h2>
          <ul className="space-y-2">
            {activeSection.items.map((item) => {
              const key = itemKey(activeSection.aisle, item);
              const checked = selected.has(key);
              return (
                <li key={key}>
                  <div
                    className={`flex items-center gap-3 rounded-[var(--lm-radius-md)] border px-3 py-2.5 ${
                      checked
                        ? "border-accent/50 bg-accent-soft"
                        : "border-border bg-background-elevated"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(activeSection.aisle, item)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      aria-pressed={checked}
                    >
                      <CheckBox checked={checked} />
                      <span
                        className={`text-sm font-medium ${
                          checked ? "text-foreground" : "text-foreground-muted"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggle(activeSection.aisle, item)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                        checked
                          ? "bg-accent text-white"
                          : "border border-border text-foreground hover:border-accent hover:text-accent"
                      }`}
                    >
                      {checked ? "Added" : "Add"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="pointer-events-none fixed bottom-[calc(var(--nav-height)+var(--safe-bottom)+8px)] left-1/2 z-40 w-full max-w-[var(--app-max-width)] -translate-x-1/2 px-4">
        <button
          type="button"
          onClick={() => setTab("yours")}
          className="pointer-events-auto flex w-full items-center justify-between rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white lm-shadow-accent-md"
        >
          <span>Your List</span>
          <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-xs">
            {selected.size} {selected.size === 1 ? "item" : "items"}
          </span>
        </button>
      </div>
    </div>
  );
}

function shortAisle(aisle: string) {
  if (aisle === "Carbs & fruit") return "Carbs / Fruit";
  if (aisle === "Pantry & fats") return "Pantry";
  return aisle;
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
        checked
          ? "border-accent bg-accent text-white"
          : "border-foreground-subtle bg-transparent"
      }`}
    >
      {checked ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}
