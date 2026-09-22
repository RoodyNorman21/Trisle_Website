"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Download, RotateCcw, ShieldCheck } from "lucide-react";
import { PhoneFrame } from "./phone-frame";
import { ProductHuntBadge } from "./product-hunt-badge";
import { Reveal } from "./reveal";
import { useI18n } from "@/i18n/context";

export function Hero({ onBuy }: { onBuy: () => void }) {
  const { t } = useI18n();
  // Static export (GitHub Pages) serves the site under /Trisle_Website/;
  // plain <video> tags don't get the basePath prefix automatically.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* Backdrop: grid + glow */}
      <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
      <div
        aria-hidden
        className="absolute top-[-320px] left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy */}
        <div className="max-w-xl">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-1.5 text-xs text-zinc-400">
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tracking-wide text-black">
                v2
              </span>
              {t("hero.badge")}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-[64px]">
              {t("hero.title1")}
              <br />
              <span className="text-zinc-500">{t("hero.title2")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
              {t("hero.desc")}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onBuy}
                className="group/cta relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-7 text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="cta-sheen absolute inset-y-0 w-16 bg-black/10 blur-md" />
                <Download className="h-4 w-4" />
                {t("hero.cta")}
                {/* Locale-neutral price nudge — the number sells before the scroll */}
                <span className="rounded-full bg-black/10 px-2 py-0.5 text-[11px] font-extrabold tabular-nums">
                  €5.99
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <a
                href="#features"
                className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
              >
                {t("hero.explore")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-zinc-300" />
                {t("hero.check1")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-zinc-300" />
                {t("hero.check2")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-300" />
                {t("hero.check3")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-zinc-300" />
                {t("hero.check4")}
              </span>
            </div>
          </Reveal>

          {/* Launch proof — official PH widget (dark theme matches palette) */}
          <Reveal delay={0.36}>
            <div className="mt-8">
              <ProductHuntBadge location="hero" eager />
            </div>
          </Reveal>
        </div>

        {/* Device — real demo recording in the bezel */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto flex w-fit flex-col items-center lg:justify-self-end"
        >
          <PhoneFrame
            video={{
              src: `${base}/videos/trisle-demo.mp4`,
              poster: `${base}/videos/trisle-demo-poster.webp`,
              label: t("hero.videoBadge"),
            }}
          />
          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
            <span className="animate-status-dot h-1.5 w-1.5 rounded-full bg-white/80" />
            {t("hero.videoBadge")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
