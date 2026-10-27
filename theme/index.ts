import { extendTheme } from '@chakra-ui/react'
import { theme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

import '@fontsource/noto-sans-devanagari/devanagari-400.css'
import '@fontsource/noto-sans-devanagari/devanagari-700.css'

/**
 * Brand tokens. The site is dark only, so default and _dark share a value.
 * Components read these names instead of raw hex values.
 */
const dark = (value: string) => ({ default: value, _dark: value })

const semanticTokens = {
  colors: {
    'kk.canvas': dark('#05060a'),
    'kk.surface': dark('#0b0d14'),
    'kk.surfaceHi': dark('#11141d'),
    'kk.line': dark('rgba(255, 255, 255, 0.10)'),
    'kk.fg': dark('#f2f4f8'),
    'kk.muted': dark('#9aa3b5'),
    'kk.accent': dark('#8ee3ff'),
    'kk.mint': dark('#5ef2c4'),
    'kk.accentSolid': dark('#8ee3ff'),
    'kk.accentHover': dark('#b6efff'),
  },
}

const cyan = {
  50: '#effbff',
  100: '#d4f5ff',
  200: '#b6efff',
  300: '#8ee3ff',
  400: '#5fd3f5',
  500: '#8ee3ff',
  600: '#5fd3f5',
  700: '#3fb4d8',
  800: '#2a8aa8',
  900: '#1b5f75',
}

// Any scale that could render purple by accident maps to cyan.
const colors = {
  primary: cyan,
  purple: cyan,
  violet: cyan,
  indigo: cyan,
}

const shadows = {
  outline: '0 0 0 3px rgba(142, 227, 255, 0.45)',
}

const stack =
  '"D-DIN", "DIN Alternate", "Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif'

const fonts = {
  heading: stack,
  body: stack,
  display: stack,
  mono: stack,
}

const styles = {
  global: () => ({
    html: { scrollBehavior: 'smooth' },
    body: {
      position: 'relative',
      color: 'kk.fg',
      bg: 'kk.canvas',
      fontSize: 'lg',
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      fontVariantNumeric: 'tabular-nums',
    },
    '::selection': { background: 'rgba(142, 227, 255, 0.28)' },
    '*:focus-visible': {
      outline: '2px solid',
      outlineColor: 'kk.accent',
      outlineOffset: '2px',
    },
    '@media (prefers-reduced-motion: reduce)': {
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
        scrollBehavior: 'auto !important',
      },
    },
  }),
}

export default extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles,
    colors,
    shadows,
    semanticTokens,
    fonts,
    fontSizes,
    components,
  },
  theme
)
