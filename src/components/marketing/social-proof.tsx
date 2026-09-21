"use client";

import {
  CreditCard,
  Infinity as InfinityIcon,
  RotateCcw,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const ITEMS = [
  { icon: Users, key: "proof.1" },
  { icon: RotateCcw, key: "proof.2" },
  { icon: InfinityIcon, key: "proof.3" },
  { icon: ShieldCheck, key: "proof.4" },
  { icon: CreditCard, key: "proof.5" },
  { icon: Zap, key: "proof.6" },
] as const;

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const { t, dir } = useI18n();
  return (
    <div
      dir={dir}
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {ITEMS.map(({ icon: Icon, key }) => (
        <div key={key} className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
            <Icon className="h-3 w-3 text-zinc-300" />
          </span>
          <span className="whitespace-nowrap text-[13px] font-medium text-zinc-400">
            {t(key)}
          </span>
          <span aria-hidden className="ml-5 h-1 w-1 rounded-full bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}

/** Quiet trust ticker above the pricing section — drifts left → right, pauses on hover. */
export function SocialProof() {
  const { t } = useI18n();
  return (
    <section
      aria-label={t("proof.aria")}
      className="group relative overflow-hidden border-t border-white/[0.06] py-4"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black to-transparent" />
      {/* dir=ltr on the WRAPPER: block children wider than the container align to the
          parent's inline-start, so the wrapper must be LTR for the -50% loop to stay
          seamless in RTL pages; each Row restores the page direction internally. */}
      <div dir="ltr" className="overflow-hidden">
        <div
          className="animate-marquee-reverse group-hover:[animation-play-state:paused] flex w-max items-center"
        >
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
