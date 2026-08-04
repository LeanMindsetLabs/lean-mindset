export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  published: string;
  imageGradient: string;
  body: string[];
};

/** Seeded from Lean Mindset / Weight-Loss-Coaching program themes */
export const blogPosts: BlogPost[] = [
  {
    slug: "4-meal-precision-system",
    title: "The 4-Meal Precision System",
    excerpt:
      "Why structured timing beats calorie chaos for busy professionals.",
    category: "Nutrition",
    readMinutes: 5,
    published: "2026-07-10",
    imageGradient: "linear-gradient(135deg,#1a1008,var(--accent))",
    body: [
      "Lean Mindset labs run on a simple idea: four meals, clear timing, consistent portions - no starvation, no extreme restriction.",
      "Meal 1 anchors the morning with protein + complex carb. Meals 2 and 4 emphasize protein + vegetables. Meal 3 is a controlled protein snack that keeps energy stable through afternoon meetings.",
      "When travel or events hit, swap within the same category (protein ↔ protein). Timing can flex ±60 minutes - the structure matters more than perfection.",
      "Consistency over a full week drives results. One off-plan meal does not ruin the lab; skipping meals to “make up” for it does more harm.",
    ],
  },
  {
    slug: "hydration-without-obsession",
    title: "Hydration Without Obsession",
    excerpt: "Hit ~3.5L with checkpoints - not constant sipping anxiety.",
    category: "Habits",
    readMinutes: 4,
    published: "2026-07-12",
    imageGradient: "linear-gradient(145deg,#0a1a2a,#1a4a5a,var(--accent))",
    body: [
      "Your water target is a daily rhythm, not a contest. Front-load earlier if evening intake disrupts sleep.",
      "Use checkpoints: wake-up, between meals, and a final pour 60-90 minutes before bed.",
      "If high water volume leaves you feeling flat, discuss electrolytes with your clinician - this program is educational wellness guidance, not medical advice.",
      "Log glasses in daily check-in so your coach can spot patterns with weight and energy.",
    ],
  },
  {
    slug: "foundation-to-hiit",
    title: "From Foundation Walks to HIIT",
    excerpt: "Weeks 1-2 build the base; weeks 3-6 add intensity safely.",
    category: "Training",
    readMinutes: 6,
    published: "2026-07-14",
    imageGradient: "linear-gradient(120deg,#1a0a0a,#3a1010,var(--accent))",
    body: [
      "Early lab weeks prioritize Walk + Core, Full Body Light, and Mobility. The goal is adherence and recovery, not max effort.",
      "Acceleration weeks introduce HIIT circuits and strength work with controlled tempo. NEAT (steps) days keep calorie burn without frying your nervous system.",
      "Pair training with meal timing - don’t skip meals after hard sessions. Protein + vegetables at Meal 4 supports recovery.",
      "Log workouts so you and your coach can see the trend alongside weight and energy scores.",
    ],
  },
  {
    slug: "social-events-on-plan",
    title: "Social Events On Plan",
    excerpt: "Restaurants, travel, and late nights without derailing the lab.",
    category: "Lifestyle",
    readMinutes: 5,
    published: "2026-07-16",
    imageGradient: "linear-gradient(150deg,#121212,#2a1a10,var(--accent-hover))",
    body: [
      "Prioritize protein + vegetables. Sauce on the side. Skip the bread basket by default - not as punishment, as a simple default.",
      "Travel mornings: Greek yogurt + fruit + protein bar can cover Meal 1. Hotel omelettes work if you keep portions honest.",
      "If you go off-plan, get back on the next scheduled meal. Do not skip meals to compensate.",
      "Message your coach with the situation - clarifying swaps is part of the program; custom meal plans on the fly are not.",
    ],
  },
  {
    slug: "weekly-review-rhythm",
    title: "The Weekly Review Rhythm",
    excerpt: "What to track Monday so the next week gets easier.",
    category: "Accountability",
    readMinutes: 4,
    published: "2026-07-18",
    imageGradient: "linear-gradient(135deg,#0a0a1a,#1a1a3a,var(--accent))",
    body: [
      "Weight trends matter more than single mornings. Measure weekly, same conditions.",
      "Daily check-ins capture meals, water, energy, and challenges. Your coach uses them for adjustments - not judgment.",
      "End-of-week reflection: what worked, what to adjust, one focus for next week.",
      "80-90% adherence is still strong progress. Talk through the off-plan moment and plan better for the next similar situation.",
    ],
  },
  {
    slug: "supplements-with-disclaimers",
    title: "Supplements - Evidence-Informed, Not Magic",
    excerpt: "Core suggestions with clear medical disclaimers.",
    category: "Wellness",
    readMinutes: 3,
    published: "2026-07-20",
    imageGradient: "linear-gradient(140deg,#1a1a0a,#3a3a10,var(--accent))",
    body: [
      "A multivitamin, omega-3, and vitamin D (if deficient) cover common gaps during a deficit. Always consult your doctor first.",
      "Protein powder is a convenience tool - not a meal-replacement lifestyle.",
      "Electrolytes without sugar can help if water intake is high or you feel crampy after training.",
      "Food structure and consistency remain the primary drivers. Supplements support; they do not replace the 4-meal system.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
