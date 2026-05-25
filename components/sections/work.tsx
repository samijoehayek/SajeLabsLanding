import { Section, SectionEyebrow, SectionTitle, SectionLede } from "@/components/section";
import { CaseStudyCard, type CaseStudyData } from "@/components/case-study-card";
import { work } from "@/content/site";

export function Work() {
  const [seedvault, btcbacked, third] = work.cases as unknown as CaseStudyData[];

  return (
    <Section id="work" bordered>
      <div className="max-w-3xl">
        <SectionEyebrow>{work.eyebrow}</SectionEyebrow>
        <SectionTitle>Shipped projects, not pitch decks.</SectionTitle>
        <SectionLede>{work.lede}</SectionLede>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Flagship — SeedVault RWA tokenization (anonymized client). */}
        {seedvault && <CaseStudyCard data={seedvault} featured index={0} />}
        {btcbacked && <CaseStudyCard data={btcbacked} index={1} />}
        {/* PLACEHOLDER — replace with next shipped project. */}
        {third && <CaseStudyCard data={third} index={2} />}
      </div>
    </Section>
  );
}
