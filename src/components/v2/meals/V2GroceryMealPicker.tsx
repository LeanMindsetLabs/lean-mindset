"use client";

import { useMemo } from "react";
import {
  bowlItemsSub,
  type V2SavedBowl,
} from "@/components/v2/meals/v2BowlStore";
import {
  V2_FOODS,
  type V2FoodCat,
  type V2FoodItem,
} from "@/components/v2/meals/v2MealCatalog";

export type V2GroceryFilter = "bowls" | V2FoodCat;

const FILTERS: { id: V2GroceryFilter; label: string }[] = [
  { id: "bowls", label: "Bowls" },
  { id: "protein", label: "Proteins" },
  { id: "veggie", label: "Veggies" },
  { id: "fruit", label: "Fruit" },
  { id: "pantry", label: "Pantry" },
];

const BOWL_EMOJI: Record<V2SavedBowl["cat"], string> = {
  protein: "🍗",
  veggie: "🥦",
  fruit: "🫐",
};

type Props = {
  bowls: V2SavedBowl[];
  query: string;
  onQueryChange: (q: string) => void;
  filter: V2GroceryFilter;
  onFilterChange: (f: V2GroceryFilter) => void;
  selectedId: string | null;
  onAddFood: (f: V2FoodItem) => void;
  onAddBowl: (b: V2SavedBowl) => void;
  onBuildBowl: () => void;
  onOpenGrocery: () => void;
};

/** Compact grocery add: label, search, category chips, horizontal tiles + Build Your Bowl. */
export function V2GroceryMealPicker({
  bowls,
  query,
  onQueryChange,
  filter,
  onFilterChange,
  selectedId,
  onAddFood,
  onAddBowl,
  onBuildBowl,
  onOpenGrocery,
}: Props) {
  const foods = useMemo(() => {
    if (filter === "bowls") return [];
    const q = query.trim().toLowerCase();
    return V2_FOODS.filter((f) => {
      if (f.cat !== filter) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const bowlCards = useMemo(() => {
    if (filter !== "bowls") return [];
    const q = query.trim().toLowerCase();
    return bowls.filter((b) => !q || b.name.toLowerCase().includes(q));
  }, [filter, query, bowls]);

  return (
    <>
      <div className="sheet-label">
        <span className="eyebrow muted">Add from your lab&apos;s grocery list</span>
        <button type="button" className="link" style={{ fontSize: 11 }} onClick={onOpenGrocery}>
          Grocery list →
        </button>
      </div>
      <label className="search-field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search bowls, chicken, broccoli..."
        />
      </label>

      <div className="pill-row">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`pill${filter === id ? " active" : ""}`}
            onClick={() => onFilterChange(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="food-hscroll" role="list">
        {filter === "bowls" ? (
          <>
            <button
              type="button"
              role="listitem"
              className="food-tile food-tile-sm food-tile-cta"
              onClick={onBuildBowl}
            >
              <span className="food-emoji" aria-hidden>
                +
              </span>
              <span className="food-name">Build Your Bowl</span>
              <span className="food-kcal">Custom</span>
            </button>
            {bowlCards.map((b) => (
              <button
                key={b.id}
                type="button"
                role="listitem"
                className={`food-tile food-tile-sm${selectedId === b.id ? " selected" : ""}`}
                onClick={() => onAddBowl(b)}
              >
                <span className="food-emoji" aria-hidden>
                  {BOWL_EMOJI[b.cat]}
                </span>
                <span className="food-name">{b.name}</span>
                <span className="food-kcal">{bowlItemsSub(b.items)}</span>
              </button>
            ))}
          </>
        ) : (
          foods.map((f) => (
            <button
              key={f.id}
              type="button"
              role="listitem"
              className={`food-tile food-tile-sm${selectedId === f.id ? " selected" : ""}`}
              onClick={() => onAddFood(f)}
            >
              <span className="food-emoji" aria-hidden>
                {f.emoji}
              </span>
              <span className="food-name">{f.name}</span>
              <span className="food-kcal">{f.kcal} kcal</span>
            </button>
          ))
        )}
      </div>
    </>
  );
}
