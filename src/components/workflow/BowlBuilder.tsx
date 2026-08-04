"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BowlItemGroups } from "@/data/meal-bowls";
import type { GroceryItemRef } from "@/lib/grocery/grocery-keys";

function PickListSection({
  label,
  items,
  onPick,
}: {
  label: string;
  items: GroceryItemRef[];
  onPick: (item: GroceryItemRef) => void;
}) {
  if (!items.length) return null;
  return (
    <>
      <li className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#64748b]">
        {label}
      </li>
      {items.map((item) => (
        <li key={item.key} role="option" aria-selected={false}>
          <button
            type="button"
            onClick={() => onPick(item)}
            className="w-full px-2.5 py-2 text-left text-[11px] font-medium leading-snug text-white transition hover:bg-[#2563eb]/20 active:bg-[#2563eb]/30"
          >
            {item.label}
          </button>
        </li>
      ))}
    </>
  );
}

export function BowlBuilder({
  title,
  itemGroups,
  selected,
  onAdd,
  onRemove,
  onDeleteBowl,
}: {
  title: string;
  itemGroups: BowlItemGroups;
  selected: GroceryItemRef[];
  onAdd: (item: GroceryItemRef) => void;
  onRemove: (key: string) => void;
  onDeleteBowl?: () => void;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const selectedKeys = new Set(selected.map((i) => i.key));
  const primaryAvailable = itemGroups.primary.filter((i) => !selectedKeys.has(i.key));
  const extrasAvailable = itemGroups.extras.filter((i) => !selectedKeys.has(i.key));
  const hasAvailable = primaryAvailable.length + extrasAvailable.length > 0;

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function pick(item: GroceryItemRef) {
    onAdd(item);
    setOpen(false);
  }

  return (
    <section ref={rootRef} className="rounded-[14px] border border-border bg-background-card px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-sm font-bold text-white">{title}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {hasAvailable ? (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              aria-label={`Add item to ${title}`}
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition ${
                open
                  ? "border-accent bg-accent text-white"
                  : "border-[#2563eb]/45 bg-[#2563eb]/12 text-[#93c5fd] hover:border-[#2563eb]/70"
              }`}
            >
              + Add
              <span
                className={`text-[8px] leading-none transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden
              >
                ▾
              </span>
            </button>
          ) : (
            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-foreground-subtle">
              All added
            </span>
          )}
          {onDeleteBowl ? (
            <button
              type="button"
              onClick={onDeleteBowl}
              className="rounded-full px-1.5 py-1 text-[10px] font-semibold text-[#64748b] hover:text-red-400"
              aria-label={`Remove ${title}`}
            >
              ✕
            </button>
          ) : null}
        </div>
      </div>

      {open && hasAvailable ? (
        <div
          id={listId}
          role="listbox"
          aria-label={`${title} items`}
          className="mt-1.5 overflow-hidden rounded-[10px] border border-[#2563eb]/40 bg-[#070b14] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <ul className="lm-hide-scrollbar max-h-40 divide-y divide-white/[0.06] overflow-y-auto py-0.5">
            <PickListSection label="Main" items={primaryAvailable} onPick={pick} />
            <PickListSection label="Oils, nuts & more" items={extrasAvailable} onPick={pick} />
          </ul>
        </div>
      ) : null}

      {selected.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onRemove(item.key)}
              className="max-w-full truncate rounded-full border border-[#2563eb]/35 bg-[#2563eb]/15 px-2.5 py-1 text-[10px] font-semibold text-white transition hover:border-red-400/50 hover:bg-red-500/10"
              title={`Remove ${item.label}`}
            >
              {item.label}
              <span className="ml-1 text-[#94a3b8]">×</span>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
