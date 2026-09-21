"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { openPolarCheckout } from "@/lib/polar";
import { useI18n } from "@/i18n/context";

/**
 * Thumb-reach buy bar for small screens. Appears once the visitor has scrolled
 * past roughly the first viewport AND the pricing card is not on screen (no
 * duplicate CTA next to the real one). Desktop is excluded — the fixed navbar
 * CTA is always in reach there.
 */
export function StickyBuyBar() {
  const { t } = useI18n();
  const [opening, setOpening] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pricingInView = false;
    let ticking = false;

    const update = () => {
      ticking = false;
      const deep = window.scrollY > window.innerHeight * 1.25;
      setShow(deep && !pricingInView);
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    const pricing = document.getElementById("pricing");
    const io = pricing
      ? new IntersectionObserver(
          (entries) => {
            pricingInView = entries[0]?.isIntersecting ?? false;
            requestUpdate();
          },
          { threshold: 0.08 },
        )
      : null;
    if (io && pricing) io.observe(pricing);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      io?.disconnect();
    };
  }, []);

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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 88, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 88, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
          aria-label={t("pricing.label")}
          className="fixed inset-x-3 z-40 md:hidden"
          style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/85 p-2.5 pl-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,1)] backdrop-blur-xl">
            <div className="min-w-0 flex-1 leading-tight">
              <span className="text-[17px] font-bold tabular-nums text-white">
                €5.99
              </span>{" "}
              <span className="text-[11px] text-zinc-500">
                {t("pricing.once")}
              </span>
            </div>
            <button
              onClick={handleBuy}
              disabled={opening}
              aria-busy={opening}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-[13px] font-bold text-black transition-transform duration-150 active:scale-[0.97] disabled:cursor-wait disabled:opacity-80"
            >
              <Download className="h-3.5 w-3.5" />
              {t("nav.getTrisle")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
