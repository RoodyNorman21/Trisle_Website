"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

const LINKS = [
  { href: "#features", label: "nav.features" },
  { href: "#activities", label: "nav.activities" },
  { href: "#customize", label: "nav.customize" },
  { href: "#pricing", label: "nav.pricing" },
  { href: "#faq", label: "nav.faq" },
];

export function Navbar({ onBuy }: { onBuy: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-black/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo mark — a tiny island pill */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-12 items-center justify-center rounded-full bg-black ring-1 ring-white/15">
            <span className="h-[7px] w-[7px] rounded-full bg-[#1c1c1c] ring-1 ring-white/20" />
            <span className="absolute right-2 h-[3px] w-[3px] rounded-full bg-white/50" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white">
            Trisle
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-zinc-500 transition-colors hover:text-white"
            >
              {t(l.label)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />
          <button
            onClick={onBuy}
            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[13px] font-bold text-black transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            {t("nav.getTrisle")}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
