import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n/context";
import en from "./../i18n/dictionaries/en.json";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { CookieConsent } from "@/components/marketing/cookie-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Canonical origin of the deployed static site (GitHub Pages project site).
 * Keep in sync with .github/workflows/deploy.yml and public/robots.txt.
 */
export const SITE_URL = "https://trisle-app.github.io/Trisle_Website";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Trisle — The Dynamic Island for Android",
  description:
    "The iPhone's Dynamic Island on your Android — music, timers, calls and navigation floating above every app. 100% on-device. €5.99 once, yours forever.",
  keywords: [
    "Trisle",
    "Dynamic Island",
    "Dynamic Island for Android",
    "Android",
    "Live Activities",
    "notifications",
    "overlay",
    "music island",
    "Google Maps island",
    "iOS 27 style",
  ],
  authors: [{ name: "Trisle" }],
  alternates: {
    canonical: SITE_URL,
  },
  // Optional search-console ownership tags. Set the env vars at build time
  // (GitHub Actions env or local shell) and the <meta> tags appear; unset,
  // they are omitted entirely.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
        }
      : undefined,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Trisle — The Dynamic Island for Android",
    description:
      "Real Live Activities, fluid spring physics and total privacy — 100% on-device. One purchase of €5.99, yours forever.",
    url: SITE_URL,
    siteName: "Trisle",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://trisle-app.github.io/Trisle_Website/og.jpg",
        width: 1200,
        height: 630,
        alt: "Trisle — The Dynamic Island for Android. €5.99 one-time purchase.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trisle — The Dynamic Island for Android",
    description:
      "Real Live Activities, fluid spring physics and total privacy — 100% on-device. One purchase of €5.99, yours forever.",
    images: ["https://trisle-app.github.io/Trisle_Website/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

/** FAQ rich-result markup, built from the English dictionary at build time. */
function faqJsonLd() {
  const entries: { q: string; a: string }[] = [];
  for (let i = 1; i <= 9; i++) {
    const q = en[`faq.q${i}`];
    const a = en[`faq.a${i}`];
    if (q && a) entries.push({ q, a });
  }
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Product rich-result markup (no AggregateRating until a real review system exists). */
function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Trisle",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Android",
    description:
      "iPhone-style Dynamic Island for Android with real Live Activities, smart alerts and fluid spring animations. One-time purchase.",
    offers: {
      "@type": "Offer",
      price: "5.99",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <JsonLd data={productJsonLd()} />
        <JsonLd data={faqJsonLd()} />
        <I18nProvider>
          {children}
          {/* GDPR consent banner — strict prior consent for Google Analytics.
              Must live INSIDE I18nProvider: it localizes its copy. */}
          <CookieConsent />
        </I18nProvider>
        {/* Renders nothing (and ships zero JS) until NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        <GoogleAnalytics />
        <Toaster />
      </body>
    </html>
  );
}
