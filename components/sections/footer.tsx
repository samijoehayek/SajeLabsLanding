import Link from "next/link";
import { Github, Mail, MessageCircle, Twitter } from "lucide-react";
import { siteConfig, mailto, waLink } from "@/config/site";
import { footer } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:gap-6">
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-foreground"
            aria-label={`${siteConfig.name} home`}
          >
            <span aria-hidden className="inline-block h-2 w-2 rounded-sm bg-accent" />
            {siteConfig.name}
          </Link>
          <p className="text-sm text-muted-foreground">{footer.tagline}</p>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot"
            />
            {footer.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-14">
          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
              Navigate
            </h2>
            <ul className="space-y-2 text-sm">
              {siteConfig.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-foreground/80 transition-colors hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#apply" className="text-foreground/80 transition-colors hover:text-foreground">
                  Apply
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
              Contact
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={mailto("Project inquiry — SajeLabs")}
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={waLink("Hi Samijoe — interested in a build slot.")}
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
              Social
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <Twitter className="h-3.5 w-3.5" />
                  {siteConfig.socials.twitterHandle}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" />
                  {siteConfig.socials.githubUser}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="font-mono">
            © {siteConfig.name} {year} · <span lang="ar">{footer.signoff}</span> · {siteConfig.url.replace(/^https?:\/\//, "")}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
            Built for GCC asset owners shipping regulated digital infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
