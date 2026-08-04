"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BOWL_TYPES,
  itemsForBowlType,
  mealLogGroceryPool,
} from "@/data/meal-bowls";
import { BowlBuilder } from "@/components/workflow/BowlBuilder";
import { SheetPortal } from "@/components/workflow/SheetPortal";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";
import { useBowlLibraryStore } from "@/hooks/useDailyWorkflowProgress";
import {
  addSavedBowl,
  deleteSavedBowl,
  loadBowlLibrary,
  savedBowlTitle,
  updateSavedBowl,
} from "@/lib/workflow/bowl-library";

function mutateBowlItems(bowlId: string, mutate: (items: GroceryItemRef[]) => GroceryItemRef[]) {
  const bowl = loadBowlLibrary().find((b) => b.id === bowlId);
  if (!bowl) return;
  updateSavedBowl(bowlId, { items: mutate(bowl.items) });
}

export function BowlLibrarySheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const library = useBowlLibraryStore();
  const [groceryTick, setGroceryTick] = useState(0);

  const groceryPool = useMemo(() => {
    if (!open) return { items: [] as GroceryItemRef[], fromUserList: false };
    return mealLogGroceryPool();
  }, [open, groceryTick]);

  useEffect(() => {
    if (!open) return;
    const refresh = () => setGroceryTick((t) => t + 1);
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, [open]);

  if (!open) return null;

  return (
    <SheetPortal>
      <div
        className="fixed inset-x-0 top-0 z-40 bg-black/70"
        style={{ bottom: "var(--nav-stack-height)" }}
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 z-[45] mx-auto flex w-full max-w-[var(--app-max-width,393px)] flex-col rounded-t-[20px] border border-border border-b-0 bg-[#0a0f18] shadow-[0_-8px_32px_rgba(0,0,0,0.45)]"
        style={{
          bottom: "var(--nav-stack-height)",
          maxHeight: "min(85dvh, calc(100dvh - var(--nav-stack-height) - 8px))",
        }}
        role="dialog"
        aria-labelledby="bowl-library-title"
      >
        <div className="lm-hide-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-4">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 id="bowl-library-title" className="text-lg font-bold text-white">
                My bowls
              </h2>
              <p className="mt-0.5 text-[10px] text-foreground-muted">
                Build bowls once - pick them when you log meals.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-2 py-1 text-sm text-foreground-muted hover:text-white"
            >
              Done
            </button>
          </div>

          <p className="mt-2 text-[10px] text-foreground-muted">
            {groceryPool.fromUserList ? "From your grocery list." : "Using lab grocery list."}{" "}
            <Link href="/program/grocery" className="font-semibold text-accent">
              Grocery →
            </Link>
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {BOWL_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => addSavedBowl(t.id)}
                className="rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-2.5 py-1.5 text-[10px] font-bold text-[#93c5fd]"
              >
                {t.addLabel}
              </button>
            ))}
          </div>

          {library.length === 0 ? (
            <p className="mt-4 rounded-[12px] border border-dashed border-border px-3 py-6 text-center text-xs text-foreground-muted">
              Add a protein, veggie, or fruit bowl to get started.
            </p>
          ) : (
            <div className="mt-3 flex flex-col gap-2">
              {library.map((bowl) => (
                <BowlBuilder
                  key={bowl.id}
                  title={savedBowlTitle(bowl, library)}
                  itemGroups={itemsForBowlType(bowl.type, groceryPool.items)}
                  selected={bowl.items}
                  onAdd={(item) => mutateBowlItems(bowl.id, (items) => [...items, item])}
                  onRemove={(key) =>
                    mutateBowlItems(bowl.id, (items) => items.filter((i) => i.key !== key))
                  }
                  onDeleteBowl={() => deleteSavedBowl(bowl.id)}
                />
              ))}
            </div>
          )}

          {library.some((b) => b.items.length > 0) ? (
            <p className="mt-3 text-[10px] text-foreground-muted">
              {library.filter((b) => b.items.length).length} bowl
              {library.filter((b) => b.items.length).length === 1 ? "" : "s"} ready to log.
            </p>
          ) : null}
        </div>
      </div>
    </SheetPortal>
  );
}

export function BowlLibraryHint({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="rounded-[12px] border border-dashed border-[#2563eb]/35 bg-[#2563eb]/5 px-3 py-4 text-center">
      <p className="text-xs text-foreground-muted">
        Create your bowls first, then pick them for each meal.
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white"
      >
        Create bowls
      </button>
    </div>
  );
}
