/** User's daily meal plan - order, time, and slot type (local until Supabase sync). */

export type MealSlotType = "breakfast" | "lunch" | "dinner" | "snack";

export type MealSlot = {
  id: string;
  type: MealSlotType;
  label: string;
  time: string;
};

export const MEAL_TYPE_OPTIONS: { id: MealSlotType; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snack", label: "Snack" },
];

export const MEAL_TYPE_FOCUS: Record<MealSlotType, string> = {
  breakfast: "Protein + complex carb",
  lunch: "Protein + vegetables",
  dinner: "Protein + vegetables",
  snack: "Protein + controlled portion",
};

export const DEFAULT_MEAL_SCHEDULE: MealSlot[] = [
  { id: "meal-default-1", type: "breakfast", label: "Breakfast", time: "8:00 AM" },
  { id: "meal-default-2", type: "lunch", label: "Lunch", time: "12:00 PM" },
  { id: "meal-default-3", type: "snack", label: "Snack", time: "3:00 PM" },
  { id: "meal-default-4", type: "dinner", label: "Dinner", time: "7:00 PM" },
  { id: "meal-default-5", type: "snack", label: "Snack", time: "9:00 PM" },
];

const STORAGE_KEY = "lm-meal-schedule";

function labelForType(type: MealSlotType): string {
  return MEAL_TYPE_OPTIONS.find((o) => o.id === type)?.label ?? type;
}

export function createMealSlot(type: MealSlotType): MealSlot {
  return {
    id: `meal-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    label: labelForType(type),
    time: "12:00 PM",
  };
}

export function loadMealSchedule(): MealSlot[] {
  if (typeof window === "undefined") return [...DEFAULT_MEAL_SCHEDULE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_MEAL_SCHEDULE];
    const parsed = JSON.parse(raw) as MealSlot[];
    if (!Array.isArray(parsed) || parsed.length === 0) return [...DEFAULT_MEAL_SCHEDULE];
    return parsed.map((s) => ({
      id: s.id,
      type: s.type,
      label: s.label || labelForType(s.type),
      time: s.time,
    }));
  } catch {
    return [...DEFAULT_MEAL_SCHEDULE];
  }
}

export function saveMealSchedule(slots: MealSlot[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  window.dispatchEvent(new Event("lm-meal-schedule"));
}

export function resetMealScheduleToDefault(): MealSlot[] {
  const next = [...DEFAULT_MEAL_SCHEDULE];
  saveMealSchedule(next);
  return next;
}

/** Parse "8:00 AM" / "12:00 PM" to minutes from midnight for sorting. */
export function parseMealTime(time: string): number {
  const m = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return 0;
  let h = Number.parseInt(m[1]!, 10);
  const min = Number.parseInt(m[2]!, 10);
  const pm = m[3]!.toUpperCase() === "PM";
  if (pm && h !== 12) h += 12;
  if (!pm && h === 12) h = 0;
  return h * 60 + min;
}

export function sortMealsByTime(slots: MealSlot[]): MealSlot[] {
  return [...slots].sort((a, b) => parseMealTime(a.time) - parseMealTime(b.time));
}

export function moveMealSlot(slots: MealSlot[], id: string, dir: -1 | 1): MealSlot[] {
  const i = slots.findIndex((s) => s.id === id);
  if (i < 0) return slots;
  const j = i + dir;
  if (j < 0 || j >= slots.length) return slots;
  const next = [...slots];
  [next[i], next[j]] = [next[j]!, next[i]!];
  return next;
}

export function dispatchMealScheduleUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("lm-meal-schedule"));
}
