import auth from '$lib/stores/auth.svelte';
import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment'; 

/** @type {import('@sveltejs/kit').Load} */
export const load = async () => {
  if (browser && !auth.isConnected && await auth.getCurrentUser() == null) {
    throw redirect(302, '/user/login');
  }
  return {};
};