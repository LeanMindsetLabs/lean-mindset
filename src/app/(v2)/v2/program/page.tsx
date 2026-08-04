import Link from "next/link";

const MATERIALS: { title: string; sub: string; span?: boolean }[] = [
  { title: "Program guide", sub: "Phases, rules" },
  { title: "Nutrition day", sub: "Rings · timing" },
  { title: "Eating schedule", sub: "4-meal timing" },
  { title: "Grocery list", sub: "Shopping guide" },
  { title: "Supplements", sub: "Core + optional" },
  { title: "Workout list", sub: "Foundation→HIIT" },
  { title: "Water", sub: "Hydration plan" },
  { title: "Trackers", sub: "Weight · habits" },
  { title: "Recipes", sub: "Plate card grid", span: true },
];

export default function V2ProgramPage() {
  return (
    <div className="screen distribute">
      <div className="page-head page-head-flex">
        <Link href="/v2/profile" className="back-btn" aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 16.5, lineHeight: 1.2 }}>Lean Mindset 6-Week Lab</h1>
          <div className="page-sub">Your lab materials</div>
        </div>
        <Link href="/v2/home" className="link">
          Home →
        </Link>
      </div>

      <div className="card program-hero">
        <span className="eyebrow">Active structure</span>
        <div className="program-weeks">
          6 <small>weeks</small>
        </div>
        <div className="card-sub">4 meals/day · 3.5L water target</div>
      </div>

      <div className="quick-row">
        <Link href="/v2/meals" className="quick-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2v20M6 2c0 4-3 4-3 8s3 4 3 8M18 2v20M14 2h4v8a4 4 0 0 1-4 4" />
          </svg>
          <span>Meals</span>
        </Link>
        <Link href="/v2/train" className="quick-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7v10M18 7v10M2 10v4M22 10v4M6 12h12" />
          </svg>
          <span>Train</span>
        </Link>
        <Link href="/v2/check-in" className="quick-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1 0 10 10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>Check-in</span>
        </Link>
        <Link href="/v2/profile" className="quick-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
          </svg>
          <span>Profile</span>
        </Link>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Lab materials</h2>
        </div>
        <div className="materials-grid" style={{ height: "auto" }}>
          {MATERIALS.map((m) => (
            <button
              key={m.title}
              type="button"
              className="mat-tile"
              style={m.span ? { gridColumn: "span 2" } : undefined}
            >
              <div>
                <div className="mat-tile-title">{m.title}</div>
                <div className="mat-tile-sub">{m.sub}</div>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
