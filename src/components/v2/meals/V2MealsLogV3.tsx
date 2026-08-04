"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useV2Ui, type V2MealId } from "@/components/v2/V2UiContext";
import { V2CreateBowlSheet } from "@/components/v2/meals/V2CreateBowlSheet";
import {
  V2GroceryMealPicker,
  type V2GroceryFilter,
} from "@/components/v2/meals/V2GroceryMealPicker";
import { V2MealPickerCards } from "@/components/v2/meals/V2MealPickerCards";
import { V2MealSummaryEditable } from "@/components/v2/meals/V2MealSummaryEditable";
import {
  bowlItemsSub,
  useV2SavedBowls,
  type V2SavedBowl,
} from "@/components/v2/meals/v2BowlStore";
import {
  formatMealSummary,
  type V2AddedLine,
  type V2FoodItem,
} from "@/components/v2/meals/v2MealCatalog";

export function V2MealsLogV3() {
  const { meals, saveMealLog, openGrocery } = useV2Ui();
  const { bowls, addBowl } = useV2SavedBowls();
  const [activeId, setActiveId] = useState<V2MealId>(
    () => meals.find((m) => !m.logged)?.id ?? "snack1",
  );
  const [filter, setFilter] = useState<V2GroceryFilter>("bowls");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createBowlOpen, setCreateBowlOpen] = useState(false);
  const [added, setAdded] = useState<V2AddedLine[]>([]);

  const meal = meals.find((m) => m.id === activeId) ?? meals[0]!;

  const summary = useMemo(() => formatMealSummary(added), [added]);

  function bumpLine(line: V2AddedLine) {
    setSelectedId(line.id);
    setAdded((prev) => {
      const hit = prev.find((a) => a.id === line.id);
      if (hit) {
        return prev.map((a) => (a.id === line.id ? { ...a, qty: a.qty + 1 } : a));
      }
      return [...prev, { ...line, qty: 1 }];
    });
  }

  function dropLine(id: string) {
    setAdded((prev) =>
      prev
        .map((a) => (a.id === id ? { ...a, qty: a.qty - 1 } : a))
        .filter((a) => a.qty > 0),
    );
  }

  function addFood(f: V2FoodItem) {
    bumpLine({ id: f.id, name: f.name, sub: `${f.kcal} kcal`, qty: 1 });
  }

  function addSavedBowl(b: V2SavedBowl) {
    bumpLine({ id: b.id, name: b.name, sub: bowlItemsSub(b.items), qty: 1 });
  }

  function handleCreatedBowl(draft: { cat: V2SavedBowl["cat"]; items: string[] }) {
    const bowl = addBowl(draft.cat, draft.items);
    bumpLine({ id: bowl.id, name: bowl.name, sub: bowlItemsSub(bowl.items), qty: 1 });
  }

  return (
    <div className="screen meals-log-v3">
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

      <V2GroceryMealPicker
        bowls={bowls}
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
        selectedId={selectedId}
        onAddFood={addFood}
        onAddBowl={addSavedBowl}
        onBuildBowl={() => setCreateBowlOpen(true)}
        onOpenGrocery={openGrocery}
      />

      <V2MealSummaryEditable added={added} onDecrement={dropLine} />

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
