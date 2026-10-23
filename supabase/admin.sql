-- =====================================================================
-- NAC ADMIN + ANALYTICS  (run AFTER schema.sql and seed.sql)
-- Security model:
--   * Only users listed in `admins` can read/write admin data. This is enforced
--     by Postgres Row Level Security, so even a direct API call with a stolen
--     anon key cannot read orders or change products.
--   * Disable public sign-ups: Authentication → Sign In / Providers → Email →
--     turn OFF "Allow new users to sign up". Admins are created only by you.
-- =====================================================================

create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('owner','admin')),
  created_at timestamptz default now()
);
alter table admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins can read admins" on admins;
create policy "admins can read admins" on admins for select using (is_admin());
-- inserts/deletes on admins happen only server-side with the service role key.

-- Full access for admins on store tables
do $$ declare t text; begin
  foreach t in array array['products','posts','orders','newsletter'] loop
    execute format('drop policy if exists "admin full access" on %I', t);
    execute format('create policy "admin full access" on %I for all using (is_admin()) with check (is_admin())', t);
  end loop;
end $$;

-- ---------- Analytics events ----------
create table if not exists events (
  id bigserial primary key,
  type text not null check (type in ('page_view','product_view','product_click','add_to_cart','checkout_start','purchase')),
  session_id text,
  path text,
  product_slug text,
  referrer text,
  created_at timestamptz not null default now()
);
create index if not exists events_created_idx on events (created_at desc);
create index if not exists events_type_idx on events (type, created_at desc);
alter table events enable row level security;

drop policy if exists "anyone can log events" on events;
create policy "anyone can log events" on events for insert
  with check (char_length(coalesce(path,'')) < 300 and char_length(coalesce(session_id,'')) < 80 and char_length(coalesce(product_slug,'')) < 120);
drop policy if exists "admins read events" on events;
create policy "admins read events" on events for select using (is_admin());
drop policy if exists "admins delete events" on events;
create policy "admins delete events" on events for delete using (is_admin());

-- ---------- Product image storage ----------
insert into storage.buckets (id, name, public) values ('products', 'products', true) on conflict (id) do nothing;
drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects for select using (bucket_id = 'products');
drop policy if exists "admins upload product images" on storage.objects;
create policy "admins upload product images" on storage.objects for insert with check (bucket_id = 'products' and is_admin());
drop policy if exists "admins update product images" on storage.objects;
create policy "admins update product images" on storage.objects for update using (bucket_id = 'products' and is_admin());
drop policy if exists "admins delete product images" on storage.objects;
create policy "admins delete product images" on storage.objects for delete using (bucket_id = 'products' and is_admin());

-- ---------- Make YOURSELF the owner ----------
-- 1) Authentication → Users → "Add user" → your email + strong password (tick "Auto confirm").
-- 2) Run (replace the email):
-- insert into admins (user_id, email, role)
--   select id, email, 'owner' from auth.users where email = 'you@example.com'
--   on conflict (user_id) do update set role = 'owner';
