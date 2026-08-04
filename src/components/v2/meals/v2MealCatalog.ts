"use client";

export type V2FoodCat = "protein" | "veggie" | "fruit" | "pantry";

export type V2FoodItem = {
  id: string;
  name: string;
  kcal: number;
  cat: V2FoodCat;
  emoji: string;
};

export type V2AddedLine = {
  id: string;
  name: string;
  sub: string;
  qty: number;
};

export const V2_FOODS: V2FoodItem[] = [
  { id: "chicken", name: "Chicken breast", kcal: 165, cat: "protein", emoji: "🍗" },
  { id: "turkey", name: "Turkey", kcal: 135, cat: "protein", emoji: "🦃" },
  { id: "salmon", name: "Salmon", kcal: 206, cat: "protein", emoji: "🐟" },
  { id: "egg", name: "Egg whites", kcal: 52, cat: "protein", emoji: "🥚" },
  { id: "tofu", name: "Tofu", kcal: 76, cat: "protein", emoji: "🧈" },
  { id: "yogurt", name: "Greek yogurt", kcal: 100, cat: "protein", emoji: "🥛" },
  { id: "broccoli", name: "Broccoli", kcal: 55, cat: "veggie", emoji: "🥦" },
  { id: "cauli", name: "Cauliflower", kcal: 40, cat: "veggie", emoji: "🥬" },
  { id: "spinach", name: "Spinach", kcal: 23, cat: "veggie", emoji: "🍃" },
  { id: "apple", name: "Apple", kcal: 95, cat: "fruit", emoji: "🍎" },
  { id: "berries", name: "Mixed berries", kcal: 70, cat: "fruit", emoji: "🫐" },
  { id: "sweetpotato", name: "Sweet potato", kcal: 112, cat: "fruit", emoji: "🍠" },
  { id: "almonds", name: "Almonds", kcal: 160, cat: "pantry", emoji: "🥜" },
];

export const V2_BOWL_PRESETS: V2AddedLine[] = [
  {
    id: "pb1",
    name: "Protein bowl 1",
    sub: "Chicken breast / Turkey",
    qty: 1,
  },
  {
    id: "vb1",
    name: "Veggie bowl 1",
    sub: "Broccoli / Cauliflower",
    qty: 1,
  },
];

export function fmtQty(q: number) {
  if (q === 0.5) return "½";
  if (q === 1.5) return "1½";
  return String(q);
}

/** e.g. 1x Protein bowl 1 + 1x Veggie bowl 1 + Sweet potato */
export function formatMealSummary(lines: V2AddedLine[]) {
  const parts = lines
    .filter((a) => a.qty > 0)
    .map((a) => {
      const q = a.qty === 1 ? "1x" : `${fmtQty(a.qty)}x`;
      return `${q} ${a.name}`;
    });
  return parts.length ? parts.join(" + ") : "Tap bowls or foods to build this meal.";
}
