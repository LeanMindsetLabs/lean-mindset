"use client";

export type MealsVariant = "log1" | "log2";

const OPTIONS: { id: MealsVariant; label: string }[] = [
  { id: "log1", label: "Log 1" },
  { id: "log2", label: "Log 2" },
];

/** Self-contained styles - works in preview chrome (outside `.lm-v2`) and in-app. */
export function MealsVariantToggle({
  variant,
  onPick,
  className = "",
}: {
  variant: MealsVariant;
  onPick: (next: MealsVariant) => void;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex shrink-0 gap-[3px] rounded-[9px] border border-white/15 bg-black/50 p-0.5 ${className}`}
      role="tablist"
      aria-label="Meals layout"
    >
      {OPTIONS.map(({ id, label }) => {
        const active = variant === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            className={
              active
                ? "rounded-[7px] border-none bg-[#2f6fed] px-1.5 py-1 text-[9px] font-bold leading-tight text-white shadow-[0_0_10px_rgba(47,111,237,0.3)]"
                : "rounded-[7px] border-none bg-transparent px-1.5 py-1 text-[9px] font-bold leading-tight text-white/45"
            }
            onClick={() => onPick(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** Parse URL/storage variant. Default = Log 1. `log2` | `v3` → Log 2. Legacy `current`/`new` → Log 1. */
export function parseMealsVariant(raw: string | null | undefined): MealsVariant {
  if (raw === "log2" || raw === "v3") return "log2";
  return "log1";
}
