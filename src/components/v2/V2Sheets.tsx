"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useV2Ui, type V2MealId } from "./V2UiContext";
import { V2CreateBowlSheet } from "./meals/V2CreateBowlSheet";
import {
  V2GroceryMealPicker,
  type V2GroceryFilter,
} from "./meals/V2GroceryMealPicker";
import { V2MealSummaryEditable } from "./meals/V2MealSummaryEditable";
import {
  bowlItemsSub,
  useV2SavedBowls,
  type V2SavedBowl,
} from "./meals/v2BowlStore";
import {
  formatMealSummary,
  type V2AddedLine,
  type V2FoodItem,
} from "./meals/v2MealCatalog";

const GROCERY = {
  protein: ["Chicken breast", "Turkey", "Salmon", "Egg whites", "Tofu", "Greek yogurt"],
  veggie: ["Broccoli", "Cauliflower", "Spinach", "Zucchini", "Bell peppers", "Green beans"],
  fruit: ["Apple", "Banana", "Mixed berries", "Orange", "Sweet potatoes"],
  pantry: ["Almonds", "Walnuts", "Peanut butter", "Chia seeds", "Olive oil"],
};

export function V2Sheets() {
  const router = useRouter();
  const { sheet, closeSheet, openLogMeal, meals, logMealId, saveMealLog } = useV2Ui();
  const meal = meals.find((m) => m.id === logMealId) ?? meals[0];

  if (!sheet) return null;

  return (
    <>
      {sheet === "quickadd" && (
        <div className="sheet-overlay active" onClick={closeSheet}>
          <div className="sheet quick-add-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-head">
              <div className="sheet-title" style={{ fontSize: 17 }}>
                Quick add
              </div>
              <CloseBtn onClick={closeSheet} />
            </div>
            <button
              type="button"
              className="qa-option"
              onClick={() => {
                closeSheet();
                openLogMeal();
              }}
            >
              <div className="qa-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2v20M6 2c0 4-3 4-3 8s3 4 3 8M18 2v20M14 2h4v8a4 4 0 0 1-4 4" />
                </svg>
              </div>
              <div className="qa-text">
                <b>Log a meal</b>
                <span>Breakfast, lunch, dinner or a snack</span>
              </div>
            </button>
            <button
              type="button"
              className="qa-option"
              onClick={() => {
                closeSheet();
                router.push("/v2/check-in");
              }}
            >
              <div className="qa-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19V5M4 19h16M8 15l3-3 3 2 4-6" />
                </svg>
              </div>
              <div className="qa-text">
                <b>Log weight</b>
                <span>Updates today&apos;s check-in</span>
              </div>
            </button>
            <button
              type="button"
              className="qa-option"
              onClick={() => {
                closeSheet();
                router.push("/v2/check-in");
              }}
            >
              <div className="qa-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="qa-text">
                <b>Daily check-in</b>
                <span>Weight, meals &amp; a note to your coach</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {sheet === "grocery" && (
        <div className="sheet-overlay active" onClick={closeSheet}>
          <div
            className="sheet"
            style={{ maxHeight: "92%", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-handle" />
            <div className="sheet-head">
              <div>
                <div className="sheet-time">FOUNDATION · WEEKS 1–2</div>
                <div className="sheet-title" style={{ fontSize: 18 }}>
                  Grocery list
                </div>
              </div>
              <CloseBtn onClick={closeSheet} />
            </div>
            <div className="sheet-instructions">
              Your done-for-you shopping blueprint for this lab phase. These are the items your bowls
              are built from — swap within a category any time.
            </div>
            {(
              [
                ["PROTEIN", GROCERY.protein],
                ["VEGGIES", GROCERY.veggie],
                ["FRUIT & SNACKS", GROCERY.fruit],
                ["NUTS & PANTRY", GROCERY.pantry],
              ] as const
            ).map(([label, items]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span className="eyebrow muted">{label}</span>
                <div className="chip-row">
                  {items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {sheet === "logmeal" && meal && (
        <LogMealSheet
          mealId={meal.id}
          mealName={meal.name}
          mealTime={meal.time}
          onClose={closeSheet}
          onSave={(summary) => {
            saveMealLog(meal.id, summary);
            closeSheet();
          }}
        />
      )}
    </>
  );
}

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="close-btn" onClick={onClick} aria-label="Close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

function LogMealSheet({
  mealName,
  mealTime,
  onClose,
  onSave,
}: {
  mealId: V2MealId;
  mealName: string;
  mealTime: string;
  onClose: () => void;
  onSave: (summary: string) => void;
}) {
  const { openGrocery } = useV2Ui();
  const { bowls, addBowl } = useV2SavedBowls();
  const [filter, setFilter] = useState<V2GroceryFilter>("bowls");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createBowlOpen, setCreateBowlOpen] = useState(false);
  const [added, setAdded] = useState<V2AddedLine[]>([]);

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
    <div className="sheet-overlay active" onClick={onClose}>
      <div className="sheet log-meal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <div className="sheet-time">{mealTime}</div>
            <div className="sheet-title">Log {mealName}</div>
          </div>
          <CloseBtn onClick={onClose} />
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

        <div className="sheet-cta">
          <button type="button" className="btn-primary full" onClick={() => onSave(summary)}>
            Save meal
          </button>
        </div>
      </div>

      <V2CreateBowlSheet
        open={createBowlOpen}
        bowls={bowls}
        onClose={() => setCreateBowlOpen(false)}
        onSave={handleCreatedBowl}
      />
    </div>
  );
}
