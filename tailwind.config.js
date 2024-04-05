/** @type {import('tailwindcss').Config} */
module.exports = {
	content: {
		relative: true,
		files: [
			'./assets/**/*.js',
			'./templates/**/*.html.twig',
			// "./node_modules/flowbite/**/*.js",
			// "./vendor/tales-from-a-dev/flowbite-bundle/templates/**/*.html.twig",
		],
	},
	theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn .5s ease-out;',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
	plugins: [
    plugin(function({ addVariant }) {
      addVariant('turbo-frame', 'turbo-frame[src] &');
      addVariant('modal', 'dialog &');
    }),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),
	]
};
