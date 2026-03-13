import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "ru" | "en";

const translations = {
  // Navbar
  "nav.home": { ru: "Главная", en: "Home" },
  "nav.packages": { ru: "Пакеты", en: "Packages" },
  "nav.calculator": { ru: "Калькулятор", en: "Calculator" },
  "nav.effects": { ru: "Спецэффекты", en: "Effects" },
  "nav.faq": { ru: "FAQ", en: "FAQ" },
  "nav.about": { ru: "О нас", en: "About" },
  "nav.portfolio": { ru: "Портфолио", en: "Portfolio" },
  "nav.call": { ru: "Позвонить", en: "Call us" },

  // Hero
  "hero.subtitle": { ru: "Профессиональное световое оборудование", en: "Professional Stage Lighting" },
  "hero.title1": { ru: "Подбор сценического света", en: "Stage Lighting Selection" },
  "hero.title2": { ru: "для мероприятий", en: "for Events" },
  "hero.desc": {
    ru: "Рассчитайте стоимость аренды светового оборудования за 30 секунд. Готовые пакеты для площадок от 50 до 250 м².",
    en: "Calculate stage lighting rental cost in 30 seconds. Ready-made packages for venues from 50 to 250 m².",
  },
  "hero.cta": { ru: "Рассчитать стоимость", en: "Calculate Cost" },

  // Packages
  "pkg.title1": { ru: "Готовые", en: "Ready-made" },
  "pkg.title2": { ru: "пакеты", en: "Packages" },
  "pkg.subtitle": { ru: "Все цены указаны за 6 часов работы оборудования", en: "All prices are for 6 hours of equipment operation" },
  "pkg.details": { ru: "Подробнее", en: "Details" },
  "pkg.area": { ru: "Площадь", en: "Area" },
  "pkg.guests": { ru: "Гости", en: "Guests" },
  "pkg.note": { ru: "* В комплект не включена работа оператора", en: "* Operator service not included" },
  "pkg.package": { ru: "Пакет", en: "Package" },
  "pkg.sqm": { ru: "м²", en: "m²" },
  "pkg.people": { ru: "чел.", en: "ppl" },
  "pkg.guestsLabel": { ru: "гостей", en: "guests" },

  // Package descriptions
  "pkg.mini.desc": { ru: "Компактный комплект для небольших площадок", en: "Compact kit for small venues" },
  "pkg.medium.desc": { ru: "Оптимальный комплект для средних мероприятий", en: "Optimal kit for medium events" },
  "pkg.big.desc": { ru: "Мощный комплект для крупных событий", en: "Powerful kit for large events" },
  "pkg.maxi.desc": { ru: "Максимальный комплект для масштабных шоу", en: "Maximum kit for large-scale shows" },

  // Package equipment
  "pkg.mini.eq1": { ru: "6 световых тотемов с приборами заливного и динамичного света", en: "6 light totems with wash and dynamic lights" },
  "pkg.mini.eq2": { ru: "Подсветка президиума", en: "Head table illumination" },
  "pkg.mini.eq3": { ru: "Грамотная расстановка по площадке — без тёмных зон", en: "Smart placement across the venue — no dark spots" },
  "pkg.medium.eq1": { ru: "8 световых тотемов с приборами заливного и динамичного света", en: "8 light totems with wash and dynamic lights" },
  "pkg.medium.eq2": { ru: "Подсветка президиума", en: "Head table illumination" },
  "pkg.medium.eq3": { ru: "Равномерное заполнение площадки светом — без тёмных зон", en: "Even light coverage across the venue — no dark spots" },
  "pkg.big.eq1": { ru: "10 световых тотемов с приборами заливного и динамичного света", en: "10 light totems with wash and dynamic lights" },
  "pkg.big.eq2": { ru: "Подсветка президиума", en: "Head table illumination" },
  "pkg.big.eq3": { ru: "Полное покрытие площадки — ни одной тёмной зоны", en: "Full venue coverage — not a single dark spot" },
  "pkg.maxi.eq1": { ru: "12 световых тотемов с приборами заливного и динамичного света", en: "12 light totems with wash and dynamic lights" },
  "pkg.maxi.eq2": { ru: "Подсветка президиума", en: "Head table illumination" },
  "pkg.maxi.eq3": { ru: "Максимальное покрытие — идеально залитая площадка без тёмных зон", en: "Maximum coverage — perfectly lit venue with no dark spots" },

  // Calculator
  "calc.title1": { ru: "Калькулятор", en: "Cost" },
  "calc.title2": { ru: "стоимости", en: "Calculator" },
  "calc.subtitle": { ru: "Заполните параметры и мы подберём оптимальный пакет", en: "Fill in the details and we'll find the best package" },
  "calc.area": { ru: "Площадь помещения, м²", en: "Venue area, m²" },
  "calc.areaPlaceholder": { ru: "Например, 150", en: "e.g. 150" },
  "calc.guests": { ru: "Количество гостей", en: "Number of guests" },
  "calc.guestsPlaceholder": { ru: "Например, 80", en: "e.g. 80" },
  "calc.hours": { ru: "Длительность, часов", en: "Duration, hours" },
  "calc.format": { ru: "Формат мероприятия", en: "Event format" },
  "calc.formatPlaceholder": { ru: "Выберите формат", en: "Select format" },
  "calc.submit": { ru: "Рассчитать стоимость", en: "Calculate Cost" },

  // Validation
  "val.minArea": { ru: "Минимум 10 м²", en: "Minimum 10 m²" },
  "val.maxArea": { ru: "Максимум 1000 м²", en: "Maximum 1000 m²" },
  "val.minGuests": { ru: "Минимум 1 гость", en: "Minimum 1 guest" },
  "val.maxGuests": { ru: "Максимум 1000 гостей", en: "Maximum 1000 guests" },
  "val.minHours": { ru: "Минимум 1 час", en: "Minimum 1 hour" },
  "val.maxHours": { ru: "Максимум 48 часов", en: "Maximum 48 hours" },
  "val.format": { ru: "Выберите формат", en: "Select format" },

  // Event formats
  "format.wedding": { ru: "Свадьба", en: "Wedding" },
  "format.corporate": { ru: "Корпоратив", en: "Corporate Event" },
  "format.birthday": { ru: "День рождения", en: "Birthday" },
  "format.concert": { ru: "Концерт", en: "Concert" },
  "format.presentation": { ru: "Презентация", en: "Presentation" },
  "format.other": { ru: "Другое", en: "Other" },

  // Results
  "result.yourPackage": { ru: "Ваш пакет:", en: "Your Package:" },
  "result.baseCost": { ru: "базовая стоимость", en: "base cost" },
  "result.operator": { ru: "Оператор света", en: "Light Operator" },
  "result.operatorNote": { ru: "Работа в лайв-режиме", en: "Live operation" },
  "result.hours": { ru: "часов", en: "hours" },
  "result.transport": { ru: "Транспортировка", en: "Transportation" },
  "result.extension": { ru: "Продление", en: "Extension" },
  "result.total": { ru: "Итого", en: "Total" },
  "result.addEffects": { ru: "Дополните ваш пакет спецэффектами", en: "Add special effects to your package" },
  "result.addEffectsDesc": { ru: "Сделайте мероприятие незабываемым — добавьте эффектное шоу", en: "Make your event unforgettable — add a spectacular show" },
  "result.effectsSelected": { ru: "Выбрано эффектов:", en: "Effects selected:" },
  "result.effectsCostNote": { ru: "Точная стоимость будет рассчитана при оформлении заявки.", en: "Exact cost will be calculated when placing the order." },
  "result.effectsManagerNote": { ru: "Всю подробную информацию об спецэффектах уточняйте у менеджера в Telegram (@Angar_audiolight_bot) или по телефону 8-918-076-55-67", en: "For detailed information about special effects, contact the manager on Telegram (@Angar_audiolight_bot) or call 8-918-076-55-67" },
  "result.note": {
    ru: "оператор света и транспортировка оплачиваются отдельно и не входят в базовую стоимость пакета.",
    en: "light operator and transportation are charged separately and not included in the base package price.",
  },
  "result.notePrefix": { ru: "Обратите внимание:", en: "Please note:" },
  "result.extraHourNote": {
    ru: "При продлении мероприятия свыше",
    en: "For events exceeding",
  },
  "result.extraHourNote2": {
    ru: "часов — каждый дополнительный час стоит",
    en: "hours — each additional hour costs",
  },
  "result.request": { ru: "Оставить заявку", en: "Submit Request" },
  "result.recalculate": { ru: "Рассчитать заново", en: "Recalculate" },
  "result.home": { ru: "На главную", en: "Home" },

  // Effects (special effects section)
  "effect.firework.title": { ru: "Дневной веерный салют", en: "Daytime Fan Fireworks" },
  "effect.firework.desc": { ru: "Веерный или прямой, от 25 до 100 залпов. Цвета на выбор.", en: "Fan or straight, from 25 to 100 shots. Colors of your choice." },
  "effect.firework.descShort": { ru: "Веерный или прямой, от 25 до 100 залпов. Цвета есть на выбор.", en: "Fan or straight, from 25 to 100 shots. Colors available." },
  "effect.confetti.title": { ru: "Конфетти", en: "Confetti" },
  "effect.confetti.desc": { ru: "от 8 000 ₽", en: "from 8,000 ₽" },
  "effect.fountains.title": { ru: "Холодные фонтаны", en: "Cold Fountains" },
  "effect.fountains.desc": { ru: "Высота 3–5 м, длительность 30 сек – 1 мин.", en: "Height 3–5 m, duration 30 sec – 1 min." },
  "effect.spinners.title": { ru: "Вертушки из холодных фонтанов", en: "Cold Fountain Spinners" },
  "effect.spinners.desc": { ru: "На одной вертушке помещается до 9 шт, количество определяется заказчиком", en: "One spinner holds up to 9 pcs, quantity determined by customer" },
  "effect.clickToSee": { ru: "Нажмите, чтобы посмотреть пример →", en: "Click to see an example →" },
  "effect.priceFirework": { ru: "от 15 000 ₽", en: "from 15,000 ₽" },
  "effect.priceFountain": { ru: "от 1 200 ₽ / шт", en: "from 1,200 ₽ / pc" },
  "effect.noteManager": { ru: "Уточняйте подробности у менеджера", en: "Contact manager for details" },

  // Cold fountains price list
  "effect.fountain1": { ru: "3 метра 30 секунд — 1 200 ₽", en: "3 meters 30 seconds — 1,200 ₽" },
  "effect.fountain2": { ru: "3 метра 1 минута — 1 500 ₽", en: "3 meters 1 minute — 1,500 ₽" },
  "effect.fountain3": { ru: "5 метров 1 минута — 2 000 ₽", en: "5 meters 1 minute — 2,000 ₽" },

  // Effects section
  "effects.title": { ru: "Спец", en: "Special " },
  "effects.title2": { ru: "эффекты", en: "Effects" },
  "effects.subtitle": { ru: "Дополнительные эффекты для незабываемого шоу", en: "Additional effects for an unforgettable show" },
  "effects.note1": { ru: "В своей работе учитываем пожелания от заказчика, подстраиваем художественный свет для работы фотографов и видеографов", en: "We take customer preferences into account, adjusting artistic lighting for photographers and videographers" },
  "effects.note2p1": { ru: "Используем современный, свой", en: "We use modern, our own" },
  "effects.note2highlight": { ru: "«УНИКАЛЬНЫЙ СТИЛЬ»", en: '"UNIQUE STYLE"' },
  "effects.note2p2": { ru: "оформления сценическим светом", en: "of stage lighting design" },

  // InfoBlocks
  "info.included": { ru: "Что", en: "What's" },
  "info.included2": { ru: "входит", en: "Included" },
  "info.included3": { ru: "в комплект", en: "in the Kit" },
  "info.led": { ru: "LED-приборы", en: "LED Fixtures" },
  "info.ledDesc": { ru: "Wash, beam, spot — под любой формат", en: "Wash, beam, spot — for any format" },
  "info.controller": { ru: "Пульт управления", en: "Control Console" },
  "info.controllerDesc": { ru: "DMX-контроллер для точной настройки", en: "DMX controller for precise tuning" },
  "info.fog": { ru: "Генератор тумана", en: "Fog Machine" },
  "info.fogDesc": { ru: "Для создания объёмных лучей", en: "For creating volumetric beams" },
  "info.soundcheck": { ru: "Саундчек света", en: "Light Soundcheck" },
  "info.soundcheckDesc": { ru: "Настройка под музыку и сцену", en: "Tuning to music and stage" },
  "info.benefits": { ru: "Наши", en: "Our" },
  "info.benefits2": { ru: "преимущества", en: "Advantages" },
  "info.proEquip": { ru: "Профессиональное оборудование", en: "Professional Equipment" },
  "info.proEquipDesc": { ru: "Только проверенные бренды и надёжная техника", en: "Only trusted brands and reliable equipment" },
  "info.delivery": { ru: "Доставка и монтаж", en: "Delivery & Setup" },
  "info.deliveryDesc": { ru: "Привезём, установим и всё подключим", en: "We deliver, install, and connect everything" },
  "info.liveOp": { ru: "Оператор в лайв-режиме", en: "Live Operator" },
  "info.liveOpDesc": { ru: "Живое управление светом под ход мероприятия", en: "Live light control throughout the event" },
  "info.custom": { ru: "Индивидуальная программа", en: "Custom Program" },
  "info.customDesc": { ru: "Световой дизайн по вашему сценарию", en: "Lighting design tailored to your scenario" },

  // FAQ
  "faq.title1": { ru: "Частые", en: "Frequently Asked" },
  "faq.title2": { ru: "вопросы", en: "Questions" },
  "faq.q1": { ru: "Что включено в стоимость пакета?", en: "What's included in the package price?" },
  "faq.a1": { ru: "В стоимость входит аренда светового оборудования на 6 часов. Оператор света, транспортировка и продление оплачиваются отдельно.", en: "The price includes lighting equipment rental for 6 hours. Light operator, transportation, and extensions are charged separately." },
  "faq.q2": { ru: "Можно ли арендовать оборудование без оператора?", en: "Can I rent equipment without an operator?" },
  "faq.a2": { ru: "Оборудование арендовывается только с оператором света для максимального эффекта, и он управляет светом в реальном времени, синхронизируя с программой мероприятия в live-режиме.", en: "Equipment is rented only with a light operator for maximum effect. The operator manages lighting in real-time, synchronizing with the event program live." },
  "faq.q3": { ru: "За сколько дней нужно бронировать?", en: "How far in advance should I book?" },
  "faq.a3": { ru: "Рекомендуем бронировать минимум за 7 дней до мероприятия. В сезон (май–сентябрь) — за 2–3 недели.", en: "We recommend booking at least 7 days before the event. During peak season (May–September) — 2–3 weeks in advance." },
  "faq.q4": { ru: "Можно ли изменить пакет после бронирования?", en: "Can I change the package after booking?" },
  "faq.a4": { ru: "Да, вы можете сделать апгрейд или изменить пакет не позднее, чем за неделю до мероприятия.", en: "Yes, you can upgrade or change the package no later than one week before the event." },
  "faq.q5": { ru: "Работаете ли вы за пределами Краснодарского края?", en: "Do you work outside Krasnodar region?" },
  "faq.a5": { ru: "Мы работаем только по Краснодарскому краю.", en: "We work only within Krasnodar region." },

  // Newsletter
  "news.title1": { ru: "Подпишитесь на", en: "Subscribe to our" },
  "news.title2": { ru: "рассылку", en: "Newsletter" },
  "news.subtitle": { ru: "Новости в сфере сценического света", en: "Stage lighting news" },
  "news.name": { ru: "Ваше имя", en: "Your name" },
  "news.email": { ru: "Ваш e-mail", en: "Your email" },
  "news.subscribe": { ru: "Подписаться", en: "Subscribe" },

  // About
  "about.title": { ru: "О", en: "About" },
  "about.title2": { ru: "нас", en: "Us" },
  "about.desc": {
    ru: "Мы — команда «АНГАР» с опытом более 5 лет. Создаём атмосферу для свадеб, корпоративов, концертов и других мероприятий.\n\nДля нас свет — это не просто техника, а искусство. Мы работаем вживую, чувствуя музыку, настроение зала и каждый момент события. Используем современное оборудование и авторский стиль, чтобы превратить обычное пространство в настоящее световое шоу.\n\nМы делаем свою работу с душой, чтобы ваше событие стало по-настоящему незабываемым.",
    en: "We are team «ANGAR» with over 5 years of experience. We create atmosphere for weddings, corporate events, concerts and other occasions.\n\nFor us, light is not just technology — it's art. We work live, feeling the music, the mood of the venue, and every moment of the event. We use modern equipment and our signature style to transform ordinary spaces into a real light show.\n\nWe do our work with passion, so your event becomes truly unforgettable.",
  },
  "about.events": { ru: "Мероприятий", en: "Events" },
  "about.experience": { ru: "Опыт работы", en: "Experience" },
  "about.years": { ru: "5 лет", en: "5 years" },
  "about.satisfaction": { ru: "Довольных клиентов", en: "Satisfied clients" },

  // Final CTA
  "cta.title1": { ru: "Готовы создать", en: "Ready to create an" },
  "cta.title2": { ru: "незабываемое", en: "unforgettable" },
  "cta.title3": { ru: "событие?", en: "event?" },
  "cta.desc": { ru: "Рассчитайте стоимость за 30 секунд или свяжитесь с нами для консультации", en: "Calculate the cost in 30 seconds or contact us for a consultation" },
  "cta.calculate": { ru: "Рассчитать стоимость", en: "Calculate Cost" },
  "cta.telegram": { ru: "Написать в Telegram", en: "Message on Telegram" },

  // Custom result
  "custom.title1": { ru: "Нужен", en: "Need a" },
  "custom.title2": { ru: "индивидуальный", en: "Custom" },
  "custom.title3": { ru: "расчёт", en: "Quote" },
  "custom.desc": { ru: "Ваши параметры выходят за рамки стандартных пакетов. Свяжитесь с нами для персонального расчёта стоимости.", en: "Your parameters are beyond our standard packages. Contact us for a personalized quote." },
  "custom.telegram": { ru: "Написать в Telegram", en: "Message on Telegram" },
  "custom.recalculate": { ru: "Рассчитать заново", en: "Recalculate" },
  "custom.home": { ru: "На главную", en: "Home" },

  // Request form
  "request.title1": { ru: "Оставить", en: "Submit a" },
  "request.title2": { ru: "заявку", en: "Request" },
  "request.subtitle": { ru: "Заполните форму и мы свяжемся с вами для подтверждения деталей", en: "Fill in the form and we'll contact you to confirm the details" },
  "request.name": { ru: "Ваше имя", en: "Your name" },
  "request.namePlaceholder": { ru: "Иван", en: "John" },
  "request.contact": { ru: "Телефон или Telegram", en: "Phone or Telegram" },
  "request.contactPlaceholder": { ru: "+7 (999) 123-45-67 или @username", en: "+7 (999) 123-45-67 or @username" },
  "request.date": { ru: "Дата мероприятия", en: "Event date" },
  "request.address": { ru: "Адрес площадки", en: "Venue address" },
  "request.addressPlaceholder": { ru: "Москва, ул. Пример, д. 1", en: "123 Main St, City" },
  "request.comment": { ru: "Комментарий", en: "Comment" },
  "request.commentPlaceholder": { ru: "Дополнительные пожелания...", en: "Additional requests..." },
  "request.submit": { ru: "Отправить заявку", en: "Submit Request" },
  "request.sending": { ru: "Отправка...", en: "Sending..." },
  "request.success": { ru: "Заявка отправлена!", en: "Request sent!" },
  "request.successDesc": { ru: "Мы свяжемся с вами в ближайшее время.", en: "We'll contact you shortly." },
  "request.error": { ru: "Ошибка отправки", en: "Sending error" },
  "request.errorDesc": { ru: "Попробуйте ещё раз или напишите нам в Telegram.", en: "Please try again or message us on Telegram." },

  // Validation messages for request form
  "val.name": { ru: "Введите имя", en: "Enter your name" },
  "val.contact": { ru: "Введите телефон или Telegram", en: "Enter phone or Telegram" },
  "val.date": { ru: "Укажите дату", en: "Select a date" },
  "val.address": { ru: "Укажите адрес площадки", en: "Enter venue address" },

  // Calendar / booking
  "cal.pickDate": { ru: "Выберите дату", en: "Pick a date" },
  "cal.booked": { ru: "Занято", en: "Booked" },
  "cal.pending": { ru: "Ожидает", en: "Pending" },
  "cal.free": { ru: "Свободно", en: "Available" },
  "cal.dateBooked": { ru: "Эта дата уже занята.", en: "This date is already booked." },
  "cal.datePending": { ru: "На эту дату уже есть заявка.", en: "This date has a pending request." },
  "cal.legend": { ru: "Статус дат:", en: "Date status:" },
  "cal.hasSolution": { ru: "Есть решение!", en: "We have a solution!" },
  "cal.solutionDesc": { ru: "Наши коллеги готовы помочь вам с этой датой:", en: "Our colleagues are ready to help you with this date:" },
  "cal.solutionNote": { ru: "Когда дозвонитесь — обязательно скажите, что вы от команды «Ангар»", en: "When you call — make sure to say you're from the \"Angar\" team" },
  "cal.callColleague": { ru: "Связаться", en: "Call" },
  "cal.closeSolution": { ru: "Закрыть", en: "Close" },

  // Footer
  "footer.rights": { ru: "© 2026 Все права защищены", en: "© 2026 All rights reserved" },
  "footer.legal": { ru: "Пользовательское соглашение и оферта", en: "Terms of Service & Public Offer" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" ? "en" : "ru") as Lang;
  });

  const changeLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[key]?.[lang] ?? key,
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
