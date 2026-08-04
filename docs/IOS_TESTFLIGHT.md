# iOS / TestFlight - Lean Mindset (V2)

**App:** Lean Mindset  
**Bundle ID:** `app.leanmindset.labs`  
**Loads:** `https://www.leanmindset.app/v2/home` only (V2)  
**Shell:** Capacitor (`web/ios`)

## Apple Developer (shared VeriX Labs team)

| Field | Value |
|-------|--------|
| Apple ID (App Store Connect) | `VeriXLabsai@gmail.com` |
| Team note | Same team as ComeAround; Lean Mindset is a **separate** app record |
| Password | **Never in git / env / chat.** Use Keychain + App Store Connect API key for CI |

If a password was pasted in chat, **rotate it** in Apple ID immediately.

## What this machine (Windows) cannot do

IPA archive + TestFlight upload need **macOS + Xcode**, or **Codemagic**.

## ASC API key (create Identifier + App)

Use the App Store Connect API instead of the browser for Identifier registration and app lookup. **Never** put Apple ID passwords or `.p8` contents in git.

### Required env (`web/.env.local` — gitignored)

| Variable | Purpose |
|----------|---------|
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID from Users and Access → Integrations → App Store Connect API |
| `APP_STORE_CONNECT_API_KEY_ID` | Key ID (e.g. `AB12CD34EF`) |
| `APP_STORE_CONNECT_API_KEY_PATH` | Path to downloaded `AuthKey_*.p8` (prefer relative under `web/`, e.g. `secrets/AuthKey_….p8` — keep `secrets/` gitignored) |

Optional: `APP_STORE_CONNECT_PRIVATE_KEY` = full PEM text (only if you cannot use a path; still never commit).

### Create the API key (4 steps)

1. Open [App Store Connect → Users and Access → Integrations → App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api) (team with Admin).
2. Note the **Issuer ID**, then **Generate API Key** → name e.g. `Lean Mindset ASC` → role **Admin** → Generate.
3. Copy the **Key ID**, download the `.p8` once, save it outside git (e.g. `web/secrets/AuthKey_XXXX.p8`).
4. Paste into `web/.env.local` (placeholders also in `.env.local.example`):

```env
APP_STORE_CONNECT_ISSUER_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
APP_STORE_CONNECT_API_KEY_ID=XXXXXXXXXX
APP_STORE_CONNECT_API_KEY_PATH=secrets/AuthKey_XXXXXXXXXX.p8
```

Then from `web/`:

```bash
npm run asc:create-app
# or: node scripts/asc-create-lean-mindset.mjs
```

The script ensures Identifier `app.leanmindset.labs`, creates or finds app **Lean Mindset** / SKU `leanmindset-ios`, and prints the App Store Connect app id + URL.

**Note:** Apple often forbids `CREATE` on `/v1/apps` (GET/UPDATE only). If the script reports that, create the app once in **My Apps → +** with the same name / bundle / SKU, then re-run to print the id/URL. Bundle ID creation via API still works.

## Path A - Codemagic (recommended from Windows)

1. Ensure Identifier + app exist (run `npm run asc:create-app` after env is set, or create in ASC UI as above).
2. Use the same **App Store Connect API key** in Codemagic (or a dedicated CI key). Download `.p8` once. Store only in Codemagic / password manager — not in this repo.
3. In [Codemagic](https://codemagic.io): add `LeanMindsetLabs/lean-mindset`, point workflow file to `web/codemagic.yaml`, attach ASC integration named **`VeriXLabs`**.
4. In Codemagic → lean-mindset → **App settings → Environment variables**, create group **`ios_credentials`** with secret:
   - `CERTIFICATE_PRIVATE_KEY` = PEM of an RSA private key (generate once; Codemagic creates the Apple Distribution cert from it). Example: `openssl genrsa 2048`. Keep the key in `web/secrets/` (gitignored) — never commit. (Personal-account global vars are read-only; use app-level vars.)
5. Run **Lean Mindset · TestFlight**. Add yourself + friends to a TestFlight group named **Friends** (or edit `beta_groups` in yaml).

Workflow signs via `app-store-connect fetch-signing-files` (creates/fetches App Store profile for `app.leanmindset.labs`), then uploads IPA to TestFlight.

## Path B - Mac + Xcode

```bash
cd web
npm ci
npx cap sync ios
npx cap open ios
```

In Xcode: Team = VeriX Labs / your Apple team → Product → Archive → Distribute → TestFlight.

## Friend testing (until TestFlight builds)

Share: https://www.leanmindset.app/app (Safari → Add to Home Screen) - opens V2.

## Sync after web deploys

Native shell always loads live V2 URL. No App Store resubmit needed for most web UI changes. Resubmit when you change bundle ID, permissions, or Capacitor plugins.

## App Store screenshots

PNG captures for App Store Connect live under `store-assets/screenshots/`:

- `1284x2778/` - iPhone 6.5" (5 screens)
- `1242x2688/` - iPhone 5.5" / alternate 6.5" slot (5 screens)

Regenerate with `node scripts/capture-app-store-screenshots.mjs` (local preview or production URL as configured in the script).
