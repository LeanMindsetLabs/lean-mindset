"use client";

import type { V2AddedLine } from "@/components/v2/meals/v2MealCatalog";

function isBowlLine(a: V2AddedLine) {
  return /^(pb|vb|fb)\d+$/i.test(a.id) || /^v2b-/i.test(a.id) || /\bbowl\b/i.test(a.name);
}

type Props = {
  added: V2AddedLine[];
  onSetQty: (id: string, next: number) => void;
};

function QtyBox({
  a,
  onSetQty,
  compact,
}: {
  a: V2AddedLine;
  onSetQty: (id: string, next: number) => void;
  compact?: boolean;
}) {
  return (
    <div className={`qty-row${compact ? " qty-row-compact" : ""}`}>
      <div className="qty-row-text">
        <div className="qty-name">{a.name}</div>
        <div className="qty-sub">{a.sub}</div>
      </div>
      <div className="qty-ctrl">
        <button type="button" className="step-btn" onClick={() => onSetQty(a.id, a.qty - 1)}>
          -
        </button>
        <b>{a.qty}</b>
        <button type="button" className="step-btn plus" onClick={() => onSetQty(a.id, a.qty + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

/** Two-row added layout: bowls side-by-side, extras in a horizontal row. */
export function V2AddedMealRows({ added, onSetQty }: Props) {
  if (added.length === 0) {
    return (
      <div className="added-layout">
        <div className="card-sub" style={{ padding: "2px 2px" }}>
          Nothing added yet - tap a bowl or slide to pick foods.
        </div>
      </div>
    );
  }

  const bowls = added.filter(isBowlLine);
  const extras = added.filter((a) => !isBowlLine(a));

  return (
    <div className="added-layout">
      {bowls.length > 0 ? (
        <div className="added-bowls-row">
          {bowls.map((a) => (
            <QtyBox key={a.id} a={a} onSetQty={onSetQty} compact />
          ))}
        </div>
      ) : null}
      {extras.length > 0 ? (
        <div className="added-extras-row">
          {extras.map((a) => (
            <QtyBox key={a.id} a={a} onSetQty={onSetQty} compact />
          ))}
        </div>
      ) : null}
    </div>
  );
}
