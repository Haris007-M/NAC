# NACosmetics (NAC) — Next.js + TypeScript + Tailwind + Supabase

Authentic Korean skincare e-commerce store.

## Tech
- **Next.js 14 (App Router)** + **TypeScript**
- **Tailwind CSS** (all styling via `className`; brand-film keyframes live in `src/app/globals.css`)
- **Supabase** (Postgres) for products, blog posts, orders and newsletter
- SEO: per-page metadata, JSON-LD (Store, Product, BlogPosting, FAQPage, Breadcrumb), `sitemap.xml`, `robots.txt`, static generation for products and posts

## Run locally
```bash
npm install
cp .env.example .env.local   # optional – the site works without Supabase using bundled data
npm run dev                  # http://localhost:3000
```

## Connect Supabase
1. Create a project at supabase.com.
2. SQL Editor → run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Project Settings → API → copy the URL, anon key and service role key into `.env.local`.
4. Restart `npm run dev`. Products and posts now load from the database; newsletter sign-ups and orders are saved.

Without env vars the app falls back to `src/lib/data.ts`, so you can develop the UI first.

## Project structure
```
src/
  app/            routes: / , /shop, /product/[slug], /journal, /journal/[slug], /help, /about, /checkout
    actions.ts    server actions: subscribe(), createOrder() (prices re-calculated on the server)
    sitemap.ts, robots.ts, layout.tsx, globals.css
  components/     Header (mega menu, smart sticky, mobile curtain), Hero, BrandFilm, Shelf3D,
                  ProductCard, ShopClient (filters drawer), CartProvider/CartDrawer, CheckoutForm,
                  Footer (social + payment logos), TabBar, WelcomePopup, CursorGlow, Rail, Marquee
  lib/            types.ts, data.ts (seed catalog + blog), queries.ts, supabase.ts, utils.ts
public/img        product + banner photos
supabase/         schema.sql, seed.sql
```

## Adding products / blog posts
Insert rows in the Supabase `products` / `posts` tables (Table Editor). Put images in `public/img`
or Supabase Storage (allowed in `next.config.mjs`).

## Payments (to do)
`createOrder()` in `src/app/actions.ts` saves the order. Plug in your provider there
(e.g. Safepay / PayFast / JazzCash / Easypaisa for Pakistan, or Stripe if you have an eligible entity),
redirect to its hosted checkout, then mark the order `paid` from the provider's webhook.

## Deploy
Push to GitHub → import in Vercel → add the same env vars → deploy.

## Admin panel (`/admin`)
Private dashboard + full management of products, blog posts, orders, newsletter and team.

**One-time setup**
1. Run `supabase/schema.sql`, `supabase/seed.sql`, then `supabase/admin.sql` in the Supabase SQL Editor.
2. Supabase → Authentication → Sign In / Providers → Email → **turn OFF “Allow new users to sign up”**.
3. Authentication → Users → **Add user** → your email + strong password → tick *Auto confirm*.
4. SQL Editor (replace the email):
   ```sql
   insert into admins (user_id, email, role)
   select id, email, 'owner' from auth.users where email = 'you@example.com';
   ```
5. Make sure `.env.local` has all three keys (URL, anon, service role). Open **http://localhost:3000/admin**.

**Security**
- No sign-up page exists; accounts are created only by the owner (Team & access) or in Supabase.
- Middleware blocks every `/admin` URL for signed-out visitors; every page and action re-verifies the
  session with Supabase *and* checks the `admins` table.
- Postgres Row Level Security means the database itself refuses admin reads/writes from anyone not in
  `admins`, even if someone calls the API directly.
- The service role key is used only on the server. Never put it in a `NEXT_PUBLIC_` variable.
- Recommended: enable MFA in Supabase Auth and use a long unique password.

**Dashboard metrics**: revenue, orders, units sold, average order value, conversion rate, visitors
(unique sessions), visitors today, page views, products/stock/stock value, subscribers, daily visitor
and revenue charts, best sellers, most clicked / viewed / added-to-bag products, top pages, traffic
sources, sales funnel, low stock, orders by country, recent orders. Range: 7 / 30 / 90 days.
Analytics are first-party (`events` table), cookie-free, no personal data.
