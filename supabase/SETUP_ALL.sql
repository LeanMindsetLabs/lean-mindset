-- =============================================================================
-- Lean Mindset — SETUP_ALL.sql
-- Concatenation (in order): schema.sql → checkin.sql → checkin-phase2.sql
-- Plus commented post-setup for coach promote + default cohort.
--
-- Run once in Supabase SQL Editor for project: fdsccpcapzgzyxnuweit
-- Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE / ON CONFLICT).
-- =============================================================================

-- #############################################################################
-- PART 1: schema.sql
-- #############################################################################
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

-- #############################################################################
-- PART 2: checkin.sql
-- #############################################################################
-- Lean Mindset Phase 1 — daily check-in chat
-- Run in Supabase SQL Editor after schema.sql (safe to re-run).
--
-- Promote a user to coach (v1: one account owner):
--   update public.profiles
--   set role = 'coach'
--   where id = (select id from auth.users where email = 'you@example.com');
--
-- Optional app gate: set COACH_EMAILS=you@example.com in .env (comma-separated).
-- Middleware requires profiles.role = 'coach'; if COACH_EMAILS is set, email must also match.

-- ---------------------------------------------------------------------------
-- Profiles: role + email (never trust client-only metadata for authorization)
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists role text not null default 'client';

alter table public.profiles
  add column if not exists email text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('client', 'coach'));
  end if;
end $$;

comment on column public.profiles.role is
  'Authorization role: client | coach. Set via SQL only; optional COACH_EMAILS env is an extra middleware gate.';

-- Keep email in sync on signup
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

-- Helper: current user is coach (used by RLS — never trust JWT app_metadata alone)
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

-- Coaches can read cohort member profiles (inbox labels)
drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner or coach"
  on public.profiles for select
  using (auth.uid() = id or public.is_coach());

-- ---------------------------------------------------------------------------
-- Cohorts (minimal — one coach / one default cohort for v1)
-- ---------------------------------------------------------------------------
create table if not exists public.cohorts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  coach_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.cohort_members (
  cohort_id uuid not null references public.cohorts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (cohort_id, user_id)
);

alter table public.cohorts enable row level security;
alter table public.cohort_members enable row level security;

-- Authenticated clients may read cohorts so they can auto-join the default one (v1).
drop policy if exists "Cohorts readable by members or coach" on public.cohorts;
drop policy if exists "Cohorts readable by authenticated" on public.cohorts;
create policy "Cohorts readable by authenticated"
  on public.cohorts for select
  to authenticated
  using (true);

drop policy if exists "Cohort coach can insert" on public.cohorts;
create policy "Cohort coach can insert"
  on public.cohorts for insert
  with check (coach_id = auth.uid() and public.is_coach());

drop policy if exists "Cohort members readable by self or coach" on public.cohort_members;
create policy "Cohort members readable by self or coach"
  on public.cohort_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.cohorts c
      where c.id = cohort_members.cohort_id and c.coach_id = auth.uid()
    )
  );

drop policy if exists "Clients can join via ensure; coach manages" on public.cohort_members;
create policy "Clients can join via ensure; coach manages"
  on public.cohort_members for insert
  with check (
    user_id = auth.uid()
    or exists (
      select 1 from public.cohorts c
      where c.id = cohort_members.cohort_id and c.coach_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Conversations + messages
-- ---------------------------------------------------------------------------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles (id) on delete cascade,
  cohort_id uuid references public.cohorts (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_created_idx
  on public.messages (conversation_id, created_at);

create index if not exists conversations_updated_idx
  on public.conversations (updated_at desc);

alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Client: own conversation. Coach: cohort members' conversations (v1: all members of their cohorts)
drop policy if exists "Conversations readable by client or cohort coach" on public.conversations;
create policy "Conversations readable by client or cohort coach"
  on public.conversations for select
  using (
    client_id = auth.uid()
    or (
      public.is_coach()
      and (
        cohort_id is null
        or exists (
          select 1 from public.cohorts c
          where c.id = conversations.cohort_id and c.coach_id = auth.uid()
        )
        or exists (
          select 1
          from public.cohort_members cm
          join public.cohorts c on c.id = cm.cohort_id
          where cm.user_id = conversations.client_id
            and c.coach_id = auth.uid()
        )
      )
    )
  );

drop policy if exists "Clients can create own conversation" on public.conversations;
create policy "Clients can create own conversation"
  on public.conversations for insert
  with check (client_id = auth.uid());

drop policy if exists "Conversation participants can update" on public.conversations;
create policy "Conversation participants can update"
  on public.conversations for update
  using (
    client_id = auth.uid()
    or public.is_coach()
  );

drop policy if exists "Messages readable by conversation access" on public.messages;
create policy "Messages readable by conversation access"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (
          c.client_id = auth.uid()
          or public.is_coach()
        )
    )
  );

drop policy if exists "Participants can send messages" on public.messages;
create policy "Participants can send messages"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = messages.conversation_id
        and (
          c.client_id = auth.uid()
          or public.is_coach()
        )
    )
  );

-- After promoting coach, create default cohort (replace email):
--   insert into public.cohorts (name, coach_id)
--   select 'Lean Mindset Cohort', p.id
--   from public.profiles p
--   where p.role = 'coach'
--   limit 1
--   on conflict do nothing;

-- Phase 2 (soft-parse check_ins + RLS): run supabase/checkin-phase2.sql after this file.

-- #############################################################################
-- PART 3: checkin-phase2.sql
-- #############################################################################
-- Lean Mindset Phase 2 — soft-parsed check-ins
-- Run in Supabase SQL Editor AFTER checkin.sql (Phase 1). Safe to re-run.
--
-- Soft-parse stores structured fields from client check-in messages.
-- Raw messages always remain in public.messages; parse failure never blocks send.

-- ---------------------------------------------------------------------------
-- check_ins (linked to message; one parse row per message)
-- ---------------------------------------------------------------------------
create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null unique references public.messages (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  check_in_day int,
  weight_lb numeric,
  change_lb numeric,
  total_change_lb numeric,
  bm numeric,
  water numeric,
  meals jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists check_ins_user_created_idx
  on public.check_ins (user_id, created_at desc);

create index if not exists check_ins_conversation_created_idx
  on public.check_ins (conversation_id, created_at desc);

alter table public.check_ins enable row level security;

-- Client: own rows. Coach: any check_in for conversations they can access.
drop policy if exists "Check-ins readable by owner or coach" on public.check_ins;
create policy "Check-ins readable by owner or coach"
  on public.check_ins for select
  using (
    user_id = auth.uid()
    or (
      public.is_coach()
      and exists (
        select 1 from public.conversations c
        where c.id = check_ins.conversation_id
          and (
            c.client_id = auth.uid()
            or public.is_coach()
          )
      )
    )
  );

-- Insert only as the message sender (client check-in); coach replies are not parsed into this table.
drop policy if exists "Clients can insert own check-ins" on public.check_ins;
create policy "Clients can insert own check-ins"
  on public.check_ins for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.messages m
      join public.conversations c on c.id = m.conversation_id
      where m.id = check_ins.message_id
        and m.sender_id = auth.uid()
        and c.client_id = auth.uid()
        and c.id = check_ins.conversation_id
    )
  );

comment on table public.check_ins is
  'Phase 2 soft-parsed check-in fields from client messages. Never required for send.';

-- #############################################################################
-- PART 4: Post-setup (UNCOMMENT after Auth user exists)
-- Create Auth user first in Dashboard → Authentication → Users
-- Email: LeanMindsetLabs@gmail.com  (set password in dashboard only — never in SQL)
-- Then uncomment and run the block below.
-- #############################################################################

/*
-- Promote coach
update public.profiles
set role = 'coach',
    email = 'LeanMindsetLabs@gmail.com'
where id = (
  select id from auth.users where email = 'LeanMindsetLabs@gmail.com'
);

-- Default cohort (idempotent: skip if coach already has one)
insert into public.cohorts (name, coach_id)
select 'Lean Mindset Cohort', p.id
from public.profiles p
where p.email = 'LeanMindsetLabs@gmail.com'
  and p.role = 'coach'
  and not exists (
    select 1 from public.cohorts c where c.coach_id = p.id
  );
*/