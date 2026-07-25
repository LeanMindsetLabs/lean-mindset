/** Program content derived from Weight-Loss-Coaching docs — UI/mock seed */

export const programMeta = {
  name: "Lean Mindset 6-Week Lab",
  promise:
    "A 6-week high-touch program to drop up to 20 lb using structured 4-meal plans and daily accountability — no starving, no extremes.",
  durationWeeks: 6,
  mealsPerDay: 4,
  waterLitersTarget: 3.5,
};

export const programGuide = {
  title: "Program Guide",
  phases: [
    {
      name: "Phase 0 — Preparation",
      days: "2 pre-plan days",
      goal: "Get ready",
      bullets: [
        "Labs / medical clearance if needed",
        "Review diet plan, grocery list, supplement guide",
        "Baseline photos + measurements",
        "Buy groceries and supplements",
        "Enjoy your last few larger meals before Day 1",
      ],
    },
    {
      name: "Phase 1 — Foundation & Reset",
      days: "Days 1–2",
      goal: "Detox and reset",
      bullets: [
        "2-day structured reset plan",
        "Hydration as prescribed",
        "Sleep optimization",
        "Daily tracking + check-ins",
      ],
    },
    {
      name: "Phase 2 — Start",
      days: "Weeks 1–2",
      goal: "Lock the rhythm",
      bullets: [
        "4-meal structure + portion control",
        "Hydration + sleep targets",
        "Light workout plan",
        "Daily tracking + weekly review",
      ],
    },
    {
      name: "Phase 3 — Acceleration",
      days: "Weeks 3–6",
      goal: "Fine-tune and sustain",
      bullets: [
        "Adjust portions based on progress",
        "Add sustainable habits for life",
        "HIIT training as prescribed",
        "Daily tracking + weekly readouts",
      ],
    },
  ],
  rules: [
    "Follow meal times as closely as possible",
    "No skipping meals to “make up” for off-plan eating",
    "Drink your water target daily",
    "Check in on schedule — consistency beats perfection",
    "This is educational wellness guidance, not medical advice",
  ],
};

export const eatingSchedule = {
  title: "Eating Schedule",
  subtitle: "4-Meal Precision Plan — sample day (customize per lab)",
  meals: [
    {
      name: "Meal 1 — Breakfast",
      time: "8:00 AM",
      focus: "Protein + complex carb",
      example: "Egg whites / tofu scramble, oats or fruit, black coffee or tea",
      swaps: [
        "Travel: Greek yogurt + banana + protein bar",
        "Event morning: egg-white omelette + fruit at the hotel",
      ],
    },
    {
      name: "Meal 2 — Midday",
      time: "12:00 PM",
      focus: "Protein + vegetables",
      example: "Grilled chicken or lentils, large salad, olive oil drizzle",
      swaps: [
        "Restaurant: grilled protein + double veg, sauce on the side",
        "Desk day: leftover protein + bagged salad",
      ],
    },
    {
      name: "Meal 3 — Afternoon",
      time: "3:30 PM",
      focus: "Protein + controlled carb",
      example: "Greek yogurt or cottage cheese, berries, handful of nuts",
      swaps: [
        "On the go: cottage cheese cup + apple",
        "Meeting snack: protein shake + handful of almonds",
      ],
    },
    {
      name: "Meal 4 — Evening",
      time: "7:00 PM",
      focus: "Protein + vegetables",
      example: "Fish or paneer, steamed veggies, optional small sweet potato",
      swaps: [
        "Dinner out: fish/chicken + veggies; skip the bread basket",
        "Late night: lean protein + cucumber/tomato plate",
      ],
    },
  ],
  notes: [
    "Keep portions consistent with your assigned plan",
    "Swap within the same category (protein ↔ protein)",
    "Social events: prioritize protein + veggies, stay near meal timing",
  ],
};

export const groceryList = {
  title: "Grocery List",
  subtitle: "Done-for-you shopping blueprint by aisle",
  sections: [
    {
      aisle: "Proteins",
      items: [
        "Chicken breast / turkey",
        "Fish (salmon, white fish)",
        "Eggs / egg whites",
        "Greek yogurt (plain)",
        "Cottage cheese",
        "Tofu / tempeh (plant option)",
        "Lentils / chickpeas",
      ],
    },
    {
      aisle: "Vegetables",
      items: [
        "Leafy greens (spinach, lettuce)",
        "Broccoli / cauliflower",
        "Cucumber / tomatoes",
        "Peppers / zucchini",
        "Mixed salad packs",
      ],
    },
    {
      aisle: "Carbs & fruit",
      items: [
        "Oats",
        "Sweet potatoes",
        "Berries",
        "Apples / bananas (portioned)",
        "Brown rice or quinoa (optional)",
      ],
    },
    {
      aisle: "Pantry & fats",
      items: [
        "Extra virgin olive oil",
        "Nuts (almonds, walnuts) — measured",
        "Spices / herbs / hot sauce",
        "Vinegar / lemon",
        "Herbal tea / black coffee",
      ],
    },
  ],
};

export const supplements = {
  title: "Supplement Guide",
  subtitle: "Evidence-informed suggestions — not medical advice",
  disclaimer:
    "Consult your doctor before starting supplements, especially if pregnant, nursing, or on medication.",
  core: [
    {
      name: "Multivitamin",
      why: "Covers common micronutrient gaps during a calorie deficit.",
      how: "1 serving with Meal 1",
    },
    {
      name: "Omega-3 (fish oil or algae)",
      why: "Supports overall wellness during fat-loss phases.",
      how: "As labeled, with a meal",
    },
    {
      name: "Vitamin D (if deficient)",
      why: "Common shortfall; test when possible.",
      how: "As advised by your clinician",
    },
  ],
  optional: [
    {
      name: "Whey / plant protein",
      why: "Convenient protein when whole food is hard.",
      how: "Use to hit protein at a meal — not a meal replacement lifestyle",
    },
    {
      name: "Electrolytes (no sugar)",
      why: "Helpful if water intake is high or you feel flat.",
      how: "During / after workouts as needed",
    },
  ],
};

export const workouts = {
  title: "Workout List",
  subtitle: "Schedule-adaptive plan — light early, HIIT later",
  weeks: [
    {
      label: "Weeks 1–2 · Foundation",
      sessions: [
        {
          name: "Walk + Core A",
          duration: "25–30 min",
          detail: "Brisk walk 20 min + 5–10 min plank variations / dead bugs",
        },
        {
          name: "Full Body Light",
          duration: "30 min",
          detail: "Squats, push-ups (or incline), rows, glute bridges — 3 rounds",
        },
        {
          name: "Mobility Reset",
          duration: "20 min",
          detail: "Hips, T-spine, hamstrings — recovery focus",
        },
      ],
    },
    {
      label: "Weeks 3–6 · Acceleration",
      sessions: [
        {
          name: "HIIT Circuit A",
          duration: "25 min",
          detail: "40s work / 20s rest × 8 — burpees, mountain climbers, squat jumps, punches",
        },
        {
          name: "Strength Circuit B",
          duration: "35 min",
          detail: "Lower + upper split emphasis — controlled tempo",
        },
        {
          name: "NEAT Day",
          duration: "45–60 min",
          detail: "Steps goal day — walk meetings, evening stroll",
        },
      ],
    },
  ],
};

export const waterPlan = {
  title: "Water & Hydration",
  subtitle: `Daily target: ~${programMeta.waterLitersTarget} L (adjust to your coach plan)`,
  checkpoints: [
    { time: "Upon waking", amount: "500 ml" },
    { time: "Between Meal 1–2", amount: "750 ml" },
    { time: "Between Meal 2–3", amount: "750 ml" },
    { time: "Between Meal 3–4", amount: "750 ml" },
    { time: "Evening (finish 60–90 min before bed)", amount: "500–750 ml" },
  ],
  tips: [
    "Front-load water earlier in the day if evenings disrupt sleep",
    "Add electrolytes if you feel dizzy or crampy (non-medical guidance)",
    "Log glasses in Daily Check-in",
  ],
};

export const trackers = {
  title: "Progress Trackers",
  subtitle: "What to log during your lab",
  items: [
    {
      name: "Weight",
      cadence: "Weekly (same day, morning, after bathroom)",
      note: "Expect non-linear progress — trends matter more than single days",
    },
    {
      name: "Measurements",
      cadence: "Every 2 weeks",
      note: "Waist, hips, chest — optional photos with consent",
    },
    {
      name: "Meal adherence",
      cadence: "Daily",
      note: "Yes/No or % for completing all 4 meals",
    },
    {
      name: "Energy (1–10)",
      cadence: "Daily",
      note: "Used in weekly review adjustments",
    },
    {
      name: "Sleep",
      cadence: "Daily",
      note: "Hours + quality note if off-plan",
    },
    {
      name: "Weekly reflection",
      cadence: "End of week",
      note: "What worked, what to adjust, one focus for next week",
    },
  ],
};

export const programNav = [
  { href: "/program/guide", label: "Program guide", desc: "Phases, rules, expectations" },
  { href: "/nutrition", label: "Nutrition day", desc: "Rings · when to eat" },
  { href: "/program/eating-schedule", label: "Eating schedule", desc: "4-meal daily timing" },
  { href: "/program/grocery", label: "Grocery list", desc: "Shopping blueprint" },
  { href: "/program/supplements", label: "Supplements", desc: "Core + optional" },
  { href: "/train", label: "Training", desc: "Sessions + AI picks" },
  { href: "/program/workouts", label: "Workout list", desc: "Foundation → HIIT" },
  { href: "/program/water", label: "Water", desc: "Daily hydration plan" },
  { href: "/program/trackers", label: "Trackers", desc: "Weight, habits, reviews" },
  { href: "/recipes", label: "Recipes", desc: "Plate card grid" },
] as const;
