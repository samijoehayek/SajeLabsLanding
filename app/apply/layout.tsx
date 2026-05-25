import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book a free 20-minute call with a senior developer · SajeLabs",
  description:
    "Talk directly to a senior full-stack and blockchain developer before you sign with an agency. Free 20-minute diagnostic call. Real cost range, realistic timeline, red flags to watch for. 7 years shipping production software at top MENA tech companies including STC.",
  alternates: { canonical: `${siteConfig.url}/apply` },
  // Paid-ad landing — keep it out of search to avoid splitting authority
  // with the homepage and to keep organic traffic on the long-form site.
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/apply`,
    title: "Talk directly to a senior developer — free 20-min call",
    description:
      "Skip the agency. Free 20-minute diagnostic call. Real cost range, realistic timeline, honest feasibility feedback.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk directly to a senior developer — free 20-min call",
    description:
      "Free 20-minute diagnostic call. Real cost range, realistic timeline, honest feasibility feedback.",
    images: ["/api/og"],
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
