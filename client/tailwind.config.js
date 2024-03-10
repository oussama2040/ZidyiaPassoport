/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    backgroundColor: {
      'custom': '#07393c',
      'customHover': '#0B5C61',
      'custom-white': '#F5F5F5'
    },
    gridTemplateRows: {
      '[auto,auto,1fr]': 'auto auto 1fr',
    },
    maxWidth: {
      '7xl': '86.4%'
    },
    screens: {
      xs: "320px",
      sm: "375px",
      small: "500px",
      md: "768px",
      lg: "960px",
      large: "1200px",
      xl: "1680px",
    },
    fontFamily: {
      title: ["Roboto", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    colors: {
      'greenish-blue': '#07393C',
      'lightgreenish-blue': '#2C666E'
    },
  },
};
export const plugins = [
  require('@tailwindcss/aspect-ratio'),
];


