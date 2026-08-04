"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { LeanMindsetLogo, LeanMindsetNavAppIcon } from "@/components/brand/LeanMindsetLogo";
import { labs } from "@/data/labs";
import {
  ALL_ACCESS_FREE,
  FOUNDER_OFFER,
  FREE_ACCESS,
  MEMBERSHIP_PLANS,
  type PlanId,
} from "@/data/product-config";
import type { FounderOfferStatus } from "@/lib/onboarding/founder-offer";
import { saveOnboardingSelection } from "@/lib/onboarding/onboarding-selection";

const STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "lab", title: "Pick lab" },
  { id: "plan", title: "Pick plan" },
  { id: "account", title: "Account" },
  { id: "ready", title: "Ready" },
] as const;

const FEATURED_LABS = labs.slice(0, 3);

export function OnboardingWizard({
  initialStep = 0,
  founderOffer,
}: {
  initialStep?: number;
  founderOffer: FounderOfferStatus;
}) {
  const [step, setStep] = useState(initialStep);
  const [labSlug, setLabSlug] = useState(FEATURED_LABS[0]?.slug ?? "summer-lab");
  const [planId, setPlanId] = useState<PlanId>("lab");

  const founderFree = founderOffer.active;
  const selectedLab = FEATURED_LABS.find((l) => l.slug === labSlug) ?? FEATURED_LABS[0];
  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === planId)!;

  useEffect(() => {
    saveOnboardingSelection({ labSlug, planId, founderFree });
  }, [labSlug, planId, founderFree]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function finishReady() {
    window.location.href = "/preview/frame?path=%2Fv2%2Fhome%3Fwelcome%3D1";
  }

  return (
    <div className="flex flex-col gap-5 pb-8 pt-4">
      <div>
        <div className="mb-2 flex items-center justify-between text-[11px] text-[#64748b]">
          <span>
            Step {step + 1} of {STEPS.length}
          </span>
          <span>{STEPS[step]?.title}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#2563eb] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <section className="flex flex-col gap-4">
          <LeanMindsetLogo variant="lockup" className="justify-center" />
          <h1 className="text-center text-2xl font-bold text-white">Welcome to your lab</h1>
          <p className="text-center text-sm leading-relaxed text-[#94a3b8]">
            Six weeks. Four meals a day. Daily coach check-ins. No crash diets — just a clear plan
            you can follow.
          </p>
          <ul className="space-y-2 rounded-[18px] border border-[#64748b]/28 bg-[#0d1118] p-4 text-sm text-[#94a3b8]">
            <li>✓ Pick your 6-week lab focus</li>
            <li>✓ Choose how you join</li>
            <li>✓ Create your account — then your daily loop opens</li>
          </ul>
          {founderFree && (
            <p className="rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-3 py-2 text-center text-xs font-semibold text-[#60a5fa]">
              {ALL_ACCESS_FREE ? FREE_ACCESS.pitch : FOUNDER_OFFER.pitch(founderOffer.remaining)}
            </p>
          )}
        </section>
      )}

      {step === 1 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Pick your lab</h2>
          <p className="text-sm text-[#64748b]">One 6-week focus. You can switch labs later.</p>
          <ul className="flex flex-col gap-2">
            {FEATURED_LABS.map((lab) => {
              const selected = lab.slug === labSlug;
              return (
                <li key={lab.slug}>
                  <button
                    type="button"
                    onClick={() => setLabSlug(lab.slug)}
                    className={`w-full rounded-[16px] border px-4 py-3 text-left transition ${
                      selected
                        ? "border-[#2563eb]/50 bg-[#2563eb]/10"
                        : "border-[#64748b]/28 bg-[#0d1118] hover:border-[#64748b]/50"
                    }`}
                  >
                    <p className="text-sm font-bold text-white">{lab.name}</p>
                    <p className="mt-0.5 text-xs text-[#64748b]">{lab.focus}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 2 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Choose your plan</h2>
          {founderFree ? (
            <p className="rounded-[14px] border border-[#2563eb]/35 bg-[#2563eb]/10 px-3 py-2 text-xs text-[#bfdbfe]">
              {ALL_ACCESS_FREE ? (
                <>
                  <strong className="text-white">Everything is free for now.</strong> Pick any plan
                  — no payment required.
                </>
              ) : (
                <>
                  You&apos;re in the first {founderOffer.remaining} founder spot
                  {founderOffer.remaining === 1 ? "" : "s"} —{" "}
                  <strong className="text-white">$0 today</strong>. Regular pricing applies after the
                  first {founderOffer.limit} members.
                </>
              )}
            </p>
          ) : (
            <p className="text-sm text-[#64748b]">Founder spots are full — standard pricing.</p>
          )}
          <ul className="flex flex-col gap-2">
            {MEMBERSHIP_PLANS.map((plan) => {
              const selected = plan.id === planId;
              return (
                <li key={plan.id}>
                  <button
                    type="button"
                    onClick={() => setPlanId(plan.id)}
                    className={`w-full rounded-[16px] border px-4 py-3 text-left transition ${
                      selected
                        ? "border-[#2563eb]/50 bg-[#2563eb]/10"
                        : "border-[#64748b]/28 bg-[#0d1118]"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-bold text-white">{plan.shortName}</p>
                      <p className="text-right">
                        {founderFree ? (
                          <>
                            <span className="mr-1.5 text-xs text-[#64748b] line-through">
                              {plan.priceLabel}
                            </span>
                            <span className="text-sm font-bold text-[#60a5fa]">FREE</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-white">{plan.priceLabel}</span>
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-[#64748b]">{plan.onboardingPeriod}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {step === 3 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-white">Create your account</h2>
          <div className="rounded-[14px] border border-[#64748b]/28 bg-[#0d1118] px-3 py-2 text-xs text-[#94a3b8]">
            <p>
              <span className="text-white">{selectedLab?.name}</span> · {selectedPlan.shortName}
              {founderFree ? " · FREE" : ` · ${selectedPlan.priceLabel}`}
            </p>
          </div>
          <AuthForm mode="signup" next="/start?step=ready" />
          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full rounded-full border border-[#64748b]/40 py-2.5 text-xs font-semibold text-[#94a3b8]"
          >
            Preview next step without account
          </button>
          <p className="text-center text-xs text-[#64748b]">
            Already joined?{" "}
            <Link href="/login?next=/v2/home" className="text-[#60a5fa]">
              Log in
            </Link>
          </p>
        </section>
      )}

      {step === 4 && (
        <section className="flex flex-col items-center gap-4 py-4 text-center">
          <LeanMindsetNavAppIcon height={64} />
          <h2 className="text-xl font-bold text-white">You&apos;re in</h2>
          <p className="max-w-xs text-sm text-[#94a3b8]">
            {selectedLab?.name} is ready. Your daily loop: Meals → Train → Check-in.
          </p>
          {founderFree && (
            <p className="text-xs font-semibold text-[#60a5fa]">{FREE_ACCESS.memberNote}</p>
          )}
        </section>
      )}

      <div className="mt-auto flex gap-2 pt-2">
        {step > 0 && step < 4 && (
          <button
            type="button"
            onClick={back}
            className="flex-1 rounded-full border border-[#64748b]/40 py-3 text-sm font-semibold text-[#94a3b8]"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            onClick={next}
            className="flex-1 rounded-full bg-[#2563eb] py-3 text-sm font-bold text-white"
          >
            Continue
          </button>
        )}
        {step === 4 && (
          <button
            type="button"
            onClick={finishReady}
            className="w-full rounded-full bg-[#2563eb] py-3 text-sm font-bold text-white"
          >
            Open my home
          </button>
        )}
      </div>
    </div>
  );
}
