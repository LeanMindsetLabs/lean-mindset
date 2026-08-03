# Lean Mindset — project accounts (this repo only)

Use these **only** for the Lean Mindset Lab app (`web/`). Do not reuse on other products or repos.

## Services

| Service | Target |
|---------|--------|
| GitHub remote | `https://github.com/LeanMindsetLabs/lean-mindset.git` |
| Vercel production | `https://leanmindset.vercel.app` |
| Vercel team / project | `lean-mindset-labs` / `leanmindset` |
| Supabase project ref | `fdsccpcapzgzyxnuweit` |
| Owner email | `LeanMindsetLabs@gmail.com` |

## Local env (`web/.env.local`, gitignored)

Required:

- `NEXT_PUBLIC_SUPABASE_URL=https://fdsccpcapzgzyxnuweit.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase → Settings → API

Recommended:

- `COACH_EMAILS=LeanMindsetLabs@gmail.com`

Optional (server/admin only, never expose to client):

- `SUPABASE_SERVICE_ROLE_KEY`

See `.env.local.example` for a template.

## Auth notes

- **GitHub / Vercel / Supabase dashboards:** sign in with Google as `LeanMindsetLabs@gmail.com` (SSO).
- **Member login password:** set in Supabase → Authentication → Users — not in env files or git.
- **Git CLI on shared machines:** run `web/scripts/push-lean-mindset.ps1` so only this push uses the LeanMindsetLabs GitHub account.

## One-time GitHub setup (add second account without removing others)

```powershell
gh auth login
# GitHub.com → HTTPS → Login with browser → LeanMindsetLabs Google account
gh auth status   # should list LeanMindsetLabs among accounts
```

Then from `web/`:

```powershell
gh api user -q .login
# Add to .env.local: LEAN_MINDSET_GITHUB_CLI_USER=<that username>

npm run push:lean-mindset
```

Supabase SQL setup: `web/supabase/SETUP_README.md`
