# Lean Mindset - project accounts (this repo only)

**Hardcoded identity:** `config/project-credentials.ts`  
**Full registry:** `../docs/CREDENTIAL_REGISTRY.md` (workspace root)

Use these **only** for the Lean Mindset Lab app. Never mix with other products (e.g. ComeAround-io).

## Services

| Service | Target |
|---------|--------|
| GitHub remote | `https://github.com/LeanMindsetLabs/lean-mindset.git` |
| Vercel production | `https://www.leanmindset.app` |
| Vercel alias | `https://leanmindset.vercel.app` |
| Vercel team / project | `lean-mindset-labs` / `leanmindset` |
| Supabase project ref | `fdsccpcapzgzyxnuweit` |
| Owner email | `LeanMindsetLabs@gmail.com` |

**Custom domain:** `docs/DOMAIN_SETUP.md` (Globehost DNS + Vercel + Supabase).

## Session (run before push / deploy)

```powershell
cd web
npm run activate:lean-mindset
```

This logs out forbidden GitHub accounts and sets repo-local git identity.

## GitHub login (Lean Mindset only)

```powershell
gh auth login
# GitHub.com → HTTPS → browser → Google as LeanMindsetLabs@gmail.com

gh api user -q .login
# Add to .env.local: LEAN_MINDSET_GITHUB_CLI_USER=<username>
```

## Push

```powershell
npm run push:lean-mindset
```

## Local env (`web/.env.local`, gitignored)

- `ACTIVE_PROJECT=lean-mindset`
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `COACH_EMAILS=LeanMindsetLabs@gmail.com`
- `LEAN_MINDSET_GITHUB_CLI_USER` (after first `gh auth login`)

Passwords: Supabase Dashboard only - not in env or git.

Supabase SQL: `supabase/SETUP_README.md`
