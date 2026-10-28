# PRIME-TIME-CO

Watch outlet, repair workshop and customer marketplace. Built from the project blueprint (Next.js 15, TypeScript, Tailwind v4, Drizzle/Postgres).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # domain unit tests
npm run typecheck
npm run build
```

## Status (milestone 1)

- Domain layer with tests: commission engine, repair ticket state machine, cart totals, numbering.
- Shop catalogue with URL filters, product pages, pre-owned outlet (seed data in `data/`).
- Repair hub and 3-step booking wizard (server-validated with Zod; ticket numbers are in-memory placeholders).
- Drizzle schema for commerce and workshop tables in `db/schema.ts` (no database connected yet).

## Next

Cart and checkout, database wiring and seed, public tracking and quote approval, admin repair queue, marketplace.

Layer rule: `domain/` imports nothing from `app/`, `components/` or `lib/`.

## Images

Drop your own (or dealer-supplied) images in `public/` and they appear automatically:

- Product photos: `public/products/<product-slug>.webp` (or jpg, png, avif). Slugs are in `data/products.ts`, e.g. `tissot-prx-35`.
- Brand logos: `public/brands/<brand-name>.svg` in lowercase, e.g. `seiko.svg`, `tissot.png`.

Only use images you own or are licensed to use (for example an official dealer pack).
