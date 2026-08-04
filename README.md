# Lean Mindset (web)

Next.js + Tailwind client app with **Supabase Auth**, Labs catalog, and Lean program content pages. Deploy on **Vercel**.

## Local setup

1. Create a project at [supabase.com](https://supabase.com)
2. Auth → Providers → Email enabled (confirm email optional for MVP: turn off “Confirm email” under Auth settings if you want instant access)
3. Project Settings → API → copy **Project URL** and **anon public** key
4. In `web/`:

```bash
cp .env.local.example .env.local
# paste URL + anon key into .env.local
npm install
npm run dev
```

5. In Supabase SQL Editor, run `supabase/schema.sql`, then `supabase/checkin.sql`

## Promote coach (v1 — one account owner)

```sql
update public.profiles
set role = 'coach'
where id = (select id from auth.users where email = 'you@example.com');

-- Create default cohort (clients auto-join on first check-in)
insert into public.cohorts (name, coach_id)
select 'Lean Mindset Cohort', id from public.profiles where role = 'coach' limit 1;
```

Optional: set `COACH_EMAILS=you@example.com` in `.env.local` / Vercel as an extra middleware allowlist (still requires `profiles.role = 'coach'`).

## Vercel deploy

Production domain: **https://www.leanmindset.app** (DNS at Globehost → Vercel). See `../docs/DOMAIN_SETUP.md`.

1. Push this repo (or the `web` folder as root)
2. Import project in Vercel → set Root Directory to `web` if needed
3. Add env vars:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.leanmindset.app`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy
5. In Supabase Auth → URL configuration, add:
   - Site URL: `https://www.leanmindset.app`
   - Redirect URLs: `https://www.leanmindset.app/**`, `https://leanmindset.app/**`, `https://leanmindset.vercel.app/**`, `http://localhost:3000/**`

## Routes

| Path | Access |
|---|---|
| `/`, `/labs`, `/labs/[slug]` | Public |
| `/login`, `/signup` | Public |
| `/program/*`, `/add`, `/profile`, `/check-in` | Requires login |
| `/coach`, `/coach/[id]` | Requires login + `profiles.role = 'coach'` (+ optional `COACH_EMAILS`) |

Program pages: guide, eating schedule, grocery, supplements, workouts, water, trackers.

Check-in: WhatsApp-style daily chat with template chip. Coach inbox at `/coach`.
