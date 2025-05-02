import { browser } from '$app/environment';
import { loadTranslations } from '$lib/translations';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url }) => {

  if (browser && url.pathname === '/') {
      throw redirect(302, '/estimates');
  }

  const initialLocale = 'fr'; // get from cookie / url / fetch from server...
  await loadTranslations(initialLocale); // keep this just before the `return`
  return {};
};