-- Lean Mindset — run in Supabase SQL Editor

-- Profiles (extends auth.users)
-- role is server/SQL authority only — never trust client metadata for /coach access.
-- Optional: COACH_EMAILS env (comma-separated) as an extra middleware allowlist.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'client' check (role in ('client', 'coach')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- security definer avoids recursive RLS when coaches read other profiles
create or replace function public.is_coach()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'coach'
  );
$$;

revoke all on function public.is_coach() from public;
grant execute on function public.is_coach() to authenticated;

create policy "Profiles are viewable by owner or coach"
  on public.profiles for select
  using (auth.uid() = id or public.is_coach());

create policy "Profiles are upsertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'client'
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Labs catalog (optional DB mirror of src/data/labs.ts)
create table if not exists public.labs (
  slug text primary key,
  name text not null,
  tagline text not null,
  duration_weeks int not null default 6,
  focus text,
  level text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.labs enable row level security;

create policy "Labs are public read"
  on public.labs for select
  to anon, authenticated
  using (is_active = true);

-- Enrollments
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lab_slug text not null references public.labs (slug),
  status text not null default 'active',
  started_at timestamptz not null default now(),
  unique (user_id, lab_slug)
);

alter table public.enrollments enable row level security;

create policy "Enrollments readable by owner"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Enrollments insertable by owner"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

-- Seed labs
insert into public.labs (slug, name, tagline, duration_weeks, focus, level) values
  ('summer-lab', 'Summer Lab', 'Drop 15–20 lb before vacation — structured, social-life friendly.', 6, 'Fat loss + energy', 'All levels'),
  ('bikini-body-lab', 'Bikini Body Lab', 'Tone, tighten, and feel confident — real food, no extremes.', 6, 'Body composition', 'Intermediate'),
  ('executive-reset', 'Executive Reset Lab', 'High-performance fat loss for packed calendars and late meetings.', 6, 'Busy schedule adherence', 'All levels'),
  ('plant-powered', 'Plant-Powered Lab', 'Vegetarian-friendly fat loss with protein-smart plates.', 6, 'Plant-based fat loss', 'Beginner'),
  ('post-holiday-reset', 'Post-Holiday Reset', 'Reset after the season — structure, hydration, and quick wins.', 6, 'Reset + habits', 'Beginner'),
  ('foundation-lab', 'Foundation Lab', 'The core Lean Mindset 6-week system — no starving, no chemicals.', 6, 'Core program', 'All levels')
on conflict (slug) do nothing;

-- Phase 1 check-in chat (cohorts, conversations, messages, RLS):
-- run supabase/checkin.sql in the SQL Editor after this file.
-- Promote coach:
--   update public.profiles set role = 'coach'
--   where id = (select id from auth.users where email = 'you@example.com');
