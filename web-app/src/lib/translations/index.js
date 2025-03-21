import i18n from 'sveltekit-i18n';
import lang from './lang.json';

// XXX : Setup multiples json files per routes : https://github.com/sveltekit-i18n/lib
/** @type {import('sveltekit-i18n').Config} */
const config = ({
  translations: {
    fr: { lang },
  },
  loaders: [
    {
      locale: 'fr',
      key: 'common',
      loader: async () => (
        await import('./fr/common.json')
      ).default,
    },
    {
      locale: 'fr',
      key: 'navigation',
      loader: async () => (
        await import('./fr/navigation.json')
      ).default,
    },
    {
      locale: 'fr',
      key: 'user',
      loader: async () => (
        await import('./fr/user.json')
      ).default,
    }
  ]
});

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);