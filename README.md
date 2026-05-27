# RIBA Lab

Интернет-магазин варенья RIBA Lab из Израиля.

## Текущий стек

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- `next-intl` для локализации
- шрифты Google: Marcellus + DM Sans
- RTL-поддержка для иврита
- Планы: Supabase и деплой на Vercel

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Локализация

Поддерживаются:

- `he` — иврит, язык по умолчанию
- `ru` — русский

Файлы переводов находятся в `messages/he.json` и `messages/ru.json`.

## Структура

- `app/layout.tsx` — глобальная раскладка и глобальные шрифты
- `app/page.tsx` — заглушка с выбором языка
- `app/[locale]/layout.tsx` — провайдер `next-intl`
- `app/[locale]/page.tsx` — локализованная страница

## Примечания

- Цвета проекта уже заданы в `app/globals.css`.
- `CLAUDE.md` содержит ориентиры для дальнейшей работы с проектом.
