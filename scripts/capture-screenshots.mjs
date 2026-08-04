/**
 * Capture Lean Mindset screens at iPhone 15 size for design review.
 * Usage: node scripts/capture-screenshots.mjs
 * Requires: dev server at http://localhost:3000
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../docs/screenshots/iterations-2026-08-04");
const BASE = process.env.PREVIEW_BASE ?? "http://localhost:3000";

/** Core daily workflow — iPhone frame via preview route */
const FRAMED = [
  { file: "01-onboarding-start", path: "/start" },
  { file: "02-home", path: "/home" },
  { file: "03-meals-nutrition", path: "/nutrition" },
  { file: "04-train", path: "/train" },
  { file: "05-check-in", path: "/check-in" },
  { file: "06-program", path: "/program" },
  { file: "07-profile", path: "/profile" },
];

/** Member app — direct mobile viewport (393×852) */
const MEMBER = [
  { file: "08-home-score", path: "/home/score" },
  { file: "09-train-session-detail", path: "/train/walk-core-a" },
  { file: "10-train-ai", path: "/train/ai" },
  { file: "11-program-grocery", path: "/program/grocery" },
  { file: "12-program-water", path: "/program/water" },
  { file: "13-program-supplements", path: "/program/supplements" },
  { file: "14-program-workouts", path: "/program/workouts" },
  { file: "15-program-eating-schedule", path: "/program/eating-schedule" },
  { file: "16-program-guide", path: "/program/guide" },
  { file: "17-program-trackers", path: "/program/trackers" },
  { file: "18-more-hub", path: "/more" },
  { file: "19-add", path: "/add" },
  { file: "20-labs-list", path: "/labs" },
  { file: "21-lab-detail-summer", path: "/labs/summer-lab" },
  { file: "22-blog-list", path: "/blog" },
  { file: "23-blog-article", path: "/blog/4-meal-precision-system" },
  { file: "24-recipes", path: "/recipes" },
  { file: "25-recipes-ai", path: "/recipes/ai" },
  { file: "26-recipe-detail", path: "/recipes/egg-white-oat-bowl" },
  { file: "27-logs", path: "/logs" },
  { file: "28-logs-workouts", path: "/logs/workouts" },
  { file: "29-logs-running", path: "/logs/running" },
  { file: "30-music", path: "/music" },
  { file: "31-reviews", path: "/reviews" },
  { file: "32-coach", path: "/coach", note: "Requires coach role — may redirect when demo session only" },
];

/** Marketing + auth */
const MARKETING = [
  { file: "33-marketing-landing", path: "/" },
  { file: "34-login", path: "/login" },
  { file: "35-signup", path: "/signup" },
  { file: "36-terms", path: "/terms" },
  { file: "37-privacy", path: "/privacy" },
];

const MOBILE = { width: 393, height: 852 };

const DEMO_COOKIE = "lm-demo-member";
const DEMO_VALUE = JSON.stringify({
  email: "demo@leanmindset.com",
  fullName: "Demo Member",
});

async function seedDemoSession(context) {
  await context.addCookies([
    {
      name: DEMO_COOKIE,
      value: DEMO_VALUE,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
}

async function captureFramed(page, { file, path: routePath }) {
  const url = `${BASE}/preview/frame?path=${encodeURIComponent(routePath)}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(800);
  const frame = page.locator('[aria-label="iPhone 15 preview frame"]');
  await frame.waitFor({ state: "visible", timeout: 15_000 });
  await frame.screenshot({ path: path.join(OUT_DIR, `${file}.png`) });
}

async function captureMobile(page, { file, path: routePath }) {
  await page.setViewportSize(MOBILE);
  await page.goto(`${BASE}${routePath}`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(OUT_DIR, `${file}.png`),
    fullPage: true,
  });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  await seedDemoSession(context);
  const page = await context.newPage();

  console.log(`Saving to ${OUT_DIR}\n`);

  for (const item of FRAMED) {
    process.stdout.write(`Framed ${item.file}… `);
    await captureFramed(page, item);
    console.log("ok");
  }

  for (const item of MEMBER) {
    process.stdout.write(`Mobile ${item.file}… `);
    await captureMobile(page, item);
    console.log("ok");
  }

  for (const item of MARKETING) {
    process.stdout.write(`Marketing ${item.file}… `);
    if (item.path === "/login" || item.path === "/signup") {
      const authContext = await browser.newContext();
      const authPage = await authContext.newPage();
      await captureMobile(authPage, item);
      await authContext.close();
    } else {
      await captureMobile(page, item);
    }
    console.log("ok");
  }

  await browser.close();
  console.log(`\nDone — ${FRAMED.length + MEMBER.length + MARKETING.length} screenshots`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
