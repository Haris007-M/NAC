-- NACosmetics database schema. Run in Supabase → SQL Editor, then run seed.sql.

create table if not exists products (
  slug text primary key,
  name text not null,
  brand text not null,
  category text not null check (category in ('Cleanser','Serum','Sun & Barrier')),
  size text,
  price numeric(10,2) not null,
  compare_at numeric(10,2),
  rating numeric(2,1) default 0,
  review_count int default 0,
  skin_types text[] default '{}',
  concerns text[] default '{}',
  best_for text,
  tag text,
  description text,
  how_to_use text,
  ingredients text,
  image text,
  stock int default 100,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists posts (
  slug text primary key,
  title text not null,
  tag text,
  published_at date default current_date,
  read_time text,
  meta_description text,
  focus_keyword text,
  keywords text[] default '{}',
  hashtags text[] default '{}',
  excerpt text,
  body jsonb not null default '[]',
  faq jsonb not null default '[]',
  is_published boolean default true
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text, last_name text, phone text,
  address text, city text, postal_code text, country text,
  shipping_method text,
  payment_method text,
  items jsonb not null,
  subtotal numeric(10,2) not null,
  shipping numeric(10,2) not null,
  total numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','paid','shipped','delivered','cancelled')),
  created_at timestamptz default now()
);

create table if not exists newsletter (
  email text primary key,
  source text,
  created_at timestamptz default now()
);

-- Row Level Security: public can read catalog + blog, and can subscribe.
alter table products enable row level security;
alter table posts enable row level security;
alter table orders enable row level security;
alter table newsletter enable row level security;

drop policy if exists "read active products" on products;
create policy "read active products" on products for select using (is_active);
drop policy if exists "read published posts" on posts;
create policy "read published posts" on posts for select using (is_published);
drop policy if exists "anyone can subscribe" on newsletter;
create policy "anyone can subscribe" on newsletter for insert with check (true);
-- Orders are inserted server-side with the service role key (bypasses RLS); no public policy.
