import {
  ShieldCheck,
  Gauge,
  Scale,
  Factory,
  CalendarClock,
  KeyRound,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionEyebrow, SectionTitle, SectionLede } from "@/components/section";
import { technical } from "@/content/site";

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  Scale,
  Factory,
  CalendarClock,
  KeyRound,
};

export function Technical() {
  return (
    <Section id="technical" bordered>
      <div className="max-w-3xl">
        <SectionEyebrow>Differentiation</SectionEyebrow>
        <SectionTitle>{technical.eyebrow}</SectionTitle>
        <SectionLede>{technical.lede}</SectionLede>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {technical.cards.map((card) => {
          const Icon = iconMap[card.icon] ?? ShieldCheck;
          return (
            <div
              key={card.title}
              className="group relative flex flex-col gap-3 bg-card p-6 md:p-7 transition-colors hover:bg-card/70"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{card.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
