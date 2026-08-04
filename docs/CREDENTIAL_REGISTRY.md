# Credential registry — one block per product

**Rule:** Each product has its own hardcoded block. In the **Lean Mindset** workspace, use **only** `lean-mindset`. Never reuse another product’s GitHub, Vercel, Supabase, or email.

Code source of truth: `config/project-credentials.ts`

---

## ACTIVE — `lean-mindset` (this workspace)

| Field | Value |
|-------|--------|
| Owner / Google SSO | `LeanMindsetLabs@gmail.com` |
| GitHub org / repo | `LeanMindsetLabs` / `lean-mindset` |
| Git remote | `https://github.com/LeanMindsetLabs/lean-mindset.git` |
| Vercel team / project | `lean-mindset-labs` / `leanmindset` |
| Production domain | `https://www.leanmindset.app` (Globehost.com) |
| Vercel alias | `https://leanmindset.vercel.app` |
| Supabase ref | `fdsccpcapzgzyxnuweit` |
| Coach allowlist | `LeanMindsetLabs@gmail.com` |
| Local env file | `.env.local` (gitignored) |
| Git identity (repo-local) | `Lean Mindset Labs <LeanMindsetLabs@gmail.com>` |

Secrets (anon key, service role, tokens): **only** in `.env.local` — never committed.

Login passwords: **only** in Supabase Auth dashboard — never in env or git.

---

## FORBIDDEN in this workspace

| Product | GitHub / account | Why |
|---------|------------------|-----|
| ComeAround / other apps | `ComeAround-io` | Wrong org; causes 403 on push and mixed deploys |

If `gh auth status` shows a forbidden account, run `npm run activate:lean-mindset`.

---

## Adding a future product (elsewhere)

Create a **new workspace folder** and a **new** `config/project-credentials.ts` for that product. Do not append multiple products into Lean Mindset’s config file.
