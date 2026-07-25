import { BottomNav } from "./BottomNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-frame">
      <main
        className="px-4 pb-[calc(var(--nav-height)+var(--safe-bottom)+16px)] pt-4"
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
