import type { Metadata } from "next";
import { PurchaseSuccess } from "@/components/marketing/purchase-success";

export const metadata: Metadata = {
  title: "Trisle — Purchase complete",
  description:
    "Your Trisle purchase was completed successfully. Your receipt and license details are on their way to your inbox.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      {/* Read by I18nProvider so the live tab title is localized on this page too */}
      <meta name="i18n-title" content="success.metaTitle" />
      <PurchaseSuccess />
    </>
  );
}
