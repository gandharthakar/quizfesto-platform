import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: 'class',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'theme-color-1': "#2e3192",
				'theme-color-1-hover-dark': "#23267e",
				'theme-color-2': "#00af4f",
			},
			fontFamily: {
				ubuntu: ['Ubuntu', 'sans-serif'],
				noto_sans: ['Noto Sans', 'sans-serif'],
			}
		},
	},
	plugins: [],
};

export default config;