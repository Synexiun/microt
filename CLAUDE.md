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

- `src/app/(public)/` — Public pages (home, service detail). Layout includes Navbar, Footer, ScrollToTop, NewsletterModal. Layout is async and fetches `brand`/`socialLinks` from blob to pass as props to client components.
- `src/app/book/` — Multi-step booking wizard (4 steps: service → date/time → client info → review). Minimal layout.
- `src/app/admin/` — Protected admin panel with sidebar layout. All routes except `/admin/login` require auth via middleware. Sidebar has two sections: Operations (Dashboard, Appointments, Customers, Consent Forms, Mailing List, Gallery, Instagram) and Content (Testimonials, Services, Site Content).
- `src/app/api/` — API route handlers. All marked `force-dynamic` for Vercel compatibility.

### Data Layer (`src/lib/data.ts`)

Uses **Vercel Blob** as a JSON document store. Each data collection is stored as a JSON array in a private blob at `data/{collection}.json`. Collections: appointments, customers, subscribers, gallery, instagram, services, testimonials. Site content stored as a single object at `data/site-content.json`.

CRUD operations: `readJsonFile`, `writeJsonFile`, `appendToJsonFile`, `updateInJsonFile`, `deleteFromJsonFile`, `readJsonObject`, `writeJsonObject`.

**CRITICAL:** All `fetch` calls reading from Vercel Blob URLs must include `cache: "no-store"`. Next.js patches `fetch` and caches by default — without this, CMS updates do not reflect on public pages until server restart.

### CMS Admin Panel

All public content is editable without a redeploy:

- **`/admin/testimonials`** — Full CRUD for homepage carousel testimonials. Stored in `data/testimonials.json` via `src/lib/testimonials.ts`.
- **`/admin/services`** — Reorder services list. Each service editable at `/admin/services/[slug]`: name, price, duration, short/full description, image upload, processSteps, healingTimeline, FAQs. Stored in `data/services.json` via `src/lib/services.ts` (`getServices()`, `getServiceBySlugAsync()`, `getAllServiceSlugsAsync()`).
- **`/admin/content`** — Edit brand info (name, tagline, phone, email, address, instagram handle), social links, and per-day business hours. Stored in `data/site-content.json` via `src/lib/constants.ts` (`getSiteContent()`, `getBrand()`, `getBusinessHours()`).

Admin API routes: `/api/admin/services`, `/api/admin/services/[slug]`, `/api/admin/services/[slug]/image`, `/api/admin/content`, `/api/admin/testimonials`, `/api/admin/testimonials/[id]`.

### Auth (`src/lib/auth.ts` + `src/middleware.ts`)

Stateless HMAC-signed cookies — no session store. Token format: `{timestamp}:{hmac_sha256}`. Auth.ts uses Node.js `crypto.createHmac`; middleware uses Web Crypto API (`crypto.subtle`) for Edge Runtime compatibility. Both must produce identical HMAC output. 8-hour expiry. Single password from `ADMIN_PASSWORD` env var.

**CRITICAL:** `/api/admin/auth` is explicitly excluded from middleware protection — it is the login endpoint itself and cannot require a session to be accessed.

### Prop-Drilling Pattern for Public Client Components

Public client components (Navbar, Footer, MobileMenu, ContactSection, TestimonialsSection, InstagramSection) do not fetch data themselves. Their async server-component parents fetch once and pass data as props. This avoids client-side API calls for initial page data.

- `src/app/(public)/layout.tsx` (async) → fetches `brand`, `socialLinks` → passes to Navbar, Footer
- `src/app/(public)/page.tsx` (async) → fetches `getSiteContent()` + `getTestimonials()` → passes to ContactSection, TestimonialsSection, InstagramSection

### Seeding Pattern

Blob collections seed from static defaults on first read:
- `getServices()` in `services.ts` — seeds from static `services` array if blob is empty
- `getTestimonials()` in `testimonials.ts` — seeds from `sampleTestimonials` if blob is empty
- `getSiteContent()` in `constants.ts` — seeds from `DEFAULT_SITE_CONTENT` if blob is empty

### Branding

- Colors: Gold `#C9A96E`, Champagne `#D4AF37`, Beige `#F5F0E8`, Dark `#0A0A0A`
- Fonts: Playfair Display (headings, `font-heading` class), Montserrat (body, default)
- Tailwind custom: `text-gold-gradient` CSS class, `shimmer`/`fadeUp`/`slideIn` animations, `glow`/`glow-lg` box shadows

### Key Libraries

- **Framer Motion** — All scroll animations, page transitions, interactive elements. Client components using it need `'use client'`.
- **React Hook Form + Zod** — Booking form with `@hookform/resolvers`. Schemas in `src/lib/validators.ts`.
- **date-fns** — Date formatting/manipulation in booking calendar and admin tables.
- **Resend** — Email notifications on booking. Requires `RESEND_API_KEY` + `STUDIO_EMAIL` env vars. Fire-and-forget; silent no-op if env vars not set.

## Environment Variables

```
ADMIN_PASSWORD          # Required. Admin login + HMAC signing secret
BLOB_READ_WRITE_TOKEN   # Required. Auto-set when Vercel Blob Store is connected
NEXT_PUBLIC_SITE_URL    # Optional. Used in sitemap/SEO
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL  # Optional. Contact section map
RESEND_API_KEY          # Optional. Enables booking email notifications
STUDIO_EMAIL            # Optional. Destination for booking notification emails
```

## Vercel Deployment Notes

- All API routes use `export const dynamic = "force-dynamic"` to prevent static rendering errors.
- Middleware runs on Edge Runtime — cannot use Node.js `crypto` module, must use `crypto.subtle`.
- Gallery images stored as Vercel Blobs with public access; `img.filename` holds the full blob URL.
- No `src/app/page.tsx` at root — the home page lives in `src/app/(public)/page.tsx` via the route group.
- Blob `put` calls must include `allowOverwrite: true` to avoid "blob already exists" build errors.
- All `fetch(blobUrl)` calls must include `cache: "no-store"` — Next.js caches fetch by default.
