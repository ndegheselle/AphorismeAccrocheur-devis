import { loadTranslations } from '$lib/translations';
import auth from '$lib/stores/auth.svelte';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url }) => {
  const currentPath = url.pathname;

  const initialLocale = 'fr'; // get from cookie / url / fetch from server...
  await loadTranslations(initialLocale); // keep this just before the `return`
  // Check if the user is logged in
  if (!auth.isConnected && currentPath !== '/user/login') {
    redirect(302, '/user/login');
    return;
  }

  return {};
};