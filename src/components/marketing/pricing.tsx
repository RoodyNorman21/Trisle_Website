"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Infinity as InfinityIcon,
  Layers,
  Music2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { openPolarCheckout } from "@/lib/polar";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

const INCLUDED = [
  { icon: Sparkles, textKey: "pricing.inc1" },
  { icon: Layers, textKey: "pricing.inc2" },
  { icon: Music2, textKey: "pricing.inc3" },
  { icon: InfinityIcon, textKey: "pricing.inc4" },
  { icon: ShieldCheck, textKey: "pricing.inc5" },
];

export function Pricing() {
  const { t } = useI18n();
  const [opening, setOpening] = useState(false);

  const handleBuy = async () => {
    if (opening) return;
    setOpening(true);
    try {
      await openPolarCheckout();
    } finally {
      setOpening(false);
    }
  };

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] bg-[#050506] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute top-[-200px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel className="justify-center">{t("pricing.label")}</SectionLabel>
          <div className="text-center">
            <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("pricing.title1")}
              <span className="text-zinc-500">{t("pricing.title2")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
              {t("pricing.desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="relative mx-auto mt-14 max-w-md rounded-3xl border border-white/[0.1] bg-[#0b0b0c] p-8 shadow-[0_40px_120px_-40px_rgba(0,0,0,1)] sm:p-10"
          >
            {/* Top accent line */}
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                {t("pricing.license")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10.5px] font-semibold text-zinc-300">
                <BadgeCheck className="h-3 w-3" />
                {t("pricing.badge")}
              </span>
            </div>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-6xl font-bold tracking-tight text-white">
                €3.99
              </span>
              <span className="pb-1.5 text-[13px] text-zinc-500">
                {t("pricing.once")}
              </span>
            </div>

            <ul className="mt-8 space-y-3.5 border-t border-white/[0.06] pt-8">
              {INCLUDED.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[13.5px] text-zinc-300"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                  {t(item.textKey)}
                </li>
              ))}
            </ul>

            <button
              onClick={handleBuy}
              aria-busy={opening}
              className="group/cta relative mt-9 inline-flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white py-3.5 text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
              disabled={opening}
            >
              <span className="cta-sheen absolute inset-y-0 w-16 bg-black/10 blur-md" />
              {t("pricing.cta")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Refund promise */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-start">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                <RotateCcw className="h-3.5 w-3.5 text-zinc-200" />
              </span>
              <span className="min-w-0">
                <span className="block text-[12.5px] font-bold text-white">
                  {t("pricing.refund.title")}
                </span>
                <span className="mt-0.5 block text-[11.5px] leading-relaxed text-zinc-500">
                  {t("pricing.refund.desc")}
                </span>
              </span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11.5px] text-zinc-600">
              <Wallet className="h-3.5 w-3.5" />
              {t("pricing.checkoutA")}{" "}
              <span className="font-semibold text-zinc-400">Polar.sh</span>{" "}
              {t("pricing.checkoutB")}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
