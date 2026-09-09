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

### Branding — Light theme ("Clean clinical-luxe")

- Palette: Paper `#FFFFFF` (page), Ink `#12181A` (text), Aqua `#ADDAE0` (accent — table headers, tags, section bands, dividers), Aqua-deep `#1F6475` (interactive: links/buttons/icons; white text on it = 6.7:1), Mist `#F5FAFB` (alt section bg). Semantic tokens: `paper`, `ink`/`ink-soft`/`ink-faint`, `aqua`/`aqua-soft`/`aqua-mid`/`aqua-deep`, `mist`, `line`/`line-strong`.
- Fonts: Fraunces (headings, `font-heading`), Jost (body, `font-body`).
- **CRITICAL — legacy token remap:** The site was flipped from a dark/gold theme to light without renaming classes across 57 files. In `tailwind.config.ts` the legacy token *names* were repointed to light values: `gold`/`champagne` → deep aqua `#1F6475`, `dark`/`dark-light`/`dark-lighter` → white/mist surfaces, `beige` → `#EFF6F7`. So `bg-dark` renders **white** and `text-gold` renders **aqua** — the names lie; trust the values. Prefer the new semantic tokens (`ink`, `aqua`, `mist`) for any new code.
- Tailwind custom: `text-gold-gradient`/`text-shimmer` (now aqua gradients), `glass` (light), `eyebrow`/`surface-card`/`divider-aqua` utilities, `shimmer`/`fadeUp`/`slideIn` animations, `glow`/`glow-lg` box shadows (aqua-tinted).

### Key Libraries

- **Framer Motion** — All scroll animations, page transitions, interactive elements. Client components using it need `'use client'`.
- **React Hook Form + Zod** — Booking form with `@hookform/resolvers`. Schemas in `src/lib/validators.ts`.
- **date-fns** — Date formatting/manipulation in booking calendar and admin tables.
- **Nodemailer over Gmail SMTP** — Email notifications on booking (`src/lib/email.ts`). Authenticates as a dedicated send-only mailbox (`GMAIL_USER` + `GMAIL_APP_PASSWORD`) rather than an API provider, because providers can only send from a domain whose DNS you control for SPF/DKIM and the studio has no verified domain yet. Silent no-op if either env var is unset, so local and preview never send. Gmail rewrites `From` to the authenticated account regardless of what is passed. Requires the Node.js runtime — Edge cannot open outbound TCP.

## Environment Variables

```
ADMIN_PASSWORD          # Required. Admin login + HMAC signing secret
BLOB_READ_WRITE_TOKEN   # Required. Auto-set when Vercel Blob Store is connected
NEXT_PUBLIC_SITE_URL    # Optional. Sitemap/SEO + the links inside booking emails.
                        #   Build-time inlined (NEXT_PUBLIC_*) — changing it needs a
                        #   rebuild, not just a redeploy.
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL  # Optional. Contact section map
GMAIL_USER              # Optional. Sending mailbox for booking emails
GMAIL_APP_PASSWORD      # Optional. Google App Password (needs 2-Step Verification
                        #   on that account; not the account password)
STUDIO_EMAIL            # Optional. Extra notification recipient — added to the
                        #   hardcoded studio address, does not replace it
```

Both `GMAIL_*` vars must be present or email is a silent no-op.

## Vercel Deployment Notes

- All API routes use `export const dynamic = "force-dynamic"` to prevent static rendering errors.
- Middleware runs on Edge Runtime — cannot use Node.js `crypto` module, must use `crypto.subtle`.
- Gallery images stored as Vercel Blobs with public access; `img.filename` holds the full blob URL.
- No `src/app/page.tsx` at root — the home page lives in `src/app/(public)/page.tsx` via the route group.
- Blob `put` calls must include `allowOverwrite: true` to avoid "blob already exists" build errors.
- All `fetch(blobUrl)` calls must include `cache: "no-store"` — Next.js caches fetch by default.
