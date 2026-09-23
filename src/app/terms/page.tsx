import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-ui";
import { TermsContent } from "@/components/legal/terms-content";

export const metadata: Metadata = {
  title: "Terms & Conditions — Trisle",
  description:
    "The agreement for Trisle and its website: perpetual one-time-purchase license, €3.99 via Polar.sh, 7-day refund promise, EU consumer rights, fair-use rules and limitations of liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms & Conditions"
      updated="September 23, 2026"
      intro="Short version: buy once (€3.99 via Polar.sh), use Trisle forever on your own Android devices, keep your receipt for retrieval, and get a full refund within 7 days if it is not for you. The complete terms are below."
    >
      <TermsContent />
    </LegalShell>
  );
}
