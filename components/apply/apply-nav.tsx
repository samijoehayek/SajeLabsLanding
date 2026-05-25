"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Minimal nav for /apply — visually matches the home SiteNav (fixed top bar,
 * frosted on scroll) but strips everything except the logo. Per the paid-ad
 * landing brief: "no site navigation visible (or minimal: just a logo top-left
 * that doesn't link anywhere — we don't want distractions)."
 */
export function ApplyNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav
        className="container flex h-16 items-center"
        aria-label="Primary"
      >
        <Link
          href="/apply"
          className="group inline-flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground"
          aria-label={`${siteConfig.name} home`}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-sm bg-accent transition-transform group-hover:rotate-45"
          />
          <span>{siteConfig.name}</span>
        </Link>
      </nav>
    </header>
  );
}
