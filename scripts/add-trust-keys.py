"""Add trust/conversion keys (faq.q10/a10, faq.q11/a11, pricing.step1-3) to all 21 dictionaries."""
import json, collections, os

DICT = "/home/z/my-project/src/i18n/dictionaries"

T = {
"en": {
 "faq.q10": "Why isn't Trisle on the Google Play Store?",
 "faq.a10": "Simple math: selling directly means no 30% store cut, and that saving goes to you — Trisle stays at €3.99, while a Play Store version would have to cost noticeably more. Nothing else changes: the APK is cryptographically signed like any store app, payments and taxes are handled by Polar.sh as an official merchant of record, and every purchase is covered by the 7-day full-refund guarantee. Distribution through other app stores is being considered for the future.",
 "faq.q11": "Is it safe to pay and install the APK?",
 "faq.a11": "Yes. Payments run through Polar.sh — a European merchant of record with an SSL-encrypted checkout, official VAT invoices and support for cards, Apple Pay and Google Pay; we never see your payment details. The Trisle APK is signed like any app on an official store, requests only two standard Android permissions (display over other apps and notification access), and everything runs on your device. And if anything feels off: a full refund within 7 days, no questions asked.",
 "pricing.step1": "Pay securely — card, Apple Pay or Google Pay",
 "pricing.step2": "Instant email with your license key + APK download",
 "pricing.step3": "Install in under two minutes — no root, guide included",
},
"de": {
 "faq.q10": "Warum gibt es Trisle nicht im Google Play Store?",
 "faq.a10": "Einfache Rechnung: Der direkte Vertrieb bedeutet keinen 30-%-Store-Anteil — und diese Ersparnis gehört Ihnen. Trisle bleibt deshalb bei 3,99 €, während eine Play-Store-Version spürbar teurer sein müsste. An der Sicherheit ändert das nichts: Die APK ist kryptografisch signiert wie jede Store-App, Zahlungen und Steuern werden von Polar.sh als offiziellem Merchant of Record abgewickelt, und jeder Kauf ist durch die 7-tägige Geld-zurück-Garantie abgesichert. Der Vertrieb über andere App-Stores wird für die Zukunft geprüft.",
 "faq.q11": "Ist Bezahlen und die APK-Installation sicher?",
 "faq.a11": "Ja. Die Zahlung läuft über Polar.sh — einen europäischen Merchant of Record mit SSL-verschlüsseltem Checkout, offiziellen Rechnungen und Unterstützung für Karte, Apple Pay und Google Pay; Ihre Zahlungsdaten sehen wir nie. Die Trisle-APK ist wie jede Store-App signiert, benötigt nur zwei Standard-Berechtigungen (Über anderen Apps anzeigen und Benachrichtigungszugriff) und läuft vollständig auf Ihrem Gerät. Und falls doch etwas nicht passt: 7 Tage Geld zurück, ohne Fragen.",
 "pricing.step1": "Sicher bezahlen — Karte, Apple Pay oder Google Pay",
 "pricing.step2": "Sofortige E-Mail mit Lizenzschlüssel + APK-Download",
 "pricing.step3": "In unter zwei Minuten installiert — kein Root, Anleitung inklusive",
},
"es": {
 "faq.q10": "¿Por qué no está Trisle en Google Play Store?",
 "faq.a10": "Cuentas sencillas: vender directamente evita la comisión del 30 % de la tienda, y ese ahorro es tuyo — Trisle se mantiene en 3,99 €, mientras que una versión de Play Store tendría que costar bastante más. En seguridad no cambia nada: la APK está firmada criptográficamente como cualquier app de tienda, los pagos y los impuestos los gestiona Polar.sh como merchant of record oficial, y cada compra está protegida por la garantía de devolución completa de 7 días. La distribución en otras tiendas de aplicaciones está en estudio para el futuro.",
 "faq.q11": "¿Es seguro pagar e instalar la APK?",
 "faq.a11": "Sí. El pago se realiza a través de Polar.sh, un merchant of record europeo con pago cifrado SSL, facturas oficiales de IVA y compatibilidad con tarjetas, Apple Pay y Google Pay; nunca vemos tus datos bancarios. La APK de Trisle está firmada como cualquier app de una tienda oficial, solo pide dos permisos estándar de Android (superponerse a otras apps y acceso a notificaciones) y todo funciona en tu dispositivo. Y si algo no te convence: devolución completa en 7 días, sin preguntas.",
 "pricing.step1": "Paga con seguridad — tarjeta, Apple Pay o Google Pay",
 "pricing.step2": "Correo al instante con tu clave de licencia + descarga de la APK",
 "pricing.step3": "Instalación en menos de dos minutos — sin root, guía incluida",
},
"fr": {
 "faq.q10": "Pourquoi Trisle n'est-il pas sur le Google Play Store ?",
 "faq.a10": "Un calcul simple : vendre en direct évite la commission de 30 % de la boutique, et cette économie vous revient — Trisle reste à 3,99 €, alors qu'une version Play Store devrait coûter nettement plus cher. Côté sécurité, rien ne change : l'APK est signée cryptographiquement comme n'importe quelle application de boutique, les paiements et les taxes sont gérés par Polar.sh en tant que marchand de record officiel, et chaque achat est couvert par la garantie de remboursement intégral de 7 jours. Une distribution via d'autres boutiques d'applications est à l'étude pour l'avenir.",
 "faq.q11": "Est-il sûr de payer et d'installer l'APK ?",
 "faq.a11": "Oui. Le paiement passe par Polar.sh, un marchand de record européen avec paiement chiffré SSL, factures de TVA officielles et prise en charge des cartes, d'Apple Pay et de Google Pay ; nous ne voyons jamais vos données bancaires. L'APK de Trisle est signée comme toute application d'une boutique officielle, ne demande que deux autorisations Android standard (affichage par-dessus les applications et accès aux notifications) et tout s'exécute sur votre appareil. Et si quelque chose ne vous convient pas : remboursement intégral sous 7 jours, sans question.",
 "pricing.step1": "Payez en toute sécurité — carte, Apple Pay ou Google Pay",
 "pricing.step2": "E-mail instantané avec votre clé de licence + lien de téléchargement de l'APK",
 "pricing.step3": "Installation en moins de deux minutes — sans root, guide inclus",
},
"pt": {
 "faq.q10": "Porque é que o Trisle não está na Google Play Store?",
 "faq.a10": "Contas simples: vender diretamente evita a comissão de 30% da loja, e essa poupança é sua — o Trisle mantém-se em 3,99 €, enquanto uma versão Play Store teria de custar bastante mais. Em termos de segurança, nada muda: a APK é assinada criptograficamente como qualquer app de loja, os pagamentos e impostos são tratados pela Polar.sh como merchant of record oficial, e cada compra é protegida pela garantia de reembolso total de 7 dias. A distribuição noutras lojas de apps está a ser avaliada para o futuro.",
 "faq.q11": "É seguro pagar e instalar a APK?",
 "faq.a11": "Sim. O pagamento é feito através da Polar.sh, um merchant of record europeu com checkout encriptado SSL, faturas oficiais de IVA e suporte para cartões, Apple Pay e Google Pay; nós nunca vemos os seus dados de pagamento. A APK do Trisle é assinada como qualquer app de uma loja oficial, pede apenas duas permissões Android padrão (sobrepor a outras apps e acesso às notificações) e tudo funciona no seu dispositivo. E se não ficar satisfeito: reembolso total em 7 dias, sem perguntas.",
 "pricing.step1": "Pague com segurança — cartão, Apple Pay ou Google Pay",
 "pricing.step2": "E-mail instantâneo com a sua chave de licença + download da APK",
 "pricing.step3": "Instalação em menos de dois minutos — sem root, guia incluído",
},
"it": {
 "faq.q10": "Perché Trisle non è sul Google Play Store?",
 "faq.a10": "Conti semplici: vendere direttamente evita la commissione del 30% dello store, e quel risparmio va a te — Trisle resta a 3,99 €, mentre una versione Play Store dovrebbe costare parecchio di più. Sulla sicurezza non cambia nulla: l'APK è firmata crittograficamente come qualsiasi app dello store, pagamenti e tasse sono gestiti da Polar.sh come merchant of record ufficiale, e ogni acquisto è coperto dalla garanzia di rimborso completo di 7 giorni. La distribuzione su altri store è in valutazione per il futuro.",
 "faq.q11": "È sicuro pagare e installare l'APK?",
 "faq.a11": "Sì. Il pagamento passa attraverso Polar.sh, un merchant of record europeo con checkout cifrato SSL, fatture IVA ufficiali e supporto per carte, Apple Pay e Google Pay; non vediamo mai i tuoi dati di pagamento. L'APK di Trisle è firmata come qualsiasi app di uno store ufficiale, richiede solo due permessi Android standard (sovrapposizione alle altre app e accesso alle notifiche) e tutto funziona sul tuo dispositivo. E se qualcosa non va: rimborso completo entro 7 giorni, senza domande.",
 "pricing.step1": "Paga in sicurezza — carta, Apple Pay o Google Pay",
 "pricing.step2": "Email istantanea con chiave di licenza + download dell'APK",
 "pricing.step3": "Installazione in meno di due minuti — senza root, guida inclusa",
},
"ru": {
 "faq.q10": "Почему Trisle нет в Google Play Store?",
 "faq.a10": "Простая арифметика: прямые продажи означают отсутствие 30-процентной комиссии магазина, и эта экономия достаётся вам — Trisle стоит 3,99 €, тогда как версия для Play Store должна была бы стоить заметно дороже. В безопасности ничего не меняется: APK криптографически подписан, как любое приложение из магазина, платежи и налоги обрабатывает Polar.sh как официальный продавец (merchant of record), а каждая покупка защищена 7-дневной гарантией полного возврата денег. Размещение в других магазинах приложений рассматривается на будущее.",
 "faq.q11": "Безопасно ли платить и устанавливать APK?",
 "faq.a11": "Да. Оплата проходит через Polar.sh — европейского продавца с SSL-шифрованием, официальными счетами с НДС и поддержкой карт, Apple Pay и Google Pay; мы никогда не видим ваши платёжные данные. APK Trisle подписан как любое приложение из официального магазина, требует только два стандартных разрешения Android (поверх других приложений и доступ к уведомлениям), и всё работает на вашем устройстве. А если что-то не так: полный возврат в течение 7 дней без лишних вопросов.",
 "pricing.step1": "Безопасная оплата — карта, Apple Pay или Google Pay",
 "pricing.step2": "Мгновенное письмо с лицензионным ключом + ссылкой на APK",
 "pricing.step3": "Установка менее чем за две минуты — без root, с инструкцией",
},
"el": {
 "faq.q10": "Γιατί δεν υπάρχει το Trisle στο Google Play Store;",
 "faq.a10": "Απλά μαθηματικά: η άμεση πώληση σημαίνει ότι δεν υπάρχει προμήθεια 30% του καταστήματος, και αυτή η εξοικονόμηση δική σας είναι — το Trisle παραμένει στα 3,99 €, ενώ μια έκδοση για Play Store θα έπρεπε να κοστίζει αισθητά περισσότερο. Στην ασφάλεια δεν αλλάζει τίποτα: το APK είναι κρυπτογραφικά υπογεγραμμένο όπως κάθε εφαρμογή καταστήματος, τις πληρωμές και τους φόρους διαχειρίζεται η Polar.sh ως επίσημος merchant of record, και κάθε αγορά καλύπτεται από την εγγύηση πλήρους επιστροφής χρημάτων 7 ημερών. Η διανομή μέσω άλλων καταστημάτων εφαρμογών εξετάζεται για το μέλλον.",
 "faq.q11": "Είναι ασφαλής η πληρωμή και η εγκατάσταση του APK;",
 "faq.a11": "Ναι. Η πληρωμή γίνεται μέσω της Polar.sh, ενός ευρωπαϊκού merchant of record με κρυπτογραφημένη πληρωμή SSL, επίσημα τιμολόγια ΦΠΑ και υποστήριξη καρτών, Apple Pay και Google Pay· δεν βλέπουμε ποτέ τα στοιχεία πληρωμής σας. Το APK του Trisle είναι υπογεγραμμένο όπως κάθε εφαρμογή επίσημου καταστήματος, ζητά μόνο δύο τυπικά δικαιώματα Android (εμφάνιση πάνω από εφαρμογές και πρόσβαση σε ειδοποιήσεις) και όλα εκτελούνται στη συσκευή σας. Και αν κάτι δεν σας ταιριάζει: πλήρης επιστροφή χρημάτων σε 7 ημέρες, χωρίς ερωτήσεις.",
 "pricing.step1": "Ασφαλής πληρωμή — κάρτα, Apple Pay ή Google Pay",
 "pricing.step2": "Άμεσο email με το κλειδί άδειας + λήψη του APK",
 "pricing.step3": "Εγκατάσταση σε λιγότερο από δύο λεπτά — χωρίς root, με οδηγό",
},
"tr": {
 "faq.q10": "Trisle neden Google Play Store'da yok?",
 "faq.a10": "Basit matematik: doğrudan satış, mağazanın %30 komisyonunu ortadan kaldırır ve bu tasarruf size kalır — Trisle 3,99 € olarak kalır; bir Play Store sürümü ise belirgin şekilde daha pahalı olmak zorunda kalırdı. Güvenlik açısından hiçbir şey değişmiyor: APK, mağaza uygulamaları gibi kriptografik olarak imzalanır; ödemeler ve vergiler Polar.sh tarafından resmi merchant of record olarak işlenir ve her satın alma, 7 günlük tam para iade garantisiyle korunur. Diğer uygulama mağazalarından dağıtım gelecek için değerlendiriliyor.",
 "faq.q11": "Ödeme yapmak ve APK'yı kurmak güvenli mi?",
 "faq.a11": "Evet. Ödeme, SSL şifreli ödeme, resmi KDV faturaları ve kart, Apple Pay ve Google Pay desteği sunan Avrupa merkezli bir merchant of record olan Polar.sh üzerinden yapılır; ödeme bilgilerinizi asla görmeyiz. Trisle APK'sı resmi bir mağazadaki her uygulama gibi imzalanır, yalnızca iki standart Android izni ister (uygulamaların üzerinde gösterme ve bildirim erişimi) ve her şey cihazınızda çalışır. Bir sorun olursa: 7 gün içinde soru sormadan tam iade.",
 "pricing.step1": "Güvenli ödeme — kart, Apple Pay veya Google Pay",
 "pricing.step2": "Lisans anahtarınız + APK indirme bağlantısı ile anında e-posta",
 "pricing.step3": "İki dakikadan kısa kurulum — root yok, kılavuz dahil",
},
"ar": {
 "faq.q10": "لماذا ليس Trisle متاحًا على متجر Google Play؟",
 "faq.a10": "حساب بسيط: البيع المباشر يعني تجنّب عمولة المتجر البالغة 30%، وهذا التوفير يذهب إليك — يبقى سعر Trisle عند 3.99 يورو، في حين أن إصدارًا على متجر Play سيتعين عليه أن يكون أغلى بكثير. ومن حيث الأمان لا يتغير شيء: ملف APK موقّع تشفيريًا مثل أي تطبيق متجر، وتتولى Polar.sh المعالجة الرسمية للمدفوعات والضرائب بوصفها التاجر الرسمي، وكل عملية شراء محمية بضمان الاسترداد الكامل لمدة 7 أيام. وتوزيع التطبيق عبر متاجر أخرى قيد الدراسة مستقبلًا.",
 "faq.q11": "هل الدفع وتثبيت ملف APK آمنان؟",
 "faq.a11": "نعم. تتم الدفعات عبر Polar.sh — تاجر أوروبي رسمي باتفاقية دفع مشفرة بـ SSL وفواتير ضريبة قيمة مضافة رسمية ودعم للبطاقات وApple Pay وGoogle Pay؛ ولا نرى بيانات الدفع الخاصة بك أبدًا. ملف APK الخاص بـ Trisle موقّع مثل أي تطبيق في متجر رسمي، ويطلب إذنين قياسيين فقط لنظام أندرويد (الظهور فوق التطبيقات والوصول إلى الإشعارات)، وكل شيء يعمل على جهازك. وإذا لم يرضيك الأمر: استرداد كامل خلال 7 أيام دون أسئلة.",
 "pricing.step1": "ادفع بأمان — بطاقة أو Apple Pay أو Google Pay",
 "pricing.step2": "بريد فوري يحتوي على مفتاح الترخيص + رابط تنزيل APK",
 "pricing.step3": "تثبيت في أقل من دقيقتين — بدون روت، مع دليل التثبيت",
},
"hi": {
 "faq.q10": "Trisle Google Play Store पर क्यों नहीं है?",
 "faq.a10": "आसान हिसाब: सीधे बेचने का मतलब है स्टोर की 30% कमीशन नहीं, और वह बचत आपकी है — Trisle 3.99 यूरो पर बना रहता है, जबकि Play Store संस्करण को काफ़ी महंगा होना पड़ेगा। सुरक्षा में कोई बदलाव नहीं: APK किसी भी स्टोर ऐप की तरह क्रिप्टोग्राफिक रूप से साइन किया गया है, भुगतान और कर Polar.sh आधिकारिक merchant of record के रूप में संभालता है, और हर खरीदारी 7-दिन की पूर्ण धनवापसी गारंटी से सुरक्षित है। भविष्य के लिए अन्य ऐप स्टोर पर उपलब्धता पर विचार किया जा रहा है।",
 "faq.q11": "क्या भुगतान करना और APK इंस्टॉल करना सुरक्षित है?",
 "faq.a11": "हाँ। भुगतान Polar.sh के ज़रिए होता है — SSL-एन्क्रिप्टेड चेकआउट, आधिकारिक VAT इनवॉइस और कार्ड, Apple Pay तथा Google Pay समर्थन वाला यूरोपीय merchant of record; हम आपकी भुगतान जानकारी कभी नहीं देखते। Trisle APK किसी भी आधिकारिक स्टोर ऐप की तरह साइन किया गया है, केवल दो मानक Android अनुमतियाँ माँगता है (दूसरे ऐप्स के ऊपर दिखाना और सूचना एक्सेस), और सब कुछ आपके डिवाइस पर चलता है। और अगर कुछ भी ठीक न लगे: 7 दिन में बिना सवाल पूरा रिफंड।",
 "pricing.step1": "सुरक्षित भुगतान — कार्ड, Apple Pay या Google Pay",
 "pricing.step2": "लाइसेंस कुंजी + APK डाउनलोड लिंक के साथ तुरंत ईमेल",
 "pricing.step3": "दो मिनट से कम में इंस्टॉल — रूट नहीं, गाइड शामिल",
},
"bn": {
 "faq.q10": "Trisle কেন Google Play Store-এ নেই?",
 "faq.a10": "সহজ হিসাব: সরাসরি বিক্রি মানে স্টোরের 30% কমিশন নেই, আর সেই সাশ্রয় আপনার — Trisle 3.99 ইউরোতেই থাকে, যেখানে Play Store সংস্করণকে উল্লেখযোগ্যভাবে বেশি দামে বিক্রি করতে হতো। নিরাপত্তায় কোনো পরিবর্তন নেই: APK যেকোনো স্টোর অ্যাপের মতো ক্রিপ্টোগ্রাফিকভাবে স্বাক্ষরিত, পেমেন্ট ও কর আধিকারিক merchant of record হিসেবে Polar.sh সামলায়, এবং প্রতিটি ক্রয় 7-দিনের সম্পূর্ণ অর্থফেরত গ্যারান্টি দ্বারা সুরক্ষিত। ভবিষ্যতের জন্য অন্যান্য অ্যাপ স্টোরে বিতরণ বিবেচনা করা হচ্ছে।",
 "faq.q11": "পেমেন্ট করা এবং APK ইনস্টল করা কি নিরাপদ?",
 "faq.a11": "হ্যাঁ। পেমেন্ট হয় Polar.sh-এর মাধ্যমে — SSL-এনক্রিপ্টেড চেকআউট, অফিসিয়াল VAT ইনভয়েস এবং কার্ড, Apple Pay ও Google Pay সমর্থনসহ একজন ইউরোপীয় merchant of record; আপনার পেমেন্ট তথ্য আমরা কখনো দেখি না। Trisle APK যেকোনো অফিসিয়াল স্টোর অ্যাপের মতো স্বাক্ষরিত, শুধু দুটি স্ট্যান্ডার্ড Android অনুমতি চায় (অন্য অ্যাপের উপরে দেখানো এবং নোটিফিকেশন অ্যাক্সেস), এবং সবকিছু আপনার ডিভাইসেই চলে। আর কিছু ঠিক না লাগলে: 7 দিনে কোনো প্রশ্ন ছাড়াই সম্পূর্ণ রিফান্ড।",
 "pricing.step1": "নিরাপদে পেমেন্ট করুন — কার্ড, Apple Pay বা Google Pay",
 "pricing.step2": "লাইসেন্স কী + APK ডাউনলোড লিঙ্ক সহ তাৎক্ষণিক ইমেল",
 "pricing.step3": "দুই মিনিটের কমে ইনস্টল — রুট নেই, গাইড অন্তর্ভুক্ত",
},
"ta": {
 "faq.q10": "Trisle Google Play Store-இல் ஏன் இல்லை?",
 "faq.a10": "எளிய கணக்கு: நேரடியாக விற்பது கடையின் 30% கமிஷனைத் தவிர்க்கிறது, அந்த சேமிப்பு உங்களுடையது — Trisle 3.99 யூரோவில் தொடர்கிறது; Play Store பதிப்பு வெகுண்டு விலை அதிகமாக இருக்க வேண்டும். பாதுகாப்பில் எந்த மாற்றமும் இல்லை: APK எந்தக் கடை செயலியைப் போலவும் கிரிப்டோகிராஃபிக் முறையில் கையொப்பமிடப்பட்டது, பணப்பரிமாற்றம் மற்றும் வரிகளை அதிகாரப்பூர்வ merchant of record ஆன Polar.sh கவனிக்கிறது, ஒவ்வொரு வாங்குதலும் 7 நாள் முழு பணதிருப்ப உத்தரவாதத்தால் பாதுகாக்கப்படுகிறது. எதிர்காலத்தில் பிற செயலி கடைகளில் விநியோகம் பரிசீலிக்கப்படுகிறது.",
 "faq.q11": "பணம் செலுத்துவதும் APK-ஐ நிறுவுவதும் பாதுகாப்பானதா?",
 "faq.a11": "ஆம். பணம் செலுத்துவது Polar.sh வழியாக நடக்கிறது — SSL மூலம் மறையாக்கப்பட்ட கட்டணம், அதிகாரப்பூர்வ VAT பில்கள் மற்றும் கார்டு, Apple Pay, Google Pay ஆதரவுடன் கூடிய ஐரோப்பிய merchant of record; உங்கள் கட்டண விவரங்களை நாங்கள் ஒருபோதும் பார்க்க மாட்டோம். Trisle APK அதிகாரப்பூர்வ கடை செயலியைப் போலவே கையொப்பமிடப்பட்டது, இரண்டு நிலையான Android அனுமதிகளை மட்டுமே கேட்கிறது (பிற செயலிகளின் மேல் காட்டுதல் மற்றும் அறிவிப்பு அணுகல்), அனைத்தும் உங்கள் சாதனத்திலேயே இயங்கும். ஏதும் பிடிக்கவில்லை என்றால்: 7 நாட்களில் எந்தக் கேள்வியும் இல்லாமல் முழு பணதிருப்பம்.",
 "pricing.step1": "பாதுகாப்பாக பணம் செலுத்துங்கள் — கார்டு, Apple Pay அல்லது Google Pay",
 "pricing.step2": "உரிம விசை + APK பதிவிறக்க இணைப்புடன் உடனடி மின்னஞ்சல்",
 "pricing.step3": "இரண்டு நிமிடங்களில் நிறுவலாம் — root இல்லை, வழிகாட்டி உண்டு",
},
"th": {
 "faq.q10": "ทำไม Trisle จึงไม่อยู่บน Google Play Store?",
 "faq.a10": "คิดง่ายๆ: การขายเองโดยตรงไม่ต้องเสียค่าคอมมิชชัน 30% ของสโตร์ และส่วนต่างนี้เป็นของคุณ — Trisle ยังอยู่ที่ 3.99 ยูโร ขณะที่เวอร์ชันบน Play Store จะต้องมีราคาแพงกว่านี้มาก ด้านความปลอดภัยไม่มีอะไรเปลี่ยนแปลง: APK ลงนามแบบเข้ารหัสเช่นเดียวกับแอปในสโตร์ทุกตัว การชำระเงินและภาษีดูแลโดย Polar.sh ในฐานะ merchant of record อย่างเป็นทางการ และการซื้อทุกครั้งได้รับการรับประกันคืนเงินเต็มจำนวนใน 7 วัน การกระจายผ่านสโตร์แอปอื่นๆ กำลังพิจารณาสำหรับอนาคต",
 "faq.q11": "การชำระเงินและติดตั้ง APK ปลอดภัยหรือไม่?",
 "faq.a11": "ปลอดภัย การชำระเงินผ่าน Polar.sh — merchant of record ในยุโรปที่มีการเข้ารหัส SSL, ใบกำกับภาษีอย่างเป็นทางการ และรองรับบัตร, Apple Pay และ Google Pay; เราไม่เห็นข้อมูลการชำระเงินของคุณเลย APK ของ Trisle ลงนามเหมือนแอปในสโตร์อย่างเป็นทางการทุกตัว ขอสิทธิ์มาตรฐานของ Android เพียง 2 อย่าง (แสดงทับแอปอื่นและการเข้าถึงการแจ้งเตือน) และทุกอย่างทำงานบนอุปกรณ์ของคุณ หากไม่พอใจ: คืนเงินเต็มจำนวนใน 7 วันโดยไม่ต้องถามคำถาม",
 "pricing.step1": "ชำระเงินอย่างปลอดภัย — บัตร, Apple Pay หรือ Google Pay",
 "pricing.step2": "อีเมลทันทีพร้อมคีย์ไลเซนส์ + ลิงก์ดาวน์โหลด APK",
 "pricing.step3": "ติดตั้งในไม่ถึงสองนาที — ไม่ต้อง root มีคู่มือให้",
},
"ur": {
 "faq.q10": "Trisle Google Play Store پر کیوں نہیں ہے؟",
 "faq.a10": "آسان حساب: براہِ راست فروخت کا مطلب ہے اسٹور کے 30% کمیشن سے بچاؤ، اور یہ بچت آپ کی ہے — Trisle 3.99 یورو پر رہتا ہے، جبکہ Play Store ورژن کو کہیں زیادہ مہنگا ہونا پڑے گا۔ سیکیورٹی میں کوئی فرق نہیں: APK کسی بھی اسٹور ایپ کی طرح کرپٹوگرافک طور پر سائن کیا گیا ہے، ادائیگیاں اور ٹیکس Polar.sh بطور سرکاری merchant of record سنبھالتا ہے، اور ہر خریداری 7 دن کی مکمل رقم واپسی کی ضمانت سے محفوظ ہے۔ مستقبل کے لیے دیگر ایپ اسٹورز پر دستیابی پر غور کیا جا رہا ہے۔",
 "faq.q11": "کیا ادائیگی اور APK انسٹال کرنا محفوظ ہے؟",
 "faq.a11": "ہاں۔ ادائیگی Polar.sh کے ذریعے ہوتی ہے — SSL-انکرپٹڈ چیک آؤٹ، سرکاری VAT انوائسز اور کارڈ، Apple Pay اور Google Pay کی سپورٹ کے ساتھ ایک یورپی merchant of record؛ ہم آپ کی ادائیگی کی معلومات کبھی نہیں دیکھتے۔ Trisle APK کسی بھی سرکاری اسٹور ایپ کی طرح سائن کیا گیا ہے، صرف دو معیاری Android اجازتیں مانگتا ہے (دوسرے ایپس کے اوپر دکھانا اور نوٹیفکیشن رسائی)، اور سب کچھ آپ کے ڈیوائس پر چلتا ہے۔ اور اگر کچھ ٹھیک نہ لگے: 7 دن میں بغیر سوالات کے مکمل ریفنڈ۔",
 "pricing.step1": "محفوظ ادائیگی — کارڈ، Apple Pay یا Google Pay",
 "pricing.step2": "لائسنس کی + APK ڈاؤن لوڈ لنک کے ساتھ فوری ای میل",
 "pricing.step3": "دو منٹ سے کم میں انسٹال — روٹ نہیں، گائیڈ شامل",
},
"vi": {
 "faq.q10": "Tại sao Trisle không có trên Google Play Store?",
 "faq.a10": "Tính đơn giản: bán trực tiếp nghĩa là không mất hoa hồng 30% của cửa hàng, và khoản tiết kiệm đó thuộc về bạn — Trisle giữ giá 3,99 €, trong khi bản trên Play Store phải đắt hơn hẳn. Về bảo mật không có gì thay đổi: APK được ký mật mã như mọi ứng dụng cửa hàng, thanh toán và thuế do Polar.sh xử lý với tư cách merchant of record chính thức, và mọi giao dịch đều được bảo đảm hoàn tiền đầy đủ trong 7 ngày. Việc phân phối qua các cửa hàng ứng dụng khác đang được cân nhắc cho tương lai.",
 "faq.q11": "Việc thanh toán và cài đặt APK có an toàn không?",
 "faq.a11": "Có. Thanh toán diễn ra qua Polar.sh — một merchant of record châu Âu với thanh toán mã hóa SSL, hóa đơn VAT chính thức và hỗ trợ thẻ, Apple Pay và Google Pay; chúng tôi không bao giờ nhìn thấy thông tin thanh toán của bạn. APK của Trisle được ký như mọi ứng dụng từ cửa hàng chính thức, chỉ yêu cầu hai quyền Android tiêu chuẩn (hiển thị trên các ứng dụng khác và quyền truy cập thông báo), và mọi thứ chạy ngay trên thiết bị của bạn. Nếu chưa hài lòng: hoàn tiền đầy đủ trong 7 ngày, không hỏi lý do.",
 "pricing.step1": "Thanh toán an toàn — thẻ, Apple Pay hoặc Google Pay",
 "pricing.step2": "Email ngay lập tức với khóa bản quyền + liên kết tải APK",
 "pricing.step3": "Cài đặt dưới hai phút — không root, có hướng dẫn",
},
"id": {
 "faq.q10": "Mengapa Trisle tidak ada di Google Play Store?",
 "faq.a10": "Hitungan sederhana: menjual langsung berarti tanpa komisi 30% milik toko, dan penghematan itu untuk Anda — Trisle tetap 3,99 €, sementara versi Play Store harus dijual jauh lebih mahal. Dari sisi keamanan tidak ada yang berubah: APK ditandatangani secara kriptografis seperti aplikasi toko mana pun, pembayaran dan pajak ditangani Polar.sh sebagai merchant of record resmi, dan setiap pembelian dilindungi jaminan pengembalian dana penuh selama 7 hari. Distribusi melalui toko aplikasi lain sedang dipertimbangkan untuk masa depan.",
 "faq.q11": "Apakah membayar dan memasang APK itu aman?",
 "faq.a11": "Aman. Pembayaran diproses melalui Polar.sh — merchant of record Eropa dengan checkout terenkripsi SSL, faktur PPN resmi, serta dukungan kartu, Apple Pay, dan Google Pay; kami tidak pernah melihat data pembayaran Anda. APK Trisle ditandatangani seperti aplikasi apa pun di toko resmi, hanya meminta dua izin standar Android (tampil di atas aplikasi lain dan akses notifikasi), dan semuanya berjalan di perangkat Anda. Kalau ada yang kurang pas: pengembalian dana penuh dalam 7 hari tanpa pertanyaan.",
 "pricing.step1": "Bayar dengan aman — kartu, Apple Pay, atau Google Pay",
 "pricing.step2": "Email instan berisi kunci lisensi + tautan unduhan APK",
 "pricing.step3": "Terpasang dalam kurang dari dua menit — tanpa root, panduan disertakan",
},
"sw": {
 "faq.q10": "Kwa nini Trisle haipo kwenye Google Play Store?",
 "faq.a10": "Hesabu rahisi: kuuza moja kwa moja kumaanisha hakuna asilimia 30 ya jumla ya duka, na ile yaokoa ni yako — Trisle inabaki kwa €3.99, wakati toleo la Play Store lingelazimika kuwa na bei kubwa zaidi. Kwa upande wa usalama hakuna kilichobadilika: APK imesainiwa kwa utaratibu wa kisasa kama programu yoyote ya duka, malipo na kodi yanashughulikiwa na Polar.sh kama muuzaji rasmi (merchant of record), na kila ununuzi umelindwa na dhamana ya marejesho kamili ya siku 7. Usambazaji kupitia maduka mengine ya programu unapimwa kwa siku zijazo.",
 "faq.q11": "Je, kulipa na kusakinisha APK ni salama?",
 "faq.a11": "Ndiyo. Malipo hupitia Polar.sh — muuzaji rasmi wa Ulaya ambaye ana malipo yaliyosimbwa kwa SSL, ankara za VAT rasmi na msaada wa kadi, Apple Pay na Google Pay; hatuoni kamwe taarifa zako za malipo. APK ya Trisle imesainiwa kama programu yoyote ya duka rasmi, inaomba ruhusa mbili tu za kawaida za Android (kuonekana juu ya programu nyingine na ufikiaji wa taarifa), na kila kitu huenda kwenye kifaa chako. Na ikiwa kitu hakikupendezi: marejesho kamili ndani ya siku 7 bila maswali.",
 "pricing.step1": "Lipa kwa usalama — kadi, Apple Pay au Google Pay",
 "pricing.step2": "Barua pepe ya papo hapo yenye ufunguo wa leseni + kiungo cha kupakua APK",
 "pricing.step3": "Usakinishaji chini ya dakika mbili — hakuna root, mwongozo umejumuishwa",
},
"ja": {
 "faq.q10": "TrisleはGoogle Playストアにないのはなぜですか？",
 "faq.a10": "シンプルな計算です：直接販売することでストアの30%の手数料がかからず、その分をお客様に還元しています — Trisleは3.99ユーロのままですが、Playストア版は明らかに高くなければなりません。セキュリティ面は何も変わりません：APKはストアアプリと同様に暗号署名されており、決済と税務はPolar.shが公式のmerchant of recordとして処理し、購入はすべて7日間の全額返金保証で保護されています。他のアプリストアでの配信も将来検討しています。",
 "faq.q11": "支払いやAPKのインストールは安全ですか？",
 "faq.a11": "はい。支払いはPolar.sh — SSL暗号化されたチェックアウト、正式なVAT請求書、カード・Apple Pay・Google Payに対応するヨーロッパのmerchant of record — を通じて行われ、お客様の決済情報を当社が見ることは一切ありません。TrisleのAPKは公式ストアのアプリと同様に署名されており、標準的なAndroid権限を2つ（他のアプリの上に表示、通知アクセス）だけを要求し、すべて端末上で動作します。万が一気に入らない場合は：7日以内なら理由を問わず全額返金します。",
 "pricing.step1": "安全な支払い — カード、Apple Pay、Google Pay",
 "pricing.step2": "ライセンスキーとAPKのダウンロードリンクを即時メールで送信",
 "pricing.step3": "2分以内にインストール完了 — root不要、ガイド付き",
},
"ko": {
 "faq.q10": "Trisle은 왜 Google Play 스토어에 없나요?",
 "faq.a10": "간단한 계산입니다: 직접 판매하면 스토어의 30% 수수료가 없고 그 절약이 고객에게 돌아갑니다 — Trisle은 3.99유로를 유지하며, Play Store 버전은 상당히 더 비싸야 할 것입니다. 보안은 동일합니다: APK는 스토어 앱과 마찬가지로 암호화 서명되어 있고, 결제와 세금은 Polar.sh가 공식 merchant of record로 처리하며, 모든 구매는 7일 전액 환불 보증으로 보호됩니다. 다른 앱 스토어를 통한 배포도 향후 검토 중입니다.",
 "faq.q11": "결제와 APK 설치가 안전한가요?",
 "faq.a11": "네. 결제는 SSL 암호화 결제, 정식 VAT 인보이스, 카드·Apple Pay·Google Pay를 지원하는 유럽 merchant of record인 Polar.sh를 통해 처리되며, 결제 정보는 당사가 전혀 볼 수 없습니다. Trisle APK는 공식 스토어 앱과 동일하게 서명되어 있고, 표준 Android 권한 두 개(다른 앱 위에 표시, 알림 접근)만 요구하며, 모든 것이 기기에서 실행됩니다. 만약 마음에 들지 않으면: 7일 이내 사유 불문 전액 환불됩니다.",
 "pricing.step1": "안전한 결제 — 카드, Apple Pay, Google Pay",
 "pricing.step2": "라이선스 키 + APK 다운로드 링크를 즉시 이메일로 발송",
 "pricing.step3": "2분 이내 설치 — 루트 불필요, 가이드 포함",
},
"zh": {
 "faq.q10": "为什么 Trisle 不上架 Google Play 商店？",
 "faq.a10": "算一笔简单的账：直接销售意味着没有商店 30% 的抽成，这部分节省直接让利给用户——Trisle 保持在 3.99 欧元，而 Play 商店版本的成本会明显更高。安全性毫无差别：APK 与商店应用一样经过加密签名，支付和税务由 Polar.sh 作为官方商户（merchant of record）处理，每笔购买均享 7 天无理由全额退款。未来也会考虑通过其他应用商店分发。",
 "faq.q11": "付款和安装 APK 安全吗？",
 "faq.a11": "安全。付款通过 Polar.sh 处理——这是一家欧洲官方商户，提供 SSL 加密结账、正式增值税发票，并支持银行卡、Apple Pay 和 Google Pay；我们完全看不到您的支付信息。Trisle 的 APK 与任何官方商店应用一样经过签名，只请求两项标准 Android 权限（显示在其他应用上层和通知访问权限），并且所有功能都在您的设备上运行。如果不符合预期：7 天内无理由全额退款。",
 "pricing.step1": "安全支付 — 银行卡、Apple Pay 或 Google Pay",
 "pricing.step2": "即时邮件发送许可密钥 + APK 下载链接",
 "pricing.step3": "两分钟内完成安装 — 无需 root，附安装指南",
},
}

KEYS = ["faq.q10", "faq.a10", "faq.q11", "faq.a11", "pricing.step1", "pricing.step2", "pricing.step3"]

for code, vals in T.items():
    path = os.path.join(DICT, f"{code}.json")
    with open(path, encoding="utf-8") as f:
        d = json.load(f, object_pairs_hook=collections.OrderedDict)
    missing = [k for k in KEYS if k not in vals]
    if missing:
        print(f"{code}: MISSING TRANSLATION for {missing} — skipped!")
        continue
    for k in KEYS:
        d[k] = vals[k]
    with open(path, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"{code}: +7 keys OK")

print("done")
