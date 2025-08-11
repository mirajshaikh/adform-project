/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	build: {
		chunkSizeWarningLimit: 1500, // Warn if any chunk exceeds 1000KB (1MB)
	},
	plugins: [react(), tailwindcss()],
});
