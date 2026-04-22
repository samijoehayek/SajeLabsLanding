# Editing cheat sheet

The whole site is driven by two files. You should almost never need to touch React.

| I want to change… | Edit this file | Key to change |
|---|---|---|
| Hero headline | `content/site.ts` | `hero.headline` (alt options are commented) |
| Hero subheadline | `content/site.ts` | `hero.subheadline` |
| Hero CTAs | `content/site.ts` | `hero.primaryCta`, `hero.secondaryCta` |
| "Shipping since" year | `config/site.ts` | `founder.shippingSince` |
| Founder name / role / location | `config/site.ts` | `founder.*` |
| Contact email, WhatsApp, socials | `config/site.ts` | `contact`, `socials` |
| Tech pills row | `config/site.ts` | `techPills` |
| Credibility bar items | `config/site.ts` | `credibilityPills` |
| Nav links | `config/site.ts` | `nav` |
| Price (headline) | `config/site.ts` | `offer.headlinePrice` |
| Retainer price | `config/site.ts` | `offer.retainerFrom` |
| Payment schedule | `config/site.ts` | `offer.paymentSchedule` |
| Problem section copy | `content/site.ts` | `problem` |
| Process / 8-week phases | `content/site.ts` | `process` |
| Case studies | `content/site.ts` | `work.cases[]` |
| Technical-diff cards | `content/site.ts` | `technical.cards[]` |
| About / founder bio | `content/site.ts` | `about` |
| Pricing included / excluded lists | `content/site.ts` | `pricing.included`, `pricing.excluded` |
| FAQ questions & answers | `content/site.ts` | `faq.items[]` |
| Apply section copy + success state | `content/site.ts` | `apply` |
| Footer signoff & status | `content/site.ts` | `footer` |
| SEO title / description / OG copy | `config/site.ts` | `description`, `ogTitle`, `ogDescription` |
| Domain shown in footer / canonical | `config/site.ts` + `NEXT_PUBLIC_SITE_URL` | `url` |
| Accent color / dark palette | `app/globals.css` | `--accent`, other CSS vars |
| Font choice | `app/layout.tsx` | `GeistSans` / `GeistMono` import |

## Quick recipes

**Change the hero headline:**

```ts
// content/site.ts
export const hero = {
  headline: "From whitepaper to mainnet in 8 weeks.", // ← edit here
  // ...
};
```

**Add a new FAQ item:**

```ts
// content/site.ts → faq.items
{ q: "Do you work with solo founders?", a: "Yes — most of our clients are." },
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
4. Visit `/api/og` — the generated image should match your brand.
