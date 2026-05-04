import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta-capi";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server mirror of the browser Pixel PageView. The Pixel init script generates
 * one eventId per page load, fires fbq('track', 'PageView', {}, { eventID }),
 * and beacons that same eventId here so Meta can deduplicate the pair.
 *
 * Without this route, Meta's Events Manager → Deduplication keys panel
 * shows ~25% coverage (only Lead is mirrored). With it, ~100%.
 */
export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const meta = (json && typeof json === "object" ? json : {}) as {
    eventId?: unknown;
  };
  const eventId = typeof meta.eventId === "string" ? meta.eventId : undefined;
  if (!eventId) return NextResponse.json({ ok: false }, { status: 400 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;
  const ua = req.headers.get("user-agent") ?? undefined;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;

  // eslint-disable-next-line no-console
  console.log("[pageview route] eventId:", eventId);

  await sendMetaEvent({
    eventName: "PageView",
    eventSourceUrl: req.headers.get("referer") ?? `${siteConfig.url}/`,
    clientIp: ip,
    userAgent: ua,
    eventId,
    fbp,
    fbc,
  });

  return NextResponse.json({ ok: true });
}
