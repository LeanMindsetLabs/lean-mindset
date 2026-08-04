"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { sendMessage, type MessageRow } from "@/app/check-in/actions";
import {
  CHECKIN_QUICK_CHIPS,
  chipToMessage,
  type CheckInDraftMetrics,
} from "@/lib/checkin/template";

type Props = {
  conversationId: string;
  currentUserId: string;
  initialMessages: MessageRow[];
  title?: string;
  subtitle?: string;
  showTemplateChip?: boolean;
  draftMetrics?: CheckInDraftMetrics;
  onSent?: () => void;
};

export function CheckInChat({
  conversationId,
  currentUserId,
  initialMessages,
  title = "Daily check-in",
  subtitle = "Message your coach",
  showTemplateChip = true,
  draftMetrics,
  onSent,
}: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const metrics = draftMetrics;

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function insertText(text: string) {
    setDraft(text);
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body || pending) return;

    setError(null);
    startTransition(async () => {
      const result = await sendMessage(conversationId, body);
      if (result.error || !result.message) {
        setError(result.error ?? "Could not send.");
        return;
      }
      setMessages((prev) => [...prev, result.message!]);
      setDraft("");
      onSent?.();
    });
  }

  return (
    <div className="flex min-h-[calc(100dvh-var(--nav-height)-var(--safe-bottom)-120px)] flex-col">
      {title ? (
        <header className="mb-3 shrink-0 border-b border-border pb-3">
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          <p className="text-xs text-foreground-muted">{subtitle}</p>
        </header>
      ) : null}

      {metrics && (
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          {[
            { label: "Weight", value: `${metrics.weightLb} lb` },
            { label: "Meals", value: `${metrics.mealsDone}/${metrics.mealsTarget}` },
            { label: "Water", value: `${metrics.waterDone}L` },
          ].map((chip) => (
            <div
              key={chip.label}
              className="rounded-[10px] border border-[#64748b]/28 bg-[#0d1118] px-2 py-1.5 text-center"
            >
              <p className="text-[9px] uppercase text-[#64748b]">{chip.label}</p>
              <p className="text-[11px] font-semibold text-white">{chip.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="lm-hide-scrollbar flex-1 space-y-2 overflow-y-auto py-2">
        {messages.length === 0 && (
          <p className="px-2 text-center text-sm text-foreground-subtle">
            No messages yet. Tap a quick chip or type your update.
          </p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === currentUserId;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  mine
                    ? "rounded-br-md bg-accent text-white"
                    : "rounded-bl-md bg-background-card text-foreground"
                }`}
              >
                {m.body}
                <p
                  className={`mt-1 text-[10px] ${
                    mine ? "text-white/70" : "text-foreground-subtle"
                  }`}
                >
                  {formatTime(m.created_at)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div
        className="sticky bottom-0 shrink-0 border-t border-border bg-background pt-3"
        style={{ paddingBottom: "4px" }}
      >
        {showTemplateChip && metrics && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {CHECKIN_QUICK_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => insertText(chipToMessage(chip.id, metrics))}
                className="rounded-full border border-accent/50 bg-accent-soft px-2.5 py-1 text-[10px] font-semibold text-accent"
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="Type today's check-in…"
            className="min-h-[44px] flex-1 resize-none rounded-[var(--lm-radius-md)] border border-border bg-background-elevated px-3 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={pending || !draft.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:opacity-40"
            aria-label="Send"
          >
            <SendIcon />
          </button>
        </form>
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>
    </div>
  );
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12 20 4l-6 16-2.5-6.5L4 12Z" fill="currentColor" />
    </svg>
  );
}
