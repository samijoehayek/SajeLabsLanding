/**
 * Notion as a durable lead store. Runs alongside Resend (notification) and
 * Meta CAPI (analytics) in the apply route. No-op when env vars are missing —
 * intentionally silent so local dev and preview deploys don't write to prod.
 *
 * Database schema this function targets (case-sensitive on property names):
 *   Name           Title
 *   Email          Email
 *   WhatsApp       Phone number
 *   Company        Text (rich_text)
 *   Asset Type     Text
 *   Asset Value    Text          (form sends range strings, not numbers)
 *   Jurisdiction   Text
 *   Stage          Status        (auto-set to "New"; user moves through workflow)
 *   Project Stage  Text          (the applicant's stated project stage)
 *   Timeline       Text
 *   Budget         Text          (form sends range strings)
 *   Description    Text
 */

const NOTION_API_VERSION = "2022-06-28";

type LeadFields = {
  name: string;
  email: string;
  whatsapp: string;
  company?: string;
  assetType: string;
  assetValue: string;
  jurisdiction: string;
  stage: string; // applicant's project stage — written to "Project Stage", not the CRM "Stage"
  timeline: string;
  budget: string;
  description: string;
};

export async function appendLead(data: LeadFields) {
  const token = process.env["NOTION_API_KEY"];
  const databaseId = process.env["NOTION_LEADS_DATABASE_ID"];
  if (!token || !databaseId) return { skipped: true as const };

  const text = (s: string) => ({ rich_text: [{ text: { content: s } }] });

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: data.name } }] },
    Email: { email: data.email },
    WhatsApp: { phone_number: data.whatsapp },
    Company: text(data.company || ""),
    "Asset Type": text(data.assetType),
    "Asset Value": text(data.assetValue),
    Jurisdiction: text(data.jurisdiction),
    Stage: { status: { name: "New" } },
    "Project Stage": text(data.stage),
    Timeline: text(data.timeline),
    Budget: text(data.budget),
    Description: text(data.description),
  };

  try {
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[notion] append failed:", res.status, body);
    }
    return { skipped: false as const, ok: res.ok, status: res.status };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[notion] append threw:", err);
    return { skipped: false as const, ok: false, status: 0 };
  }
}
