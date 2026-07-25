/** Reference mock imagery copied into public/ — use as heroes & card thumbs */

export const media = {
  marketing: {
    hero: "/marketing/hero-athlete.png",
    lift: "/marketing/hero-lift.png",
    lifestyle: "/marketing/lifestyle.png",
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

/** Rotate thumbs so lists aren't identical empty gradients */
export const recipeThumbs = [
  media.ui.recipe1,
  media.ui.recipe2,
  media.marketing.lifestyle,
  media.ui.nutrition,
  media.ui.recipe1,
  media.ui.recipe2,
  media.marketing.lifestyle,
  media.ui.dashboard,
] as const;

export const trainThumbs = [
  media.ui.trainCard,
  media.ui.train,
  media.marketing.hero,
  media.ui.progress,
  media.ui.trainCard,
  media.marketing.lift,
] as const;

export const blogThumbs = [
  media.ui.blog,
  media.ui.nutrition,
  media.ui.train,
  media.marketing.lifestyle,
  media.ui.progress,
] as const;

export const musicThumbs = [
  media.ui.progress,
  media.ui.train,
  media.marketing.hero,
  media.ui.dashboard,
  media.ui.trainCard,
  media.marketing.lift,
] as const;
