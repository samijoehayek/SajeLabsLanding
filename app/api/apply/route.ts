import { NextRequest, NextResponse } from "next/server";
import { applySchema } from "@/lib/apply-schema";
import { sendMetaEvent } from "@/lib/meta-capi";
import { appendLead } from "@/lib/notion";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = applySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Meta dedup metadata travels alongside the validated form fields. The Zod
  // schema strips unknown keys, so pull them off the raw body separately.
  const meta = (json && typeof json === "object" ? json : {}) as {
    eventId?: unknown;
    value?: unknown;
  };
  const eventId = typeof meta.eventId === "string" ? meta.eventId : undefined;
  const leadValue = typeof meta.value === "number" ? meta.value : undefined;
  // eslint-disable-next-line no-console
  console.log("[apply route] eventId:", eventId, "value:", leadValue);

  // Honeypot tripped → pretend success to throw off bots
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Notion is the durable lead store. Set up Notion's built-in row
  // notifications on the database to get pinged when a lead arrives.
  const notionResult = await appendLead({
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp,
    company: data.company,
    assetType: data.assetType,
    stage: data.stage,
    timeline: data.timeline,
    budget: data.budget,
    description: data.description,
  });
  const notionOk = notionResult.skipped || notionResult.ok;
  if (!notionOk) {
    // eslint-disable-next-line no-console
    console.error(
      "[apply] Notion append failed — lead not persisted; check Vercel logs",
    );
  }

  // Meta CAPI Lead event (no-op without env vars). Fires regardless of
  // Notion outcome so attribution survives even if storage hiccups.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;
  const ua = req.headers.get("user-agent") ?? undefined;
  // First-party Pixel cookies are same-origin so they ride along on the POST.
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;

  await sendMetaEvent({
    eventName: "Lead",
    email: data.email,
    phone: data.whatsapp,
    eventSourceUrl: `${siteConfig.url}/#apply`,
    clientIp: ip,
    userAgent: ua,
    eventId,
    value: leadValue,
    fbp,
    fbc,
  });

  if (!notionOk) {
    return NextResponse.json(
      {
        error:
          "We may not have received your application. Please WhatsApp us directly.",
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
