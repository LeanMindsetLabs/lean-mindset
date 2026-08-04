"use client";

import { fmtQty, type V2AddedLine } from "@/components/v2/meals/v2MealCatalog";

type Props = {
  added: V2AddedLine[];
  onDecrement: (id: string) => void;
  emptyLabel?: string;
};

/** Summary line `1x A + 1x B`; tap a part to decrement (remove at 0). */
export function V2MealSummaryEditable({
  added,
  onDecrement,
  emptyLabel = "Tap bowls or foods to build this meal.",
}: Props) {
  const lines = added.filter((a) => a.qty > 0);

  if (lines.length === 0) {
    return <div className="summary-chip summary-plus">{emptyLabel}</div>;
  }

  return (
    <div
      className="summary-chip summary-plus summary-editable"
      role="list"
      aria-label="Meal summary. Tap an item to remove one."
    >
      {lines.map((a, i) => {
        const q = a.qty === 1 ? "1x" : `${fmtQty(a.qty)}x`;
        return (
          <span key={a.id} role="listitem">
            {i > 0 ? (
              <span className="summary-sep" aria-hidden>
                {" "}
                +{" "}
              </span>
            ) : null}
            <button
              type="button"
              className="summary-part"
              onClick={() => onDecrement(a.id)}
              aria-label={`Remove one ${a.name}`}
              title="Tap to remove"
            >
              {q} {a.name}
            </button>
          </span>
        );
      })}
    </div>
  );
}
