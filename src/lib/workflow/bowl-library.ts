/** User's saved bowl templates - build once, pick when logging meals. */

import {
  BOWL_TYPES,
  bowlInstanceTitle,
  createBowlInstance,
  type BowlTypeId,
  type MealBowlInstance,
} from "@/data/meal-bowls";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";

export type SavedBowl = {
  id: string;
  type: BowlTypeId;
  items: GroceryItemRef[];
};

const STORAGE_KEY = "lm-bowl-library";

export function loadBowlLibrary(): SavedBowl[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedBowl[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((b) => ({
      id: b.id,
      type: b.type,
      items: b.items ?? [],
    }));
  } catch {
    return [];
  }
}

export function saveBowlLibrary(bowls: SavedBowl[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bowls));
  window.dispatchEvent(new Event("lm-bowl-library"));
}

export function addSavedBowl(type: BowlTypeId): SavedBowl {
  const inst = createBowlInstance(type);
  const bowl: SavedBowl = { id: inst.id, type: inst.type, items: [] };
  saveBowlLibrary([...loadBowlLibrary(), bowl]);
  return bowl;
}

export function updateSavedBowl(id: string, patch: Partial<Pick<SavedBowl, "items">>) {
  saveBowlLibrary(
    loadBowlLibrary().map((b) => (b.id === id ? { ...b, ...patch } : b)),
  );
}

export function deleteSavedBowl(id: string) {
  saveBowlLibrary(loadBowlLibrary().filter((b) => b.id !== id));
}

export function savedBowlTitle(bowl: SavedBowl, library: SavedBowl[]): string {
  const instances: MealBowlInstance[] = library.map((b) => ({
    id: b.id,
    type: b.type,
    items: b.items,
  }));
  return bowlInstanceTitle(bowl.type, instances, bowl.id);
}

export function savedBowlSubtitle(bowl: SavedBowl): string {
  if (!bowl.items.length) return "Add items";
  return bowl.items.map((i) => i.label).join(", ");
}

export function savedBowlHasItems(bowl: SavedBowl): boolean {
  return bowl.items.length > 0;
}

export function libraryReadyBowls(library: SavedBowl[]): SavedBowl[] {
  return library.filter(savedBowlHasItems);
}

export function bowlItemsMatch(a: GroceryItemRef[], b: GroceryItemRef[]): boolean {
  if (a.length !== b.length) return false;
  const keysA = [...a.map((i) => i.key)].sort();
  const keysB = [...b.map((i) => i.key)].sort();
  return keysA.every((k, i) => k === keysB[i]);
}

export function typeShortLabel(type: BowlTypeId): string {
  return BOWL_TYPES.find((t) => t.id === type)?.label.replace(" bowl", "") ?? type;
}
