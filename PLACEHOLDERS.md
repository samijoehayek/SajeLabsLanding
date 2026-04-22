# Placeholders

Every placeholder / `{{REPLACE}}` marker in the codebase. Nothing from this list should ship to production.

Run `grep -rn "{{REPLACE" content/ app/ components/` before deploy — it should return zero matches once this list is cleared.

---

## 1. Case study — BTCBacked (real project, partial)

**File**: `content/site.ts` → `work.cases[0]`

`status: "real"` — this is a real shipped project. Only the *metrics* are placeholders:

- [ ] `outcome[0]`: `"{{REPLACE_WITH_REAL_METRIC}} in total value locked"` → replace with real TVL figure
- [ ] `outcome[1]`: `"{{REPLACE_WITH_REAL_METRIC}} loans facilitated"` → replace with real loans count
- [ ] `outcome[2]`: `"{{REPLACE_WITH_REAL_METRIC}} users onboarded across the GCC"` → replace with real user count

Also review:
- [ ] `explorerHref` is `null` — if BTCBacked has an on-chain component, add a block explorer / site link.

---

## 2. Case study — Vellos (fully fictional placeholder)

**File**: `content/site.ts` → `work.cases[1]` (`id: "vellos"`)

`status: "placeholder"` — the entire card is invented. Shows an amber "PLACEHOLDER — replace before launch" banner in dev mode.

Replace or remove all of these before launch:

- [ ] `name` — currently `"Vellos"`
- [ ] `positioning` — currently `"Permissioned yield vaults for regulated Web3 funds."`
- [ ] `problem` — all copy starts with `{{REPLACE}}`
- [ ] `approach` — all copy starts with `{{REPLACE}}`
- [ ] `outcome[0..2]` — all three metrics marked `{{REPLACE}}`
- [ ] `stack` — verify accuracy with real project
- [ ] `terminal.command` and `terminal.lines` — regenerate for real project
- [ ] `explorerHref` — currently `"#"`, replace with real Etherscan URL or set to `null`

**JSX marker** in `components/sections/work.tsx`:
```tsx
{/* PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE */}
{vellos && <CaseStudyCard data={vellos} index={1} />}
```

When replacing, remove the JSX comment and set `status: "real"` in `content/site.ts`.

---

## 3. Case study — third slot (fully placeholder)

**File**: `content/site.ts` → `work.cases[2]` (`id: "placeholder-3"`)

`status: "placeholder"` — RWA / VARA angle, fully invented. Shows the same amber dev banner.

- [ ] `name` — currently `"{{REPLACE}} — RWA pilot"`
- [ ] `positioning` — marked `{{REPLACE}}`
- [ ] `problem` — marked `{{REPLACE}}`
- [ ] `approach` — marked `{{REPLACE}}`
- [ ] `outcome[0..2]` — all three marked `{{REPLACE}}`
- [ ] `stack` — verify
- [ ] `terminal.command` and `terminal.lines` — regenerate
- [ ] `explorerHref` — currently `"#"`

**JSX marker** in `components/sections/work.tsx`:
```tsx
{/* PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE */}
{third && <CaseStudyCard data={third} index={2} />}
```

---

## 4. Founder photo

**File**: `components/sections/about.tsx`

- [ ] Currently renders a `{{FOUNDER_PHOTO}}` placeholder inside a gradient circle. Replace per the instructions in `EDITING.md` → "Replace the founder photo".

---

## 5. Domain / canonical URL

**File**: `config/site.ts` → `url: "https://sajelabs.com"` (and `.env.local.example` → `NEXT_PUBLIC_SITE_URL`)

- [ ] Replace `sajelabs.com` once the real domain is purchased. The value appears in metadata, sitemap, robots.txt, footer, and OG image.

---

## 6. "Shipping since" year

**File**: `config/site.ts` → `founder.shippingSince: 2019`

- [ ] Update to your real "shipping since" year. Appears in the hero detail line.

---

## 7. Analytics + integrations (env-gated, safe if left unset)

These do not render `{{REPLACE}}` anywhere, but they are expected for a production deploy:

- [ ] `RESEND_API_KEY` — required for the application form to email you
- [ ] `APPLY_FROM` — must be a Resend-verified sender once your domain is live
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel
- [ ] `META_CAPI_ACCESS_TOKEN` — Meta Conversions API
- [ ] `NEXT_PUBLIC_GA4_ID` — GA4
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — WalletConnect / RainbowKit

---

## Launch checklist

Run all of these before going live:

```bash
# 1. No {{REPLACE}} tokens remain
grep -rn "{{REPLACE" content/ app/ components/   # expect zero matches

# 2. No placeholder case studies left
grep -rn "PLACEHOLDER CASE STUDY" components/    # expect zero matches
grep -rn 'status: "placeholder"' content/        # expect zero matches

# 3. Type-check + build
pnpm type-check
pnpm build

# 4. Lighthouse audit (desktop) — target 95+ on all four
pnpm dlx @lhci/cli autorun --collect.url=https://your-deploy.vercel.app
```
