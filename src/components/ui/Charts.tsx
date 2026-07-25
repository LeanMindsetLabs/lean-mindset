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
              className="lm-bar-rise absolute bottom-0 w-full max-w-[28px] rounded-t-md bg-accent"
              style={{
                height: `${Math.max(8, d.pct)}%`,
                animationDelay: `${i * 0.06}s`,
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
          className="lm-bar-fill h-full rounded-full"
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

/** Area sparkline — weight / score trend */
export function AreaSparkline({
  values,
  width = 280,
  height = 72,
  color = "#ff6b00",
}: {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
}) {
  const pts = values.length ? values : [70, 68, 69, 67, 66, 65, 64];
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const range = Math.max(max - min, 1);
  const pad = 4;
  const coords = pts.map((v, i) => {
    const x = pad + (i / Math.max(pts.length - 1, 1)) * (width - pad * 2);
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return { x, y };
  });
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const area = `${line} L${coords[coords.length - 1].x},${height} L${coords[0].x},${height} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="lm-fade-in h-auto w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="lmSparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lmSparkFill)" />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r="4" fill={color} />
      <circle cx={last.x} cy={last.y} r="7" fill={color} opacity="0.25" className="lm-pulse" />
    </svg>
  );
}

/** Semi-circle calorie gauge with macro legend */
export function CalorieGauge({
  current,
  target,
  proteinPct = 40,
  carbsPct = 35,
  fatPct = 25,
}: {
  current: number;
  target: number;
  proteinPct?: number;
  carbsPct?: number;
  fatPct?: number;
}) {
  const size = 160;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = Math.PI * r; // semicircle
  const pct = Math.min(1, current / Math.max(1, target));
  const offset = c - pct * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 28 }}>
        <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`} aria-hidden>
          <path
            d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d={`M ${stroke / 2} ${size / 2} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${size / 2}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="lm-ring-draw"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <p className="font-display text-3xl leading-none">{current.toLocaleString()}</p>
          <p className="text-[10px] text-foreground-muted">
            kcal · target {target.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-3 text-[10px]">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent" /> Protein {proteinPct}%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#3b82f6]" /> Carbs {carbsPct}%
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-[#fbbf24]" /> Fat {fatPct}%
        </span>
      </div>
    </div>
  );
}

/** Radar / spider score — Sandow-style breakdown */
export function RadarScore({
  axes,
  size = 200,
}: {
  axes: { label: string; value: number }[];
  size?: number;
}) {
  const n = axes.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.36;

  function point(i: number, value: number) {
    const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const r = (Math.min(100, Math.max(0, value)) / 100) * maxR;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  }

  const levels = [0.25, 0.5, 0.75, 1];
  const grid = levels.map((lvl) =>
    Array.from({ length: n }, (_, i) => {
      const p = point(i, lvl * 100);
      return `${p.x},${p.y}`;
    }).join(" "),
  );
  const poly = axes
    .map((a, i) => {
      const p = point(i, a.value);
      return `${p.x},${p.y}`;
    })
    .join(" ");
  const goal = axes
    .map((_, i) => {
      const p = point(i, 85);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="lm-fade-in mx-auto h-auto w-full max-w-[220px]" aria-hidden>
      {grid.map((g, i) => (
        <polygon
          key={i}
          points={g}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      {axes.map((a, i) => {
        const tip = point(i, 100);
        const labelR = maxR + 18;
        const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
        const lx = cx + Math.cos(angle) * labelR;
        const ly = cy + Math.sin(angle) * labelR;
        return (
          <g key={a.label}>
            <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="var(--border)" strokeWidth="1" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--foreground-muted)"
              fontSize="9"
              fontWeight="600"
            >
              {a.label}
            </text>
          </g>
        );
      })}
      <polygon points={goal} fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points={poly} fill="rgba(255,107,0,0.28)" stroke="#ff6b00" strokeWidth="2" />
      {axes.map((a, i) => {
        const p = point(i, a.value);
        return <circle key={a.label} cx={p.x} cy={p.y} r="3.5" fill="#ff6b00" />;
      })}
    </svg>
  );
}

export function MacroGauges({
  macros,
}: {
  macros: { label: string; value: number; max: number; color: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {macros.map((m) => (
        <HorizontalBar
          key={m.label}
          label={m.label}
          value={m.value}
          max={m.max}
          unit="g"
          color={m.color}
        />
      ))}
    </div>
  );
}
