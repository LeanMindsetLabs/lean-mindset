import Link from "next/link";

export default function V2ProfilePage() {
  return (
    <div className="screen">
      <div className="profile-header">
        <div className="avatar-lg">
          M<span className="dot-online" />
        </div>
        <div>
          <div className="profile-name">Mani A</div>
          <div className="profile-email">mani.dev.beta@gmail.com</div>
        </div>
      </div>

      <Link href="/v2/program" className="card score-hero">
        <div className="ring lg" style={{ ["--pct" as string]: 65 }}>
          <span>65</span>
        </div>
        <div className="score-body">
          <div className="card-title">Lean Mindset Score</div>
          <div className="card-sub">Day 12/42 · 4-day streak</div>
        </div>
        <span className="chevron-w">›</span>
      </Link>

      <div className="card weight-card">
        <div className="weight-head">
          <span className="eyebrow muted">Weight</span>
          <span className="tag">Mock until logged</span>
        </div>
        <div className="weight-value">
          178.4 <small>lb</small>
        </div>
        <div className="sparkline">
          {[30, 45, 38, 55, 50, 70, 85, 100].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="progress-row">
          <span>Lab progress</span>
          <span>12 / 42</span>
        </div>
        <div className="progress-bar">
          <div style={{ width: "28%" }} />
        </div>
      </div>

      <div className="quick-stats">
        <div className="qstat">
          <b>4</b>
          <span>Day streak</span>
        </div>
        <div className="qstat">
          <b>92%</b>
          <span>Adherence</span>
        </div>
        <div className="qstat">
          <b>−1.6lb</b>
          <span>This week</span>
        </div>
      </div>

      <div className="card activity-card" style={{ flex: 1 }}>
        <div className="activity-top">
          <div>
            <div className="activity-title" style={{ fontSize: 13.5 }}>
              This week&apos;s check-ins
            </div>
            <div className="activity-sub">5 of 7 days logged</div>
          </div>
          <span className="tag">71%</span>
        </div>
        <div className="week-dots" style={{ paddingTop: 0, borderTop: "none" }}>
          <Dot done label="M" />
          <Dot done label="T" />
          <Dot done label="W" />
          <Dot done label="T" />
          <Dot today label="F" />
          <Dot label="S" />
          <Dot label="S" />
        </div>
      </div>

      <div className="row-2col">
        <Link href="/v2/program" className="btn-outline">
          → Program
        </Link>
        <Link href="/v2/check-in" className="btn-outline">
          Check-in →
        </Link>
      </div>
      <button type="button" className="btn-outline full danger">
        Log out
      </button>
    </div>
  );
}

function Dot({ done, today, label }: { done?: boolean; today?: boolean; label: string }) {
  return (
    <div className="week-dot-col">
      <div className={`week-dot${done ? " done" : ""}${today ? " today" : ""}`}>
        {done ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M4 12l5 5L20 6" />
          </svg>
        ) : null}
      </div>
      <span>{label}</span>
    </div>
  );
}
