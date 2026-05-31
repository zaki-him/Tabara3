# Architecture

## Overview

Tabara3 is a monorepo-less Next.js 16 App Router application. Data flows from Server Components (or Server Actions) through Prisma into a Supabase PostgreSQL instance. The UI is built with shadcn v4 components backed by `@base-ui/react`.

```
Browser
  │
  ├──► Next.js (App Router)
  │       ├── Layout (header, footer, i18n provider, page transition wrapper)
  │       ├── Server Components (/, /donors)
  │       └── Client Components (/add-donor, LocaleToggle, PageTransition)
  │
  ├──► Server Actions (actions.ts createDonor)
  │       └── PrismaClient (adapter-pg) ──► Supabase PostgreSQL
  │
  └──► next-intl (cookie-based locale, no URL prefix)
          └── messages/en.json, messages/ar.json
```

## Directory Structure

```
prisma/
├── schema.prisma          # BloodType enum, Donor model
├── prisma.config.ts       # datasource URL from DIRECT_URL
└── migrations/            # tracked migrations

src/
├── app/
│   ├── layout.tsx         # root layout — fonts, i18n, header, footer, toaster, PageTransition
│   ├── page.tsx           # landing page (hero only)
│   ├── actions.ts         # createDonor server action
│   ├── globals.css        # Tailwind v4, theme CSS variables (dark only)
│   ├── add-donor/
│   │   └── page.tsx       # client form with useActionState → toast → redirect
│   └── donors/
│       └── page.tsx       # server component, fetches all donors via Prisma
├── components/
│   ├── locale-toggle.tsx  # cookie-based EN/AR toggle with inline SVG flags
│   ├── page-transition.tsx# framer-motion AnimatePresence wrapper
│   └── ui/                # shadcn components (button, card, select, input, label, sonner, textarea)
├── i18n/
│   └── request.ts         # next-intl config — reads NEXT_LOCALE cookie
└── lib/
    ├── prisma.ts          # singleton PrismaClient with PrismaPg adapter
    ├── enums.ts           # BloodType display type
    └── utils.ts           # cn() helper

utils/supabase/
├── server.ts              # Supabase server client
├── client.ts              # Supabase browser client
└── middleware.ts          # Supabase middleware client (for auth refresh)
```

## Key Design Decisions

### i18n — Cookie-based (no URL prefix)
- `NEXT_LOCALE` cookie read by `i18n/request.ts` on every request.
- `LocaleToggle` sets the cookie and calls `router.refresh()` — no URL change.
- Layout reads `dir`/`lang` from the resolved locale.
- `Noto Sans Arabic` is applied as `--font-sans` CSS variable only when `locale === "ar"`.

### Page Transitions
- `PageTransition` is a client component that wraps `<main>` inside the layout.
- It uses `usePathname()` as `motion.div` key so framer-motion detects route changes.
- `isInitialMount` ref suppresses the entrance animation on first load.
- `AnimatePresence` is NOT used directly — each page fade is handled by `motion.div` with `initial`/`animate` opacity. Layout remains persistent.

### Prisma v7 with Driver Adapter
- Prisma v7 replaces the legacy `datasource` URL in `schema.prisma` with a runtime adapter (`@prisma/adapter-pg`).
- `prisma.config.ts` provides the `DIRECT_URL` for the CLI (migrations, `db push`).
- `src/lib/prisma.ts` uses `PrismaPg` adapter with `DATABASE_URL` (pooler, port 6543) at runtime.
- The generator is `prisma-client` (not `prisma-client-js`), output to `src/generated/prisma`.

### Nullable lastDonation
- `lastDonation` is `DateTime?` in the schema, `@db.Date` for date-only storage.
- When the form field is empty, the field is **omitted entirely** from the Prisma `create` data object. Passing `null` throws `PrismaClientValidationError` in Prisma v7.

### Server Actions
- `createDonor` is a `"use server"` function in `src/app/actions.ts`.
- It receives `FormData`, validates fields manually, maps blood type string → Prisma enum, and calls `prisma.donor.create()`.
- On success, it revalidates `/donors` and returns `{ success: true }`.

### Theme
- Dark theme only — no `next-themes`, no `.dark` selector.
- CSS variables defined in `:root` inside `globals.css`.
- `sonner` Toaster has `theme="dark"` hardcoded.

## Data Flow

### Register a donor
```
AddDonor form (client)
  → formAction (server action)
    → validate fields
    → prisma.donor.create() → Supabase
    → revalidatePath("/donors")
    → return { success: true }
  → useEffect detects success
    → toast.success()
    → router.push("/donors")
```

### View donors
```
DonorsPage (server component)
  → prisma.donor.findMany({ orderBy: { createdAt: "desc" } })
  → map bloodType enum → display string
  → render card grid
```


## Current Status

This is a **minimal viable foundation**. The app intentionally omits:

- **Update / Delete** — No edit or removal of donor records yet.
- **Authentication** — No user accounts; anyone can register a donor.

These features will be added if the project scales and requires multi-user support, admin roles, or data ownership.

## Routes

| Path         | Type     | Description              |
| ------------ | -------- | ------------------------ |
| `/`          | Server   | Landing page (hero)      |
| `/donors`    | Server   | Donor list               |
| `/add-donor` | Client   | Registration form        |
| `/_not-found`| Dynamic  | 404 handler              |
