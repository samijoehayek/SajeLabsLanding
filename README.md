# SajeLabs — landing page

A production-ready landing page for SajeLabs, a boutique Web3 development studio based in Dubai. Built with Next.js 15, React 19, TypeScript strict, Tailwind, shadcn-style primitives, wagmi v2, and RainbowKit v2.

**Stack**: Next.js 15 · React 19 · TypeScript strict · Tailwind CSS · Framer Motion · Radix UI · wagmi v2 / viem v2 · RainbowKit v2 · React Hook Form + Zod · Resend · `@vercel/og`

## 1. Run locally

```bash
pnpm install
cp .env.local.example .env.local   # edit values (all optional)
pnpm dev                            # http://localhost:3000
```

Required: **Node 20+**, **pnpm 9+**.

Useful scripts:

```bash
pnpm dev           # dev server
pnpm build         # production build
pnpm start         # run production build
pnpm type-check    # tsc --noEmit
pnpm lint          # eslint
```

Nothing in `.env.local.example` is required for the site to run — all integrations (Resend, Meta Pixel, GA4, WalletConnect) degrade gracefully when their variables are missing.

## 2. Edit copy without touching React

All page copy lives in **`content/site.ts`** as a typed object. All config (studio name, contact, offer price, social links, nav items) lives in **`config/site.ts`**.

See `EDITING.md` for a one-glance cheat sheet.

## 3. Deploy to Vercel

```bash
# First deploy
pnpm dlx vercel
# Subsequent deploys
pnpm dlx vercel --prod
```

Or connect the repo at <https://vercel.com/new>. No build customisation needed.

Set these in the Vercel dashboard → Project → Settings → Environment Variables:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | production | canonical URL, sitemap, OG |
| `RESEND_API_KEY` | optional | transactional email for form submissions |
| `APPLY_INBOX` | optional | inbox that receives new leads (defaults to `samijoehayek1@gmail.com`) |
| `APPLY_FROM` | optional | "From" address on the lead email (Resend-verified domain) |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional | Meta Pixel (client) |
| `META_CAPI_ACCESS_TOKEN` | optional | Meta Conversions API (server) |
| `NEXT_PUBLIC_GA4_ID` | optional | Google Analytics 4 |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | optional | WalletConnect project — <https://cloud.reown.com> |
| `NEXT_PUBLIC_ETH_RPC` / `NEXT_PUBLIC_ARB_RPC` / `NEXT_PUBLIC_BASE_RPC` | optional | custom RPC endpoints |

## 4. Resend setup (application form)

1. Create an account at <https://resend.com>, generate an API key.
2. Add and verify your sending domain (`sajelabs.com` once purchased).
3. Set `RESEND_API_KEY` and `APPLY_FROM` in your env (see table above). Until the domain is verified you can use `onboarding@resend.dev` as `APPLY_FROM` — deliverability is fine for testing only.
4. All form submissions POST to `/api/apply`, which validates with Zod, sends to `APPLY_INBOX`, and fires a Meta CAPI "Lead" event (if configured).

## 5. Meta Pixel + CAPI setup

1. Create a Pixel in Meta Events Manager, grab the Pixel ID.
2. Set `NEXT_PUBLIC_META_PIXEL_ID` — the Pixel loads automatically and fires `PageView` on mount and `Lead` on successful form submission (see `lib/analytics.ts`).
3. For server-side deduplicated events, generate a Conversions API access token from the same Pixel and set `META_CAPI_ACCESS_TOKEN`. `/api/apply` will fire a server-side `Lead` event with hashed email/phone.

## 6. Adding a new case study

Edit `content/site.ts` → `work.cases`. Add a new object matching the existing `CaseStudyData` shape:

```ts
{
  id: "your-case",
  status: "real",             // or "placeholder"
  name: "Project name",
  positioning: "One-line market position.",
  problem: "One paragraph.",
  approach: "One paragraph.",
  outcome: ["metric 1", "metric 2", "metric 3"],
  stack: ["Next.js", "Solidity", "..."],
  terminal: {
    command: "sajelabs inspect --project your-case",
    lines: ["✓ shipped", "✓ audited", "..."],
  },
  link: { label: "View case", href: "#apply" },
  explorerLabel: "View on Etherscan" | null,
  explorerHref: "https://etherscan.io/address/0x..." | null,
}
```

Then render it in `components/sections/work.tsx` by adding another `<CaseStudyCard data={…} index={n} />` row.

## 7. Replacing placeholder case studies

**Two case studies ship as placeholders**: `vellos` and `placeholder-3`. They must be replaced before going live.

Every placeholder is marked in three ways:

1. `status: "placeholder"` on the case data in `content/site.ts`.
2. A `{/* PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE */}` JSX comment above each render site in `components/sections/work.tsx`.
3. A visible amber banner ("PLACEHOLDER — replace before launch") on each card when `NODE_ENV === "development"`.
4. A "Case study" pill (vs. "Shipped") in the card header.

To replace:

1. Edit the case object in `content/site.ts` — set `status: "real"`, replace all `{{REPLACE}}` copy, fill real metrics, stack, terminal output.
2. Set `explorerHref` to a real contract address or `null`.
3. Run `grep -rn "{{REPLACE" content/ app/ components/` to confirm nothing remains.
4. See `PLACEHOLDERS.md` for the full punch list.

## 8. Design system

- Accent: **warm amber** (`hsl(32, 100%, 58%)` dark / `hsl(32, 95%, 52%)` light) — Bitcoin-adjacent, single accent color throughout.
- Fonts: Geist Sans + Geist Mono via `next/font`.
- All tokens live in `app/globals.css` (CSS vars) and `tailwind.config.ts` (Tailwind mappings). Never hardcode colors in components.
- Dark mode is default; light mode works via `ThemeToggle`.

## 9. Project layout

```
landing/
├── app/
│   ├── api/
│   │   ├── apply/route.ts        ← form handler (Resend + Meta CAPI)
│   │   └── og/route.tsx          ← OG image (@vercel/og)
│   ├── layout.tsx                ← metadata, JSON-LD, font wiring
│   ├── page.tsx                  ← home: composes all sections
│   ├── providers.tsx             ← theme + query + wallet (client)
│   ├── sitemap.ts / robots.ts
│   └── globals.css               ← CSS variables + base styles
├── components/
│   ├── sections/                 ← one file per page section
│   ├── ui/                       ← shadcn-style primitives (customised)
│   └── …                         ← wallet-button, analytics, etc.
├── config/site.ts                ← studio config (single source of truth)
├── content/site.ts               ← page copy (single source of truth)
├── lib/                          ← utils, schemas, integrations
└── public/
```

## 10. Performance

- Static HTML for `/`, revalidating every 6 hours (GitHub activity).
- Wagmi + RainbowKit are lazy-loaded client-side only (dynamic import, `ssr: false`) so they never block LCP.
- All images go through `next/image`. The OG image runs on the Edge.
- Framer Motion respects `prefers-reduced-motion`.

---

Built for GCC founders shipping real Web3. صُنع في دبي.
