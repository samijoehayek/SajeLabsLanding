import { ArrowRight, Check, X } from "lucide-react";
import { Section, SectionEyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { pricing } from "@/content/site";
import { siteConfig } from "@/config/site";

export function Pricing() {
  return (
    <Section id="pricing" bordered>
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow className="mx-auto">{pricing.eyebrow}</SectionEyebrow>
        <h2 className="mt-4 text-display-lg text-balance text-foreground">
          {pricing.headline}
        </h2>
        <p className="mt-5 text-lg text-muted-foreground text-pretty">{pricing.sub}</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Payment: {siteConfig.offer.paymentSchedule}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border bg-accent-muted/30 px-6 py-4 md:px-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            What's included
          </p>
        </div>
        <ul className="divide-y divide-border">
          {pricing.included.map((line) => (
            <li key={line} className="flex items-start gap-3 px-6 py-4 md:px-7">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="text-sm text-foreground/90">{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-6 max-w-3xl overflow-hidden rounded-xl border border-dashed border-border bg-background">
        <div className="border-b border-dashed border-border px-6 py-4 md:px-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            What's not included
          </p>
        </div>
        <ul className="divide-y divide-dashed divide-border">
          {pricing.excluded.map((item) => (
            <li key={item.title} className="flex items-start gap-3 px-6 py-4 md:px-7">
              <X className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground text-pretty">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg">
          <a href="#apply">
            Apply for a build slot
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
