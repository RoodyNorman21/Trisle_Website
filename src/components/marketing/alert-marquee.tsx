"use client";

import {
  BatteryCharging,
  BellOff,
  Bluetooth,
  Headphones,
  MapPin,
  Music2,
  Phone,
  Timer,
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const CHIPS = [
  { icon: BatteryCharging, key: "marquee.charging" },
  { icon: BellOff, key: "marquee.silent" },
  { icon: Music2, key: "marquee.playing" },
  { icon: MapPin, key: "marquee.turn" },
  { icon: Timer, key: "marquee.stopwatch" },
  { icon: Headphones, key: "marquee.headphones" },
  { icon: Phone, key: "marquee.call" },
  { icon: Bluetooth, key: "marquee.bluetooth" },
];

/** Slow, edge-faded marquee of the alert types Trisle renders. */
export function AlertMarquee() {
  const { t, dir } = useI18n();
  const row = [...CHIPS, ...CHIPS];
  return (
    <section
      aria-label={t("marquee.aria")}
      className="relative border-y border-white/[0.06] bg-white/[0.015] py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />
      {/* dir=ltr on the WRAPPER so the wide track stays left-aligned in RTL pages
          and the -50% loop never drifts off-screen; each chip restores page dir. */}
      <div dir="ltr" className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {row.map((chip, i) => (
            <div
              key={`${chip.key}-${i}`}
              dir={dir}
              className="flex shrink-0 items-center gap-2.5 text-zinc-500"
            >
              <chip.icon className="h-3.5 w-3.5" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {t(chip.key)}
              </span>
              <span className="ml-6 h-1 w-1 rounded-full bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
