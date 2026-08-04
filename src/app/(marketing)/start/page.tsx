import Link from "next/link";
import { Suspense } from "react";
import { IPHONE_15 } from "@/lib/device/iphone-15";
import { getFounderOfferStatus } from "@/lib/onboarding/founder-offer";
import { OnboardingStartClient } from "./OnboardingStartClient";

export default async function StartPage() {
  const founderOffer = await getFounderOfferStatus();

  return (
    <div className="min-h-dvh bg-black text-white">
      <header
        className="mx-auto flex items-center justify-between px-4 py-3"
        style={{ maxWidth: IPHONE_15.width }}
      >
        <Link href="/" className="text-xs font-semibold text-[#64748b] hover:text-white">
          ← Back
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748b]">
          New member
        </span>
      </header>
      <main className="mx-auto px-4" style={{ maxWidth: IPHONE_15.width }}>
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-[#64748b]">Loading…</div>
          }
        >
          <OnboardingStartClient founderOffer={founderOffer} />
        </Suspense>
      </main>
    </div>
  );
}
