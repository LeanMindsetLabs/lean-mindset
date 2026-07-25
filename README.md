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

5. In Supabase SQL Editor, run `supabase/schema.sql`

## Vercel deploy

1. Push this repo (or the `web` folder as root)
2. Import project in Vercel → set Root Directory to `web` if needed
3. Add env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy
5. In Supabase Auth → URL configuration, add:
   - Site URL: `https://YOUR_VERCEL_DOMAIN`
   - Redirect URLs: `https://YOUR_VERCEL_DOMAIN/**` and `http://localhost:3000/**`

## Routes

| Path | Access |
|---|---|
| `/`, `/labs`, `/labs/[slug]` | Public |
| `/login`, `/signup` | Public |
| `/program/*`, `/add`, `/profile` | Requires login |

Program pages: guide, eating schedule, grocery, supplements, workouts, water, trackers.
