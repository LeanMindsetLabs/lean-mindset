export type Recipe = {
  id: string;
  title: string;
  tagline: string;
  meal: "breakfast" | "midday" | "afternoon" | "evening" | "any";
  minutes: number;
  calories: number;
  proteinG: number;
  imageGradient: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  aiSuggested?: boolean;
};

export const recipes: Recipe[] = [
  {
    id: "egg-white-oat-bowl",
    title: "Egg White Oat Bowl",
    tagline: "Meal 1 protein + complex carb",
    meal: "breakfast",
    minutes: 12,
    calories: 340,
    proteinG: 32,
    imageGradient: "linear-gradient(135deg,#2a1a0a,var(--accent) 70%)",
    ingredients: [
      "6 egg whites",
      "1/2 cup dry oats",
      "1/2 cup berries",
      "Cinnamon + black coffee",
    ],
    steps: [
      "Cook oats with water until creamy.",
      "Scramble egg whites in a nonstick pan.",
      "Top oats with eggs, berries, and cinnamon.",
    ],
    tags: ["high-protein", "meal-1"],
  },
  {
    id: "grilled-chicken-salad",
    title: "Grilled Chicken Power Salad",
    tagline: "Meal 2 plate formula",
    meal: "midday",
    minutes: 20,
    calories: 420,
    proteinG: 45,
    imageGradient: "linear-gradient(145deg,#0a2a14,#1a3a20 40%,var(--accent))",
    ingredients: [
      "6 oz chicken breast",
      "Large mixed greens",
      "Cucumber, tomato, peppers",
      "1 tsp olive oil + lemon",
    ],
    steps: [
      "Season and grill chicken until cooked through.",
      "Build a large salad base.",
      "Slice chicken on top; dress lightly.",
    ],
    tags: ["lean", "meal-2"],
    aiSuggested: true,
  },
  {
    id: "greek-yogurt-berry-cup",
    title: "Greek Yogurt Berry Cup",
    tagline: "Afternoon controlled carb",
    meal: "afternoon",
    minutes: 5,
    calories: 280,
    proteinG: 28,
    imageGradient: "linear-gradient(160deg,#1a1028,#3a2048,var(--accent))",
    ingredients: [
      "1 cup plain Greek yogurt",
      "1/2 cup berries",
      "10 almonds",
      "Optional cinnamon",
    ],
    steps: [
      "Scoop yogurt into a bowl.",
      "Add berries and measured almonds.",
      "Eat as Meal 3 on schedule.",
    ],
    tags: ["quick", "meal-3"],
    aiSuggested: true,
  },
  {
    id: "salmon-veg-plate",
    title: "Salmon + Steamed Veg Plate",
    tagline: "Evening protein + vegetables",
    meal: "evening",
    minutes: 25,
    calories: 480,
    proteinG: 40,
    imageGradient: "linear-gradient(120deg,#0a1a2a,#1a3a4a,var(--accent-hover))",
    ingredients: [
      "5-6 oz salmon",
      "Broccoli + zucchini",
      "Optional small sweet potato",
      "Lemon, herbs, salt/pepper",
    ],
    steps: [
      "Bake or pan-sear salmon.",
      "Steam vegetables until tender-crisp.",
      "Plate with optional sweet potato portion.",
    ],
    tags: ["omega-3", "meal-4"],
  },
  {
    id: "tofu-scramble-wrap",
    title: "Tofu Scramble Wrap",
    tagline: "Plant swap for Meal 1",
    meal: "breakfast",
    minutes: 15,
    calories: 360,
    proteinG: 26,
    imageGradient: "linear-gradient(135deg,#1a2a0a,#3a4a1a,var(--accent))",
    ingredients: [
      "6 oz firm tofu",
      "Spinach + peppers",
      "1 small whole-grain wrap (or lettuce wrap)",
      "Turmeric, black pepper",
    ],
    steps: [
      "Crumble and sauté tofu with spices.",
      "Wilt spinach and peppers in.",
      "Wrap and eat within Meal 1 window.",
    ],
    tags: ["plant", "swap"],
    aiSuggested: true,
  },
  {
    id: "lentil-bowl",
    title: "Lentil Veggie Bowl",
    tagline: "Restaurant-friendly midday swap",
    meal: "midday",
    minutes: 18,
    calories: 400,
    proteinG: 24,
    imageGradient: "linear-gradient(150deg,#2a1408,#4a2810,var(--accent))",
    ingredients: [
      "1 cup cooked lentils",
      "Roasted peppers + greens",
      "Cucumber salad",
      "1 tsp olive oil",
    ],
    steps: [
      "Warm lentils with spices.",
      "Add roasted vegetables and greens.",
      "Finish with measured oil.",
    ],
    tags: ["plant", "meal-2"],
  },
  {
    id: "cottage-apple-plate",
    title: "Cottage Cheese Apple Plate",
    tagline: "On-the-go Meal 3",
    meal: "afternoon",
    minutes: 3,
    calories: 250,
    proteinG: 26,
    imageGradient: "linear-gradient(140deg,#121212,#2a2a2a,var(--accent))",
    ingredients: ["1 cup cottage cheese", "1 apple", "Cinnamon"],
    steps: ["Portion cottage cheese.", "Slice apple.", "Dust cinnamon and eat."],
    tags: ["quick", "travel"],
    aiSuggested: true,
  },
  {
    id: "paneer-veg-skillet",
    title: "Paneer Veg Skillet",
    tagline: "Evening vegetarian option",
    meal: "evening",
    minutes: 22,
    calories: 450,
    proteinG: 32,
    imageGradient: "linear-gradient(130deg,#2a0a1a,#4a1a2a,var(--accent-hover))",
    ingredients: [
      "5 oz paneer",
      "Mixed vegetables",
      "Tomato spices",
      "Optional side salad",
    ],
    steps: [
      "Sauté paneer cubes until golden.",
      "Add vegetables and spices.",
      "Serve with side salad - skip heavy sauces.",
    ],
    tags: ["vegetarian", "meal-4"],
  },
];

export function getRecipe(id: string) {
  return recipes.find((r) => r.id === id);
}

export function aiRecipes() {
  return recipes.filter((r) => r.aiSuggested);
}
