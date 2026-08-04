"use client";

import { useMemo, useState } from "react";
import {
  V2_BOWL_CAT_LABEL,
  V2_BOWL_GROCERY,
  bowlItemsSub,
  nextBowlName,
  type V2BowlCat,
  type V2SavedBowl,
} from "@/components/v2/meals/v2BowlStore";

type Props = {
  open: boolean;
  bowls: V2SavedBowl[];
  onClose: () => void;
  onSave: (bowl: { cat: V2BowlCat; items: string[] }) => void;
};

const CATS: V2BowlCat[] = ["protein", "veggie", "fruit"];

export function V2CreateBowlSheet({ open, bowls, onClose, onSave }: Props) {
  const [cat, setCat] = useState<V2BowlCat>("protein");
  const [picked, setPicked] = useState<string[]>([]);

  const autoName = useMemo(() => nextBowlName(cat, bowls), [cat, bowls]);

  if (!open) return null;

  function pickCat(next: V2BowlCat) {
    setCat(next);
    setPicked([]);
  }

  function toggleItem(item: string) {
    setPicked((prev) => {
      if (prev.includes(item)) return prev.filter((x) => x !== item);
      if (prev.length >= 2) return [...prev.slice(1), item];
      return [...prev, item];
    });
  }

  function handleSave() {
    if (picked.length === 0) return;
    onSave({ cat, items: picked });
    setCat("protein");
    setPicked([]);
    onClose();
  }

  function handleClose() {
    setCat("protein");
    setPicked([]);
    onClose();
  }

  return (
    <div
      className="sheet-overlay active v2-create-bowl-overlay"
      onClick={(e) => {
        e.stopPropagation();
        handleClose();
      }}
    >      <div
        className="sheet v2-create-bowl-sheet"
        role="dialog"
        aria-labelledby="v2-create-bowl-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-handle" />
        <div className="sheet-label">
          <span className="eyebrow muted" id="v2-create-bowl-title">
            New bowl · pick a type
          </span>
          <span className="card-sub">{autoName}</span>
        </div>

        <div className="pill-row">
          {CATS.map((id) => (
            <button
              key={id}
              type="button"
              className={`pill${cat === id ? " active" : ""}`}
              onClick={() => pickCat(id)}
            >
              {V2_BOWL_CAT_LABEL[id]}
            </button>
          ))}
        </div>

        <span className="eyebrow muted" style={{ marginTop: 2 }}>
          From your lab&apos;s grocery list - tap to add (1-2 items)
        </span>
        <div className="chip-row">
          {V2_BOWL_GROCERY[cat].map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${picked.includes(item) ? " active" : ""}`}
              onClick={() => toggleItem(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {picked.length > 0 ? (
          <div className="card-sub" style={{ fontSize: 11 }}>
            {bowlItemsSub(picked)}
          </div>
        ) : null}

        <div className="sheet-cta" style={{ marginTop: 4 }}>
          <button
            type="button"
            className="btn-primary full"
            style={{ padding: 10 }}
            disabled={picked.length === 0}
            onClick={handleSave}
          >
            Save bowl
          </button>
          <button
            type="button"
            className="btn-outline full"
            style={{ padding: 10 }}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
