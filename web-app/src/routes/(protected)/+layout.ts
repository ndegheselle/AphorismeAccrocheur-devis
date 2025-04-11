import auth from '$lib/stores/auth.svelte';
import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load = async () => {
  if (!auth.isConnected) {
    throw redirect(302, '/user/login');
  }

  return {};
};