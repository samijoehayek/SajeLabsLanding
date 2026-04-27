import { Section, SectionEyebrow, SectionTitle } from "@/components/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/content/site";

export function FAQ() {
  return (
    <Section id="faq" bordered>
      <div className="grid gap-12 lg:grid-cols-[360px_1fr] lg:gap-16">
        <div>
          <SectionEyebrow>{faq.eyebrow}</SectionEyebrow>
          <SectionTitle>The questions asset owners ask before signing.</SectionTitle>
          <p className="mt-5 text-base text-muted-foreground text-pretty">
            If your question isn't here, just apply. We answer every thoughtful inbound.
          </p>
        </div>

        <div>
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`q-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
