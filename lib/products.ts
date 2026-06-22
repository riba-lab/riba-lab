export type FlavorType = 'spice' | 'sweet' | 'sour' | 'tart' | 'veg' | 'herbs';
export type FlavorLevel = 1 | 2 | 3;
export type Locale = 'he' | 'ru';

export interface Flavor {
  type: FlavorType;
  level: FlavorLevel;
}

export interface Product {
  id: number;
  emoji: string;
  cat: string;
  price: number;
  lim: boolean;
  isNew: boolean;
  stock: number;
  total: number;
  coll: Record<Locale, string>;
  name: Record<Locale, string>;
  desc: Record<Locale, string>;
  flavors: Flavor[];
}

export interface Collection {
  id: string;
  icon: string;
  year: number;
  name: Record<Locale, string>;
  sub: Record<Locale, string>;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'jul25', icon: '🌞', year: 2025,
    name: { ru: 'Июль',     he: 'יולי'    },
    sub:  { ru: 'Клубника, малина, персик', he: 'תות, פטל, אפרסק' },
  },
  {
    id: 'aug25', icon: '🌴', year: 2025,
    name: { ru: 'Август',   he: 'אוגוסט'  },
    sub:  { ru: 'Манго, маракуйя, инжир',  he: 'מנגו, פסיפלורה, תאנה' },
  },
  {
    id: 'sep25', icon: '🍇', year: 2025,
    name: { ru: 'Сентябрь', he: 'ספטמבר' },
    sub:  { ru: 'Виноград, гранат, инжир', he: 'ענבים, רימון, תאנה' },
  },
  {
    id: 'oct25', icon: '🍂', year: 2025,
    name: { ru: 'Октябрь',  he: 'אוקטובר' },
    sub:  { ru: 'Lab Edition · эксперименты', he: 'Lab Edition · ניסויים' },
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1, emoji: '🫐', cat: 'sep25', price: 89,  lim: true,  isNew: false, stock: 48, total: 50,
    coll: { ru: 'Сентябрь · 2025', he: 'ספטמבר · 2025' },
    name: { ru: 'Черничная ночь',   he: 'ליל אוכמניות'  },
    desc: { ru: 'Дикая черника с лавандой и ванилью.', he: 'אוכמניות בר עם לבנדר וניל.' },
    flavors: [{ type: 'sweet', level: 2 }, { type: 'sour', level: 1 }, { type: 'herbs', level: 3 }, { type: 'veg', level: 2 }],
  },
  {
    id: 2, emoji: '🥭', cat: 'aug25', price: 120, lim: true,  isNew: true,  stock: 7,  total: 30,
    coll: { ru: 'Август · 2025',    he: 'אוגוסט · 2025' },
    name: { ru: 'Манго-маракуйя Lab', he: 'מנגו-פסיפלורה' },
    desc: { ru: 'Экзотический дует с морской солью.', he: 'דואט אקזוטי עם מלח ים.' },
    flavors: [{ type: 'sweet', level: 3 }, { type: 'sour', level: 2 }, { type: 'veg', level: 1 }],
  },
  {
    id: 3, emoji: '🍓', cat: 'jul25', price: 75,  lim: false, isNew: true,  stock: 34, total: 60,
    coll: { ru: 'Июль · 2025',      he: 'יולי · 2025'   },
    name: { ru: 'Малиновый закат',  he: 'שקיעת פטל'     },
    desc: { ru: 'Малина с розовым перцем и тимьяном.', he: 'פטל עם פלפל ורוד ותימין.' },
    flavors: [{ type: 'sweet', level: 2 }, { type: 'sour', level: 2 }, { type: 'spice', level: 1 }, { type: 'herbs', level: 2 }],
  },
  {
    id: 4, emoji: '🌹', cat: 'oct25', price: 145, lim: true,  isNew: false, stock: 0,  total: 20,
    coll: { ru: 'Октябрь · 2025 · Lab', he: 'אוקטובר · 2025' },
    name: { ru: 'Розовый перец & Инжир', he: 'פלפל ורוד ותאנה' },
    desc: { ru: 'Смелый эксперимент с розмарином.', he: 'ניסוי נועז עם רוזמרין.' },
    flavors: [{ type: 'tart', level: 2 }, { type: 'spice', level: 2 }, { type: 'sweet', level: 1 }, { type: 'herbs', level: 3 }],
  },
  {
    id: 5, emoji: '🍓', cat: 'jul25', price: 82,  lim: false, isNew: false, stock: 52, total: 60,
    coll: { ru: 'Июль · 2025',      he: 'יולי · 2025'   },
    name: { ru: 'Клубника & Базилик', he: 'תות ובזיליקום' },
    desc: { ru: 'Итальянское сочетание классики лета.', he: 'שילוב איטלקי קלאסי.' },
    flavors: [{ type: 'sweet', level: 3 }, { type: 'sour', level: 1 }, { type: 'herbs', level: 3 }, { type: 'veg', level: 2 }],
  },
  {
    id: 6, emoji: '🍯', cat: 'sep25', price: 135, lim: true,  isNew: true,  stock: 11, total: 15,
    coll: { ru: 'Сентябрь · 2025',  he: 'ספטמבר · 2025' },
    name: { ru: 'Инжир & Мёд из Галилеи', he: 'תאנה ודבש הגליל' },
    desc: { ru: 'Спелый инжир с мёдом из Галилеи.', he: 'תאנה בשלה עם דבש מהגליל.' },
    flavors: [{ type: 'sweet', level: 3 }, { type: 'tart', level: 2 }, { type: 'veg', level: 1 }],
  },
];
