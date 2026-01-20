/**
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * This is deliberately kept in same file for ease in development as Tailwind intellisense doesn't refresh on external file changes
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
			},

			backgroundColor: {
				ceMarkupLine: {
					error: '#fee2e2',
					highlight: '#fffbdd',
				},
				ceScroller: 'white',
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
	presets: [preset],
};
