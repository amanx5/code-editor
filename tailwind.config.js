/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				// override the default mono font family that tailwind applies on code, kbd, samp, pre
				mono: [
					'Source Code Pro',
					'Fira Code',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace',
				],
			},
			colors: {
				text: {
					muted: '#475569',
					primary: 'blueviolet',
				},
				surface: {
					code: '#fbfbfb',
					codeHighlight: '#fffbe6',
					muted: '#f6f7f9',
				},
				outline: {
					subtle: '#e2e8f0',
					dominant: 'black',
				},
			},
		},
	},
	corePlugins: {
		preflight: false, // ❗ disable global resets
	},
	plugins: [
		function ({ addUtilities, theme }) {
			addUtilities({
				'.wrap-anywhere': {
					'overflow-wrap': 'anywhere',
				},
			});
		},
	],
};
