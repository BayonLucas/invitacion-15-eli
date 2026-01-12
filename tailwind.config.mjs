export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'quince-gold': '#D4AF37',
				'quince-pink': '#FFB6C1',
			},
			fontFamily: {
				'serif-elegant': ['"Playfair Display"', 'serif'],
			}
		},
	},
	plugins: [],
}