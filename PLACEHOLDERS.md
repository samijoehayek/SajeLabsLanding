# Placeholders

Every placeholder / `{{REPLACE}}` marker in the codebase. Nothing from this list should ship to production.

Run `grep -rn "{{REPLACE" content/ app/ components/` before deploy — it should return zero matches once this list is cleared.

---

## 1. Case study — SeedVault (real, anonymized)

**File**: `content/site.ts` → `work.cases[0]` (`id: "seedvault"`)

`status: "real"` — this is a real shipped project, but the **client name is anonymized** pending public-attribution approval.

- [ ] Confirm public attribution with the client (currently "Cape Town-based agricultural commodities fund manager"). On approval, swap `name`, `positioning`, and `problem` copy to use the real client name.
- [ ] `explorerHref` is `null` — once the mainnet contract is public, set this to the Etherscan URL and `explorerLabel` to `"View on Etherscan"`.

The terminal block, stack, outcome metrics, and approach copy are all real. No `{{REPLACE}}` markers in this card.

---

## 2. Case study — BTCBacked (real project, partial metrics)

**File**: `content/site.ts` → `work.cases[1]` (`id: "btcbacked"`)

`status: "real"` — real shipped project. Only the *metrics* are placeholders:

- [ ] `outcome[0]`: `"{{REPLACE_WITH_REAL_METRIC}} in total value locked"` → replace with real TVL figure
- [ ] `outcome[1]`: `"{{REPLACE_WITH_REAL_METRIC}} loans facilitated"` → replace with real loans count
- [ ] `outcome[2]`: `"{{REPLACE_WITH_REAL_METRIC}} users onboarded across the GCC"` → replace with real user count

Also review:
- [ ] `explorerHref` is `null` — if BTCBacked has an on-chain component, add a block explorer / site link.

---

## 3. Case study — third slot (placeholder, replace once second RWA client signs)

**File**: `content/site.ts` → `work.cases[2]` (`id: "placeholder-3"`)

`status: "placeholder"` — currently anonymized as "GCC real estate tokenization pilot — coming soon". Shows an amber "PLACEHOLDER — replace before launch" banner in `NODE_ENV === "development"`.

Replace or remove all of these once the second RWA client signs and gives attribution:

- [ ] `name` — currently `"GCC real estate tokenization pilot — coming soon"`
- [ ] `positioning` — generic placeholder copy
- [ ] `problem` — starts with `{{REPLACE}}`
- [ ] `approach` — starts with `{{REPLACE}}`
- [ ] `outcome[0..2]` — all three marked `{{REPLACE}}`
- [ ] `stack` — verify accuracy with real project
- [ ] `terminal.command` and `terminal.lines` — regenerate for real project
- [ ] `explorerHref` — currently `null`; set to a real Etherscan URL once mainnet

**JSX marker** in `components/sections/work.tsx`:
```tsx
{/* PLACEHOLDER — replace once second RWA client signs */}
{third && <CaseStudyCard data={third} index={2} />}
```

When replacing, remove the JSX comment and set `status: "real"` in `content/site.ts`.

---

## 4. Founder photo

**File**: `components/sections/about.tsx`

- [ ] Currently renders a `{{FOUNDER_PHOTO}}` placeholder inside a gradient circle. Replace per the instructions in `EDITING.md` → "Replace the founder photo".

---

## 5. Domain / canonical URL

**File**: `config/site.ts` → `url: "https://sajelabs.com"` (and `.env.local.example` → `NEXT_PUBLIC_SITE_URL`)

- [ ] Replace `sajelabs.com` once the real domain is purchased. The value appears in metadata, sitemap, robots.txt, footer, OG image, and JSON-LD.

---

## 6. "Shipping since" year

**File**: `config/site.ts` → `founder.shippingSince: 2019`

- [ ] Update to your real "shipping since" year if needed. (No longer rendered in the hero, but still used in JSON-LD context.)

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
grep -rn "PLACEHOLDER " components/              # expect zero matches in JSX
grep -rn 'status: "placeholder"' content/        # expect zero matches

# 3. Type-check + build
pnpm type-check
pnpm build

# 4. Lighthouse audit (desktop) — target 95+ on all four
pnpm dlx @lhci/cli autorun --collect.url=https://your-deploy.vercel.app
```
