export default function V2TrainPage() {
  const workouts = [
    {
      title: "HIIT Circuit A",
      meta: "25 min · Intermediate",
      cat: "Conditioning",
      kcal: "-280-350 kcal",
      cls: "wk1",
      ai: true,
    },
    {
      title: "Strength Circuit B",
      meta: "35 min · Intermediate",
      cat: "Strength",
      kcal: "-250-320 kcal",
      cls: "wk2",
      ai: true,
    },
    {
      title: "NEAT Day",
      meta: "45-60 min · All levels",
      cat: "Steps",
      kcal: "Depends on steps",
      cls: "wk3",
      ai: false,
    },
    {
      title: "Finisher Core B",
      meta: "10 min · Intermediate",
      cat: "Core finisher",
      kcal: "-50-80 kcal",
      cls: "wk4",
      ai: true,
    },
    {
      title: "Walk + Core A",
      meta: "25-30 min · Beginner",
      cat: "NEAT + midline",
      kcal: "Today",
      cls: "wk5",
      ai: false,
    },
  ];

  return (
    <div className="screen distribute">
      <div className="page-head">
        <div>
          <h1>Train</h1>
          <div className="page-sub">Foundation → acceleration · this lab only</div>
        </div>
      </div>

      <div className="card session-card">
        <div className="eyebrow">Today&apos;s workout session</div>
        <div className="card-title lg">Walk + Core A</div>
        <div className="card-sub">25-30 min · Beginner · NEAT + midline</div>
        <div className="btn-row">
          <button type="button" className="btn-primary">
            Start session
          </button>
          <button type="button" className="btn-outline">
            Mark done
          </button>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Training adherence</h2>
          <span className="tag">6/7 days</span>
        </div>
        <div className="bar-chart">
          {[
            [78, false],
            [88, false],
            [60, false],
            [78, false],
            [28, true],
            [92, false],
            [22, true],
          ].map(([h, off], i) => (
            <div key={i} className={`bar-col${off ? " off" : ""}`}>
              <div className="bar-fill" style={{ height: `${h}%` }} />
              <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Weeks 1-2 · Foundation</h2>
          <span className="tag">✦ AI picks</span>
        </div>
        <div className="hscroll">
          {workouts.map((w) => (
            <div key={w.title} className={`workout-card ${w.cls}`}>
              <span className="badge-ai" style={w.ai ? undefined : { visibility: "hidden" }}>
                ✦ AI suggested
              </span>
              <div>
                <div className="workout-title">{w.title}</div>
                <div className="workout-meta">{w.meta}</div>
              </div>
              <div className="workout-foot">
                <span className="cat">{w.cat}</span>
                <span className="kcal">{w.kcal}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
