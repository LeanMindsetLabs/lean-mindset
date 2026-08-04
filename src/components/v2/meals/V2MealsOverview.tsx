"use client";

import Link from "next/link";
import { useV2Ui } from "@/components/v2/V2UiContext";

/** Current V2 Meals overview (iteration A). */
export function V2MealsOverview() {
  const { meals, openLogMeal, openGrocery } = useV2Ui();
  const loggedCount = meals.filter((m) => m.logged).length;

  return (
    <div className="screen distribute">
      <div className="page-head meals-overview-head">
        <div>
          <h1>Meals Log</h1>
          <div className="page-sub">Today · your meal plan</div>
        </div>
        <Link href="/v2/program" className="link">
          Lab guide →
        </Link>
      </div>

      <div className="row-2col" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <button type="button" className="cta-outline" style={{ padding: 10 }} onClick={() => openLogMeal()}>
          + Log a meal
        </button>
        <button type="button" className="cta-outline" style={{ padding: 10 }} onClick={openGrocery}>
          Grocery list →
        </button>
      </div>

      <div className="card fuel-card">
        <div className="ring lg" style={{ ["--pct" as string]: 73 }}>
          <span>
            1,600
            <br />
            <small style={{ fontWeight: 600, fontSize: 10, color: "var(--text-dim)" }}>kcal</small>
          </span>
        </div>
        <div className="fuel-details">
          <div className="fuel-target">TARGET 2,200 KCAL</div>
          <div className="fuel-copy">Room left in today&apos;s fuel budget.</div>
          <div className="macro-row">
            <span>Protein</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "56%" }} />
            </div>
            <span>79/140g</span>
          </div>
          <div className="macro-row">
            <span>Fat</span>
            <div className="bar">
              <div className="fill orange" style={{ width: "48%" }} />
            </div>
            <span>31/65g</span>
          </div>
          <div className="macro-row">
            <span>Carbs</span>
            <div className="bar">
              <div className="fill blue" style={{ width: "69%" }} />
            </div>
            <span>125/180g</span>
          </div>
        </div>
      </div>

      <div className="row-2col">
        <div className="card compact">
          <div className="ring sm" style={{ ["--pct" as string]: 40 }}>
            <span>2/5</span>
          </div>
          <div>
            <div className="eyebrow">Next meal</div>
            <div className="card-title">Breakfast</div>
            <div className="card-sub">8:00 AM · Water 66%</div>
          </div>
        </div>
        <div className="card compact">
          <div className="score-pill">84</div>
          <div>
            <div className="eyebrow">Recovery</div>
            <div className="card-title">7h 10m</div>
            <div className="card-sub">Wind-down 22:30</div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Today&apos;s meals</h2>
          <span className="tag">
            {loggedCount}/{meals.length} logged
          </span>
        </div>
        <div className="hscroll">
          {meals.map((m) => (
            <div key={m.id} className={`meal-card${m.logged ? " done" : ""}`}>
              <div className={`meal-check${m.logged ? "" : " pending"}`}>
                {m.logged ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                ) : null}
              </div>
              <div>
                <div className="meal-name">{m.name}</div>
                <div className="meal-desc">{m.desc}</div>
              </div>
              <div className="meal-foot">
                <span className="meal-time">{m.time}</span>
                <button
                  type="button"
                  className={`meal-pill ${m.logged ? "edit" : "log"}`}
                  onClick={() => openLogMeal(m.id)}
                >
                  {m.logged ? "Edit" : "Log"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link href="/v2/check-in" className="cta-outline">
        Send meals in daily check-in →
      </Link>
    </div>
  );
}
