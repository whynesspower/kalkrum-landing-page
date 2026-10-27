import { mode } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

export default {
  variants: {
    'nav-link': (props: Dict) => {
      const { isActive } = props

      return {
        fontWeight: '500',
        color: isActive ? 'kk.fg' : 'kk.muted',
        transition: 'color .2s ease',
        _hover: {
          textDecoration: 'none',
          color: 'kk.fg',
        },
      }
    },
    cta: {
      bg: 'kk.accentSolid',
      color: 'white',
      fontWeight: '600',
      borderRadius: '12px',
      boxShadow:
        'inset 0 1px 0 rgba(255,255,255,.28), 0 10px 30px -10px rgba(108,69,228,.75)',
      transition: 'transform .15s ease, box-shadow .2s ease, background .2s ease',
      _hover: {
        bg: 'kk.accentHover',
        transform: 'translateY(-1px)',
        _disabled: { bg: 'kk.accentSolid' },
      },
      _active: { transform: 'translateY(0)' },
    },
    line: (props: Dict) => ({
      bg: 'kk.surface',
      color: 'kk.fg',
      fontWeight: '500',
      borderWidth: '1px',
      borderColor: 'kk.line',
      borderRadius: '12px',
      _hover: { bg: mode('gray.100', 'whiteAlpha.100')(props) },
    }),
  },
}
