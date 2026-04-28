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

export function trackLead(data: {
  email?: string;
  budget?: string;
  value?: number;
  currency?: string;
  contentCategory?: string;
  contentName?: string;
  eventID?: string;
}) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq === "function") {
    const params = {
      content_category: data.contentCategory ?? "RWA tokenization",
      ...(data.contentName ? { content_name: data.contentName } : {}),
      value: data.value ?? 0,
      currency: data.currency ?? "USD",
      ...(data.budget ? { lead_budget: data.budget } : {}),
    };
    if (data.eventID) {
      // 4th arg carries eventID for browser↔server CAPI deduplication
      window.fbq("track", "Lead", params, { eventID: data.eventID });
    } else {
      window.fbq("track", "Lead", params);
    }
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      value: data.value ?? 0,
      currency: data.currency ?? "USD",
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
