import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { applySchema } from "@/lib/apply-schema";
import { sendMetaLead } from "@/lib/meta-capi";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );

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

  // Honeypot tripped → pretend success to throw off bots
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Resend email
  const apiKey = process.env["RESEND_API_KEY"];
  const inbox = process.env["APPLY_INBOX"] ?? siteConfig.contact.email;
  const from = process.env["APPLY_FROM"] ?? `${siteConfig.name} <onboarding@resend.dev>`;

  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["WhatsApp", data.whatsapp],
    ["Company", data.company || "—"],
    ["Asset type", data.assetType],
    ["Asset value", data.assetValue],
    ["Jurisdiction", data.jurisdiction],
    ["Stage", data.stage],
    ["Timeline", data.timeline],
    ["Budget", data.budget],
    ["Description", data.description],
  ];

  const html = `
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#0b0d10;color:#e6e7ea;padding:24px;border-radius:8px;max-width:640px;margin:auto">
      <h1 style="font-size:16px;font-weight:600;color:#ff9a2a;margin:0 0 16px">SajeLabs — new application</h1>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #1f232a;color:#8b94a2;vertical-align:top;width:120px">${escapeHtml(k)}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #1f232a;white-space:pre-wrap">${escapeHtml(v)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:16px;font-size:12px;color:#8b94a2">Replies to this email go straight to the applicant.</p>
    </div>
  `;

  let emailOk = false;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [inbox],
        replyTo: data.email,
        subject: `New SajeLabs application — ${data.name} (${data.budget})`,
        html,
      });
      emailOk = !error;
    } catch {
      emailOk = false;
    }
  } else {
    // No Resend key — log to server so local dev still works
    // eslint-disable-next-line no-console
    console.info("[apply] RESEND_API_KEY missing — application received but not emailed:", data);
    emailOk = true;
  }

  // Meta CAPI Lead event (no-op without env vars)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    undefined;
  const ua = req.headers.get("user-agent") ?? undefined;

  await sendMetaLead({
    email: data.email,
    phone: data.whatsapp,
    eventSourceUrl: `${siteConfig.url}/#apply`,
    clientIp: ip,
    userAgent: ua,
  });

  if (!emailOk) {
    return NextResponse.json(
      { error: "We saved your application but email delivery failed. We'll still see it." },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
