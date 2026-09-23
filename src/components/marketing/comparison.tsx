"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

/** Row labels are phrased as benefits so ✓/✗ semantics stay consistent across cards. */
const ROWS = [
  "compare.r1",
  "compare.r2",
  "compare.r3",
  "compare.r4",
] as const;

function scrollToPricing() {
  document
    .getElementById("pricing")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Objection-handling block right before pricing: Trisle vs. a typical free
 * "Dynamic Island" clone. Two cards read side by side on desktop, Trisle
 * first on mobile so the favorable column is always encountered first.
 */
export function Comparison() {
  const { t } = useI18n();

  return (
    <section
      id="compare"
      className="relative scroll-mt-24 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionLabel className="justify-center">
            {t("compare.label")}
          </SectionLabel>
          <div className="text-center">
            <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("compare.title1")}
              <span className="text-zinc-500">{t("compare.title2")}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-zinc-400">
              {t("compare.desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5">
            {/* Trisle — the elevated card */}
            <div className="relative rounded-3xl border border-white/[0.14] bg-[#0b0b0c] p-7 shadow-[0_30px_90px_-40px_rgba(0,0,0,1)] sm:p-8">
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-white">
                  {t("compare.trisle")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold text-zinc-200">
                  <Check className="h-3 w-3" />
                  €3.99
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {ROWS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-[13.5px] text-zinc-100"
                  >
                    <span
                      role="img"
                      aria-label={t("compare.yes")}
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-white/20"
                    >
                      <Check className="h-3 w-3 text-black" />
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToPricing}
                className="group mt-7 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-[13px] font-semibold text-white transition-colors hover:border-white/30"
              >
                {t("pricing.cta")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Typical free clone — the dim card */}
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-zinc-500">
                  {t("compare.free")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-zinc-600">
                  €0
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {ROWS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-[13.5px] text-zinc-400"
                  >
                    <span
                      role="img"
                      aria-label={t("compare.no")}
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/[0.07]"
                    >
                      <X className="h-3 w-3 text-zinc-600" />
                    </span>
                    {t(key)}
                  </li>
                ))}
              </ul>

              {/* Spacer mirrors the Trisle card's button row so cards stay equal height */}
              <div aria-hidden className="mt-7 h-10" />
            </div>
          </div>
        </Reveal>

        {/* Honest "who each option is for" line — conceding builds trust */}
        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13.5px] leading-relaxed text-zinc-500">
            {t("compare.concede")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
