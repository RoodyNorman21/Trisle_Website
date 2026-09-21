/**
 * Trisle i18n translation pipeline.
 *
 * Reads src/i18n/dictionaries/en.json (master) and produces translated
 * dictionaries for all target locales using the z-ai-web-dev-sdk LLM.
 *
 * Features:
 * - Chunked requests (40 keys per call) to keep outputs reliable
 * - Strict JSON parsing with fence stripping
 * - Per-chunk retry (3 attempts), missing-key repair pass, English fallback
 * - Resumable: SKIP_EXISTING=1 skips locales already complete
 * - Concurrency limited pool (4 languages at a time)
 *
 * Usage:  bun scripts/translate.mjs            (full run)
 *         SKIP_EXISTING=1 bun scripts/translate.mjs
 */
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = join(ROOT, "src/i18n/dictionaries");
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const EN_KEYS = Object.keys(en);
const CHUNK_SIZE = 40;

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
  "Trisle",
  "Polar.sh",
  "iOS",
  "Android",
  "iPhone",
  "Apple Inc.",
  "OLED",
  "APK",
  "GPU",
  "€5.99",
  "v2",
  "WH-1000XM5",
  "Blinding Lights",
  "The Weeknd",
  "Alessandra",
  "Daniel Reyes",
  "Market St",
  "Spotify",
  "YouTube Music",
  "Apple Music",
  "Google Maps",
  "Dynamic Island",
  "Notification Listener API",
];

function systemPrompt(langName) {
  return [
    `You are a professional localization engineer localizing a premium, minimal Android-app marketing website from English into ${langName}.`,
    "",
    "STRICT RULES:",
    "1. Return ONLY a valid JSON object. No markdown fences, no commentary, no trailing text.",
    `2. Keep these tokens EXACTLY as-is, untranslated: ${KEEP_AS_IS.join(", ")}.`,
    "3. Keep numerals, times (02:41, 04:18), percentages (87%), and units with numbers (350 ft, 18 min • 5:24) unchanged.",
    "4. Keep every {placeholder} like {year} intact.",
    "5. Preserve the tone: concise, confident, premium tech marketing. No wordiness.",
    "6. Every key from the input MUST appear in your output with a non-empty translated string value.",
  ].join("\n");
}

/** Strip markdown fences and extract the outermost JSON object. */
function parseJsonLoose(text) {
  let t = String(text).trim();
  t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("no JSON object found");
  return JSON.parse(t.slice(start, end + 1));
}

function chunkKeys(keys, size) {
  const out = [];
  for (let i = 0; i < keys.length; i += size) out.push(keys.slice(i, i + size));
  return out;
}

async function translateChunk(zai, langName, chunk) {
  const payload = {};
  for (const k of chunk) payload[k] = en[k];
  const completion = await chatWithRetry(zai, [
    { role: "assistant", content: systemPrompt(langName) },
    {
      role: "user",
      content:
        `Translate these ${chunk.length} UI strings to ${langName}. ` +
        `Return a JSON object with EXACTLY these keys:\n\n${JSON.stringify(payload, null, 2)}`,
    },
  ]);
  const raw = completion.choices[0]?.message?.content ?? "";
  const parsed = parseJsonLoose(raw);
  const out = {};
  for (const k of chunk) {
    const v = parsed[k];
    if (typeof v === "string" && v.trim().length > 0) out[k] = v.trim();
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Chat completion with aggressive 429-aware retry (the API rate-limits hard under concurrency). */
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
      const base = is429 ? 4000 * attempt : 1500 * attempt;
      const wait = Math.min(base, 30000) + Math.floor(Math.random() * 800);
      console.log(`    retry ${attempt}/${maxAttempts} in ${Math.round(wait / 1000)}s — ${msg.slice(0, 90)}`);
      await sleep(wait);
    }
  }
  throw lastErr;
}

async function translateLanguage(zai, target) {
  const dict = {};
  let missing = [];
  const chunks = chunkKeys(EN_KEYS, CHUNK_SIZE);

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunk = chunks[ci];
    let done = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        done = await translateChunk(zai, target.name, chunk);
        break;
      } catch (err) {
        console.log(
          `  [${target.code}] chunk ${ci + 1}/${chunks.length} attempt ${attempt} failed: ${String(err.message ?? err).slice(0, 120)}`
        );
        await new Promise((r) => setTimeout(r, 1200 * attempt));
      }
    }
    done = done ?? {};
    Object.assign(dict, done);
    missing.push(...chunk.filter((k) => !(k in dict)));
  }

  // One repair pass for missing keys (small batches).
  if (missing.length) {
    console.log(`  [${target.code}] repairing ${missing.length} missing keys…`);
    for (const group of chunkKeys(missing, 12)) {
      try {
        const repaired = await translateChunk(zai, target.name, group);
        Object.assign(dict, repaired);
      } catch {
        /* leave English fallback below */
      }
    }
  }

  // Final assembly with English fallback so the site never shows blanks.
  const final = {};
  let fallbacks = 0;
  for (const k of EN_KEYS) {
    if (dict[k]) final[k] = dict[k];
    else {
      final[k] = en[k];
      fallbacks++;
    }
  }
  writeFileSync(join(DICT_DIR, `${target.code}.json`), JSON.stringify(final, null, 2) + "\n");
  console.log(
    `✓ ${target.code} (${target.name}) — ${EN_KEYS.length - fallbacks}/${EN_KEYS.length} translated${fallbacks ? `, ${fallbacks} fell back to EN` : ""}`
  );
  return fallbacks;
}

async function main() {
  const skipExisting = process.env.SKIP_EXISTING === "1";
  const zai = await ZAI.create();
  const queue = [];

  for (const target of TARGETS) {
    const file = join(DICT_DIR, `${target.code}.json`);
    if (skipExisting && existsSync(file)) {
      try {
        const existing = JSON.parse(readFileSync(file, "utf8"));
        const complete = EN_KEYS.every((k) => typeof existing[k] === "string" && existing[k].trim());
        const differs = EN_KEYS.some((k) => existing[k] !== en[k]);
        if (complete && differs) {
          console.log(`→ skip ${target.code} (already translated)`);
          continue;
        }
      } catch {
        /* retranslate */
      }
    }
    queue.push(target);
  }

  console.log(`Translating ${queue.length} locales × ${EN_KEYS.length} keys…`);
  const CONCURRENCY = 2;
  let totalFallback = 0;
  let idx = 0;

  async function worker() {
    while (idx < queue.length) {
      const target = queue[idx++];
      console.log(`▸ starting ${target.code} (${target.name})`);
      try {
        totalFallback += await translateLanguage(zai, target);
      } catch (err) {
        console.error(`✗ ${target.code} unrecoverable: ${err.message ?? err}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`\nDone. Total keys left in English: ${totalFallback}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Never let a stray SDK rejection kill the run — log and keep going.
process.on("unhandledRejection", (reason) => {
  console.log(`[swallowed unhandledRejection] ${String(reason?.message ?? reason).slice(0, 160)}`);
});
