# RIBA Lab — Claude notes

Проект: интернет-магазин варенья RIBA Lab (Израиль).

## Стек

- **Next.js 15** — App Router, RSC
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-first конфигурация (`@import "tailwindcss"` + `tailwind.config.ts`)
- **next-intl v4** — локализация; `he` (иврит, RTL) по умолчанию, `ru` вторичный
- **shadcn/ui** — компонентная библиотека (нужно установить)
- **Google Fonts**: Marcellus (заголовки, serif) + DM Sans (текст, sans) + Noto Sans Hebrew (иврит RTL)
- **В будущем**: Supabase (БД + auth), Vercel (деплой)

## Брендгайд — Berry Sorbet

### Цвета (CSS-переменные и Tailwind-токены)

| Токен       | Hex       | Применение                          |
|-------------|-----------|-------------------------------------|
| `cream`     | `#FDF7F2` | фон страницы                        |
| `plum`      | `#2D1B2E` | основной текст, заголовки           |
| `berry`     | `#C9305A` | акцент, CTA, ссылки                 |
| `lavender`  | `#A88DBF` | вторичный акцент                    |
| `blush`     | `#E8B7C5` | нежные фоны, hover                  |
| `gold`      | `#C9A045` | premium-элементы, badges            |
| `leaf`      | `#7A9B7E` | свежесть, эко-метки                 |

Расширенная палитра из дизайн-эталона (`riba-lab-combined.html`):
- `--cream-2: #F7EEE5`, `--cream-3: #EFE3D6`
- `--plum-2: #4A2E4D`, `--plum-3: #6B4870`
- `--berry-2: #E04D77`, `--berry-light: #F5A8BD`, `--berry-pale: #FCE4EC`
- `--lavender-2: #C2ACD6`, `--lavender-pale: #F2EAF7`
- `--gold-light: #E5C76B`
- `--leaf-dark: #4A6B4F`, `--leaf-pale: #E8F0E5`
- `--muted: #8B7484`, `--border: rgba(45,27,46,0.10)`

### Типографика

- `font-serif` → Marcellus (заголовки h1/h2/h3)
- `font-sans` → DM Sans (body, UI)
- `var(--font-hebrew)` → Noto Sans Hebrew (RTL, автоматически для `dir="rtl"`)

## Структура файлов

```
app/
  [locale]/
    layout.tsx     # устанавливает dir/lang, NextIntlClientProvider
    page.tsx       # главная страница (локализованная)
  globals.css      # @import "tailwindcss", CSS-переменные
  layout.tsx       # root layout, шрифты, metadata
  page.tsx         # редирект-заглушка (/ → /he через middleware)
i18n/
  request.ts       # getRequestConfig — загружает messages по локали
messages/
  he.json          # переводы иврит
  ru.json          # переводы русский
middleware.ts      # next-intl locale routing (НУЖНО СОЗДАТЬ)
components/        # shadcn/ui + кастомные компоненты (НУЖНО СОЗДАТЬ)
tailwind.config.ts # цвета и шрифты Berry Sorbet
```

## Дизайн-эталон

Файл: `/Users/a.s./Desktop/riba-lab-combined.html`

Ключевые секции из HTML-эталона:
1. **Lang modal** — модальный попап выбора языка при первом заходе
2. **Nav** — фиксированный navbar: логотип + выпадающее меню + ссылки + иконки (поиск, корзина, профиль)
3. **Hero** — главный баннер с ambient blobs + floating particles + CTA
4. **Products grid** — карточки товаров (варенье, джемы)
5. **About / Story** — секция "о бренде"
6. **Footer**

Ambient background: анимированные `amb-blob` (filter: blur 80px) + emoji-частицы `floatUp` — это signature визуал бренда.

## Локализация

- Маршруты: `/he/*` (RTL, иврит, default), `/ru/*` (LTR, русский)
- `middleware.ts` должен перенаправлять `/` → `/he`
- `<html lang="he" dir="rtl">` / `<html lang="ru" dir="ltr">` — устанавливается в `[locale]/layout.tsx`
- RTL: `dir="rtl"` на `<html>`, Noto Sans Hebrew автоматически через CSS `body[dir="rtl"]`

## Статус проекта

- [x] Next.js 15 + TypeScript инициализирован
- [x] Tailwind v4 настроен — Berry Sorbet токены в `@theme` в `globals.css`
- [x] Google Fonts (Marcellus, DM Sans, Noto Sans Hebrew)
- [x] next-intl v4 — `middleware.ts` + `i18n/routing.ts` + `i18n/request.ts`
- [x] `app/[locale]/` routing: `/he` (RTL) и `/ru` (LTR), статически сгенерированы
- [x] `lang`/`dir` на `<html>` динамически через `getLocale()` в root layout
- [x] `messages/he.json` и `messages/ru.json` наполнены базовыми ключами
- [x] shadcn/ui scaffold: `lib/utils.ts`, `components.json`, зависимости установлены
- [x] ESLint исправлен (Next.js flat config)
- [x] Билд чистый ✓
- [ ] Компоненты: Navbar, Hero, ProductCard, Footer
- [ ] Перенос дизайна из `riba-lab-combined.html`
- [ ] Supabase интеграция
