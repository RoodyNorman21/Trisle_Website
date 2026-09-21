"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, LifeBuoy, Mail } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

const STEPS = [
  { icon: Mail, key: "step1" },
  { icon: Download, key: "step2" },
  { icon: LifeBuoy, key: "step3" },
] as const;

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function PurchaseSuccess() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [reference, setReference] = useState<string | null>(null);

  // Polar redirects here from the hosted checkout. When the Success URL
  // contains the {CHECKOUT_ID} placeholder it arrives as ?checkout_id=…;
  // otherwise we simply show the page without a reference chip.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const id =
        params.get("checkout_id") ||
        params.get("checkoutId") ||
        params.get("order_id");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration: query string only exists in the browser, reading it during render would break SSR
      if (id) setReference(id.slice(0, 24));
    } catch {
      /* no query string — skip the reference chip */
    }
  }, []);

  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-black text-foreground"
    >
      {/* Backdrop */}
      <div aria-hidden className="bg-grid bg-grid-fade absolute inset-0" />
      <div
        aria-hidden
        className="absolute top-[-180px] left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[140px]"
      />

      {/* Header */}
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-10 mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-12 items-center justify-center rounded-full bg-black ring-1 ring-white/15">
            <span className="h-[7px] w-[7px] rounded-full bg-[#1c1c1c] ring-1 ring-white/20" />
            <span className="absolute right-2 h-[3px] w-[3px] rounded-full bg-white/50" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white">
            Trisle
          </span>
        </Link>
        <LanguageSwitcher />
      </motion.header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
        {/* Island-style confirmation */}
        <motion.div
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 17, delay: 0.1 }}
          className="relative"
        >
          {!reduce && (
            <>
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 ring-white/25"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity, delay: 0.7 }}
              />
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 ring-white/15"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity, delay: 1.2 }}
              />
            </>
          )}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 shadow-[0_0_60px_-12px_oklch(1_0_0/35%)] ring-1 ring-white/10">
            <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden>
              <motion.path
                d="M6.5 12.5l3.5 3.5 7.5-8"
                stroke="white"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl"
        >
          {t("success.title1")}
          <br />
          <span className="text-zinc-500">{t("success.title2")}</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="mt-5 max-w-md text-base leading-relaxed text-zinc-400"
        >
          {t("success.desc")}
        </motion.p>

        {/* Order reference (only when Polar passes it) */}
        {reference && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs text-zinc-400"
          >
            <span>{t("success.reference")}</span>
            <code className="font-mono text-[11px] tracking-tight text-zinc-300">
              {reference}…
            </code>
          </motion.div>
        )}

        {/* Next steps */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-10 w-full max-w-xl"
        >
          <p className="mb-4 text-center text-[11px] font-bold tracking-[0.18em] text-zinc-600 uppercase">
            {t("success.next")}
          </p>
          <ol className="space-y-3 text-start">
            {STEPS.map(({ icon: Icon, key }, i) => (
              <li
                key={key}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 sm:p-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] ring-1 ring-white/10">
                  <Icon className="h-4 w-4 text-zinc-200" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-white">
                    {t(`success.${key}.title`)}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-zinc-500">
                    {t(`success.${key}.desc`)}
                  </span>
                </span>
                <span aria-hidden className="mt-1 font-mono text-[11px] text-zinc-700">
                  0{i + 1}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="group/cta relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 text-sm font-bold text-black transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="cta-sheen absolute inset-y-0 w-16 bg-black/10 blur-md" />
            {t("success.cta.home")}
            <ArrowRight className="rtl:rotate-180 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#faq"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-zinc-200 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {t("success.cta.faq")}
          </Link>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 max-w-md text-xs leading-relaxed text-zinc-600"
        >
          {t("success.note")}
        </motion.p>
      </main>
    </div>
  );
}
