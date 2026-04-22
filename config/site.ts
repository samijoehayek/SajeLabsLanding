// -----------------------------------------------------------------------------
// SajeLabs — site-wide config (single source of truth)
// -----------------------------------------------------------------------------
// Edit here to change founder info, links, domain, offer price. No other file
// should hardcode any of these values.

export const siteConfig = {
  // Studio
  name: "SajeLabs",
  url: "https://sajelabs.com", // placeholder — replace before deploy
  tagline: "Shipping Web3 in Dubai.",
  description:
    "Boutique Web3 development studio. We ship production-ready MVPs with audit-ready smart contracts in 8 weeks. Ethereum, Bitcoin, and RWA. Based in Dubai.",
  ogTitle: "SajeLabs — Production-ready Web3 MVPs in 8 weeks",
  ogDescription: "Audit-ready smart contracts on Ethereum and Bitcoin. Built for GCC founders. Fixed scope, fixed price, 8 weeks.",

  // Founder
  founder: {
    name: "Samijoe Hayek",
    role: "Founder & Principal Engineer, SajeLabs",
    location: "Dubai, UAE",
    shippingSince: 2019, // edit to your real "shipping since" year
  },

  // Offer
  offer: {
    headlinePrice: 28000,
    currency: "USD",
    duration: "8 weeks",
    retainerFrom: 6000,
    paymentSchedule: "50% upfront · 25% mid-project · 25% on delivery",
  },

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

  // Trust-signal chips used in the hero
  techPills: [
    "Ethereum",
    "Bitcoin",
    "Polygon",
    "Arbitrum",
    "Base",
    "Solidity",
    "Foundry",
    "viem",
    "Next.js",
  ],

  // Credibility bar (small, calm)
  credibilityPills: [
    "Ethereum + Bitcoin native",
    "Audit-ready from day one",
    "VARA-aware architecture",
    "Fixed scope, fixed price",
    "Based in Dubai 🇦🇪",
  ],

  // Nav links (centered anchors)
  nav: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const waLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export const mailto = (subject?: string) => {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
};
