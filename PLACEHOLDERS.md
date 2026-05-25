# Placeholders

Every placeholder / `{{REPLACE}}` marker in the codebase. Nothing from this list should ship to production.

Run `grep -rn "{{REPLACE" content/ app/ components/` before deploy — it should return zero matches once this list is cleared.

---

## 1. Calendly URL (paid-ad landing /apply)

**File**: `config/site.ts` → `contact.calendlyUrl`

- [ ] Currently `"https://calendly.com/YOUR-CALENDLY-HANDLE/diagnostic-call"`. Replace with your real 20-min diagnostic-call Calendly URL. The `/apply` page embeds this inline and fires the Meta `Lead` event when a slot is booked.

---

## 2. Case study — SeedVault (real, anonymized)

**File**: `content/site.ts` → `work.cases[0]` (`id: "seedvault"`)

`status: "real"` — real shipped project, but the **client name is anonymized** pending public-attribution approval.

- [ ] Confirm public attribution with the client (currently "Cape Town-based agricultural commodities fund manager"). On approval, swap `name`, `positioning`, and `problem` copy to use the real client name.
- [ ] `explorerHref` is `null` — once the mainnet contract is public, set this to the Etherscan URL and `explorerLabel` to `"View on Etherscan"`.

---

## 3. Case study — third slot (placeholder)

**File**: `content/site.ts` → `work.cases[2]` (`id: "placeholder-3"`)

`status: "placeholder"` — currently a generic "Your project — next slot". Shows an amber "PLACEHOLDER — replace before launch" banner in `NODE_ENV === "development"`.

Replace all of these once the next shipped project lands:

- [ ] `name` — currently `"Your project — next slot"`
- [ ] `positioning` — generic placeholder copy
- [ ] `problem` — starts with `{{REPLACE}}`
- [ ] `approach` — starts with `{{REPLACE}}`
- [ ] `outcome[0..2]` — all three marked `{{REPLACE}}`
- [ ] `stack` — verify accuracy with real project
- [ ] `terminal.command` and `terminal.lines` — regenerate for real project
- [ ] `explorerHref` — currently `null`; set to a real URL if applicable

When replacing, set `status: "real"` in `content/site.ts`.

---

## 4. Founder photo

**File**: `components/sections/about.tsx`

- [ ] Currently renders `/founder/Main.jpg`. Replace the file in `public/founder/` if you want a different shot.

For `/apply` page, also confirm `/apply` headshot placeholder (if used) is replaced.

---

## 5. Domain / canonical URL

**File**: `config/site.ts` → `url: "https://sajelabs.com"` (and `.env.local.example` → `NEXT_PUBLIC_SITE_URL`)

- [ ] Replace `sajelabs.com` once the real domain is purchased. The value appears in metadata, sitemap, robots.txt, footer, OG image, and JSON-LD.

---

## 6. Intro video (optional, /apply)

**File**: `app/apply/page.tsx`

- [ ] If you want to add the 30-45s "real me" intro video, replace the `<video>` placeholder block on the `/apply` page hero. Currently the placeholder shows a static "video coming soon" panel.

---

## 7. Analytics + integrations (env-gated, safe if left unset)

These do not render `{{REPLACE}}` anywhere, but they are expected for a production deploy:

- [ ] `NOTION_API_KEY` — required for the homepage form to persist leads
- [ ] `NOTION_LEADS_DATABASE_ID` — Notion database that receives leads
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` — Meta Pixel (PageView + Lead on both `/` and `/apply`)
- [ ] `META_CAPI_ACCESS_TOKEN` — Meta Conversions API (server-side dedup)
- [ ] `NEXT_PUBLIC_GA4_ID` — GA4
- [ ] `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` — WalletConnect / RainbowKit (not used on `/apply`)
- [ ] `META_CAPI_TEST_EVENT_CODE` — **temporary only**. Set to a `TESTxxxxx` code to verify CAPI in Events Manager → Test Events tab, then **remove before production conversions count**.

---

## Launch checklist

Run all of these before going live:

```bash
# 1. No {{REPLACE}} tokens remain
grep -rn "{{REPLACE" content/ app/ components/   # expect zero matches

# 2. No placeholder case studies left
grep -rn "PLACEHOLDER " components/              # expect zero matches in JSX
grep -rn 'status: "placeholder"' content/        # expect zero matches

# 3. Calendly URL is real
grep -n "YOUR-CALENDLY-HANDLE" config/site.ts    # expect zero matches

# 4. Type-check + build
pnpm type-check
pnpm build

# 5. Open /apply locally — Calendly widget loads with real slots, Meta Lead
#    test event fires when a slot is booked (use Events Manager → Test Events).
```
