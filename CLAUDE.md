# RIBA Lab — Claude notes

**Проект:** интернет-магазин варенья ручной работы из Израиля.  
**Дизайн-эталон:** `~/Desktop/riba-lab-combined.html` — финальный HTML-макет, на него ориентируемся при переносе.

---

## Стек

| Слой | Технология |
|---|---|
| Фреймворк | Next.js 15, App Router, React Server Components |
| Язык | TypeScript (strict) |
| Стили | Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first via `@theme`) |
| Локализация | next-intl v4 — `he` (RTL, иврит, **default**) + `ru` |
| Компоненты | shadcn/ui (установлен, `components.json` в корне) |
| Иконки | lucide-react |
| БД/Auth | Supabase (запланировано) |
| Деплой | Vercel (запланировано) |

---

## Брендгайд — Berry Sorbet

### Основная палитра

| Tailwind-токен | Hex | Применение |
|---|---|---|
| `cream` | `#FDF7F2` | фон страницы |
| `plum` | `#2D1B2E` | основной текст, заголовки |
| `berry` | `#C9305A` | акцент, CTA-кнопки, ссылки |
| `lavender` | `#A88DBF` | вторичный акцент |
| `blush` | `#E8B7C5` | нежные фоны, hover-состояния |
| `gold` | `#C9A045` | premium-элементы, badges |
| `leaf` | `#7A9B7E` | свежесть, эко-метки |

### Расширенная палитра (из HTML-эталона, есть в `@theme`)

```
cream-2 #F7EEE5   cream-3 #EFE3D6
plum-2  #4A2E4D   plum-3  #6B4870
berry-2 #E04D77   berry-light #F5A8BD   berry-pale #FCE4EC
lavender-2 #C2ACD6   lavender-pale #F2EAF7
gold-light #E5C76B
leaf-dark #4A6B4F   leaf-pale #E8F0E5
muted #8B7484
```

### Шрифты

| Переменная | Шрифт | Использование |
|---|---|---|
| `font-serif` / `--font-marcellus` | Marcellus | Заголовки h1–h3 |
| `font-sans` / `--font-dm-sans` | DM Sans | Тело текста, UI |
| `--font-hebrew` | Noto Sans Hebrew | RTL-текст (иврит, автоматически через `body[dir="rtl"]`) |

---

## Локализация

- Маршруты: `/he/*` (RTL, иврит, по умолчанию) и `/ru/*` (LTR, русский)
- Middleware автоматически редиректит `/` → `/he`
- `<html lang="he" dir="rtl">` / `<html lang="ru" dir="ltr">` — устанавливается в root layout через `getLocale()`
- Переводы: `messages/he.json`, `messages/ru.json`

---

## Конвенции кода

- **Server Components** везде где нет интерактивности (`"use client"` только по необходимости)
- **RTL-aware Tailwind utilities:** использовать логические свойства:
  - `ms-*` / `me-*` вместо `ml-*` / `mr-*` (margin-inline-start/end)
  - `ps-*` / `pe-*` вместо `pl-*` / `pr-*` (padding-inline-start/end)
  - `start-*` / `end-*` вместо `left-*` / `right-*` (для `position`)
  - `text-start` / `text-end` вместо `text-left` / `text-right`
- Кастомные токены через `cn()` из `lib/utils.ts` (clsx + tailwind-merge)
- Gettext-переводы через `getTranslations()` (server) или `useTranslations()` (client)

---

## Структура файлов

```
app/
  [locale]/
    layout.tsx     # NextIntlClientProvider + getMessages()
    page.tsx       # главная страница (локализованная)
  globals.css      # @theme с Berry Sorbet токенами + shadcn CSS vars
  layout.tsx       # root layout: шрифты, getLocale() → lang/dir на <html>
  page.tsx         # fallback redirect → /he
components/
  ui/              # shadcn компоненты (добавляются через npx shadcn add ...)
i18n/
  routing.ts       # defineRouting (locales, defaultLocale)
  request.ts       # getRequestConfig — загружает messages по локали
lib/
  utils.ts         # cn() для shadcn
messages/
  he.json          # переводы иврит (nav, home, lang, site)
  ru.json          # переводы русский
middleware.ts      # next-intl locale routing
components.json    # shadcn конфиг
global.d.ts        # declare module '*.css' для TS
```

---

## Секции дизайн-эталона (riba-lab-combined.html)

1. **Lang modal** — попап выбора языка при первом заходе
2. **Nav** — фиксированный navbar: логотип (с дропдауном) + nav-links + иконки (поиск, корзина, профиль)
3. **Hero** — ambient blobs + emoji-частицы `floatUp` + CTA
4. **Products grid** — карточки товаров
5. **About / Story** — секция о бренде
6. **Footer**

Signature визуал: анимированные `.amb-blob` (`filter: blur 80px`) + floating emoji-частицы.

---

## Статус

- [x] Next.js 15 + TypeScript, ESLint (flat config)
- [x] Tailwind v4 — Berry Sorbet токены в `@theme`, shadcn CSS vars в `@layer base`
- [x] Google Fonts: Marcellus, DM Sans, Noto Sans Hebrew
- [x] next-intl v4: `middleware.ts`, `i18n/routing.ts`, `i18n/request.ts`
- [x] `lang`/`dir` динамически через `getLocale()` в root layout
- [x] `messages/he.json` + `messages/ru.json` — базовые ключи
- [x] shadcn/ui scaffold: `lib/utils.ts`, `components.json`, зависимости
- [x] Билд чистый ✓
- [ ] Компоненты: Navbar, Lang modal, Hero, ProductCard, Footer
- [ ] Перенос дизайна из `riba-lab-combined.html`
- [ ] Supabase интеграция
