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
    "RWA tokenization",
    "ERC-3643",
    "tokenize real estate Dubai",
    "security token issuance",
    "asset tokenization GCC",
    "ONCHAINID",
    "VARA tokenization",
    "tokenized real-world assets",
    "private credit tokenization",
    "Ethereum security token",
    "Bitcoin development",
    "Dubai Web3",
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
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "RWA Tokenization" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "ERC-3643 Implementation" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Smart Contract Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Web3 Full-Stack Development" },
    },
  ],
};

const tokenizationServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "RWA Tokenization on Ethereum (ERC-3643)",
  serviceType: "Real-world asset tokenization",
  description:
    "Production-grade ERC-3643 tokenization platforms for asset owners and family offices: smart contracts, KYC infrastructure, NAV oracle, document registry, and a role-gated admin portal. Testnet to mainnet in 8 weeks.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: ["AE", "SA", "QA", "BH", "OM", "KW", "CH", "SG"],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: 60000,
    highPrice: 150000,
    priceRange: "$60,000-$150,000+",
    offerCount: siteConfig.pricingTiers.length,
  },
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(tokenizationServiceJsonLd) }}
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
