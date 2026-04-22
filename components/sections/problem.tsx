import { AlertTriangle } from "lucide-react";
import { Section, SectionEyebrow, SectionTitle, SectionLede } from "@/components/section";
import { problem } from "@/content/site";

export function Problem() {
  return (
    <Section id="problem" bordered>
      <div className="max-w-3xl">
        <SectionEyebrow>Problem</SectionEyebrow>
        <SectionTitle>{problem.eyebrow}</SectionTitle>
        <SectionLede>{problem.opener}</SectionLede>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {problem.patterns.map((p, i) => (
          <article
            key={p.title}
            className="group relative bg-card p-6 md:p-7 transition-colors hover:bg-card/80"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <AlertTriangle className="h-4 w-4 text-accent/80" aria-hidden />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground text-balance">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
