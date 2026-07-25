import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-4 py-8 md:max-w-lg">
      <Link href="/" className="mb-8 text-sm font-semibold text-accent">
        ← Lean Mindset
      </Link>
      {children}
    </div>
  );
}
