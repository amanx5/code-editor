/**
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * @type {import('tailwindcss').Config}
 */
const preset = {
	safelist: [
		{
			pattern: /ceMarkupToken-[\w-]+/,
		},
	],
	theme: {
		extend: {
			animation: {
				ceCaret: 'ceCaret 1.5s steps(1, end) infinite',
			},

			keyframes: {
				ceCaret: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
			},
			
			textColor: {
				ceMarkupToken: {
					string: '#A31515', // deep brick red
					number: '#098658', // strong green
					boolean: '#0550AE', // rich blue
					null: '#0550AE', // same as boolean
					punctuation: '#1F2937', // near-black gray
					whitespace: '#9CA3AF', // soft gray (optional)
					unknown: '#B91C1C', // error red
				},
				ceStatusBarItem: {
					normal: '#3b3b3b',
					hover: '#000000',
				},
				ceToolbarItem: {
					normal: '#3b3b3b',
					hover: '#000000',
				},
			},

			backgroundColor: {
				ceRoot: '#f8f8f8',
				ceBody: 'white',
				ceMarkupLine: {
					error: '#fee2e2',
					highlight: '#fffbdd',
				},
				ceStatusBarItem: {
					hover: '#1f1f1f12',
				},
				ceToolbarItem: {
					hover: '#1f1f1f12',
				},
			},

			borderColor: {
				cePanel: '#e5e5e5',
			},
		},
	},
	plugins: [
		function ({ addUtilities, theme }) {
			addUtilities({
				'.ceContent': {
					fontFamily: `Source Code Pro,Consolas,Menlo,DejaVu Sans Mono,monospace`,
					fontSize: theme('fontSize.sm'),
					lineHeight: theme('lineHeight.6'),
					minHeight: theme('lineHeight.6'),
				},
				'.wrap-anywhere': {
					overflowWrap: 'anywhere',
				},
			});
		},
	],
};

/**
 * Tailwind config for generating the standalone css file for non tailwind users
 * and for intellisense in this project
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	preset, // for consumers requiring this file via 'code-editor/tailwind-config'
	presets: [preset],
};
