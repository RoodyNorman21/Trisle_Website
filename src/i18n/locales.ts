export type Direction = "ltr" | "rtl";

export interface LocaleInfo {
  /** BCP-47 short code, also the dictionary filename. */
  code: string;
  /** Endonym shown in the language switcher. */
  native: string;
  /** English name (for aria labels / tooltips). */
  english: string;
  dir: Direction;
}

/**
 * Top 20 most-spoken languages worldwide (by total speakers,
 * Ethnologue-style ranking) + Greek, per product requirement.
 */
export const LOCALES: LocaleInfo[] = [
  { code: "en", native: "English", english: "English", dir: "ltr" },
  { code: "zh", native: "中文", english: "Chinese (Mandarin)", dir: "ltr" },
  { code: "hi", native: "हिन्दी", english: "Hindi", dir: "ltr" },
  { code: "es", native: "Español", english: "Spanish", dir: "ltr" },
  { code: "fr", native: "Français", english: "French", dir: "ltr" },
  { code: "ar", native: "العربية", english: "Arabic", dir: "rtl" },
  { code: "bn", native: "বাংলা", english: "Bengali", dir: "ltr" },
  { code: "pt", native: "Português", english: "Portuguese", dir: "ltr" },
  { code: "ru", native: "Русский", english: "Russian", dir: "ltr" },
  { code: "ur", native: "اردو", english: "Urdu", dir: "rtl" },
  { code: "id", native: "Bahasa Indonesia", english: "Indonesian", dir: "ltr" },
  { code: "de", native: "Deutsch", english: "German", dir: "ltr" },
  { code: "ja", native: "日本語", english: "Japanese", dir: "ltr" },
  { code: "tr", native: "Türkçe", english: "Turkish", dir: "ltr" },
  { code: "ko", native: "한국어", english: "Korean", dir: "ltr" },
  { code: "vi", native: "Tiếng Việt", english: "Vietnamese", dir: "ltr" },
  { code: "it", native: "Italiano", english: "Italian", dir: "ltr" },
  { code: "ta", native: "தமிழ்", english: "Tamil", dir: "ltr" },
  { code: "th", native: "ไทย", english: "Thai", dir: "ltr" },
  { code: "sw", native: "Kiswahili", english: "Swahili", dir: "ltr" },
  { code: "el", native: "Ελληνικά", english: "Greek", dir: "ltr" },
];

export const DEFAULT_LOCALE = "en";
export const LOCALE_STORAGE_KEY = "trisle.locale";

export function getLocaleInfo(code: string): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
