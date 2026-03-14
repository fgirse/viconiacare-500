import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'en', 'tr', 'ru', 'uk'],
  defaultLocale: 'de',
  localePrefix: 'as-needed', // de has no prefix, others get /en, /tr etc.
})
