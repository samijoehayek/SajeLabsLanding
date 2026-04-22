// -----------------------------------------------------------------------------
// SajeLabs — all page copy, typed. Edit here to change the landing page
// without touching React.
// -----------------------------------------------------------------------------

export const hero = {
  // Pick the strongest. Commented alternatives are kept for quick swap.
  headline: "Production-ready Web3 MVPs, shipped in 8 weeks.",
  // headline: "We ship audit-ready Web3 MVPs for GCC founders in 8 weeks.",
  // headline: "From whitepaper to mainnet in 8 weeks.",

  subheadline:
    "Smart contracts on Ethereum and Bitcoin. Built by engineers who've shipped regulated, non-custodial products to mainnet. Based in Dubai.",
  primaryCta: { label: "Apply for a build slot", href: "#apply" },
  secondaryCta: { label: "See the work", href: "#work" },
} as const;

export const problem = {
  eyebrow: "Why most Web3 MVPs never ship",
  opener:
    "You've seen this movie. A founder raises a pre-seed, hires an agency, and twelve months later the product is an uncompiled repo and three unused Figma files. The pattern is predictable.",
  patterns: [
    {
      title: "Agencies that estimate in weeks and deliver in quarters",
      body:
        "Generalist shops that treat Web3 as a subset of web. They scope like a CRUD app and discover mainnet the hard way — usually three weeks past deadline.",
    },
    {
      title: "Smart contracts that pass tests and fail audits",
      body:
        "Happy-path coverage, zero invariant testing, no thought given to reentrancy surface or upgrade paths. You pay the auditor to write the critical review a senior should have written months earlier.",
    },
    {
      title: "Frontends built by people who've never connected a wallet",
      body:
        "Beautiful Figma, broken UX. Wallet states half-handled, chain switching missing, transaction UX that breaks trust the first time gas spikes. The contract works; the product doesn't.",
    },
  ],
} as const;

export const process = {
  eyebrow: "How we ship in 8 weeks",
  lede:
    "A fixed cadence. Four two-week phases. Demo every Friday. No surprises in week seven.",
  phases: [
    {
      week: "Weeks 1–2",
      title: "Discovery",
      summary: "We sharpen the spec, map the attack surface, and pick the chain.",
      deliverables: [
        "Technical spec + threat model",
        "Chain and L2 selection rationale",
        "Architecture diagram + data flow",
      ],
    },
    {
      week: "Weeks 3–4",
      title: "Architecture",
      summary: "Contracts drafted, infra wired, frontend skeleton with wallet connect.",
      deliverables: [
        "OpenZeppelin-standard contracts (Solidity 0.8.x)",
        "Foundry test suite — structure + invariants",
        "wagmi + RainbowKit frontend scaffold",
      ],
    },
    {
      week: "Weeks 5–6",
      title: "Build",
      summary: "Feature-complete on testnet. Daily commits, weekly demos.",
      deliverables: [
        "Foundry test suite with 90%+ coverage",
        "Full frontend flows, signed + unsigned states",
        "Production Node backend + PostgreSQL schema",
      ],
    },
    {
      week: "Weeks 7–8",
      title: "Ship",
      summary: "Mainnet deploy, Etherscan verify, pre-audit report, handover.",
      deliverables: [
        "Mainnet deployment + Etherscan verification",
        "Pre-audit report and remediation pass",
        "Vercel deployment pipeline + 30 days support",
      ],
    },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  lede: "Regulated, non-custodial, production. Not prototypes.",
  cases: [
    {
      id: "btcbacked",
      status: "real" as const,
      name: "BTCBacked",
      positioning: "The Swiss standard for Bitcoin-backed loans.",
      problem:
        "GCC Bitcoin holders had no regulated, non-custodial way to access liquidity against their BTC. Every option forced custody, wrapped BTC, or an unregulated desk.",
      approach:
        "Built a peer-to-peer marketplace with non-custodial Bitcoin collateralization, Swiss-grade compliance architecture, and production-ready infra. Real BTC, not wrapped.",
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
    {
      id: "vellos",
      status: "placeholder" as const,
      name: "Vellos",
      positioning: "Permissioned yield vaults for regulated Web3 funds.",
      problem:
        "{{REPLACE}} Regulated GCC funds wanted DeFi exposure but couldn't touch permissionless pools without compliance risk.",
      approach:
        "{{REPLACE}} Built permissioned ERC-4626 vaults with KYC gating, whitelisted strategy managers, and withdrawal queues. Deployed on Ethereum mainnet with Arbitrum expansion.",
      outcome: [
        "{{REPLACE}} in AUM across vaults",
        "{{REPLACE}} institutional depositors onboarded",
        "{{REPLACE}}% average APY across strategies",
      ],
      stack: [
        "Solidity 0.8.24",
        "Foundry",
        "OpenZeppelin",
        "viem",
        "Wagmi",
        "Next.js",
        "Arbitrum",
      ],
      terminal: {
        command: "sajelabs inspect --project vellos",
        lines: [
          "✓ ERC-4626 compliant",
          "✓ KYC-gated deposits",
          "✓ invariant-tested",
          "→ replace with real output",
        ],
      },
      link: { label: "View case", href: "#apply" },
      explorerLabel: "View on Etherscan",
      explorerHref: "#",
    },
    {
      id: "placeholder-3",
      status: "placeholder" as const,
      name: "{{REPLACE}} — RWA pilot",
      positioning: "{{REPLACE}} VARA-aware tokenization for Dubai-based RWA issuers.",
      problem:
        "{{REPLACE}} A regulated UAE entity wanted to tokenize a real-world cashflow under VARA guidelines without operating outside the regulatory perimeter.",
      approach:
        "{{REPLACE}} Designed a permissioned issuance contract with on-chain transfer restrictions, off-chain investor registry, and VARA-aware reporting hooks. Paired with a compliance-first investor portal.",
      outcome: [
        "{{REPLACE}} tokenized asset value",
        "{{REPLACE}} investors onboarded under VARA framework",
        "{{REPLACE}} settlement cycle reduced from T+N to on-chain",
      ],
      stack: [
        "Solidity 0.8.24",
        "Foundry",
        "OpenZeppelin (ERC-3643)",
        "Next.js",
        "Node.js",
        "VARA-aware reporting",
      ],
      terminal: {
        command: "sajelabs inspect --project rwa-pilot",
        lines: [
          "✓ VARA-aware",
          "✓ transfer-restricted ERC-3643",
          "✓ permissioned issuance",
          "→ replace with real output",
        ],
      },
      link: { label: "View case", href: "#apply" },
      explorerLabel: "View on Etherscan",
      explorerHref: "#",
    },
  ],
} as const;

export const technical = {
  eyebrow: "What actually ships with us",
  lede:
    "The specific promises behind the price. Every item below is a line in the scope doc.",
  cards: [
    {
      icon: "ShieldCheck",
      title: "Audit-ready from day one",
      body: "Invariant tests, fuzz harness, OpenZeppelin patterns. Auditors inherit a clean repo.",
    },
    {
      icon: "Gauge",
      title: "Gas-optimized Solidity",
      body: "Storage packing, custom errors, unchecked blocks where safe. Every byte accounted for.",
    },
    {
      icon: "Scale",
      title: "VARA-aware architecture",
      body: "Transfer restrictions, permissioned roles, off-chain registry hooks. Built for Dubai.",
    },
    {
      icon: "Factory",
      title: "Production infra, not prototypes",
      body: "Vercel pipelines, observability, error tracking, signed deployments. Not localhost demos.",
    },
    {
      icon: "CalendarClock",
      title: "Weekly demo Fridays",
      body: "Every Friday you see a working build. If we're slipping, you know in week one — not week seven.",
    },
    {
      icon: "KeyRound",
      title: "You keep 100% of the code",
      body: "No licensing tricks, no hidden dependencies on our infra. Clean handover, full IP.",
    },
  ],
} as const;

export const about = {
  eyebrow: "Founder",
  headline: "Built by an engineer who ships, not a salesperson who pitches.",
  paragraphs: [
    "I build Web3 products that pass audits and survive mainnet. My stack spans Ethereum (Solidity, Foundry, viem, wagmi) and Bitcoin (non-custodial flows, PSBT patterns, Script-aware infra), with production Node.js and PostgreSQL under the hood. I'm based in Dubai and I care about three things: shipping on schedule, shipping code that holds up under audit, and staying close to the regulated edge of Web3 where the real GCC opportunity lives.",
    "SajeLabs is a boutique studio by design. Fixed scope, fixed price, one project at a time. I focus on GCC founders because this region is where regulated Web3 actually builds — VARA in Dubai, the tokenization pilots with DAMAC and MAG, the institutional flows out of Riyadh and Doha. If you're shipping into this market, you don't need another generalist agency. You need someone who understands both the protocol and the regulator.",
  ],
} as const;

export const pricing = {
  eyebrow: "What a build costs",
  headline: "Starting at $28,000 fixed. 8-week delivery.",
  sub:
    "One founder, one engineer, one scope doc. Paid in three milestones. No surprise invoices, no hourly creep.",
  included: [
    "Smart contracts (Solidity or Bitcoin-native, as the project requires)",
    "Foundry test suite with 90%+ coverage and invariant harness",
    "Production-ready frontend with wallet integration (wagmi + RainbowKit)",
    "Backend and infra — Node.js, PostgreSQL, deployment pipeline",
    "Mainnet deployment with Etherscan verification",
    "Pre-audit report and remediation pass",
    "30 days of post-launch support",
  ],
  excluded: [
    {
      title: "Third-party audit fees",
      body: "We prep for audit. The audit firm (OpenZeppelin, Trail of Bits, Spearbit, etc.) bills you separately. We'll recommend and introduce.",
    },
    {
      title: "Token economics and go-to-market strategy",
      body: "Not our lane. We build the product. We can introduce tokenomics advisors and GCC-focused GTM partners who are good.",
    },
    {
      title: "Ongoing post-launch development",
      body: "Separate retainer starting at $6,000/month. Fixed scope per sprint, same cadence as the build.",
    },
  ],
} as const;

export const faq = {
  eyebrow: "FAQ",
  items: [
    {
      q: "Do you handle VARA compliance?",
      a: "We build VARA-aware — transfer restrictions, permissioned roles, reporting hooks — and we've shipped regulated-flavor Web3 before. We are not a law firm. For formal VARA licensing and legal opinions we introduce you to counsel we trust in Dubai.",
    },
    {
      q: "Who owns the code and IP?",
      a: "You do. 100%. No licensing back-doors, no shared dependencies on our infra, no locked-up admin keys post-handover. The repo is yours on day 56.",
    },
    {
      q: "What's the payment schedule?",
      a: "50% upfront to reserve the slot, 25% at the end of week four (architecture delivered), 25% on mainnet deployment. Wire or USDC on Arbitrum, your preference.",
    },
    {
      q: "What if you miss week 8?",
      a: "We eat the overage. If the scope is what we agreed in week one, we hit week eight. If scope expands mid-build, we quote a short extension — but the baseline is fixed.",
    },
    {
      q: "Ethereum or Bitcoin — how do we choose?",
      a: "Ethereum (or an EVM L2) is right for DeFi, tokenization, permissioned vaults, and composable financial primitives. Bitcoin is right for non-custodial lending against BTC, Ordinals, Runes, and sovereign settlement. We pick in week one, not before.",
    },
    {
      q: "Can you recommend a chain?",
      a: "Yes. For most GCC-facing institutional products we default to Ethereum mainnet + Arbitrum for liquidity and tooling maturity. For retail-facing consumer apps we'll often recommend Base. For Bitcoin-native plays we go direct to L1 with PSBT flows.",
    },
    {
      q: "What happens after launch?",
      a: "You get 30 days of bug support included. After that, you either take the repo in-house or continue with us on a retainer from $6,000/month. No pressure either way.",
    },
    {
      q: "Do you sign NDAs?",
      a: "Yes, on request. A simple mutual NDA before a discovery call is fine. We'll send ours if you don't have a template.",
    },
    {
      q: "What timezone do you work in?",
      a: "GCC hours (GST / UTC+4). Daily standups and weekly demos land inside your working day. If your team sits in London or Singapore we'll flex.",
    },
    {
      q: "How do we get started?",
      a: "Apply through the form below. We review every application within 48 hours. If we're a fit, we'll book a 30-minute strategy call. If we're not, we'll tell you and introduce someone who is.",
    },
  ],
} as const;

export const apply = {
  eyebrow: "Apply",
  headline: "Ready to ship? Tell us about your project.",
  body:
    "We review every application within 48 hours. If we're a fit, we'll book a 30-minute strategy call. If we're not, we'll tell you straight and introduce someone who is.",
  successHeadline: "Application received.",
  successBody:
    "We'll be in touch within 48 hours. Check your WhatsApp — that's usually where we reply first.",
} as const;

export const footer = {
  signoff: "صُنع في دبي",
  status: "All systems operational",
} as const;

export type HeroContent = typeof hero;
