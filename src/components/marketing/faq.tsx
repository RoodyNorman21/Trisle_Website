"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "./reveal";
import { useI18n } from "@/i18n/context";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SectionLabel>{t("faq.label")}</SectionLabel>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("faq.title1")}
            <span className="text-zinc-500">{t("faq.title2")}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ_KEYS.map((n) => (
              <AccordionItem
                key={n}
                value={`item-${n}`}
                className="border-white/[0.07]"
              >
                <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-zinc-200 hover:text-white hover:no-underline">
                  {t(`faq.q${n}`)}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[13.5px] leading-relaxed text-zinc-400">
                  {t(`faq.a${n}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
