export default function AddPage() {
  return (
    <div className="flex min-h-[60dvh] flex-col justify-center gap-3 pt-8">
      <h1 className="text-2xl font-bold">Quick add</h1>
      <p className="text-sm text-foreground-muted">
        Log meal, weight, or check-in. Stub for now.
      </p>
      <div className="mt-2 grid gap-2">
        {["Log meal", "Log weight", "Daily check-in"].map((label) => (
          <button
            key={label}
            type="button"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-4 py-3 text-left text-sm font-medium transition hover:border-accent"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
