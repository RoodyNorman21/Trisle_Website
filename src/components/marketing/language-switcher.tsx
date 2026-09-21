"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n/context";
import { LOCALES, getLocaleInfo } from "@/i18n/locales";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const current = getLocaleInfo(locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("nav.language")}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-3 text-[12px] font-semibold text-zinc-300 transition-colors hover:border-white/30 hover:text-white focus:outline-none"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="uppercase tracking-wide">{current.code}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-[320px] overflow-y-auto border-white/10 bg-[#0b0b0c] text-zinc-200"
      >
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            lang={l.code}
            dir={l.dir}
            onClick={() => setLocale(l.code)}
            className={`cursor-pointer gap-3 text-[13px] focus:bg-white/10 focus:text-white ${
              l.code === locale ? "text-white" : "text-zinc-400"
            }`}
          >
            <span className="flex w-4 justify-center">
              {l.code === locale && <Check className="h-3.5 w-3.5" />}
            </span>
            <span className="font-medium">{l.native}</span>
            <span className="ml-auto text-[10.5px] text-zinc-600">
              {l.english}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
