"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import {
  MealsVariantToggle,
  parseMealsVariant,
  type MealsVariant,
} from "@/components/v2/meals/MealsVariantToggle";
import { IPHONE_15 } from "@/lib/device/iphone-15";

function pathOnlyOf(raw: string) {
  return raw.split("?")[0] ?? raw;
}

function withVariant(pathname: string, variant: MealsVariant) {
  if (variant === "log1") return pathname;
  return `${pathname}?variant=log2`;
}

export function PreviewFrameClient({ initialPath }: { initialPath: string }) {
  const pathOnly = pathOnlyOf(initialPath);
  const isMeals = pathOnly === "/v2/meals";

  const initialVariant = useMemo(() => {
    try {
      const q = initialPath.includes("?") ? initialPath.slice(initialPath.indexOf("?") + 1) : "";
      return parseMealsVariant(new URLSearchParams(q).get("variant"));
    } catch {
      return "log1" as MealsVariant;
    }
  }, [initialPath]);

  const [variant, setVariant] = useState<MealsVariant>(initialVariant);

  const iframeSrc = isMeals ? withVariant(pathOnly, variant) : initialPath;

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#050508] px-4 py-8">
      <div className="mb-4 flex w-full max-w-lg flex-col items-center gap-3">
        <div className="flex w-full items-center justify-between text-sm text-white/60">
          <Link href="/preview" className="hover:text-[#60a5fa]">
            ← All previews
          </Link>
          <span>
            iPhone 15 · {IPHONE_15.width}×{IPHONE_15.height}
          </span>
        </div>
        {isMeals ? <MealsVariantToggle variant={variant} onPick={setVariant} /> : null}
      </div>
      <PhoneFrame key={iframeSrc} iframeSrc={iframeSrc} statusBar />
      <p className="mt-4 text-center text-xs text-white/40">{iframeSrc}</p>
    </div>
  );
}
