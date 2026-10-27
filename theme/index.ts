import { extendTheme } from '@chakra-ui/react'
import { theme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

import '@fontsource/inter/variable.css'

/**
 * Brand tokens. Components read these instead of raw hex values, so light
 * and dark mode stay in step. Accent text meets 4.5:1 on its canvas.
 */
const semanticTokens = {
  colors: {
    'kk.canvas': { default: '#ffffff', _dark: '#07070b' },
    'kk.surface': { default: '#f6f6fa', _dark: '#0e0e15' },
    'kk.surfaceHi': { default: '#ffffff', _dark: '#14141e' },
    'kk.line': { default: 'rgba(10, 10, 24, 0.12)', _dark: 'rgba(255, 255, 255, 0.10)' },
    'kk.fg': { default: '#0b0b12', _dark: '#f4f4f8' },
    'kk.muted': { default: '#4b4b5c', _dark: '#a6a6ba' },
    'kk.accent': { default: '#6540d8', _dark: '#a18bff' },
    'kk.accentSolid': { default: '#6540d8', _dark: '#6c45e4' },
    'kk.accentHover': { default: '#5530c4', _dark: '#5a34d0' },
  },
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
    },
    '::selection': { background: 'rgba(108, 69, 228, 0.35)' },
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
    fontSizes,
    components,
  },
  theme
)
