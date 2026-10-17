# BestLivingPicks — Sleep & Bedding Affiliate Site

Fresh full-stack rebuild of **bestlivingpicks.com**: a sleep & bedding product-review affiliate site
for a US audience, monetized with **Amazon Associates**.

## Architecture

```
┌─────────────────────┐        ┌──────────────────────┐        ┌───────────────────┐
│  frontend/          │  REST  │  backend/            │  SQL   │  Supabase         │
│  Next.js 14         │───────▶│  Express + TypeScript│───────▶│  Postgres         │
│  App Router + TS    │ /api/* │  (service role key)  │        │  (RLS: anon read) │
│  Tailwind CSS       │        │  helmet · cors       │        │                   │
└─────────────────────┘        └──────────────────────┘        └───────────────────┘
```

**Key rule:** the frontend never talks to Supabase directly — every data call goes through the
Express API. The backend holds the Supabase **service role** key (server-side only); the public
only ever gets read access through RLS `SELECT` policies (anon key).

## Project layout

```
bestlivingpicks/
├── frontend/                 # Next.js 14 App Router, TypeScript, Tailwind
│   ├── app/                  # /, /articles, /articles/[slug], /categories/[slug],
│   │                         # /products, /about, /affiliate-disclosure, /privacy, /terms
│   │                         # + sitemap.ts, robots.ts
│   ├── components/           # Header, Footer, ArticleCard, ProductCard, ComparisonTable,
│   │                         # ProsCons, RatingStars, NewsletterSignup, Breadcrumbs,
│   │                         # AffiliateDisclosureNotice
│   └── lib/api.ts            # Typed fetch client for the Express API
│   └── mock-api.cjs          # Dev-only mock API (npm run dev:mock) — UI work without backend
├── backend/                  # Express + TypeScript REST API
│   └── src/
│       ├── index.ts          # App bootstrap (helmet, CORS, logging, error handler)
│       ├── lib/supabase.ts   # Service-role Supabase client (server only)
│       ├── lib/utils.ts      # asyncHandler, email validation, pagination helpers
│       └── routes/           # articles, categories, products, subscribers
└── supabase/
    ├── schema.sql            # Tables + RLS policies (run first)
    └── seed.sql              # 6 categories, 10 products, 10 full articles, links
```

## 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. Open **SQL Editor** → run `supabase/schema.sql` (creates tables + RLS).
3. Still in SQL Editor → run `supabase/seed.sql` (categories, products, articles).
4. Go to **Project Settings → API** and copy:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (backend only, **never** in the frontend)

## 2. Environment variables

**backend/.env** (copy from `backend/.env.example`):
```
SUPABASE_URL=https://xyzcompany.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...        # service_role key, keep secret
PORT=4000
FRONTEND_URL=http://localhost:3000             # comma-separated in production
```

**frontend/.env.local** (copy from `frontend/.env.example`):
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 3. Run locally

```bash
# Terminal 1 — backend
cd bestlivingpicks/backend
npm install
npm run dev        # http://localhost:4000  (health: /api/health)

# Terminal 2 — frontend
cd bestlivingpicks/frontend
npm install
npm run dev        # http://localhost:3000
```

Verify: open `http://localhost:3000` — the homepage should show the featured article,
top picks, categories, and latest articles from the API.

### 3b. Frontend-only mode (no backend / no Supabase)

`frontend/mock-api.cjs` is a zero-dependency mock that serves the same endpoints and
response shapes as the Express API, with placeholder content. Use it to build the UI
before Supabase or the backend are ready:

```bash
# Terminal 1 — mock API
cd bestlivingpicks/frontend
npm run dev:mock   # http://localhost:4000/api

# Terminal 2 — frontend (as usual)
npm run dev        # http://localhost:3000
```

When the real backend is ready, stop the mock and run the Express server instead —
no frontend changes are needed. **Do not deploy the mock**; it serves placeholder
content and the `YOUR-AMAZON-TAG-20` affiliate placeholder.

## 4. Replace the Amazon Associates tag (TODO before launch)

Every product's `affiliate_url` currently uses the placeholder tag **`YOUR-AMAZON-TAG-20`**:

```
https://www.amazon.com/dp/EXAMPLE01?tag=YOUR-AMAZON-TAG-20
```

When your Associates tag is approved, replace it in Supabase — one SQL statement:

```sql
update products
set affiliate_url = replace(affiliate_url, 'YOUR-AMAZON-TAG-20', 'your-real-tag-20');
```

Also confirm each `dp/EXAMPLE##` placeholder is swapped for the product's real Amazon ASIN.

## 5. Deployment notes

- **Frontend → Vercel:** import `bestlivingpicks/frontend`, set `NEXT_PUBLIC_API_URL` to the
  public backend URL (e.g. `https://api.bestlivingpicks.com/api`). `next build` is the build command.
- **Backend → any Node host** (Render, Railway, Fly.io, VPS): set the four env vars above,
  run `npm run build` then `npm start`. Put it behind HTTPS.
- **DNS:** point `bestlivingpicks.com` at Vercel; optionally serve the API from
  `api.bestlivingpicks.com` and add it to the backend's `FRONTEND_URL`.
- **Amazon Associates compliance:** the site already includes an `/affiliate-disclosure` page,
  a disclosure notice component on article/product pages, and `rel="nofollow sponsored noopener"`
  on all affiliate links — all required by the Associates program.

## API reference

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/api/health` | Liveness check |
| GET | `/api/articles?category=slug&featured=true&limit=20` | Published articles, newest first |
| GET | `/api/articles/:slug` | Article + category + linked products |
| GET | `/api/categories` | All categories |
| GET | `/api/categories/:slug` | Category + its articles |
| GET | `/api/products?category=slug&limit=20` | Products by rating |
| GET | `/api/products/:slug` | Single product |
| POST | `/api/subscribers` | `{ "email": "..." }` — validates + dedupes |

## TODO for the user

- [ ] Create the Supabase project and run `schema.sql` + `seed.sql`
- [ ] Add real Supabase credentials (`backend/.env`, never committed)
- [ ] Replace `YOUR-AMAZON-TAG-20` with the real Associates tag (SQL above)
- [ ] Replace `dp/EXAMPLE##` placeholders with real Amazon ASINs
- [ ] Fix the old site's exposed Laravel debug mode (separate, still live as of 2026-10-16)
- [ ] Point `bestlivingpicks.com` DNS at the new deployment when ready
