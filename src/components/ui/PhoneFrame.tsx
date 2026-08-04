import type { CSSProperties, ReactNode } from "react";
import { IPHONE_15 } from "@/lib/device/iphone-15";

export { IPHONE_15 } from "@/lib/device/iphone-15";

type PhoneFrameProps = {
  children?: ReactNode;
  /** Embed a live route inside the frame (393×852 logical). */
  iframeSrc?: string;
  /** Show status bar time + island (default true) */
  statusBar?: boolean;
  /** Optional bottom slot (e.g. nav mock). Adds safe-area padding. */
  footer?: ReactNode;
  /** Inner screen background (default navy) */
  screenClassName?: string;
  /** Optional inline styles on the inner screen (e.g. full-screen gradient) */
  screenStyle?: CSSProperties;
  className?: string;
};

/**
 * iPhone 15 device chrome for pre-screens, demos, and agent-driven UI previews.
 * Not used for production app shell — preview/documentation only.
 */
export function PhoneFrame({
  children,
  iframeSrc,
  statusBar = true,
  footer,
  screenClassName = "bg-[#080b12]",
  screenStyle,
  className = "",
}: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto shrink-0 ${className}`}
      style={{
        width: IPHONE_15.width,
        height: IPHONE_15.height,
        borderRadius: IPHONE_15.bezelRadius,
        boxShadow:
          "0 0 0 2px #1a1a1a, 0 0 0 3px #333, 0 32px 64px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)",
        background: "#000",
      }}
      role="img"
      aria-label="iPhone 15 preview frame"
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden ${screenClassName}`}
        style={{ borderRadius: IPHONE_15.screenRadius, ...screenStyle }}
      >
        {statusBar && (
          <div
            className="relative z-10 flex shrink-0 items-center justify-between px-6 pt-3 text-[11px] font-semibold text-white/90"
            style={{ height: 54 }}
          >
            <span>9:41</span>
            <div
              className="absolute left-1/2 top-2.5 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />
            <span className="flex items-center gap-1 text-[10px]">
              <span aria-hidden>▮▮▮</span>
            </span>
          </div>
        )}

        <div
          className="min-h-0 flex-1 overflow-hidden"
          style={{
            paddingBottom: footer ? 0 : iframeSrc ? 0 : 16,
          }}
        >
          {iframeSrc ? (
            <iframe
              title="LeanMindset mobile preview"
              src={iframeSrc}
              className="h-full w-full border-0 bg-[#080b12]"
              style={{ height: IPHONE_15.height - (statusBar ? IPHONE_15.statusBarHeight : 0) - (footer ? 58 : 0) }}
            />
          ) : (
            <div className="lm-hide-scrollbar h-full overflow-y-auto overflow-x-hidden px-4">{children}</div>
          )}
        </div>

        {footer ? (
          <div className="shrink-0" style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
