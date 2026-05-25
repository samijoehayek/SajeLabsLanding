"use client";

import * as React from "react";
import Script from "next/script";
import { trackLead } from "@/lib/analytics";

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

// Captures UTM parameters from the current URL and forwards them to Calendly
// as utm_* prefill. Calendly stores these on the booking so paid-traffic
// attribution survives all the way to the scheduled call.
function readUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

interface CalendlyMessage {
  event?: string;
  payload?: unknown;
}

function isCalendlyEvent(e: MessageEvent): e is MessageEvent<CalendlyMessage> {
  if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) {
    return false;
  }
  const data = e.data as CalendlyMessage | undefined;
  return typeof data?.event === "string" && data.event.startsWith("calendly.");
}

type CalendlyAPI = {
  initInlineWidget: (opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, unknown>;
    utm?: Record<string, string>;
  }) => void;
};

export function CalendlyEmbed({ url }: { url: string }) {
  const [scriptReady, setScriptReady] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const initializedRef = React.useRef(false);
  const utmsRef = React.useRef<Record<string, string>>({});

  React.useEffect(() => {
    utmsRef.current = readUtms();
  }, []);

  // Fire Meta `Lead` when Calendly confirms a booking. Browser Pixel only —
  // server CAPI dedup would require a Calendly webhook listener (out of scope).
  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!isCalendlyEvent(e)) return;
      if (e.data.event !== "calendly.event_scheduled") return;
      const eventId = `calendly_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 11)}`;
      // eslint-disable-next-line no-console
      console.log("[calendly] event_scheduled — firing Lead", eventId);
      trackLead({
        value: 30000,
        currency: "USD",
        contentCategory: "Diagnostic call",
        contentName: "Calendly booking",
        eventID: eventId,
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Mount Calendly's iframe inside containerRef. We use a ref so React never
  // diffs the iframe Calendly creates (it lives outside React's tree). Init
  // is one-shot — guarded by initializedRef so a re-render can't double-mount.
  React.useEffect(() => {
    if (!scriptReady) return;
    if (initializedRef.current) return;
    const parent = containerRef.current;
    if (!parent) return;
    const w = window as unknown as { Calendly?: CalendlyAPI };
    if (!w.Calendly) return;

    initializedRef.current = true;
    const utm = utmsRef.current;
    w.Calendly.initInlineWidget({
      url,
      parentElement: parent,
      ...(Object.keys(utm).length > 0 ? { utm } : {}),
    });
  }, [scriptReady, url]);

  return (
    <div className="relative w-full">
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href={CALENDLY_CSS} />
      <Script
        src={CALENDLY_JS}
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onLoad={() => setScriptReady(true)}
      />

      {/* Calendly mount target — controlled entirely by Calendly's JS. */}
      {/* Explicit height is required (min-height collapses the iframe). */}
      {/* Mobile needs ~1100px because the month picker stacks; desktop fits in ~820px. */}
      <div
        ref={containerRef}
        className="h-[1100px] w-full overflow-hidden rounded-xl border border-border bg-card sm:h-[1000px] md:h-[820px]"
        aria-label="Schedule a call"
      />

      {!scriptReady && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          Loading scheduler…
        </div>
      )}
    </div>
  );
}
