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
          color: '#f4f4f8',
          background:
            'radial-gradient(70% 60% at 50% 0%, rgba(108,69,228,0.55) 0%, #07070b 70%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 700 }}>
          KalKram
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
          }}
        >
          <div style={{ display: 'flex' }}>Your whole engineering</div>
          <div style={{ display: 'flex' }}>org, in 60 words.</div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#a6a6ba' }}>
          AI summaries from Jira, Slack, Docs and GitHub
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
