"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  parseMealsVariant,
  type MealsVariant,
} from "@/components/v2/meals/MealsVariantToggle";
import { V2MealsLogV3 } from "@/components/v2/meals/V2MealsLogV3";
import { V2MealsOverview } from "@/components/v2/meals/V2MealsOverview";

const STORAGE_KEY = "lm-v2-meals-variant";

function V2MealsPageInner() {
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("variant");
  const variant: MealsVariant = parseMealsVariant(fromUrl);

  // Persist when driven by URL (preview chrome / deep link)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, variant);
    } catch {
      /* ignore */
    }
  }, [variant]);

  return (
    <div className="meals-compare">
      {variant === "log2" ? <V2MealsLogV3 /> : <V2MealsOverview />}
    </div>
  );
}

/** Variant chosen via `?variant=` (preview chrome) - no in-screen toggle. */
export default function V2MealsPage() {
  return (
    <Suspense fallback={<div className="meals-compare" />}>
      <V2MealsPageInner />
    </Suspense>
  );
}
