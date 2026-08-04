import Link from "next/link";

export default function V2HomePage() {
  return (
    <div className="screen">
      <div className="home-top">
        <div>
          <div className="home-date">
            Mon, Aug 3{" "}
            <span className="streak-chip">
              <span className="streak-fire" aria-hidden>
                🔥
              </span>
              <span className="streak-count">4</span>
            </span>
          </div>
          <div className="greeting">Hello, Mani!</div>
        </div>
        <div className="home-actions">
          <button type="button" className="icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <Link href="/v2/profile" className="avatar-btn">
            M<span className="dot" />
          </Link>
        </div>
      </div>

      <Link href="/v2/program" className="hero-card">
        <div className="hero-days">
          <span className="num">30</span>
          <span className="lbl">DAYS LEFT</span>
        </div>
        <div className="hero-body">
          <div className="hero-eyebrow">YOU&apos;RE IN · LEAN MINDSET 6-WEEK LAB</div>
          <div className="hero-title">Day 12 of 42</div>
          <div className="hero-sub">6-week focus · on track</div>
          <div className="hero-meta">
            <span>♥ On track</span>
            <span>·</span>
            <span>Free while we launch</span>
          </div>
        </div>
        <div className="hero-chevron">›</div>
      </Link>

      <section className="section">
        <div className="section-head">
          <h2>Your lab today</h2>
          <Link href="/v2/program" className="link">
            Program →
          </Link>
        </div>
        <div className="tri-grid">
          <Link href="/v2/meals" className="mini-card">
            <span className="mini-num">1</span>
            <span className="mini-title">3 meals left</span>
            <span className="mini-sub">Tap to log</span>
          </Link>
          <Link href="/v2/train" className="mini-card">
            <span className="mini-num">2</span>
            <span className="mini-title">Workout</span>
            <span className="mini-sub">Walk + Core A</span>
          </Link>
          <Link href="/v2/check-in" className="mini-card">
            <span className="mini-num">3</span>
            <span className="mini-title">Check-in</span>
            <span className="mini-sub">Weight · chat</span>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Health metrics</h2>
          <span className="link">See all</span>
        </div>
        <div className="hscroll">
          <div className="stat-card">
            <div className="stat-icon heart">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.3.9-1.6 2.6-2.6 4.6-2.3C18 4.5 19.5 8 22 11.7 19.5 16.4 12 21 12 21z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">
                178.4<small> lb</small>
              </div>
              <div className="stat-label">Weight</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon bmi">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 3v18M7 8h10M8 16h8" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <div>
              <div className="stat-value">26.4</div>
              <div className="stat-label">BMI</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon water">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2s7 7.8 7 12.5A7 7 0 0 1 5 14.5C5 9.8 12 2 12 2z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">
                2.1<small> L</small>
              </div>
              <div className="stat-label">Water</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon sleep">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
              </svg>
            </div>
            <div>
              <div className="stat-value">
                7h10<small>m</small>
              </div>
              <div className="stat-label">Sleep</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section grow">
        <div className="section-head">
          <h2>Activity</h2>
          <span className="link">See all</span>
        </div>
        <div className="activity-card">
          <div className="activity-top">
            <div>
              <div className="activity-title">On track</div>
              <div className="activity-sub">You need 4 more activities this week</div>
            </div>
            <div className="ring md" style={{ ["--pct" as string]: 20 }}>
              <span>1/5</span>
            </div>
          </div>
          <div className="week-dots">
            <WeekDot done label="M" />
            <WeekDot done label="T" />
            <WeekDot today label="W" />
            <WeekDot label="T" />
            <WeekDot label="F" />
            <WeekDot label="S" />
            <WeekDot label="S" />
          </div>
        </div>
      </section>
    </div>
  );
}

function WeekDot({
  done,
  today,
  label,
}: {
  done?: boolean;
  today?: boolean;
  label: string;
}) {
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
