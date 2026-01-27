const { presets } = require('code-editor/tailwind-config');

/**
 * Tailwind preset for consumers that already have Tailwind CSS configured.
 * @type {import('tailwindcss').Config}
 */
const preset = {
	theme: {
		extend: {
			textColor: {
				cwStatusBarItem: {
					normal: '#3b3b3b',
					hover: '#000000',
				},
				cwToolbarItem: {
					normal: '#3b3b3b',
					hover: '#000000',
				},
			},

			backgroundColor: {
				cwRoot: '#f8f8f8',
				cwStatusBarItem: {
					hover: '#1f1f1f12',
				},
				cwToolbarItem: {
					hover: '#1f1f1f12',
				},
			},

			borderColor: {
				cwPanel: '#e5e5e5',
			},
		},
	},
};

/**
 * Tailwind config for generating the standalone css file for non tailwind users
 * and for intellisense in this project
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	presets: [...presets, preset],
};
