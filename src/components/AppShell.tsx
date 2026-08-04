"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";

const GRADIENT_ROUTES = ["/home", "/nutrition", "/check-in", "/train", "/program", "/profile"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const useHomeGradient = GRADIENT_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );

  return (
    <div
      className={isBlog ? "app-frame app-frame--wide" : "app-frame lm-hide-scrollbar"}
      style={
        useHomeGradient
          ? {
              background:
                "linear-gradient(180deg, #1e4d9b 0%, #183868 12%, #101c33 28%, #0a0f18 48%, #06080d 100%)",
            }
          : undefined
      }
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
        style={{
          background: useHomeGradient
            ? undefined
            : "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(var(--accent-rgb), 0.08), transparent 60%)",
        }}
        aria-hidden
      />
      <main className="px-4 pb-[calc(var(--nav-height)+var(--safe-bottom)+16px)] pt-4">
        {children}
      </main>
      <BottomNav wide={isBlog} />
    </div>
  );
}
