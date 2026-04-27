"use client";

import { ArrowRight, Terminal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MonoPill } from "@/components/mono-pill";
import { GridBackground, AccentGlow } from "@/components/grid-background";
import { hero } from "@/content/site";
import { siteConfig } from "@/config/site";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-48"
    >
      <GridBackground />
      <AccentGlow />

      <div className="container relative">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <MonoPill withDot className="mb-6">
            <span className="text-foreground/90">Accepting 2 tokenization slots — Q3</span>
          </MonoPill>

          <h1 className="text-display-xl text-balance font-semibold text-foreground">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>

          <div
            aria-hidden
            className="mt-8 font-mono text-xs text-muted-foreground/70"
          >
            {hero.ambientLine}
          </div>
        </motion.div>

        {/* Trust signal pills — monospace labels, no logos */}
        <motion.ul
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2"
          aria-label="Core stack"
        >
          <li className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
            <Terminal className="mr-1.5 inline h-3 w-3" />
            Stack
          </li>
          {siteConfig.techPills.map((label) => (
            <li key={label}>
              <MonoPill>{label}</MonoPill>
            </li>
          ))}
        </motion.ul>

        {/* Code-adjacent authenticity window */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 hidden max-w-2xl overflow-hidden rounded-lg border border-border bg-card/60 shadow-xl shadow-black/20 backdrop-blur-sm md:block"
          aria-hidden
        >
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              ~/sajelabs — zsh
            </span>
            <span />
          </div>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed">
            <code>
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">sajelabs scope --asset new-tokenization</span>
              {"\n"}
              <span className="text-muted-foreground">→ standard:</span>{" "}
              <span className="text-foreground">ERC-3643 + ONCHAINID</span>
              {"\n"}
              <span className="text-muted-foreground">→ contracts:</span>{" "}
              <span className="text-foreground">IdentityRegistry, ClaimTopics, Compliance, NAVStore</span>
              {"\n"}
              <span className="text-muted-foreground">→ portal:</span>{" "}
              <span className="text-foreground">role-gated · mint · KYC · NAV · documents</span>
              {"\n"}
              <span className="text-muted-foreground">→ network:</span>{" "}
              <span className="text-foreground">base sepolia → ethereum mainnet</span>
              {"\n"}
              <span className="text-muted-foreground">→ timeline:</span>{" "}
              <span className="text-accent">8 weeks</span>
              {"\n"}
              <span className="text-emerald-500">✓ slot reserved</span>
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
