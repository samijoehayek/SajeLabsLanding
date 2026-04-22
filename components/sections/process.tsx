"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Section, SectionEyebrow, SectionTitle, SectionLede } from "@/components/section";
import { process } from "@/content/site";
import { cn } from "@/lib/utils";

export function Process() {
  const reduced = useReducedMotion();

  return (
    <Section id="process" bordered>
      <div className="max-w-3xl">
        <SectionEyebrow>Process</SectionEyebrow>
        <SectionTitle>{process.eyebrow}</SectionTitle>
        <SectionLede>{process.lede}</SectionLede>
      </div>

      {/* Desktop: horizontal timeline. Mobile: vertical list. */}
      <div className="mt-16">
        {/* progress rail */}
        <div
          aria-hidden
          className="relative hidden lg:block"
        >
          <div className="absolute left-0 right-0 top-5 h-px bg-border" />
          <motion.div
            initial={reduced ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "0% 50%" }}
            className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-accent via-accent/60 to-transparent"
          />
        </div>

        <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
          {process.phases.map((phase, i) => (
            <motion.li
              key={phase.title}
              initial={reduced ? undefined : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col gap-3 lg:pt-12"
            >
              <div className="flex items-center gap-3 lg:absolute lg:left-0 lg:top-0">
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-sm text-foreground",
                    i === 0 && "border-accent/50",
                  )}
                >
                  {i + 1}
                  {i === 0 && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-md"
                    />
                  )}
                </div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground lg:hidden">
                  {phase.week}
                </span>
              </div>

              <div className="lg:mt-2">
                <p className="hidden font-mono text-[11px] uppercase tracking-widest text-muted-foreground lg:block">
                  {phase.week}
                </p>
                <h3 className="text-xl font-semibold text-foreground">{phase.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">
                  {phase.summary}
                </p>
              </div>

              <ul className="mt-1 space-y-1.5">
                {phase.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 text-[13px] text-foreground/85"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                    <span className="text-pretty">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
