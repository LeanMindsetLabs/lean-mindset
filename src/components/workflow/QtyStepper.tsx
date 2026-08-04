"use client";

import { formatQty } from "@/lib/workflow/meal-log-selection";

export function QtyStepper({
  value,
  onChange,
  min = 0,
  step = 1,
  onRemove,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  step?: number;
  onRemove?: () => void;
}) {
  function dec() {
    const next = Math.round((value - step) * 2) / 2;
    if (next < min) {
      onRemove?.();
      return;
    }
    onChange(next);
  }

  function inc() {
    onChange(Math.round((value + step) * 2) / 2);
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={dec}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background-elevated text-sm font-bold text-white hover:border-accent/50"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-[1.75rem] text-center text-xs font-bold text-white">{formatQty(value)}</span>
      <button
        type="button"
        onClick={inc}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2563eb]/45 bg-[#2563eb]/15 text-sm font-bold text-[#93c5fd] hover:border-[#2563eb]/70"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
