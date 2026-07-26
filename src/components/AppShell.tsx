"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");

  return (
    <div className={isBlog ? "app-frame app-frame--wide" : "app-frame"}>
      <div
        className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255,107,0,0.08), transparent 60%)",
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
