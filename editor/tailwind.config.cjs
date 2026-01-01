/**
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * @type {import('tailwindcss').Config}
 */
const preset = {
	theme: {
		extend: {
			colors: {
				'ce-text': {
					muted: '#475569',
					primary: 'blueviolet',
				},
				'ce-bg': {
					root: '#FFFFFF',
					header: '#f6f8fa',
					highlight: '#fffbdd',
					muted: '#f6f7f9',
				},
				'ce-border': {
					subtle: '#e2e8f0',
					dominant: 'black',
				},
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			addUtilities({
				'.ce-content': {
					fontFamily: `Source Code Pro,Consolas,Menlo,DejaVu Sans Mono,monospace`,
					fontSize: theme('fontSize.sm'),
					lineHeight: theme('lineHeight.6'),
					minHeight: theme('lineHeight.6'),
				},
				'.wrap-anywhere': {
					'overflow-wrap': 'anywhere',
				},
			});
		},
	],
};

/**
 * Tailwind config for generating the standalone css file for non tailwind users
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	preset, // for consumers requiring this file via 'code-editor/tailwind-config'
	presets: [preset],
};
