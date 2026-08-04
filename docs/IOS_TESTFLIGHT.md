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

## Path A - Codemagic (recommended from Windows)

1. Create app in [App Store Connect](https://appstoreconnect.apple.com) → **My Apps** → **+**  
   - Name: Lean Mindset  
   - Bundle ID: `app.leanmindset.labs` (register in Certificates, Identifiers & Profiles first)  
   - SKU: `leanmindset-ios`
2. Create an **App Store Connect API key** (Users and Access → Keys) with Access to Certificates/Profiles.  
   Download `.p8` once. Store only in Codemagic / password manager - not in this repo.
3. In [Codemagic](https://codemagic.io): add `LeanMindsetLabs/lean-mindset`, point workflow file to `web/codemagic.yaml`, attach ASC integration named `VeriXLabs`.
4. Set signing: automatic App Store distribution for `app.leanmindset.labs`.
5. Run **Lean Mindset · TestFlight**. Add yourself + friends to a TestFlight group named **Friends** (or edit `beta_groups` in yaml).

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
