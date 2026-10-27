import * as React from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MotionBox, MotionBoxProps } from './box'

/**
 * Maps an element's trip across the viewport to a pixel offset.
 * The offset is 0 when the element is centred in the viewport.
 */
export function useElementParallax(distance: number) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const value = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance]
  )
  return { ref, value }
}

export interface ParallaxProps extends MotionBoxProps {
  /**
   * Pixels of travel each way. A positive value makes the element move faster
   * than the page (foreground). A negative value makes it move slower
   * (background).
   */
  distance?: number
}

export const Parallax: React.FC<ParallaxProps> = ({
  distance = 40,
  children,
  style,
  ...rest
}) => {
  const { ref, value } = useElementParallax(distance)
  return (
    <MotionBox ref={ref} style={{ ...style, y: value }} {...rest}>
      {children}
    </MotionBox>
  )
}
