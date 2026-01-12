/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Definimos "elegant" como el nombre de nuestra clase de Tailwind
				'elegant': ['"Playfair Display"', 'serif'],
			},
		},
	},
	plugins: [],
}