"use client";

import { useSearchParams } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import type { FounderOfferStatus } from "@/lib/onboarding/founder-offer";

export function OnboardingStartClient({
  founderOffer,
}: {
  founderOffer: FounderOfferStatus;
}) {
  const params = useSearchParams();
  const initialStep = params.get("step") === "ready" ? 4 : 0;
  return <OnboardingWizard initialStep={initialStep} founderOffer={founderOffer} />;
}
