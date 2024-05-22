/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    fontFamily: {
      hanaHeavy: ['Hana-Heavy'],
      hanaBold: ['Hana-Bold'],
      hanaCM: ['Hana-CM'],
      hanaMedium: ['Hana-Medium'],
      hanaRegular: ['Hana-Regular'],
      hanaLight: ['Hana-Light'],
    },
    extend: {
      colors: {
        hanaGreen: '#28B2A5',
        hanaRed: '#E90061',
        hanaGray: '#F2F2F2',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
