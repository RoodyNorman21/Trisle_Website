"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  OPEN_CONSENT_EVENT,
  clearConsent,
  readConsent,
  writeConsent,
} from "@/lib/consent";
import { GA_CONSENT_BANNER_ACTIVE, gaEvent } from "@/components/analytics/google-analytics";
import { useI18n } from "@/i18n/context";

/**
 * GDPR / ePrivacy consent banner for Google Analytics.
 *
 * Strict prior consent: until the visitor explicitly accepts, the GA
 * bootstrap measures nothing at all (no gtag.js download, no cookies, not
 * even cookieless pings) — see google-analytics.tsx. Accepting stores a
 * timestamped consent record and starts analytics; declining stores the
 * refusal and analytics never loads. The choice is remembered across
 * visits and can be withdrawn at any time via the footer "Cookie
 * settings" link (dispatches OPEN_CONSENT_EVENT).
 *
 * The banner renders nothing (and ships no visible UI) unless GA is
 * configured with consent mode "banner" at build time.
 */

const SHOW_DELAY_MS = 700;

export function CookieConsent() {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState(false);

  // First visit => prompt after a short beat (lets the page paint first).
  // Returning visitor => the stored record decides and the banner stays out
  // of the way entirely.
  useEffect(() => {
    if (!GA_CONSENT_BANNER_ACTIVE) return;
    const timer = window.setTimeout(() => {
      if (!readConsent()) setOpen(true);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Footer "Cookie settings" reopens the prompt with the previous choice
  // forgotten, so consent can be modified or withdrawn as easily as given.
  useEffect(() => {
    if (!GA_CONSENT_BANNER_ACTIVE) return;
    const onOpen = () => {
      clearConsent();
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  const accept = useCallback(() => {
    setOpen(false);
    writeConsent("granted");
    // Start measurement for this session (idempotent; returning visitors
    // had it started by the inline bootstrap already).
    window.__trisleGaStart?.();
    gaEvent("cookie_banner_accept", { location: "banner" });
  }, []);

  const decline = useCallback(() => {
    setOpen(false);
    writeConsent("denied");
    // If analytics already ran this session (consent was previously granted
    // and just withdrawn), a reload is the only reliable way to guarantee
    // nothing keeps measuring. On a fresh refusal nothing ever loaded.
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      window.location.reload();
    }
  }, []);

  if (!GA_CONSENT_BANNER_ACTIVE) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          dir={dir}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-md"
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          aria-describedby="consent-body"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-950/95 p-5 shadow-[0_24px_70px_-20px_rgba(0,0,0,1)] backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
                <ShieldCheck className="h-4 w-4 text-zinc-300" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2
                  id="consent-title"
                  className="text-[15px] font-bold tracking-tight text-white"
                >
                  {t("consent.title")}
                </h2>
                <p
                  id="consent-body"
                  className="mt-1.5 text-[13px] leading-relaxed text-zinc-400"
                >
                  {t("consent.body")}
                </p>
                <Link
                  href="/privacy"
                  className="mt-2 inline-flex text-[12.5px] font-medium text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400"
                >
                  {t("consent.link")}
                </Link>
              </div>
            </div>

            {/* Equal-prominence choices — no dark patterns: rejecting is as
                easy and visible as accepting. */}
            <div className="mt-4 flex gap-2.5">
              <button
                onClick={accept}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-white px-4 text-[13px] font-bold text-black transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("consent.accept")}
              </button>
              <button
                onClick={decline}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-white/15 px-4 text-[13px] font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("consent.decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
