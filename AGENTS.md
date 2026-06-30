# AGENTS.md — KiraaGhar.in

## Project Architecture

This is a TanStack Start (React) application deployed on Netlify with a managed Postgres database.

```
src/routes/          # File-based routes (pages + API endpoints)
  index.tsx          # Homepage with search + listing grid
  rooms/$id.tsx      # Room detail page
  post-room.tsx      # Landlord form to post a new listing
  api/
    rooms.ts         # GET (search) + POST (create) rooms
    rooms/$id.ts     # GET single room by ID
    seed.ts          # POST to seed sample data (auto-called on first load)

db/
  schema.ts          # Drizzle ORM table definitions
  index.ts           # Drizzle client (netlify-db adapter)

drizzle.config.ts    # Points migrations to netlify/database/migrations/
netlify/database/migrations/   # Auto-generated SQL migration files
```

## Key Conventions

- All API routes live under `src/routes/api/` using TanStack Start's `server.handlers` pattern
- Database queries use Drizzle ORM (`db` from `db/index.ts`, tables from `db/schema.ts`)
- Migrations are generated with `npx drizzle-kit generate` — never write SQL by hand
- The `rooms` table stores all listing data; `amenities` is a comma-separated string
- Sample data is seeded automatically via `/api/seed` (POST) when no rooms exist

## Coding Conventions

- TypeScript throughout; import paths use `.js` extension for ESM compatibility
- Tailwind CSS v4 for all styling (no CSS modules)
- React state managed locally in components (no global store)
- `lucide-react` for all icons

## Non-Obvious Decisions

- Amenities stored as a comma-separated text field for simplicity (not a relational table)
- WhatsApp link built using `wa.me` deep-link with pre-filled message
- Contact phone hidden behind a "Show Contact" button to reduce spam
- Auto-seed on empty DB avoids the site looking blank on first deploy
