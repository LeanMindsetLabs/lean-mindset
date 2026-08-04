/**
 * App Store screenshots — Lean Mindset V2 only.
 * Sizes: 1284×2778 and 1242×2688 (logical CSS viewport × deviceScaleFactor 3).
 *
 * Usage:
 *   node scripts/capture-app-store-screenshots.mjs
 *   PREVIEW_BASE=http://localhost:3000 node scripts/capture-app-store-screenshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = process.env.PREVIEW_BASE ?? "https://www.leanmindset.app";

const SCREENS = [
  { file: "01-home", path: "/v2/home" },
  { file: "02-meals", path: "/v2/meals" },
  { file: "03-train", path: "/v2/train" },
  { file: "04-check-in", path: "/v2/check-in" },
  { file: "05-profile", path: "/v2/profile" },
];

/** Apple 6.5–6.7" portrait targets via @3x CSS viewports */
const SIZES = [
  {
    folder: "1284x2778",
    width: 428,
    height: 926,
    dpr: 3,
    expectW: 1284,
    expectH: 2778,
  },
  {
    folder: "1242x2688",
    width: 414,
    height: 896,
    dpr: 3,
    expectW: 1242,
    expectH: 2688,
  },
];

async function assertDimensions(filePath, expectW, expectH) {
  try {
    const require = createRequire(import.meta.url);
    const { PNG } = require("pngjs");
    const fs = require("node:fs");
    const buf = fs.readFileSync(filePath);
    const png = PNG.sync.read(buf);
    if (png.width !== expectW || png.height !== expectH) {
      throw new Error(
        `${path.basename(filePath)} is ${png.width}×${png.height}, expected ${expectW}×${expectH}`,
      );
    }
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      // pngjs optional — Playwright viewport math should be exact
      return;
    }
    throw err;
  }
}

async function captureAtSize(browser, size) {
  const outDir = path.join(ROOT, "store-assets", "screenshots", size.folder);
  await mkdir(outDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: size.dpr,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const page = await context.newPage();

  const paths = [];
  for (const screen of SCREENS) {
    const outFile = path.join(outDir, `${screen.file}.png`);
    process.stdout.write(`  ${size.folder}/${screen.file}… `);
    await page.goto(`${BASE}${screen.path}`, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    await page.waitForSelector(".lm-v2", { timeout: 15_000 });
    // Brief settle for fonts/gradients — avoid networkidle (can hang on analytics)
    await page.waitForTimeout(500);
    await page.screenshot({
      path: outFile,
      fullPage: false,
      type: "png",
    });
    await assertDimensions(outFile, size.expectW, size.expectH);
    console.log("ok");
    paths.push(outFile);
  }

  await context.close();
  return paths;
}

async function main() {
  console.log(`Base: ${BASE}`);
  console.log(`Screens: ${SCREENS.map((s) => s.path).join(", ")}\n`);

  const browser = await chromium.launch({ headless: true });
  const all = [];
  try {
    for (const size of SIZES) {
      console.log(`Capturing ${size.folder} (${size.width}×${size.height} @${size.dpr}x)…`);
      const paths = await captureAtSize(browser, size);
      all.push(...paths);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone — ${all.length} files`);
  for (const p of all) console.log(`  ${p}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
