import Link from "next/link";
import type { ReactNode } from "react";
import { LeanMindsetNavAppIcon } from "@/components/brand/LeanMindsetLogo";
import { NAV_ICON_H, NAV_TAB_SLOT_H } from "@/components/nav/nav-metrics";

export type BottomNavTabId = "home" | "meals" | "checkin" | "train" | "profile";

const PLUS_SIZE_PX = 52;
const NAV_LABEL_CLASS = "text-[10px] leading-none";

export { NAV_TAB_SLOT_H };

const TABS: {
  id: BottomNavTabId;
  label: string;
  href: string;
  icon: (props: { active: boolean }) => ReactNode;
}[] = [
  { id: "home", label: "Home", href: "/home", icon: () => null },
  { id: "meals", label: "Meals", href: "/nutrition", icon: (p) => <MealsNavIcon active={p.active} /> },
  { id: "checkin", label: "Check-in", href: "/check-in", icon: () => null },
  { id: "train", label: "Train", href: "/train", icon: (p) => <TrainNavIcon active={p.active} /> },
  { id: "profile", label: "Profile", href: "/profile", icon: (p) => <ProfileNavIcon active={p.active} /> },
];

type BottomNavShellProps = {
  active: BottomNavTabId;
  interactive?: boolean;
};

/**
 * Bottom nav - Logo lockup · Meals · + · Train · Profile
 * Home tab: app-icon squircle (lm only); top/bottom aligned to icon top + label bottom on other tabs.
 */
export function BottomNavShell({ active, interactive = false }: BottomNavShellProps) {
  return (
    <nav
      className="border-t border-white/[0.08] bg-[#0a0e18]/98 backdrop-blur-xl"
      style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom, 0px))" }}
      aria-label="Main"
    >
      <ul className="grid h-[58px] grid-cols-5 items-end px-1 pb-1.5 pt-2">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const isCenter = tab.id === "checkin";
          const isHome = tab.id === "home";

          if (isCenter) {
            const centerWrap = "flex w-full flex-col items-center";
            const centerInner = (
              <>
                <span className="flex items-end justify-center" style={{ height: NAV_ICON_H }}>
                  <span
                    className="flex items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_0_24px_rgba(59,130,246,0.55)]"
                    style={{
                      width: PLUS_SIZE_PX,
                      height: PLUS_SIZE_PX,
                      marginTop: 10,
                    }}
                  >
                    <PlusNavIcon />
                  </span>
                </span>
                <span className={`mt-1 ${NAV_LABEL_CLASS} h-[10px]`} aria-hidden />
              </>
            );

            return (
              <li key={tab.id} className="flex justify-center px-0.5">
                {interactive ? (
                  <Link href={tab.href} aria-label={tab.label} className={centerWrap}>
                    {centerInner}
                  </Link>
                ) : (
                  <span aria-label={tab.label} className={centerWrap}>
                    {centerInner}
                  </span>
                )}
              </li>
            );
          }

          const tabClass = `flex w-full flex-col items-center transition ${
            isActive ? "text-[#60a5fa]" : "text-[#8b95a8] hover:text-[#a8b2c4]"
          }`;

          const tabInner = isHome ? (
            <div className="flex items-end justify-center" style={{ height: NAV_TAB_SLOT_H }}>
              <LeanMindsetNavAppIcon height={NAV_TAB_SLOT_H} active={isActive} />
            </div>
          ) : (
            <div
              className="flex w-full flex-col items-center justify-between"
              style={{ height: NAV_TAB_SLOT_H }}
            >
              <span className="flex items-start justify-center" style={{ height: NAV_ICON_H }}>
                {tab.icon({ active: isActive })}
              </span>
              <span className={`${NAV_LABEL_CLASS} ${isActive ? "font-semibold" : "font-medium"}`}>
                {tab.label}
              </span>
            </div>
          );

          return (
            <li key={tab.id} className="flex justify-center px-0.5">
              {interactive ? (
                <Link
                  href={tab.href}
                  className={tabClass}
                  aria-label={isHome ? "Home" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tabInner}
                </Link>
              ) : (
                <span
                  className={tabClass}
                  aria-label={isHome ? "Home" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {tabInner}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Steaming cup - Variation 1 Meals icon */
function MealsNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4c0 1.5-.8 2.5-1 3.5M12 4c0 1.5-.8 2.5-1 3.5M16 4c0 1.5-.8 2.5-1 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 10h10v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.12 : 0}
      />
      <path
        d="M17 11h1.5a2 2 0 0 1 0 4H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Crossed dumbbells - Variation 1 Train icon */
function TrainNavIcon({ active }: { active: boolean }) {
  const fill = active ? "currentColor" : "none";
  const fillOpacity = active ? 0.15 : 0;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" fill={fill} fillOpacity={fillOpacity} />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.4" fill={fill} fillOpacity={fillOpacity} />
      <path d="M9.2 9.2l5.6 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4" fill={fill} fillOpacity={fillOpacity} />
      <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.4" fill={fill} fillOpacity={fillOpacity} />
      <path d="M14.8 9.2l-5.6 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ProfileNavIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="8"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.5"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.12 : 0}
      />
      <path
        d="M5.5 19.5c.65-3.1 3-5.5 6.5-5.5s5.85 2.4 6.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusNavIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M11 5v12M5 11h12" stroke="white" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  );
}

export function pathnameToNavTab(pathname: string): BottomNavTabId {
  if (pathname === "/home" || pathname.startsWith("/home/")) return "home";
  if (pathname.startsWith("/nutrition") || pathname.startsWith("/recipes")) return "meals";
  if (pathname.startsWith("/check-in")) return "checkin";
  if (pathname.startsWith("/train") || pathname.startsWith("/music")) return "train";
  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/more") ||
    pathname.startsWith("/program")
  )
    return "profile";
  return "home";
}
