/**
 * Merge the 6 new home-screen app-label keys into every locale dictionary.
 * Rebuilds each file in en.json key order so files stay diff-friendly.
 * These are standard launcher UI words translated by hand (no LLM needed).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT_DIR = join(ROOT, "src/i18n/dictionaries");
const en = JSON.parse(readFileSync(join(DICT_DIR, "en.json"), "utf8"));
const KEYS = ["apps.photos", "apps.maps", "apps.clock", "apps.calendar", "apps.settings", "apps.files"];

const LABELS = {
  zh: ["照片", "地图", "时钟", "日历", "设置", "文件"],
  hi: ["फ़ोटो", "मैप्स", "घड़ी", "कैलेंडर", "सेटिंग", "फ़ाइलें"],
  es: ["Fotos", "Mapas", "Reloj", "Calendario", "Ajustes", "Archivos"],
  fr: ["Photos", "Maps", "Horloge", "Agenda", "Paramètres", "Fichiers"],
  ar: ["الصور", "الخرائط", "الساعة", "التقويم", "الإعدادات", "الملفات"],
  bn: ["ফটো", "ম্যাপস", "ঘড়ি", "ক্যালেন্ডার", "সেটিংস", "ফাইল"],
  pt: ["Fotos", "Mapas", "Relógio", "Calendário", "Configurações", "Arquivos"],
  ru: ["Фото", "Карты", "Часы", "Календарь", "Настройки", "Файлы"],
  ur: ["تصاویر", "نقشے", "گھڑی", "کیلنڈر", "ترتیبات", "فائلیں"],
  id: ["Foto", "Maps", "Jam", "Kalender", "Setelan", "File"],
  de: ["Fotos", "Maps", "Uhr", "Kalender", "Einstellungen", "Dateien"],
  ja: ["写真", "マップ", "時計", "カレンダー", "設定", "ファイル"],
  tr: ["Fotoğraflar", "Haritalar", "Saat", "Takvim", "Ayarlar", "Dosyalar"],
  ko: ["사진", "지도", "시계", "캘린더", "설정", "파일"],
  vi: ["Ảnh", "Bản đồ", "Đồng hồ", "Lịch", "Cài đặt", "Tệp"],
  it: ["Foto", "Maps", "Orologio", "Calendario", "Impostazioni", "File"],
  ta: ["புகைப்படங்கள்", "வரைபடங்கள்", "கடிகாரம்", "காலண்டர்", "அமைப்புகள்", "கோப்புகள்"],
  th: ["รูปภาพ", "แผนที่", "นาฬิกา", "ปฏิทิน", "การตั้งค่า", "ไฟล์"],
  sw: ["Picha", "Ramani", "Saa", "Kalenda", "Mipangilio", "Faili"],
  el: ["Φωτογραφίες", "Χάρτες", "Ρολόι", "Ημερολόγιο", "Ρυθμίσεις", "Αρχεία"],
};

let failures = 0;
for (const [code, words] of Object.entries(LABELS)) {
  const file = join(DICT_DIR, `${code}.json`);
  const dict = JSON.parse(readFileSync(file, "utf8"));
  KEYS.forEach((k, i) => {
    dict[k] = words[i];
  });
  // Rebuild in en.json key order.
  const ordered = {};
  for (const k of Object.keys(en)) ordered[k] = dict[k] ?? en[k];
  const missing = KEYS.filter((k) => !ordered[k] || ordered[k] === en[k]);
  if (missing.length) {
    console.log(`⚠ ${code}: not set: ${missing.join(", ")}`);
    failures++;
  }
  writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");
  console.log(`✓ ${code}`);
}
console.log(failures ? `Done with ${failures} warning(s)` : "All 20 locales updated.");
