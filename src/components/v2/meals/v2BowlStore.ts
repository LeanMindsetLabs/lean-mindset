"use client";

import { useCallback, useEffect, useState } from "react";

export type V2BowlCat = "protein" | "veggie" | "fruit";

export type V2SavedBowl = {
  id: string;
  name: string;
  cat: V2BowlCat;
  items: string[];
};

export const V2_BOWL_CAT_LABEL: Record<V2BowlCat, string> = {
  protein: "Protein",
  veggie: "Veggie",
  fruit: "Fruit",
};

export const V2_BOWL_GROCERY: Record<V2BowlCat, string[]> = {
  protein: ["Chicken breast", "Turkey", "Salmon", "Egg whites", "Tofu", "Greek yogurt"],
  veggie: ["Broccoli", "Cauliflower", "Spinach", "Zucchini", "Bell peppers", "Green beans"],
  fruit: ["Apple", "Banana", "Mixed berries", "Orange", "Sweet potatoes"],
};

export const V2_DEFAULT_BOWLS: V2SavedBowl[] = [
  {
    id: "pb1",
    name: "Protein bowl 1",
    cat: "protein",
    items: ["Chicken breast", "Turkey"],
  },
  {
    id: "pb2",
    name: "Protein bowl 2",
    cat: "protein",
    items: ["Salmon"],
  },
  {
    id: "vb1",
    name: "Veggie bowl 1",
    cat: "veggie",
    items: ["Broccoli", "Cauliflower"],
  },
];

const STORAGE_KEY = "lm-v2-saved-bowls";
const EVENT = "lm-v2-saved-bowls";

export function bowlItemsSub(items: string[]) {
  return items.join(" / ");
}

export function nextBowlName(cat: V2BowlCat, bowls: V2SavedBowl[]) {
  const n = bowls.filter((b) => b.cat === cat).length + 1;
  return `${V2_BOWL_CAT_LABEL[cat]} bowl ${n}`;
}

export function loadV2Bowls(): V2SavedBowl[] {
  if (typeof window === "undefined") return V2_DEFAULT_BOWLS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return V2_DEFAULT_BOWLS;
    const parsed = JSON.parse(raw) as V2SavedBowl[];
    if (!Array.isArray(parsed) || parsed.length === 0) return V2_DEFAULT_BOWLS;
    return parsed.filter(
      (b) =>
        b &&
        typeof b.id === "string" &&
        typeof b.name === "string" &&
        (b.cat === "protein" || b.cat === "veggie" || b.cat === "fruit") &&
        Array.isArray(b.items),
    );
  } catch {
    return V2_DEFAULT_BOWLS;
  }
}

export function saveV2Bowls(bowls: V2SavedBowl[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bowls));
  window.dispatchEvent(new Event(EVENT));
}

export function useV2SavedBowls() {
  const [bowls, setBowls] = useState<V2SavedBowl[]>(V2_DEFAULT_BOWLS);

  useEffect(() => {
    setBowls(loadV2Bowls());
    const refresh = () => setBowls(loadV2Bowls());
    window.addEventListener(EVENT, refresh);
    return () => window.removeEventListener(EVENT, refresh);
  }, []);

  const persist = useCallback((next: V2SavedBowl[]) => {
    setBowls(next);
    saveV2Bowls(next);
  }, []);

  const addBowl = useCallback(
    (cat: V2BowlCat, items: string[]): V2SavedBowl => {
      const current = loadV2Bowls();
      const bowl: V2SavedBowl = {
        id: `v2b-${Date.now()}`,
        name: nextBowlName(cat, current),
        cat,
        items: items.slice(0, 2),
      };
      persist([...current, bowl]);
      return bowl;
    },
    [persist],
  );

  return { bowls, addBowl };
}
