"use client";

import { useCallback, useEffect, useState } from "react";
import { emptyMealBowls } from "@/data/meal-bowls";
import {
  type DailyProgress,
  type MealLogEntry,
  dispatchProgressUpdated,
  emptyMealLog,
  emptyProgress,
  loadDailyProgress,
  mealsDoneCount,
  saveDailyProgress,
  todayKey,
  getMealsTarget,
  WORKFLOW_MEALS_TARGET,
} from "@/lib/workflow/daily-progress";
import {
  DEFAULT_MEAL_SCHEDULE,
  loadMealSchedule,
  type MealSlot,
} from "@/lib/workflow/meal-schedule";
import { loadBowlLibrary, type SavedBowl } from "@/lib/workflow/bowl-library";

export function useDailyWorkflowProgress() {
  const [progress, setProgress] = useState<DailyProgress>(() => emptyProgress());
  const [mealsTarget, setMealsTarget] = useState(WORKFLOW_MEALS_TARGET);

  const refresh = useCallback(() => {
    setProgress(loadDailyProgress());
    setMealsTarget(getMealsTarget());
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener("lean-mindset-daily-progress", onUpdate);
    window.addEventListener("lm-meal-schedule", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("lean-mindset-daily-progress", onUpdate);
      window.removeEventListener("lm-meal-schedule", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);

  const persist = useCallback((next: DailyProgress) => {
    const dated = { ...next, date: todayKey() };
    saveDailyProgress(dated);
    setProgress(dated);
    setMealsTarget(getMealsTarget());
    dispatchProgressUpdated();
  }, []);

  const logMeal = useCallback(
    (index: number, entry: Omit<MealLogEntry, "logged">) => {
      const current = loadDailyProgress();
      const mealLogs = [...current.mealLogs];
      mealLogs[index] = {
        ...emptyMealLog(),
        ...entry,
        logged: true,
        bowls: entry.bowls ?? emptyMealBowls(),
      };
      persist({
        ...current,
        mealLogs,
        meals: mealLogs.map((l) => l.logged),
      });
    },
    [persist],
  );

  const clearMeal = useCallback(
    (index: number) => {
      const current = loadDailyProgress();
      const mealLogs = [...current.mealLogs];
      mealLogs[index] = emptyMealLog();
      persist({
        ...current,
        mealLogs,
        meals: mealLogs.map((l) => l.logged),
      });
    },
    [persist],
  );

  const toggleMeal = useCallback(
    (index: number) => {
      const current = loadDailyProgress();
      if (current.mealLogs[index]?.logged) clearMeal(index);
    },
    [clearMeal],
  );

  const markTrainComplete = useCallback(
    (sessionId: string) => {
      const current = loadDailyProgress();
      persist({
        ...current,
        trainSessionId: sessionId,
        trainCompleted: true,
      });
    },
    [persist],
  );

  const markCheckInSent = useCallback(() => {
    const current = loadDailyProgress();
    persist({ ...current, checkInSent: true });
  }, [persist]);

  return {
    progress,
    mealsDone: mealsDoneCount(progress),
    mealsTarget,
    refresh,
    logMeal,
    clearMeal,
    toggleMeal,
    markTrainComplete,
    markCheckInSent,
  };
}

export function useMealScheduleStore(): MealSlot[] {
  const [schedule, setSchedule] = useState<MealSlot[]>(() => DEFAULT_MEAL_SCHEDULE);

  useEffect(() => {
    const refresh = () => setSchedule(loadMealSchedule());
    refresh();
    window.addEventListener("lm-meal-schedule", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lm-meal-schedule", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return schedule;
}

export function useBowlLibraryStore(): SavedBowl[] {
  const [library, setLibrary] = useState<SavedBowl[]>([]);

  useEffect(() => {
    const refresh = () => setLibrary(loadBowlLibrary());
    refresh();
    window.addEventListener("lm-bowl-library", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lm-bowl-library", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return library;
}
