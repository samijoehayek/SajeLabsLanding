import crypto from "node:crypto";

const hash = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/**
 * Fire a Meta Conversions API event server-side. No-op when env vars
 * are missing — intentionally silent so local dev and preview deploys don't
 * hit Meta by accident.
 *
 * eventName is case-sensitive and must match the browser-side
 * fbq('track', '<name>') exactly for dedup to succeed.
 */
export async function sendMetaEvent(opts: {
  eventName?: string; // defaults to "Lead"
  email?: string;
  phone?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  value?: number;
  currency?: string;
  eventId?: string;
  // First-party Pixel cookies. Sent unhashed — Meta expects raw values.
  // fbp = browser ID (every Pixel'd visitor); fbc = ad click ID (ad-clickers only).
  fbp?: string;
  fbc?: string;
}) {
  const pixelId = process.env["NEXT_PUBLIC_META_PIXEL_ID"];
  const accessToken = process.env["META_CAPI_ACCESS_TOKEN"];
  const testEventCode = process.env["META_CAPI_TEST_EVENT_CODE"];
  if (!pixelId || !accessToken) return { skipped: true as const };

  const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  const eventName = opts.eventName ?? "Lead";

  const userData: Record<string, unknown> = {
    ...(opts.email ? { em: [hash(opts.email)] } : {}),
    ...(opts.phone ? { ph: [hash(opts.phone.replace(/\D/g, ""))] } : {}),
    ...(opts.clientIp ? { client_ip_address: opts.clientIp } : {}),
    ...(opts.userAgent ? { client_user_agent: opts.userAgent } : {}),
    ...(opts.fbp ? { fbp: opts.fbp } : {}),
    ...(opts.fbc ? { fbc: opts.fbc } : {}),
  };

  // custom_data carries value/currency for conversion events.
  // PageView doesn't need it — sending $0 there would just confuse reports.
  const isConversion = eventName === "Lead" || eventName === "Purchase";
  const customData = isConversion
    ? { currency: opts.currency ?? "USD", value: opts.value ?? 0 }
    : undefined;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        ...(opts.eventId ? { event_id: opts.eventId } : {}),
        action_source: "website",
        event_source_url: opts.eventSourceUrl,
        user_data: userData,
        ...(customData ? { custom_data: customData } : {}),
      },
    ],
    // When set, events route to Events Manager → Test Events tab instead of
    // counting toward production. Unset / remove the env var when done testing.
    ...(testEventCode ? { test_event_code: testEventCode } : {}),
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { skipped: false as const, ok: res.ok, status: res.status };
  } catch {
    return { skipped: false as const, ok: false, status: 0 };
  }
}
