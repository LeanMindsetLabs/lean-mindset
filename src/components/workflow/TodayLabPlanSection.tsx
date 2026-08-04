"use client";

import Link from "next/link";
import { TodayLabPlan } from "@/components/workflow/DailyWorkflow";
import { useDailyWorkflowProgress } from "@/hooks/useDailyWorkflowProgress";

export function TodayLabPlanSection({
  serverMealsDone,
  serverMealsTarget,
  workoutsDone = 1,
  workoutsTarget = 5,
}: {
  serverMealsDone?: number;
  serverMealsTarget?: number;
  workoutsDone?: number;
  workoutsTarget?: number;
}) {
  const { progress, mealsDone, mealsTarget } = useDailyWorkflowProgress();
  const mergedMeals = Math.max(serverMealsDone ?? 0, mealsDone);
  const target = serverMealsTarget ?? mealsTarget;

  return (
    <TodayLabPlan
      mealsDone={mergedMeals}
      mealsTarget={target}
      workoutsDone={progress.trainCompleted ? workoutsTarget : workoutsDone}
      workoutsTarget={workoutsTarget}
      checkInDone={progress.checkInSent}
    />
  );
}
