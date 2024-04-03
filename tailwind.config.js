/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
		relative: true,
		files: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
		//"./node_modules/flowbite/**/*.js",
		]
	},
  theme: {
    extend: {},
  },
  plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),
	],
}
