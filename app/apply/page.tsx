import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Flag,
  HeartHandshake,
  X as XIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MonoPill } from "@/components/mono-pill";
import { GridBackground, AccentGlow } from "@/components/grid-background";
import { ApplyNav } from "@/components/apply/apply-nav";
import { Apply } from "@/components/sections/apply";
import { siteConfig } from "@/config/site";

// /apply — paid-ad conversion landing. Single-page, long-scroll. No site nav,
// minimal footer, separate metadata (see app/apply/layout.tsx). The Meta Pixel
// PageView fires from <Analytics> in the root layout; the Lead event (browser
// Pixel + server CAPI deduplicated via shared eventID) fires from the <Apply />
// form section at the bottom of the page, same pipeline as the homepage.

const walkAway = [
  {
    icon: DollarSign,
    title: "A realistic cost range for your project.",
    body: "Built from 7 years of shipping similar systems — not pulled from an agency markup spreadsheet.",
  },
  {
    icon: Clock,
    title: "A realistic timeline.",
    body: "What it actually takes to build, not what sounds good in a pitch deck.",
  },
  {
    icon: Flag,
    title: "The red flags to watch for.",
    body: "Every founder I've talked to could have saved tens of thousands by spotting these earlier.",
  },
  {
    icon: HeartHandshake,
    title: "Honest feedback on feasibility.",
    body: "If your idea doesn't make sense at your budget, I'll tell you. If it does, I'll tell you that too.",
  },
] as const;

const compareRows = [
  {
    agency: "$80K+ quotes for MVPs",
    direct: "$20K–$40K for the same scope",
  },
  {
    agency: "6–9 month timelines",
    direct: "8–14 week timelines",
  },
  {
    agency: "Senior pitches the deal, juniors build it",
    direct: "The senior pitching IS the one writing the code",
  },
  {
    agency: "12+ people on your project, you'll meet 2",
    direct: "One developer, end to end",
  },
  {
    agency: "Scope creep eats the budget",
    direct: "Fixed scope, fixed budget, no surprises",
  },
  {
    agency: "Vendor lock-in on proprietary stacks",
    direct: "Clean code you own, in standard stacks",
  },
] as const;

const applyFaq = [
  {
    q: "Are you really one person? What if you get hit by a bus?",
    a: "Yes, I'm one person — that's the point. I work with a small trusted network of senior devs I can bring in for specific tasks if needed, but the architecture, core logic, and accountability stay with me. I document everything as I build so the code is always handover-ready.",
  },
  {
    q: "What kinds of projects do you take on?",
    a: "Web apps, full-stack platforms, blockchain projects (DeFi, RWA, tokenization, Web3 integrations), MVPs for startups, and feature builds inside existing codebases. If you're not sure, book the call and we'll figure it out together.",
  },
  {
    q: "What's your typical price range?",
    a: "Most projects fall between $15K and $60K depending on scope. I'll give you a real number on the call after we go through your requirements. No surprises later.",
  },
  {
    q: "How do you handle contracts and payments?",
    a: "Standard milestone-based contract. Typically 30% up front, 30% at mid-point, 40% on delivery. I send a written scope before we start and we both sign off on it.",
  },
  {
    q: "What happens after the free call?",
    a: "If we're a fit, I'll send a written proposal within 48 hours with scope, timeline, and price. No pressure to decide on the call. If we're not a fit, I'll often refer you to someone who is.",
  },
] as const;

export default function ApplyPage() {
  const year = new Date().getFullYear();

  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <ApplyNav />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridBackground />
        <AccentGlow />
        <div className="container relative">
          <div className="max-w-3xl">
            <MonoPill withDot className="mb-6">
              <span className="text-foreground/90">Free 20-min diagnostic call</span>
            </MonoPill>

            <h1 className="text-display-xl text-balance font-semibold text-foreground">
              Talk Directly to a Senior Developer — Before You Sign with an Agency.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty md:text-xl">
              Free 20-minute diagnostic call. You&apos;ll walk away knowing your
              project&apos;s real cost, realistic timeline, and the red flags to
              watch for in any developer or agency pitch.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="#apply">
                  Get Your Free Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                No pitch. No upsell. If your project isn&apos;t a fit, I&apos;ll
                tell you that too.
              </p>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              7 years building production software at top MENA tech companies
              including STC
            </div>
          </div>

          {/*
            Intro video placeholder — replace the block below with a real
            <video> tag once a 30–45s "real me" intro clip is recorded.
            Keep it muted + with captions. Static placeholder is fine for now.

            <video
              src="/apply/intro.mp4"
              poster="/apply/intro-poster.jpg"
              muted
              playsInline
              controls
              className="mt-12 w-full rounded-xl border border-border"
            />
          */}
        </div>
      </section>

      {/* ---------- Walk-away list ---------- */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              What You&apos;ll Walk Away With
            </p>
            <h2 className="mt-4 text-display-md text-balance text-foreground">
              Four concrete things, in twenty minutes.
            </h2>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {walkAway.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-5 bg-card p-6 md:p-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-foreground text-balance">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- Agency vs Direct comparison ---------- */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Agency vs. Direct
            </p>
            <h2 className="mt-4 text-display-md text-balance text-foreground">
              Why talk to me directly instead of an agency.
            </h2>
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2 border-b border-border bg-card">
              <div className="px-5 py-4 md:px-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Agency
                </p>
              </div>
              <div className="border-l border-border px-5 py-4 md:px-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  Direct (working with me)
                </p>
              </div>
            </div>
            <ul className="divide-y divide-border">
              {compareRows.map((row) => (
                <li
                  key={row.agency}
                  className="grid grid-cols-2 bg-card transition-colors hover:bg-card/80"
                >
                  <div className="flex items-start gap-3 px-5 py-5 md:px-7">
                    <XIcon
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <span className="text-sm text-foreground/85 text-pretty">
                      {row.agency}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 border-l border-border px-5 py-5 md:px-7">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    <span className="text-sm font-medium text-foreground text-pretty">
                      {row.direct}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <a href="#apply">
                Get Your Free Call
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-4 text-display-md text-balance text-foreground">
              One senior developer, end to end.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
              I&apos;m {siteConfig.founder.name}. I&apos;ve spent 7 years
              building production software — web applications, full-stack
              platforms, blockchain systems, RWA tokenization, and Web3
              infrastructure — at top MENA tech companies including STC. I now
              work directly with founders and businesses who want senior-level
              delivery without agency overhead. One developer, one budget, one
              point of accountability.
            </p>
            {/*
              Optional headshot — drop a 512×512 (or larger) image at
              public/founder/Main.jpg (already in place) or replace below.
            */}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="border-t border-border bg-muted/20 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              FAQ
            </p>
            <h2 className="mt-4 text-display-md text-balance text-foreground">
              Questions before you book.
            </h2>

            <Accordion type="single" collapsible className="mt-10 w-full">
              {applyFaq.map((item, i) => (
                <AccordionItem key={item.q} value={`q-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ---------- Apply form ----------
        Uses the same <Apply /> section component as the homepage. This keeps
        the full pixel pipeline intact on /apply:
          - form generates a single eventID
          - browser Pixel Lead fires with value + budget + content_category
          - server CAPI Lead fires with hashed email/phone (deduped via eventID)
          - lead is written to Notion
        Anchor id="apply" is set by the Section wrapper inside <Apply />.
      */}
      <Apply />

      {/* ---------- Minimal footer ---------- */}
      <footer className="border-t border-border py-10">
        <div className="container text-center text-xs text-muted-foreground">
          <p className="font-mono">
            © {siteConfig.name} {year} · {siteConfig.founder.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
