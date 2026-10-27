import { useReducedMotion } from 'framer-motion'
import { duration, ease } from 'lib/motion'
import { MotionBox, MotionBoxProps } from './box'
import React from 'react'

export const FallInPlace: React.FC<MotionBoxProps & { delay?: number }> = (
  props
) => {
  const { children, delay = 0.05, ...rest } = props
  const reduce = useReducedMotion()
  return (
    <MotionBox
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.slow, ease, delay }}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
