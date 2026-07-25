export type Exercise = {
  name: string;
  sets?: string;
  note?: string;
};

export type TrainingSession = {
  id: string;
  name: string;
  phase: "foundation" | "acceleration";
  duration: string;
  level: string;
  focus: string;
  detail: string;
  exercises: Exercise[];
  aiSuggested?: boolean;
  caloriesHint: string;
};

export const trainingSessions: TrainingSession[] = [
  {
    id: "walk-core-a",
    name: "Walk + Core A",
    phase: "foundation",
    duration: "25–30 min",
    level: "Beginner",
    focus: "NEAT + midline",
    detail: "Brisk walk 20 min + 5–10 min plank variations / dead bugs",
    caloriesHint: "~180–220 kcal",
    exercises: [
      { name: "Brisk walk", sets: "20 min", note: "Conversational pace+" },
      { name: "Front plank", sets: "3 × 30–40s" },
      { name: "Dead bugs", sets: "3 × 8/side" },
      { name: "Side plank", sets: "2 × 20s/side" },
    ],
  },
  {
    id: "full-body-light",
    name: "Full Body Light",
    phase: "foundation",
    duration: "30 min",
    level: "Beginner",
    focus: "Strength base",
    detail: "Squats, push-ups (or incline), rows, glute bridges — 3 rounds",
    caloriesHint: "~200–260 kcal",
    exercises: [
      { name: "Bodyweight squat", sets: "3 × 12" },
      { name: "Incline push-up", sets: "3 × 8–12" },
      { name: "Band / DB row", sets: "3 × 12" },
      { name: "Glute bridge", sets: "3 × 12" },
    ],
    aiSuggested: true,
  },
  {
    id: "mobility-reset",
    name: "Mobility Reset",
    phase: "foundation",
    duration: "20 min",
    level: "All levels",
    focus: "Recovery",
    detail: "Hips, T-spine, hamstrings — recovery focus",
    caloriesHint: "~80–120 kcal",
    exercises: [
      { name: "90/90 hip stretch", sets: "2 × 45s/side" },
      { name: "Open books (T-spine)", sets: "2 × 8/side" },
      { name: "Hamstring floss", sets: "2 × 10/side" },
      { name: "Cat-cow", sets: "2 × 10" },
    ],
  },
  {
    id: "hiit-circuit-a",
    name: "HIIT Circuit A",
    phase: "acceleration",
    duration: "25 min",
    level: "Intermediate",
    focus: "Conditioning",
    detail: "40s work / 20s rest × 8 — burpees, mountain climbers, squat jumps, punches",
    caloriesHint: "~280–350 kcal",
    aiSuggested: true,
    exercises: [
      { name: "Burpees", sets: "40s on / 20s off" },
      { name: "Mountain climbers", sets: "40s on / 20s off" },
      { name: "Squat jumps", sets: "40s on / 20s off" },
      { name: "Shadow punches", sets: "40s on / 20s off" },
    ],
  },
  {
    id: "strength-circuit-b",
    name: "Strength Circuit B",
    phase: "acceleration",
    duration: "35 min",
    level: "Intermediate",
    focus: "Strength",
    detail: "Lower + upper split emphasis — controlled tempo",
    caloriesHint: "~250–320 kcal",
    aiSuggested: true,
    exercises: [
      { name: "Goblet squat", sets: "4 × 8", note: "3-1-1 tempo" },
      { name: "Push-up or DB press", sets: "4 × 8–10" },
      { name: "Romanian hinge", sets: "3 × 10" },
      { name: "Single-arm row", sets: "3 × 10/side" },
    ],
  },
  {
    id: "neat-day",
    name: "NEAT Day",
    phase: "acceleration",
    duration: "45–60 min",
    level: "All levels",
    focus: "Steps",
    detail: "Steps goal day — walk meetings, evening stroll",
    caloriesHint: "Depends on steps",
    exercises: [
      { name: "Walk meetings", sets: "Accumulate", note: "Break sitting blocks" },
      { name: "Evening stroll", sets: "20–30 min" },
      { name: "Optional stairs", sets: "5–10 min" },
    ],
  },
  {
    id: "desk-breaker-flow",
    name: "Desk Breaker Flow",
    phase: "foundation",
    duration: "12 min",
    level: "Beginner",
    focus: "Micro-session",
    detail: "AI pick for meeting-heavy days — short activation between Meal 2–3",
    caloriesHint: "~60–90 kcal",
    aiSuggested: true,
    exercises: [
      { name: "March in place", sets: "2 min" },
      { name: "Wall sit", sets: "3 × 30s" },
      { name: "Band pull-aparts", sets: "3 × 15" },
      { name: "Calf raises", sets: "2 × 20" },
    ],
  },
  {
    id: "finisher-core-b",
    name: "Finisher Core B",
    phase: "acceleration",
    duration: "10 min",
    level: "Intermediate",
    focus: "Core finisher",
    detail: "AI add-on after Strength Circuit — keep breathing steady",
    caloriesHint: "~50–80 kcal",
    aiSuggested: true,
    exercises: [
      { name: "Hollow hold", sets: "3 × 20–30s" },
      { name: "Bird dog", sets: "3 × 8/side" },
      { name: "Reverse crunch", sets: "3 × 10" },
    ],
  },
];

export function getSession(id: string) {
  return trainingSessions.find((s) => s.id === id);
}

export function aiSessions() {
  return trainingSessions.filter((s) => s.aiSuggested);
}

export function sessionsByPhase(phase: TrainingSession["phase"]) {
  return trainingSessions.filter((s) => s.phase === phase);
}
