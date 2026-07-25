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
