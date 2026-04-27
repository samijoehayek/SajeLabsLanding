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
| Tech pills row (hero) | `config/site.ts` | `techPills` |
| Credibility bar items | `config/site.ts` | `credibilityPills` |
| Nav links | `config/site.ts` | `nav` |
| Pricing tiers (3-card layout) | `config/site.ts` | `pricingTiers` |
| Headline price (apply card) | `config/site.ts` | `offer.headlinePrice` |
| Retainer price (post-launch) | `config/site.ts` | `offer.retainerFrom` |
| Payment schedule | `config/site.ts` | `offer.paymentSchedule` |
| Problem section copy | `content/site.ts` | `problem` |
| Process / 8-week phases | `content/site.ts` | `process` |
| Case studies | `content/site.ts` | `work.cases[]` |
| Technical-diff cards | `content/site.ts` | `technical.cards[]` |
| About / founder bio | `content/site.ts` | `about` |
| Pricing intro + "What's not included" | `content/site.ts` | `pricing.eyebrow`, `pricing.headline`, `pricing.sub`, `pricing.excluded` |
| FAQ questions & answers | `content/site.ts` | `faq.items[]` |
| Apply section copy + success state | `content/site.ts` | `apply` |
| Footer signoff, status, tagline | `content/site.ts` | `footer` |
| SEO title / description / OG copy | `config/site.ts` | `description`, `ogTitle`, `ogDescription`, `tagline` |
| Domain shown in footer / canonical | `config/site.ts` + `NEXT_PUBLIC_SITE_URL` | `url` |
| Accent color / dark palette | `app/globals.css` | `--accent`, other CSS vars |
| Font choice | `app/layout.tsx` | `GeistSans` / `GeistMono` import |

## Quick recipes

**Edit pricing tiers:**

The Pricing section is driven by `siteConfig.pricingTiers` in `config/site.ts`. Each tier is a typed object:

```ts
{
  id: "standard",
  name: "Standard",
  price: 95000,
  priceLabel: "$95,000",
  priceSuffix: "fixed",         // or "starts at"
  duration: "10-week delivery",
  description: "Short pitch — one sentence.",
  mostPopular: true,            // visually flags the card with an accent border + "Most popular" pill
  features: [
    "Everything in Foundations, plus:",
    "NAVStore oracle…",
    // …
  ],
}
```

To change pricing:

1. Edit the relevant tier object in `siteConfig.pricingTiers`.
2. Set `mostPopular: true` on at most one tier — the styling assumes a single recommended pick.
3. Update the apply card "Starting at" amount (`siteConfig.offer.headlinePrice`) if you change the lowest tier's price.
4. Update the JSON-LD `tokenizationServiceJsonLd.offers` range in `app/layout.tsx` if the price band changes.

**Swap the third case-study placeholder for a real RWA project:**

1. Open `content/site.ts` → `work.cases[2]` (`id: "placeholder-3"`).
2. Set `status: "real"`.
3. Replace `name`, `positioning`, `problem`, `approach`, `outcome`, `stack`, `terminal`, and (if applicable) `explorerLabel` / `explorerHref`.
4. Make sure no `{{REPLACE}}` markers remain in that card.
5. Remove the `{/* PLACEHOLDER — replace once second RWA client signs */}` comment in `components/sections/work.tsx` once the swap is done.
6. Run `grep -rn "{{REPLACE" content/` to confirm.

**Update the SeedVault card if the client permits public attribution:**

1. Open `content/site.ts` → `work.cases[0]` (`id: "seedvault"`).
2. Replace the anonymized `"Cape Town-based agricultural commodities fund manager"` reference in `problem` with the real client name.
3. Update `name` and `positioning` to lead with the real brand.
4. Add `explorerHref` (Etherscan URL) and `explorerLabel: "View on Etherscan"` once the mainnet contract is public.
5. Remove the `// CLIENT NAME PENDING APPROVAL` comment block above the card object in `content/site.ts`.

**Add a new FAQ item:**

```ts
// content/site.ts → faq.items
{ q: "Do you work with non-GCC asset owners?", a: "Yes — Switzerland and Singapore are our two strongest secondary markets." },
```

**Replace the founder photo:**

1. Drop `founder.jpg` (or `.webp`) into `public/`.
2. Open `components/sections/about.tsx` and swap the `{{FOUNDER_PHOTO}}` placeholder div for:
   ```tsx
   import Image from "next/image";
   // ...
   <Image
     src="/founder.jpg"
     alt={siteConfig.founder.name}
     width={256}
     height={256}
     className="h-full w-full object-cover"
     priority
   />
   ```

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
4. Visit `/api/og` — the generated image should match the new RWA headline.
