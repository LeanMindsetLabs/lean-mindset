/** Mock dashboard visuals - replaced by live trackers where wired */

export const weekAdherence = [
  { day: "M", pct: 90 },
  { day: "T", pct: 100 },
  { day: "W", pct: 75 },
  { day: "T", pct: 85 },
  { day: "F", pct: 60 },
  { day: "S", pct: 95 },
  { day: "S", pct: 40 },
];

export function buildCalendarStrip(anchor = new Date()) {
  const start = new Date(anchor);
  start.setDate(start.getDate() - start.getDay()); // Sunday start
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const isToday =
      d.toDateString() === anchor.toDateString();
    return {
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-US", { weekday: "narrow" }),
      date: d.getDate(),
      isToday,
      hasCheckIn: i < 5 || isToday ? i % 2 === 0 || isToday : false,
    };
  });
}

export const nutritionRingsMock = {
  mealsDone: 2,
  mealsTarget: 5,
  proteinPct: 62,
  waterPct: 66,
  timingPct: 80,
};
