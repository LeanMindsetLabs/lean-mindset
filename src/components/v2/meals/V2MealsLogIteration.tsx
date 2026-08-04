"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useV2Ui, type V2MealId } from "@/components/v2/V2UiContext";
import { V2AddedMealRows } from "@/components/v2/meals/V2AddedMealRows";
import { V2CreateBowlSheet } from "@/components/v2/meals/V2CreateBowlSheet";
import { V2MealPickerCards } from "@/components/v2/meals/V2MealPickerCards";
import { V2MealSummaryEditable } from "@/components/v2/meals/V2MealSummaryEditable";
import {
  bowlItemsSub,
  useV2SavedBowls,
  type V2SavedBowl,
} from "@/components/v2/meals/v2BowlStore";
import {
  V2_BOWL_PRESETS,
  V2_FOODS,
  formatMealSummary,
  type V2AddedLine,
  type V2FoodCat,
  type V2FoodItem,
} from "@/components/v2/meals/v2MealCatalog";

type Filter = "all" | V2FoodCat;

export function V2MealsLogIteration() {
  const { meals, saveMealLog, openGrocery } = useV2Ui();
  const { bowls, addBowl } = useV2SavedBowls();
  const [activeId, setActiveId] = useState<V2MealId>(
    () => meals.find((m) => !m.logged)?.id ?? "snack1",
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>("berries");
  const [createBowlOpen, setCreateBowlOpen] = useState(false);
  const [bowlActive, setBowlActive] = useState<Record<string, boolean>>({
    pb1: true,
    pb2: false,
    vb1: true,
  });
  const [added, setAdded] = useState<V2AddedLine[]>(() => [
    ...V2_BOWL_PRESETS.map((b) => ({ ...b })),
    { id: "berries", name: "Mixed berries", sub: "70 kcal", qty: 1 },
  ]);

  const meal = meals.find((m) => m.id === activeId) ?? meals[0]!;

  const foods = useMemo(() => {
    const q = query.trim().toLowerCase();
    return V2_FOODS.filter((f) => {
      if (filter !== "all" && f.cat !== filter) return false;
      if (q && !f.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const summary = useMemo(() => formatMealSummary(added), [added]);

  function setQty(id: string, next: number) {
    setAdded((prev) =>
      prev
        .map((a) => (a.id === id ? { ...a, qty: Math.max(0, next) } : a))
        .filter((a) => a.qty > 0),
    );
    if (next <= 0) setBowlActive((prev) => ({ ...prev, [id]: false }));
  }

  function addFood(f: V2FoodItem) {
    setSelectedFoodId(f.id);
    setAdded((prev) => {
      const hit = prev.find((a) => a.id === f.id);
      if (hit) {
        return prev.map((a) => (a.id === f.id ? { ...a, qty: a.qty + 1 } : a));
      }
      return [...prev, { id: f.id, name: f.name, sub: `${f.kcal} kcal`, qty: 1 }];
    });
  }

  function toggleBowl(b: V2SavedBowl) {
    const sub = bowlItemsSub(b.items);
    setBowlActive((prev) => {
      const on = !prev[b.id];
      if (on) {
        setAdded((rows) => {
          if (rows.some((r) => r.id === b.id)) return rows;
          return [...rows, { id: b.id, name: b.name, sub, qty: 1 }];
        });
      } else {
        setAdded((rows) => rows.filter((r) => r.id !== b.id));
      }
      return { ...prev, [b.id]: on };
    });
  }

  function handleCreatedBowl(draft: { cat: V2SavedBowl["cat"]; items: string[] }) {
    const bowl = addBowl(draft.cat, draft.items);
    const sub = bowlItemsSub(bowl.items);
    setBowlActive((prev) => ({ ...prev, [bowl.id]: true }));
    setAdded((rows) => {
      if (rows.some((r) => r.id === bowl.id)) return rows;
      return [...rows, { id: bowl.id, name: bowl.name, sub, qty: 1 }];
    });
  }

  return (
    <div className="screen meals-log">
      <div className="page-head meals-overview-head">
        <div>
          <h1>Meals Log</h1>
          <div className="page-sub">Today · your meal plan</div>
        </div>
        <Link href="/v2/program" className="link">
          Lab guide →
        </Link>
      </div>

      <V2MealPickerCards meals={meals} activeId={activeId} onSelect={setActiveId} />

      <div className="card fuel-card">
        <div className="ring lg" style={{ ["--pct" as string]: 73 }}>
          <span>
            1,600
            <br />
            <small style={{ fontWeight: 600, fontSize: 10, color: "var(--text-dim)" }}>kcal</small>
          </span>
        </div>
        <div className="fuel-details">
          <div className="fuel-target">TARGET 2,200 KCAL</div>
          <div className="fuel-copy">Room left in today&apos;s fuel budget.</div>
          <div className="macro-row">
            <span>Protein</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "56%" }} />
            </div>
            <span>79/140g</span>
          </div>
          <div className="macro-row">
            <span>Fat</span>
            <div className="bar">
              <div className="fill orange" style={{ width: "48%" }} />
            </div>
            <span>31/65g</span>
          </div>
          <div className="macro-row">
            <span>Carbs</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "69%" }} />
            </div>
            <span>125/180g</span>
          </div>
        </div>
      </div>

      <div className="sheet-label">
        <span className="eyebrow muted">BUILD YOUR BOWLS</span>
        <div className="meals-log-bowl-actions">
          <button type="button" className="dd-btn" onClick={() => setCreateBowlOpen(true)}>
            + Bowl
          </button>
          <button type="button" className="link" style={{ fontSize: 11 }} onClick={openGrocery}>
            Grocery list →
          </button>
        </div>
      </div>
      <div className="chip-row">
        {bowls.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`chip${bowlActive[b.id] ? " active" : ""}`}
            onClick={() => toggleBowl(b)}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className="sheet-label">
        <span className="eyebrow muted">Add from your lab&apos;s grocery list</span>
      </div>
      <label className="search-field">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chicken, broccoli, almonds..."
        />
      </label>

      <div className="pill-row">
        {(
          [
            ["all", "All"],
            ["protein", "Protein"],
            ["veggie", "Veggie"],
            ["fruit", "Fruit"],
            ["pantry", "Pantry"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`pill${filter === id ? " active" : ""}`}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="food-hscroll" role="list">
        {foods.map((f) => (
          <button
            key={f.id}
            type="button"
            role="listitem"
            className={`food-tile food-tile-sm${selectedFoodId === f.id ? " selected" : ""}`}
            onClick={() => addFood(f)}
          >
            <span className="food-emoji" aria-hidden>
              {f.emoji}
            </span>
            <span className="food-name">{f.name}</span>
            <span className="food-kcal">{f.kcal} kcal</span>
          </button>
        ))}
      </div>

      <div className="sheet-label">
        <span className="eyebrow muted">Added to this meal</span>
      </div>
      <V2AddedMealRows added={added} onSetQty={setQty} />

      <V2MealSummaryEditable
        added={added}
        onDecrement={(id) => {
          const hit = added.find((a) => a.id === id);
          if (hit) setQty(id, hit.qty - 1);
        }}
      />

      <button
        type="button"
        className="btn-primary full meals-log-save"
        onClick={() => {
          saveMealLog(meal.id, summary);
        }}
      >
        Save meal
      </button>

      <V2CreateBowlSheet
        open={createBowlOpen}
        bowls={bowls}
        onClose={() => setCreateBowlOpen(false)}
        onSave={handleCreatedBowl}
      />
    </div>
  );
}
