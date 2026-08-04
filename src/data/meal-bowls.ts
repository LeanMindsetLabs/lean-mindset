import { groceryList } from "@/data/program";
import {
  groceryItemKey,
  keysToItemRefs,
  loadGroceryKeysFromStorage,
  type GroceryItemRef,
} from "@/lib/grocery/grocery-keys";

export type BowlTypeId = "protein" | "veggies" | "fruits";

export const BOWL_TYPES: { id: BowlTypeId; label: string; addLabel: string }[] = [
  { id: "protein", label: "Protein bowl", addLabel: "+ Protein bowl" },
  { id: "veggies", label: "Veggie bowl", addLabel: "+ Veggie bowl" },
  { id: "fruits", label: "Fruit bowl", addLabel: "+ Fruit bowl" },
];

/** One bowl = one lab serving (set in program settings). */
export const LAB_BOWL_SERVING_SIZE = 1;

export type MealBowlInstance = {
  id: string;
  type: BowlTypeId;
  items: GroceryItemRef[];
};

export type MealBowls = {
  instances: MealBowlInstance[];
};

type LegacyFlatBowls = {
  protein?: GroceryItemRef[];
  veggies?: GroceryItemRef[];
  fruits?: GroceryItemRef[];
  snack?: GroceryItemRef[];
  nuts?: GroceryItemRef[];
  extras?: GroceryItemRef[];
  proteinShakes?: GroceryItemRef[];
  cups?: number | null;
};

export function emptyMealBowls(): MealBowls {
  return { instances: [] };
}

export function labGroceryCatalog(): GroceryItemRef[] {
  return groceryList.sections.flatMap((section) =>
    section.items.map((item) => ({
      key: groceryItemKey(section.aisle, item),
      aisle: section.aisle,
      label: item,
    })),
  );
}

export function mealLogGroceryPool(): { items: GroceryItemRef[]; fromUserList: boolean } {
  const userKeys = loadGroceryKeysFromStorage();
  if (userKeys.length > 0) {
    return { items: keysToItemRefs(userKeys), fromUserList: true };
  }
  return { items: labGroceryCatalog(), fromUserList: false };
}

function primaryBowlType(ref: GroceryItemRef): BowlTypeId | null {
  if (ref.aisle === "Proteins") return "protein";
  if (ref.aisle === "Vegetables") return "veggies";
  if (ref.aisle === "Carbs & fruit") {
    if (/berr|apple|banana|fruit/.test(ref.label.toLowerCase())) return "fruits";
  }
  return null;
}

/** Oils, sauce, condiments, spices, nuts, seeds - add-ons for any bowl. */
export function isBowlExtra(ref: GroceryItemRef): boolean {
  return ref.aisle === "Pantry & fats";
}

/** Individual add-ons when logging a meal (fruit halves, nuts, pantry extras). */
export function isMealLogFruitOrSnack(ref: GroceryItemRef): boolean {
  return ref.aisle === "Carbs & fruit";
}

export function mealLogExtraGroups(items: GroceryItemRef[]): {
  fruitAndSnacks: GroceryItemRef[];
  nutsAndPantry: GroceryItemRef[];
} {
  return {
    fruitAndSnacks: items.filter(isMealLogFruitOrSnack),
    nutsAndPantry: items.filter(isBowlExtra),
  };
}

export type BowlItemGroups = {
  primary: GroceryItemRef[];
  extras: GroceryItemRef[];
};

export function itemsForBowlType(type: BowlTypeId, pool: GroceryItemRef[]): BowlItemGroups {
  const primary = pool.filter((ref) => primaryBowlType(ref) === type);
  const extras = pool.filter(isBowlExtra);
  const primaryKeys = new Set(primary.map((i) => i.key));
  return {
    primary,
    extras: extras.filter((i) => !primaryKeys.has(i.key)),
  };
}

export function flattenBowlGroups(groups: BowlItemGroups): GroceryItemRef[] {
  return [...groups.primary, ...groups.extras];
}

export function bowlInstanceTitle(type: BowlTypeId, instances: MealBowlInstance[], id: string): string {
  const base = BOWL_TYPES.find((t) => t.id === type)!.label;
  const index = instances.filter((b) => b.type === type).findIndex((b) => b.id === id) + 1;
  return `${base} ${index}`;
}

export function createBowlInstance(type: BowlTypeId): MealBowlInstance {
  return { id: `bowl-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type, items: [] };
}

export function migrateMealBowls(raw: unknown): MealBowls {
  if (raw && typeof raw === "object" && Array.isArray((raw as MealBowls).instances)) {
    return {
      instances: (raw as MealBowls).instances.map((b) => ({
        id: b.id,
        type: b.type,
        items: b.items ?? [],
      })),
    };
  }

  const old = raw as LegacyFlatBowls;
  if (!old || typeof old !== "object") return emptyMealBowls();

  const instances: MealBowlInstance[] = [];
  const push = (type: BowlTypeId, items?: GroceryItemRef[]) => {
    if (items?.length) {
      instances.push({ id: createBowlInstance(type).id, type, items: [...items] });
    }
  };

  push("protein", old.protein);
  push("veggies", old.veggies);
  push("fruits", old.fruits);
  if (old.snack?.length) push("protein", old.snack);
  if (old.nuts?.length) {
    const last = instances[instances.length - 1];
    if (last) last.items.push(...old.nuts);
    else push("protein", old.nuts);
  }
  if (old.extras?.length) {
    const last = instances[instances.length - 1];
    if (last) last.items.push(...old.extras);
    else push("protein", old.extras);
  }
  if (old.proteinShakes?.length) push("protein", old.proteinShakes);

  return { instances };
}

export function bowlItemCount(bowls: MealBowls): number {
  return bowls.instances.reduce((n, b) => n + b.items.length, 0);
}

export function mealHasBowls(bowls: MealBowls): boolean {
  return bowls.instances.some((b) => b.items.length > 0);
}

export function summarizeMealBowls(bowls: MealBowls): string {
  const filled = bowls.instances.filter((b) => b.items.length > 0);
  if (!filled.length) return "Meal logged";
  const parts = filled.map((b) => {
    const title = bowlInstanceTitle(b.type, bowls.instances, b.id);
    const items = b.items.map((i) => i.label).join(", ");
    return `${title}: ${items}`;
  });
  const head = parts[0]!;
  const more = parts.length > 1 ? ` · +${parts.length - 1} bowl${parts.length > 2 ? "s" : ""}` : "";
  return `${head}${more} · ${LAB_BOWL_SERVING_SIZE} bowl each`;
}

export function bowlsToLegacyFields(bowls: MealBowls): {
  proteinId: string | null;
  proteinLabel: string | null;
  ingredientIds: string[];
} {
  const proteinBowl = bowls.instances.find((b) => b.type === "protein" && b.items.length);
  const protein = proteinBowl?.items[0];
  const ingredientIds = bowls.instances.flatMap((b) => b.items.map((i) => i.key));
  const legacyProtein = protein ?? bowls.instances.find((b) => b.items.length)?.items[0];
  return {
    proteinId: legacyProtein?.key ?? null,
    proteinLabel: legacyProtein?.label ?? null,
    ingredientIds,
  };
}

export function legacyToBowls(entry: {
  proteinId: string | null;
  proteinLabel: string | null;
  ingredientIds: string[];
  cups: number | null;
  bowls?: unknown;
}): MealBowls {
  if (entry.bowls) return migrateMealBowls(entry.bowls);
  const bowls = emptyMealBowls();
  if (entry.proteinId && entry.proteinLabel) {
    bowls.instances.push({
      id: createBowlInstance("protein").id,
      type: "protein",
      items: [{ key: entry.proteinId, aisle: "", label: entry.proteinLabel }],
    });
  }
  return bowls;
}
