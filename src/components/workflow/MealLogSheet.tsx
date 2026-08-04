"use client";

import { useEffect, useMemo, useState } from "react";
import {
  isBowlExtra,
  mealLogExtraGroups,
  mealLogGroceryPool,
} from "@/data/meal-bowls";
import { GroceryItemPicker } from "@/components/workflow/GroceryItemPicker";
import { QtyStepper } from "@/components/workflow/QtyStepper";
import {
  BowlLibraryHint,
  BowlLibrarySheet,
} from "@/components/workflow/BowlLibrarySheet";
import { SheetPortal } from "@/components/workflow/SheetPortal";
import { useBowlLibraryStore } from "@/hooks/useDailyWorkflowProgress";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";
import { libraryReadyBowls, savedBowlSubtitle, savedBowlTitle } from "@/lib/workflow/bowl-library";
import {
  entryToSelection,
  selectionHasContent,
  selectionToMealLogEntry,
  summarizeMealLogSelection,
  type MealExtraItem,
  type MealLogSelection,
} from "@/lib/workflow/meal-log-selection";
import type { MealLogEntry } from "@/lib/workflow/daily-progress";

type MealLogSheetProps = {
  open: boolean;
  mealIndex: number;
  mealLabel: string;
  mealTime: string;
  existing?: MealLogEntry;
  onClose: () => void;
  onSave: (entry: Omit<MealLogEntry, "logged">) => void;
  onClear?: () => void;
};

function CompactRow({
  title,
  subtitle,
  qty,
  onQtyChange,
  onRemove,
  step = 1,
}: {
  title: string;
  subtitle?: string;
  qty: number;
  onQtyChange: (q: number) => void;
  onRemove: () => void;
  step?: number;
}) {
  return (
    <div className="flex items-center gap-2 rounded-[12px] border border-border bg-background-card px-2.5 py-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-white">{title}</p>
        {subtitle ? (
          <p className="truncate text-[10px] text-foreground-muted">{subtitle}</p>
        ) : null}
      </div>
      <QtyStepper value={qty} step={step} onChange={onQtyChange} onRemove={onRemove} />
    </div>
  );
}

function MealLogSheetForm({
  mealLabel,
  mealTime,
  existing,
  onClose,
  onSave,
  onClear,
}: Omit<MealLogSheetProps, "open" | "mealIndex">) {
  const library = useBowlLibraryStore();
  const readyBowls = libraryReadyBowls(library);
  const [selection, setSelection] = useState<MealLogSelection>(() => entryToSelection(existing));
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [groceryTick, setGroceryTick] = useState(0);

  const groceryPool = useMemo(() => mealLogGroceryPool(), [groceryTick]);
  const allItems = groceryPool.items;

  const pickedBowlIds = new Set(
    selection.bowlPicks.filter((p) => p.qty > 0).map((p) => p.savedBowlId),
  );
  const pickedExtraKeys = new Set(selection.extras.filter((e) => e.qty > 0).map((e) => e.key));

  const availableBowls = readyBowls.filter((b) => !pickedBowlIds.has(b.id));
  const availableItems = allItems.filter((i) => !pickedExtraKeys.has(i.key));
  const { fruitAndSnacks: availableFruit, nutsAndPantry: availableNuts } =
    mealLogExtraGroups(availableItems);

  useEffect(() => {
    const refresh = () => setGroceryTick((t) => t + 1);
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  function addBowlPick(savedBowlId: string) {
    setSelection((prev) => {
      const existingPick = prev.bowlPicks.find((p) => p.savedBowlId === savedBowlId);
      if (existingPick) {
        return {
          ...prev,
          bowlPicks: prev.bowlPicks.map((p) =>
            p.savedBowlId === savedBowlId ? { ...p, qty: p.qty + 1 } : p,
          ),
        };
      }
      return { ...prev, bowlPicks: [...prev.bowlPicks, { savedBowlId, qty: 1 }] };
    });
  }

  function setBowlQty(savedBowlId: string, qty: number) {
    setSelection((prev) => ({
      ...prev,
      bowlPicks:
        qty <= 0
          ? prev.bowlPicks.filter((p) => p.savedBowlId !== savedBowlId)
          : prev.bowlPicks.map((p) => (p.savedBowlId === savedBowlId ? { ...p, qty } : p)),
    }));
  }

  function addExtra(item: GroceryItemRef) {
    const step = isBowlExtra(item) ? 1 : 0.5;
    setSelection((prev) => {
      const ex = prev.extras.find((e) => e.key === item.key);
      if (ex) {
        return {
          ...prev,
          extras: prev.extras.map((e) =>
            e.key === item.key ? { ...e, qty: e.qty + step } : e,
          ),
        };
      }
      return { ...prev, extras: [...prev.extras, { ...item, qty: step }] };
    });
  }

  function setExtraQty(key: string, qty: number) {
    setSelection((prev) => ({
      ...prev,
      extras:
        qty <= 0
          ? prev.extras.filter((e) => e.key !== key)
          : prev.extras.map((e) => (e.key === key ? { ...e, qty } : e)),
    }));
  }

  function handleSave() {
    if (!selectionHasContent(selection)) return;
    onSave(selectionToMealLogEntry(selection, library));
    onClose();
  }

  const canSave = selectionHasContent(selection);
  const activePicks = selection.bowlPicks.filter((p) => p.qty > 0);
  const activeExtras = selection.extras.filter((e) => e.qty > 0);

  return (
    <>
      <div className="lm-hide-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pt-3">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent">{mealTime}</p>
            <h2 id="meal-log-title" className="text-lg font-bold text-white">
              Log {mealLabel}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm text-foreground-muted hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[10px] text-foreground-muted">
            Tap bowls for this meal, then add fruit, nuts, or snacks.
          </p>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="shrink-0 text-[10px] font-bold text-accent"
          >
            My bowls →
          </button>
        </div>

        {readyBowls.length > 0 ? (
          <ol className="mt-2 list-decimal space-y-0.5 pl-4 text-[10px] text-foreground-muted">
            <li>Tap a saved bowl (or + Bowl)</li>
            <li>Use − / + for how many</li>
            <li>Add fruit, nuts, or snacks below</li>
          </ol>
        ) : null}

        <div className="mt-3 flex flex-col gap-3 pb-4">
          {readyBowls.length === 0 ? (
            <BowlLibraryHint onOpen={() => setLibraryOpen(true)} />
          ) : (
            <>
              <section>
                <div className="mb-1.5 flex items-center justify-between">
                  <h3 className="text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
                    Bowls
                  </h3>
                  <GroceryItemPicker
                    label="+ Bowl"
                    items={availableBowls.map((b) => ({
                      key: b.id,
                      aisle: b.type,
                      label: `${savedBowlTitle(b, library)} — ${savedBowlSubtitle(b)}`,
                    }))}
                    onPick={(ref) => addBowlPick(ref.key)}
                    disabled={!availableBowls.length}
                  />
                </div>
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {readyBowls.map((bowl) => {
                    const pick = selection.bowlPicks.find((p) => p.savedBowlId === bowl.id);
                    const qty = pick?.qty ?? 0;
                    return (
                      <button
                        key={bowl.id}
                        type="button"
                        onClick={() => addBowlPick(bowl.id)}
                        className={`rounded-full border px-2.5 py-1.5 text-[10px] font-bold transition ${
                          qty > 0
                            ? "border-accent bg-accent text-white"
                            : "border-[#2563eb]/40 bg-[#2563eb]/10 text-[#93c5fd] hover:border-[#2563eb]/70"
                        }`}
                      >
                        {savedBowlTitle(bowl, library)}
                        {qty > 0 ? ` · ${qty}` : ""}
                      </button>
                    );
                  })}
                </div>
                {activePicks.length === 0 ? (
                  <p className="rounded-[10px] border border-dashed border-border px-3 py-2.5 text-center text-[10px] text-foreground-muted">
                    Tap a bowl above to add it to {mealLabel.toLowerCase()}.
                  </p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {activePicks.map((pick) => {
                      const bowl = library.find((b) => b.id === pick.savedBowlId);
                      if (!bowl) return null;
                      return (
                        <CompactRow
                          key={pick.savedBowlId}
                          title={savedBowlTitle(bowl, library)}
                          subtitle={savedBowlSubtitle(bowl)}
                          qty={pick.qty}
                          step={1}
                          onQtyChange={(q) => setBowlQty(pick.savedBowlId, q)}
                          onRemove={() => setBowlQty(pick.savedBowlId, 0)}
                        />
                      );
                    })}
                  </div>
                )}
              </section>

              <section>
                <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-foreground-subtle">
                  Add to this meal
                </h3>

                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-foreground-muted">Fruit & snacks</p>
                    <GroceryItemPicker
                      label="+ Fruit"
                      items={availableFruit}
                      onPick={addExtra}
                      disabled={!availableFruit.length}
                    />
                  </div>
                  {activeExtras.filter((e) => !isBowlExtra(e)).length === 0 ? (
                    <p className="rounded-[10px] border border-dashed border-border px-3 py-2 text-center text-[10px] text-foreground-muted">
                      Banana ½, apple, berries — tap + Fruit.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {activeExtras
                        .filter((e) => !isBowlExtra(e))
                        .map((extra: MealExtraItem) => (
                          <CompactRow
                            key={extra.key}
                            title={extra.label}
                            qty={extra.qty}
                            step={0.5}
                            onQtyChange={(q) => setExtraQty(extra.key, q)}
                            onRemove={() => setExtraQty(extra.key, 0)}
                          />
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-foreground-muted">Nuts & pantry</p>
                    <GroceryItemPicker
                      label="+ Nuts"
                      items={availableNuts}
                      onPick={addExtra}
                      disabled={!availableNuts.length}
                    />
                  </div>
                  {activeExtras.filter((e) => isBowlExtra(e)).length === 0 ? (
                    <p className="rounded-[10px] border border-dashed border-border px-3 py-2 text-center text-[10px] text-foreground-muted">
                      Almonds, walnuts, seeds — tap + Nuts (count by 1).
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {activeExtras
                        .filter((e) => isBowlExtra(e))
                        .map((extra: MealExtraItem) => (
                          <CompactRow
                            key={extra.key}
                            title={extra.label}
                            qty={extra.qty}
                            step={1}
                            onQtyChange={(q) => setExtraQty(extra.key, q)}
                            onRemove={() => setExtraQty(extra.key, 0)}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-white/[0.08] bg-[#0a0f18] px-4 pt-3 pb-3">
        {canSave ? (
          <p className="mb-3 rounded-[12px] border border-[#2563eb]/30 bg-[#2563eb]/10 px-3 py-2 text-xs text-[#bfdbfe]">
            {summarizeMealLogSelection(selection, library)}
          </p>
        ) : null}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={!canSave}
            onClick={handleSave}
            className="w-full rounded-full bg-accent py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            Save meal
          </button>
          {existing?.logged && onClear ? (
            <button
              type="button"
              onClick={() => {
                onClear();
                onClose();
              }}
              className="w-full rounded-full border border-border py-2.5 text-xs font-semibold text-foreground-muted"
            >
              Clear log
            </button>
          ) : null}
        </div>
      </div>

      <BowlLibrarySheet open={libraryOpen} onClose={() => setLibraryOpen(false)} />
    </>
  );
}

export function MealLogSheet({
  open,
  mealIndex,
  mealLabel,
  mealTime,
  existing,
  onClose,
  onSave,
  onClear,
}: MealLogSheetProps) {
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
        className="fixed inset-x-0 z-[45] mx-auto box-border flex w-full max-w-[var(--app-max-width,393px)] flex-col rounded-t-[20px] border border-border border-b-0 bg-[#0a0f18] shadow-[0_-8px_32px_rgba(0,0,0,0.45)]"
        style={{
          bottom: "var(--nav-stack-height)",
          maxHeight: "min(85dvh, calc(100dvh - var(--nav-stack-height) - 8px))",
        }}
        role="dialog"
        aria-labelledby="meal-log-title"
      >
        <MealLogSheetForm
          key={`${mealIndex}-${existing?.logged ? "logged" : "new"}`}
          mealLabel={mealLabel}
          mealTime={mealTime}
          existing={existing}
          onClose={onClose}
          onSave={onSave}
          onClear={onClear}
        />
      </div>
    </SheetPortal>
  );
}
