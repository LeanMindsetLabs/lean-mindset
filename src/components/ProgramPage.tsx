import Link from "next/link";

export function ProgramPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/program" className="text-sm text-accent">
        ← Program hub
      </Link>
      <header>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-foreground-muted">{subtitle}</p>
        )}
      </header>
      {children}
    </div>
  );
}
