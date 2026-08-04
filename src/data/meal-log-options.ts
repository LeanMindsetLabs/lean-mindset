/** Per-meal logging options — proteins, sides, bowl size in cups. */

export type MealLogOption = { id: string; label: string };

export type MealLogPlan = {
  mealIndex: number;
  proteins: MealLogOption[];
  ingredients: MealLogOption[];
};

export const BOWL_CUP_SIZES = [0.5, 1, 1.5, 2, 2.5, 3] as const;

export const MEAL_LOG_PLANS: MealLogPlan[] = [
  {
    mealIndex: 0,
    proteins: [
      { id: "eggs", label: "Whole eggs" },
      { id: "egg-whites", label: "Egg whites" },
      { id: "greek-yogurt", label: "Greek yogurt" },
      { id: "protein-shake", label: "Protein shake" },
      { id: "tofu-scramble", label: "Tofu scramble" },
    ],
    ingredients: [
      { id: "oats", label: "Oats" },
      { id: "fruit", label: "Fruit" },
      { id: "berries", label: "Berries" },
      { id: "avocado", label: "Avocado" },
      { id: "coffee-tea", label: "Coffee / tea" },
    ],
  },
  {
    mealIndex: 1,
    proteins: [
      { id: "chicken", label: "Grilled chicken" },
      { id: "turkey", label: "Turkey" },
      { id: "fish", label: "Fish" },
      { id: "lentils", label: "Lentils" },
      { id: "paneer", label: "Paneer" },
      { id: "tofu", label: "Tofu" },
    ],
    ingredients: [
      { id: "salad", label: "Large salad" },
      { id: "steamed-veg", label: "Steamed vegetables" },
      { id: "olive-oil", label: "Olive oil drizzle" },
      { id: "brown-rice", label: "Brown rice / quinoa" },
    ],
  },
  {
    mealIndex: 2,
    proteins: [
      { id: "cottage-cheese", label: "Cottage cheese" },
      { id: "greek-yogurt", label: "Greek yogurt" },
      { id: "protein-shake", label: "Protein shake" },
      { id: "hard-boiled-eggs", label: "Hard-boiled eggs" },
    ],
    ingredients: [
      { id: "berries", label: "Berries" },
      { id: "apple", label: "Apple" },
      { id: "almonds", label: "Almonds (measured)" },
      { id: "rice-cakes", label: "Rice cakes" },
    ],
  },
  {
    mealIndex: 3,
    proteins: [
      { id: "salmon", label: "Salmon" },
      { id: "white-fish", label: "White fish" },
      { id: "chicken", label: "Chicken" },
      { id: "paneer", label: "Paneer" },
      { id: "lean-beef", label: "Lean beef" },
    ],
    ingredients: [
      { id: "steamed-veg", label: "Steamed vegetables" },
      { id: "sweet-potato", label: "Sweet potato" },
      { id: "cucumber-tomato", label: "Cucumber / tomato" },
      { id: "side-salad", label: "Side salad" },
    ],
  },
];

export function getMealLogPlan(mealIndex: number): MealLogPlan {
  return MEAL_LOG_PLANS[mealIndex] ?? MEAL_LOG_PLANS[0]!;
}

export function labelForOption(
  plan: MealLogPlan,
  proteinId: string | null,
  ingredientIds: string[],
): string {
  const protein = plan.proteins.find((p) => p.id === proteinId)?.label;
  const parts = [protein, ...ingredientIds.map((id) => plan.ingredients.find((i) => i.id === id)?.label)].filter(
    Boolean,
  );
  return parts.slice(0, 2).join(" · ") || "Logged meal";
}
