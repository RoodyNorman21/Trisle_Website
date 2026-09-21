/** Validate all locale dictionaries: JSON parse, key parity with en, non-empty values, spot samples. */
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = join(ROOT, "src/i18n/dictionaries");
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const EN_KEYS = Object.keys(en).sort();

// Keys that are legitimately identical across languages (pure numerals/units).
const NUMERIC_OK = new Set(["island.music.time", "island.music.remaining"]);

const files = readdirSync(DICT_DIR).filter((f) => f.endsWith(".json") && f !== "en.json");
let problems = 0;

for (const f of files) {
  const code = f.replace(".json", "");
  let dict;
  try {
    dict = JSON.parse(readFileSync(join(DICT_DIR, f), "utf8"));
  } catch (e) {
    console.log(`✗ ${code}: INVALID JSON — ${e.message}`);
    problems++;
    continue;
  }
  const keys = Object.keys(dict).sort();
  const missing = EN_KEYS.filter((k) => !(k in dict));
  const extra = keys.filter((k) => !(k in en));
  const empty = EN_KEYS.filter((k) => typeof dict[k] !== "string" || !dict[k].trim());
  const sameAsEn = EN_KEYS.filter(
    (k) => !NUMERIC_OK.has(k) && dict[k] === en[k] && en[k].length > 12
  );

  const issues = [];
  if (missing.length) issues.push(`missing ${missing.length}: ${missing.slice(0, 5).join(",")}`);
  if (extra.length) issues.push(`extra ${extra.length}: ${extra.slice(0, 5).join(",")}`);
  if (empty.length) issues.push(`empty ${empty.length}: ${empty.slice(0, 5).join(",")}`);
  if (sameAsEn.length) issues.push(`untranslated ${sameAsEn.length}: ${sameAsEn.slice(0, 6).join(",")}`);

  if (issues.length) {
    console.log(`△ ${code}: ${issues.join(" | ")}`);
    problems++;
  } else {
    console.log(`✓ ${code}: ${keys.length}/${EN_KEYS.length} keys, fully translated`);
  }
}

// Spot samples
console.log("\n--- Spot samples ---");
const samples = [
  { code: "el", keys: ["hero.title2", "pricing.cta", "faq.q3"] },
  { code: "zh", keys: ["hero.title2", "features.triple.title"] },
  { code: "ja", keys: ["hero.badge", "nav.getTrisle"] },
  { code: "ar", keys: ["hero.desc"] },
  { code: "es", keys: ["pricing.title1", "footer.tagline"] },
  { code: "ta", keys: ["hero.title1", "pers.filter.desc"] },
];
for (const s of samples) {
  const dict = JSON.parse(readFileSync(join(DICT_DIR, `${s.code}.json`), "utf8"));
  for (const k of s.keys) console.log(`${s.code}.${k}: ${dict[k]}`);
}

console.log(problems ? `\n${problems} dictionaries need attention` : "\nALL DICTIONARIES VALID");
