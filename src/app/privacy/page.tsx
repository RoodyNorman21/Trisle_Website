import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-ui";
import { PrivacyContent } from "@/components/legal/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — Trisle",
  description:
    "How Trisle handles data on its website and in its Android app: consent-based Google Analytics, 100% on-device app processing, Polar payments, and your full GDPR rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="September 23, 2026"
      intro="Short version: the Trisle app keeps everything on your device. This website asks before it measures anything — Google Analytics runs only if you explicitly accept, you can withdraw at any time, and payments are handled by Polar.sh as merchant of record. The details are below."
    >
      <PrivacyContent />
    </LegalShell>
  );
}
