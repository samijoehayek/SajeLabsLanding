// -----------------------------------------------------------------------------
// SajeLabs — site-wide config (single source of truth)
// -----------------------------------------------------------------------------
// Edit here to change founder info, links, domain. No other file should
// hardcode any of these values.

export const siteConfig = {
  // Studio
  name: "SajeLabs",
  url: "https://sajelabs.com", // placeholder — replace before deploy
  tagline: "One senior developer. No agency overhead.",
  description:
    "Skip the agency. I'm a senior full-stack and blockchain developer with 7 years building production software at top MENA tech companies including STC. Web apps, full-stack platforms, blockchain, RWA tokenization, Web3 — shipped end-to-end by one developer.",
  ogTitle: "SajeLabs — Talk Directly to a Senior Developer",
  ogDescription:
    "Senior full-stack and blockchain developer. 7 years shipping production software at top MENA tech companies including STC. One developer, one budget, no agency overhead.",

  // Founder
  founder: {
    name: "Samijoe Hayek",
    role: "Senior Full-Stack & Blockchain Developer",
    location: "Dubai, UAE",
    shippingSince: 2019,
    yearsExperience: 7,
  },

  // Offer — single project-range, no productized tiers.
  offer: {
    headlinePrice: 15000,
    headlinePriceLabel: "$15K+",
    currency: "USD",
    typicalRange: "$15K – $60K",
    duration: "8–14 weeks",
    paymentSchedule: "30% on signing · 30% mid-build · 40% on delivery",
  },

  // Capabilities visible across the page — broad-to-specific, RWA last so the
  // niche traffic still converts without leading the messaging.
  services: [
    {
      id: "web-apps",
      label: "Web applications",
      description: "Production web apps with clean architecture and a stack you own.",
    },
    {
      id: "fullstack",
      label: "Full-stack platforms",
      description: "End-to-end builds: frontend, API, database, infra.",
    },
    {
      id: "blockchain",
      label: "Blockchain & Web3",
      description: "Smart contracts, dApps, wallet integrations, on-chain logic.",
    },
    {
      id: "rwa",
      label: "RWA tokenization",
      description: "ERC-3643 security tokens for regulated real-world assets.",
    },
  ],

  // Contact
  contact: {
    email: "samijoehayek1@gmail.com",
    whatsappDigits: "96170746299",
    whatsappDisplay: "+961 70 746 299",
    // Used by /apply Calendly embed.
    calendlyUrl: "https://calendly.com/samijoehayek1/rwa-tokenization-platform",
  },

  // Socials
  socials: {
    twitter: "https://twitter.com/samijoe_hayek",
    twitterHandle: "@samijoe_hayek",
    github: "https://github.com/samijoehayek",
    githubUser: "samijoehayek",
  },

  // Trust-signal chips used in the hero — the working stack, broad-first.
  techPills: [
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Solidity",
    "Ethereum",
    "Bitcoin",
  ],

  // Credibility bar (small, calm). Lead with the human signal, not the niche.
  credibilityPills: [
    "7 years shipping production software",
    "Ex-STC and top MENA tech",
    "Full-stack + blockchain",
    "One dev, end to end",
    "Based in Dubai 🇦🇪",
  ],

  // Nav links (centered anchors)
  nav: [
    { label: "Work", href: "#work" },
    { label: "How I work", href: "#process" },
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
