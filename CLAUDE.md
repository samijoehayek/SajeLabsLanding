# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project shape

Single-page marketing site for SajeLabs, a boutique studio whose lead offer is **production ERC-3643 RWA tokenization** (from $60K, 8-week delivery). General blockchain + Web3 development is a deliberately-secondary capability so non-RWA inbound still converts. The buyer is a real-estate developer / family office / fund manager — not a crypto founder. Copy decisions should serve that read.

Stack: Next.js 15 App Router · React 19 · TypeScript strict · Tailwind · Framer Motion · Radix UI (shadcn-style primitives) · wagmi v2 + viem v2 + RainbowKit v2 · React Hook Form + Zod · Resend · `@vercel/og`. Package manager: **pnpm** (≥9; lockfile is pnpm v10).

## Commands

```bash
pnpm dev            # local dev server, http://localhost:3000
pnpm build          # production build (also runs lint + tsc)
pnpm start          # serve a built app
pnpm type-check     # tsc --noEmit (fast, no compilation)
pnpm lint           # eslint via next lint
```

There is no test runner configured. The shipping signals are `pnpm type-check` (must be clean) and `pnpm build` (must compile and produce static HTML for `/`). Always run both after non-trivial changes.

## The two source-of-truth files

The whole page is driven by two typed files. **Edit copy and config here, not in JSX.**

- **`config/site.ts`** — studio config: name, URL, founder, contact, socials, nav, tech pills, credibility pills, `pricingTiers[]`, `rwaServices[]`, `offer.*` legacy single-price values used in misc. spots (apply card "starting at"). The pricing section reads `siteConfig.pricingTiers`. Set `mostPopular: true` on at most one tier — the styling assumes a single recommended pick.
- **`content/site.ts`** — page copy: `hero`, `problem`, `process`, `work.cases[]`, `technical.cards[]`, `about`, `pricing` (intro + "What's not included"; per-tier features live in config), `faq.items[]`, `apply`, `footer`. Hero has commented alternative headlines kept for fast A/B swap.

Section components in `components/sections/` consume these objects. Don't hardcode strings or prices in JSX — if you find one, move it into the relevant typed object.

## Page composition

`app/page.tsx` composes the landing top-to-bottom: `SiteNav → Hero → Credibility → Problem → Process → Work → Technical → About → Pricing → FAQ → Apply → SiteFooter`. Each section lives in `components/sections/` and reads from the two source-of-truth files. Section primitives (`Section`, `SectionEyebrow`, `SectionTitle`, `SectionLede`) live in `components/section.tsx`.

## Case studies — read this before touching `work.cases`

Three cards render in this order; the order matters for the visual hierarchy:

1. **`seedvault`** (`status: "real"`, **featured**) — the flagship. Real shipped project, **client name anonymized** as "Cape Town-based agricultural commodities fund manager" pending public-attribution approval. Marked with a comment in `content/site.ts` and tracked in `PLACEHOLDERS.md`. Renders full-width on `lg` via the `featured` prop on `<CaseStudyCard>`.
2. **`btcbacked`** (`status: "real"`) — real shipped project. Outcome metrics still contain `{{REPLACE_WITH_REAL_METRIC}}` markers awaiting real numbers.
3. **`placeholder-3`** (`status: "placeholder"`) — slot for the next RWA client. Shows an amber **"PLACEHOLDER — replace before launch"** banner only when `NODE_ENV === "development"` (logic in `components/case-study-card.tsx`).

`PLACEHOLDERS.md` is the canonical punch-list of what must be replaced before launch (case-study attributions, BTCBacked metrics, `{{FOUNDER_PHOTO}}` was retired and now points at `/founder/Main.jpg`, the canonical domain, the env vars).

## Application form pipeline

Submission flow is wired end-to-end for ad-attribution measurement; understand it before changing any one piece.

1. **`components/sections/apply.tsx`** — RHF + Zod form. RWA-qualified fields: `assetType`, `assetValue`, `jurisdiction`, `stage`, `timeline`, `budget`, plus name/email/whatsapp/company/description. Honeypot field `website` must stay empty (bots fill it; backend silently 200s).
2. On submit, the form generates a single **`eventID`** (`crypto.randomUUID()` with a fallback) and computes a numeric **`leadValue`** from the `BUDGET_TO_VALUE` map (`$60K-$95K`→60000, `$95K-$150K`→95000, `$150K+`→150000, `Not RWA — different budget`→30000, default 60000). Both travel in the request body to `/api/apply` **and** are passed to `trackLead` for the browser Pixel.
3. **`app/api/apply/route.ts`** (Node runtime) — validates with `applySchema`. Zod strips unknown keys, so `eventID` and `value` are pulled off the raw JSON separately and forwarded to `sendMetaLead`. Sends Resend email to `APPLY_INBOX` (HTML only). Honeypot trip → 200 silently.
4. **`lib/meta-capi.ts`** — server-side Meta CAPI Lead event. Hashes email and phone (lowercase, digits-only for phone) with SHA-256. No-op if `NEXT_PUBLIC_META_PIXEL_ID` or `META_CAPI_ACCESS_TOKEN` is missing. When `META_CAPI_TEST_EVENT_CODE` is set, events route to Events Manager → Test Events tab instead of counting toward production — **remove this env var when done testing**.
5. **`lib/analytics.ts`** — `trackLead()` fires browser Pixel `Lead` with `value`, `currency`, `content_category`, `content_name`, `lead_budget`. When `eventID` is present, it's passed in fbq's 4th arg as `{ eventID }` — that's Meta's documented dedup channel. The same `event_id` lands in the CAPI payload, so Meta deduplicates the browser + server Lead into a single counted conversion.

When changing the form schema (`lib/apply-schema.ts`), update three places in lockstep: the Zod enum, the `<Select>` options in `apply.tsx`, and the `rows[]` table in `app/api/apply/route.ts` so leads are emailed correctly.

## Wallet / wagmi loading discipline

`lib/wagmi.ts` configures wagmi+RainbowKit for mainnet/arbitrum/base/polygon. **`app/providers.tsx` lazy-loads `<WalletProviders>` via `dynamic(..., { ssr: false })`** because wagmi/RainbowKit touch `indexedDB`/`localStorage` during render. Keep the dynamic import; loading them server-side breaks static generation and tanks LCP.

## SEO + structured data

`app/layout.tsx` injects two JSON-LD blocks: `Organization` (with `makesOffer` for the four service lines) and a `Service` block for the tokenization offering with `priceRange "$60,000-$150,000+"`. If pricing tiers in `config/site.ts` change, update the `tokenizationServiceJsonLd.offers` low/highPrice and `priceRange` to match. OG image (`app/api/og/route.tsx`) runs on the **edge runtime** — keep it edge-compatible (no Node APIs).

## Environment

All env vars are optional at build time — features degrade gracefully when unset. Full table is in `README.md` § 3. The high-leverage ones for production:

- `NEXT_PUBLIC_SITE_URL` — set this; canonical URL, sitemap, OG image, JSON-LD all reference it.
- `RESEND_API_KEY` + `APPLY_FROM` (verified domain) + `APPLY_INBOX` — without these the form silently logs and "succeeds" but no email is sent.
- `NEXT_PUBLIC_META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN` — paid-acquisition is the explicit point of the new positioning; without both, browser+server dedup doesn't work.
- `META_CAPI_TEST_EVENT_CODE` — **temporary only**. Set to a `TESTxxxxx` code from Events Manager → Test Events tab to verify CAPI on production submissions, then delete and redeploy.

## Editing & launch checklists

- `EDITING.md` — recipes for the most common edits (pricing tiers, case-study swap, founder photo, accent color, adding a chain).
- `PLACEHOLDERS.md` — every outstanding `{{REPLACE}}`/anonymized/placeholder marker with grep commands to verify before launch.

Run before shipping: `pnpm type-check`, `pnpm build`, `grep -rn "{{REPLACE" content/ app/ components/` (some markers are intentional — cross-check against PLACEHOLDERS.md), and visit `/api/og` to confirm the rendered OG matches the headline.

## Design system

Single accent color. Light: `hsl(32 95% 52%)`. Dark (default): `hsl(32 100% 58%)`. Defined in `app/globals.css` as CSS vars and mapped through `tailwind.config.ts`. Custom font sizes `text-display-{md,lg,xl,2xl}` use clamp() — the hero uses `text-display-xl` (smaller than the original `2xl`) because the long ERC-3643 headline otherwise wraps to too many rows. Don't hardcode colors in components; reach for the existing CSS vars.

Dark mode is default; light mode toggles via `next-themes` (`enableSystem={false}`) and `<ThemeToggle>`. Framer Motion components use `useReducedMotion()` — preserve that pattern when adding new animations.
