"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useV2Ui } from "@/components/v2/V2UiContext";
import { V2CheckInSelect } from "@/components/v2/meals/V2CheckInSelect";

/** Mock prior / start weights for auto calcs (until wired to live data). */
const YESTERDAY_LB = 178.9;
const START_LB = 191.4;

const MOODS = ["Rough", "Ok", "Good", "Great"] as const;
const SLEEP_QUALITY = ["Poor", "Fair", "Good", "Great"] as const;

export default function V2CheckInPage() {
  const { meals } = useV2Ui();

  const [weightText, setWeightText] = useState("178.4");
  const [mood, setMood] = useState<(typeof MOODS)[number]>("Ok");
  const [waterL, setWaterL] = useState("3");
  const [sleepHrs, setSleepHrs] = useState("7");
  const [sleepQuality, setSleepQuality] = useState<(typeof SLEEP_QUALITY)[number]>("Good");
  const [bm, setBm] = useState("1");
  const [exerciseHrs, setExerciseHrs] = useState("1");
  const [notes, setNotes] = useState("");

  const weight = useMemo(() => {
    const n = Number.parseFloat(weightText);
    return Number.isFinite(n) ? n : null;
  }, [weightText]);

  const changeToday = weight == null ? null : +(weight - YESTERDAY_LB).toFixed(1);
  const lostTotal = weight == null ? null : +(START_LB - weight).toFixed(1);

  const foodLog = useMemo(
    () =>
      meals.map((m) => ({
        meal: m.name,
        time: m.time,
        items: m.logged
          ? (m.itemsSummary ?? "Logged · open Meals Log to edit")
          : "Not logged yet",
        logged: m.logged,
      })),
    [meals],
  );

  return (
    <div className="screen checkin-screen checkin-fixed">
      <div className="page-head page-head-flex">
        <Link href="/v2/home" className="back-btn" aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 style={{ fontSize: 19 }}>Daily check-in</h1>
          <div className="page-sub">Summer Lab</div>
        </div>
      </div>

      <section className="card checkin-field checkin-started">
        <div className="sheet-label">
          <span className="eyebrow muted">Started</span>
          <span className="checkin-day-inline">Day 12th of 42 · Mon, Aug 3</span>
        </div>

        <label className="checkin-input-label checkin-input-label-row">
          <span>
            Weight <span className="checkin-muted">(enter today)</span>
          </span>
          <div className="checkin-weight-box">
            <input
              type="number"
              inputMode="decimal"
              step={0.1}
              min={50}
              max={500}
              value={weightText}
              onChange={(e) => setWeightText(e.target.value)}
              aria-label="Today's weight in pounds"
            />
            <span>lb</span>
          </div>
        </label>

        <div className="checkin-kv checkin-kv-compact checkin-kv-inline">
          <div className="checkin-kv-row">
            <span>Yesterday</span>
            <b className="checkin-calc">{YESTERDAY_LB.toFixed(1)} lb</b>
          </div>
          <div className="checkin-kv-row">
            <span>Change</span>
            <b
              className={
                changeToday == null
                  ? "checkin-calc"
                  : changeToday < 0
                    ? "checkin-down"
                    : changeToday > 0
                      ? "checkin-up"
                      : "checkin-calc"
              }
            >
              {changeToday == null
                ? "-"
                : `${changeToday > 0 ? "+" : ""}${changeToday.toFixed(1)} lb`}
            </b>
          </div>
          <div className="checkin-kv-row">
            <span>Total Lost</span>
            <b className="checkin-calc">
              {lostTotal == null ? "-" : `${lostTotal.toFixed(1)} lb`}
            </b>
          </div>
        </div>
      </section>

      <section className="card checkin-field checkin-metrics-card">
        <span className="eyebrow muted">Today</span>
        <div className="checkin-dd-grid">
          <div className="checkin-dd-row checkin-dd-row-4">
            <V2CheckInSelect
              label="Mood"
              value={mood}
              onChange={(v) => setMood(v as (typeof MOODS)[number])}
              options={MOODS.map((m) => ({ value: m, label: m }))}
            />
            <V2CheckInSelect
              label="Water"
              value={waterL}
              onChange={setWaterL}
              options={["1", "1.5", "2", "2.5", "3", "3.5", "4"].map((v) => ({
                value: v,
                label: `${v} L`,
              }))}
            />
            <V2CheckInSelect
              label="BM"
              value={bm}
              onChange={setBm}
              title="Bowel movement"
              options={["0", "1", "2", "3", "4"].map((v) => ({ value: v, label: `${v}×` }))}
            />
            <V2CheckInSelect
              label="Exercise"
              value={exerciseHrs}
              onChange={setExerciseHrs}
              options={["0", "0.5", "1", "1.5", "2"].map((v) => ({
                value: v,
                label: `${v} hr`,
              }))}
            />
          </div>

          <div className="checkin-dd-row checkin-dd-row-2">
            <V2CheckInSelect
              label="Sleep · hours"
              value={sleepHrs}
              onChange={setSleepHrs}
              options={["5", "6", "6.5", "7", "7.5", "8", "9"].map((h) => ({
                value: h,
                label: `${h} hrs`,
              }))}
            />
            <V2CheckInSelect
              label="Sleep · quality"
              value={sleepQuality}
              onChange={(v) => setSleepQuality(v as (typeof SLEEP_QUALITY)[number])}
              options={SLEEP_QUALITY.map((q) => ({ value: q, label: q }))}
            />
          </div>
        </div>
      </section>

      <section className="card checkin-field checkin-food-card">
        <div className="sheet-label">
          <span className="eyebrow muted">Food log</span>
          <Link href="/v2/meals" className="link" style={{ fontSize: 11 }}>
            Meals Log →
          </Link>
        </div>
        <div className="checkin-food-list">
          {foodLog.map((row) => (
            <div key={`${row.meal}-${row.time}`} className="checkin-food-row">
              <span className="checkin-food-meal">{row.meal}</span>
              <span className={`checkin-food-items${row.logged ? "" : " checkin-food-empty"}`}>
                {row.items}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="card checkin-field checkin-notes-card">
        <span className="eyebrow muted">Notes</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes for your coach..."
          rows={1}
        />
      </section>

      <button type="button" className="btn-primary full checkin-send">
        Send check-in
      </button>
    </div>
  );
}
