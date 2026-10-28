import { ImageResponse } from 'next/og'

export const config = { runtime: 'edge' }

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          color: '#f2f4f8',
          background:
            'radial-gradient(70% 60% at 50% 0%, rgba(56,189,248,0.45) 0%, #05060a 70%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8ee3ff',
          }}
        >
          KalKram
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
          }}
        >
          <div style={{ display: 'flex' }}>Intelligence that</div>
          <div style={{ display: 'flex' }}>learns from</div>
          <div style={{ display: 'flex' }}>experience.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#9aa3b5' }}>
          A frontier AI lab
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
