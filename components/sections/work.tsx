import { Section, SectionEyebrow, SectionTitle, SectionLede } from "@/components/section";
import { CaseStudyCard, type CaseStudyData } from "@/components/case-study-card";
import { work } from "@/content/site";

export function Work() {
  const [btcbacked, vellos, third] = work.cases as unknown as CaseStudyData[];

  return (
    <Section id="work" bordered>
      <div className="max-w-3xl">
        <SectionEyebrow>{work.eyebrow}</SectionEyebrow>
        <SectionTitle>Shipped work, not decks.</SectionTitle>
        <SectionLede>{work.lede}</SectionLede>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {btcbacked && <CaseStudyCard data={btcbacked} featured index={0} />}
        {/* PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE */}
        {vellos && <CaseStudyCard data={vellos} index={1} />}
        {/* PLACEHOLDER CASE STUDY — REPLACE WITH REAL PROJECT BEFORE GOING LIVE */}
        {third && <CaseStudyCard data={third} index={2} />}
      </div>
    </Section>
  );
}
