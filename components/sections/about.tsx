import { Github, Mail, MapPin, MessageCircle, Twitter } from "lucide-react";
import { Section, SectionEyebrow, SectionTitle } from "@/components/section";
import { GithubActivity } from "@/components/github-activity";
import { about } from "@/content/site";
import { siteConfig, mailto, waLink } from "@/config/site";

export function About() {
  return (
    <Section id="about" bordered>
      <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
        {/* Photo column */}
        <div>
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-border bg-muted lg:mx-0 lg:h-64 lg:w-64">
            {/* {{FOUNDER_PHOTO}} — replace with a real photo in /public/founder.jpg and swap this block */}
            <div
              aria-hidden
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 via-background to-background font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            >
              {"{{FOUNDER_PHOTO}}"}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-accent/10"
            />
          </div>

          <div className="mt-6 text-center lg:text-left">
            <p className="text-lg font-semibold text-foreground">
              {siteConfig.founder.name}
            </p>
            <p className="text-sm text-muted-foreground">{siteConfig.founder.role}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {siteConfig.founder.location}
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <li>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={mailto("Hello from a founder")}
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </li>
            <li>
              <a
                href={waLink("Hi Samijoe — interested in working with SajeLabs.")}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>

        {/* Copy column */}
        <div>
          <SectionEyebrow>{about.eyebrow}</SectionEyebrow>
          <SectionTitle>{about.headline}</SectionTitle>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <GithubActivity />
        </div>
      </div>
    </Section>
  );
}
