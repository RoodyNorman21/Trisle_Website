#!/usr/bin/env python3
"""Hand-translate the 7 proof.* keys into the 13 locales the LLM pipeline could not reach (429 limits)."""
import json
from collections import OrderedDict

T = {
    "de": {
        "proof.aria": "Vertrauens-Highlights von Trisle",
        "proof.1": "Über 1.000 Menschen haben Trisle schon gekauft",
        "proof.2": "7 Tage Rückerstattung, ohne Fragen",
        "proof.3": "Eine Zahlung — für immer dein",
        "proof.4": "100 % auf dem Gerät. Kein Tracking.",
        "proof.5": "Zahlungen gesichert durch Polar",
        "proof.6": "In unter zwei Minuten eingerichtet",
    },
    "el": {
        "proof.aria": "Αξιοπιστία της Trisle με μια ματιά",
        "proof.1": "Πάνω από 1.000 άνθρωποι έχουν ήδη αγοράσει την Trisle",
        "proof.2": "Επιστροφή χρημάτων 7 ημερών, χωρίς ερωτήσεις",
        "proof.3": "Μία πληρωμή — δική σου για πάντα",
        "proof.4": "100% στη συσκευή. Μηδενική παρακολούθηση.",
        "proof.5": "Πληρωμές με ασφάλεια Polar",
        "proof.6": "Έτοιμο σε λιγότερο από δύο λεπτά",
    },
    "id": {
        "proof.aria": "Sorotan kepercayaan Trisle",
        "proof.1": "1.000+ orang sudah membeli Trisle",
        "proof.2": "Pengembalian dana 7 hari, tanpa pertanyaan",
        "proof.3": "Sekali bayar — milikmu selamanya",
        "proof.4": "100% di perangkat. Tanpa pelacakan.",
        "proof.5": "Pembayaran diamankan oleh Polar",
        "proof.6": "Siap dalam kurang dari dua menit",
    },
    "it": {
        "proof.aria": "I punti di forza di Trisle",
        "proof.1": "Oltre 1.000 persone hanno già comprato Trisle",
        "proof.2": "Rimborso entro 7 giorni, senza domande",
        "proof.3": "Un solo pagamento — tuo per sempre",
        "proof.4": "100% sul dispositivo. Zero tracciamento.",
        "proof.5": "Pagamenti protetti da Polar",
        "proof.6": "Pronto in meno di due minuti",
    },
    "ja": {
        "proof.aria": "Trisle の信頼ポイント",
        "proof.1": "1,000 人以上がすでに Trisle を購入",
        "proof.2": "理由を問わない 7 日間返金保証",
        "proof.3": "支払いは一度だけ — 永久にあなたのもの",
        "proof.4": "100% 端末内処理。追跡なし。",
        "proof.5": "決済は Polar が安全に処理",
        "proof.6": "2 分以内でセットアップ完了",
    },
    "ko": {
        "proof.aria": "Trisle 신뢰 하이라이트",
        "proof.1": "1,000명 이상이 이미 Trisle을 구매했습니다",
        "proof.2": "7일 환불, 이유를 묻지 않습니다",
        "proof.3": "한 번의 결제 — 평생 당신 것",
        "proof.4": "100% 온디바이스. 추적 없음.",
        "proof.5": "Polar로 안전하게 결제",
        "proof.6": "2분 안에 설정 완료",
    },
    "ru": {
        "proof.aria": "Почему Trisle доверяют",
        "proof.1": "Более 1 000 человек уже купили Trisle",
        "proof.2": "Возврат в течение 7 дней, без вопросов",
        "proof.3": "Один платёж — ваш навсегда",
        "proof.4": "100% на устройстве. Нулевое отслеживание.",
        "proof.5": "Платежи защищены Polar",
        "proof.6": "Настройка менее чем за две минуты",
    },
    "sw": {
        "proof.aria": "Mambo ya kuaminika kuhusu Trisle",
        "proof.1": "Watu zaidi ya 1,000 wameshanunua Trisle",
        "proof.2": "Rejesho ya siku 7, bila maswali",
        "proof.3": "Malipo ya mara moja — ni yako milele",
        "proof.4": "100% kwenye kifaa. Hakuna ufuatiliaji.",
        "proof.5": "Malipo yanalindwa na Polar",
        "proof.6": "Imewekwa chini ya dakika mbili",
    },
    "ta": {
        "proof.aria": "Trisle நம்பிக்கை சிறப்பம்சங்கள்",
        "proof.1": "1,000+ பேர் ஏற்கனவே Trisle வாங்கியுள்ளனர்",
        "proof.2": "7 நாள் பணத்தைத் திரும்பப் பெறுதல், எந்தக் கேள்வியும் இல்லை",
        "proof.3": "ஒரே பணம் — என்றும் உங்களுடையது",
        "proof.4": "100% சாதனத்திலேயே. கண்காணிப்பு இல்லை.",
        "proof.5": "Polar மூலம் பாதுகாப்பான பணப்பரிமாற்றம்",
        "proof.6": "இரண்டு நிமிடங்களுக்குள் அமைவு முடிந்தது",
    },
    "th": {
        "proof.aria": "จุดที่ทำให้เชื่อถือได้ของ Trisle",
        "proof.1": "มีผู้ซื้อ Trisle แล้วกว่า 1,000 คน",
        "proof.2": "คืนเงินภายใน 7 วัน ไม่ต้องตอบคำถาม",
        "proof.3": "จ่ายครั้งเดียว — เป็นของคุณตลอดไป",
        "proof.4": "ประมวลผลในเครื่อง 100% ไม่มีการติดตาม",
        "proof.5": "ชำระเงินอย่างปลอดภัยผ่าน Polar",
        "proof.6": "ตั้งค่าเสร็จในไม่ถึงสองนาที",
    },
    "tr": {
        "proof.aria": "Trisle güven göstergeleri",
        "proof.1": "1.000'den fazla kişi Trisle'i çoktan satın aldı",
        "proof.2": "7 gün içinde koşulsuz iade",
        "proof.3": "Tek ödeme — sonsuza dek senin",
        "proof.4": "%100 cihazda. Sıfır izleme.",
        "proof.5": "Ödemeler Polar güvencesiyle",
        "proof.6": "İki dakikadan kısa sürede kurulum",
    },
    "ur": {
        "proof.aria": "Trisle پر بھروسے کے اہم نکات",
        "proof.1": "1,000 سے زیادہ لوگ Trisle خرید چکے ہیں",
        "proof.2": "7 دن میں رقم واپسی، کوئی سوال نہیں",
        "proof.3": "ایک بار ادائیگی — ہمیشہ کے لیے آپ کی",
        "proof.4": "100% آپ کے آلات پر۔ کوئی ٹریکنگ نہیں۔",
        "proof.5": "ادائیگیاں Polar کی حفاظت سے",
        "proof.6": "دو منٹ سے بھی کم میں سیٹ اپ",
    },
    "vi": {
        "proof.aria": "Điểm đáng tin của Trisle",
        "proof.1": "Hơn 1.000 người đã mua Trisle",
        "proof.2": "Hoàn tiền trong 7 ngày, không hỏi lý do",
        "proof.3": "Thanh toán một lần — mãi mãi là của bạn",
        "proof.4": "100% ngay trên thiết bị. Không theo dõi.",
        "proof.5": "Thanh toán được bảo đảm bởi Polar",
        "proof.6": "Cài đặt xong trong chưa đến hai phút",
    },
}

KEYS = ["proof.aria", "proof.1", "proof.2", "proof.3", "proof.4", "proof.5", "proof.6"]
for code, trans in T.items():
    path = f"src/i18n/dictionaries/{code}.json"
    d = json.load(open(path, encoding="utf8"), object_pairs_hook=OrderedDict)
    for k in KEYS:
        d[k] = trans[k]
    # rewrite in en.json key order (same convention as the pipeline scripts)
    en_order = list(json.load(open("src/i18n/dictionaries/en.json", encoding="utf8")).keys())
    out = OrderedDict((k, d[k]) for k in en_order if k in d)
    json.dump(out, open(path, "w", encoding="utf8"), ensure_ascii=False, indent=2)
    open(path, "a", encoding="utf8").write("\n")
    print(f"{code}: 7/7 written")
