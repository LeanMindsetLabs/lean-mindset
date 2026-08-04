/** Contextual marketing & product imagery - cropped card media, not full mockup collages */

export const media = {
  marketing: {
    hero: "/marketing/hero.jpg",
    lift: "/marketing/hero-lift.png",
    lifestyle: "/marketing/lifestyle.png",
  },
  /** Properly cropped, context-matched card media */
  cards: {
    mealEggs: "/marketing/cards/meal-eggs.png",
    mealChicken: "/marketing/cards/meal-chicken-plate.png",
    mealSalad: "/marketing/cards/meal-salad.png",
    mealGrill: "/marketing/cards/meal-grill.png",
    mealBowls: "/marketing/cards/meal-bowls.png",
    mealSmoothie: "/marketing/cards/photo-pomegranate.png",
    mealPesto: "/marketing/cards/photo-pesto.png",
    mealFruit: "/marketing/cards/photo-pomegranate.png",
    athlete: "/marketing/cards/photo-athlete.png",
    athleteLifestyle: "/marketing/cards/photo-lifestyle-athlete.png",
    trainAction: "/marketing/cards/photo-train-action.png",
    trainHiit: "/marketing/cards/photo-hiit-card.png",
    trainStrength: "/marketing/cards/photo-strength-card.png",
    chat: "/marketing/cards/photo-chat.png",
    coach: "/marketing/cards/photo-coach.png",
    dashScore: "/marketing/cards/panel-score.png",
    dashRing: "/marketing/cards/panel-nutrition-ring.png",
    dashRadar: "/marketing/cards/panel-radar.png",
    dashChart: "/marketing/cards/panel-line-chart.png",
  },
  ui: {
    dashboard: "/ui/dashboard-home.png",
    nutrition: "/ui/nutrition.png",
    train: "/ui/train.png",
    progress: "/ui/progress.png",
    trainCard: "/ui/train-card.png",
    recipe1: "/ui/recipe-1.png",
    recipe2: "/ui/recipe-2.png",
    blog: "/ui/blog-1.png",
  },
} as const;

/** Rotate thumbs so lists use food photography, not collage crops */
export const recipeThumbs = [
  media.cards.mealEggs,
  media.cards.mealChicken,
  media.cards.mealSalad,
  media.cards.mealGrill,
  media.cards.mealBowls,
  media.cards.mealPesto,
  media.cards.mealFruit,
  media.cards.mealSmoothie,
] as const;

export const trainThumbs = [
  media.cards.trainAction,
  media.cards.athlete,
  media.cards.trainHiit,
  media.cards.trainStrength,
  media.cards.athleteLifestyle,
  media.marketing.lift,
] as const;

/** Moody B&W editorial covers - no UI screenshots, no baked-in title text */
export const blogThumbs = [
  "/marketing/blog/editorial-01-athlete.jpg",
  "/marketing/blog/editorial-02-water.jpg",
  "/marketing/blog/editorial-03-train.jpg",
  "/marketing/blog/editorial-07-silhouette.jpg",
  "/marketing/blog/editorial-05-focus.jpg",
  "/marketing/blog/editorial-06-still.jpg",
] as const;

export const blogHero = "/marketing/blog/editorial-08-grip.jpg";

export const musicThumbs = [
  media.cards.dashChart,
  media.cards.trainAction,
  media.cards.athlete,
  media.cards.dashScore,
  media.cards.trainHiit,
  media.marketing.lift,
] as const;
