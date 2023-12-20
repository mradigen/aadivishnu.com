/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#D6CBC1',
				secondary: '#7f055f',
				tertiary: '#251E18',
			},
			fontFamily: {
				sans: ['Gabriela'],
			},
			fontSize: {
				// l: "5rem",
				// m: "3rem",
				// s: "1.2rem"
				l: '2.25rem',
				m: '1.75rem',
				s: '1.2rem',
			},
			inset: {
				titlePadding: '0.5rem',
			},
		},
	},
	plugins: [],
}
