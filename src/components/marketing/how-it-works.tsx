"use client";

import { Download, Settings2, ToggleRight } from "lucide-react";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

const STEPS = [
  {
    icon: Download,
    num: "01",
    titleKey: "how.s1.title",
    descKey: "how.s1.desc",
  },
  {
    icon: Settings2,
    num: "02",
    titleKey: "how.s2.title",
    descKey: "how.s2.desc",
  },
  {
    icon: ToggleRight,
    num: "03",
    titleKey: "how.s3.title",
    descKey: "how.s3.desc",
  },
];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel>{t("how.label")}</SectionLabel>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("how.title1")}
            <span className="text-zinc-500">{t("how.title2")}</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={0.08 * i} className="h-full">
              <div className="group relative h-full bg-[#0a0a0b] p-8 transition-colors duration-300 hover:bg-[#0e0e10]">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                    <step.icon className="h-4 w-4 text-zinc-200" />
                  </div>
                  <span className="font-mono text-[28px] font-bold leading-none text-white/[0.07] transition-colors duration-300 group-hover:text-white/[0.14]">
                    {step.num}
                  </span>
                </div>
                <h3 className="mt-6 text-[15px] font-semibold text-white">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
                  {t(step.descKey)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 text-center text-[12px] text-zinc-600">
            {t("how.requirements")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
