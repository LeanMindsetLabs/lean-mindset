export function WeekBars({
  data,
}: {
  data: { day: string; pct: number }[];
}) {
  return (
    <div className="flex h-28 items-end justify-between gap-1.5 px-1">
      {data.map((d, i) => (
        <div key={`${d.day}-${i}`} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="relative flex h-20 w-full items-end justify-center">
            <div
              className="w-full max-w-[28px] rounded-t-md bg-border"
              style={{ height: "100%" }}
            />
            <div
              className="absolute bottom-0 w-full max-w-[28px] rounded-t-md bg-accent transition-all"
              style={{
                height: `${Math.max(8, d.pct)}%`,
                boxShadow: d.pct > 70 ? "0 0 12px rgba(255,107,0,0.35)" : undefined,
              }}
            />
          </div>
          <span className="text-[10px] font-medium text-foreground-subtle">
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HorizontalBar({
  label,
  value,
  max,
  unit = "",
  color = "var(--accent)",
}: {
  label: string;
  value: number;
  max: number;
  unit?: string;
  color?: string;
}) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-foreground-muted">{label}</span>
        <span className="font-semibold">
          {value}
          {unit} / {max}
          {unit}
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function SparkBars({
  values,
  height = 36,
}: {
  values: number[];
  height?: number;
}) {
  if (!values.length) {
    return (
      <div
        className="flex items-end gap-0.5 opacity-40"
        style={{ height }}
        aria-hidden
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 rounded-sm bg-border"
            style={{ height: `${20 + (i % 4) * 15}%` }}
          />
        ))}
      </div>
    );
  }
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);

  return (
    <div className="flex items-end gap-0.5" style={{ height }} aria-hidden>
      {values.map((v, i) => {
        const h = 20 + ((v - min) / range) * 80;
        return (
          <div
            key={i}
            className="w-1.5 rounded-sm bg-accent"
            style={{ height: `${h}%`, opacity: 0.5 + (i / values.length) * 0.5 }}
          />
        );
      })}
    </div>
  );
}
