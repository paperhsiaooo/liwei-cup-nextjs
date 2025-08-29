'use client'

import React from 'react'
import Confetti from 'react-confetti'

import useConfettiContext from '@/store/confetti-context'

export default function ConfettiView() {
  const run = useConfettiContext(state => state.run)

  return (
    <Confetti
      run={run}
      recycle={false}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}
