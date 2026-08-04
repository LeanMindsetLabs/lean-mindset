export type Lab = {
  slug: string;
  name: string;
  tagline: string;
  durationWeeks: number;
  focus: string;
  level: "Beginner" | "Intermediate" | "All levels";
  accent: string;
  highlights: string[];
  whoFor: string;
  includes: string[];
};

/** 6-week Lean Mindset labs / challenges */
export const labs: Lab[] = [
  {
    slug: "summer-lab",
    name: "Summer Lab",
    tagline: "Drop 15-20 lb before vacation - structured, social-life friendly.",
    durationWeeks: 6,
    focus: "Fat loss + energy",
    level: "All levels",
    accent: "#2563eb",
    highlights: ["4-meal precision plan", "Daily check-ins", "Travel / event swaps"],
    whoFor: "Busy professionals who want a leaner summer without crash dieting.",
    includes: [
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
  {
    slug: "bikini-body-lab",
    name: "Bikini Body Lab",
    tagline: "Tone, tighten, and feel confident - real food, no extremes.",
    durationWeeks: 6,
    focus: "Body composition",
    level: "Intermediate",
    accent: "#ff8a3d",
    highlights: ["Glute + core emphasis", "Photo check-ins", "Portion precision"],
    whoFor: "Anyone targeting a stronger, leaner look for an event or season.",
    includes: [
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
  {
    slug: "executive-reset",
    name: "Executive Reset Lab",
    tagline: "High-performance fat loss for packed calendars and late meetings.",
    durationWeeks: 6,
    focus: "Busy schedule adherence",
    level: "All levels",
    accent: "#f59e0b",
    highlights: ["Meeting-proof meal timing", "Minimal prep", "NEAT / steps targets"],
    whoFor: "Executives and knowledge workers who travel or eat out often.",
    includes: [
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
  {
    slug: "plant-powered",
    name: "Plant-Powered Lab",
    tagline: "Vegetarian-friendly fat loss with protein-smart plates.",
    durationWeeks: 6,
    focus: "Plant-based fat loss",
    level: "Beginner",
    accent: "#84cc16",
    highlights: ["Veg meal templates", "Protein swaps", "Simple grocery blueprint"],
    whoFor: "Vegetarians and mostly plant-based eaters tired of meat-heavy plans.",
    includes: [
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
  {
    slug: "post-holiday-reset",
    name: "Post-Holiday Reset",
    tagline: "Reset after the season - structure, hydration, and quick wins.",
    durationWeeks: 6,
    focus: "Reset + habits",
    level: "Beginner",
    accent: "#fb7185",
    highlights: ["2-day soft reset", "Habit streaks", "Weekly weigh-ins"],
    whoFor: "People who want a clean restart after holidays or a busy social stretch.",
    includes: [
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
  {
    slug: "foundation-lab",
    name: "Foundation Lab",
    tagline: "The core Lean Mindset 6-week system - no starving, no chemicals.",
    durationWeeks: 6,
    focus: "Core program",
    level: "All levels",
    accent: "#2563eb",
    highlights: ["Prep week", "4-meal system", "WhatsApp-style accountability"],
    whoFor: "First-time Lean Mindset clients starting the flagship cohort.",
    includes: [
      "Program guide",
      "Eating schedule",
      "Grocery list",
      "Supplement guide",
      "Workouts",
      "Water targets",
      "Progress trackers",
    ],
  },
];

export function getLab(slug: string) {
  return labs.find((lab) => lab.slug === slug);
}
