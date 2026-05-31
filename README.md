# Tabara3 — Blood Donation Web App

**Tabara3** (Arabic: تبرّع, "Donate") is a responsive blood donation registry built with Next.js 16, shadcn/ui, TailwindCSS v4, Supabase + Prisma, Arabic i18n, and framer-motion page transitions.

## Features

- **Landing page** — Hero section with a call to donate or view registered donors.
- **Add Donor** — Form to register a donor (name, blood type, age, phone, address, optional last donation date).
- **Donors List** — Grid of registered donors with blood-type badges and contact info.
- **Arabic i18n** — Cookie-based locale toggle (`NEXT_LOCALE`), inline US/DZ SVG flag buttons, Noto Sans Arabic font for Arabic.
- **Dark theme** — Charcoal background (`oklch(0.11 0 0)`), red primary (`oklch(0.62 0.23 25)`).
- **Page transitions** — Fade-in/out via `AnimatePresence` + `motion.div`.

## Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)           |
| UI           | shadcn v4 (`@base-ui/react`), TailwindCSS v4 |
| Animation    | framer-motion                                |
| Backend      | Supabase (PostgreSQL) + Prisma v7            |
| i18n         | next-intl (cookie-based, no URL prefix)      |
| Form         | React `useActionState`                       |
| Toasts       | sonner                                       |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
DATABASE_URL=your-db-url
DIRECT_URL=your-direct-url
```

## Database

Prisma manages the schema. Run migrations:

```bash
npx prisma db push    # push schema to Supabase
npx prisma migrate dev   # create & apply migrations
```

The `Donor` model stores: `id`, `name`, `bloodType` (enum), `age`, `phone`, `address`, `lastDonation?` (nullable `Date`), `createdAt`.

## Scripts

| Command           | Description        |
| ----------------- | ------------------ |
| `npm run dev`      | Dev server (Turbo) |
| `npm run build`    | Production build   |
| `npm run start`    | Start production   |
| `npm run lint`     | ESLint             |

## Status

This project is **incomplete**. The following features are planned for future iterations if the project gains traction and expects multiple users:

- **Update / Delete donors** — Edit and remove donor records.
- **Authentication** — User accounts, roles, and session management.
- **Admin dashboard** — Manage donors, view analytics, etc.

## License

MIT
