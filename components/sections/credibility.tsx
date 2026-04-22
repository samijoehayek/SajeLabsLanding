import { MonoPill } from "@/components/mono-pill";
import { siteConfig } from "@/config/site";

export function Credibility() {
  return (
    <section
      aria-label="Credibility"
      className="border-y border-border bg-muted/40"
    >
      <div className="container flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-5 md:justify-between">
        {siteConfig.credibilityPills.map((label) => (
          <MonoPill
            key={label}
            className="border-transparent bg-transparent backdrop-blur-0 text-foreground/80 normal-case tracking-normal text-xs"
          >
            {label}
          </MonoPill>
        ))}
      </div>
    </section>
  );
}
