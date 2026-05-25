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
    "senior full-stack developer",
    "freelance senior developer Dubai",
    "blockchain developer Dubai",
    "hire senior developer",
    "skip the agency",
    "Next.js developer",
    "TypeScript engineer",
    "Solidity developer",
    "Ethereum developer",
    "Bitcoin developer",
    "RWA tokenization",
    "ERC-3643",
    "MENA software developer",
    "ex-STC developer",
    "SajeLabs",
    "Samijoe Hayek",
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
      itemOffered: { "@type": "Service", name: "Web Application Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Full-Stack Software Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Blockchain & Web3 Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "RWA Tokenization (ERC-3643)" },
    },
  ],
};

const softwareServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Senior Full-Stack & Blockchain Software Development",
  serviceType: "Software development services",
  description:
    "Senior full-stack and blockchain developer with 7 years building production software at top MENA tech companies including STC. Web applications, full-stack platforms, blockchain systems, RWA tokenization, and Web3 infrastructure — shipped end-to-end by one developer.",
  provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  areaServed: ["AE", "SA", "QA", "BH", "OM", "KW", "CH", "SG", "US", "GB", "EU"],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: 15000,
    highPrice: 60000,
    priceRange: "$15,000-$60,000+",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareServiceJsonLd) }}
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
