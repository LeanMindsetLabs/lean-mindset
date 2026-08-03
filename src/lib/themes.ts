/** Lean Mindset color iterations — violet & blue palettes (industry references). */
export type ThemeId = "a" | "b" | "c";

export const themeClass: Record<ThemeId, string> = {
  a: "theme-a",
  b: "theme-b",
  c: "theme-c",
};

export const themes = {
  a: {
    id: "a" as const,
    label: "Iteration A",
    name: "Royal Violet",
    reference: "Discord · Notion · premium wellness",
    accent: "#7C3AED",
    accentHover: "#8B5CF6",
    accentSoft: "rgba(124, 58, 237, 0.16)",
    description:
      "Tailwind violet-600 — confident, premium, and common in coaching and membership products.",
  },
  b: {
    id: "b" as const,
    label: "Iteration B",
    name: "Trust Blue",
    reference: "Linear · iOS · Peloton-adjacent fitness",
    accent: "#2563EB",
    accentHover: "#3B82F6",
    accentSoft: "rgba(37, 99, 235, 0.16)",
    description:
      "Tailwind blue-600 — active default. Health, productivity, and high-trust SaaS interfaces.",
    isDefault: true,
  },
  c: {
    id: "c" as const,
    label: "Iteration C",
    name: "Indigo Pro",
    reference: "Figma · Stripe · modern B2C apps",
    accent: "#6366F1",
    accentHover: "#818CF8",
    accentSoft: "rgba(99, 102, 241, 0.16)",
    description:
      "Tailwind indigo-500 — bridges violet and blue; polished and widely used in top product teams.",
  },
} as const;

export const themeList = [themes.a, themes.b, themes.c];

export function isThemeId(value: string | null): value is ThemeId {
  return value === "a" || value === "b" || value === "c";
}
