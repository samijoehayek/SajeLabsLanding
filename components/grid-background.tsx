import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  variant?: "grid" | "dot";
  fade?: boolean;
}

export function GridBackground({
  className,
  variant = "grid",
  fade = true,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        variant === "grid" ? "bg-grid" : "bg-dot",
        fade && "mask-radial-fade",
        className,
      )}
    />
  );
}

export function AccentGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-radial-fade",
        className,
      )}
    />
  );
}
