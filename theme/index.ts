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
    'kk.violet': dark('#a18bff'),
    'kk.accentSolid': dark('#5b7cff'),
    'kk.accentHover': dark('#4a6af0'),
  },
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
    semanticTokens,
    fonts,
    fontSizes,
    components,
  },
  theme
)
