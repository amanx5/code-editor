/**
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * @type {import('tailwindcss').Config}
 */
const preset = {
	safelist: [
		{
			pattern: /ce-token-[\w-]+/,
		},
	],
	theme: {
		extend: {
			animation: {
				'ce-caret': 'ce-caret 1.5s steps(1, end) infinite',
			},
			keyframes: {
				'ce-caret': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
			},
			colors: {
				'ce-text': {
					muted: '#475569',
					primary: 'blueviolet',
				},
				'ce-bg': {
					root: '#FFFFFF',
					error: '#fee2e2',
					highlight: '#fffbdd',
					muted: '#f6f7f9',
					toolbar: '#f6f8fa',
				},
				'ce-border': {
					subtle: '#e2e8f0',
					dominant: 'black',
				},
				'ce-token': {
					string: '#A31515', // deep brick red
					number: '#098658', // strong green
					boolean: '#0550AE', // rich blue
					null: '#0550AE', // same as boolean
					punctuation: '#1F2937', // near-black gray
					whitespace: '#9CA3AF', // soft gray (optional)
					unknown: '#B91C1C', // error red
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
				'.ce-content-wrap': {
					whiteSpace: 'pre-wrap',
					overflowWrap: 'anywhere',
				},
				'.ce-content-pd': {
					paddingLeft: theme('padding.6'),
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
