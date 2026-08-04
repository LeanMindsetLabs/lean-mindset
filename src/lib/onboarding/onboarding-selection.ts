const ONBOARDING_KEY = "lean-mindset-onboarding";

export type OnboardingSelection = {
  labSlug: string;
  planId: string;
  founderFree: boolean;
};

export function saveOnboardingSelection(selection: OnboardingSelection) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(selection));
}

export function loadOnboardingSelection(): OnboardingSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OnboardingSelection;
  } catch {
    return null;
  }
}
