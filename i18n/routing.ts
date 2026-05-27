import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['he', 'ru'] as const,
  defaultLocale: 'he',
  localeDetection: false,
});
