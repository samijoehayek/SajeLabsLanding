# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project shape

Personal marketing site for **Samijoe Hayek**, a senior full-stack and blockchain developer (7 years; ex-STC and other top MENA tech companies, now based in Dubai). The lead offer is **direct-to-developer software project delivery** — web apps, full-stack platforms, blockchain projects, RWA tokenization, Web3 integrations — for non-technical founders, established businesses, and funded startups who want senior-level work without agency overhead.

The buyer is anyone with a software project who's tired of agency markups, junior devs on the build, and 9-month timelines. Copy decisions should keep that read.

Stack: Next.js 15 App Router · React 19 · TypeScript strict · Tailwind · Framer Motion · Radix UI (shadcn-style primitives) · wagmi v2 + viem v2 + RainbowKit v2 · React Hook Form + Zod · Notion API · `@vercel/og`. Package manager: **pnpm** (≥9; lockfile is pnpm v10).

## Commands

```bash
pnpm dev            # local dev server, http://localhost:3000
pnpm build          # production build (also runs lint + tsc)
pnpm start          # serve a built app
pnpm type-check     # tsc --noEmit (fast, no compilation)
pnpm lint           # eslint via next lint
```

There is no test runner configured. The shipping signals are `pnpm type-check` (must be clean) and `pnpm build` (must compile and produce static HTML for `/` and `/apply`). Always run both after non-trivial changes.

## The two source-of-truth files

The homepage is driven by two typed files. **Edit copy and config here, not in JSX.**

- **`config/site.ts`** — site config: name, URL, founder, contact (including `calendlyUrl`), socials, nav, tech pills, credibility pills, `services[]`, and a single project-range `offer` object (typical range, delivery window, payment schedule).
- **`content/site.ts`** — page copy: `hero`, `problem`, `process`, `work.cases[]`, `technical.cards[]`, `about`, `faq.items[]`, `apply`, `footer`. Hero has commented alternative headlines kept for fast A/B swap. **There is no `pricing` export anymore** — the productized pricing section was removed in the senior-dev rebrand.

Section components in `components/sections/` consume these objects. Don't hardcode strings or prices in JSX — if you find one, move it into the relevant typed object.

## Page composition

`app/page.tsx` composes the homepage top-to-bottom: `SiteNav → Hero → Credibility → Problem → Process → Work → Technical → About → FAQ → Apply → SiteFooter`. Each section lives in `components/sections/` and reads from the two source-of-truth files. Section primitives (`Section`, `SectionEyebrow`, `SectionTitle`, `SectionLede`) live in `components/section.tsx`.

`app/apply/page.tsx` is a separate, conversion-focused paid-ad landing page (`/apply`). It uses its own minimal layout (`app/apply/layout.tsx`) with no site nav and no full footer — just a logo, the hero, the value props, an agency-vs-direct comparison, a brief about, a short FAQ, and a Calendly embed. Tracking is wired so the Meta `Lead` event fires on Calendly's `event_scheduled` callback (see `components/apply/calendly-embed.tsx`), and UTM parameters from the ad URL are persisted into the Calendly booking as prefill.

## Case studies — read this before touching `work.cases`

Three cards render in this order; the order matters for the visual hierarchy:

1. **`seedvault`** (`status: "real"`, **featured**) — flagship RWA project. **Client name anonymized** as "Cape Town-based agricultural commodities fund manager" pending public-attribution approval. Tracked in `PLACEHOLDERS.md`. Renders full-width on `lg` via the `featured` prop.
2. **`btcbacked`** (`status: "real"`) — non-custodial Bitcoin-backed lending platform. Real shipped project; outcome metrics are intentionally qualitative now (no `{{REPLACE}}` markers).
3. **`placeholder-3`** (`status: "placeholder"`) — slot for the next shipped project (could be SaaS, full-stack, or blockchain). Shows an amber **"PLACEHOLDER — replace before launch"** banner only when `NODE_ENV === "development"` (logic in `components/case-study-card.tsx`).

Per the rebrand: RWA is kept as ONE example category, not the lead. Don't remove SeedVault — it's the strongest credibility anchor — but don't reframe the rest of the site around it.

## Application form pipeline

Submission flow is wired end-to-end for ad-attribution measurement and durable storage; understand it before changing any one piece.

1. **`components/sections/apply.tsx`** — RHF + Zod form on the homepage. Validates against `applyFormSchema`. Fields: `assetType` (project type), `stage`, `timeline`, `budget`, plus name/email/whatsapp/company/description. The WhatsApp control is a composite — a country-code Select (default `+971`) glued to a digits-only input; combined into `+971 50 123 4567` format **on submit**. Honeypot field `website` must stay empty.
2. On submit, the form generates a single **`eventID`** (`lead_<ts>_<rand>`) and computes a numeric **`leadValue`** from the `BUDGET_TO_VALUE` map (`$15K–$30K`→22500, `$30K–$60K`→45000, `$60K+`→75000, `Not sure yet`→30000). Both travel in the request body to `/api/apply` **and** are passed to `trackLead` for the browser Pixel.
3. **`app/api/apply/route.ts`** (Node runtime) — validates the combined whatsapp string against `applySchema`. Zod strips unknown keys, so `eventID`, `value`, and `countryCode` are read off the raw JSON when needed. **Notion is the only persistence layer** — `appendLead()` runs first; if it fails, the route returns 202 with a "WhatsApp us directly" message. Honeypot trip → 200 silently.
4. **`lib/notion.ts`** — durable lead store. Writes to a database whose schema is documented in the file header. **The column name is still `"Asset Type"`** for backward compatibility, but it now stores PROJECT TYPE values (`"Web application"`, `"Blockchain / Web3"`, etc.). Stage column hardcoded to `New`; user advances leads manually.
5. **`lib/meta-capi.ts`** — server-side Meta CAPI events. Hashes email and phone (lowercase, digits-only for phone) with SHA-256. Forwards `_fbp` / `_fbc` cookies unhashed. No-op if `NEXT_PUBLIC_META_PIXEL_ID` or `META_CAPI_ACCESS_TOKEN` is missing. When `META_CAPI_TEST_EVENT_CODE` is set, events route to Events Manager → Test Events tab instead of counting toward production — **remove this env var when done testing**.
6. **`lib/analytics.ts`** — `trackLead()` fires browser Pixel `Lead` with `value`, `currency`, `content_category` (default `"Software project"`), `content_name`, `lead_budget`. When `eventID` is present, it's passed in fbq's 4th arg as `{ eventID }` — Meta's documented dedup channel. The same `event_id` lands in the CAPI payload, so browser + server Lead are deduplicated into a single counted conversion.

When changing the form schema (`lib/apply-schema.ts`), update **four** places in lockstep: the Zod enum in `applyFormSchema`/`applySchema`, the `<Select>` options in `apply.tsx`, the `appendLead()` call in `app/api/apply/route.ts`, and the property writes in `lib/notion.ts`. Mismatched property names cause silent Notion `validation_error` failures (visible only in Vercel logs).

The `/apply` page does NOT use this form. It funnels to a Calendly embed instead and fires Meta `Lead` from Calendly's `event_scheduled` JS callback (see `components/apply/calendly-embed.tsx`).

## Wallet / wagmi loading discipline

`lib/wagmi.ts` configures wagmi+RainbowKit for mainnet/arbitrum/base/polygon. **`app/providers.tsx` lazy-loads `<WalletProviders>` via `dynamic(..., { ssr: false })`** because wagmi/RainbowKit touch `indexedDB`/`localStorage` during render. Keep the dynamic import; loading them server-side breaks static generation and tanks LCP. The wallet button is hidden on the `/apply` page — it's a conversion-focused landing, not a Web3 product page.

## SEO + structured data

`app/layout.tsx` injects two JSON-LD blocks: `Organization` (with `makesOffer` for the four service lines) and a `Service` block for the senior-developer offering with `priceRange "$15,000-$60,000+"`. If the project-size range in `config/site.ts → offer` changes, update the `softwareServiceJsonLd.offers` low/highPrice and `priceRange` to match. OG image (`app/api/og/route.tsx`) runs on the **edge runtime** — keep it edge-compatible (no Node APIs).

The `/apply` page has its own metadata block in `app/apply/page.tsx` (or `app/apply/layout.tsx`); SEO indexing on that page is **noindex** because it's a paid-ad landing, not an organic page.

## Environment

All env vars are optional at build time — features degrade gracefully when unset. Full table is in `README.md` § 3. The high-leverage ones for production:

- `NEXT_PUBLIC_SITE_URL` — set this; canonical URL, sitemap, OG image, JSON-LD all reference it.
- `NOTION_API_KEY` + `NOTION_LEADS_DATABASE_ID` — durable lead store. Without both, the homepage form returns 202 and the lead is **not persisted anywhere**. Set Notion's row notifications on the database to get pinged.
- `NEXT_PUBLIC_META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN` — paid-acquisition is the point of `/apply`; without both, browser+server Lead dedup doesn't work.
- `META_CAPI_TEST_EVENT_CODE` — **temporary only**. Set to a `TESTxxxxx` code from Events Manager → Test Events tab to verify CAPI on production submissions, then delete and redeploy.
- `siteConfig.contact.calendlyUrl` in `config/site.ts` — the `/apply` page embeds this Calendly URL inline. Update with the real Calendly handle before launch.

## Editing & launch checklists

- `EDITING.md` — recipes for the most common edits (Calendly URL, case-study swap, founder photo, accent color, adding a chain).
- `PLACEHOLDERS.md` — every outstanding `{{REPLACE}}`/anonymized/placeholder marker with grep commands to verify before launch.

Run before shipping: `pnpm type-check`, `pnpm build`, `grep -rn "{{REPLACE" content/ app/ components/` (some markers are intentional — cross-check against PLACEHOLDERS.md), and visit `/api/og` to confirm the rendered OG matches the headline.

## Design system

Single accent color. Light: `hsl(32 95% 52%)`. Dark (default): `hsl(32 100% 58%)`. Defined in `app/globals.css` as CSS vars and mapped through `tailwind.config.ts`. Custom font sizes `text-display-{md,lg,xl,2xl}` use clamp(). Don't hardcode colors in components; reach for the existing CSS vars.

Dark mode is default; light mode toggles via `next-themes` (`enableSystem={false}`) and `<ThemeToggle>`. Framer Motion components use `useReducedMotion()` — preserve that pattern when adding new animations.
