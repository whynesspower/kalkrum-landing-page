import * as React from 'react'
import { useReducedMotion } from 'framer-motion'
import { duration, ease } from 'lib/motion'
import { MotionBox, MotionBoxProps } from './box'

export interface RevealProps extends MotionBoxProps {
  delay?: number
  y?: number
}

/** Fades content up once when it scrolls into view. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 16,
  ...rest
}) => {
  const reduce = useReducedMotion()
  return (
    <MotionBox
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: duration.slow, ease, delay }}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
