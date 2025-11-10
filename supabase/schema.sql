-- Supabase bootstrap script for restaurant voting
-- Run this in the SQL editor (or via the CLI) inside your Supabase project.

-- 1. Main table for restaurants/venues
create table if not exists public.restaurants (
  id text primary key,
  name text not null,
  aka text,
  rating numeric(3,1),
  review_count integer default 0,
  address text,
  short_description text,
  menu_folder text,
  featured_image text,
  votes integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Simple RPC helper to increment the vote counter atomically
create or replace function public.increment_vote(restaurant_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.restaurants
  set votes = coalesce(votes, 0) + 1
  where id = restaurant_id;
end;
$$;

-- 3. Optional: seed records (edit to match restaurant_infor.txt)
-- insert into public.restaurants (id, name, aka, rating, review_count, address, short_description, menu_folder, featured_image, votes)
-- values
-- ('banh-trang-thien', 'Am Thuc Banh Trang Thien', 'Banh Trang Thien', 4.8, 113, '52 Duong Bau 1, Tan Son Nhi, Tan Phu, Ho Chi Minh City 70000, Vietnam', 'Rice paper party spreads...', 'imagemenu/banh-trang-thien', 'https://...', 0),
-- ('bia-duc-bellazza', 'Bia Duc, Bi, Thuy Tu - Bellazza', 'Bellazza Craft Hall', 4.8, 254, '20 Duong C18, Ward 12, Tan Binh, Ho Chi Minh City, Vietnam', 'Continental beer hall...', 'imagemenu/bia-duc-bellazza', 'https://...', 0);

-- 4. Enable Row Level Security and allow public read (optional)
alter table public.restaurants enable row level security;

create policy "Allow read access" on public.restaurants
for select
using (true);

-- For write access from the frontend you can create service-role policies or build edge functions.
