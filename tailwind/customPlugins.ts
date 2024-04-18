import plugin from 'tailwindcss/plugin'

export const globalVariableStyles = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--color-white': 'hsl(0 0% 100%)',
      '--color-dark-green': 'hsl(198 100% 10%)',
      '--color-sapphire': 'hsl(198 82% 13%)',
      '--color-cyprus': 'hsl(197 76% 13%)',
      '--color-cyprus-light': 'hsl(197 59% 19%)',
      '--color-cyprus-lighter': 'hsl(197 59% 23%)',
      '--color-link-water': 'hsl(198 16% 78%)',
      '--color-deep-sky-blue': 'hsl(198 100% 50%)',
      '--color-manz': 'hsl(70 76% 61%)',
      '--color-flamingo': 'hsl(0 76% 61%)',
      // For app usage
      '--color-grid-line': 'var(--color-cyprus-light)',
      '--color-grid-bg': 'hsl(197 89% 11%)',
    },
  })
})

export const devBreakpointDisplay = plugin(({ addBase, theme }) => {
  if (process.env.NODE_ENV === 'production') return

  const screens = theme('screens', {})
  const breakpoints = Object.keys(screens)
  const firstBreakpoint = breakpoints[0] ?? ''

  addBase({
    'body::after': {
      content: `"< ${screens[firstBreakpoint as keyof typeof screens]}"`,
      '@apply fixed bottom-0 right-0 m-2 flex items-center rounded border px-2 py-1 text-sm font-bold z-[99999] hover:opacity-0 bg-[hsl(0_0_0/70%)]':
        '',
    },
    ...breakpoints.reduce((acc, current) => {
      // @ts-expect-error - TS doesn't like dynamic keys TODO: Fix this
      acc[`@media (min-width: ${screens[current as keyof typeof screens]})`] = {
        'body::after': { content: `'${current}'` },
      }
      return acc
    }, {}),
  })
})

export const bodyStyles = plugin(({ addBase }) => {
  addBase({
    body: {
      fontFamily: "'Apercu', sans-serif",
      fontSynthesis: 'none', // disable synthetic bold/italic.
      textRendering: 'optimizeLegibility', // Enable kerning and optional ligatures.
      WebkitFontSmoothing: 'antialiased', // Better font smoothing on WebKit.
      backgroundColor: 'var(--color-dark-green)',
      color: 'var(--color-white)',
      '@apply responsive-text': '',
    },
  })
})

export const scrollStyles = plugin(({ addBase }) => {
  /**
   * Styled scroll bars.
   * Uses non-standard `::-webkit` as `scrollbar-color` isn't supported in Safari yet.
   */
  addBase({
    '::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'var(--color-deep-sky-blue)',
    },
  })
})

export const selectionStyles = plugin(({ addBase }) => {
  addBase({
    '::selection': {
      background: 'var(--color-deep-sky-blue)',
    },
  })
})

export const customFontStyles = plugin(({ addBase }) => {
  const baseFontStyles = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    unicodeRange: 'U+0020-7E',
  }
  addBase({
    // @ts-expect-error -- Tailwind has incorrect types here
    '@font-face': [
      {
        ...baseFontStyles,
        fontFamily: 'Baton Turbo',
        src: 'local("Baton Turbo Book"), url("/fonts/baton-turbo-book.woff2") format("woff2")',
      },
      {
        ...baseFontStyles,
        fontFamily: 'Baton Turbo',
        fontWeight: 'bold',
        src: 'local("Baton Turbo Bold"), url("/fonts/baton-turbo-bold.woff2") format("woff2")',
      },
      {
        ...baseFontStyles,
        fontFamily: 'Apercu',
        src: 'local("Apercu Regular"), url("/apercu-regular.woff2") format("woff2")',
        unicodeRange:
          'U+0020-7E, U+00A9, U+00AE' /* Copyright and Registered Trademark extras */,
      },
      {
        ...baseFontStyles,
        fontFamily: 'Apercu',
        fontWeight: 'bold',
        src: 'local("Apercu Bold"), url("/apercu-bold.woff2") format("woff2")',
      },
    ],
  })
})

export const responsiveStyles = plugin(({ addBase, addUtilities }) => {
  addBase({
    '*': {
      minWidth: '0', // Make everything responsive by default
    },
  })
  addUtilities({
    '.responsive-text': {
      '@apply text-lg lg:text-xl xl:text-2xl': '',
    },
    '.margined-x': {
      '@apply mx-5 md:mx-10': '',
    },
    '.margined-y': {
      '@apply my-5 md:my-10': '',
    },
    '.padded-x': {
      '@apply px-5 md:px-10': '',
    },
    '.padded-y': {
      '@apply py-5 md:py-10': '',
    },
  })
})
