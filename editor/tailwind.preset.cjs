/** 
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * @type {import('tailwindcss').Config} 
 */
module.exports = {
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
