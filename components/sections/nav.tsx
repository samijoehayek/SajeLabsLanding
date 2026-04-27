"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-background/70 border-b border-border"
            : "bg-transparent",
        )}
      >
        <nav
          className="container flex h-16 items-center justify-between"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground"
            aria-label={`${siteConfig.name} home`}
          >
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-sm bg-accent transition-transform group-hover:rotate-45"
            />
            <span>{siteConfig.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block">
              <WalletButton compact />
            </div>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#apply">Apply</a>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 flex flex-col bg-background/95 pt-16 backdrop-blur-lg md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <ul className="container flex flex-col gap-2 pt-10">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-md px-3 py-3 text-lg font-medium text-foreground hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-4 flex items-center gap-3">
              <WalletButton />
              <ThemeToggle />
            </li>
            <li className="mt-4">
              <Button asChild size="lg" className="w-full">
                <a href="#apply" onClick={() => setMobileOpen(false)}>
                  Apply for a tokenization slot
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
