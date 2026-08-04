/** Shared grocery item keys — same format as GroceryChecklist. */

export const GROCERY_STORAGE_KEY = "lm-grocery-list";

export type GroceryItemRef = {
  key: string;
  aisle: string;
  label: string;
};

export function groceryItemKey(aisle: string, item: string): string {
  return `${aisle}::${item}`;
}

export function parseGroceryItemKey(key: string): { aisle: string; item: string } {
  const i = key.indexOf("::");
  return { aisle: key.slice(0, i), item: key.slice(i + 2) };
}

export function loadGroceryKeysFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GROCERY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function keysToItemRefs(keys: string[]): GroceryItemRef[] {
  return keys.map((key) => {
    const { aisle, item } = parseGroceryItemKey(key);
    return { key, aisle, label: item };
  });
}
