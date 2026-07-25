/**
 * Soft-parse daily check-in free text. Never throws; returns null if nothing useful.
 * Matches the Insert-template shape (Day / Lb / Change / Total Change / BM / Water / meals).
 */

export type ParsedCheckIn = {
  day: number | null;
  weightLb: number | null;
  changeLb: number | null;
  totalChangeLb: number | null;
  bm: number | null;
  water: number | null;
  meals: string[];
};

const MEAL_PREFIX =
  /^(breakfast|lunch|dinner|snack|black coffee)\b/i;

function num(match: RegExpMatchArray | null, group = 1): number | null {
  if (!match?.[group]) return null;
  const n = Number.parseFloat(match[group].replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function softParseCheckIn(body: string): ParsedCheckIn | null {
  const text = body.trim();
  if (!text) return null;

  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

  let day: number | null = null;
  let weightLb: number | null = null;
  let changeLb: number | null = null;
  let totalChangeLb: number | null = null;
  let bm: number | null = null;
  let water: number | null = null;
  const meals: string[] = [];

  for (const line of lines) {
    const todayDay = line.match(/^today:\s*day\s*(-?\d+(?:\.\d+)?)/i);
    const dayOnly = line.match(/^day\s*:?\s*(-?\d+(?:\.\d+)?)/i);
    const startedSkip = /^started:/i.test(line);

    if (todayDay) {
      day = Math.round(num(todayDay)!);
      continue;
    }
    if (!startedSkip && dayOnly && day == null) {
      day = Math.round(num(dayOnly)!);
      continue;
    }

    const lb =
      line.match(/^lb:\s*(-?\d+(?:\.\d+)?)/i) ||
      line.match(/^weight:\s*(-?\d+(?:\.\d+)?)/i) ||
      line.match(/^(-?\d+(?:\.\d+)?)\s*lbs?\b/i);
    if (lb && weightLb == null) {
      weightLb = num(lb);
      continue;
    }

    if (/^total\s*change:/i.test(line)) {
      totalChangeLb = num(line.match(/(-?\d+(?:\.\d+)?)/));
      continue;
    }
    if (/^change:/i.test(line)) {
      changeLb = num(line.match(/(-?\d+(?:\.\d+)?)/));
      continue;
    }

    if (/^bm:/i.test(line)) {
      bm = num(line.match(/(-?\d+(?:\.\d+)?)/));
      continue;
    }
    if (/^water:/i.test(line)) {
      water = num(line.match(/(-?\d+(?:\.\d+)?)/));
      continue;
    }

    if (MEAL_PREFIX.test(line) || /^(breakfast|lunch|dinner|snack)\s*:/i.test(line)) {
      meals.push(line);
    }
  }

  const hasMetric =
    day != null ||
    weightLb != null ||
    changeLb != null ||
    totalChangeLb != null ||
    bm != null ||
    water != null;

  if (!hasMetric && meals.length === 0) return null;

  return {
    day,
    weightLb,
    changeLb,
    totalChangeLb,
    bm,
    water,
    meals,
  };
}

export function hasParsedMetrics(p: ParsedCheckIn): boolean {
  return (
    p.day != null ||
    p.weightLb != null ||
    p.changeLb != null ||
    p.totalChangeLb != null ||
    p.bm != null ||
    p.water != null ||
    p.meals.length > 0
  );
}
