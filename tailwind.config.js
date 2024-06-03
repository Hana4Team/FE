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
        hanaDeepGreen: '#008485',
        hanaAqua: '#EAF3F2',
        hanaSky: '#F1FFFE',
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
        fadein1: 'fade-in 1.5s ease-in-out 0.5s 1',
        fadein2: 'fade-in 1.5s ease-in-out 1s 1',
        fadein3: 'fade-in 1.5s ease-in-out 1.5s 1',
        fadein4: 'fade-in 1.5s ease-in-out 2s 1',
      },
    },
    minHeight: {
      'real-screen': 'calc(100vh - 100px)',
      'real-screen2': 'calc(100vh - 82.5px)',
      'real-screen3': 'calc(100vh - 182.5px)',
    },
  },
  plugins: [],
};
