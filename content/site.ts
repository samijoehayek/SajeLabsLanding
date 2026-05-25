// -----------------------------------------------------------------------------
// SajeLabs — all page copy, typed. Edit here to change the landing page
// without touching React.
// -----------------------------------------------------------------------------

export const hero = {
  headline:
    "Skip the agency. Talk directly to a senior developer who ships.",
  // headline: "Your project, built end-to-end by one senior developer.",
  // headline: "No account managers. No junior devs. Just one senior, shipping.",

  subheadline:
    "I build web apps, full-stack platforms, blockchain systems, and RWA tokenization — directly with founders and businesses. 7 years shipping production software at top MENA tech companies including STC. One developer, one budget, no surprises.",
  primaryCta: { label: "Book a free 20-min call", href: "/apply#book" },
  secondaryCta: { label: "See the work", href: "#work" },
  ambientLine: "// typescript · next.js · solidity · aws · postgres",
} as const;

export const problem = {
  eyebrow: "Why most software projects ship late, over budget, or never ship",
  opener:
    "You've been here before. You take a software idea to an agency, the senior pitches the deal, the juniors build it, the timeline doubles, the scope creeps, and the invoice triples. There's a faster, cheaper way that doesn't sacrifice quality — and it doesn't involve agencies.",
  patterns: [
    {
      title: "Agencies quote 3–4× what a senior dev actually costs.",
      body:
        "Most of that markup pays for project managers, account managers, sales overhead, and bench time. None of it touches your code. Working direct with the senior cuts the chain in half.",
    },
    {
      title: "The senior who pitched you isn't the one writing your code.",
      body:
        "Agencies sell with a senior architect, then assign juniors to the build. By the time you notice the architecture drift, the budget is gone. One senior end-to-end means no handoff, no quality drop.",
    },
    {
      title: "3-month quotes turn into 9-month deliveries.",
      body:
        "Scope creep, juniors learning on your dime, layered review processes — they all compound. A focused senior dev with a fixed scope ships in weeks, not quarters.",
    },
  ],
} as const;

export const process = {
  eyebrow: "How I work — end to end",
  lede:
    "Direct collaboration. Fixed scope. Weekly demos. No account managers between you and the code.",
  phases: [
    {
      week: "Week 0",
      title: "Free diagnostic call",
      summary:
        "20-minute call. Real cost range, realistic timeline, red flags to watch for, honest feasibility feedback.",
      deliverables: [
        "Cost range based on similar projects shipped",
        "Realistic delivery timeline",
        "Red flags to spot in any agency or developer pitch",
        "Honest \"is this feasible at your budget\" answer",
      ],
    },
    {
      week: "Week 1",
      title: "Scope & contract",
      summary:
        "Written scope, fixed price, milestone schedule. Both of us sign before any code is written.",
      deliverables: [
        "One-page written scope of work",
        "Fixed price, 3-milestone payment plan",
        "Stack and architecture choices you own",
      ],
    },
    {
      week: "Weeks 2–8",
      title: "Build",
      summary:
        "Senior-level execution. Weekly demos. You see real progress, not slide decks.",
      deliverables: [
        "Weekly Friday demos on staging",
        "Clean code, standard stacks (TypeScript, Next.js, Node.js, Postgres, Solidity)",
        "All commits pushed to a repo you own",
      ],
    },
    {
      week: "Delivery",
      title: "Ship",
      summary:
        "Production deployment, documentation, handover. Code stays yours; nothing locked behind me.",
      deliverables: [
        "Production deployment with monitoring",
        "Written docs and runbooks",
        "30-day post-launch defect warranty",
      ],
    },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  lede:
    "Real shipped projects across blockchain, full-stack, and RWA. Not prototypes, not demos.",
  cases: [
    // SeedVault — flagship RWA project, client name anonymized pending
    // public-attribution approval.
    {
      id: "seedvault",
      status: "real" as const,
      name: "SeedVault — RWA tokenization platform",
      positioning: "Full ERC-3643 tokenization stack for an insured, appraised physical inventory.",
      problem:
        "The fund held a unique physical inventory worth tens of billions in reference value with no path to fractional ownership, secondary liquidity, or compliant investor onboarding. Client (anonymized): Cape Town-based agricultural commodities fund manager.",
      approach:
        "Full ERC-3643 stack on Ethereum: security token, IdentityRegistry, ClaimTopicsRegistry, TrustedIssuersRegistry, Compliance engine, ONCHAINID factory, NAVStore oracle, IPFS-backed DocumentsRegistry, and a role-gated admin portal — shipped end-to-end by one developer.",
      outcome: [
        "10M tokens issued at $25B reference value",
        "Base Sepolia → Ethereum Mainnet delivery",
        "Full admin portal handed over and operational",
      ],
      stack: [
        "ERC-3643",
        "Solidity",
        "ONCHAINID",
        "Foundry",
        "Next.js",
        "viem",
        "IPFS",
        "Ethereum Mainnet",
      ],
      terminal: {
        command: "deploy --asset seedvault --network mainnet",
        lines: [
          "✓ erc-3643 verified",
          "✓ onchainid factory live",
          "✓ admin portal handed over",
        ],
      },
      link: { label: "View case", href: "/apply#book" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
    {
      id: "btcbacked",
      status: "real" as const,
      name: "BTCBacked — Bitcoin-backed lending platform",
      positioning: "Bitcoin-native, non-custodial financial infrastructure.",
      problem:
        "GCC Bitcoin holders had no regulated, non-custodial way to access liquidity against their BTC. Every alternative forced custody, wrapped BTC, or an unregulated desk.",
      approach:
        "Peer-to-peer marketplace with non-custodial Bitcoin collateralization, Swiss-grade compliance architecture, and production-ready full-stack infra. Real BTC, not wrapped. Shipped solo from architecture to production.",
      outcome: [
        "Non-custodial Bitcoin collateral live in production",
        "Full-stack platform: API, Postgres, on-chain logic",
        "Audit-ready architecture",
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
        command: "inspect --project btcbacked",
        lines: [
          "✓ non-custodial",
          "✓ audit-ready",
          "✓ production",
          "✓ real BTC — no wrapping",
        ],
      },
      link: { label: "View case", href: "/apply#book" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
    // Placeholder slot for next case study — could be a SaaS, full-stack, or
    // blockchain project. Replace before launch.
    {
      id: "placeholder-3",
      status: "placeholder" as const,
      name: "Your project — next slot",
      positioning: "Web app, full-stack platform, or blockchain build — solo execution.",
      problem:
        "{{REPLACE}} Brief project context. Could be a SaaS MVP, an internal full-stack platform, or a blockchain integration.",
      approach:
        "{{REPLACE}} Architecture decisions, stack picks, and the senior-led build cadence we delivered together.",
      outcome: [
        "{{REPLACE}} Headline metric",
        "{{REPLACE}} Delivery milestone",
        "{{REPLACE}} Post-launch state",
      ],
      stack: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "AWS",
      ],
      terminal: {
        command: "status --project next-slot",
        lines: [
          "→ in progress",
          "→ replace with real output",
        ],
      },
      link: { label: "View case", href: "/apply#book" },
      explorerLabel: null as string | null,
      explorerHref: null as string | null,
    },
  ],
} as const;

export const technical = {
  eyebrow: "What you actually get",
  lede:
    "What working directly with a senior developer looks like, line by line.",
  cards: [
    {
      icon: "ShieldCheck",
      title: "One senior, end to end",
      body:
        "The developer pitching you is the developer writing your code. No handoff to juniors. No quality drop after the sales call.",
    },
    {
      icon: "Scale",
      title: "Fixed scope, fixed budget",
      body:
        "Written scope before any code is written. Milestone-based payments. Scope changes are discussed — never silently billed.",
    },
    {
      icon: "Factory",
      title: "Standard stacks, no vendor lock-in",
      body:
        "TypeScript, Next.js, Node.js, Postgres, Solidity, AWS. Code you can hand to any future team without translation.",
    },
    {
      icon: "Gauge",
      title: "Weekly demos, real progress",
      body:
        "Every Friday on staging. You see what shipped that week. No surprise reveal at delivery — by the time we launch, you've used it for weeks.",
    },
    {
      icon: "CalendarClock",
      title: "8–14 weeks, not 9 months",
      body:
        "Senior execution + fixed scope = predictable delivery. Most projects ship in a single quarter.",
    },
    {
      icon: "KeyRound",
      title: "You own everything",
      body:
        "Repo access from day one. Source, infra, deployment scripts, runbooks. Nothing locked behind me post-handover.",
    },
  ],
} as const;

export const about = {
  eyebrow: "About",
  headline: "Built by a senior who codes, not a salesperson who pitches.",
  paragraphs: [
    "I'm Samijoe Hayek, a senior full-stack and blockchain developer based in Dubai. I've spent 7 years building production software — web applications, full-stack platforms, blockchain systems, and RWA tokenization — at top MENA tech companies including STC.",
    "I now work directly with founders, established businesses, and funded startups who want senior-level delivery without agency overhead. One developer, one budget, one point of accountability. If your project is too small for an agency or too senior for a junior, we should talk.",
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  items: [
    {
      q: "What kinds of projects do you take on?",
      a: "Web apps, full-stack platforms, blockchain projects (DeFi, RWA tokenization, Web3 integrations), MVPs for startups, and feature builds inside existing codebases. If you're not sure your project fits, book the free call and we'll figure it out together.",
    },
    {
      q: "What's your typical price range?",
      a: "Most projects fall between $15K and $60K depending on scope. You'll get a real number on the call after we go through your requirements — not a number pulled from an agency markup spreadsheet.",
    },
    {
      q: "Are you really one person? What if you get hit by a bus?",
      a: "Yes, I'm one person — that's the whole point. I work with a small trusted network of senior devs I can bring in for specific tasks if needed, but the architecture, core logic, and accountability stay with me. I document everything as I build, so the code is always handover-ready.",
    },
    {
      q: "How do you handle contracts and payments?",
      a: "Milestone-based contract. Typically 30% on signing, 30% at mid-build, 40% on delivery. Written scope before we start; we both sign off. No hourly creep, no surprise invoices.",
    },
    {
      q: "What happens after the free call?",
      a: "If we're a fit, you'll get a written proposal within 48 hours with scope, timeline, and price. No pressure to decide on the call. If we're not a fit, I'll often refer you to someone who is.",
    },
    {
      q: "Who owns the code and IP?",
      a: "You do, on full payment. Source code, infra, deployment scripts, documentation, runbooks. I retain rights to my own pre-existing internal libraries, granted to you under perpetual royalty-free license as incorporated.",
    },
    {
      q: "Do you sign NDAs?",
      a: "Always, before any commercial detail is shared.",
    },
    {
      q: "What's the timezone?",
      a: "Dubai (GMT+4). Full GCC working-hours overlap. European clients get morning overlap; US East Coast clients get end-of-day overlap.",
    },
  ],
} as const;

export const apply = {
  eyebrow: "Get in touch",
  headline: "Have a project? Tell me about it.",
  body:
    "I reply within 48 hours. If it's a fit, we'll book a free 20-minute call to scope your project. If it's not, I'll tell you straight and often refer you to someone who is.",
  successHeadline: "Got it — talk soon.",
  successBody:
    "I'll be in touch within 48 hours. Check your WhatsApp — that's usually where I reply first.",
} as const;

export const footer = {
  signoff: "صُنع في دبي",
  status: "Available for new projects",
  tagline: "One senior developer · Dubai",
} as const;

export type HeroContent = typeof hero;
