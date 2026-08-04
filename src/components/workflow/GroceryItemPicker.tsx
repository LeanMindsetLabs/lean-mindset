"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";

export function GroceryItemPicker({
  label,
  items,
  onPick,
  disabled,
}: {
  label: string;
  items: GroceryItemRef[];
  onPick: (item: GroceryItemRef) => void;
  disabled?: boolean;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  if (!items.length) {
    return (
      <span className="text-[10px] text-foreground-subtle">{disabled ? "All added" : "No items"}</span>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition disabled:opacity-40 ${
          open
            ? "border-accent bg-accent text-white"
            : "border-[#2563eb]/45 bg-[#2563eb]/12 text-[#93c5fd] hover:border-[#2563eb]/70"
        }`}
      >
        {label}
        <span className={`text-[8px] ${open ? "rotate-180" : ""}`} aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 z-10 mt-1 max-h-36 w-56 overflow-y-auto rounded-[10px] border border-[#2563eb]/40 bg-[#070b14] py-0.5 shadow-lg lm-hide-scrollbar"
        >
          {items.map((item) => (
            <li key={item.key} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => {
                  onPick(item);
                  setOpen(false);
                }}
                className="w-full px-2.5 py-2 text-left text-[11px] font-medium text-white hover:bg-[#2563eb]/20"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
