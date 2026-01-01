const {preset} = require('code-editor/tailwind-config');

/**
 * Tailwind config for the demo app
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	presets: [
		preset, // preset for code-editor
	],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/code-editor/**/*.{js,ts,jsx,tsx}', // files from code-editor
	],
	theme: {
		extend: {
			colors: {
				text: {
					muted: '#475569',
					primary: 'blueviolet',
				},
				surface: {
					muted: '#f6f7f9',
				},
				outline: {
					subtle: '#e2e8f0',
					dominant: 'black',
				},
			},

			height: {
				header: '56px',
			},

			inset: {
				belowHeader: '56px',
			},

			spacing: {
				pageY: '48px',
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			addUtilities({
				'.w-controlled': {
					width: '100%',
					maxWidth: theme('maxWidth.screen-xl'),
				},
				'.px-controlled': {
					...px(6),
					'@screen md': px(8),
					'@screen lg': px(10),
					'@screen 2xl': px(0),
				},
			});

			function px(n) {
				return {
					paddingLeft: theme(`spacing.${n}`),
					paddingRight: theme(`spacing.${n}`),
				};
			}
		},
	],
};
