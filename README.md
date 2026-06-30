# KiraaGhar.in — Room Rental Website for Sultanpur, UP

A full-stack room rental platform for Sultanpur, Uttar Pradesh. Anyone can search for available rooms by area, price, room type, and furnishing. Landlords can post their own listings.

## Key Technologies

- **Framework**: TanStack Start (React, file-based routing)
- **Styling**: Tailwind CSS v4
- **Database**: Netlify Database (managed Postgres) via Drizzle ORM
- **Icons**: lucide-react
- **Platform**: Netlify (auto-deploys, database migrations)

## Features

- Browse room listings with cards showing price, area, amenities
- Filter by area (Civil Lines, Chowk, Amethi Road, etc.), room type, furnishing, and price range
- Full-text search across title, area, and locality
- Room detail page with contact reveal and WhatsApp button
- "Post a Room" form for landlords to list their property
- Sample data auto-seeded on first load

## Running Locally

```bash
npm install
netlify dev --port 8889
```

Open http://localhost:8889

> Requires a Netlify account and site linked via `netlify link` for the database to work locally.
