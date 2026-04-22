import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  as?: "section" | "article" | "div";
  bordered?: boolean;
}

export function Section({
  id,
  as = "section",
  bordered = false,
  className,
  children,
  ...props
}: SectionProps) {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-32",
        bordered && "border-t border-border",
        className,
      )}
      {...props}
    >
      <div className="container relative">{children}</div>
    </Tag>
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      <span className="h-px w-6 bg-border" />
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
  as: As = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <As
      className={cn(
        "text-display-lg text-balance text-foreground mt-4",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function SectionLede({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-5 max-w-2xl text-lg text-muted-foreground text-pretty", className)}>
      {children}
    </p>
  );
}
