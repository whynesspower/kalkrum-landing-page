import type { NextApiRequest, NextApiResponse } from 'next'

// The form that stores signups. Override both values in the environment to
// point at a different form without a code change.
const FORM_URL =
  process.env.WAITLIST_FORM_URL ??
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeBOfXMilwtbDavfuqd1GmTTbTXuklbx8-i5BSW_aYzPfMRYA/formResponse'
const EMAIL_FIELD = process.env.WAITLIST_FORM_FIELD ?? 'entry.1115472667'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LIMIT = 5
const WINDOW_MS = 60_000

// Best-effort limiter. It resets when the server restarts and is not shared
// between server instances, which is fine for a waitlist.
const hits = new Map<string, number[]>()

function tooManyRequests(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > LIMIT
}

type Data = { ok: boolean; error?: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const { email, company } = (req.body ?? {}) as {
    email?: unknown
    company?: unknown
  }

  // Bots fill the hidden "company" field. Pretend it worked and drop it.
  if (typeof company === 'string' && company.trim() !== '') {
    return res.status(200).json({ ok: true })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ??
    req.socket.remoteAddress ??
    'unknown'
  if (tooManyRequests(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' })
  }

  if (
    typeof email !== 'string' ||
    email.length > 254 ||
    !EMAIL_RE.test(email.trim())
  ) {
    return res.status(400).json({ ok: false, error: 'invalid_email' })
  }

  try {
    const body = new URLSearchParams({ [EMAIL_FIELD]: email.trim() })
    const upstream = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    if (!upstream.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' })
    }
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ ok: false, error: 'upstream_failed' })
  }
}
