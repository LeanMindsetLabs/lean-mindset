/** Client-side daily workflow progress (local demo until Supabase sync). */

import {
  bowlsToLegacyFields,
  emptyMealBowls,
  legacyToBowls,
  migrateMealBowls,
  type MealBowls,
} from "@/data/meal-bowls";
import type { MealBowlPick, MealExtraItem } from "@/lib/workflow/meal-log-selection";
import {
  DEFAULT_MEAL_SCHEDULE,
  loadMealSchedule,
} from "@/lib/workflow/meal-schedule";

function mealSlotCount(): number {
  if (typeof window === "undefined") return DEFAULT_MEAL_SCHEDULE.length;
  return loadMealSchedule().length;
}

function normalizeOneLog(
  entry: Partial<MealLogEntry> | undefined,
  fallbackLogged: boolean,
): MealLogEntry {
  const bowls = entry?.bowls
    ? migrateMealBowls(entry.bowls)
    : legacyToBowls((entry ?? {}) as MealLogEntry);
  const legacy = bowlsToLegacyFields(bowls);
  return {
    logged: Boolean(entry?.logged ?? fallbackLogged),
    bowlPicks: entry?.bowlPicks ?? [],
    extras: entry?.extras ?? [],
    bowls,
    proteinId: entry?.proteinId ?? legacy.proteinId,
    proteinLabel: entry?.proteinLabel ?? legacy.proteinLabel,
    ingredientIds: entry?.ingredientIds ?? legacy.ingredientIds,
    cups: entry?.cups ?? null,
  };
}

export type MealLogEntry = {
  logged: boolean;
  bowlPicks: MealBowlPick[];
  extras: MealExtraItem[];
  bowls: MealBowls;
  /** @deprecated legacy - derived from bowls on save */
  proteinId: string | null;
  proteinLabel: string | null;
  ingredientIds: string[];
  cups: number | null;
};

export type DailyProgress = {
  date: string;
  meals: boolean[];
  mealLogs: MealLogEntry[];
  trainSessionId: string | null;
  trainCompleted: boolean;
  checkInSent: boolean;
};

const STORAGE_PREFIX = "lean-mindset-daily-progress";

export function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function emptyMealLog(): MealLogEntry {
  return {
    logged: false,
    bowlPicks: [],
    extras: [],
    bowls: emptyMealBowls(),
    proteinId: null,
    proteinLabel: null,
    ingredientIds: [],
    cups: null,
  };
}

export function emptyProgress(date = todayKey()): DailyProgress {
  const count = DEFAULT_MEAL_SCHEDULE.length;
  return {
    date,
    meals: Array.from({ length: count }, () => false),
    mealLogs: Array.from({ length: count }, emptyMealLog),
    trainSessionId: "walk-core-a",
    trainCompleted: false,
    checkInSent: false,
  };
}

function normalizeMealLogs(parsed: Partial<DailyProgress>): MealLogEntry[] {
  const count = mealSlotCount();
  const existing = Array.isArray(parsed.mealLogs) ? parsed.mealLogs : [];
  return Array.from({ length: count }, (_, i) =>
    normalizeOneLog(existing[i], Boolean(parsed.meals?.[i])),
  );
}

export function loadDailyProgress(): DailyProgress {
  if (typeof window === "undefined") return emptyProgress();
  const key = todayKey();
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}:${key}`);
    if (!raw) return emptyProgress(key);
    const parsed = JSON.parse(raw) as Partial<DailyProgress>;
    if (parsed.date !== key) return emptyProgress(key);
    const mealLogs = normalizeMealLogs(parsed);
    return {
      ...emptyProgress(key),
      ...parsed,
      mealLogs,
      meals: mealLogs.map((l) => l.logged),
    };
  } catch {
    return emptyProgress(key);
  }
}

export function saveDailyProgress(progress: DailyProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${STORAGE_PREFIX}:${progress.date}`, JSON.stringify(progress));
}

export function mealsDoneCount(progress: DailyProgress) {
  return progress.mealLogs.filter((l) => l.logged).length;
}

export const WORKFLOW_MEALS_TARGET = DEFAULT_MEAL_SCHEDULE.length;

export function getMealsTarget(): number {
  return mealSlotCount();
}

/** Pad or trim today's meal logs when the user changes their schedule. */
export function syncProgressMealLogsToSchedule() {
  const progress = loadDailyProgress();
  const mealLogs = normalizeMealLogs(progress);
  saveDailyProgress({
    ...progress,
    mealLogs,
    meals: mealLogs.map((l) => l.logged),
  });
  dispatchProgressUpdated();
}
export const WORKFLOW_TRAIN_WEEKLY_TARGET = 5;

export function dispatchProgressUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("lean-mindset-daily-progress"));
}
