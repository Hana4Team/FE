/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  safelist: [
    'bg-[#28B2A5]',
    'bg-[#E90061]',
    'bg-[#FFC700]',
    'bg-[#AD9A5F]',
    'bg-[#B5B5B5]',
    'bg-[#9BDEDF]',
    'bg-[#5CB6B7]',
    'bg-[#FFB2B7]',
    'bg-[#F2777E]',
    'bg-[#9CDAB8]',
    'bg-[#74BE96]',
  ],
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
        'fade-in-bounceup': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0%, 100%, 0)',
          },
          '33%': {
            opacity: 0.5,
            transform: 'translate3d(0%, 0%, 0)',
          },
          '66%': {
            opacity: 0.7,
            transform: 'translate3d(0%, 20%, 0)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
        },
        tada: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -6deg)',
          },
          '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 6deg)',
          },
          '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -6deg)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'fly-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(0, 50px, 0)',
            transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '60%': {
            opacity: '1',
            transform: 'translate3d(0, -20px, 0)',
          },
          '75%': {
            transform: 'translate3d(0, 10px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -5px, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'zoom-in-down': {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3) translate3d(0, -100%, 0)',
          },
          '80%': {
            opacity: 0.8,
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0%, 0)',
          },
        },

        jiggle: {
          '0%': {
            transform: 'scale3d(1, 1, 1) rotate(-170deg)',
          },
          '30%': {
            transform: 'scale3d(1.25, 0.75, 1) rotate(-170deg)',
          },
          '40%': {
            transform: 'scale3d(0.75, 1.25, 1) rotate(-170deg)',
          },
          '50%': {
            transform: 'scale3d(1.15, 0.85, 1) rotate(-170deg)',
          },
          '65%': {
            transform: 'scale3d(0.95, 1.05, 1) rotate(-170deg)',
          },
          '75%': {
            transform: 'scale3d(1.05, 0.95, 1) rotate(-170deg)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1) rotate(-170deg)',
          },
        },
        'fade-in-right': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(10%, 0, 0)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'fly-in': {
          '0%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
            transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },
          '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'slide-down': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, 60%, 0)',
          },
        },
        'slide-up': {
          '0%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '100%': {
            transform: 'translate3d(0, -200%, 0)',
          },
        },
      },
      animation: {
        fadein1: 'fade-in 1.5s ease-in-out 0.5s 1',
        fadein2: 'fade-in 1.5s ease-in-out 1s 1',
        fadein3: 'fade-in 1.5s ease-in-out 1.5s 1',
        fadein4: 'fade-in 1.5s ease-in-out 2s 1',
        fadeinbounceup: 'fade-in-bounceup 1s ease-in-out 1s 1',
        tada: 'tada 1s ease-in-out 0.25s 1',
        flyinup: 'fly-in-up 0.6s ease-in-out 0.25s 1',
        zoomInDown: 'zoom-in-down 1s ease-out 0.25s 1',
        jiggle: 'jiggle 0.6s ease-in-out 0.25s 1',
        fadeinright: 'fade-in-right 1s ease-in-out 0.25s 1',
        flyin: 'fly-in 0.6s ease-in-out 0.25s 1',
        slidedown: 'slide-down 1s forwards',
        slideup: 'slide-up 1.3s forwards',
      },
    },
    minHeight: {
      'real-screen': 'calc(100vh - 100px)',
      'real-screen2': 'calc(100vh - 82.5px)',
      'real-screen3': 'calc(100vh - 182.5px)',
    },
    backgroundImage: {
      roadmap4: "url('/images/roadmap.svg')",
    },
  },
  plugins: [],
};
