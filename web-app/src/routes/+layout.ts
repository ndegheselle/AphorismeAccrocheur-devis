import { loadTranslations } from '$lib/translations';
import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import auth from '$lib/stores/auth.svelte';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({url}) => {
  const initialLocale = 'fr'; // get from cookie / url / fetch from server...
  await loadTranslations(initialLocale); // keep this just before the `return`
  if (!auth.isConnected && url.pathname !== '/user/login') {
    throw redirect(302, '/user/login');
  }

  return {};
};