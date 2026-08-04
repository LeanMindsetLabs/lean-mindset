/**
 * Ensure Lean Mindset iOS Identifier + App via App Store Connect API.
 *
 * Required env (from web/.env.local or process env):
 *   APP_STORE_CONNECT_ISSUER_ID
 *   APP_STORE_CONNECT_API_KEY_ID
 *   APP_STORE_CONNECT_API_KEY_PATH  (path to AuthKey_XXXX.p8)
 *   — or — APP_STORE_CONNECT_PRIVATE_KEY (PEM contents; prefer path)
 *
 * Usage (from web/):
 *   node scripts/asc-create-lean-mindset.mjs
 *
 * Never commit .p8 files or paste Apple ID passwords into git/docs.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BUNDLE_ID = "app.leanmindset.labs";
const APP_NAME = "Lean Mindset";
const SKU = "leanmindset-ios";
const PRIMARY_LOCALE = "en-US";
const ASC_BASE = "https://api.appstoreconnect.apple.com";

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function createAscJwt({ issuerId, keyId, privateKeyPem }) {
  const header = { alg: "ES256", kid: keyId, typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: issuerId,
    iat: now,
    exp: now + 20 * 60,
    aud: "appstoreconnect-v1",
  };
  const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
  const key = crypto.createPrivateKey(privateKeyPem);
  const sig = crypto.sign("SHA256", Buffer.from(signingInput), {
    key,
    dsaEncoding: "ieee-p1363",
  });
  return `${signingInput}.${b64url(sig)}`;
}

function resolvePrivateKey() {
  const inline = process.env.APP_STORE_CONNECT_PRIVATE_KEY;
  if (inline?.includes("BEGIN PRIVATE KEY")) {
    return inline.replace(/\\n/g, "\n");
  }
  const keyPath = process.env.APP_STORE_CONNECT_API_KEY_PATH;
  if (!keyPath) {
    throw new Error(
      "Set APP_STORE_CONNECT_API_KEY_PATH to your AuthKey_*.p8 file (or APP_STORE_CONNECT_PRIVATE_KEY).",
    );
  }
  const resolved = path.isAbsolute(keyPath)
    ? keyPath
    : path.resolve(ROOT, keyPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`API key file not found: ${resolved}`);
  }
  return fs.readFileSync(resolved, "utf8");
}

async function asc(token, method, apiPath, body) {
  const res = await fetch(`${ASC_BASE}${apiPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

function printErrors(label, json) {
  const errs = json?.errors;
  if (!Array.isArray(errs) || !errs.length) {
    console.error(`${label}: HTTP error`, JSON.stringify(json, null, 2));
    return;
  }
  for (const e of errs) {
    console.error(
      `${label}: [${e.status}] ${e.code || ""} — ${e.title || ""} ${e.detail || ""}`.trim(),
    );
  }
}

async function ensureBundleId(token) {
  const filter = encodeURIComponent(BUNDLE_ID);
  const listed = await asc(
    token,
    "GET",
    `/v1/bundleIds?filter[identifier]=${filter}&limit=10`,
  );
  if (!listed.ok) {
    printErrors("List bundleIds", listed.json);
    throw new Error("Failed to list bundle IDs");
  }
  const existing = listed.json?.data?.[0];
  if (existing) {
    console.log(`Bundle ID exists: ${BUNDLE_ID} (id=${existing.id})`);
    return existing;
  }

  console.log(`Creating bundle ID ${BUNDLE_ID}…`);
  const created = await asc(token, "POST", "/v1/bundleIds", {
    data: {
      type: "bundleIds",
      attributes: {
        identifier: BUNDLE_ID,
        name: APP_NAME,
        platform: "IOS",
      },
    },
  });
  if (!created.ok) {
    printErrors("Create bundleId", created.json);
    throw new Error("Failed to create bundle ID");
  }
  const row = created.json.data;
  console.log(`Bundle ID created: ${BUNDLE_ID} (id=${row.id})`);
  return row;
}

async function findApp(token) {
  const filter = encodeURIComponent(BUNDLE_ID);
  const listed = await asc(
    token,
    "GET",
    `/v1/apps?filter[bundleId]=${filter}&limit=10`,
  );
  if (!listed.ok) {
    printErrors("List apps", listed.json);
    throw new Error("Failed to list apps");
  }
  return listed.json?.data?.[0] ?? null;
}

async function tryCreateApp(token, bundleIdResourceId) {
  // Official create shape (may be forbidden for some keys/accounts).
  const attempts = [
    {
      label: "POST /v1/apps (attributes.bundleId string)",
      body: {
        data: {
          type: "apps",
          attributes: {
            name: APP_NAME,
            primaryLocale: PRIMARY_LOCALE,
            sku: SKU,
            bundleId: BUNDLE_ID,
          },
        },
      },
    },
    {
      label: "POST /v1/apps (relationships.bundleId)",
      body: {
        data: {
          type: "apps",
          attributes: {
            name: APP_NAME,
            primaryLocale: PRIMARY_LOCALE,
            sku: SKU,
          },
          relationships: {
            bundleId: {
              data: { type: "bundleIds", id: bundleIdResourceId },
            },
          },
        },
      },
    },
  ];

  for (const attempt of attempts) {
    console.log(`Trying ${attempt.label}…`);
    const res = await asc(token, "POST", "/v1/apps", attempt.body);
    if (res.ok) {
      return { ok: true, app: res.json.data };
    }
    printErrors(attempt.label, res.json);
    const code = res.json?.errors?.[0]?.code;
    if (code === "ENTITY_ERROR.ATTRIBUTE.INVALID.DUPLICATE") {
      return { ok: false, duplicate: true };
    }
    if (res.status === 403 || code === "FORBIDDEN_ERROR") {
      return { ok: false, forbidden: true, json: res.json };
    }
  }
  return { ok: false };
}

function appUrl(appId) {
  return `https://appstoreconnect.apple.com/apps/${appId}`;
}

async function main() {
  loadEnvLocal();

  const issuerId = process.env.APP_STORE_CONNECT_ISSUER_ID;
  const keyId = process.env.APP_STORE_CONNECT_API_KEY_ID;
  if (!issuerId || !keyId) {
    console.error(
      "Missing APP_STORE_CONNECT_ISSUER_ID and/or APP_STORE_CONNECT_API_KEY_ID.",
    );
    console.error(
      "See web/docs/IOS_TESTFLIGHT.md → “ASC API key (create Identifier + App)”.",
    );
    process.exit(1);
  }

  const privateKeyPem = resolvePrivateKey();
  const token = createAscJwt({ issuerId, keyId, privateKeyPem });

  console.log(`Target: ${APP_NAME} / ${BUNDLE_ID} / SKU ${SKU}`);

  const bundle = await ensureBundleId(token);
  let app = await findApp(token);

  if (app) {
    console.log(`App already exists: ${app.attributes?.name} (id=${app.id})`);
    console.log(`SKU: ${app.attributes?.sku ?? "(unknown)"}`);
    console.log(`URL: ${appUrl(app.id)}`);
    return;
  }

  console.log("App not found — attempting create via ASC API…");
  const created = await tryCreateApp(token, bundle.id);

  if (created.ok) {
    app = created.app;
    console.log(`App created: ${APP_NAME} (id=${app.id})`);
    console.log(`URL: ${appUrl(app.id)}`);
    return;
  }

  app = await findApp(token);
  if (app) {
    console.log(`App found after create attempt (id=${app.id})`);
    console.log(`URL: ${appUrl(app.id)}`);
    return;
  }

  if (created.forbidden) {
    console.error("");
    console.error(
      "ASC API refused app CREATE (Apple often allows GET/UPDATE only on /v1/apps).",
    );
    console.error(
      "Bundle ID is ready. Create the app once in App Store Connect UI:",
    );
    console.error("  My Apps → + → New App");
    console.error(`  Name: ${APP_NAME}`);
    console.error(`  Bundle ID: ${BUNDLE_ID}`);
    console.error(`  SKU: ${SKU}`);
    console.error(`  Primary language: English (U.S.)`);
    console.error(
      "Then re-run this script to print the app id / URL.",
    );
    process.exit(2);
  }

  console.error("Could not create or find the app. Check key role (Admin) and team.");
  process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
