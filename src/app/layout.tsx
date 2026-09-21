import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trisle — The Dynamic Island for Android",
  description:
    "iPhone-style Dynamic Island for Android. Live Activities, smart alerts and fluid spring animations — all on-device. €5.99 one-time purchase.",
  keywords: [
    "Trisle",
    "Dynamic Island",
    "Android",
    "Live Activities",
    "notifications",
    "overlay",
    "music island",
    "Google Maps island",
  ],
  authors: [{ name: "Trisle" }],
  metadataBase: new URL("https://trisle.app"),
  openGraph: {
    title: "Trisle — The Dynamic Island for Android",
    description:
      "Fluid animations, real Live Activities, total privacy. One purchase, yours forever.",
    url: "https://trisle.app",
    siteName: "Trisle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trisle — The Dynamic Island for Android",
    description:
      "Fluid animations, real Live Activities, total privacy. One purchase, yours forever.",
  },
};

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
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
