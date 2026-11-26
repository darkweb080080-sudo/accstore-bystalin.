/* SAVDO byOXYGEN: static site + Supabase backend. All permissions are enforced by database rules (sql/setup.sql). */
(function(){
"use strict";
var SB_URL = "https://gbofvbpmbzjwhffqkwbc.supabase.co";
var SB_KEY = "sb_publishable_fyUjO56CJqoQfrPnymXskA_-ZhKSiDK";
var sb = window.supabase.createClient(SB_URL, SB_KEY);

/* ---------- i18n ---------- */
var D = {
uz:{vid_l:"Akkaunt videosi (ixtiyoriy, 1 GB gacha)",vid_1g:"Video 1 GB dan oshmasin.",vid_up:"Yuklanmoqda",vid_lim:"Video juda katta: Supabase tarifi ruxsat bermadi. Egaga murojaat qiling.",more:"Yana ko'rsatish",remind:"Hisobga kirsangiz xarid, sotuv va chatdan foydalana olasiz. Hozircha saytni erkin ko'rishingiz mumkin.",mn_edit:"Profilni tahrirlash",mn_sell:"Akkauntni sotish",supercar:"Supercar",fsc:"Supercar soni",gate_t:"Xush kelibsiz",gate_s:"Davom etish uchun hisobingizga kiring",or:"yoki",prov_off:"Bu usul hozircha ulanmagan. E-pochta bilan kiring.",del:"O'chirish",del_q:"E'lon o'chirilsinmi?",att:"Rasm yoki video",vid_big:"Video 30 MB dan oshmasin.",nomsg:"Hali xabar yo'q",nav_profile:"Profil",prof_t:"Profil",prof_name:"Ism",prof_nick:"Nikneym (lotin harf, raqam, _)",prof_pfp:"Rasm (PFP) tanlash",prof_rm:"Rasmni olib tashlash",prof_save:"Saqlash",prof_pw:"Parolni o'zgartirish",prof_newpw:"Yangi parol",nick_taken:"Bu nikneym band.",nick_fmt:"Nik 3-24 belgi: lotin harf, raqam yoki _.",saved:"Saqlandi",saved_btn:"Saqlash",forgot:"Parolni unutdim",reset_t:"Parolni tiklash",reset_msg:"Kod yuborildi:",reset_go:"Parolni yangilash",reset_ok:"Parol yangilandi",reset_link:"Xatdagi kodni kiriting yoki xatdagi havolani bosing.",chek_req:"DIQQAT: to'lov chekini (skrinshot) Telegramda egamizga yuborish MAJBURIY. Chek yuborilmasa, to'lov tasdiqlanmaydi va akkaunt berilmaydi.",chek_chk:"Chekni Telegramda yubordim",chek_need:"Avval chekni yuboring va belgini qo'ying.",exists:"Bu e-pochta oldin ro'yxatdan o'tgan. Kirish bo'limidan kiring.",otp_t:"E-pochtani tasdiqlash",otp_msg:"6 xonali kod yuborildi:",otp_ph:"Tasdiqlash kodi",otp_go:"Tasdiqlash",otp_resend:"Kodni qayta yuborish",otp_bad:"Kod noto'g'ri yoki eskirgan.",otp_sent:"Kod qayta yuborildi.",pw2:"Parolni qayta kiriting",pw_mis:"Parollar mos kelmadi.",chek:"To'lov chekini (skrinshot) egamizga Telegramda yuboring:",chek_btn:"Chekni Telegramga yuborish",tr1:"Pul platformada saqlanadi",tr2:"QR orqali topshirish",tr3:"10 kunlik to'lovlar",tr4:"Tekshirilgan sotuvchilar",nav_market:"Bozor",nav_deals:"Bitimlarim",nav_sell:"Sotuvchi kabineti",nav_chat:"Chat",nav_partner:"Hamkor bo'lish",nav_rent:"Arenda · tez orada",nav_uc:"UC xizmati · tez orada",nav_about:"Biz haqimizda",nav_admin:"Admin paneli",
 login:"Kirish",logout:"Chiqish",signup:"Ro'yxatdan o'tish",email:"E-pochta",password:"Parol (kamida 6 belgi)",name:"Ism",
 soc_report:"Report, takliflar, hamkorlik",soc_chan:"Rasmiy kanal",soc_ig:"Instagram: tez orada",
 h1:"PUBG akkauntlar, tekshirilgan sotuvchilardan",lead:"SAVDO byOXYGEN: PUBG Mobile akkauntlarini xavfsiz sotib olish va sotish uchun ishonchli bozor. To'liq to'lang yoki narxni 10 kunlik to'lovlarga bo'ling. Pul platformada turadi, akkaunt QR kod orqali beriladi.",
 search:"Qidirish",fprice:"Narx, so'mgacha",sort:"Saralash",s_a:"Avval arzonlari",s_d:"Avval qimmatlari",s_l:"Level bo'yicha",empty:"Hozircha akkaunt yo'q. Yangi akkauntlar rasmiy Telegram kanalda e'lon qilinadi.",
 buy:"Sotib olish",lvl:"Level",skins:"Kolleksiya",mythic:"Mythic",full:"To'liq to'lov",inst:"Bo'lib to'lash",term:"Muddat",days:"kun",payn:"ta to'lov, har 10 kunda",total:"Jami",markup:"Ustama",
 verified:"Sotuvchi tekshirilgan",ask:"Sotuvchiga yozish",need_login:"Avval kiring yoki ro'yxatdan o'ting.",own:"Bu sizning e'loningiz.",
 pay_title:"To'lov",pay_card:"Shu kartaga to'lang",pay_note:"To'lovni o'tkazing, izohga bitim raqamini yozing, so'ng 'To'lov qildim' ni bosing. Administrator tasdiqlaydi.",pay_done:"To'lov qildim",copy:"Nusxalash",copied:"Nusxalandi",
 usdt:"USDT bilan to'lash",txid:"Tranzaksiya raqami (TXID)",usdt_send:"USDT yubordim",
 deals_t:"Mening bitimlarim",no_deals:"Hali bitim yo'q.",paid:"To'langan",next:"Keyingi to'lov",pending:"To'lov tekshiruvda",
 rule_t:"Bo'lib to'lash qoidasi",rule:"Muddatgacha to'liq to'lamasangiz, to'langan puldan ijara haqi ushlanadi: 0-10 kunda 15%, 11-30 kunda 25%, 31 kundan keyin 30%. Qolgani qaytariladi. To'lov kuni o'tgach 3 kun kutiladi.",
 gt:"Maqsadlarimiz",g1:"Xaridor puli platformada saqlanadi va akkaunt topshirilgandan keyingina sotuvchiga beriladi.",g2:"Barcha sotuvchi va hamkorlar tekshiriladi.",g3:"Ochiq qoidalar: ustama, ijara haqi va muddatlar oldindan ko'rsatiladi.",g4:"Shikoyat va nizolar tez ko'rib chiqiladi.",
 mt:"Marralarimiz",m1:"Birinchi 10 ta muvaffaqiyatli savdo",m2:"Rasmiy kanalda 1 000 obunachi",m3:"10 ta tekshirilgan hamkor (bloger va gamerlar)",m4:"UC xizmatini ishga tushirish",m5:"Arenda xizmatini ishga tushirish",m6:"Ko'proq til va davlatlarda ishlash",mnote:"Bu rejalar. Raqamlar maqsad, kafolat emas.",
 about_t:"Biz haqimizda",about:"SAVDO byOXYGEN: PUBG Mobile akkauntlarini xavfsiz sotib olish va sotish uchun ishonchli bozor. Rasmiy Telegram kanalimizda faqat yangiliklar, yangi akkauntlar va qoidalardagi o'zgarishlar e'lon qilinadi.",
 soon:"Tez orada",rent_t:"Akkaunt arendasi",rent_d:"Akkauntni soatlik yoki kunlik ijaraga olish: garov bilan, QR orqali kirish, parol berilmaydi. Xizmat tez orada ishga tushadi. Akkauntni ijaraga bermoqchi yoki shu xizmatda ishlamoqchi bo'lsangiz, egamizga yozing.",
 uc_t:"UC xizmati",uc_d:"PUBG Mobile UC sotib olish xizmati tez orada ishga tushadi. Narxlar va usullar rasmiy Telegram kanalimizda e'lon qilinadi.",
 chat_t:"Suhbatlar",support:"Administrator (yordam)",msg_ph:"Xabar yozing",send:"Yuborish",chat_warn:"Faqat shu yerda gaplashing. Parol, QR kod yoki kartani chatda yubormang. To'lov faqat saytdagi kartaga qilinadi.",
 sell_t:"Sotuvchi kabineti",kyc_t:"1. Shaxsni tasdiqlash",kyc_wait:"Hujjatlaringiz tekshirilmoqda. Shu vaqt ichida e'lon qoldirishingiz mumkin, u tasdiqlangach bozorga chiqadi.",kyc_ok:"Shaxsingiz tasdiqlangan.",
 fname:"Ism familiya",floc:"Joylashuv (viloyat, shahar, manzil)",fphone:"Telefon raqam (+998 XX XXX XX XX)",fpass:"Pasport rasmi",consent:"Akkauntni qaytarib olmasligimga roziman. Qaytarib olsam, xaridorning pulini qoplayman va qonun bo'yicha javob beraman.",send_kyc:"Tasdiqlashga yuborish",
 list_t:"2. Akkaunt e'loni",rank:"Rank",fskins:"Kolleksiya soni",fmythic:"Mythic soni",fp:"Narx, so'm (150 000 000 gacha)",fdesc:"Akkaunt haqida",photos:"Rasmlar (15 tagacha)",submit:"E'lonni yuborish",my_list:"Mening e'lonlarim",
 st_tekshiruvda:"tekshiruvda",st_sotuvda:"sotuvda",st_bitimda:"bitimda",st_sotilgan:"sotilgan",st_rad:"rad etildi",
 pt_t:"Hamkor bo'lish",pt_lead:"Blogerlar va gamerlar uchun. O'z kanalingiz (@nik) bilan akkaunt soting, savdodan qolgan foyda sizniki. Ariza yuborasiz, egamiz kanalingizdagi e'lonni va nikni tekshiradi, kirish to'lovidan keyin hamkor qilinasiz.",
 pt_nick:"Nikneym",pt_chan:"Kanal havolasi (https://...)",pt_bio:"Qisqa tavsif",pt_send:"Ariza yuborish",pt_wait:"Arizangiz ko'rib chiqilmoqda.",pt_code:"Kanalingizga arizangiz kodini e'lon qiling: {c}",pt_taken:"Bu nik band yoki juda o'xshash.",pt_is:"Siz tasdiqlangan hamkorsiz",
 pt_ver:"Tasdiqlangan hamkor",pt_open:"Kanalga o'tish",pt_msg:"Hamkorga yozish",pt_none:"Hozircha e'lon yo'q.",pt_nf:"Hamkor topilmadi.",
 ok:"Bajarildi",err:"Xatolik. Qayta urinib ko'ring.",banned:"Hisobingiz bloklangan.",close:"Yopish",rank_all:"Hammasi"},
en:{vid_l:"Account video (optional, up to 1 GB)",vid_1g:"Video must be under 1 GB.",vid_up:"Uploading",vid_lim:"Video too large for the current Supabase plan. Contact the owner.",more:"Show more",remind:"Sign in to buy, sell and chat. For now you can browse freely.",mn_edit:"Edit profile",mn_sell:"Sell an account",supercar:"Supercars",fsc:"Number of supercars",gate_t:"Welcome",gate_s:"Sign in to continue",or:"or",prov_off:"This method is not connected yet. Use email.",del:"Delete",del_q:"Delete this listing?",att:"Photo or video",vid_big:"Video must be under 30 MB.",nomsg:"No messages yet",nav_profile:"Profile",prof_t:"Profile",prof_name:"Name",prof_nick:"Nickname (letters, digits, _)",prof_pfp:"Choose profile picture",prof_rm:"Remove picture",prof_save:"Save",prof_pw:"Change password",prof_newpw:"New password",nick_taken:"This nickname is taken.",nick_fmt:"3-24 characters: letters, digits or _.",saved:"Saved",saved_btn:"Save",forgot:"Forgot password",reset_t:"Reset password",reset_msg:"A code was sent to:",reset_go:"Update password",reset_ok:"Password updated",reset_link:"Enter the code from the email or click the link in the email.",chek_req:"ATTENTION: sending the payment receipt (screenshot) to the owner on Telegram is REQUIRED. Without it the payment will not be confirmed and the account will not be released.",chek_chk:"I sent the receipt on Telegram",chek_need:"Send the receipt first and tick the box.",exists:"This email is already registered. Please sign in.",otp_t:"Verify your email",otp_msg:"A 6-digit code was sent to:",otp_ph:"Verification code",otp_go:"Verify",otp_resend:"Resend code",otp_bad:"Wrong or expired code.",otp_sent:"Code resent.",pw2:"Repeat password",pw_mis:"Passwords do not match.",chek:"Send the payment receipt (screenshot) to the owner on Telegram:",chek_btn:"Send receipt on Telegram",tr1:"Money held by the platform",tr2:"QR handover",tr3:"10-day installments",tr4:"Verified sellers",nav_market:"Market",nav_deals:"My deals",nav_sell:"Seller area",nav_chat:"Chat",nav_partner:"Become a partner",nav_rent:"Rental · coming soon",nav_uc:"UC service · coming soon",nav_about:"About us",nav_admin:"Admin panel",
 login:"Sign in",logout:"Sign out",signup:"Sign up",email:"Email",password:"Password (min 6 chars)",name:"Name",
 soc_report:"Reports, offers, partnership",soc_chan:"Official channel",soc_ig:"Instagram: coming soon",
 h1:"PUBG accounts from verified sellers",lead:"SAVDO byOXYGEN is a trusted marketplace for buying and selling PUBG Mobile accounts safely. Pay in full or split the price into 10-day payments. Money stays on the platform, the account is handed over by QR code.",
 search:"Search",fprice:"Price up to, UZS",sort:"Sort by",s_a:"Cheapest first",s_d:"Most expensive first",s_l:"By level",empty:"No accounts yet. New accounts are announced on the official Telegram channel.",
 buy:"Buy",lvl:"Level",skins:"Collection",mythic:"Mythic",full:"Pay in full",inst:"Installments",term:"Term",days:"days",payn:"payments, every 10 days",total:"Total",markup:"Markup",
 verified:"Verified seller",ask:"Message the seller",need_login:"Please sign in or sign up first.",own:"This is your own listing.",
 pay_title:"Payment",pay_card:"Pay to this card",pay_note:"Send the payment, put the deal number in the comment, then press 'I have paid'. The administrator will confirm.",pay_done:"I have paid",copy:"Copy",copied:"Copied",
 usdt:"Pay with USDT",txid:"Transaction ID (TXID)",usdt_send:"I sent USDT",
 deals_t:"My deals",no_deals:"No deals yet.",paid:"Paid",next:"Next payment",pending:"Payment under review",
 rule_t:"Installment rule",rule:"If you do not pay in full by the deadline, a rental fee is kept from the paid amount: 15% for 0-10 days, 25% for 11-30 days, 30% after 31 days. The rest is refunded. After a missed due date we wait 3 days.",
 gt:"Our goals",g1:"Buyer money is held by the platform and released to the seller only after the account is handed over.",g2:"Every seller and partner is verified.",g3:"Clear rules: markup, rental fee and deadlines are shown up front.",g4:"Complaints and disputes are handled quickly.",
 mt:"Our milestones",m1:"First 10 successful sales",m2:"1,000 subscribers on the official channel",m3:"10 verified partners (streamers and gamers)",m4:"Launch the UC service",m5:"Launch the rental service",m6:"Work in more languages and countries",mnote:"These are plans. Numbers are targets, not guarantees.",
 about_t:"About us",about:"SAVDO byOXYGEN is a trusted marketplace for buying and selling PUBG Mobile accounts safely. Our official Telegram channel posts only news, new accounts and rule changes.",
 soon:"Coming soon",rent_t:"Account rental",rent_d:"Rent an account by the hour or day: with a deposit and QR login, no password shared. The service launches soon. To lend an account or work on this service, message the owner.",
 uc_t:"UC service",uc_d:"The PUBG Mobile UC purchase service launches soon. Prices and methods will be announced on our official Telegram channel.",
 chat_t:"Conversations",support:"Administrator (support)",msg_ph:"Type a message",send:"Send",chat_warn:"Talk only here. Never send passwords, QR codes or cards in chat. Pay only to the card shown on the site.",
 sell_t:"Seller area",kyc_t:"1. Verify your identity",kyc_wait:"Your documents are under review. You can submit a listing meanwhile; it goes live once approved.",kyc_ok:"Your identity is verified.",
 fname:"Full name",floc:"Location (region, city, address)",fphone:"Phone number (+998 XX XXX XX XX)",fpass:"Passport photo",consent:"I agree not to take the account back. If I do, I will refund the buyer and be legally liable.",send_kyc:"Submit for verification",
 list_t:"2. Account listing",rank:"Rank",fskins:"Collection size",fmythic:"Number of mythics",fp:"Price, UZS (up to 150,000,000)",fdesc:"About the account",photos:"Photos (up to 15)",submit:"Submit listing",my_list:"My listings",
 st_tekshiruvda:"under review",st_sotuvda:"on sale",st_bitimda:"in a deal",st_sotilgan:"sold",st_rad:"rejected",
 pt_t:"Become a partner",pt_lead:"For streamers and gamers. Sell accounts under your own channel (@nick) and keep the profit. Send an application; the owner checks your channel post and nick, and you become a partner after the entry fee.",
 pt_nick:"Nickname",pt_chan:"Channel link (https://...)",pt_bio:"Short bio",pt_send:"Send application",pt_wait:"Your application is under review.",pt_code:"Post your application code on your channel: {c}",pt_taken:"This nickname is taken or too similar.",pt_is:"You are a verified partner",
 pt_ver:"Verified partner",pt_open:"Open channel",pt_msg:"Message the partner",pt_none:"No listings yet.",pt_nf:"Partner not found.",
 ok:"Done",err:"Error. Please try again.",banned:"Your account is blocked.",close:"Close",rank_all:"All"},
ru:{vid_l:"Видео аккаунта (необязательно, до 1 ГБ)",vid_1g:"Видео не больше 1 ГБ.",vid_up:"Загрузка",vid_lim:"Видео слишком большое для текущего тарифа Supabase. Свяжитесь с владельцем.",more:"Показать ещё",remind:"Войдите, чтобы покупать, продавать и писать в чат. Пока можно свободно смотреть сайт.",mn_edit:"Редактировать профиль",mn_sell:"Продать аккаунт",supercar:"Суперкары",fsc:"Количество суперкаров",gate_t:"Добро пожаловать",gate_s:"Войдите, чтобы продолжить",or:"или",prov_off:"Этот способ пока не подключён. Войдите по e-mail.",del:"Удалить",del_q:"Удалить объявление?",att:"Фото или видео",vid_big:"Видео не больше 30 МБ.",nomsg:"Сообщений пока нет",nav_profile:"Профиль",prof_t:"Профиль",prof_name:"Имя",prof_nick:"Ник (латиница, цифры, _)",prof_pfp:"Выбрать фото профиля",prof_rm:"Убрать фото",prof_save:"Сохранить",prof_pw:"Сменить пароль",prof_newpw:"Новый пароль",nick_taken:"Этот ник занят.",nick_fmt:"3-24 символа: латиница, цифры или _.",saved:"Сохранено",saved_btn:"Сохранить",forgot:"Забыли пароль",reset_t:"Восстановление пароля",reset_msg:"Код отправлен на:",reset_go:"Обновить пароль",reset_ok:"Пароль обновлён",reset_link:"Введите код из письма или перейдите по ссылке в письме.",chek_req:"ВНИМАНИЕ: отправить чек об оплате (скриншот) владельцу в Telegram ОБЯЗАТЕЛЬНО. Без чека оплата не подтверждается и аккаунт не выдаётся.",chek_chk:"Я отправил чек в Telegram",chek_need:"Сначала отправьте чек и поставьте галочку.",exists:"Этот e-mail уже зарегистрирован. Войдите.",otp_t:"Подтверждение e-mail",otp_msg:"6-значный код отправлен на:",otp_ph:"Код подтверждения",otp_go:"Подтвердить",otp_resend:"Отправить код ещё раз",otp_bad:"Неверный или просроченный код.",otp_sent:"Код отправлен повторно.",pw2:"Повторите пароль",pw_mis:"Пароли не совпадают.",chek:"Отправьте чек об оплате (скриншот) владельцу в Telegram:",chek_btn:"Отправить чек в Telegram",tr1:"Деньги хранятся на платформе",tr2:"Передача по QR",tr3:"Платежи каждые 10 дней",tr4:"Проверенные продавцы",nav_market:"Рынок",nav_deals:"Мои сделки",nav_sell:"Кабинет продавца",nav_chat:"Чат",nav_partner:"Стать партнёром",nav_rent:"Аренда · скоро",nav_uc:"UC · скоро",nav_about:"О нас",nav_admin:"Админ-панель",
 login:"Войти",logout:"Выйти",signup:"Регистрация",email:"E-mail",password:"Пароль (от 6 символов)",name:"Имя",
 soc_report:"Жалобы, предложения, партнёрство",soc_chan:"Официальный канал",soc_ig:"Instagram: скоро",
 h1:"Аккаунты PUBG от проверенных продавцов",lead:"SAVDO byOXYGEN: надёжная площадка для безопасной покупки и продажи аккаунтов PUBG Mobile. Платите сразу или делите цену на платежи каждые 10 дней. Деньги хранятся на платформе, аккаунт передаётся по QR.",
 search:"Поиск",fprice:"Цена до, UZS",sort:"Сортировка",s_a:"Сначала дешёвые",s_d:"Сначала дорогие",s_l:"По уровню",empty:"Аккаунтов пока нет. Новые публикуются в официальном Telegram-канале.",
 buy:"Купить",lvl:"Уровень",skins:"Коллекция",mythic:"Mythic",full:"Оплата сразу",inst:"Рассрочка",term:"Срок",days:"дней",payn:"платежей, каждые 10 дней",total:"Итого",markup:"Наценка",
 verified:"Проверенный продавец",ask:"Написать продавцу",need_login:"Сначала войдите или зарегистрируйтесь.",own:"Это ваше объявление.",
 pay_title:"Оплата",pay_card:"Оплата на эту карту",pay_note:"Переведите оплату, укажите номер сделки в комментарии и нажмите «Я оплатил». Администратор подтвердит.",pay_done:"Я оплатил",copy:"Копировать",copied:"Скопировано",
 usdt:"Оплата USDT",txid:"ID транзакции (TXID)",usdt_send:"Я отправил USDT",
 deals_t:"Мои сделки",no_deals:"Сделок пока нет.",paid:"Оплачено",next:"Следующий платёж",pending:"Платёж на проверке",
 rule_t:"Правило рассрочки",rule:"Если не оплатите полностью к сроку, из оплаченной суммы удерживается плата за аренду: 15% за 0-10 дней, 25% за 11-30 дней, 30% после 31 дня. Остаток возвращается.",
 gt:"Наши цели",g1:"Деньги покупателя хранятся на платформе и передаются продавцу только после передачи аккаунта.",g2:"Все продавцы и партнёры проходят проверку.",g3:"Открытые правила: наценка, плата за аренду и сроки видны заранее.",g4:"Жалобы и споры рассматриваются быстро.",
 mt:"Наши рубежи",m1:"Первые 10 успешных сделок",m2:"1 000 подписчиков в официальном канале",m3:"10 проверенных партнёров",m4:"Запуск сервиса UC",m5:"Запуск сервиса аренды",m6:"Работа на большем числе языков и стран",mnote:"Это планы. Цифры: цели, а не гарантии.",
 about_t:"О нас",about:"SAVDO byOXYGEN: надёжная площадка для безопасной покупки и продажи аккаунтов PUBG Mobile. В официальном Telegram-канале публикуются только новости, новые аккаунты и изменения правил.",
 soon:"Скоро",rent_t:"Аренда аккаунтов",rent_d:"Аренда аккаунта на часы или дни: с залогом и входом по QR, пароль не передаётся. Сервис скоро запустится. Чтобы сдать аккаунт или работать в этом направлении, напишите владельцу.",
 uc_t:"Сервис UC",uc_d:"Сервис покупки UC для PUBG Mobile скоро запустится. Цены и способы оплаты объявим в официальном Telegram-канале.",
 chat_t:"Диалоги",support:"Администратор (поддержка)",msg_ph:"Напишите сообщение",send:"Отправить",chat_warn:"Общайтесь только здесь. Не отправляйте пароли, QR-коды и карты в чате.",
 sell_t:"Кабинет продавца",kyc_t:"1. Подтверждение личности",kyc_wait:"Документы на проверке. Пока можно подать объявление, оно появится после одобрения.",kyc_ok:"Личность подтверждена.",
 fname:"Имя и фамилия",floc:"Местоположение",fphone:"Телефон (+998 XX XXX XX XX)",fpass:"Фото паспорта",consent:"Согласен не забирать аккаунт обратно. Иначе возмещу деньги покупателя и отвечу по закону.",send_kyc:"Отправить на проверку",
 list_t:"2. Объявление",rank:"Ранг",fskins:"Размер коллекции",fmythic:"Количество mythic",fp:"Цена, UZS (до 150 000 000)",fdesc:"Об аккаунте",photos:"Фото (до 15)",submit:"Отправить объявление",my_list:"Мои объявления",
 st_tekshiruvda:"на проверке",st_sotuvda:"в продаже",st_bitimda:"в сделке",st_sotilgan:"продан",st_rad:"отклонён",
 pt_t:"Стать партнёром",pt_lead:"Для блогеров и геймеров. Продавайте аккаунты под своим каналом (@ник) и оставляйте прибыль себе.",
 pt_nick:"Ник",pt_chan:"Ссылка на канал (https://...)",pt_bio:"Коротко о себе",pt_send:"Отправить заявку",pt_wait:"Заявка на рассмотрении.",pt_code:"Опубликуйте код заявки на канале: {c}",pt_taken:"Ник занят или слишком похож.",pt_is:"Вы подтверждённый партнёр",
 pt_ver:"Проверенный партнёр",pt_open:"Открыть канал",pt_msg:"Написать партнёру",pt_none:"Объявлений пока нет.",pt_nf:"Партнёр не найден.",
 ok:"Готово",err:"Ошибка. Попробуйте ещё раз.",banned:"Ваш аккаунт заблокирован.",close:"Закрыть",rank_all:"Все"},
tr:{vid_l:"Hesap videosu (isteğe bağlı, en fazla 1 GB)",vid_1g:"Video en fazla 1 GB.",vid_up:"Yükleniyor",vid_lim:"Video mevcut Supabase planı için çok büyük. Sahibiyle iletişime geçin.",more:"Daha fazla",remind:"Satın almak, satmak ve sohbet için giriş yapın. Şimdilik siteyi serbestçe gezebilirsiniz.",mn_edit:"Profili düzenle",mn_sell:"Hesap sat",supercar:"Süper araba",fsc:"Süper araba sayısı",gate_t:"Hoş geldiniz",gate_s:"Devam etmek için giriş yapın",or:"veya",prov_off:"Bu yöntem henüz bağlı değil. E-posta ile girin.",del:"Sil",del_q:"İlan silinsin mi?",att:"Foto veya video",vid_big:"Video en fazla 30 MB.",nomsg:"Henüz mesaj yok",nav_profile:"Profil",prof_t:"Profil",prof_name:"Ad",prof_nick:"Takma ad (harf, rakam, _)",prof_pfp:"Profil resmi seç",prof_rm:"Resmi kaldır",prof_save:"Kaydet",prof_pw:"Şifre değiştir",prof_newpw:"Yeni şifre",nick_taken:"Bu takma ad alınmış.",saved:"Kaydedildi",saved_btn:"Kaydet",forgot:"Şifremi unuttum",reset_t:"Şifre sıfırlama",reset_msg:"Kod gönderildi:",reset_go:"Şifreyi güncelle",reset_ok:"Şifre güncellendi",chek_req:"DİKKAT: ödeme dekontunu (ekran görüntüsü) Telegram'dan sahibe göndermek ZORUNLUDUR. Dekont olmadan ödeme onaylanmaz.",chek_chk:"Dekontu Telegram'dan gönderdim",exists:"Bu e-posta zaten kayıtlı. Giriş yapın.",otp_t:"E-posta doğrulama",otp_msg:"6 haneli kod gönderildi:",otp_ph:"Doğrulama kodu",otp_go:"Doğrula",otp_resend:"Kodu tekrar gönder",otp_bad:"Kod yanlış veya süresi doldu.",otp_sent:"Kod tekrar gönderildi.",pw2:"Şifreyi tekrarlayın",pw_mis:"Şifreler eşleşmiyor.",chek:"Ödeme dekontunu (ekran görüntüsü) Telegram'dan sahibe gönderin:",chek_btn:"Dekontu Telegram'dan gönder",tr1:"Para platformda bekler",tr2:"QR ile teslim",tr3:"10 günlük taksit",tr4:"Doğrulanmış satıcılar",nav_market:"Pazar",nav_deals:"Anlaşmalarım",nav_sell:"Satıcı paneli",nav_chat:"Sohbet",nav_partner:"Ortak ol",nav_rent:"Kiralama · yakında",nav_uc:"UC hizmeti · yakında",nav_about:"Hakkımızda",nav_admin:"Yönetim paneli",
 login:"Giriş",logout:"Çıkış",signup:"Kayıt ol",email:"E-posta",password:"Şifre (en az 6 karakter)",name:"Ad",
 soc_report:"Şikayet, öneri, ortaklık",soc_chan:"Resmi kanal",soc_ig:"Instagram: yakında",
 h1:"Doğrulanmış satıcılardan PUBG hesapları",lead:"SAVDO byOXYGEN: PUBG Mobile hesaplarını güvenle alıp satmak için güvenilir pazar. Peşin ödeyin veya fiyatı 10 günlük taksitlere bölün. Para platformda bekler, hesap QR ile teslim edilir.",
 search:"Ara",fprice:"Fiyat üst sınırı, UZS",sort:"Sırala",s_a:"Önce ucuzlar",s_d:"Önce pahalılar",s_l:"Seviyeye göre",empty:"Henüz hesap yok. Yeni hesaplar resmi Telegram kanalında duyurulur.",
 buy:"Satın al",lvl:"Seviye",skins:"Koleksiyon",mythic:"Mythic",full:"Peşin ödeme",inst:"Taksit",term:"Süre",days:"gün",payn:"ödeme, her 10 günde",total:"Toplam",markup:"Ek ücret",
 verified:"Doğrulanmış satıcı",ask:"Satıcıya yaz",need_login:"Önce giriş yapın veya kayıt olun.",own:"Bu sizin ilanınız.",
 pay_title:"Ödeme",pay_card:"Bu karta ödeyin",pay_note:"Ödemeyi gönderin, açıklamaya anlaşma numarasını yazın, 'Ödedim'e basın. Yönetici onaylayacak.",pay_done:"Ödedim",copy:"Kopyala",copied:"Kopyalandı",
 gt:"Hedeflerimiz",g1:"Alıcının parası platformda tutulur, hesap teslim edildikten sonra satıcıya ödenir.",g2:"Tüm satıcılar ve ortaklar doğrulanır.",g3:"Açık kurallar: ek ücret, kira bedeli ve süreler baştan görünür.",g4:"Şikayet ve anlaşmazlıklar hızla incelenir.",
 mt:"Kilometre taşlarımız",m1:"İlk 10 başarılı satış",m2:"Resmi kanalda 1.000 abone",m3:"10 doğrulanmış ortak",m4:"UC hizmetini başlatmak",m5:"Kiralama hizmetini başlatmak",m6:"Daha fazla dilde ve ülkede çalışmak",mnote:"Bunlar planlardır. Rakamlar hedeftir, garanti değil.",
 about_t:"Hakkımızda",about:"SAVDO byOXYGEN: PUBG Mobile hesaplarını güvenle alıp satmak için güvenilir pazar. Resmi Telegram kanalımızda yalnızca haberler, yeni hesaplar ve kural değişiklikleri paylaşılır.",
 soon:"Yakında",rent_t:"Hesap kiralama",rent_d:"Hesabı saatlik veya günlük kiralayın. Hizmet yakında başlıyor. Sahibe yazın.",uc_t:"UC hizmeti",uc_d:"PUBG Mobile UC satın alma hizmeti yakında başlıyor. Fiyatlar resmi Telegram kanalımızda duyurulacak.",
 chat_t:"Sohbetler",support:"Yönetici (destek)",msg_ph:"Mesaj yazın",send:"Gönder",ok:"Tamam",close:"Kapat",rank_all:"Hepsi",deals_t:"Anlaşmalarım",sell_t:"Satıcı paneli",pt_t:"Ortak ol"}
};
var LG = "uz";
try{ var sl = localStorage.getItem("lg"); if(sl && D[sl]) LG = sl; }catch(e){}
function t(k,p){ var s = (D[LG] && D[LG][k]) || D.en[k] || D.uz[k] || k, x; if(p) for(x in p) s = s.split("{"+x+"}").join(p[x]); return s; }

/* ---------- helpers ---------- */
var $ = function(i){ return document.getElementById(i); };
function h(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
function fmt(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g," "); }
var ST = {rate:12500,markup:20,cards:[],usdt:"",net:"TRC20"};
function usd(n){ var v = n/(ST.rate||12500); return "$"+(v>=100?fmt(v):v.toFixed(2)); }
function pmap(v){ var x = 300000*Math.pow(150e6/300000,v/1000), st = x<1e6?1e4:x<1e7?1e5:1e6; return Math.min(150e6,Math.round(x/st)*st); }
function toast(m){ var e = $("toast"); e.textContent = m; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(function(){ e.hidden = true; },3500); }
function errMsg(e){ var m = (e && (e.message||e.error_description)) || ""; var map = {login_required:t("need_login"),banned:t("banned"),own_account:t("own"),not_available:"Bu akkaunt endi sotuvda emas.",payment_pending:t("pending"),dup_txid:"Bu TXID oldin ishlatilgan.",bad_txid:"TXID noto'g'ri.",forbidden:"Ruxsat yo'q.",deal_closed:"Bitim yopilgan."}; return map[m] || m || t("err"); }
function ago(d){ return Math.floor((Date.now()-new Date(d).getTime())/86400000); }
function openDlg(html){ $("dbody").innerHTML = html; if(!$("dlg").open) $("dlg").showModal(); }
function closeDlg(){ if($("dlg").open) $("dlg").close(); }
var RANKS = ["Crown","Ace","Ace Master","Ace Dominator","Conqueror","Diamond","Platinum","Gold"];
function norm(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]/g,""); }
function lev(a,b){ var m=[],i,j; for(i=0;i<=a.length;i++) m[i]=[i]; for(j=1;j<=b.length;j++) m[0][j]=j; for(i=1;i<=a.length;i++) for(j=1;j<=b.length;j++) m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; }

/* ---------- state ---------- */
var ME = null, SESS = null, PT = {}, NAMES = {};
function isStaff(){ return !!(ME && !ME.banned && (ME.role==="owner"||ME.role==="admin")); }
function isOwner(){ return !!(ME && ME.role==="owner"); }
function perm(p){ return !!(ME && !ME.banned && (ME.role==="owner" || (ME.role==="admin" && ME.perms && ME.perms[p]))); }
async function logA(x){ try{ await sb.rpc("add_log",{t:x}); }catch(e){} }
async function loadSettings(){ var r = await sb.from("settings").select("*").eq("id",1).maybeSingle(); if(r.data) ST = Object.assign(ST,r.data); }
async function loadPartners(){ var r = await sb.from("partners").select("*"); PT = {}; (r.data||[]).forEach(function(p){ PT[p.id] = p; }); }
async function loadMe(){
  var s = await sb.auth.getSession(); SESS = s.data.session;
  if(!SESS){ ME = null; return; }
  var r = await sb.from("profiles").select("*").eq("id",SESS.user.id).maybeSingle();
  ME = r.data || null;
}
var AVT = {};
async function names(ids){
  var need = ids.filter(function(i){ return i && !NAMES[i]; });
  if(!need.length) return;
  var r = await sb.from("public_names").select("id,name,nick,avatar").in("id",need);
  if(r.error) r = await sb.from("public_names").select("id,name").in("id",need);
  (r.data||[]).forEach(function(x){ NAMES[x.id] = x.nick || x.name || "?"; if(x.avatar) AVT[x.id] = x.avatar; });
}
function num(x){ return '<span class="num">'+h(x)+'</span>'; }
function canDel(){ return perm('ads')||perm('ban')||isOwner(); }
function nm(id){ return NAMES[id] || String(id||"").slice(0,6); }
function av(id,sz){ var u = AVT[id]; sz = sz||22; return u ? '<img alt="" src="'+h(u)+'" style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:6px">' : ""; }

/* ---------- routing ---------- */
var GM = "in", route = "market", arg = null, poll = null;
function parse(){
  var hs = location.hash.replace(/^#\/?/,"");
  if(hs.charAt(0)==="@"){ route = "kanal"; arg = hs.slice(1); return; }
  var p = hs.split("/"); route = p[0] || "market"; arg = p[1] || null;
}
function initial(){ var s = (ME && (ME.nick||ME.name)) || (SESS && SESS.user.email) || "?"; return String(s).charAt(0).toUpperCase(); }
function nav(){
  var gated = false;
  document.body.classList.toggle("gated",gated);
  var items = [["market","nav_market"],["sell","nav_sell"],["chat","nav_chat"],["rent","nav_rent"],["uc","nav_uc"]];
  var o = gated ? "" : items.map(function(i){ return '<a href="#/'+(i[0]==="market"?"":i[0])+'" class="'+(route===i[0]?"on":"")+'">'+t(i[1])+'</a>'; }).join("");
  if(isStaff()) o += '<a href="#/admin" class="'+(route==="admin"?"on":"")+'">'+t("nav_admin")+(isOwner()?" · EGA":"")+'</a>';
  $("nav").innerHTML = o;
  $("soc").innerHTML = gated ? "" : '<a class="btn sm" target="_blank" rel="noopener" href="https://t.me/owner_accSTORE">'+t("soc_report")+'</a> <a class="btn sm" target="_blank" rel="noopener" href="https://t.me/STOREe_ACC">'+t("soc_chan")+'</a> <a class="btn sm" target="_blank" rel="noopener" href="https://www.youtube.com/@oxygenpubgmobileGG">YouTube</a> <span class="soon">'+t("soc_ig")+'</span>';
  var ab = $("authBtn"); ab.hidden = false; ab.className = SESS ? "avc" : "btn sm p"; ab.setAttribute("data-act",SESS?"mtoggle":"auth"); ab.setAttribute("data-id","in");
  ab.innerHTML = !SESS ? h(t("login")) : (ME&&ME.avatar ? '<img alt="" src="'+h(ME.avatar)+'">' : '<span>'+h(initial())+'</span>');
  var m = $("umenu"); if(!m){ m = document.createElement("div"); m.id = "umenu"; m.className = "umenu"; m.hidden = true; document.body.appendChild(m); }
  var L = function(href,k,ic){ return '<a href="#/'+href+'" class="mi"><i>'+ic+'</i>'+t(k)+'</a>'; };
  m.innerHTML = SESS ? '<div class="mh">'+(ME&&ME.avatar?'<img alt="" src="'+h(ME.avatar)+'">':'<b>'+h(initial())+'</b>')+'<div><strong>'+h((ME&&(ME.nick||ME.name))||"")+'</strong><small>'+h((ME&&ME.email)||"")+'</small></div></div>'+
    L("profile","mn_edit","✎")+L("sell","mn_sell","＄")+L("chat","nav_chat","✉")+L("deals","nav_deals","❖")+L("partner","nav_partner","★")+L("about","nav_about","ⓘ")+
    '<button type="button" class="mi out" data-act="logout"><i>⎋</i>'+t("logout")+'</button>' : "";
  if(gated) m.hidden = true;
  Array.prototype.forEach.call(document.querySelectorAll("#lang button[data-l]"),function(b){ b.style.opacity = b.getAttribute("data-l")===LG?1:.6; });
}
async function render(){
  parse(); clearInterval(poll); nav();
  var v = $("view");
  var rb = $("remind"); if(rb) rb.remove();
  if(!SESS && !sessionStorage.getItem("rmd")){ var d = document.createElement("div"); d.id = "remind"; d.className = "remind"; d.innerHTML = '<span>'+t("remind")+'</span> <button class="btn sm p" type="button" data-act="auth" data-id="in">'+t("login")+'</button> <button class="btn sm" type="button" data-act="rmx">✕</button>'; v.parentNode.insertBefore(d,v); }
  try{
    if(route==="market") await vMarket(v);
    else if(route==="deals") await vDeals(v);
    else if(route==="sell") await vSell(v);
    else if(route==="chat") await vChat(v);
    else if(route==="profile") await vProfile(v);
    else if(route==="partner") await vPartner(v);
    else if(route==="kanal") await vKanal(v);
    else if(route==="admin") await vAdmin(v);
    else if(route==="rent") v.innerHTML = '<span class="chip warn">'+t("soon")+'</span><h2>'+t("rent_t")+'</h2><p class="lead">'+t("rent_d")+'</p><a class="btn p" target="_blank" rel="noopener" href="https://t.me/owner_accSTORE">Telegram</a>';
    else if(route==="uc") v.innerHTML = '<span class="chip warn">'+t("soon")+'</span><h2>'+t("uc_t")+'</h2><p class="lead">'+t("uc_d")+'</p><a class="btn p" target="_blank" rel="noopener" href="https://t.me/STOREe_ACC">Telegram</a>';
    else if(route==="about") vAbout(v);
    else await vMarket(v);
  }catch(e){ v.innerHTML = '<p class="err">'+h(errMsg(e))+'</p>'; }
}
function vAbout(v){
  var li = function(a){ return "<ul>"+a.map(function(k){ return "<li>"+t(k)+"</li>"; }).join("")+"</ul>"; };
  v.innerHTML = '<h2>'+t("about_t")+'</h2><p class="lead">'+t("about")+'</p><h2>'+t("gt")+'</h2>'+li(["g1","g2","g3","g4"])+'<h2>'+t("mt")+'</h2>'+li(["m1","m2","m3","m4","m5","m6"])+'<p class="note">'+t("mnote")+'</p>';
}

/* ---------- auth ---------- */
function newPwDlg(){
  openDlg('<h3>'+t("reset_t")+'</h3><form id="nf" class="fl" style="grid-template-columns:1fr"><label><span>'+t("prof_newpw")+'</span><input id="n1" type="password" minlength="6" required autocomplete="new-password"></label><label><span>'+t("pw2")+'</span><input id="n2" type="password" minlength="6" required autocomplete="new-password"></label><p class="err" id="nerr"></p><button class="btn p" type="submit">'+t("saved_btn")+'</button></form>');
  $("nf").addEventListener("submit",async function(e){ e.preventDefault(); if($("n1").value!==$("n2").value){ $("nerr").textContent = t("pw_mis"); return; } var r = await sb.auth.updateUser({password:$("n1").value}); if(r.error){ $("nerr").textContent = r.error.message; return; } closeDlg(); toast(t("reset_ok")); await afterAuth(false); });
}
function resetDlg(em){
  openDlg('<h3>'+t("reset_t")+'</h3><p>'+t("reset_msg")+' <b>'+h(em)+'</b></p><form id="rf" class="fl" style="grid-template-columns:1fr"><label><span>'+t("otp_ph")+'</span><input id="rc" inputmode="numeric" maxlength="10" autocomplete="one-time-code"></label><label><span>'+t("prof_newpw")+'</span><input id="r1" type="password" minlength="6" autocomplete="new-password"></label><label><span>'+t("pw2")+'</span><input id="r2" type="password" minlength="6" autocomplete="new-password"></label><p class="err" id="rerr"></p><button class="btn p" type="submit">'+t("reset_go")+'</button></form>');
  $("rf").addEventListener("submit",async function(e){
    e.preventDefault(); var er = $("rerr");
    if(!$("rc").value.trim()){ er.textContent = t("reset_link"); return; }
    if($("r1").value!==$("r2").value){ er.textContent = t("pw_mis"); return; }
    var v = await sb.auth.verifyOtp({email:em,token:$("rc").value.trim(),type:"recovery"}); if(v.error){ er.textContent = t("otp_bad"); return; }
    var u = await sb.auth.updateUser({password:$("r1").value}); if(u.error){ er.textContent = u.error.message; return; }
    closeDlg(); toast(t("reset_ok")); await afterAuth(false);
  });
}
function otpDlg(em){
  openDlg('<h3>'+t("otp_t")+'</h3><p>'+t("otp_msg")+' <b>'+h(em)+'</b></p><form id="of" class="fl" style="grid-template-columns:1fr"><label><span>'+t("otp_ph")+'</span><input id="oc" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6,10}" maxlength="10" required></label><p class="err" id="oerr"></p><button class="btn p" type="submit">'+t("otp_go")+'</button></form><p class="note"><a href="#" id="ors">'+t("otp_resend")+'</a></p>');
  $("of").addEventListener("submit",async function(e){
    e.preventDefault(); var r = await sb.auth.verifyOtp({email:em,token:$("oc").value.trim(),type:"signup"});
    if(r.error){ $("oerr").textContent = t("otp_bad"); return; } closeDlg(); await afterAuth(true);
  });
  $("ors").addEventListener("click",async function(e){ e.preventDefault(); var r = await sb.auth.resend({type:"signup",email:em}); $("oerr").textContent = r.error ? r.error.message : t("otp_sent"); });
}
var AUTHCFG = null;
async function authCfg(){
  if(AUTHCFG) return AUTHCFG;
  try{ var r = await fetch(SB_URL+"/auth/v1/settings",{headers:{apikey:SB_KEY}}); AUTHCFG = await r.json(); }catch(e){ AUTHCFG = {}; }
  return AUTHCFG;
}
var ICO = {
  google:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.56-5.17 3.56-8.81z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.7-3.78H1.35v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.36 14.31a7.2 7.2 0 0 1 0-4.62V6.59H1.35a12 12 0 0 0 0 10.82z"/><path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.35 6.59l4.01 3.1A7.2 7.2 0 0 1 12 4.77z"/></svg>',
  facebook:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12z"/></svg>',
  apple:'<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M16.37 12.6c0-2.5 2.05-3.7 2.14-3.76-1.17-1.7-2.98-1.94-3.63-1.97-1.54-.16-3.01.91-3.79.91-.79 0-1.99-.89-3.27-.86-1.68.02-3.23.98-4.1 2.48-1.75 3.04-.45 7.52 1.26 9.98.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.73-.81 3.25-.81 1.51 0 1.95.81 3.27.79 1.35-.02 2.2-1.22 3.03-2.43a10.8 10.8 0 0 0 1.37-2.8c-.03-.01-2.63-1.01-2.65-4.03zM13.9 5.2c.69-.84 1.16-2 1.03-3.16-1 .04-2.2.66-2.92 1.5-.64.74-1.2 1.93-1.05 3.06 1.11.09 2.24-.57 2.94-1.4z"/></svg>'
};
function authHTML(mode){
  return '<form id="af" class="fl" style="grid-template-columns:1fr">'+
    (mode==="up"?'<label><span>'+t("name")+'</span><input id="an" required maxlength="40"></label>':'')+
    '<label><span>'+t("email")+'</span><input id="ae" type="email" required autocomplete="email"></label>'+
    '<label><span>'+t("password")+'</span><input id="ap" type="password" minlength="6" required autocomplete="'+(mode==="up"?"new-password":"current-password")+'"></label>'+
    (mode==="up"?'<label><span>'+t("pw2")+'</span><input id="ap2" type="password" minlength="6" required autocomplete="new-password"></label>':'')+
    '<p class="err" id="aerr"></p><button class="btn p wide" type="submit">'+(mode==="up"?t("signup"):t("login"))+'</button></form>'+
    '<div class="or"><span>'+t("or")+'</span></div><div class="prov"><button class="btn" type="button" data-act="oauth" data-id="google">'+ICO.google+' Google</button><button class="btn" type="button" data-act="oauth" data-id="facebook">'+ICO.facebook+' Facebook</button><button class="btn" type="button" data-act="oauth" data-id="apple">'+ICO.apple+' iCloud</button></div>'+
    '<p class="note c"><a href="#" data-act="auth-sw" data-id="'+(mode==="up"?"in":"up")+'">'+(mode==="up"?t("login"):t("signup"))+'</a>'+(mode==="in"?' · <a href="#" data-act="forgot">'+t("forgot")+'</a>':"")+'</p>';
}
function authBind(mode){
  $("af").addEventListener("submit",async function(e){
    e.preventDefault();
    var em = $("ae").value.trim(), pw = $("ap").value, r;
    if(mode==="up" && pw!==$("ap2").value){ $("aerr").textContent = t("pw_mis"); return; }
    if(mode==="up") r = await sb.auth.signUp({email:em,password:pw,options:{data:{name:$("an").value.trim()}}});
    else r = await sb.auth.signInWithPassword({email:em,password:pw});
    if(r.error){ $("aerr").textContent = r.error.message; return; }
    if(mode==="up" && r.data.user && r.data.user.identities && r.data.user.identities.length===0){ $("aerr").textContent = t("exists"); return; }
    if(mode==="up" && !r.data.session){ otpDlg(em); return; }
    closeDlg(); await afterAuth(true);
  });
}
function authDlg(mode){
  GM = mode; if(!SESS && $("gate")){ vGate($("view"),mode); return; }
  openDlg('<h3>'+(mode==="up"?t("signup"):t("login"))+'</h3>'+authHTML(mode)); authBind(mode);
}
function vGate(v,mode){
  GM = mode;
  v.innerHTML = '<div class="gatew" id="gate"><div class="gatec"><div class="gl">SAVDO <b>by</b> OXYGEN</div><h2>'+(mode==="up"?t("signup"):t("gate_t"))+'</h2><p class="note c">'+t("gate_s")+'</p>'+authHTML(mode)+'</div></div>';
  authBind(mode);
}
async function afterAuth(fresh){
  await loadMe(); closeDlg(); nav();
  if(fresh && isOwner()){ location.hash = "#/admin"; } else render();
}
sb.auth.onAuthStateChange(function(ev){ if(ev==="PASSWORD_RECOVERY"){ setTimeout(newPwDlg,0); return; } if(ev==="SIGNED_OUT"){ ME = null; SESS = null; render(); } else if(ev==="SIGNED_IN" && !SESS){ setTimeout(function(){ afterAuth(true); },0); } });

/* ---------- market ---------- */
var MK = {q:"",rk:"",pr:1000,so:"a",n:12}, ACCS = [];
function accCard(a){
  var ph = a.photos||[], p0 = ph[0] ? '<img class="ph" id="ph-'+h(a.id)+'" loading="lazy" alt="PUBG akkaunt '+h(a.id)+'" src="'+h(ph[0])+'">' : "";
  var gal = ph.length>1 ? '<div class="gal">'+ph.slice(0,5).map(function(u){ return '<img loading="lazy" decoding="async" alt="" data-act="gal" data-id="'+h(a.id)+'" data-u="'+h(u)+'" src="'+h(u)+'">'; }).join("")+'</div>' : "";
  var pt = PT[a.seller_id] ? '<p><a href="#@'+h(PT[a.seller_id].nick)+'">@'+h(PT[a.seller_id].nick)+'</a> <span class="chip ok">'+t("pt_ver")+'</span></p>' : '<p class="note">'+av(a.seller_id)+(NAMES[a.seller_id]?h(NAMES[a.seller_id])+" · ":"")+t("verified")+'</p>';
  return '<div class="card">'+p0+gal+(a.video?'<video class="avd" controls preload="none" playsinline src="'+h(a.video)+'"></video>':"")+'<div class="chips"><span class="chip">'+h(a.id)+'</span><span class="chip">'+h(a.rank)+'</span>'+(a.top?'<span class="chip warn">TOP</span>':"")+'</div>'+
    '<p class="spec">'+t("lvl")+' '+num(a.level)+' · '+t("skins")+' '+num(a.skins)+' · '+t("mythic")+' '+num(a.mythic)+' · '+t("supercar")+' '+num(a.supercars||0)+'</p>'+(a.description?'<p>'+h(a.description)+'</p>':"")+pt+
    '<div class="price num">'+fmt(a.price)+' <span class="usd">≈ '+usd(a.price)+'</span></div>'+
    '<div class="row"><button class="btn p" type="button" data-act="buy" data-id="'+h(a.id)+'">'+t("buy")+'</button> <button class="btn" type="button" data-act="ask" data-id="'+h(a.id)+'">'+t("ask")+'</button>'+(canDel()?' <button class="btn bad" type="button" data-act="adel" data-id="'+h(a.id)+'">'+t("del")+'</button>':"")+'</div></div>';
}
function drawMarket(){
  var mx = pmap(MK.pr); $("prv").textContent = fmt(mx)+" ≈ "+usd(mx);
  var q = MK.q.trim().toLowerCase();
  var L = ACCS.filter(function(a){ return (!q || a.id.toLowerCase().indexOf(q)>=0) && (!MK.rk || a.rank===MK.rk) && a.price<=mx; });
  L.sort(function(a,b){ return (b.top?1:0)-(a.top?1:0) || (MK.so==="a"?a.price-b.price:MK.so==="d"?b.price-a.price:b.level-a.level); });
  $("list").innerHTML = L.slice(0,MK.n).map(accCard).join("")+(L.length>MK.n?'<div style="grid-column:1/-1;text-align:center"><button class="btn p" type="button" data-act="more">'+t("more")+" ("+(L.length-MK.n)+")</button></div>":"");
  $("empty").hidden = L.length>0;
}
async function vMarket(v){
  v.innerHTML = '<section class="hero"><h1>'+t("h1")+'</h1><p class="lead">'+t("lead")+'</p><div class="trust"><span><i></i>'+t("tr1")+'</span><span><i></i>'+t("tr2")+'</span><span><i></i>'+t("tr3")+'</span><span><i></i>'+t("tr4")+'</span></div></section>'+
   '<div class="fl"><label><span>'+t("search")+'</span><input id="mq" value="'+h(MK.q)+'" placeholder="A-1001"></label>'+
   '<label><span>Rank</span><select id="mr"><option value="">'+t("rank_all")+'</option>'+RANKS.map(function(r){ return '<option'+(MK.rk===r?" selected":"")+'>'+r+'</option>'; }).join("")+'</select></label>'+
   '<label><span>'+t("fprice")+'</span><input id="mp" type="range" min="0" max="1000" value="'+MK.pr+'"><b id="prv"></b></label>'+
   '<label><span>'+t("sort")+'</span><select id="ms"><option value="a">'+t("s_a")+'</option><option value="d"'+(MK.so==="d"?" selected":"")+'>'+t("s_d")+'</option><option value="l"'+(MK.so==="l"?" selected":"")+'>'+t("s_l")+'</option></select></label></div>'+
   '<div class="grid" id="list"><div class="sk"></div><div class="sk"></div><div class="sk"></div></div><p class="note" id="empty" hidden>'+t("empty")+'</p>'+
   '<h2>'+t("rule_t")+'</h2><p class="lead" style="font-size:16px">'+t("rule")+'</p>';
  $("mq").oninput = function(){ MK.q = this.value; drawMarket(); };
  $("mr").onchange = function(){ MK.rk = this.value; drawMarket(); };
  $("mp").oninput = function(){ MK.pr = +this.value; drawMarket(); };
  $("ms").onchange = function(){ MK.so = this.value; drawMarket(); };
  var r = await sb.from("accounts").select("*").eq("status","sotuvda").order("created_at",{ascending:false}).limit(500);
  ACCS = r.data || [];
  await loadPartners(); await names(ACCS.map(function(x){ return x.seller_id; })); drawMarket();
}

/* ---------- buy / pay ---------- */
var BUY = {a:null,mode:"full",term:60};
function buyDlg(){
  var a = BUY.a, n = BUY.mode==="inst" ? BUY.term/10 : 1, tot = BUY.mode==="inst" ? Math.ceil(a.price*(1+ST.markup/100)) : a.price, each = Math.ceil(tot/n);
  var s = '<h3>'+h(a.id)+' · '+h(a.rank)+'</h3><div class="row"><button type="button" class="btn '+(BUY.mode==="full"?"p":"")+'" data-act="bm" data-id="full">'+t("full")+'</button><button type="button" class="btn '+(BUY.mode==="inst"?"p":"")+'" data-act="bm" data-id="inst">'+t("inst")+'</button></div>';
  if(BUY.mode==="inst") s += '<label><span>'+t("term")+'</span><select id="bt">'+[30,60,90,120].map(function(d){ return '<option value="'+d+'"'+(d===BUY.term?" selected":"")+'>'+d+' '+t("days")+'</option>'; }).join("")+'</select></label><p>'+t("markup")+': '+ST.markup+'% · '+n+' '+t("payn")+'</p>';
  s += '<p>'+t("total")+': <b>'+fmt(tot)+'</b> ≈ '+usd(tot)+'</p>'+(BUY.mode==="inst"?'<p class="price">'+fmt(each)+' <span class="usd">≈ '+usd(each)+'</span></p>':"")+
    '<p class="note">'+t("rule")+'</p><p class="note">'+t("chek")+' @owner_accSTORE</p><button class="btn p" type="button" data-act="bgo">'+t("buy")+'</button>';
  openDlg(s);
  var bt = $("bt"); if(bt) bt.onchange = function(){ BUY.term = +this.value; buyDlg(); };
}
var PAY = {deal:null,method:"uz"};
function payDlg(){
  var d = PAY.deal, n = d.n, each = Math.ceil(d.total/n), amt = d.paid_n===n-1 ? d.total-each*(n-1) : each;
  var cards = ST.cards||[], isU = PAY.method==="usdt", c = cards.filter(function(x){ return x.k===PAY.method; })[0] || cards[0];
  var tabs = cards.map(function(x){ return '<button type="button" class="btn '+(PAY.method===x.k?"p":"")+'" data-act="pm" data-id="'+h(x.k)+'">'+h(x.name)+'</button>'; }).join(" ")+(ST.usdt?' <button type="button" class="btn '+(isU?"p":"")+'" data-act="pm" data-id="usdt">USDT</button>':"");
  var s = '<h3>'+t("pay_title")+': '+h(d.id)+'</h3><div class="row">'+tabs+'</div><p class="price">'+fmt(amt)+' <span class="usd">≈ '+usd(amt)+'</span></p>';
  if(isU){
    var ua = (Math.ceil(amt/ST.rate*100)/100).toFixed(2);
    s += '<p>'+ua+' USDT ('+h(ST.net||"TRC20")+')</p><div class="num">'+h(ST.usdt)+'</div><label><span>'+t("txid")+'</span><input id="tx" maxlength="100" autocomplete="off"></label><p class="err" id="perr"></p><div class="card" style="border-color:#FFB43A"><p><b>'+t("chek_req")+'</b></p><p><a class="btn sm p" target="_blank" rel="noopener" href="https://t.me/owner_accSTORE?text='+encodeURIComponent(d.id+" · USDT")+'">'+t("chek_btn")+'</a></p><label style="flex-direction:row;gap:8px;align-items:flex-start"><input type="checkbox" id="chk" style="margin-top:4px"><span>'+t("chek_chk")+'</span></label></div><button class="btn p" type="button" data-act="pgo">'+t("usdt_send")+'</button>';
  }else if(c){
    s += '<p>'+t("pay_card")+':</p><div class="num">'+h(c.num)+'</div><div class="row"><button class="btn sm" type="button" data-act="pcopy" data-id="'+h(c.num)+'">'+t("copy")+'</button></div><p class="note">'+t("pay_note")+' ('+h(d.id)+')</p><div class="card" style="border-color:#FFB43A"><p><b>'+t("chek_req")+'</b></p><p><a class="btn sm p" target="_blank" rel="noopener" href="https://t.me/owner_accSTORE?text='+encodeURIComponent(d.id+" · "+fmt(amt)+" UZS")+'">'+t("chek_btn")+'</a></p><label style="flex-direction:row;gap:8px;align-items:flex-start"><input type="checkbox" id="chk" style="margin-top:4px"><span>'+t("chek_chk")+'</span></label></div><p class="err" id="perr"></p><button class="btn p" type="button" data-act="pgo">'+t("pay_done")+'</button>';
  }
  openDlg(s);
}

/* ---------- deals ---------- */
async function vDeals(v){
  if(!SESS){ v.innerHTML = '<p>'+t("need_login")+'</p><button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  var r = await sb.from("deals").select("*, accounts(id,rank,seller_id)").order("created_at",{ascending:false});
  var all = r.data || [], mine = all.filter(function(d){ return d.buyer_id===SESS.user.id; }), sold = all.filter(function(d){ return d.buyer_id!==SESS.user.id; });
  var pr = await sb.from("payments").select("deal_id,status").eq("user_id",SESS.user.id).eq("status","kutilmoqda");
  var pend = {}; (pr.data||[]).forEach(function(p){ pend[p.deal_id] = 1; });
  var STL = {kutilmoqda:"birinchi to'lov kutilmoqda",faol:"faol",topshirish:"to'liq to'langan, topshirish kutilmoqda",yakunlangan:"topshirilgan",chiqarilgan:"akkauntdan chiqarilgan",bekor:"bekor qilingan"};
  var row = function(d){
    var due = new Date(new Date(d.last_paid_at||d.created_at).getTime()+10*86400000), late = Math.floor((Date.now()-due.getTime())/86400000);
    var can = (d.status==="kutilmoqda"||d.status==="faol") && d.paid_n<d.n && d.buyer_id===SESS.user.id;
    return '<div class="card"><div class="chips"><span class="chip">'+h(d.id)+'</span><span class="chip">'+h(d.accounts?d.accounts.id:d.account_id)+'</span><span class="chip '+(d.status==="yakunlangan"?"ok":d.status==="chiqarilgan"?"bad":"warn")+'">'+h(STL[d.status]||d.status)+'</span></div>'+
      '<p>'+t("paid")+': '+d.paid_n+'/'+d.n+' · '+t("total")+': '+fmt(d.total)+' ≈ '+usd(d.total)+'</p>'+
      (can?'<p>'+t("next")+': '+due.toLocaleDateString()+(late>0?' <span class="chip bad">'+late+' kun kechikdi</span>':"")+'</p>':"")+
      (pend[d.id]?'<p class="chip warn">'+t("pending")+'</p>':(can?'<button class="btn p" data-act="pay" data-id="'+h(d.id)+'">'+t("pay_title")+'</button>':""))+'</div>';
  };
  v.innerHTML = '<h2>'+t("deals_t")+'</h2>'+(mine.length?'<div class="grid">'+mine.map(row).join("")+'</div>':'<p class="note">'+t("no_deals")+'</p>')+
    (sold.length?'<h2>Mening akkauntlarim bo\'yicha bitimlar</h2><div class="grid">'+sold.map(row).join("")+'</div>':"")+'<p class="note">'+t("rule")+'</p>';
  window.__deals = all;
}

/* ---------- sell ---------- */
function upVideo(file,prog){
  return new Promise(function(res,rej){
    var ext = (file.name.split(".").pop()||"mp4").toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,5)||"mp4", p = SESS.user.id+"/"+rid()+"."+ext, x = new XMLHttpRequest();
    x.open("POST",SB_URL+"/storage/v1/object/videos/"+p);
    x.setRequestHeader("Authorization","Bearer "+SESS.access_token); x.setRequestHeader("apikey",SB_KEY); x.setRequestHeader("x-upsert","false");
    x.setRequestHeader("Content-Type",file.type||"video/mp4");
    x.upload.onprogress = function(e){ if(e.lengthComputable) prog(Math.round(e.loaded/e.total*100)); };
    x.onload = function(){ if(x.status>=200&&x.status<300) res(SB_URL+"/storage/v1/object/public/videos/"+p); else { var m = ""; try{ m = JSON.parse(x.responseText).message; }catch(e){} rej(new Error(/exceeded|too large|payload|413/i.test(m+x.status) ? t("vid_lim") : (m||"upload "+x.status))); } };
    x.onerror = function(){ rej(new Error(t("err"))); };
    x.send(file);
  });
}
var DRAFT = [];
async function compress(file,maxs){
  return new Promise(function(res,rej){
    var img = new Image(), u = URL.createObjectURL(file);
    img.onload = function(){ var k = Math.min(1,(maxs||1280)/Math.max(img.width,img.height)), c = document.createElement("canvas"); c.width = Math.round(img.width*k); c.height = Math.round(img.height*k); c.getContext("2d").drawImage(img,0,0,c.width,c.height); c.toBlob(function(b){ URL.revokeObjectURL(u); b?res(b):rej(new Error("img")); },"image/jpeg",.82); };
    img.onerror = function(){ rej(new Error("Rasm o'qilmadi")); }; img.src = u;
  });
}
function rid(){ return Math.random().toString(36).slice(2,10)+Date.now().toString(36); }
async function vSell(v){
  if(!SESS || !ME){ v.innerHTML = '<p>'+t("need_login")+'</p><button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  var ks = ME.kyc_status, s = '<h2>'+t("sell_t")+'</h2><div class="card"><h3>'+t("kyc_t")+'</h3>';
  if(ks==="tasdiq") s += '<p class="chip ok">'+t("kyc_ok")+'</p>';
  else if(ks==="kutilmoqda") s += '<p class="chip warn">'+t("kyc_wait")+'</p>';
  else s += (ks==="rad"?'<p class="err">Rad etildi. Ma\'lumotlarni tuzatib qayta yuboring.</p>':"")+
    '<form id="kf" class="fl" style="grid-template-columns:1fr"><label><span>'+t("fname")+'</span><input id="kn" required maxlength="80"></label><label><span>'+t("floc")+'</span><input id="kl" required maxlength="200"></label><label><span>'+t("fphone")+'</span><input id="kp" required pattern="\\+998[0-9 ]{9,13}" placeholder="+998 90 123 45 67"></label><label><span>'+t("fpass")+'</span><input id="kf1" type="file" accept="image/*" required></label><label style="flex-direction:row;gap:8px;align-items:flex-start"><input id="kc" type="checkbox" required style="margin-top:4px"><span>'+t("consent")+'</span></label><p class="err" id="kerr"></p><button class="btn p" type="submit">'+t("send_kyc")+'</button></form>';
  s += '</div>';
  if(ks==="kutilmoqda" || ks==="tasdiq"){
    s += '<div class="card" style="margin-top:12px"><h3>'+t("list_t")+'</h3><form id="lf" class="fl" style="grid-template-columns:1fr"><label><span>'+t("rank")+'</span><select id="lr">'+RANKS.map(function(r){ return '<option>'+r+'</option>'; }).join("")+'</select></label>'+
      '<label><span>'+t("lvl")+'</span><input id="ll" type="number" min="1" max="100" required></label><label><span>'+t("fskins")+'</span><input id="lk" type="number" min="0" max="5000" required></label><label><span>'+t("fmythic")+'</span><input id="lm" type="number" min="0" max="2000" required></label><label><span>'+t("fsc")+'</span><input id="lsc" type="number" min="0" max="500" value="0" required></label>'+
      '<label><span>'+t("fp")+'</span><input id="lp" type="number" min="10000" max="150000000" step="10000" required><b id="lpu"></b></label><label><span>'+t("fdesc")+'</span><textarea id="ld" maxlength="500" rows="3"></textarea></label>'+
      '<label><span>'+t("photos")+'</span><input id="lph" type="file" accept="image/*" multiple></label><div class="ph-row" id="phr"></div><label><span>'+t("vid_l")+'</span><input id="lvd" type="file" accept="video/*"></label><div class="vp" id="vpg" hidden><i></i></div><p class="note" id="vnote"></p><p class="err" id="lerr"></p><button class="btn p" type="submit">'+t("submit")+'</button></form></div>';
  }
  var mr = await sb.from("accounts").select("*").eq("seller_id",SESS.user.id).order("created_at",{ascending:false});
  s += '<h2>'+t("my_list")+'</h2><div class="tw"><table><tr><th>ID</th><th>Rank</th><th>'+t("fp").split(",")[0]+'</th><th></th></tr>'+(mr.data||[]).map(function(a){ return '<tr><td>'+h(a.id)+'</td><td>'+h(a.rank)+'</td><td>'+fmt(a.price)+'</td><td><span class="chip '+(a.status==="sotuvda"?"ok":a.status==="rad"?"bad":"warn")+'">'+t("st_"+a.status)+'</span></td></tr>'; }).join("")+'</table></div>';
  v.innerHTML = s; DRAFT = [];
  if($("kf")) $("kf").addEventListener("submit",async function(e){
    e.preventDefault(); var er = $("kerr"); er.textContent = "";
    try{
      var f = $("kf1").files[0], b = await compress(f), path = SESS.user.id+"/passport-"+rid()+".jpg";
      var up = await sb.storage.from("kyc").upload(path,b,{contentType:"image/jpeg"}); if(up.error) throw up.error;
      var r = await sb.from("profiles").update({phone:$("kp").value.trim(),kyc:{name:$("kn").value.trim(),loc:$("kl").value.trim(),passport:path,consent:true,ts:Date.now()},kyc_status:"kutilmoqda"}).eq("id",SESS.user.id);
      if(r.error) throw r.error; await loadMe(); toast(t("ok")); render();
    }catch(x){ er.textContent = errMsg(x); }
  });
  if($("lf")){
    $("lp").oninput = function(){ $("lpu").textContent = this.value ? "≈ "+usd(+this.value) : ""; };
    $("lph").onchange = async function(){
      var fs = Array.prototype.slice.call(this.files).slice(0,15-DRAFT.length), er = $("lerr"); er.textContent = "";
      try{ for(var i=0;i<fs.length;i++){ var b = await compress(fs[i]); DRAFT.push(b); } }catch(x){ er.textContent = errMsg(x); }
      $("phr").innerHTML = DRAFT.map(function(b){ return '<img alt="" src="'+URL.createObjectURL(b)+'">'; }).join(""); this.value = "";
    };
    $("lf").addEventListener("submit",async function(e){
      e.preventDefault(); var er = $("lerr"); er.textContent = "";
      if(!DRAFT.length){ er.textContent = "Kamida 1 ta rasm qo'shing."; return; }
      try{
        var urls = [];
        for(var i=0;i<DRAFT.length;i++){ var p = SESS.user.id+"/"+rid()+".jpg", up = await sb.storage.from("photos").upload(p,DRAFT[i],{contentType:"image/jpeg"}); if(up.error) throw up.error; urls.push(sb.storage.from("photos").getPublicUrl(p).data.publicUrl); }
        var vurl = null, vf = $("lvd").files[0];
        if(vf){
          if(vf.size>1073741824){ er.textContent = t("vid_1g"); return; }
          vurl = await upVideo(vf,function(p){ $("vpg").hidden = false; $("vpg").firstChild.style.width = p+"%"; $("vnote").textContent = t("vid_up")+" "+p+"%"; });
        }
        var r = await sb.from("accounts").insert({video:vurl,seller_id:SESS.user.id,rank:$("lr").value,level:+$("ll").value,skins:+$("lk").value,mythic:+$("lm").value,supercars:+$("lsc").value,price:+$("lp").value,description:$("ld").value.trim(),photos:urls});
        if(r.error) throw r.error; toast(t("ok")); render();
      }catch(x){ er.textContent = errMsg(x); }
    });
  }
}

/* ---------- profile ---------- */
async function vProfile(v){
  if(!SESS || !ME){ v.innerHTML = '<p>'+t("need_login")+'</p><button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  v.innerHTML = '<h2>'+t("prof_t")+'</h2><div class="card" style="max-width:520px"><div class="row" style="align-items:center">'+(ME.avatar?'<img alt="" src="'+h(ME.avatar)+'" style="width:84px;height:84px;border-radius:50%;object-fit:cover;border:2px solid var(--cy)">':'<div style="width:84px;height:84px;border-radius:50%;border:2px dashed var(--line);display:flex;align-items:center;justify-content:center;font-size:30px">'+h((ME.name||"?").charAt(0).toUpperCase())+'</div>')+
    '<div><button class="btn sm" type="button" id="avpick">'+t("prof_pfp")+'</button>'+(ME.avatar?' <button class="btn sm bad" type="button" data-act="av-rm">'+t("prof_rm")+'</button>':"")+'<input type="file" id="avf" accept="image/*" hidden></div></div>'+
    '<form id="pff" class="fl" style="grid-template-columns:1fr;margin-top:10px"><label><span>'+t("prof_name")+'</span><input id="pfn" maxlength="40" required value="'+h(ME.name||"")+'"></label><label><span>'+t("prof_nick")+'</span><input id="pfk" maxlength="24" pattern="[A-Za-z0-9_]{3,24}" placeholder="oxygen_gamer" value="'+h(ME.nick||"")+'"></label><label><span>'+t("email")+'</span><input value="'+h(ME.email||"")+'" disabled></label><p class="err" id="pferr"></p><button class="btn p" type="submit">'+t("prof_save")+'</button></form></div>'+
    '<div class="card" style="max-width:520px;margin-top:12px"><h3>'+t("prof_pw")+'</h3><form id="pwf" class="fl" style="grid-template-columns:1fr"><label><span>'+t("prof_newpw")+'</span><input id="pp1" type="password" minlength="6" required autocomplete="new-password"></label><label><span>'+t("pw2")+'</span><input id="pp2" type="password" minlength="6" required autocomplete="new-password"></label><p class="err" id="pwerr"></p><button class="btn" type="submit">'+t("prof_pw")+'</button></form></div>';
  $("avpick").onclick = function(){ $("avf").click(); };
  $("avf").onchange = async function(){
    var f = this.files[0]; if(!f) return;
    try{
      var b = await compress(f, 320), p = SESS.user.id+"/avatar-"+rid()+".jpg", up = await sb.storage.from("photos").upload(p,b,{contentType:"image/jpeg"}); if(up.error) throw up.error;
      var url = sb.storage.from("photos").getPublicUrl(p).data.publicUrl, r = await sb.from("profiles").update({avatar:url}).eq("id",SESS.user.id); if(r.error) throw r.error;
      await loadMe(); toast(t("saved")); nav(); render();
    }catch(x){ $("pferr").textContent = errMsg(x); }
  };
  $("pff").addEventListener("submit",async function(e){
    e.preventDefault(); var er = $("pferr"), nk = $("pfk").value.trim();
    var r = await sb.from("profiles").update({name:$("pfn").value.trim(),nick:nk||null}).eq("id",SESS.user.id);
    if(r.error){ er.textContent = /duplicate|unique/i.test(r.error.message) ? t("nick_taken") : /nick_fmt|check/i.test(r.error.message) ? t("nick_fmt") : errMsg(r.error); return; }
    delete NAMES[SESS.user.id]; await loadMe(); nav(); toast(t("saved"));
  });
  $("pwf").addEventListener("submit",async function(e){ e.preventDefault(); if($("pp1").value!==$("pp2").value){ $("pwerr").textContent = t("pw_mis"); return; } var r = await sb.auth.updateUser({password:$("pp1").value}); if(r.error){ $("pwerr").textContent = r.error.message; return; } $("pp1").value = ""; $("pp2").value = ""; toast(t("reset_ok")); });
}

/* ---------- partner ---------- */
async function vPartner(v){
  var s = '<h2>'+t("pt_t")+'</h2><p class="lead">'+t("pt_lead")+'</p>';
  if(!SESS){ v.innerHTML = s+'<button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  await loadPartners();
  if(PT[SESS.user.id]){ v.innerHTML = s+'<p class="chip ok">'+t("pt_is")+': <a href="#@'+h(PT[SESS.user.id].nick)+'">@'+h(PT[SESS.user.id].nick)+'</a></p>'; return; }
  var ap = await sb.from("applications").select("*").eq("user_id",SESS.user.id).maybeSingle();
  if(ap.data){ v.innerHTML = s+'<div class="card"><p class="chip warn">'+t("pt_wait")+'</p><p>@'+h(ap.data.nick)+'</p><p>'+t("pt_code",{c:SESS.user.id.slice(-6).toUpperCase()})+'</p></div>'; return; }
  v.innerHTML = s+'<form id="pf" class="fl" style="grid-template-columns:1fr;max-width:480px"><label><span>'+t("pt_nick")+'</span><input id="pn" required minlength="3" maxlength="24" pattern="[A-Za-z0-9_]+"></label><label><span>'+t("pt_chan")+'</span><input id="pc" required pattern="https://.+"></label><label><span>'+t("pt_bio")+'</span><textarea id="pb" maxlength="300" rows="3"></textarea></label><p class="err" id="perr"></p><button class="btn p" type="submit">'+t("pt_send")+'</button></form>';
  $("pf").addEventListener("submit",async function(e){
    e.preventDefault(); var nk = $("pn").value.trim(), nn = norm(nk), er = $("perr");
    var clash = Object.keys(PT).some(function(k){ var o = norm(PT[k].nick); return o===nn || lev(o,nn)<=1; });
    if(clash){ er.textContent = t("pt_taken"); return; }
    var r = await sb.from("applications").insert({user_id:SESS.user.id,nick:nk,channel:$("pc").value.trim(),bio:$("pb").value.trim()});
    if(r.error){ er.textContent = errMsg(r.error); return; } toast(t("ok")); render();
  });
}
async function vKanal(v){
  await loadPartners();
  var p = Object.keys(PT).map(function(k){ return PT[k]; }).filter(function(x){ return x.nick.toLowerCase()===String(arg).toLowerCase(); })[0];
  if(!p){ v.innerHTML = '<p>'+t("pt_nf")+'</p>'; return; }
  var r = await sb.from("accounts").select("*").eq("seller_id",p.id).eq("status","sotuvda");
  ACCS = r.data || [];
  v.innerHTML = '<h1>@'+h(p.nick)+' <span class="chip ok">'+t("pt_ver")+'</span></h1><p class="lead">'+h(p.bio||"")+'</p><div class="row">'+(/^https:\/\//.test(p.channel)?'<a class="btn" target="_blank" rel="noopener nofollow" href="'+h(p.channel)+'">'+t("pt_open")+'</a>':"")+'<button class="btn p" data-act="chat-pt" data-id="'+h(p.id)+'">'+t("pt_msg")+'</button></div><h2>'+t("nav_market")+'</h2><div class="grid">'+(ACCS.length?ACCS.map(accCard).join(""):'<p class="note">'+t("pt_none")+'</p>')+'</div>';
}

/* ---------- chat ---------- */
var CH = {cur:null,msgs:[],sig:""};
function thTitle(th){
  if(th.indexOf("sup:")===0) return isStaff()&&th.slice(4)!==(SESS&&SESS.user.id) ? "Yordam: "+nm(th.slice(4)) : t("support");
  var p = th.split(":");
  if(p[0]==="dm") return "Akkaunt "+p[1]+" · "+nm(p[2]);
  if(p[0]==="pt") return (PT[p[1]]?"@"+PT[p[1]].nick:"Hamkor")+" · "+nm(p[2]);
  return th;
}
async function vChat(v){
  if(!SESS){ v.innerHTML = '<p>'+t("need_login")+'</p><button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  await loadPartners(); CH.sig = "";
  v.innerHTML = '<h2>'+t("chat_t")+'</h2><p class="note">'+t("chat_warn")+'</p><div class="cols tg"><div id="ths"></div><div id="conv"></div></div>';
  await chatRefresh(true); poll = setInterval(function(){ chatRefresh(false); },3000);
}
function hm(d){ var x = new Date(d); return ("0"+x.getHours()).slice(-2)+":"+("0"+x.getMinutes()).slice(-2); }
function unread(th){ return CH.msgs.filter(function(m){ return m.thread===th && m.sender!==SESS.user.id && !m.read_at; }).length; }
async function chatRefresh(first){
  var r = await sb.from("messages").select("*").order("id",{ascending:false}).limit(500);
  var rows = (r.data||[]).reverse(), ths = {}, my = "sup:"+SESS.user.id;
  ths[my] = 1; rows.forEach(function(m){ ths[m.thread] = 1; });
  if(CH.cur && !ths[CH.cur]) ths[CH.cur] = 1;
  var ids = []; Object.keys(ths).forEach(function(k){ k.split(":").forEach(function(x){ if(x.length>20) ids.push(x); }); });
  rows.forEach(function(m){ ids.push(m.sender); });
  await names(ids);
  if(!CH.cur) CH.cur = my;
  CH.msgs = rows;
  if(!$("ths")) return;
  var last = function(k){ var l = rows.filter(function(m){ return m.thread===k; }).pop(); return l ? (l.media ? (l.mtype==="video"?"🎬 ":"📷 ")+(l.body||"") : l.body) : t("nomsg"); };
  $("ths").innerHTML = Object.keys(ths).map(function(k){ var fl = rows.some(function(m){ return m.thread===k && m.flag; }), u = k===CH.cur ? 0 : unread(k); return '<button class="btn th '+(k===CH.cur?"p":"")+'" data-act="th" data-id="'+h(k)+'"><span class="tt">'+h(thTitle(k))+(isStaff()&&fl?" ⚑":"")+'</span><small>'+h(String(last(k)).slice(0,40))+'</small>'+(u?'<b class="bdg">'+u+'</b>':"")+'</button>'; }).join("");
  drawConv(first);
  if(unread(CH.cur)) sb.rpc("mark_read",{t:CH.cur}).then(function(){ });
}
function msgHTML(m){
  var me = m.sender===SESS.user.id, md = "";
  if(m.media) md = m.mtype==="video" ? '<video class="mm" controls preload="metadata" src="'+h(m.media)+'"></video>' : '<a href="'+h(m.media)+'" target="_blank" rel="noopener"><img class="mm" loading="lazy" alt="" src="'+h(m.media)+'"></a>';
  var tick = me ? '<i class="tk '+(m.read_at?"rd":"")+'">'+(m.read_at?"✓✓":"✓")+'</i>' : "";
  return '<div class="msg '+(me?"me":"")+(m.flag&&isStaff()?" fl":"")+'">'+(me?"":'<small>'+av(m.sender,16)+h(m.is_staff?"Administrator":(NAMES[m.sender]||m.sender_name||""))+'</small>')+md+(m.body?'<span class="bd">'+h(m.body)+'</span>':"")+'<span class="mt">'+(m.flag&&isStaff()?"⚑ ":"")+hm(m.created_at)+tick+'</span></div>';
}
function drawConv(force){
  var el = $("conv"); if(!el) return;
  var ms = CH.msgs.filter(function(m){ return m.thread===CH.cur; });
  if(el.getAttribute("data-th")!==CH.cur){
    el.setAttribute("data-th",CH.cur); CH.sig = "";
    el.innerHTML = '<div class="msgs" id="mbox"></div><form id="mf" class="row tgf"><button class="btn" type="button" data-act="att" title="'+t("att")+'">📎</button><input type="file" id="mfile" accept="image/*,video/*" hidden><input id="mt" style="flex:1" maxlength="1000" placeholder="'+t("msg_ph")+'" autocomplete="off"><button class="btn p" type="submit">'+t("send")+'</button></form><p class="err" id="merr"></p>';
    $("mf").addEventListener("submit",async function(e){ e.preventDefault(); var body = $("mt").value.trim(); if(!body) return; $("mt").value = ""; var r = await sb.from("messages").insert({thread:CH.cur,body:body}); if(r.error){ toast(errMsg(r.error)); return; } chatRefresh(true); });
    $("mfile").addEventListener("change",async function(){
      var f = this.files[0]; this.value = ""; if(!f) return; var er = $("merr"); er.textContent = "";
      try{
        var vid = /^video\//.test(f.type); if(vid && f.size>30*1048576){ er.textContent = t("vid_big"); return; }
        var blob = vid ? f : await compress(f,1280), ext = vid ? (f.name.split(".").pop()||"mp4").toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,5) : "jpg";
        er.textContent = "…"; var p = SESS.user.id+"/"+rid()+"."+ext, up = await sb.storage.from("chat").upload(p,blob,{contentType:vid?(f.type||"video/mp4"):"image/jpeg"}); if(up.error) throw up.error;
        var url = sb.storage.from("chat").getPublicUrl(p).data.publicUrl, cap = $("mt").value.trim(); $("mt").value = "";
        var r = await sb.from("messages").insert({thread:CH.cur,body:cap,media:url,mtype:vid?"video":"image"}); if(r.error) throw r.error; er.textContent = ""; chatRefresh(true);
      }catch(x){ er.textContent = errMsg(x); }
    });
  }
  var sig = ms.map(function(m){ return m.id+(m.read_at?"r":""); }).join(",");
  if(sig===CH.sig && !force) return;
  var box = $("mbox"), atEnd = box.scrollTop+box.clientHeight>=box.scrollHeight-40 || !CH.sig;
  CH.sig = sig; box.innerHTML = ms.map(msgHTML).join("") || '<p class="note">'+t("nomsg")+'</p>';
  if(force || atEnd) box.scrollTop = box.scrollHeight;
}

/* ---------- ADMIN ---------- */
var AT = "dash";
async function vAdmin(v){
  if(!SESS){ v.innerHTML = '<p>Admin paneli faqat administratorlar uchun. Avval kiring.</p><button class="btn p" data-act="auth" data-id="in">'+t("login")+'</button>'; return; }
  if(!isStaff()){ v.innerHTML = '<p>Bu bo\'lim faqat administratorlar uchun.</p>'; return; }
  var tabs = [["dash","Umumiy",true],["users","Foydalanuvchilar",perm("ban")||perm("pay")],["list","E'lonlar",perm("ban")],["pay","To'lovlar va bitimlar",perm("pay")],["ads","Reklama (TOP)",perm("ads")],["chat","Chat",true],["partners","Hamkorlar",isOwner()],["team","Adminlar va huquqlar",isOwner()||perm("audit")],["set","Sozlamalar",isOwner()],["log","Jurnal",isOwner()]].filter(function(x){ return x[2]; });
  if(!tabs.some(function(x){ return x[0]===AT; })) AT = "dash";
  v.innerHTML = '<h2>'+(isOwner()?"EGA paneli":"Admin paneli")+'</h2><div class="row">'+tabs.map(function(x){ return '<button class="btn sm '+(AT===x[0]?"p":"")+'" data-act="at" data-id="'+x[0]+'">'+x[1]+'</button>'; }).join("")+'</div><div id="ab"></div>';
  var b = $("ab");
  if(AT==="dash") await aDash(b); else if(AT==="users") await aUsers(b); else if(AT==="list") await aList(b); else if(AT==="pay") await aPay(b); else if(AT==="ads") await aAds(b);
  else if(AT==="chat") await vChat(b); else if(AT==="partners") await aPartners(b); else if(AT==="team") await aTeam(b); else if(AT==="set") aSet(b); else if(AT==="log") await aLog(b);
}
async function cnt(tbl,f){ var q = sb.from(tbl).select("id",{count:"exact",head:true}); if(f) q = f(q); var r = await q; return r.count||0; }
async function aDash(b){
  var c = await Promise.all([cnt("profiles"),cnt("accounts",function(q){ return q.eq("status","tekshiruvda"); }),cnt("accounts",function(q){ return q.eq("status","sotuvda"); }),cnt("payments",function(q){ return q.eq("status","kutilmoqda"); }),cnt("deals"),cnt("profiles",function(q){ return q.eq("kyc_status","kutilmoqda"); })]);
  b.innerHTML = '<div class="grid"><div class="card"><h3>'+c[0]+'</h3><p>Foydalanuvchilar</p></div><div class="card"><h3>'+c[5]+'</h3><p>Tekshiruvdagi hujjatlar</p></div><div class="card"><h3>'+c[1]+'</h3><p>Tekshiruvdagi e\'lonlar</p></div><div class="card"><h3>'+c[2]+'</h3><p>Sotuvdagi akkauntlar</p></div><div class="card"><h3>'+c[3]+'</h3><p>Kutilayotgan to\'lovlar</p></div><div class="card"><h3>'+c[4]+'</h3><p>Bitimlar</p></div></div>';
}
async function aUsers(b){
  var r = await sb.from("profiles").select("*").order("created_at",{ascending:false}).limit(500), U = r.data||[];
  b.innerHTML = '<label><span>Qidirish</span><input id="uq" placeholder="ism yoki e-pochta"></label><div class="tw"><table><thead><tr><th>Foydalanuvchi</th><th>Rol</th><th>Hujjat</th><th>Holat</th><th></th></tr></thead><tbody id="ur"></tbody></table></div>';
  var draw = function(){
    var q = $("uq").value.trim().toLowerCase();
    $("ur").innerHTML = U.filter(function(u){ return !q || (u.name||"").toLowerCase().indexOf(q)>=0 || (u.email||"").toLowerCase().indexOf(q)>=0; }).map(function(u){
      var kc = u.kyc_status; return '<tr><td>'+h(u.name)+'<br><small>'+h(u.email)+(u.phone?" · "+h(u.phone):"")+'</small></td><td>'+h(u.role)+'</td><td><span class="chip '+(kc==="tasdiq"?"ok":kc==="rad"?"bad":kc==="kutilmoqda"?"warn":"")+'">'+h(kc)+'</span>'+(u.kyc?'<br><small>'+h(u.kyc.name)+', '+h(u.kyc.loc)+'</small>':"")+'</td><td>'+(u.banned?'<span class="chip bad">bloklangan: '+h(u.ban_reason||"")+'</span>':'<span class="chip ok">faol</span>')+'</td><td>'+
        (perm("ban")&&u.id!==SESS.user.id&&u.role!=="owner"?(u.banned?'<button class="btn sm ok" data-act="unban" data-id="'+u.id+'">Blokdan chiqarish</button>':'<button class="btn sm bad" data-act="ban" data-id="'+u.id+'">Bloklash</button>')+(u.kyc?' <button class="btn sm" data-act="kdoc" data-id="'+u.id+'">Pasport</button> <button class="btn sm ok" data-act="kok" data-id="'+u.id+'">Tasdiqlash</button> <button class="btn sm bad" data-act="kno" data-id="'+u.id+'">Rad</button>':""):"")+'</td></tr>';
    }).join("");
  };
  $("uq").oninput = draw; draw(); window.__U = U;
}
async function aList(b){
  var r = await sb.from("accounts").select("*").in("status",["tekshiruvda","sotuvda","rad"]).order("created_at",{ascending:false}).limit(300), A = r.data||[];
  await names(A.map(function(a){ return a.seller_id; }));
  b.innerHTML = '<div class="tw"><table><tr><th>ID</th><th>Sotuvchi</th><th>Rank</th><th>Narx</th><th>Rasmlar</th><th>Holat</th><th></th></tr>'+A.map(function(a){ return '<tr><td>'+h(a.id)+'</td><td>'+h(nm(a.seller_id))+'</td><td>'+h(a.rank)+' · '+h(a.level)+'</td><td>'+fmt(a.price)+'</td><td>'+(a.photos||[]).slice(0,3).map(function(u){ return '<a target="_blank" rel="noopener" href="'+h(u)+'"><img alt="" src="'+h(u)+'" style="width:40px;height:40px;object-fit:cover"></a>'; }).join("")+'</td><td>'+h(a.status)+'</td><td>'+(a.status!=="sotuvda"?'<button class="btn sm ok" data-act="aok" data-id="'+h(a.id)+'">Tasdiqlash</button> ':"")+(a.status==="tekshiruvda"?'<button class="btn sm bad" data-act="ano" data-id="'+h(a.id)+'">Rad</button> ':"")+(canDel()?'<button class="btn sm bad" data-act="adel" data-id="'+h(a.id)+'">'+t("del")+'</button>':"")+'</td></tr>'; }).join("")+'</table></div>';
}
async function aAds(b){
  var r = await sb.from("accounts").select("*").eq("status","sotuvda").order("created_at",{ascending:false}), A = r.data||[];
  b.innerHTML = '<p class="note">TOP qilingan e\'lon bozorda eng tepada ko\'rinadi. Reklama to\'lovini xaridordan qo\'lda olasiz.</p><div class="tw"><table><tr><th>ID</th><th>Rank</th><th>Narx</th><th></th></tr>'+A.map(function(a){ return '<tr><td>'+h(a.id)+'</td><td>'+h(a.rank)+'</td><td>'+fmt(a.price)+'</td><td><button class="btn sm '+(a.top?"":"ok")+'" data-act="top" data-id="'+h(a.id)+'" data-v="'+(a.top?0:1)+'">'+(a.top?"TOP dan olish":"TOP qilish")+'</button> '+(canDel()?'<button class="btn sm bad" data-act="adel" data-id="'+h(a.id)+'">'+t("del")+'</button>':"")+'</td></tr>'; }).join("")+'</table></div>';
}
async function aPay(b){
  var rp = await sb.from("payments").select("*").order("id",{ascending:false}).limit(200), rd = await sb.from("deals").select("*").order("created_at",{ascending:false}).limit(200);
  var P = rp.data||[], Dl = rd.data||[];
  await names(P.map(function(p){ return p.user_id; }).concat(Dl.map(function(d){ return d.buyer_id; })));
  b.innerHTML = '<h3>To\'lovlar</h3><div class="tw"><table><tr><th>ID</th><th>Xaridor</th><th>Bitim</th><th>Summa</th><th>Usul</th><th>Holat</th><th></th></tr>'+P.map(function(p){ return '<tr><td>P-'+p.id+'</td><td>'+h(nm(p.user_id))+'</td><td>'+h(p.deal_id)+'</td><td>'+fmt(p.amount)+'<br><small>≈ '+usd(p.amount)+'</small></td><td>'+h(p.method)+(p.txid?'<br><small>'+h(p.txid)+'</small>':"")+'</td><td>'+h(p.status)+'</td><td>'+(p.status==="kutilmoqda"?'<button class="btn sm ok" data-act="pok" data-id="'+p.id+'">Tasdiqlash</button> <button class="btn sm bad" data-act="pno" data-id="'+p.id+'">Rad</button>':"")+'</td></tr>'; }).join("")+'</table></div>'+
   '<h3>Bitimlar</h3><div class="tw"><table><tr><th>ID</th><th>Xaridor</th><th>Akkaunt</th><th>To\'langan</th><th>Holat</th><th></th></tr>'+Dl.map(function(d){ return '<tr><td>'+h(d.id)+'</td><td>'+h(nm(d.buyer_id))+'</td><td>'+h(d.account_id)+'</td><td>'+d.paid_n+'/'+d.n+' · '+fmt(d.total)+'</td><td>'+h(d.status)+(d.status==="faol"?' · '+Math.max(0,Math.floor((Date.now()-new Date(d.last_paid_at||d.created_at).getTime())/86400000)-10)+' kun kechikish':"")+'</td><td>'+
     (d.status==="topshirish"?'<button class="btn sm ok" data-act="dact" data-id="'+h(d.id)+'" data-v="finish">Topshirildi, yakunlash</button> ':"")+(d.status==="faol"?'<button class="btn sm bad" data-act="dact" data-id="'+h(d.id)+'" data-v="remove">Akkauntdan chiqarish</button> ':"")+(d.status==="kutilmoqda"?'<button class="btn sm bad" data-act="dact" data-id="'+h(d.id)+'" data-v="cancel">Bekor qilish</button>':"")+'</td></tr>'; }).join("")+'</table></div>';
}
async function aPartners(b){
  var ra = await sb.from("applications").select("*"), A = ra.data||[]; await loadPartners();
  await names(A.map(function(a){ return a.user_id; }));
  b.innerHTML = '<h3>Arizalar</h3>'+(A.length?'<div class="tw"><table><tr><th>Nik</th><th>Kanal</th><th>Kod</th><th>O\'xshash nik</th><th></th></tr>'+A.map(function(a){ var nn = norm(a.nick), sim = Object.keys(PT).filter(function(k){ var o = norm(PT[k].nick); return o===nn||lev(o,nn)<=1; }).map(function(k){ return "@"+PT[k].nick; }); return '<tr><td>@'+h(a.nick)+'<br><small>'+h(nm(a.user_id))+'</small><br><small>'+h(a.bio)+'</small></td><td><a target="_blank" rel="noopener nofollow" href="'+h(a.channel)+'">'+h(a.channel)+'</a></td><td>'+h(a.user_id.slice(-6).toUpperCase())+'</td><td>'+(sim.length?'<span class="chip bad">'+h(sim.join(", "))+'</span>':"yo'q")+'</td><td><button class="btn sm ok" data-act="pt-ok" data-id="'+a.user_id+'">Tasdiqlash (to\'lov olindi)</button> <button class="btn sm bad" data-act="pt-no" data-id="'+a.user_id+'">Rad</button></td></tr>'; }).join("")+'</table></div>':'<p class="note">Ariza yo\'q.</p>')+
   '<h3>Hamkorlar</h3><div class="tw"><table><tr><th>Nik</th><th>Kanal</th><th></th></tr>'+Object.keys(PT).map(function(k){ var p = PT[k]; return '<tr><td>@'+h(p.nick)+'</td><td>'+h(p.channel)+'</td><td><button class="btn sm bad" data-act="pt-del" data-id="'+k+'">Olib tashlash</button></td></tr>'; }).join("")+'</table></div>';
}
async function aTeam(b){
  var r = await sb.from("profiles").select("*").in("role",["admin","owner"]), T = r.data||[];
  var ur = isOwner() ? await sb.from("profiles").select("id,name,email").eq("role","user").order("created_at",{ascending:false}).limit(300) : {data:[]};
  var PN = {ban:"Bloklash, hujjat va e'lonlarni tekshirish",pay:"To'lov va bitimlarni boshqarish",audit:"Boshqa adminlarni ko'rish",ads:"Reklama (TOP)"};
  b.innerHTML = '<p class="note">Huquqlarni faqat ega o\'zgartiradi. Hamkor qo\'shish, admin tayinlash, sozlamalar va jurnal faqat egada qoladi.</p><div class="tw"><table><tr><th>Admin</th><th>Huquqlar</th><th></th></tr>'+T.map(function(u){ return '<tr><td>'+h(u.name)+(u.role==="owner"?' <span class="chip ok">EGA</span>':"")+'<br><small>'+h(u.email)+'</small></td><td>'+(u.role==="owner"?"hamma huquq":Object.keys(PN).map(function(k){ return '<label style="flex-direction:row;gap:6px"><input type="checkbox" data-act="perm" data-id="'+u.id+'" data-p="'+k+'"'+((u.perms&&u.perms[k])?" checked":"")+(isOwner()?"":" disabled")+'> '+PN[k]+'</label>'; }).join(""))+'</td><td>'+(isOwner()&&u.role==="admin"?'<button class="btn sm bad" data-act="adm-del" data-id="'+u.id+'">Olib tashlash</button>':"")+'</td></tr>'; }).join("")+'</table></div>'+
   (isOwner()?'<h3>Yangi admin tayinlash</h3><div class="row"><select id="nu">'+(ur.data||[]).map(function(u){ return '<option value="'+u.id+'">'+h(u.name)+' ('+h(u.email)+')</option>'; }).join("")+'</select><button class="btn p" data-act="adm-add">Admin qilish (huquqsiz)</button></div>':"");
  window.__T = T;
}
async function aSet(b){
  var c = ST.cards||[];
  b.innerHTML = '<form id="sf" class="fl" style="grid-template-columns:1fr;max-width:520px"><label><span>1 dollar necha so\'m</span><input id="sr" type="number" min="1000" value="'+h(ST.rate)+'"></label><label><span>Bo\'lib to\'lash ustamasi, %</span><input id="sm" type="number" min="0" max="100" value="'+h(ST.markup)+'"></label>'+
   [0,1].map(function(i){ var x = c[i]||{}; return '<label><span>Karta '+(i+1)+' nomi</span><input id="cn'+i+'" value="'+h(x.name||"")+'"></label><label><span>Karta '+(i+1)+' raqami</span><input id="cu'+i+'" value="'+h(x.num||"")+'"></label>'; }).join("")+
   '<label><span>USDT manzil (bo\'sh bo\'lsa USDT usuli ko\'rinmaydi)</span><input id="su" value="'+h(ST.usdt||"")+'"></label><label><span>Tarmoq</span><input id="sn" value="'+h(ST.net||"TRC20")+'"></label><button class="btn p" type="submit">Saqlash</button></form><div class="card" id="diag" style="margin-top:14px"><h3>Kirish tizimi holati</h3><p class="note">Tekshirilmoqda...</p></div>';
  authCfg().then(function(c){ var d = $("diag"); if(!d) return; var ex = c.external||{}; d.innerHTML = '<h3>Kirish tizimi holati</h3><p>Pochta tasdiqlash: '+(c.mailer_autoconfirm?'<span class="chip ok">o\'chiq (xat kerak emas)</span>':'<span class="chip bad">YOQILGAN: yangi foydalanuvchilar kira olmaydi. Supabase, Authentication, Sign In / Providers, Email, Confirm email ni o\'chiring</span>')+'</p><p>Google bilan kirish: '+(ex.google?'<span class="chip ok">yoqilgan</span>':'<span class="chip warn">ulanmagan</span>')+'</p><p>Ro\'yxatdan o\'tish: '+(c.disable_signup?'<span class="chip bad">o\'chirilgan</span>':'<span class="chip ok">ochiq</span>')+'</p>'; });
  $("sf").addEventListener("submit",async function(e){
    e.preventDefault();
    var cards = [0,1].map(function(i){ return {k:i===0?"uz":"visa",name:$("cn"+i).value.trim(),num:$("cu"+i).value.trim()}; }).filter(function(x){ return x.name&&x.num; });
    var r = await sb.from("settings").update({rate:+$("sr").value,markup:+$("sm").value,cards:cards,usdt:$("su").value.trim(),net:$("sn").value.trim()}).eq("id",1);
    if(r.error){ toast(errMsg(r.error)); return; } await loadSettings(); logA("Sozlamalar o'zgardi"); toast(t("ok"));
  });
}
async function aLog(b){
  var r = await sb.from("logs").select("*").order("id",{ascending:false}).limit(200);
  b.innerHTML = '<div class="tw"><table>'+(r.data||[]).map(function(l){ return '<tr><td><small>'+new Date(l.created_at).toLocaleString()+'</small></td><td>'+h(l.actor_name||"")+'</td><td>'+h(l.text)+'</td></tr>'; }).join("")+'</table></div>';
}

/* ---------- actions ---------- */
async function needLogin(){ if(!SESS){ authDlg("in"); return true; } if(ME && ME.banned){ toast(t("banned")); } return false; }
var ACT = {
  "auth":function(id){ authDlg(id); },
  "auth-sw":function(id){ authDlg(id); },
  "forgot":async function(){ var em = ($("ae")&&$("ae").value.trim()) || prompt(t("email")); if(!em) return; var r = await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname}); if(r.error){ toast(r.error.message); return; } resetDlg(em); },
  "av-rm":async function(){ var r = await sb.from("profiles").update({avatar:null}).eq("id",SESS.user.id); if(r.error){ toast(errMsg(r.error)); return; } await loadMe(); render(); },
  "oauth":async function(id){ var r = await sb.auth.signInWithOAuth({provider:id,options:{redirectTo:location.origin+location.pathname}}); if(r.error){ var m = /not enabled|Unsupported provider/i.test(r.error.message||"") ? t("prov_off") : r.error.message; toast(m); var e2 = $("aerr"); if(e2) e2.textContent = m; } },
  "adel":async function(id){ if(!confirm(t("del_q"))) return; var r = await sb.rpc("delete_account",{p_id:id}); if(r.error){ toast(errMsg(r.error)); return; } ACCS = ACCS.filter(function(x){ return x.id!==id; }); toast(t("ok")); render(); },
  "more":function(){ MK.n += 12; drawMarket(); },
  "rmx":function(){ try{ sessionStorage.setItem("rmd","1"); }catch(e){} var r = $("remind"); if(r) r.remove(); },
  "mtoggle":function(){ var m = $("umenu"); m.hidden = !m.hidden; },
  "logout":async function(){ await sb.auth.signOut(); ME = null; SESS = null; location.hash = "#/"; render(); },
  "att":function(){ var f = $("mfile"); if(f) f.click(); },
  "at":function(id){ AT = id; render(); },
  "gal":function(id,el){ var i = $("ph-"+id); if(i) i.src = el.getAttribute("data-u"); },
  "buy":async function(id){ if(await needLogin()) return; var a = ACCS.filter(function(x){ return x.id===id; })[0]; if(!a) return; if(SESS.user.id===a.seller_id){ toast(t("own")); return; } BUY = {a:a,mode:"full",term:60}; buyDlg(); },
  "bm":function(id){ BUY.mode = id; buyDlg(); },
  "bgo":async function(){ var r = await sb.rpc("create_deal",{p_acc:BUY.a.id,p_mode:BUY.mode,p_term:BUY.mode==="inst"?BUY.term:0}); if(r.error){ toast(errMsg(r.error)); return; } closeDlg(); toast(t("ok")); location.hash = "#/deals"; },
  "ask":async function(id){ if(await needLogin()) return; var a = ACCS.filter(function(x){ return x.id===id; })[0]; if(!a) return; if(a.seller_id===SESS.user.id){ toast(t("own")); return; } CH.cur = "dm:"+id+":"+SESS.user.id; location.hash = "#/chat"; if(route==="chat") render(); },
  "chat-pt":async function(id){ if(await needLogin()) return; if(id===SESS.user.id){ toast(t("own")); return; } CH.cur = "pt:"+id+":"+SESS.user.id; location.hash = "#/chat"; },
  "th":function(id){ CH.cur = id; chatRefresh(true); },
  "pay":function(id){ var d = (window.__deals||[]).filter(function(x){ return x.id===id; })[0]; if(!d) return; PAY = {deal:d,method:(ST.cards&&ST.cards[0]&&ST.cards[0].k)||"uz"}; payDlg(); },
  "pm":function(id){ PAY.method = id; payDlg(); },
  "pcopy":function(id){ var n = id.replace(/ /g,""); try{ navigator.clipboard.writeText(n); toast(t("copied")); }catch(e){ toast(id); } },
  "pgo":async function(){ if($("chk") && !$("chk").checked){ var e0 = $("perr"); if(e0) e0.textContent = t("chek_need"); return; } var m = PAY.method, r = await sb.rpc("submit_payment",{p_deal:PAY.deal.id,p_method:m,p_txid:m==="usdt"?$("tx").value.trim():null}); if(r.error){ var e = $("perr"); if(e) e.textContent = errMsg(r.error); return; } closeDlg(); toast(t("ok")); render(); },
  "ban":async function(id){ var why = prompt("Bloklash sababi:"); if(why===null) return; var r = await sb.from("profiles").update({banned:true,ban_reason:why}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Bloklandi: "+id.slice(0,8)+" ("+why+")"); render(); },
  "unban":async function(id){ var r = await sb.from("profiles").update({banned:false,ban_reason:null}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Blokdan chiqarildi: "+id.slice(0,8)); render(); },
  "kok":async function(id){ var r = await sb.from("profiles").update({kyc_status:"tasdiq"}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Hujjat tasdiqlandi: "+id.slice(0,8)); render(); },
  "kno":async function(id){ var r = await sb.from("profiles").update({kyc_status:"rad"}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Hujjat rad etildi: "+id.slice(0,8)); render(); },
  "kdoc":async function(id){ var u = (window.__U||[]).filter(function(x){ return x.id===id; })[0]; if(!u||!u.kyc||!u.kyc.passport) return; var r = await sb.storage.from("kyc").createSignedUrl(u.kyc.passport,120); if(r.error){ toast(errMsg(r.error)); return; } window.open(r.data.signedUrl,"_blank","noopener"); },
  "aok":async function(id){ var r = await sb.from("accounts").update({status:"sotuvda"}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("E'lon tasdiqlandi: "+id); render(); },
  "ano":async function(id){ var r = await sb.from("accounts").update({status:"rad"}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("E'lon rad etildi: "+id); render(); },
  "top":async function(id,el){ var on = el.getAttribute("data-v")==="1", r = await sb.from("accounts").update({top:on}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA(id+(on?" TOP qilindi":" TOP dan olindi")); render(); },
  "pok":async function(id){ var r = await sb.rpc("confirm_payment",{p_id:+id,p_ok:true}); if(r.error){ toast(errMsg(r.error)); return; } render(); },
  "pno":async function(id){ var r = await sb.rpc("confirm_payment",{p_id:+id,p_ok:false}); if(r.error){ toast(errMsg(r.error)); return; } render(); },
  "dact":async function(id,el){ if(!confirm("Aniq bajarilsinmi?")) return; var r = await sb.rpc("deal_action",{p_deal:id,p_action:el.getAttribute("data-v")}); if(r.error){ toast(errMsg(r.error)); return; } render(); },
  "pt-ok":async function(id){ if(!confirm("Kirish to'lovi olinganmi? Hamkor qilinsinmi?")) return; var r = await sb.rpc("approve_partner",{p_uid:id,p_fee:true}); if(r.error){ toast(errMsg(r.error)); return; } render(); },
  "pt-no":async function(id){ var r = await sb.from("applications").delete().eq("user_id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Hamkor arizasi rad etildi"); render(); },
  "pt-del":async function(id){ if(!confirm("Hamkor olib tashlansinmi?")) return; var r = await sb.from("partners").delete().eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Hamkor olib tashlandi"); render(); },
  "adm-add":async function(){ var id = $("nu").value; if(!id) return; var r = await sb.from("profiles").update({role:"admin",perms:{}}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Admin tayinlandi: "+id.slice(0,8)); render(); },
  "adm-del":async function(id){ if(!confirm("Admin olib tashlansinmi?")) return; var r = await sb.from("profiles").update({role:"user",perms:{}}).eq("id",id); if(r.error){ toast(errMsg(r.error)); return; } logA("Admin olib tashlandi: "+id.slice(0,8)); render(); },
  "perm":async function(id,el){ var T = (window.__T||[]).filter(function(x){ return x.id===id; })[0]; if(!T) return; var pm = Object.assign({},T.perms||{}); pm[el.getAttribute("data-p")] = el.checked; var r = await sb.from("profiles").update({perms:pm}).eq("id",id); if(r.error){ toast(errMsg(r.error)); el.checked = !el.checked; return; } T.perms = pm; logA("Huquq o'zgardi: "+T.name+" "+el.getAttribute("data-p")+"="+el.checked); }
};
document.addEventListener("click",function(e){
  var el = e.target.closest("[data-act]"); if(!el) return;
  if(el.tagName==="INPUT") return;
  var f = ACT[el.getAttribute("data-act")]; if(f){ e.preventDefault(); f(el.getAttribute("data-id"),el); }
});
document.addEventListener("change",function(e){ var el = e.target; if(el.tagName==="INPUT" && el.getAttribute("data-act")==="perm") ACT.perm(el.getAttribute("data-id"),el); });
$("dx").addEventListener("click",closeDlg);
document.addEventListener("click",function(e){ var m = $("umenu"); if(!m || m.hidden) return; if(e.target.closest("#authBtn")) return; m.hidden = true; });
$("lang").addEventListener("click",function(e){ var b = e.target.closest("button[data-l]"); if(!b) return; LG = b.getAttribute("data-l"); try{ localStorage.setItem("lg",LG); }catch(x){} document.documentElement.lang = LG; render(); });
window.addEventListener("hashchange",function(){ window.scrollTo(0,0); render(); });
(async function(){ document.documentElement.lang = LG; try{ await Promise.all([loadSettings(),loadMe()]); }catch(e){} if(isOwner() && !location.hash){ location.hash = "#/admin"; return; } render(); })();
})();
