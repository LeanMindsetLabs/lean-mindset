"use client";

import { usePathname } from "next/navigation";
import { BottomNavShell, pathnameToNavTab } from "@/components/nav/BottomNavShell";

export function BottomNav({ wide = false }: { wide?: boolean }) {
  const pathname = usePathname();
  const active = pathnameToNavTab(pathname);

  return (
    <div
      className={`fixed bottom-0 left-1/2 z-50 w-full -translate-x-1/2 ${
        wide ? "max-w-[720px] md:max-w-3xl" : "max-w-[430px] md:max-w-lg"
      }`}
    >
      <BottomNavShell active={active} interactive />
    </div>
  );
}
