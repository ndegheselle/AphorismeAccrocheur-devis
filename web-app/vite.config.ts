import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
        host: "0.0.0.0",
        port: 80,
        watch: {
            usePolling: true
        }
    },
});
