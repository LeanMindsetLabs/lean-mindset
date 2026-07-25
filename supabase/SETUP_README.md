# Supabase setup (manual)

Project: **fdsccpcapzgzyxnuweit**

Browser automation in Cursor is unreliable for this dashboard. Use these four steps.

## 1. Open SQL Editor

https://supabase.com/dashboard/project/fdsccpcapzgzyxnuweit/sql/new

## 2. Run schema

Paste and run the full contents of `SETUP_ALL.sql` (parts 1–3). Leave the Part 4 comment block commented for now.

## 3. Create coach Auth user, then promote

1. Dashboard → **Authentication** → **Users** → create user  
   Email: `LeanMindsetLabs@gmail.com`  
   (set the password only in the dashboard — do not put it in SQL or repo files)
2. Back in SQL Editor, uncomment **Part 4** in `SETUP_ALL.sql` and run it (promote coach + create cohort).

## 4. Point the app at this project

Update local and Vercel env:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fdsccpcapzgzyxnuweit.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Dashboard → **Settings** → **API** → anon / public key |

Optional middleware allowlist: `COACH_EMAILS=LeanMindsetLabs@gmail.com`
