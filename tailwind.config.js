const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: {
		relative: true,
		files: ['./assets/**/*.js', './templates/**/*.html.twig'],
	},
	//darkMode: 'yolo',
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
			// Customize some colors
			// colors: {
			// 	blue: {
			// 		700: '#74b1b2',
			// 	},
			// },
		},
	},
	plugins: [
		// Add tailwind plugin
		// @see https://v2.tailwindcss.com/docs/plugins
		plugin(function ({ addVariant }) {
			// Register custom variants
			addVariant('turbo-frame', 'turbo-frame[src] &');
			addVariant('modal', 'dialog &');
		}),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};
