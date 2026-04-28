import crypto from "node:crypto";

const hash = (v: string) =>
  crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

/**
 * Fire a Meta Conversions API "Lead" event server-side. No-op when env vars
 * are missing — intentionally silent so local dev and preview deploys don't
 * hit Meta by accident.
 */
export async function sendMetaLead(opts: {
  email: string;
  phone?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  value?: number;
  currency?: string;
}) {
  const pixelId = process.env["NEXT_PUBLIC_META_PIXEL_ID"];
  const accessToken = process.env["META_CAPI_ACCESS_TOKEN"];
  const testEventCode = process.env["META_CAPI_TEST_EVENT_CODE"];
  if (!pixelId || !accessToken) return { skipped: true as const };

  const endpoint = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: opts.eventSourceUrl,
        user_data: {
          em: [hash(opts.email)],
          ...(opts.phone ? { ph: [hash(opts.phone.replace(/\D/g, ""))] } : {}),
          ...(opts.clientIp ? { client_ip_address: opts.clientIp } : {}),
          ...(opts.userAgent ? { client_user_agent: opts.userAgent } : {}),
        },
        custom_data: {
          currency: opts.currency ?? "USD",
          value: opts.value ?? 0,
        },
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
