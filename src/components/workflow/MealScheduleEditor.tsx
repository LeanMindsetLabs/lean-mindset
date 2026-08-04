"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createMealSlot,
  loadMealSchedule,
  MEAL_TYPE_OPTIONS,
  moveMealSlot,
  resetMealScheduleToDefault,
  saveMealSchedule,
  type MealSlot,
  type MealSlotType,
} from "@/lib/workflow/meal-schedule";
import { syncProgressMealLogsToSchedule } from "@/lib/workflow/daily-progress";
import { useMealScheduleStore } from "@/hooks/useDailyWorkflowProgress";

export function MealScheduleEditor({ onClose }: { onClose?: () => void }) {
  const [slots, setSlots] = useState<MealSlot[]>(() => loadMealSchedule());

  const persist = useCallback((next: MealSlot[]) => {
    setSlots(next);
    saveMealSchedule(next);
    syncProgressMealLogsToSchedule();
  }, []);

  function updateSlot(id: string, patch: Partial<MealSlot>) {
    persist(
      slots.map((s) => {
        if (s.id !== id) return s;
        const updated = { ...s, ...patch };
        if (patch.type && !patch.label) {
          updated.label = MEAL_TYPE_OPTIONS.find((o) => o.id === patch.type)!.label;
        }
        return updated;
      }),
    );
  }

  function removeSlot(id: string) {
    if (slots.length <= 1) return;
    persist(slots.filter((s) => s.id !== id));
  }

  function addSlot(type: MealSlotType) {
    persist([...slots, createMealSlot(type)]);
  }

  return (
    <section className="rounded-[14px] border border-[#2563eb]/30 bg-[#2563eb]/5 p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-white">Plan your day</h3>
          <p className="mt-0.5 text-[10px] text-foreground-muted">
            Set meal order and times. Breakfast, lunch, dinner, and snacks.
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-foreground-muted hover:text-white"
          >
            Done
          </button>
        ) : null}
      </div>

      <ol className="mt-3 flex flex-col gap-2">
        {slots.map((slot, index) => (
          <li
            key={slot.id}
            className="flex items-center gap-1.5 rounded-[12px] border border-border bg-background-card p-2"
          >
            <span className="w-4 shrink-0 text-center text-[10px] font-bold text-foreground-subtle">
              {index + 1}
            </span>
            <input
              value={slot.time}
              onChange={(e) => updateSlot(slot.id, { time: e.target.value })}
              placeholder="8:00 AM"
              className="w-[5.5rem] shrink-0 rounded-[8px] border border-border bg-background-elevated px-1.5 py-1.5 text-[10px] font-semibold text-white outline-none focus:border-accent"
              aria-label={`Time for ${slot.label}`}
            />
            <select
              value={slot.type}
              onChange={(e) => updateSlot(slot.id, { type: e.target.value as MealSlotType })}
              className="min-w-0 flex-1 rounded-[8px] border border-border bg-background-elevated px-1.5 py-1.5 text-[10px] font-semibold text-white outline-none focus:border-accent"
              aria-label={`Type for meal ${index + 1}`}
            >
              {MEAL_TYPE_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => persist(moveMealSlot(slots, slot.id, -1))}
                className="rounded px-1 text-[10px] text-foreground-muted hover:text-white disabled:opacity-30"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={index === slots.length - 1}
                onClick={() => persist(moveMealSlot(slots, slot.id, 1))}
                className="rounded px-1 text-[10px] text-foreground-muted hover:text-white disabled:opacity-30"
                aria-label="Move down"
              >
                ↓
              </button>
            </div>
            <button
              type="button"
              disabled={slots.length <= 1}
              onClick={() => removeSlot(slot.id)}
              className="shrink-0 px-1 text-[10px] text-foreground-subtle hover:text-red-400 disabled:opacity-30"
              aria-label={`Remove ${slot.label}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {MEAL_TYPE_OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => addSlot(o.id)}
            className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold text-foreground-muted hover:border-accent/40 hover:text-white"
          >
            + {o.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => persist(resetMealScheduleToDefault())}
          className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold text-[#93c5fd]"
        >
          Reset default
        </button>
      </div>
    </section>
  );
}

export function useMealSchedule() {
  return useMealScheduleStore();
}
