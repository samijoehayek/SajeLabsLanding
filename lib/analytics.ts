// Client-side analytics helpers. All calls are no-ops unless the relevant
// NEXT_PUBLIC_* env vars are set.

type MetaPixel = (...args: unknown[]) => void;
type GA4 = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: MetaPixel;
    gtag?: GA4;
    dataLayer?: unknown[];
  }
}

export function trackLead(data: { email?: string; budget?: string }) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_category: "RWA tokenization",
      value: 0,
      currency: "USD",
      ...(data.budget ? { lead_budget: data.budget } : {}),
    });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      value: 0,
      currency: "USD",
      ...(data.budget ? { budget: data.budget } : {}),
    });
  }
}

export function pageView(path: string) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq === "function") window.fbq("track", "PageView");
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path });
  }
}
