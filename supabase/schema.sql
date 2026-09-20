create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null,
  description text not null default '', date date not null, location text not null default '',
  registration_url text, image_url text, featured boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null,
  description text not null default '', technologies text[] not null default '{}', github_url text,
  demo_url text, image_url text, featured boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
  year integer not null, image_url text, featured boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(), name text not null, position text not null,
  image_url text, linkedin_url text, email text, display_order integer not null default 0,
  active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
  image_url text not null, category text not null default '', event_name text not null default '',
  display_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(), title text not null, description text not null default '',
  link_url text, active boolean not null default true, priority integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create index if not exists events_date_idx on public.events(date desc);
create index if not exists team_members_order_idx on public.team_members(display_order);
create index if not exists gallery_order_idx on public.gallery(display_order);
create index if not exists announcements_priority_idx on public.announcements(priority desc);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

do $$ declare table_name text; begin
  foreach table_name in array array['events','projects','achievements','team_members','gallery','announcements'] loop
    execute format('drop trigger if exists set_%s_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

alter table public.events enable row level security;
alter table public.projects enable row level security;
alter table public.achievements enable row level security;
alter table public.team_members enable row level security;
alter table public.gallery enable row level security;
alter table public.announcements enable row level security;

create policy "public read events" on public.events for select using (true);
create policy "public read projects" on public.projects for select using (true);
create policy "public read achievements" on public.achievements for select using (true);
create policy "public read active team" on public.team_members for select using (active = true);
create policy "public read gallery" on public.gallery for select using (true);
create policy "public read active announcements" on public.announcements for select using (active = true);

create policy "admins manage events" on public.events for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage achievements" on public.achievements for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage team" on public.team_members for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage gallery" on public.gallery for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage announcements" on public.announcements for all to authenticated using (public.is_admin()) with check (public.is_admin());
