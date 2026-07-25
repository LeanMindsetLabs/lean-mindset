type Props = {
  weights: number[];
  className?: string;
  /** Accessible label */
  label?: string;
};

/** Minimal SVG sparkline — no chart library. */
export function WeightSparkline({
  weights,
  className = "",
  label = "Weight trend",
}: Props) {
  if (weights.length < 2) {
    return (
      <p className={`text-xs text-foreground-subtle ${className}`}>
        {weights.length === 1
          ? `Weight: ${weights[0]} lb (need 2+ check-ins for trend)`
          : "No parsed weights yet"}
      </p>
    );
  }

  const w = 160;
  const h = 36;
  const pad = 2;
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const span = max - min || 1;

  const points = weights
    .map((v, i) => {
      const x = pad + (i / (weights.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (v - min) / span) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const first = weights[0];
  const last = weights[weights.length - 1];
  const delta = last - first;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={label}
        className="shrink-0 overflow-visible"
      >
        <polyline
          fill="none"
          stroke="var(--color-accent, #f97316)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
      <div className="min-w-0 text-xs text-foreground-muted">
        <p className="font-semibold text-foreground">
          {last.toFixed(1)} lb
        </p>
        <p>
          {delta === 0
            ? "±0"
            : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}`}{" "}
          vs first · {weights.length} pts
        </p>
      </div>
    </div>
  );
}
