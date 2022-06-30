const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		colors: {
			darker: "#24272F",
			// text in light
			dark: "#3E4251",
			grey: "#555B6E",
			green: "#89B0AE",
			"light-green": "#BEE3DB",
			"kinda-white": "#FAF9F9",
			yellow: "#FFD6BA",
		},
		spacing: {
			'1': '8px',
			'2': '12px',
			'3': '16px',
			'4': '24px',
			'5': '32px',
			'6': '48px',
			'7': '56px',
			'8': '64px'
		},
		extend: {

			fontFamily: {
				"sans": ["Roboto Flex"], //, ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [],
}