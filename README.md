# Stage Light Calculator

Готовый prompt для вставки в Lovable

Сделай современный адаптивный сайт-калькулятор по подбору сценического света для мероприятий. Сайт должен быть в тёмном премиальном стиле, mobile-first, на React + Tailwind. На главном экране покажи заголовок “Подбор сценического света для мероприятий”, подзаголовок, кнопку “Рассчитать стоимость” и 4 карточки пакетов: MINI, MEDIUM, BIG, MAXI. Для каждого пакета укажи параметры: MINI — до 130 м² и до 50 гостей, 38 000 ₽; MEDIUM — до 180 м² и до 80 гостей, 48 000 ₽; BIG — до 220 м² и до 100 гостей, 70 000 ₽; MAXI — до 250 м² и до 140 гостей, 90 000 ₽. Все цены — за 6 часов. Сделай калькулятор с полями: площадь помещения, количество гостей, длительность мероприятия в часах, формат мероприятия. После отправки формы сайт должен автоматически подбирать минимально подходящий пакет, а если параметры выходят за лимиты — показывать сообщение, что нужен индивидуальный расчёт. На экране результата покажи название пакета, крупное фото подходящего комплекта, базовую стоимость пакета, стоимость оператора света отдельной строкой (12 000 ₽ за 6 часов, оператор работает в лайв-режиме), транспортировку отдельной строкой (3 000 ₽), продление после 6 часов отдельной строкой (5 000 ₽ за каждый дополнительный час), и итоговую стоимость по формуле: пакет + 12 000 + 3 000 + доп.часы × 5 000. Отдельно покажи пояснение, что оператор и транспортировка не входят в базовую стоимость пакета. Добавь кнопки “Оставить заявку”, “Рассчитать заново”, “Связаться в Telegram”. Ниже сделай форму заявки с полями: имя, телефон или Telegram, дата мероприятия, адрес площадки, комментарий. Добавь блок “Что входит”, блок преимуществ, FAQ и финальный CTA. Сделай интерфейс чистым, понятным, продающим, с крупными кнопками и удобным мобильным UX.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://stage-light-buddy.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4102aa27-02d8-42bb-90f7-b4cdb6e4e2d5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
