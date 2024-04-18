import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export const globalVariableStyles = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--background': 'var(--color-dark-green)',
      '--foreground': 'var(--color-white)',

      '--card': '222.2 84% 4.9%',
      '--card-foreground': '210 40% 98%',

      '--popover': 'var(--color-dark-green)',
      '--popover-foreground': '210 40% 98%',

      '--primary': 'var(--color-deep-sky-blue)',
      '--primary-foreground': '222.2 47.4% 11.2%',

      '--secondary': '217.2 32.6% 17.5%',
      '--secondary-foreground': '210 40% 98%',

      '--muted': 'var(--color-cyprus-light)',
      '--muted-foreground': '215 20.2% 65.1%',

      '--accent': 'var(--color-cyprus-lighter)',
      '--accent-foreground': '210 40% 98%',

      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '210 40% 98%',

      '--border': 'var(--color-cyprus-light)',
      '--input': '217.2 32.6% 17.5%',
      '--ring': '212.7 26.8% 83.9%',
      '--radius': '.75rem',
    },
  })
})

const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [globalVariableStyles, require('tailwindcss-animate')],
} satisfies Config

export default config
