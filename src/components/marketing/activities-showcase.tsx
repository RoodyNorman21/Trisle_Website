"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Music2,
  Phone,
  Timer as TimerIcon,
} from "lucide-react";
import { ExpandedCapsule } from "./island";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

type TabKey = "music" | "navigation" | "timer" | "call";

const TABS: {
  key: TabKey;
  labelKey: string;
  icon: React.ElementType;
  capsule: "expandedMusic" | "expandedNav" | "expandedTimer" | "expandedCall";
  headlineKey: string;
  descKey: string;
  pointKeys: string[];
}[] = [
  {
    key: "music",
    labelKey: "activities.music.tab",
    icon: Music2,
    capsule: "expandedMusic",
    headlineKey: "activities.music.headline",
    descKey: "activities.music.desc",
    pointKeys: [
      "activities.music.p1",
      "activities.music.p2",
      "activities.music.p3",
    ],
  },
  {
    key: "navigation",
    labelKey: "activities.nav.tab",
    icon: MapPin,
    capsule: "expandedNav",
    headlineKey: "activities.nav.headline",
    descKey: "activities.nav.desc",
    pointKeys: [
      "activities.nav.p1",
      "activities.nav.p2",
      "activities.nav.p3",
    ],
  },
  {
    key: "timer",
    labelKey: "activities.timer.tab",
    icon: TimerIcon,
    capsule: "expandedTimer",
    headlineKey: "activities.timer.headline",
    descKey: "activities.timer.desc",
    pointKeys: [
      "activities.timer.p1",
      "activities.timer.p2",
      "activities.timer.p3",
    ],
  },
  {
    key: "call",
    labelKey: "activities.call.tab",
    icon: Phone,
    capsule: "expandedCall",
    headlineKey: "activities.call.headline",
    descKey: "activities.call.desc",
    pointKeys: [
      "activities.call.p1",
      "activities.call.p2",
      "activities.call.p3",
    ],
  },
];

export function ActivitiesShowcase() {
  const [active, setActive] = useState<TabKey>("music");
  const { t } = useI18n();
  const tab = TABS.find((tb) => tb.key === active)!;

  return (
    <section
      id="activities"
      className="relative scroll-mt-24 border-t border-white/[0.06] bg-[#050506] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>{t("activities.label")}</SectionLabel>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("activities.title1")}
            <span className="text-zinc-500">{t("activities.title2")}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scrollbar-none mt-10 -mx-6 overflow-x-auto px-6">
            <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
              {TABS.map((tb) => {
                const isActive = tb.key === active;
                return (
                  <button
                    key={tb.key}
                    onClick={() => setActive(tb.key)}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-medium whitespace-nowrap transition-colors duration-200 sm:gap-2 sm:px-5 sm:text-[13px] ${
                      isActive ? "text-black" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activities-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <tb.icon className="relative z-10 h-3.5 w-3.5" />
                    <span className="relative z-10">{t(tb.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {t(tab.headlineKey)}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-400">
                {t(tab.descKey)}
              </p>
              <ul className="mt-7 space-y-3.5">
                {tab.pointKeys.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07 }}
                    className="flex items-start gap-3 text-[13.5px] text-zinc-300"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white" />
                    {t(p)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex min-h-[220px] items-center justify-center">
            {/* Backdrop glow */}
            <div
              aria-hidden
              className="absolute h-64 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)] blur-2xl"
            />
            {/* Collapsed pill ghost above expanded card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className="relative"
              >
                <ExpandedCapsule type={tab.capsule} scale={1.02} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
