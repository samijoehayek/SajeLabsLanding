# SajeLabs — landing page

A production-ready landing page for SajeLabs, a boutique RWA tokenization studio based in Dubai. Lead offer is ERC-3643 production tokenization (from $60K, 8-week delivery), with general blockchain + full-stack Web3 development as a secondary capability so non-RWA inbound still converts. Built with Next.js 15, React 19, TypeScript strict, Tailwind, shadcn-style primitives, wagmi v2, and RainbowKit v2.

**Stack**: Next.js 15 · React 19 · TypeScript strict · Tailwind CSS · Framer Motion · Radix UI · wagmi v2 / viem v2 · RainbowKit v2 · React Hook Form + Zod · Notion API · `@vercel/og`

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

Nothing in `.env.local.example` is required for the site to run — all integrations (Notion, Meta Pixel, GA4, WalletConnect) degrade gracefully when their variables are missing.

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
| `NOTION_API_KEY` | strongly recommended | durable lead store — without it submissions return 202 and aren't persisted anywhere |
| `NOTION_LEADS_DATABASE_ID` | strongly recommended | Notion database that receives leads |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional | Meta Pixel (client) |
| `META_CAPI_ACCESS_TOKEN` | optional | Meta Conversions API (server) |
| `NEXT_PUBLIC_GA4_ID` | optional | Google Analytics 4 |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | optional | WalletConnect project — <https://cloud.reown.com> |
| `NEXT_PUBLIC_ETH_RPC` / `NEXT_PUBLIC_ARB_RPC` / `NEXT_PUBLIC_BASE_RPC` | optional | custom RPC endpoints |

## 4. Notion setup (durable lead store)

The application form's only persistence layer is a Notion database. Resend was removed — Notion both stores the lead and acts as the lightweight CRM (Stage status column lets you move leads through `New / In review / Closed`).

1. **Create the database** in Notion. Required column names + types (case-sensitive — the API rejects mismatches):

   | Column | Notion type |
   |---|---|
   | `Name` | Title |
   | `Email` | Email |
   | `WhatsApp` | Phone number |
   | `Company` | Text |
   | `Asset Type` | Text |
   | `Stage` | Status (must include a `New` option; the API auto-sets every new lead to `New`) |
   | `Project Stage` | Text (the applicant's stated stage — separate from the CRM `Stage`) |
   | `Timeline` | Text |
   | `Budget` | Text |
   | `Description` | Text |

2. **Create an integration** at <https://www.notion.so/my-integrations> → New integration → name it (e.g. "SajeLabs Leads") → submit. Copy the **Internal Integration Secret**.

3. **Connect the integration to the database** — open the database → top-right `···` → **Connections** → add the integration. Without this step the API returns `object_not_found`.

4. **Get the database ID** — the 32-char hex string between `/<workspace>/` and `?v=` in the database URL.

5. **Set Vercel env vars**:
   - `NOTION_API_KEY` = the integration secret
   - `NOTION_LEADS_DATABASE_ID` = the database ID

6. **Set up notifications** — Notion → database → top-right `···` → **Notifications** → "Notify me when a row is added". This replaces the email channel that Resend used to provide.

If both env vars are missing, the form returns a 202 with a "WhatsApp us directly" message. If they're set but the API call fails, the lead is lost — Vercel function logs will show `[notion] append failed: <status>`.

### Application form fields

The form is RWA-qualified — the budget bracket acts as the pre-qualification filter so a $5M asset owner doesn't enter a $60K tokenization conversation by mistake.

| Field | Type | Required |
|---|---|---|
| Full name | text | yes |
| Email | email | yes |
| WhatsApp | composite — country-code Select (default `+971`, list in `lib/country-codes.ts`) glued to a digits-and-spaces input. The two are combined into `+971 50 123 4567` format before POSTing. | yes |
| Company / project | text | optional |
| **Asset type** | select — Real estate / Private credit / Commodities / Fund / Other / Not RWA — general blockchain dev | yes |
| Project stage | select — Concept / Legal structuring / Ready to build / Already engaged another firm | yes |
| Timeline | select — ASAP / 1 month / 2-3 months / Flexible | yes |
| Budget bracket | select — `$60K-$95K` / `$95K-$150K` / `$150K+` / Not RWA — different budget | yes |
| Brief project description | textarea (500 char limit) | yes (min 20) |

The form-side schema (`applyFormSchema`) and the API-side schema (`applySchema`) both live in `lib/apply-schema.ts`. The form validates `countryCode` + a digits-only WhatsApp; the API validates the combined international string. Update enums in lockstep with `components/sections/apply.tsx` and `lib/country-codes.ts` if you change the options.

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

**One case study ships as a placeholder**: `placeholder-3` (the third RWA pilot slot). It must be replaced before going live.

The two flagship cards — `seedvault` (anonymized, real) and `btcbacked` (real, partial metrics) — are real shipped projects. SeedVault's client name is anonymized pending public-attribution approval; `PLACEHOLDERS.md` tracks the punch list.

The third placeholder is marked in three ways:

1. `status: "placeholder"` on the case data in `content/site.ts`.
2. A `{/* PLACEHOLDER — replace once second RWA client signs */}` JSX comment above its render site in `components/sections/work.tsx`.
3. A visible amber banner ("PLACEHOLDER — replace before launch") on the card when `NODE_ENV === "development"`.
4. A "Case study" pill (vs. "Shipped") in the card header.

To replace:

1. Edit `work.cases[2]` in `content/site.ts` — set `status: "real"`, replace all `{{REPLACE}}` copy, fill real metrics, stack, terminal output.
2. Set `explorerHref` to a real contract address or leave `null`.
3. Run `grep -rn "{{REPLACE" content/ app/ components/` to confirm nothing remains.
4. See `PLACEHOLDERS.md` for the full punch list (including the SeedVault attribution swap).

## 8. Design system

- Accent: **warm amber** (`hsl(32, 100%, 58%)` dark / `hsl(32, 95%, 52%)` light) — Bitcoin-adjacent, single accent color throughout. Works for the RWA repositioning too; institutional-leaning teal/electric-blue alternatives are an open option but not yet adopted.
- Fonts: Geist Sans + Geist Mono via `next/font`.
- All tokens live in `app/globals.css` (CSS vars) and `tailwind.config.ts` (Tailwind mappings). Never hardcode colors in components.
- Dark mode is default; light mode works via `ThemeToggle`.

## 9. Project layout

```
landing/
├── app/
│   ├── api/
│   │   ├── apply/route.ts        ← form handler (Notion + Meta CAPI)
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

Built for GCC asset owners shipping regulated digital infrastructure. صُنع في دبي.
