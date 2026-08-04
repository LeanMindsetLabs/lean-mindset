/** Meal log selection — bowl picks + individual items with quantities. */

import { bowlsToLegacyFields, emptyMealBowls, type MealBowls } from "@/data/meal-bowls";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";
import {
  bowlItemsMatch,
  loadBowlLibrary,
  savedBowlTitle,
  type SavedBowl,
} from "@/lib/workflow/bowl-library";
import type { MealLogEntry } from "@/lib/workflow/daily-progress";

export type MealBowlPick = {
  savedBowlId: string;
  qty: number;
};

export type MealExtraItem = GroceryItemRef & {
  qty: number;
};

export type MealLogSelection = {
  bowlPicks: MealBowlPick[];
  extras: MealExtraItem[];
};

export function emptyMealLogSelection(): MealLogSelection {
  return { bowlPicks: [], extras: [] };
}

export function selectionHasContent(sel: MealLogSelection): boolean {
  return sel.bowlPicks.some((p) => p.qty > 0) || sel.extras.some((e) => e.qty > 0);
}

export function formatQty(qty: number): string {
  if (qty === 0.5) return "½";
  if (qty % 1 === 0.5) return `${Math.floor(qty)}½`;
  return String(qty);
}

export function entryToSelection(entry: MealLogEntry | undefined): MealLogSelection {
  if (!entry) return emptyMealLogSelection();
  if (entry.bowlPicks?.length || entry.extras?.length) {
    return {
      bowlPicks: entry.bowlPicks ?? [],
      extras: entry.extras ?? [],
    };
  }
  return legacyBowlsToSelection(entry.bowls, loadBowlLibrary());
}

function legacyBowlsToSelection(bowls: MealBowls, library: SavedBowl[]): MealLogSelection {
  const picks: MealBowlPick[] = [];
  const extras: MealExtraItem[] = [];

  for (const inst of bowls.instances) {
    if (!inst.items.length) continue;
    const match = library.find((b) => bowlItemsMatch(b.items, inst.items));
    if (match) {
      const existing = picks.find((p) => p.savedBowlId === match.id);
      if (existing) existing.qty += 1;
      else picks.push({ savedBowlId: match.id, qty: 1 });
    } else {
      for (const item of inst.items) {
        const ex = extras.find((e) => e.key === item.key);
        if (ex) ex.qty += 1;
        else extras.push({ ...item, qty: 1 });
      }
    }
  }

  return { bowlPicks: picks, extras };
}

export function selectionToMealLogEntry(
  sel: MealLogSelection,
  library: SavedBowl[],
): Omit<MealLogEntry, "logged"> {
  const bowls = selectionToBowls(sel, library);
  const legacy = bowlsToLegacyFields(bowls);
  const ingredientIds = [
    ...sel.bowlPicks.flatMap((p) => {
      const bowl = library.find((b) => b.id === p.savedBowlId);
      if (!bowl) return [];
      return Array.from({ length: Math.floor(p.qty) }, () => bowl.items.map((i) => i.key)).flat();
    }),
    ...sel.extras.flatMap((e) => Array.from({ length: Math.ceil(e.qty) }, () => e.key)),
  ];

  return {
    bowlPicks: sel.bowlPicks.filter((p) => p.qty > 0),
    extras: sel.extras.filter((e) => e.qty > 0),
    bowls,
    proteinId: legacy.proteinId,
    proteinLabel: legacy.proteinLabel,
    ingredientIds,
    cups: null,
  };
}

function selectionToBowls(sel: MealLogSelection, library: SavedBowl[]): MealBowls {
  const instances = sel.bowlPicks.flatMap((pick) => {
    const bowl = library.find((b) => b.id === pick.savedBowlId);
    if (!bowl || pick.qty <= 0) return [];
    const count = Math.max(1, Math.round(pick.qty));
    return Array.from({ length: count }, (_, i) => ({
      id: `${bowl.id}-pick-${i}`,
      type: bowl.type,
      items: [...bowl.items],
    }));
  });

  if (sel.extras.length) {
    instances.push({
      id: `extras-${Date.now()}`,
      type: "fruits" as const,
      items: sel.extras.map(({ key, aisle, label }) => ({ key, aisle, label })),
    });
  }

  return { instances: instances.length ? instances : emptyMealBowls().instances };
}

export function summarizeMealLogSelection(
  sel: MealLogSelection,
  library: SavedBowl[],
): string {
  const parts: string[] = [];

  for (const pick of sel.bowlPicks) {
    if (pick.qty <= 0) continue;
    const bowl = library.find((b) => b.id === pick.savedBowlId);
    if (!bowl) continue;
    const title = savedBowlTitle(bowl, library);
    parts.push(pick.qty === 1 ? title : `${title} ×${formatQty(pick.qty)}`);
  }

  for (const extra of sel.extras) {
    if (extra.qty <= 0) continue;
    parts.push(extra.qty === 1 ? extra.label : `${extra.label} ×${formatQty(extra.qty)}`);
  }

  return parts.length ? parts.slice(0, 3).join(" · ") + (parts.length > 3 ? ` · +${parts.length - 3}` : "") : "Meal logged";
}
