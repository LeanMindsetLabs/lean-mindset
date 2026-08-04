import Link from "next/link";
import { LeanMindsetLogo } from "@/components/brand/LeanMindsetLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[var(--app-max-width)] flex-col px-4 py-8 lm-hide-scrollbar">
      <LeanMindsetLogo variant="lockup" href="/" className="mb-8" />
      {children}
    </div>
  );
}
