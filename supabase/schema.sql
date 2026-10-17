-- ============================================================
-- BestLivingPicks — Supabase Postgres schema
-- Sleep & bedding affiliate review site (US audience)
-- Run this FIRST in the Supabase SQL editor, then seed.sql
-- ============================================================

-- UUID generation
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Categories
-- ------------------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Articles
-- ------------------------------------------------------------
create table if not exists articles (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content_md       text not null,
  category_id      uuid references categories(id) on delete set null,
  cover_image_url  text,
  status           text not null default 'draft' check (status in ('draft','published')),
  published_at     timestamptz,
  seo_title        text,
  seo_description  text,
  reading_time_min integer,
  featured         boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists idx_articles_slug        on articles(slug);
create index if not exists idx_articles_status      on articles(status);
create index if not exists idx_articles_category    on articles(category_id);
create index if not exists idx_articles_featured    on articles(featured);

-- ------------------------------------------------------------
-- Products
-- ------------------------------------------------------------
create table if not exists products (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  slug         text not null unique,
  brand        text,
  category_id  uuid references categories(id) on delete set null,
  price        numeric(10,2),
  rating       numeric(2,1),
  review_count integer,
  image_url    text,
  affiliate_url text,
  pros         text[],
  cons         text[],
  specs        jsonb not null default '{}'::jsonb,
  badge        text,
  created_at   timestamptz not null default now()
);

create index if not exists idx_products_slug     on products(slug);
create index if not exists idx_products_category on products(category_id);

-- ------------------------------------------------------------
-- Article <-> Product links (ordered)
-- ------------------------------------------------------------
create table if not exists article_products (
  article_id uuid not null references articles(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  position   integer not null default 0,
  primary key (article_id, product_id)
);

-- ------------------------------------------------------------
-- Newsletter subscribers
-- ------------------------------------------------------------
create table if not exists subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- The backend uses the SERVICE ROLE key, which bypasses RLS.
-- Public (anon key) gets read-only SELECT access.
-- ============================================================
alter table categories       enable row level security;
alter table articles         enable row level security;
alter table products         enable row level security;
alter table article_products enable row level security;
alter table subscribers      enable row level security;

create policy "public read categories"
  on categories for select using (true);

create policy "public read published articles"
  on articles for select using (status = 'published');

create policy "public read products"
  on products for select using (true);

create policy "public read article_products"
  on article_products for select using (true);

-- Subscribers: no public read (emails stay private).
-- Insert of a new subscriber goes through the backend API,
-- which uses the service role key and bypasses RLS.
