import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	optimizeDeps: {
		exclude: ['code-editor'],
	},
	server: {
		host: true,
		port: 5174,
	},
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
	],
});
