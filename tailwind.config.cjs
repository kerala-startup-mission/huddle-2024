/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'sans': ['Lato', 'ui-sans-serif', 'system-ui', '-apple-system'],
			'heading' : ['selimaregular', 'ui-sans-serif', 'system-ui', '-apple-system'],
			'spl' : ['tajur_puncakregular', 'ui-sans-serif', 'system-ui', '-apple-system']
		},
		extend: {
			colors: {
				'huddle': '#C70000',
			}
		},
	},
	plugins: [],
}
