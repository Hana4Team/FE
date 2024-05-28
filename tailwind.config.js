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
        hanaLightGreen: '#9CDAB8',
        white: '#FFFFFF',
      },
      dropShadow: {
        '3xl': ['1px 0px 3px rgba(0, 0, 0, 0.2)'],
        under: ['4px 3px 3px rgba(0, 0, 0, 0.2)'],
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        fadein: 'fade-in 1s ease-in-out 0.25s 1',
      },
    },
    minHeight: {
      'real-screen': 'calc(100vh - 100px)',
      'real-screen2': 'calc(100vh - 82.5px)',
    },
  },
  plugins: [],
};
