# CMS Admin Panel — Design Spec
**Date:** 2026-04-02  
**Project:** Velvet Brow Studio (Next.js 14, Vercel Blob)  
**Status:** Approved

---

## Goal

Extend the existing admin panel so the studio owner can edit services content (text, pricing, FAQs, hero images) and site-wide content (contact info, business hours) without touching code or redeploying.

---

## Approach

Migrate services and site constants from hardcoded TypeScript files into Vercel Blob JSON documents, using the existing `readJsonFile`/`writeJsonFile` data layer. Add two new admin pages and five new API routes. No new dependencies or infrastructure.

---

## Data Layer

### New Blob Files

| Blob path | Replaces | Shape |
|---|---|---|
| `data/services.json` | `src/lib/services.ts` static array | `Service[]` |
| `data/site-content.json` | `src/lib/constants.ts` BRAND / BUSINESS_HOURS / SOCIAL_LINKS | `SiteContent` object |

### `Service` shape (unchanged from current TypeScript type)
```ts
{
  slug: string
  name: string
  shortDescription: string
  description: string
  duration: string
  priceRange: string
  touchUpPrice: string
  image: string           // local public path initially; replaced with blob URL after first image upload
  processSteps: { title: string; description: string }[]
  healingTimeline: { day: string; description: string }[]
  faqs: { question: string; answer: string }[]
}
```

**Note on `image` field:** After seeding, `image` holds local paths like `/images/custom/microblading.png`. After first admin upload, it holds a full Vercel Blob URL. Both formats work for `<img>` tags. OG metadata passes this value directly — local paths work at render time on Vercel; blob URLs also work. No special migration needed.

### `SiteContent` shape
```ts
{
  brand: {
    name: string
    tagline: string
    description: string
    location: string
    address: string
    phone: string
    email: string
    instagramHandle: string   // display value e.g. "@velvetbrowstudio"
  }
  businessHours: Record<string, { open: string; close: string } | null>
  socialLinks: { instagram: string; tiktok: string; facebook: string }
}
```

**Note:** `brand.instagramHandle` is the display handle (e.g. `@velvetbrowstudio`) used in contact text. `socialLinks.instagram` is the full URL used in footer links. These are separate fields edited independently in the admin. The original `BRAND.instagram` field is renamed to `instagramHandle` to make the distinction explicit.

### New data.ts helpers for single-object blobs

`SiteContent` is a single object, not an array. The existing `readJsonFile<T>(): Promise<T[]>` is incompatible. Add two new helpers to `src/lib/data.ts`:

```ts
readJsonObject<T>(filename: string): Promise<T | null>
writeJsonObject<T>(filename: string, data: T): Promise<void>
```

These follow the same Blob read/write pattern as the existing helpers but without array wrapping.

### Seeding Strategy

On first call, if the blob file does not exist, the async getter writes the current hardcoded defaults to Blob and returns them. Concurrent seeding (multiple requests hitting a cold deploy simultaneously) is intentionally not locked — both writes contain identical default data, so the last write wins without data loss. This is acceptable given the low-traffic nature of the site.

### Service update helper

`updateInJsonFile` requires `T extends { id: string }` which is incompatible with `Service` (uses `slug`). Service updates use a manual read-find-by-slug-overwrite-write pattern inline in the API route. No new generic helper is needed.

---

## API Routes

All routes live under `/api/admin/`. They are protected both by the existing middleware AND by inline cookie validation in each handler (defense in depth). The middleware matcher will be extended to include `/api/admin/:path*`.

| Route | Method | Body | Purpose |
|---|---|---|---|
| `/api/admin/services` | GET | — | Return `services.json` array |
| `/api/admin/services/[slug]` | PUT | `Partial<Service>` (no image) | Update service text/metadata |
| `/api/admin/services/[slug]/image` | PUT | `multipart/form-data` with `file` | Replace service hero image in Blob |
| `/api/admin/content` | GET | — | Return `site-content.json` |
| `/api/admin/content` | PUT | `Partial<SiteContent>` | Update site content |

**Image replacement:** When uploading a new service image, if the current `service.image` is a Vercel Blob URL (starts with `https://`), delete the old blob with `del()` before storing the new one. Local public paths are not deleted (they live in the repo, not in Blob storage).

---

## Admin Pages

### `/admin/services`
- Card grid showing all 5 services (name + current hero image thumbnail)
- Clicking a card navigates to `/admin/services/[slug]`

### `/admin/services/[slug]`
- **Hero image:** current image preview + upload button (replaces on save, deletes old blob if applicable)
- **Text fields:** name, short description, full description, duration, price, touch-up price
- **Dynamic lists** (each with add row / remove row / reorder):
  - Process Steps (title + description per row)
  - Healing Timeline (day label + description per row)
  - FAQs (question + answer per row)
- **Save** button — PUT to `/api/admin/services/[slug]`, shows success/error toast
- Back link to `/admin/services`

### `/admin/content`
Two independent save sections on one page:

**Studio Info section:**  
Fields: name, tagline, description, location, address, phone, email, Instagram handle (display), Instagram URL, TikTok URL, Facebook URL  
Save button → PUT to `/api/admin/content`

**Business Hours section:**  
Row per day (Mon–Sun), each with open/close time text inputs and a "Closed" toggle that nulls the day  
Save button → PUT to `/api/admin/content`

Both pages use existing `Card`, `Input`, `Button`, `Spinner` UI components and match the dark-gold admin design system.

---

## Public Page Changes

### `src/lib/data.ts`
Add `readJsonObject<T>` and `writeJsonObject<T>` helpers.

### `src/lib/services.ts`
- Keep existing `Service` type export
- Replace static `services` array with:
  - `getServices(): Promise<Service[]>` — reads blob, seeds on first call
  - `getServiceBySlug(slug: string): Promise<Service | undefined>`
  - `getAllServiceSlugs(): Promise<string[]>`

### `src/lib/constants.ts`
- Keep `BOOKING_TIMES` and `NAV_LINKS` as static exports (not CMS-editable)
- Replace `BRAND`, `BUSINESS_HOURS`, `SOCIAL_LINKS` with:
  - `getSiteContent(): Promise<SiteContent>` — reads blob, seeds on first call
  - Convenience wrappers: `getBrand()`, `getBusinessHours()`, `getSocialLinks()`
- Export `SiteContent` type

### Specific call sites to update

| File | Change |
|---|---|
| `src/app/(public)/page.tsx` | `await getSiteContent()`, pass brand/hours/social as props to client section components |
| `src/app/(public)/services/[slug]/page.tsx` | `await getServiceBySlug(slug)` in `generateMetadata` and page body; `await getAllServiceSlugs()` in `generateStaticParams` |
| `src/app/sitemap.ts` | Make export `async`, `await getAllServiceSlugs()` |
| `src/components/sections/ContactSection.tsx` | Remove direct constants import; accept `brand`, `businessHours` as props |
| `src/components/layout/Footer.tsx` | Remove direct constants import; accept `brand`, `socialLinks` as props |
| `src/app/(public)/layout.tsx` or root layout | Make `async`, `await getSiteContent()`, pass `brand`/`socialLinks` as props to `Footer` and `MobileMenu` (via `Navbar`) |
| `src/components/public/MobileMenu.tsx` | Remove direct `SOCIAL_LINKS` import; accept `socialLinks` as prop from `Navbar` |
| `src/components/public/Navbar.tsx` | Accept `socialLinks` prop, pass down to `MobileMenu` |

### Root layout `app/layout.tsx` — JSON-LD handling

Next.js 14 does not support `async` root layouts. `BRAND` is used in a JSON-LD `<script>` block inside the root layout. Resolution: extract the JSON-LD block into a separate async Server Component (`<JsonLdScript />`) that calls `await getSiteContent()` internally. The root layout renders `<JsonLdScript />` as a child. This is the standard Next.js pattern for async data in non-async layouts.

### Client component data flow

`ContactSection` and `Footer` are `'use client'` components. They cannot call async functions directly. The home page server component (`/src/app/(public)/page.tsx`) will `await getSiteContent()` once and pass the relevant slices as props:
- `<ContactSection brand={brand} businessHours={businessHours} />`
- `Footer` is in the public layout (`src/app/(public)/layout.tsx`), which must also become an async Server Component to fetch and pass data to Footer.

---

## Middleware Update (`src/middleware.ts`)

Two changes required:

1. Extend the `matcher` config to include API admin routes:
```ts
matcher: ["/admin/:path*", "/api/admin/:path*"]
```

2. Update the runtime `pathname` guard in the middleware function body. The current check is `pathname.startsWith("/admin")` — this does NOT match `/api/admin/*` because `"/api/admin"` does not start with `"/admin"`. The guard must be updated to:
```ts
if (
  (pathname.startsWith("/admin") && pathname !== "/admin/login") ||
  pathname.startsWith("/api/admin")
) {
  // validate token
}
```
Without this change the matcher extension has no effect — all `/api/admin/*` requests would pass through unauthenticated.

---

## Sidebar Update (`AdminSidebar.tsx`)

Add two nav items after the existing "Gallery" entry:
- **Services** → `/admin/services` (pencil/edit icon)
- **Site Content** → `/admin/content` (cog/settings icon)

---

## Out of Scope

- Reordering services (order is fixed by slug)
- Adding or removing services (5 services are fixed)
- Testimonials editing
- About section text editing
- Any change to booking flow, appointments, consent forms, mailing list

---

## Implementation Order

1. Add `readJsonObject`/`writeJsonObject` to `src/lib/data.ts`
2. Update `src/lib/services.ts` — async getters with Blob seeding
3. Update `src/lib/constants.ts` — async getters with Blob seeding, `SiteContent` type
4. Extend middleware matcher to include `/api/admin/:path*`
5. Update public pages and components to use async getters (all call sites in table above)
6. Add API routes: services GET, services/[slug] PUT, services/[slug]/image PUT, content GET/PUT
7. Build `/admin/services` list page + `/admin/services/[slug]` edit page
8. Build `/admin/content` page
9. Update `AdminSidebar.tsx` with new nav items
