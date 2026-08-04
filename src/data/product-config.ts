/**
 * Single source of truth for pricing, plans, and access.
 * Marketing, onboarding, and checkout must import from here — do not duplicate.
 */

/** Flip to false when Stripe checkout goes live. */
export const ALL_ACCESS_FREE = true;

export const FREE_ACCESS = {
  label: "Free access",
  pitch: "Join free — full access while we launch",
  memberNote: "No charge while we're in launch",
} as const;

/** Used when ALL_ACCESS_FREE is false — first N members join free. */
export const FOUNDER_OFFER = {
  freeMemberLimit: Number(process.env.NEXT_PUBLIC_FOUNDER_FREE_LIMIT ?? 5),
  label: "Founder offer",
  pitch: (remaining: number) =>
    remaining === 1
      ? "Founder offer — 1 spot left · join FREE"
      : `Founder offer — ${remaining} of ${FOUNDER_OFFER.freeMemberLimit} spots left · join FREE`,
} as const;

export function isFreeAccess(): boolean {
  return ALL_ACCESS_FREE;
}

export function displayPrice(plan: MembershipPlan): string {
  return ALL_ACCESS_FREE ? "FREE" : plan.priceLabel;
}

export type PlanId = "lab" | "monthly" | "yearly";

export type MembershipPlan = {
  id: PlanId;
  name: string;
  /** Onboarding step uses shorter card title */
  shortName: string;
  price: number;
  priceLabel: string;
  period: string;
  onboardingPeriod: string;
  highlight: boolean;
  badge: string | null;
  features: readonly string[];
  cta: string;
  note: string | null;
};

export const MEMBERSHIP_PLANS: readonly MembershipPlan[] = [
  {
    id: "lab",
    name: "Lab",
    shortName: "Single Lab",
    price: 250,
    priceLabel: "$250",
    period: "per lab",
    onboardingPeriod: "one 6-week lab",
    highlight: false,
    badge: null,
    features: [
      "One 6-week lab focus",
      "Meals, training & water targets",
      "Daily check-in coaching",
      "Grocery list + meal swaps",
    ],
    cta: "Start lab",
    note: "One lab. One focus. Six weeks.",
  },
  {
    id: "monthly",
    name: "Monthly",
    shortName: "Monthly",
    price: 49,
    priceLabel: "$49",
    period: "per month",
    onboardingPeriod: "per month",
    highlight: false,
    badge: null,
    features: [
      "Full lab library access",
      "Daily check-in coaching",
      "Grocery list + meal swaps",
      "Workouts & water targets",
      "Cancel anytime",
    ],
    cta: "Start monthly",
    note: null,
  },
  {
    id: "yearly",
    name: "Yearly",
    shortName: "Yearly",
    price: 399,
    priceLabel: "$399",
    period: "per year",
    onboardingPeriod: "per year",
    highlight: true,
    badge: "Save 32%",
    features: [
      "Everything in Monthly",
      "Best value (~$33/mo)",
      "All current & new labs",
      "Priority coach reviews",
      "Cancel anytime",
    ],
    cta: "Start yearly",
    note: "Billed annually. Cancel anytime.",
  },
] as const;

export function getPlanById(id: PlanId): MembershipPlan {
  const plan = MEMBERSHIP_PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}
