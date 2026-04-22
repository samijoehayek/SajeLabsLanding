import * as React from "react";
import { cn } from "@/lib/utils";

interface MonoPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  dotClassName?: string;
  withDot?: boolean;
}

export function MonoPill({
  children,
  className,
  dotClassName,
  withDot = false,
  ...props
}: MonoPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {withDot && (
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot",
            dotClassName,
          )}
        />
      )}
      {children}
    </span>
  );
}
