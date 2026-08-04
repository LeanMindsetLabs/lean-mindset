"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LeanMindsetNavAppIcon } from "@/components/brand/LeanMindsetLogo";
import { NAV_TAB_SLOT_H } from "@/components/nav/nav-metrics";
import { useV2Ui } from "./V2UiContext";

export function V2BottomNav() {
  const pathname = usePathname();
  const { openQuickAdd } = useV2Ui();
  const activeKey = (() => {
    if (pathname.startsWith("/v2/meals")) return "meals";
    if (pathname.startsWith("/v2/train")) return "train";
    if (pathname.startsWith("/v2/profile")) return "profile";
    return "home";
  })();

  return (
    <nav className="bottom-nav" aria-label="V2 main">
      <Link
        href="/v2/home"
        className={`nav-item nav-item-home${activeKey === "home" ? " active" : ""}`}
        aria-label="Home"
        aria-current={activeKey === "home" ? "page" : undefined}
      >
        <span className="nav-slot nav-slot-home">
          <LeanMindsetNavAppIcon
            height={NAV_TAB_SLOT_H}
            fontRatio={0.58}
            active={activeKey === "home"}
          />
        </span>
      </Link>

      <Link
        href="/v2/meals"
        className={`nav-item${activeKey === "meals" ? " active" : ""}`}
        aria-current={activeKey === "meals" ? "page" : undefined}
      >
        <span className="nav-slot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 2v20M6 2c0 4-3 4-3 8s3 4 3 8M18 2v20M14 2h4v8a4 4 0 0 1-4 4" />
          </svg>
          <span>Meals</span>
        </span>
      </Link>

      <span className="nav-fab-spacer" aria-hidden />

      <button type="button" className="fab" aria-label="Quick add" onClick={openQuickAdd}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <Link
        href="/v2/train"
        className={`nav-item${activeKey === "train" ? " active" : ""}`}
        aria-current={activeKey === "train" ? "page" : undefined}
      >
        <span className="nav-slot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 7v10M18 7v10M2 10v4M22 10v4M6 12h12" />
          </svg>
          <span>Train</span>
        </span>
      </Link>

      <Link
        href="/v2/profile"
        className={`nav-item${activeKey === "profile" ? " active" : ""}`}
        aria-current={activeKey === "profile" ? "page" : undefined}
      >
        <span className="nav-slot">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
          <span>Profile</span>
        </span>
      </Link>
    </nav>
  );
}
