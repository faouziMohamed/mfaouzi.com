/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig } */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xsm: '333px',
        xs: '340px',
        msm: '693px',
      },
      fontFamily: {
        primary: ['Ubuntu', 'Roboto', 'Inter', ...fontFamily.sans],
        secondary: ['Roboto', 'Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: withOpacityValue('--tw-color-primary-50'),
          100: withOpacityValue('--tw-color-primary-100'),
          200: withOpacityValue('--tw-color-primary-200'),
          300: withOpacityValue('--tw-color-primary-300'),
          400: withOpacityValue('--tw-color-primary-400'),
          500: withOpacityValue('--tw-color-primary-500'),
          600: withOpacityValue('--tw-color-primary-600'),
          700: withOpacityValue('--tw-color-primary-700'),
          800: withOpacityValue('--tw-color-primary-800'),
          900: withOpacityValue('--tw-color-primary-900'),
        },
        dark: {
          50: '#5f5f5f',
          100: '#374151',
          200: '#1f2937',
          300: '#011f37',
          400: '#010f27',
          500: '#010f1f',
          600: '#00041a',
          700: '#000015',
          800: '#00000f',
          900: '#00000a',

          //***
          'r-50': '#1f2937',
          'r-100': '#374151',
          'r-200': '#1f2937',
          'r-300': '#111827',
          'r-400': '#0f172a',
          'r-500': '#0d1117',
          'r-600': '#0d1117',
          primary: '#0f2937',
        },
      },
      backgroundImage: {
        'form-gradient':
          'linear-gradient(225.31deg, rgba(143, 245, 215, 0.6) 20.08%, #C4FFF4 53.18%, rgba(111, 229, 255, 0.83) 93.64%)',
        app: 'linear-gradient(185.24deg, rgba(248, 255, 251, 0.81) 56.38%, rgba(217, 253, 255, 0.17) 81.74%)',
      },
      keyframes: keyFrames(),
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'bounce-slow': 'bounce 2s ease-out infinite',
        wiggle: 'wiggle 4.5s ease-in-out infinite',
        'wiggle-fast': 'wiggle 2s ease-in-out infinite',
        'wiggle-slower': 'wiggle 8s ease-in-out infinite',
        'bounce-low': 'bounce-low 8s ease infinite',
        'bounce-to-top': 'bounce-to-top 1.6s ease infinite',
        'try-spin': 'try-spin 6.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};

function keyFrames() {
  return {
    // #region Flicker
    flicker: {
      '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
        opacity: 0.99,
        filter:
          'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
      },
      '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
        opacity: 0.4,
        filter: 'none',
      },
    },
    // #endregion Flicker
    // #region bounce-low
    'bounce-low': {
      '0%, 100%': {
        transform: 'translateY(-4%)',
        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
      },
      '50%': {
        transform: 'translateY(0)',
        'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
    'bounce-to-top': {
      '0%, 100%': {
        transform: 'translateY(15%)',
        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
      },
      '50%': {
        transform: 'translateY(-8%)',
        'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
    // #endregion bounce-low
    // #region wiggle
    wiggle: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%': { transform: 'rotate(3deg)' },
    },
    // #endregion wiggle
    // #region shimmer
    shimmer: {
      '0%': {
        backgroundPosition: '-700px 0',
      },
      '100%': {
        backgroundPosition: '700px 0',
      },
    },
    // #endregion shimmer
    'try-spin': {
      '0%': {
        transform: 'rotate(-500deg)',
        animationTimingFunction: 'cubic-bezier(.26,-0.48,.44,-0.45)',
      },
      '100%': {
        transform: 'rotate(1800deg)',
        'animation-timing-function': 'cubic-bezier(.86,-0.42,0,1.22)',
      },
    },
  };
}
