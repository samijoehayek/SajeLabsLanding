# Editing cheat sheet

The whole site is driven by two files. You should almost never need to touch React.

| I want to change… | Edit this file | Key to change |
|---|---|---|
| Hero headline | `content/site.ts` | `hero.headline` (alt options are commented) |
| Hero subheadline | `content/site.ts` | `hero.subheadline` |
| Hero CTAs | `content/site.ts` | `hero.primaryCta`, `hero.secondaryCta` |
| Hero ambient detail line | `content/site.ts` | `hero.ambientLine` |
| Founder name / role / location | `config/site.ts` | `founder.*` |
| Contact email, WhatsApp, socials | `config/site.ts` | `contact`, `socials` |
| Calendly URL on /apply | `config/site.ts` | `contact.calendlyUrl` |
| Tech pills row (hero) | `config/site.ts` | `techPills` |
| Credibility bar items | `config/site.ts` | `credibilityPills` |
| Nav links | `config/site.ts` | `nav` |
| Headline price reference | `config/site.ts` | `offer.headlinePriceLabel`, `offer.typicalRange` |
| Delivery range | `config/site.ts` | `offer.duration` |
| Payment schedule | `config/site.ts` | `offer.paymentSchedule` |
| Problem section copy | `content/site.ts` | `problem` |
| Process / "How I work" phases | `content/site.ts` | `process` |
| Case studies | `content/site.ts` | `work.cases[]` |
| Technical-diff cards | `content/site.ts` | `technical.cards[]` |
| About / founder bio | `content/site.ts` | `about` |
| FAQ questions & answers | `content/site.ts` | `faq.items[]` |
| Apply section copy + success state | `content/site.ts` | `apply` |
| Footer signoff, status, tagline | `content/site.ts` | `footer` |
| SEO title / description / OG copy | `config/site.ts` | `description`, `ogTitle`, `ogDescription`, `tagline` |
| Domain shown in footer / canonical | `config/site.ts` + `NEXT_PUBLIC_SITE_URL` | `url` |
| Accent color / dark palette | `app/globals.css` | `--accent`, other CSS vars |
| Font choice | `app/layout.tsx` | `GeistSans` / `GeistMono` import |

## Quick recipes

**Set your Calendly URL:**

The `/apply` page embeds Calendly inline. Open `config/site.ts` and replace the placeholder:

```ts
contact: {
  // ...
  calendlyUrl: "https://calendly.com/your-handle/diagnostic-call",
},
```

The embed (`components/apply/calendly-embed.tsx`) reads this value, listens for Calendly's `event_scheduled` postMessage, and fires the Meta `Lead` event when a slot is booked. UTM parameters from the ad URL are automatically passed through as prefill.

**Swap the third case-study placeholder for a real project:**

1. Open `content/site.ts` → `work.cases[2]` (`id: "placeholder-3"`).
2. Set `status: "real"`.
3. Replace `name`, `positioning`, `problem`, `approach`, `outcome`, `stack`, `terminal`, and (if applicable) `explorerLabel` / `explorerHref`.
4. Make sure no `{{REPLACE}}` markers remain in that card.
5. Run `grep -rn "{{REPLACE" content/` to confirm.

**Update the SeedVault card if the client permits public attribution:**

1. Open `content/site.ts` → `work.cases[0]` (`id: "seedvault"`).
2. Replace the anonymized `"Cape Town-based agricultural commodities fund manager"` reference in `problem` with the real client name.
3. Update `name` and `positioning` to lead with the real brand.
4. Add `explorerHref` (Etherscan URL) and `explorerLabel: "View on Etherscan"` once the mainnet contract is public.

**Add a new FAQ item:**

```ts
// content/site.ts → faq.items
{ q: "Do you work with US/EU clients?", a: "Yes — Dubai (GMT+4) overlaps with EU mornings and US East Coast end-of-day." },
```

**Replace the founder photo:**

1. Replace `public/founder/Main.jpg` with your new image (keep the same path or update `components/sections/about.tsx`).
2. The image is rendered at 256×256 inside a rounded mask; provide at least 512×512 for crispness on retina screens.

**Change the accent color:**

Edit two lines in `app/globals.css`:

```css
:root  { --accent: 32 95% 52%;  } /* light mode */
.dark  { --accent: 32 100% 58%; } /* dark mode  */
```

Values are `hue saturation lightness` without the `hsl()` wrapper.

**Add a chain to the wallet connect:**

1. Edit `lib/wagmi.ts` → `chains: [mainnet, arbitrum, base, polygon, /* add here */]`.
2. Add a matching `http(process.env["NEXT_PUBLIC_YOUR_RPC"])` entry in `transports`.
3. Document the new env var in `.env.local.example`.

## Gut-check before shipping

1. `pnpm build` — must compile clean.
2. `grep -rn "{{REPLACE" content/ app/ components/` — must return zero matches once placeholders are replaced.
3. Open the rendered page in dev; any amber "PLACEHOLDER — replace before launch" banner means a case study still needs replacing.
4. Visit `/api/og` — the generated image should match the new headline.
5. Visit `/apply` — Calendly widget should load and show real available slots (not the placeholder URL).
