/** 
 * Tailwing config for generating the standalone css file for non tailwind users
 * @type {import('tailwindcss').Config} 
 */
module.exports = {
	presets: [require('./tailwind.preset.cjs')],
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
