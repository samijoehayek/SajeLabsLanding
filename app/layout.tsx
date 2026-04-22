import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./providers";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/config/site";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] ?? siteConfig.url,
  ),
  title: {
    default: `${siteConfig.name} — ${siteConfig.ogTitle.replace(`${siteConfig.name} — `, "")}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Web3 development studio",
    "Dubai Web3",
    "GCC Web3",
    "VARA smart contracts",
    "Bitcoin development",
    "Ethereum development",
    "RWA tokenization",
    "audit-ready smart contracts",
    "Solidity engineer Dubai",
    "SajeLabs",
  ],
  authors: [{ name: siteConfig.founder.name, url: siteConfig.socials.github }],
  creator: siteConfig.founder.name,
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: siteConfig.ogTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    creator: siteConfig.socials.twitterHandle,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  founder: {
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    sameAs: [siteConfig.socials.twitter, siteConfig.socials.github],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [siteConfig.socials.twitter, siteConfig.socials.github],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
