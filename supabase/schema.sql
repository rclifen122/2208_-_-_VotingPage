-- Supabase bootstrap for Voting_Res
-- Run this script in the Supabase SQL editor.

-- Extensions ---------------------------------------------------------------
create extension if not exists "pgcrypto";

-- Restaurants --------------------------------------------------------------
create table if not exists public.restaurants (
  id text primary key,
  name text not null,
  aka text,
  rating numeric(3,1),
  review_count integer default 0,
  address text,
  map_url text,
  short_description text,
  badge text,
  badge_note text,
  cover_image text,
  votes integer not null default 0,
  created_at timestamptz not null default now()
);

-- Menu images --------------------------------------------------------------
create table if not exists public.menu_images (
  id uuid primary key default gen_random_uuid(),
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists menu_images_restaurant_sort_idx
  on public.menu_images (restaurant_id, sort_order);

-- Voting RPC ---------------------------------------------------------------
create or replace function public.increment_vote(restaurant_id text)
returns integer
language plpgsql
security definer
as $$
declare
  new_votes integer;
begin
  update public.restaurants
  set votes = coalesce(votes, 0) + 1
  where id = increment_vote.restaurant_id
  returning votes into new_votes;

  return coalesce(new_votes, 0);
end;
$$;

-- Optional seed ------------------------------------------------------------
-- insert into public.restaurants (id, name, aka, rating, review_count, address, short_description, cover_image, votes)
-- values
-- ('banh-trang-thien', 'Am Thuc Banh Trang Thien', 'Banh Trang Thien', 4.8, 113, '52 Duong Bau 1, Tan Son Nhi, Tan Phu, Ho Chi Minh City 70000, Vietnam', 'Rice paper party spreads...', 'https://...', 0),
-- ('bia-duc-bellazza', 'Bia Duc, Bi, Thuy Tu - Bellazza', 'Bellazza Craft Hall', 4.8, 254, '20 Duong C18, Ward 12, Tan Binh, Ho Chi Minh City, Vietnam', 'Continental beer hall...', 'https://...', 0);

-- Row level security -------------------------------------------------------
alter table public.restaurants enable row level security;
alter table public.menu_images enable row level security;

create policy "public read restaurants" on public.restaurants
for select
using (true);

create policy "public read menu images" on public.menu_images
for select
using (true);

create policy "admin updates via client" on public.restaurants
for update
using (true)
with check (true);

create policy "admin reorder menu images" on public.menu_images
for update
using (true)
with check (true);

-- NOTE: The admin console relies on a shared passcode in the UI.
-- For tighter security, replace the two update policies above with auth-based rules
-- (e.g., enable Supabase Auth and require service-role keys or user-specific roles).
