import { dashboardMock } from "@/components/homeMock";

export type CheckInDraftMetrics = {
  day: number;
  labName: string;
  weightLb: string;
  mealsDone: number;
  mealsTarget: number;
  waterDone: string;
  waterTarget: string;
  trainLabel: string;
  trainDone: boolean;
};

export function defaultCheckInMetrics(
  overrides?: Partial<CheckInDraftMetrics>,
): CheckInDraftMetrics {
  return {
    day: dashboardMock.day,
    labName: "Summer Lab",
    weightLb: "178.4",
    mealsDone: 2,
    mealsTarget: 5,
    waterDone: "2.3",
    waterTarget: "3.5",
    trainLabel: "Walk + Core A",
    trainDone: false,
    ...overrides,
  };
}

export function buildCheckInMessage(m: CheckInDraftMetrics, notes = "") {
  const lines = [
    `Day ${m.day} · ${m.labName}`,
    `Weight: ${m.weightLb} lb`,
    `Meals: ${m.mealsDone}/${m.mealsTarget}`,
    `Water: ${m.waterDone} / ${m.waterTarget} L`,
    `Training: ${m.trainLabel}${m.trainDone ? " ✓" : ""}`,
  ];
  if (notes.trim()) lines.push(`Notes: ${notes.trim()}`);
  return lines.join("\n");
}

/** Legacy multi-line template kept for coach-parse compatibility */
export const DAILY_CHECKIN_TEMPLATE = buildCheckInMessage(defaultCheckInMetrics(), "");

export const CHECKIN_QUICK_CHIPS = [
  { id: "full", label: "Full check-in" },
  { id: "meals", label: "Meals only" },
  { id: "weight", label: "Weight only" },
  { id: "done", label: "All on plan" },
] as const;

export function chipToMessage(
  chipId: (typeof CHECKIN_QUICK_CHIPS)[number]["id"],
  m: CheckInDraftMetrics,
) {
  switch (chipId) {
    case "full":
      return buildCheckInMessage(m);
    case "meals":
      return `Meals today: ${m.mealsDone}/${m.mealsTarget} · on lab plan`;
    case "weight":
      return `Weight: ${m.weightLb} lb · Day ${m.day}`;
    case "done":
      return buildCheckInMessage(
        { ...m, mealsDone: m.mealsTarget, trainDone: true },
        "All on plan today.",
      );
  }
}
