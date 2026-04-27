// -----------------------------------------------------------------------------
// SajeLabs — site-wide config (single source of truth)
// -----------------------------------------------------------------------------
// Edit here to change founder info, links, domain, pricing tiers. No other file
// should hardcode any of these values.

export const siteConfig = {
  // Studio
  name: "SajeLabs",
  url: "https://sajelabs.com", // placeholder — replace before deploy
  tagline: "Production RWA tokenization for GCC asset owners",
  description:
    "We build production-grade ERC-3643 RWA tokenization platforms for asset owners and family offices. Smart contracts, KYC, admin portal, mainnet deployment in 8 weeks. From $60K. Based in Dubai.",
  ogTitle: "SajeLabs — RWA Tokenization on Ethereum, Production-Ready in 8 Weeks",
  ogDescription:
    "ERC-3643 tokenization platforms for real estate, private credit, commodities, and funds. Smart contracts, KYC, NAV oracle, admin portal, mainnet deployment. From $60K. Dubai.",

  // Founder
  founder: {
    name: "Samijoe Hayek",
    role: "Founder & Principal Engineer, SajeLabs",
    location: "Dubai, UAE",
    shippingSince: 2019, // edit to your real "shipping since" year
  },

  // Offer (legacy single-price values kept for misc. copy; pricing tiers below)
  offer: {
    headlinePrice: 60000,
    currency: "USD",
    duration: "8 weeks",
    retainerFrom: 8000,
    paymentSchedule: "50% on signing · 25% on UAT acceptance · 25% on mainnet",
  },

  // Pricing tiers — RWA tokenization productized stack.
  // Edit prices, names, or feature lists here. The Pricing section reads this.
  pricingTiers: [
    {
      id: "foundations",
      name: "Foundations",
      price: 60000,
      priceLabel: "$60,000",
      priceSuffix: "fixed",
      duration: "8-week delivery",
      description:
        "The ERC-3643 stack you need to launch a compliant security token on mainnet.",
      mostPopular: false,
      features: [
        "ERC-3643 token + Identity Registry + Compliance engine",
        "ONCHAINID factory for investor identities",
        "Basic admin portal: mint/burn, KYC, role management",
        "Foundry test suite (90%+ coverage)",
        "Testnet (UAT) + Mainnet deployment",
        "Etherscan verification",
        "30-day defect warranty",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 95000,
      priceLabel: "$95,000",
      priceSuffix: "fixed",
      duration: "10-week delivery",
      description:
        "The full operator-ready stack: NAV oracle, document registry, complete admin portal.",
      mostPopular: true,
      features: [
        "Everything in Foundations, plus:",
        "NAVStore oracle for valuation updates",
        "DocumentsRegistry with IPFS / Arweave integration",
        "Full admin portal — all 10 dashboard cards (mint, KYC, claim topics, trusted issuers, documents, NAV, settings, ONCHAINID, claims issuance)",
        "Custom compliance rules (jurisdictional allowlists, transfer velocity, pause)",
        "Pre-audit report and remediation",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 150000,
      priceLabel: "From $150,000",
      priceSuffix: "starts at",
      duration: "12+ week delivery",
      description:
        "Custodian, KYC provider, and bespoke portal extensions for institutional issuers.",
      mostPopular: false,
      features: [
        "Everything in Standard, plus:",
        "Custodian integration (Cobo, Fireblocks, BitGo)",
        "KYC provider integration (Sumsub, Onfido, Persona)",
        "Bespoke admin portal extensions",
        "Secondary market UI (basic)",
        "Investor onboarding flow",
        "Ongoing retainer available post-launch (separate engagement)",
      ],
    },
  ],

  // Capabilities visible alongside RWA — keeps non-RWA inbound converting.
  rwaServices: [
    {
      id: "rwa",
      label: "RWA tokenization",
      description: "ERC-3643 platforms for real estate, private credit, commodities, funds.",
    },
    {
      id: "blockchain",
      label: "Blockchain development",
      description: "Bitcoin and Ethereum infrastructure, smart contracts, dApps.",
    },
    {
      id: "fullstack",
      label: "Full-stack Web3",
      description: "Production-grade frontends, APIs, and operator portals.",
    },
  ],

  // Contact
  contact: {
    email: "samijoehayek1@gmail.com",
    // Digits only — used to build wa.me links
    whatsappDigits: "96170746299",
    whatsappDisplay: "+961 70 746 299",
  },

  // Socials
  socials: {
    twitter: "https://twitter.com/samijoe_hayek",
    twitterHandle: "@samijoe_hayek",
    github: "https://github.com/samijoehayek",
    githubUser: "samijoehayek",
  },

  // Trust-signal chips used in the hero — RWA stack first, EVM/BTC second.
  techPills: [
    "ERC-3643",
    "ONCHAINID",
    "IPFS / Arweave",
    "Ethereum",
    "Bitcoin",
    "Foundry",
    "viem",
    "Next.js",
  ],

  // Credibility bar (small, calm) — institutional-leaning proof points.
  credibilityPills: [
    "$25B reference value tokenized",
    "ERC-3643 compliant",
    "KYC + ONCHAINID native",
    "Testnet → Mainnet in 8 weeks",
    "Based in Dubai 🇦🇪",
  ],

  // Nav links (centered anchors)
  nav: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type PricingTier = (typeof siteConfig.pricingTiers)[number];

export const waLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const mailto = (subject?: string) => {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};
