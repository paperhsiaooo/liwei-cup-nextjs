'use client'

import { useEffect } from 'react'

import ConfettiView from '@/components/confetti-view'
import useConfettiContext from '@/store/confetti-context'

export default function ConfettiRunner({ durationMs = 4000 }) {
  const setRunStart = useConfettiContext(state => state.setRunStart)
  const setRunEnd = useConfettiContext(state => state.setRunEnd)

  useEffect(() => {
    setRunStart()
    const timer = setTimeout(() => {
      setRunEnd()
    }, durationMs)
    return () => clearTimeout(timer)
  }, [durationMs, setRunEnd, setRunStart])

  return <ConfettiView />
}
