"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { openPolarCheckout } from "@/lib/polar";
import { ProductHuntBadge } from "./product-hunt-badge";
import { useI18n } from "@/i18n/context";

const NAV = [
  { href: "#features", labelKey: "nav.features" },
  { href: "#activities", labelKey: "nav.activities" },
  { href: "#customize", labelKey: "nav.customize" },
  { href: "#pricing", labelKey: "nav.pricing" },
  { href: "#faq", labelKey: "nav.faq" },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-auto border-t border-white/[0.06] bg-[#050506]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-7 w-12 items-center justify-center rounded-full bg-black ring-1 ring-white/15">
                <span className="h-[7px] w-[7px] rounded-full bg-[#1c1c1c] ring-1 ring-white/20" />
                <span className="absolute right-2 h-[3px] w-[3px] rounded-full bg-white/50" />
              </span>
              <span className="text-[15px] font-bold tracking-tight text-white">
                Trisle
              </span>
            </div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-zinc-600">
              {t("footer.tagline")}
            </p>
            {/* Official Product Hunt badge — permanent home under the tagline */}
            <div className="mt-5">
              <ProductHuntBadge location="footer" />
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-zinc-500 transition-colors hover:text-white"
              >
                {t(l.labelKey)}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button
            onClick={() => void openPolarCheckout()}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[13px] font-semibold text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
          >
            <Download className="h-4 w-4" />
            {t("footer.cta")}
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-7 text-[11.5px] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
          <span>{t("footer.disclaimer")}</span>
          <Link
            href="/success"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
          >
            {t("footer.retrieve")}
          </Link>
          <span className="inline-flex items-center gap-1.5">
            {t("footer.payments")}
            <span className="font-semibold text-zinc-400">Polar.sh</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
