"use client";

import type { V2Meal, V2MealId } from "@/components/v2/V2UiContext";

type Props = {
  meals: V2Meal[];
  activeId: V2MealId;
  onSelect: (id: V2MealId) => void;
};

function isSnackId(id: V2MealId) {
  return id === "snack1" || id === "snack2";
}

/** Overview-style meal cards - mains wide, snacks narrow vertical; all 5 fit. */
export function V2MealPickerCards({ meals, activeId, onSelect }: Props) {
  return (
    <div className="meal-card-row" role="listbox" aria-label="Meal times">
      {meals.map((m) => {
        const active = activeId === m.id;
        const snack = isSnackId(m.id);
        return (
          <div
            key={m.id}
            role="option"
            aria-selected={active}
            tabIndex={0}
            className={`meal-card meal-card-pick${snack ? " meal-card-snack" : " meal-card-main"}${active ? " active" : ""}${m.logged ? " done" : ""}`}
            onClick={() => onSelect(m.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(m.id);
              }
            }}
          >
            <div className={`meal-check${m.logged ? "" : " pending"}`}>
              {m.logged ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M4 12l5 5L20 6" />
                </svg>
              ) : null}
            </div>
            {snack ? (
              <div className="meal-body meal-body-snack">
                <div className="meal-body-snack-stack">
                  <div className="meal-name">Snack</div>
                  <div className="meal-time">{m.time}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="meal-body">
                  <div className="meal-name">{m.name}</div>
                  <div className="meal-desc">{m.desc}</div>
                </div>
                <div className="meal-foot">
                  <span className="meal-time">{m.time}</span>
                  <button
                    type="button"
                    className={`meal-pill ${m.logged ? "edit" : "log"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(m.id);
                    }}
                  >
                    {m.logged ? "Edit" : "Log"}
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
