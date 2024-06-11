/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "primary": "#afffd3",
        "on-primary": "#003823",
        "secondary": "#93d4b0",
        "on-secondary": "#003823",
        "tertiary": "#e6f0ff",
        "on-tertiary": "#003256",
        "primary-container": "#00df98",
        "on-primary-container": "#003d26",
        "secondary-container": '#00492f',
        "on-secondary-container": "#a0e2bd",
        "tertiary-container": "#9dc9fa",
        "on-tertiary-container": "#00385d",
        "error": '#ffb4ab',
        "surface": "#0d1510",
        "on-surface": "#dbe5dc",
      },
      transitionProperty: {
        'width': 'width',
      },
    },
  },
  plugins: [],
}

