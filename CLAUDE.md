# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Start production**: `npm start`

## Architecture

Next.js 14 App Router site for Velvet Brow Studio — a luxury permanent makeup studio. Deployed on Vercel with no traditional database.

### Route Groups

- `src/app/(public)/` — Public pages (home, service detail). Layout includes Navbar, Footer, ScrollToTop, NewsletterModal.
- `src/app/book/` — Multi-step booking wizard (4 steps: service → date/time → client info → review). Minimal layout.
- `src/app/admin/` — Protected admin panel with sidebar layout. All routes except `/admin/login` require auth via middleware.
- `src/app/api/` — API route handlers. All marked `force-dynamic` for Vercel compatibility.

### Data Layer (`src/lib/data.ts`)

Uses **Vercel Blob** as a JSON document store. Each data collection (appointments, customers, subscribers, gallery, instagram) is stored as a JSON array in a blob at `data/{collection}.json`. CRUD operations: `readJsonFile`, `writeJsonFile`, `appendToJsonFile`, `updateInJsonFile`, `deleteFromJsonFile`. Gallery images are also uploaded to Vercel Blob directly.

### Auth (`src/lib/auth.ts` + `src/middleware.ts`)

Stateless HMAC-signed cookies — no session store. Token format: `{timestamp}:{hmac_sha256}`. Auth.ts uses Node.js `crypto.createHmac`; middleware uses Web Crypto API (`crypto.subtle`) for Edge Runtime compatibility. Both must produce identical HMAC output. 8-hour expiry. Single password from `ADMIN_PASSWORD` env var.

### Branding

- Colors: Gold `#C9A96E`, Champagne `#D4AF37`, Beige `#F5F0E8`, Dark `#0A0A0A`
- Fonts: Playfair Display (headings, `font-heading` class), Montserrat (body, default)
- Tailwind custom: `text-gold-gradient` CSS class, `shimmer`/`fadeUp`/`slideIn` animations, `glow`/`glow-lg` box shadows

### Key Libraries

- **Framer Motion** — All scroll animations, page transitions, interactive elements. Client components using it need `'use client'`.
- **React Hook Form + Zod** — Booking form with `@hookform/resolvers`. Schemas in `src/lib/validators.ts`.
- **date-fns** — Date formatting/manipulation in booking calendar and admin tables.

### Services Data (`src/lib/services.ts`)

Static array of 5 services (Microblading, PhiBrows, Combo Brows, Lip Blush, Permanent Eyeliner) with full content: descriptions, process steps, healing timelines, FAQs, pricing. Used by both public service pages and booking flow. Helper functions: `getServiceBySlug()`, `getAllServiceSlugs()`.

## Environment Variables

```
ADMIN_PASSWORD          # Required. Admin login + HMAC signing secret
BLOB_READ_WRITE_TOKEN   # Required. Auto-set when Vercel Blob Store is connected
NEXT_PUBLIC_SITE_URL    # Optional. Used in sitemap/SEO
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL  # Optional. Contact section map
```

## Vercel Deployment Notes

- All API routes use `export const dynamic = "force-dynamic"` to prevent static rendering errors.
- Middleware runs on Edge Runtime — cannot use Node.js `crypto` module, must use `crypto.subtle`.
- Gallery images stored as Vercel Blobs with public access; `img.filename` holds the full blob URL.
- No `src/app/page.tsx` at root — the home page lives in `src/app/(public)/page.tsx` via the route group.
