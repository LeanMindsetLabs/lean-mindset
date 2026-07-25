import Link from "next/link";

export default function AddPage() {
  return (
    <div className="flex min-h-[60dvh] flex-col justify-center gap-3 pt-8">
      <h1 className="text-2xl font-bold">Quick add</h1>
      <p className="text-sm text-foreground-muted">
        Log meal, weight, or check-in.
      </p>
      <div className="mt-2 grid gap-2">
        <button
          type="button"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-4 py-3 text-left text-sm font-medium text-foreground-muted"
          disabled
        >
          Log meal (soon)
        </button>
        <button
          type="button"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-4 py-3 text-left text-sm font-medium text-foreground-muted"
          disabled
        >
          Log weight (soon)
        </button>
        <Link
          href="/check-in"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-4 py-3 text-left text-sm font-medium transition hover:border-accent"
        >
          Daily check-in →
        </Link>
      </div>
    </div>
  );
}
