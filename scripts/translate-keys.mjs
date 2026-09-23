/**
 * Incremental i18n key translation.
 *
 * Translates ONLY the keys listed in NEW_KEYS (missing or still equal to
 * English) into every target locale, then rewrites each dictionary in
 * en.json key order. Reuses the translate.mjs prompt rules and retry logic.
 *
 * Usage:  bun scripts/translate-keys.mjs            (translate NEW_KEYS)
 *         KEYS="k1,k2" bun scripts/translate-keys.mjs
 */
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = join(ROOT, "src/i18n/dictionaries");
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));

const DEFAULT_KEYS = [
  "hero.check4",
  "pricing.refund.title",
  "pricing.refund.desc",
  "faq.q8",
  "faq.a8",
];
const NEW_KEYS = (process.env.KEYS ?? DEFAULT_KEYS.join(",")).split(",").filter(Boolean);

const TARGETS = [
  { code: "zh", name: "Simplified Chinese (Mandarin)" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic (Modern Standard)" },
  { code: "bn", name: "Bengali" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ur", name: "Urdu" },
  { code: "id", name: "Indonesian" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "tr", name: "Turkish" },
  { code: "ko", name: "Korean" },
  { code: "vi", name: "Vietnamese" },
  { code: "it", name: "Italian" },
  { code: "ta", name: "Tamil" },
  { code: "th", name: "Thai" },
  { code: "sw", name: "Swahili" },
  { code: "el", name: "Greek" },
];

const KEEP_AS_IS = [
  "Trisle", "Polar.sh", "iOS", "Android", "iPhone", "Apple Inc.", "OLED",
  "APK", "GPU", "€3.99", "v2", "Market St", "Spotify", "YouTube Music",
  "Apple Music", "Google Maps", "Dynamic Island", "Notification Listener API",
];

function systemPrompt(langName) {
  return [
    `You are a professional localization engineer localizing a premium, minimal Android-app marketing website from English into ${langName}.`,
    "",
    "STRICT RULES:",
    "1. Return ONLY a valid JSON object. No markdown fences, no commentary, no trailing text.",
    `2. Keep these tokens EXACTLY as-is, untranslated: ${KEEP_AS_IS.join(", ")}.`,
    "3. Keep numerals, times, percentages, and units with numbers (7 days may stay numeric) unchanged in meaning.",
    "4. Keep every {placeholder} like {year} intact.",
    "5. Preserve the tone: concise, confident, premium tech marketing. No wordiness.",
    "6. Every key from the input MUST appear in your output with a non-empty translated string value.",
  ].join("\n");
}

function parseJsonLoose(text) {
  let t = String(text).trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("no JSON object found");
  return JSON.parse(t.slice(start, end + 1));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function chatWithRetry(zai, messages, maxAttempts = 7) {
  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await zai.chat.completions.create({
        messages,
        thinking: { type: "disabled" },
      });
    } catch (err) {
      lastErr = err;
      const msg = String(err.message ?? err);
      const is429 = msg.includes("429") || msg.toLowerCase().includes("too many requests");
      const wait = Math.min((is429 ? 4000 : 1500) * attempt, 30000) + Math.floor(Math.random() * 800);
      console.log(`    retry ${attempt}/${maxAttempts} in ${Math.round(wait / 1000)}s — ${msg.slice(0, 90)}`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function main() {
  const zai = await ZAI.create();
  let totalFallback = 0;

  for (const target of TARGETS) {
    const file = join(DICT_DIR, `${target.code}.json`);
    const dict = JSON.parse(readFileSync(file, "utf8"));

    const missing = NEW_KEYS.filter(
      (k) => !(typeof dict[k] === "string" && dict[k].trim() && dict[k] !== en[k])
    );

    if (!missing.length) {
      console.log(`→ skip ${target.code} (keys already translated)`);
      continue;
    }

    const payload = {};
    for (const k of missing) payload[k] = en[k];

    let translated = {};
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const completion = await chatWithRetry(zai, [
          { role: "assistant", content: systemPrompt(target.name) },
          {
            role: "user",
            content:
              `Translate these ${missing.length} UI strings to ${target.name}. ` +
              `Return a JSON object with EXACTLY these keys:\n\n${JSON.stringify(payload, null, 2)}`,
          },
        ]);
        const parsed = parseJsonLoose(completion.choices[0]?.message?.content ?? "");
        translated = {};
        for (const k of missing) {
          const v = parsed[k];
          if (typeof v === "string" && v.trim()) translated[k] = v.trim();
        }
        if (Object.keys(translated).length === missing.length) break;
      } catch (err) {
        console.log(`  [${target.code}] attempt ${attempt} failed: ${String(err.message ?? err).slice(0, 110)}`);
        await sleep(1500 * attempt);
      }
    }

    let fallback = 0;
    for (const k of missing) {
      if (translated[k]) dict[k] = translated[k];
      else fallback++;
    }

    // Rewrite in en.json key order.
    const ordered = {};
    for (const k of Object.keys(en)) ordered[k] = dict[k] ?? en[k];
    writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

    totalFallback += fallback;
    console.log(`✓ ${target.code} — ${missing.length - fallback}/${missing.length} translated${fallback ? `, ${fallback} fell back to EN` : ""}`);
  }

  console.log(`\nDone. Keys left in English: ${totalFallback}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(`[swallowed unhandledRejection] ${String(reason?.message ?? reason).slice(0, 160)}`);
});
