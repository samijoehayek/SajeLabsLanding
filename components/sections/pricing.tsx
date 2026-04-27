import { ArrowRight, Check, X } from "lucide-react";
import { Section, SectionEyebrow } from "@/components/section";
import { Button } from "@/components/ui/button";
import { pricing } from "@/content/site";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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

      <div className="mx-auto mt-14 grid gap-6 lg:grid-cols-3 lg:gap-5">
        {siteConfig.pricingTiers.map((tier) => {
          const popular = tier.mostPopular;
          return (
            <article
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-xl border bg-card p-6 md:p-7",
                popular
                  ? "border-accent/50 shadow-lg shadow-accent/5"
                  : "border-border",
              )}
              aria-label={`${tier.name} tier`}
            >
              {popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-background px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Most popular
                </span>
              )}

              <header>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {tier.name}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-foreground md:text-4xl">
                    {tier.priceLabel}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {tier.priceSuffix}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {tier.duration}
                </p>
                <p className="mt-4 text-sm text-muted-foreground text-pretty">
                  {tier.description}
                </p>
              </header>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    <span className="text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  variant={popular ? "default" : "outline"}
                  className="w-full"
                >
                  <a href="#apply">
                    {popular ? "Reserve this slot" : "Apply"}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-xl border border-dashed border-border bg-background">
        <div className="border-b border-dashed border-border px-6 py-4 md:px-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {pricing.excludedTitle}
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
    </Section>
  );
}
