# SajeLabs — landing page

Personal marketing site for **Samijoe Hayek**, a senior full-stack and blockchain developer based in Dubai. Lead offer is direct-to-developer software project delivery — web apps, full-stack platforms, blockchain projects, RWA tokenization, Web3 integrations — without agency overhead. Built with Next.js 15, React 19, TypeScript strict, Tailwind, shadcn-style primitives, wagmi v2, and RainbowKit v2.

The site has two entry points:

- **`/`** — long-form positioning, work samples, FAQ, and a qualified inbound form.
- **`/apply`** — dedicated paid-ad landing with a Calendly embed. No site nav, conversion-focused, separate meta tags.

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

Nothing in `.env.local.example` is required for the site to run — all integrations (Notion, Meta Pixel, GA4, WalletConnect, Calendly) degrade gracefully when their variables are missing.

## 2. Edit copy without touching React

All homepage copy lives in **`content/site.ts`** as a typed object. All config (studio name, contact, Calendly URL, offer range, social links, nav items) lives in **`config/site.ts`**.

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

The Calendly URL is configured in `config/site.ts → contact.calendlyUrl`, not via env var.

## 4. Notion setup (durable lead store for the homepage form)

The homepage form's persistence layer is Notion. The Notion database doubles as a lightweight CRM (Stage status column lets you move leads through `New / In review / Closed`).

1. **Create the database** in Notion. Required column names + types (case-sensitive — the API rejects mismatches):

   | Column | Notion type |
   |---|---|
   | `Name` | Title |
   | `Email` | Email |
   | `WhatsApp` | Phone number |
   | `Company` | Text |
   | `Asset Type` | Text — stores PROJECT TYPE values from the rebrand (`"Web application"`, `"Blockchain / Web3"`, etc.). Column name is kept for backward compatibility. |
   | `Stage` | Status (must include a `New` option; the API auto-sets every new lead to `New`) |
   | `Project Stage` | Text (the applicant's stated stage — separate from the CRM `Stage`) |
   | `Timeline` | Text |
   | `Budget` | Text |
   | `Description` | Text |

2. **Create an integration** at <https://www.notion.so/my-integrations> → New integration → name it → copy the **Internal Integration Secret**.

3. **Connect the integration to the database** — open the database → top-right `···` → **Connections** → add the integration. Without this step the API returns `object_not_found`.

4. **Get the database ID** — the 32-char hex string between `/<workspace>/` and `?v=` in the database URL.

5. **Set Vercel env vars**: `NOTION_API_KEY` and `NOTION_LEADS_DATABASE_ID`.

6. **Set up notifications** — Notion → database → top-right `···` → **Notifications** → "Notify me when a row is added".

If both env vars are missing, the form returns a 202 with a "WhatsApp us directly" message. If they're set but the API call fails, the lead is lost — Vercel function logs will show `[notion] append failed: <status>`.

### Application form fields (homepage)

| Field | Type | Required |
|---|---|---|
| Full name | text | yes |
| Email | email | yes |
| WhatsApp | composite — country-code Select (default `+971`) glued to a digits-and-spaces input; combined into `+971 50 123 4567` before POSTing | yes |
| Company / project | text | optional |
| **Project type** | select — Web application / Full-stack platform / Blockchain / Web3 / RWA tokenization / MVP / Prototype / Feature in an existing codebase / Other | yes |
| Project stage | select — Idea / Concept / Design or spec ready / Ready to build / Already engaged another firm | yes |
| Timeline | select — ASAP / 1 month / 2–3 months / Flexible | yes |
| Budget bracket | select — `$15K–$30K` / `$30K–$60K` / `$60K+` / Not sure yet | yes |
| Brief project description | textarea (500 char limit) | yes (min 20) |

The form-side schema (`applyFormSchema`) and the API-side schema (`applySchema`) both live in `lib/apply-schema.ts`. The form validates `countryCode` + a digits-only WhatsApp; the API validates the combined international string. Update enums in lockstep with `components/sections/apply.tsx` and `lib/country-codes.ts` if you change the options.

## 5. Calendly setup (the `/apply` page conversion target)

The `/apply` page is the dedicated paid-ad landing. It embeds Calendly inline and fires the Meta `Lead` event when a slot is booked.

1. Create a Calendly event type — a 20-minute "diagnostic call".
2. Copy the event URL (e.g. `https://calendly.com/your-handle/diagnostic-call`).
3. Paste it into `config/site.ts → contact.calendlyUrl`.
4. The embed (`components/apply/calendly-embed.tsx`) listens for Calendly's `calendly.event_scheduled` postMessage event and fires the Meta `Lead` event on successful booking. UTM parameters from the ad URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) are read on mount and passed to Calendly as `utm_*` query-string parameters so they appear on the booking in your Calendly dashboard.

No additional env vars are required — the Calendly URL is configured in code.

## 6. Meta Pixel + CAPI setup

1. Create a Pixel in Meta Events Manager, grab the Pixel ID.
2. Set `NEXT_PUBLIC_META_PIXEL_ID` — the Pixel loads automatically and fires `PageView` on every page (`/` and `/apply`) and `Lead` on:
   - Homepage form submission (see `lib/analytics.ts`)
   - Calendly `event_scheduled` callback on `/apply` (see `components/apply/calendly-embed.tsx`)
3. For server-side deduplicated events, generate a Conversions API access token from the same Pixel and set `META_CAPI_ACCESS_TOKEN`. `/api/apply` fires a server-side `Lead` event with hashed email/phone.

## 7. Adding a new case study

Edit `content/site.ts` → `work.cases`. Add a new object matching the existing `CaseStudyData` shape (see `components/case-study-card.tsx`).

Then render it in `components/sections/work.tsx` by adding another `<CaseStudyCard data={…} index={n} />` row.

## 8. Replacing the placeholder case study

**One case study ships as a placeholder**: `placeholder-3` (the third "next project" slot). Must be replaced before going live.

The two flagship cards — `seedvault` (anonymized, real RWA project) and `btcbacked` (real Bitcoin-backed lending) — are real shipped projects. SeedVault's client name is anonymized pending public-attribution approval; `PLACEHOLDERS.md` tracks the full punch list.

To replace `placeholder-3`:

1. Edit `work.cases[2]` in `content/site.ts` — set `status: "real"`, replace all `{{REPLACE}}` copy, fill real metrics, stack, terminal output.
2. Set `explorerHref` to a real link or leave `null`.
3. Run `grep -rn "{{REPLACE" content/ app/ components/` to confirm.

## 9. Design system

- Accent: **warm amber** (`hsl(32, 100%, 58%)` dark / `hsl(32, 95%, 52%)` light). Single accent color throughout.
- Fonts: Geist Sans + Geist Mono via `next/font`.
- All tokens live in `app/globals.css` (CSS vars) and `tailwind.config.ts` (Tailwind mappings). Never hardcode colors in components.
- Dark mode is default; light mode works via `ThemeToggle`.

## 10. Project layout

```
landing/
├── app/
│   ├── apply/
│   │   ├── layout.tsx            ← minimal layout for paid-ad landing
│   │   └── page.tsx              ← /apply: Calendly-funnel conversion page
│   ├── api/
│   │   ├── apply/route.ts        ← homepage form handler (Notion + Meta CAPI)
│   │   └── og/route.tsx          ← OG image (@vercel/og)
│   ├── layout.tsx                ← metadata, JSON-LD, font wiring
│   ├── page.tsx                  ← homepage: composes all sections
│   ├── providers.tsx             ← theme + query + wallet (client)
│   ├── sitemap.ts / robots.ts
│   └── globals.css               ← CSS variables + base styles
├── components/
│   ├── apply/                    ← /apply-specific components (Calendly, etc.)
│   ├── sections/                 ← one file per homepage section
│   ├── ui/                       ← shadcn-style primitives (customised)
│   └── …                         ← wallet-button, analytics, etc.
├── config/site.ts                ← studio config (single source of truth)
├── content/site.ts               ← page copy (single source of truth)
├── lib/                          ← utils, schemas, integrations
└── public/
```

## 11. Performance

- Static HTML for `/` and `/apply`, revalidating every 6 hours.
- Wagmi + RainbowKit are lazy-loaded client-side only (dynamic import, `ssr: false`) and never load on `/apply` so they don't block paid-ad LCP.
- All images go through `next/image`. The OG image runs on the Edge.
- Framer Motion respects `prefers-reduced-motion`.

---

One senior developer · Dubai · صُنع في دبي.
