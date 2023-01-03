/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // light
        "bg-light-primary": "#EAE0CC",
        "bg-light-secondary": "#F3EDE2",
        "bg-light-tertiary": "#F9F6F1",
        "text-light-primary": "#2A3A3C",
        "text-light-secondary": "#192324",
        "button-light": "#F95738",
        "button-light-text": "#291000",
        // dark
        "bg-dark-primary": "#191E24",
        "bg-dark-secondary": "#212830",
        "bg-dark-tertiary": "#2A323C",
        "text-dark-primary": "#E3DEE2",
        "text-dark-secondary": "#D9D3D8",
        "button-dark": "#00A5CF",
        "button-dark-text": "#fff",
      },
    },
  },
  plugins: [],
};
