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
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      bg: 'linear-gradient(180deg, #ffffff 0%, #eef1f8 52%, #d9deea 100%)',
      color: '#05060a',
      fontWeight: '600',
      letterSpacing: '-0.01em',
      borderRadius: 'full',
      minH: '44px',
      boxShadow: [
        'inset 0 1px 0 rgba(255,255,255,.95)',
        'inset 0 -2px 3px rgba(40,50,90,.22)',
        '0 0 0 1px rgba(255,255,255,.35)',
        '0 1px 1px rgba(0,0,0,.45)',
        '0 6px 14px -4px rgba(0,0,0,.55)',
        '0 14px 30px -10px rgba(142,227,255,.32)',
        '0 18px 40px -14px rgba(161,139,255,.28)',
      ].join(', '),
      transition:
        'transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, filter .3s ease',
      // gradient hairline rim
      _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        background:
          'linear-gradient(160deg, rgba(255,255,255,.95), rgba(142,227,255,.55) 45%, rgba(161,139,255,.6) 100%)',
        WebkitMask:
          'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        pointerEvents: 'none',
        zIndex: 1,
      },
      // sheen sweep
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '55%',
        background:
          'linear-gradient(105deg, transparent 0%, rgba(255,255,255,.0) 20%, rgba(255,255,255,.85) 50%, rgba(142,227,255,.0) 80%, transparent 100%)',
        transform: 'translateX(-130%) skewX(-18deg)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'soft-light',
      },
      '& .chakra-button__icon, & > svg': {
        transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
      },
      _hover: {
        transform: 'translateY(-2px)',
        filter: 'brightness(1.03)',
        boxShadow: [
          'inset 0 1px 0 #fff',
          'inset 0 -2px 3px rgba(40,50,90,.2)',
          '0 0 0 1px rgba(255,255,255,.5)',
          '0 2px 2px rgba(0,0,0,.4)',
          '0 10px 20px -4px rgba(0,0,0,.55)',
          '0 18px 44px -8px rgba(142,227,255,.55)',
          '0 24px 60px -12px rgba(161,139,255,.5)',
        ].join(', '),
        _before: {
          opacity: 1,
          transform: 'translateX(300%) skewX(-18deg)',
          transition: 'transform 1.1s ease, opacity .2s ease',
        },
        '& .chakra-button__icon:last-of-type, & > svg:last-child': {
          transform: 'translateX(3px)',
        },
        _disabled: { transform: 'none' },
      },
      _active: {
        transform: 'translateY(1px) scale(.985)',
        filter: 'brightness(.97)',
        boxShadow: [
          'inset 0 2px 4px rgba(40,50,90,.3)',
          'inset 0 -1px 0 rgba(255,255,255,.6)',
          '0 0 0 1px rgba(255,255,255,.3)',
          '0 1px 2px rgba(0,0,0,.5)',
          '0 4px 12px -4px rgba(142,227,255,.35)',
        ].join(', '),
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: [
          '0 0 0 2px #05060a',
          '0 0 0 4px #8ee3ff',
          '0 0 0 7px rgba(142,227,255,.25)',
          '0 14px 30px -10px rgba(142,227,255,.4)',
        ].join(', '),
      },
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        '&::before': { display: 'none' },
        '&:hover, &:active': { transform: 'none' },
        '& .chakra-button__icon, & > svg': { transition: 'none' },
      },
    },
    line: {
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      bg: 'linear-gradient(180deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.03) 100%)',
      backdropFilter: 'blur(14px) saturate(140%)',
      color: 'kk.fg',
      fontWeight: '600',
      letterSpacing: '-0.01em',
      borderRadius: 'full',
      minH: '44px',
      boxShadow: [
        'inset 0 1px 0 rgba(255,255,255,.22)',
        'inset 0 -1px 0 rgba(0,0,0,.35)',
        '0 1px 1px rgba(0,0,0,.4)',
        '0 10px 24px -10px rgba(0,0,0,.6)',
      ].join(', '),
      transition:
        'transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, background .3s ease',
      _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        padding: '1px',
        background:
          'linear-gradient(160deg, rgba(255,255,255,.55), rgba(255,255,255,.08) 40%, rgba(142,227,255,.3) 75%, rgba(161,139,255,.45) 100%)',
        WebkitMask:
          'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
        pointerEvents: 'none',
      },
      '& .chakra-button__icon, & > svg': {
        transition: 'transform .25s cubic-bezier(.2,.8,.2,1)',
      },
      _hover: {
        bg: 'linear-gradient(180deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.05) 100%)',
        transform: 'translateY(-2px)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,.35)',
          'inset 0 -1px 0 rgba(0,0,0,.35)',
          '0 2px 2px rgba(0,0,0,.4)',
          '0 14px 30px -10px rgba(0,0,0,.6)',
          '0 12px 36px -8px rgba(142,227,255,.35)',
          '0 18px 48px -12px rgba(161,139,255,.35)',
        ].join(', '),
        '& .chakra-button__icon:last-of-type, & > svg:last-child': {
          transform: 'translateX(3px)',
        },
      },
      _active: {
        transform: 'translateY(1px) scale(.985)',
        boxShadow: [
          'inset 0 2px 4px rgba(0,0,0,.4)',
          '0 1px 2px rgba(0,0,0,.5)',
        ].join(', '),
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: [
          '0 0 0 2px #05060a',
          '0 0 0 4px #8ee3ff',
          '0 0 0 7px rgba(142,227,255,.25)',
        ].join(', '),
      },
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        '&:hover, &:active': { transform: 'none' },
        '& .chakra-button__icon, & > svg': { transition: 'none' },
      },
    },
  },
}
