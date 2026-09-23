/** Repair pass: find keys in <code>.json that are still identical to English and retranslate them. */
import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = join(ROOT, "src/i18n/dictionaries");
const code = process.argv[2] ?? "ta";
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const dict = JSON.parse(readFileSync(join(DICT_DIR, `${code}.json`), "utf8"));
const NAMES = { ta: "Tamil", el: "Greek", th: "Thai", sw: "Swahili" };
const langName = NAMES[code] ?? code;

const missing = Object.keys(en).filter((k) => !dict[k] || dict[k] === en[k]);
console.log(`${code}: ${missing.length} keys to repair`);

function parseJsonLoose(text) {
  let t = String(text).trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  return JSON.parse(t.slice(start, end + 1));
}

const KEEP = ["Trisle","Polar.sh","iOS","Android","iPhone","Apple Inc.","OLED","APK","GPU","€3.99","v2","WH-1000XM5","Blinding Lights","The Weeknd","Alessandra","Daniel Reyes","Market St","Spotify","YouTube Music","Apple Music","Google Maps","Notification Listener API"];

const zai = await ZAI.create();
for (let i = 0; i < missing.length; i += 6) {
  const batch = missing.slice(i, i + 6);
  const payload = Object.fromEntries(batch.map((k) => [k, en[k]]));
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "assistant",
            content:
              `You are a professional localization engineer. Translate UI strings from English to ${langName}. Keep exactly as-is: ${KEEP.join(", ")}. Keep {placeholders}, numerals, times, percentages unchanged. Premium, concise marketing tone. Return ONLY a valid JSON object with the same keys.`,
          },
          {
            role: "user",
            content:
              `Translate to ${langName}. IMPORTANT: adapt every string naturally into ${langName} — do NOT copy English words (except the brand/product names listed). Tech terms like "Live Activities", "Dynamic Island", animation style names ("Subtle Fade", "iOS Classic Morph") and legal lines ("All rights reserved") must be rendered naturally per ${langName} conventions where such adaptation is customary. Return JSON with EXACTLY these keys:\n\n${JSON.stringify(payload, null, 2)}`,
          },
        ],
        thinking: { type: "disabled" },
      });
      const parsed = parseJsonLoose(completion.choices[0]?.message?.content ?? "");
      for (const k of batch) {
        if (typeof parsed[k] === "string" && parsed[k].trim() && parsed[k].trim() !== en[k]) {
          dict[k] = parsed[k].trim();
        }
      }
      break;
    } catch (e) {
      console.log(`  batch retry ${attempt}: ${String(e.message ?? e).slice(0, 80)}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
  await new Promise((r) => setTimeout(r, 1500));
}

const remaining = Object.keys(en).filter((k) => !dict[k] || dict[k] === en[k]);
writeFileSync(join(DICT_DIR, `${code}.json`), JSON.stringify(dict, null, 2) + "\n");
console.log(`${code}: repaired — ${missing.length - remaining.length}/${missing.length} fixed, ${remaining.length} still EN`);
if (remaining.length) console.log("Still EN:", remaining.join(", "));
