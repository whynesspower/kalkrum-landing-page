import { useEffect } from 'react'
import { track } from 'lib/posthog'

const MARKS = [25, 50, 75, 100]

/** Reports how far down the page visitors read, once per mark. */
export function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>()

    const onScroll = () => {
      const doc = document.documentElement
      const percent = ((doc.scrollTop + window.innerHeight) / doc.scrollHeight) * 100
      MARKS.forEach((mark) => {
        if (percent >= mark - 1 && !fired.has(mark)) {
          fired.add(mark)
          track('scroll_depth', { percent: mark })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
