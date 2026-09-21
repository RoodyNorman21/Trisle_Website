"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  EyeOff,
  Hand,
  Palette,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { MorphingIsland } from "./island";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

const STYLES = [
  { key: "ios", labelKey: "cstyle.ios", stiffness: 400, damping: 26 },
  { key: "drop", labelKey: "cstyle.drop", stiffness: 330, damping: 19 },
  { key: "unfold", labelKey: "cstyle.unfold", stiffness: 650, damping: 40 },
  { key: "fade", labelKey: "cstyle.fade", stiffness: 450, damping: 38 },
  { key: "bubble", labelKey: "cstyle.bubble", stiffness: 300, damping: 15 },
] as const;

const DEMO_SEQUENCE = ["idle", "notification", "idle", "music", "idle"] as const;

const PERSONALIZATION = [
  {
    icon: SlidersHorizontal,
    titleKey: "pers.size.title",
    descKey: "pers.size.desc",
  },
  {
    icon: Palette,
    titleKey: "pers.glow.title",
    descKey: "pers.glow.desc",
  },
  {
    icon: Hand,
    titleKey: "pers.gestures.title",
    descKey: "pers.gestures.desc",
  },
  {
    icon: Clock3,
    titleKey: "pers.timing.title",
    descKey: "pers.timing.desc",
  },
  {
    icon: EyeOff,
    titleKey: "pers.privacy.title",
    descKey: "pers.privacy.desc",
  },
  {
    icon: Sparkles,
    titleKey: "pers.filter.title",
    descKey: "pers.filter.desc",
  },
];

export function Customize() {
  const [styleIndex, setStyleIndex] = useState(0);
  const { t } = useI18n();
  const style = STYLES[styleIndex];

  return (
    <section id="customize" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left copy + selector */}
          <Reveal>
            <SectionLabel>{t("customize.label")}</SectionLabel>
            <h2 className="max-w-md text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("customize.title1")}
              <span className="text-zinc-500">{t("customize.title2")}</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-400">
              {t("customize.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {STYLES.map((s, i) => {
                const isActive = i === styleIndex;
                return (
                  <button
                    key={s.key}
                    onClick={() => setStyleIndex(i)}
                    className={`relative rounded-full border px-4 py-2 text-[12.5px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/[0.1] bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {t(s.labelKey)}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
              {t("customize.stiffness")} {style.stiffness} · {t("customize.damping")}{" "}
              {style.damping}
            </p>
          </Reveal>

          {/* Right demo stage */}
          <Reveal delay={0.1}>
            <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0b0c]">
              <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
              <div
                aria-hidden
                className="absolute h-52 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)] blur-2xl"
              />
              <MorphingIsland
                key={style.key}
                sequence={[...DEMO_SEQUENCE]}
                interval={2200}
                stiffness={style.stiffness}
                damping={style.damping}
              />
              <motion.span
                key={`label-${style.key}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600"
              >
                {t(style.labelKey)}
              </motion.span>
            </div>
          </Reveal>
        </div>

        {/* Personalization grid */}
        <div className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONALIZATION.map((p, i) => (
            <Reveal key={p.titleKey} delay={0.05 * (i % 3)}>
              <div className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <p.icon className="h-4 w-4 text-zinc-200" />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-white">
                    {t(p.titleKey)}
                  </h4>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">
                    {t(p.descKey)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
