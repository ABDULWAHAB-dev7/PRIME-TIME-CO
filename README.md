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
