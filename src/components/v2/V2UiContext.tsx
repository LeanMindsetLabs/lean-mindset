"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type V2MealId =
  | "breakfast"
  | "lunch"
  | "snack1"
  | "dinner"
  | "snack2";

export type V2Meal = {
  id: V2MealId;
  name: string;
  desc: string;
  time: string;
  logged: boolean;
  /** Snapshot from Meals Log when saved */
  itemsSummary: string | null;
};

type Sheet = "logmeal" | "quickadd" | "grocery" | null;

type V2UiContextValue = {
  meals: V2Meal[];
  sheet: Sheet;
  logMealId: V2MealId | null;
  openQuickAdd: () => void;
  openGrocery: () => void;
  openLogMeal: (id?: V2MealId) => void;
  closeSheet: () => void;
  toggleMealLogged: (id: V2MealId) => void;
  saveMealLog: (id: V2MealId, itemsSummary: string) => void;
  nextPendingMealId: () => V2MealId;
};

const INITIAL_MEALS: V2Meal[] = [
  {
    id: "breakfast",
    name: "Breakfast",
    desc: "Protein + carb",
    time: "8:00 AM",
    logged: true,
    itemsSummary: "Apple + Coffee black",
  },
  {
    id: "lunch",
    name: "Lunch",
    desc: "Protein + veg",
    time: "12:00 PM",
    logged: true,
    itemsSummary: "1x Protein Bowl + 1x Salad Bowl",
  },
  {
    id: "snack1",
    name: "Snack",
    desc: "Controlled portion",
    time: "3:00 PM",
    logged: true,
    itemsSummary: "1x Fruit Bowl",
  },
  {
    id: "dinner",
    name: "Dinner",
    desc: "Protein + veg",
    time: "7:00 PM",
    logged: true,
    itemsSummary: "1x Protein Bowl + 1x Salad Bowl",
  },
  {
    id: "snack2",
    name: "Snack",
    desc: "Controlled portion",
    time: "9:00 PM",
    logged: true,
    itemsSummary: "1x Yogurt + 1x Mix Nuts",
  },
];

const V2UiContext = createContext<V2UiContextValue | null>(null);

export function V2UiProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState(INITIAL_MEALS);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [logMealId, setLogMealId] = useState<V2MealId | null>(null);

  const nextPendingMealId = useCallback(() => {
    const pending = meals.find((m) => !m.logged);
    return pending?.id ?? meals[0]!.id;
  }, [meals]);

  const openLogMeal = useCallback(
    (id?: V2MealId) => {
      setLogMealId(id ?? nextPendingMealId());
      setSheet("logmeal");
    },
    [nextPendingMealId],
  );

  const saveMealLog = useCallback((id: V2MealId, itemsSummary: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, logged: true, itemsSummary: itemsSummary || m.itemsSummary } : m,
      ),
    );
  }, []);

  const value = useMemo<V2UiContextValue>(
    () => ({
      meals,
      sheet,
      logMealId,
      openQuickAdd: () => setSheet("quickadd"),
      openGrocery: () => setSheet("grocery"),
      openLogMeal,
      closeSheet: () => {
        setSheet(null);
        setLogMealId(null);
      },
      toggleMealLogged: (id) => {
        setMeals((prev) =>
          prev.map((m) => (m.id === id ? { ...m, logged: !m.logged } : m)),
        );
      },
      saveMealLog,
      nextPendingMealId,
    }),
    [meals, sheet, logMealId, openLogMeal, saveMealLog, nextPendingMealId],
  );

  return <V2UiContext.Provider value={value}>{children}</V2UiContext.Provider>;
}

export function useV2Ui() {
  const ctx = useContext(V2UiContext);
  if (!ctx) throw new Error("useV2Ui must be used within V2UiProvider");
  return ctx;
}
