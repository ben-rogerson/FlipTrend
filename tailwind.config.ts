import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import containerQueries from '@tailwindcss/container-queries'
import radixPresetConfig from './tailwind/radixConfig'
import {
  bodyStyles,
  customFontStyles,
  devBreakpointDisplay,
  globalVariableStyles,
  responsiveStyles,
  scrollStyles,
  selectionStyles,
} from './tailwind/customPlugins'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [radixPresetConfig],
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontFamily: {
        heading: '"Baton Turbo", sans-serif',
      },
      borderColor: {
        DEFAULT: 'var(--color-cyprus-light)',
        light: 'var(--color-cyprus-lighter)',
      },
      backgroundColor: {
        white: 'var(--color-white)',
        'button-hover': 'var(--color-cyprus-light)',
        page: 'var(--color-dark-green)',
        border: 'var(--color-cyprus-light)',
      },
      textColor: {
        white: 'var(--color-white)',
        muted: 'var(--color-link-water)',
        transparent: 'transparent',
        link: 'var(--color-deep-sky-blue)',
      },
      gradientColorStops: {
        'bg-highlight': 'var(--color-sapphire)',
        blue: 'var(--color-deep-sky-blue)',
        green: 'var(--color-manz)',
      },
      animation: {
        spin: 'spin .65s ease-in-out infinite',
      },
      transitionDelay: {
        2000: '2000ms',
        3000: '3000ms',
      },
      borderRadius: {
        50: '50%',
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [
    // My plugins
    globalVariableStyles,
    bodyStyles,
    scrollStyles,
    selectionStyles,
    customFontStyles,
    responsiveStyles,
    devBreakpointDisplay,
    // External plugins
    containerQueries,
    animate,
  ],
} satisfies Config
