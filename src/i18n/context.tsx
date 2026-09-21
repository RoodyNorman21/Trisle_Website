"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STORAGE_KEY,
  getLocaleInfo,
  type Direction,
} from "./locales";

import ar from "./dictionaries/ar.json";
import bn from "./dictionaries/bn.json";
import de from "./dictionaries/de.json";
import el from "./dictionaries/el.json";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import fr from "./dictionaries/fr.json";
import hi from "./dictionaries/hi.json";
import id from "./dictionaries/id.json";
import it from "./dictionaries/it.json";
import ja from "./dictionaries/ja.json";
import ko from "./dictionaries/ko.json";
import pt from "./dictionaries/pt.json";
import ru from "./dictionaries/ru.json";
import sw from "./dictionaries/sw.json";
import ta from "./dictionaries/ta.json";
import th from "./dictionaries/th.json";
import tr from "./dictionaries/tr.json";
import ur from "./dictionaries/ur.json";
import vi from "./dictionaries/vi.json";
import zh from "./dictionaries/zh.json";

type Dict = Record<string, string>;

const DICTS: Record<string, Dict> = {
  ar,
  bn,
  de,
  el,
  en,
  es,
  fr,
  hi,
  id,
  it,
  ja,
  ko,
  pt,
  ru,
  sw,
  ta,
  th,
  tr,
  ur,
  vi,
  zh,
};

export type Vars = Record<string, string | number>;

interface I18nValue {
  locale: string;
  setLocale: (code: string) => void;
  dir: Direction;
  /** Translate `key` in the active locale, with optional {var} interpolation. Falls back to English, then the key itself. */
  t: (key: string, vars?: Vars) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function translate(locale: string, key: string, vars?: Vars): string {
  let s: string =
    DICTS[locale]?.[key] ?? DICTS[DEFAULT_LOCALE][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<string>(DEFAULT_LOCALE);

  // Hydrate once from localStorage, else match the browser language.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && LOCALES.some((l) => l.code === saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount locale hydration: reading storage during render would break SSR hydration
        setLocaleState(saved);
        return;
      }
      const nav = window.navigator.language?.split("-")[0];
      if (nav && LOCALES.some((l) => l.code === nav)) {
        setLocaleState(nav);
      }
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  const dir = getLocaleInfo(locale).dir;

  // Keep <html lang/dir> in sync, and the tab title localized. The title is
  // re-asserted through a MutationObserver because React owns the static
  // <title> from metadata and would silently restore it after hydration.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = dir;

    const apply = () => {
      const title = translate(locale, "meta.title");
      if (title && document.title !== title) document.title = title;
    };
    apply();
    const titleEl = document.querySelector("head > title");
    const observer = new MutationObserver(apply);
    if (titleEl) {
      observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }
    return () => observer.disconnect();
  }, [locale, dir]);

  const setLocale = useCallback((code: string) => {
    if (!LOCALES.some((l) => l.code === code)) return;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
    setLocaleState(code);
  }, []);

  const t = useCallback(
    (key: string, vars?: Vars) => translate(locale, key, vars),
    [locale]
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, dir, t }),
    [locale, setLocale, dir, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
