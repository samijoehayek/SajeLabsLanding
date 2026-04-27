// -----------------------------------------------------------------------------
// SajeLabs — all page copy, typed. Edit here to change the landing page
// without touching React.
// -----------------------------------------------------------------------------

export const hero = {
  // Pick the strongest. Commented alternatives are kept for quick A/B swap.
  headline:
    "Tokenize your real-world assets. ERC-3643 compliant. Production-ready in 8 weeks.",
  // headline: "From physical asset to mainnet token in 8 weeks.",
  // headline: "ERC-3643 tokenization. Ship-ready in 8 weeks. From $60K.",
  // headline: "We deploy the ERC-3643 stack the world's largest RWA deals are built on.",

  subheadline:
    "Smart contracts, KYC infrastructure, admin portal, and mainnet deployment — built by engineers who've shipped a $25B-reference RWA platform on Ethereum. Based in Dubai.",
  primaryCta: { label: "Apply for a tokenization slot", href: "#apply" },
  secondaryCta: { label: "See the work", href: "#work" },
  ambientLine: "// erc-3643 · onchainid · nav oracle · ipfs proofs",
} as const;

export const problem = {
  eyebrow: "Why most tokenization projects never ship",
  opener:
    "You've seen the pattern. A regulated asset owner hires a Web3 agency, the project disappears into testnet purgatory, and a year later there's still no admin portal, no compliant transfers, and no path to mainnet. The reasons are predictable.",
  patterns: [
    {
      title: "You hire a Web3 agency that's never deployed ERC-3643.",
      body:
        "Most \"blockchain devs\" build NFT mints. Tokenizing real, regulated, valuable assets requires identity infrastructure, claim topic management, and trusted issuer registries — not a contract written in a weekend.",
    },
    {
      title: "Your legal team blocks the project at compliance review.",
      body:
        "KYC, accredited investor restrictions, jurisdictional rules, and trusted issuer permissions need to be enforceable on-chain — not bolted on later. Get the architecture wrong and the project never leaves testnet.",
    },
    {
      title: "Eight months in, you still don't have an admin portal your team can actually use.",
      body:
        "Smart contracts without a clean operator UI mean every mint, KYC update, and document upload becomes an engineering ticket. We ship the portal with the contracts.",
    },
  ],
} as const;

export const process = {
  eyebrow: "How we ship in 8 weeks",
  lede:
    "A fixed cadence. Four two-week phases. Demo every Friday. Mainnet in week eight, not month eight.",
  phases: [
    {
      week: "Weeks 1–2",
      title: "Discovery",
      summary:
        "Asset model, valuation source, jurisdiction, and the role matrix that will run the chain.",
      deliverables: [
        "Asset model + valuation source review",
        "Jurisdiction, claim topics, trusted issuers",
        "Role matrix + network selection (Ethereum, Base, Arbitrum)",
      ],
    },
    {
      week: "Weeks 3–4",
      title: "Architecture",
      summary:
        "The full ERC-3643 contract suite drafted, with NAV oracle and document registry wired in.",
      deliverables: [
        "ERC-3643 token + IdentityRegistry + ClaimTopicsRegistry",
        "TrustedIssuersRegistry + Compliance rule engine",
        "NAVStore + DocumentsRegistry + ONCHAINIDFactory",
      ],
    },
    {
      week: "Weeks 5–6",
      title: "Build",
      summary:
        "Feature-complete on testnet. Foundry-tested contracts. Operator portal your team can actually use.",
      deliverables: [
        "Foundry test suite (90%+ coverage, invariant harness)",
        "Role-gated admin portal — mint/burn, KYC, claims, documents, NAV",
        "IPFS / Arweave integration for compliant document storage",
      ],
    },
    {
      week: "Weeks 7–8",
      title: "Ship",
      summary:
        "UAT on Base Sepolia, mainnet deployment, Etherscan verification, runbooks, handover.",
      deliverables: [
        "Base Sepolia UAT + full acceptance test matrix",
        "Mainnet deployment + Etherscan verification",
        "Runbooks, role-handover documentation, 30-day support",
      ],
    },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  lede: "Regulated, non-custodial, production. Not prototypes.",
  cases: [
    // CLIENT NAME PENDING APPROVAL — currently anonymized as
    // "Cape Town-based agricultural commodities fund manager"
    {
      id: "seedvault",
      status: "real" as const,
      name: "SeedVault — $25B-reference RWA tokenization platform",
      positioning: "Full ERC-3643 stack for an insured, appraised physical inventory.",
      problem:
        "The fund held a unique, insured physical inventory worth tens of billions in reference value with no path to fractional ownership, secondary liquidity, or compliant investor onboarding. Client (anonymized): Cape Town-based agricultural commodities fund manager. Asset: insured, appraised physical inventory — Cannabis sativa L. landrace seed reserves.",
      approach:
        "Full ERC-3643 stack on Ethereum: security token, IdentityRegistry, ClaimTopicsRegistry, TrustedIssuersRegistry, Compliance engine, ONCHAINID factory, NAVStore oracle, IPFS-backed DocumentsRegistry, and a role-gated admin portal.",
      outcome: [
        "~2,500 seeds per token, 8-decimal divisibility",
        "10M tokens issued at $25B reference value",
        "Base Sepolia → Ethereum Mainnet delivery",
        "Role matrix: Admin, Issuer, Registry Agent, Policy Admin, Docs Admin, Oracle, Factory Operator",
      ],
      stack: [
        "ERC-3643 v2.x",
        "Solidity 0.8.x",
        "ONCHAINID",
        "Foundry",
        "Next.js",
        "viem",
        "IPFS",
        "Base Sepolia → Ethereum Mainnet",
      ],
      terminal: {
        command: "sajelabs deploy --asset seedvault --network mainnet",
        lines: [
          "✓ erc-3643 verified",
          "✓ onchainid factory live",
          "✓ admin portal handed over",
        ],
      },
      link: { label: "View case", href: "#apply" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
    {
      id: "btcbacked",
      status: "real" as const,
      name: "BTCBacked — Swiss-grade Bitcoin-backed lending",
      positioning: "Bitcoin-native, non-custodial financial infrastructure.",
      problem:
        "GCC Bitcoin holders had no regulated, non-custodial way to access liquidity against their BTC. Every option forced custody, wrapped BTC, or an unregulated desk.",
      approach:
        "Built a peer-to-peer marketplace with non-custodial Bitcoin collateralization, Swiss-grade compliance architecture, and production-ready infra. Real BTC, not wrapped — same DNA as the RWA stack: regulated, non-speculative, ship-on-time.",
      outcome: [
        "{{REPLACE_WITH_REAL_METRIC}} in total value locked",
        "{{REPLACE_WITH_REAL_METRIC}} loans facilitated",
        "{{REPLACE_WITH_REAL_METRIC}} users onboarded across the GCC",
      ],
      stack: [
        "Bitcoin",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Non-custodial architecture",
      ],
      terminal: {
        command: "sajelabs inspect --project btcbacked",
        lines: [
          "✓ non-custodial",
          "✓ audit-ready",
          "✓ production",
          "✓ real BTC — no wrapping",
        ],
      },
      link: { label: "View case", href: "#apply" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
    // PLACEHOLDER — replace once second RWA client signs
    {
      id: "placeholder-3",
      status: "placeholder" as const,
      name: "GCC real estate tokenization pilot — coming soon",
      positioning: "VARA-aware tokenization for a Dubai-based real estate issuer.",
      problem:
        "{{REPLACE}} A regulated UAE real estate developer is preparing to tokenize a flagship asset under the VARA framework with full investor allowlisting and on-chain compliance.",
      approach:
        "{{REPLACE}} Designed around the same ERC-3643 stack we shipped for SeedVault, with jurisdictional allowlists, accredited-investor claim topics, and a custodian-integrated investor onboarding flow.",
      outcome: [
        "{{REPLACE}} In progress",
        "{{REPLACE}} Mainnet target — Q4",
        "{{REPLACE}} VARA-aware architecture",
      ],
      stack: [
        "ERC-3643",
        "ONCHAINID",
        "Foundry",
        "Next.js",
        "VARA-aware compliance",
      ],
      terminal: {
        command: "sajelabs status --project gcc-realestate",
        lines: [
          "→ in progress",
          "→ replace with real output",
        ],
      },
      link: { label: "View case", href: "#apply" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
  ],
} as const;

export const technical = {
  eyebrow: "What actually ships with us",
  lede:
    "The specific promises behind the price. Every item below is a line in the SOW.",
  cards: [
    {
      icon: "ShieldCheck",
      title: "ERC-3643 native",
      body:
        "The global standard for security tokens. Same standard used by Mantra, MultiBank, and the largest RWA deals globally.",
    },
    {
      icon: "Scale",
      title: "ONCHAINID + KYC built in",
      body:
        "Investor identity, claim topics, trusted issuer registries. Compliance lives on-chain, not in a spreadsheet.",
    },
    {
      icon: "Factory",
      title: "Admin portal you'll actually use",
      body:
        "Role-gated dashboard for mint/burn, KYC, document uploads, NAV updates. Operations team-ready, not just dev-team-ready.",
    },
    {
      icon: "Gauge",
      title: "Audit-ready from day one",
      body:
        "Foundry test suite, OpenZeppelin patterns, contract verification on Etherscan, light-audit-friendly structure.",
    },
    {
      icon: "CalendarClock",
      title: "Testnet → Mainnet in 8 weeks",
      body:
        "Fixed scope. Fixed price. Fixed timeline. No open-ended retainers, no surprise invoices.",
    },
    {
      icon: "KeyRound",
      title: "You keep 100% of the code",
      body:
        "Source code, ABIs, deployment scripts, runbooks. Nothing locked behind us post-handover.",
    },
  ],
} as const;

export const about = {
  eyebrow: "Founder",
  headline: "Built by an engineer who deploys, not a salesperson who pitches.",
  paragraphs: [
    "Samijoe Hayek is a senior blockchain engineer based in Dubai. He's the founder of SajeLabs, a boutique studio specializing in production-grade RWA tokenization on Ethereum and non-custodial Bitcoin infrastructure. He recently shipped a $25B-reference ERC-3643 platform end-to-end — smart contracts, identity infrastructure, NAV oracle, admin portal — for a Cape Town-based agricultural commodities fund.",
    "SajeLabs works with GCC asset owners, family offices, and Web3 founders who need regulated, audit-ready, ship-on-time infrastructure. We build for production, not for demos.",
  ],
} as const;

export const pricing = {
  eyebrow: "What a tokenization costs",
  headline: "Three tiers. Fixed scope. Fixed timeline.",
  sub:
    "One asset, one engineering team, one signed SOW. Paid in three milestones. No hourly creep, no surprise invoices.",
  // Per-tier feature lists live in config/site.ts → siteConfig.pricingTiers.
  excludedTitle: "What's not included",
  excluded: [
    {
      title: "Third-party security audits",
      body:
        "We prep for audit; the audit firm bills separately — typical $15-50K. We'll recommend and introduce (OpenZeppelin, Trail of Bits, Spearbit, etc.).",
    },
    {
      title: "Legal, regulatory, and tax advice",
      body:
        "Not our lane. We recommend specialist law firms in DIFC, ADGM, and Switzerland and work alongside your counsel on architecture decisions.",
    },
    {
      title: "Custodian, KYC provider, or RPC fees",
      body: "Pass-through. We integrate Cobo, Fireblocks, Sumsub, Onfido — you hold the contracts.",
    },
    {
      title: "Ongoing development beyond the 30-day warranty",
      body: "Separate retainer from $8,000/month. Fixed scope per sprint, same cadence as the build.",
    },
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  items: [
    {
      q: "What is ERC-3643 and why does it matter?",
      a: "ERC-3643 is the global standard for permissioned security tokens — the same standard powering the largest RWA deals (Mantra, MultiBank, institutional tokenization platforms). Using ERC-3643 means your tokenization is compatible with the future of regulated digital asset infrastructure rather than a one-off contract that ages out.",
    },
    {
      q: "Do you handle VARA / DIFC / ADGM compliance?",
      a: "We build VARA-aware, ADGM-friendly, DIFC-compatible architecture. We do not provide legal advice — we work alongside your legal counsel and recommend specialist law firms in the GCC and Switzerland.",
    },
    {
      q: "What asset types can be tokenized?",
      a: "Real estate, private credit, commodities, funds, fine art, agricultural inventory, royalties. Anything insured, appraised, and legally defensible. We've shipped a system for $25B-reference physical inventory; the architecture generalizes.",
    },
    {
      q: "Who owns the code and IP?",
      a: "You do, on full payment. Source code, ABIs, deployment scripts, documentation, runbooks. We retain rights to our pre-existing internal libraries and tooling, granted to you under perpetual royalty-free license as incorporated.",
    },
    {
      q: "What's the payment schedule?",
      a: "50% on signing, 25% on UAT acceptance, 25% on mainnet deployment. Net 7. Fixed price — no surprises.",
    },
    {
      q: "What if you miss the 8-week deadline?",
      a: "We work without additional fees until delivery. Our SOW includes specific acceptance test matrices on both contracts and admin UI; you don't pay milestones until those tests pass.",
    },
    {
      q: "Can you tokenize on chains other than Ethereum?",
      a: "Yes. We default to Ethereum mainnet or Base for production because the ERC-3643 ecosystem is most mature there, but we deploy on Arbitrum, Polygon, or other EVM chains based on your compliance and gas-cost needs. Non-EVM chains are case-by-case.",
    },
    {
      q: "Do you sign NDAs?",
      a: "Always, before any commercial detail is shared.",
    },
    {
      q: "What's the timezone?",
      a: "Dubai (GMT+4). Full GCC working-hours overlap. European clients get morning overlap; US East Coast clients get end-of-day overlap.",
    },
    {
      q: "How do we get started?",
      a: "Submit the application form below. We review every application within 48 hours. If we're a fit, we book a 30-minute call to scope your asset, jurisdiction, and timeline.",
    },
  ],
} as const;

export const apply = {
  eyebrow: "Apply",
  headline: "Tokenizing an asset? Tell us about it.",
  body:
    "We review every application within 48 hours. If we're a fit, we'll book a 30-minute call to scope your asset, jurisdiction, and timeline. If we're not, we'll tell you straight and introduce someone who is.",
  successHeadline: "Application received.",
  successBody:
    "We'll be in touch within 48 hours. Check your WhatsApp — that's usually where we reply first.",
} as const;

export const footer = {
  signoff: "صُنع في دبي",
  status: "All systems operational",
  tagline: "Production RWA tokenization · Dubai",
} as const;

export type HeroContent = typeof hero;
