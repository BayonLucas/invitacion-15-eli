/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				// Definimos "elegant" como el nombre de nuestra clase de Tailwind
				'elegant': ['"Playfair Display"', 'serif'],
				// '--fuente-1': ['"Parisienne"', 'cursive'],
				// '--fuente-2': ['"Playfair Display"', 'serif'],
			},
			colors: {
				// '--color-1': '#817266',
				// '--color-2': '#BAA67C',
				// '--color-3': '#7CA097',
				// '--color-4': '#C6D7CF',
				// '--color-5': '#FFFCF8',
				// '--color-6': '#A86B1D',
				// '--color-7': '#F7E586',
				// '--color-8': '#E6B64B',
				// '--color-9': '#E5E9D0',
			}
			// '--grosor-fuente-regular': 400,
    		// '--grosor-fuente-bold': 700,
		},
	},
	plugins: [],
}