"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MonoPill } from "@/components/mono-pill";
import { cn } from "@/lib/utils";

type CaseStatus = "real" | "placeholder";

export interface CaseStudyData {
  id: string;
  status: CaseStatus;
  name: string;
  positioning: string;
  problem: string;
  approach: string;
  outcome: readonly string[];
  stack: readonly string[];
  terminal: { command: string; lines: readonly string[] };
  link: { label: string; href: string };
  explorerLabel: string | null;
  explorerHref: string | null;
}

export function CaseStudyCard({
  data,
  featured = false,
  index = 0,
}: {
  data: CaseStudyData;
  featured?: boolean;
  index?: number;
}) {
  const reduced = useReducedMotion();
  const isPlaceholder = data.status === "placeholder";
  const showDevBanner = isPlaceholder && process.env.NODE_ENV === "development";

  // PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE
  // (for placeholder-status cards; see PLACEHOLDERS.md)
  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card",
        featured && "lg:col-span-2 lg:row-span-1",
      )}
      data-case-status={data.status}
    >
      {/* Featured ambient glow */}
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        >
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        </div>
      )}

      {showDevBanner && (
        <div className="bg-amber-500/10 border-b border-amber-500/40 px-5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-amber-500">
          Placeholder — replace before launch
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                {data.name}
              </h3>
              {data.status === "real" ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Shipped
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-muted-foreground/30 bg-muted/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Case study
                </span>
              )}
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground text-pretty">
              {data.positioning}
            </p>
          </div>
          <a
            href={data.link.href}
            aria-label={`${data.link.label} — ${data.name}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-accent/50 hover:text-accent"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Problem
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 text-pretty">
              {data.problem}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Approach
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90 text-pretty">
              {data.approach}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Outcome
          </h4>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-3">
            {data.outcome.map((item) => (
              <li
                key={item}
                className="rounded-md border border-border/60 bg-background/50 px-3 py-2 font-mono text-[11px] text-foreground/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Stack
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {data.stack.map((s) => (
              <li key={s}>
                <MonoPill className="text-[10px] normal-case tracking-normal">{s}</MonoPill>
              </li>
            ))}
          </ul>
        </div>

        {/* Terminal pane */}
        <div className="mt-auto overflow-hidden rounded-lg border border-border/80 bg-background/60">
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-3 py-1.5">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {data.id}
            </span>
            <span />
          </div>
          <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-relaxed">
            <code>
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">{data.terminal.command}</span>
              {"\n"}
              {data.terminal.lines.map((line, i) => {
                const isCheck = line.trim().startsWith("✓");
                return (
                  <span
                    key={i}
                    className={cn(
                      "block",
                      isCheck ? "text-emerald-500" : "text-muted-foreground",
                    )}
                  >
                    {line}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>

        {(data.explorerHref || data.link) && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {data.explorerHref && (
              <a
                href={data.explorerHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {data.explorerLabel ?? "View contract"}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
  // END PLACEHOLDER CASE STUDY
}
