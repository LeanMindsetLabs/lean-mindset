"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.ReactNode;
  center?: boolean;
};

/** Phone-first destinations — Nutrition & Train in nav, not buried in scroll */
const tabs: Tab[] = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/nutrition", label: "Meals", icon: MealsIcon },
  { href: "/check-in", label: "Check-in", icon: PlusIcon, center: true },
  { href: "/train", label: "Train", icon: TrainIcon },
  { href: "/more", label: "More", icon: MoreIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-background-elevated/95 backdrop-blur-md md:max-w-lg"
      style={{ paddingBottom: "var(--safe-bottom)" }}
      aria-label="Main"
    >
      <ul className="grid h-[var(--nav-height)] grid-cols-5 items-center px-1">
        {tabs.map((tab) => {
          const active =
            tab.href === "/home"
              ? pathname === "/home"
              : pathname.startsWith(tab.href);

          if (tab.center) {
            return (
              <li key={tab.href} className="flex justify-center">
                <Link
                  href={tab.href}
                  aria-label={tab.label}
                  className="flex h-14 w-14 -translate-y-2 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(255,107,0,0.35)] transition hover:bg-accent-hover"
                >
                  <tab.icon className="h-7 w-7" />
                </Link>
              </li>
            );
          }

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-medium transition ${
                  active
                    ? "text-accent"
                    : "text-foreground-subtle hover:text-foreground-muted"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MealsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function TrainIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 8.5h11M6.5 15.5h11M4 10.5v3M20 10.5v3M8 8.5v7M16 8.5v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 6v12M6 12h12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
