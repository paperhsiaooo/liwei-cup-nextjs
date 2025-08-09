'use client'

import { memo } from 'react'
import { useTimer } from 'react-timer-hook'

function CountDownTimer() {
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date(2025, 11, 15, 12, 0, 0),
  })

  return (
    <div className="relative z-10">
      <p className="text-center font-anton font-normal text-4xl text-white flex justify-center items-end flex-row gap-x-3">
        <span suppressHydrationWarning={true} className="text-[30px]">
          {days}
        </span>
        <span className="text-[14px]">DAYS</span>
        <span suppressHydrationWarning={true} className="text-[30px]">
          {hours}
        </span>
        <span className="text-[14px]">HRS</span>
        <span suppressHydrationWarning={true} className="text-[30px]">
          {minutes}
        </span>
        <span className="text-[14px]">MINS</span>
        <span suppressHydrationWarning={true} className="text-[30px]">
          {seconds}
        </span>
        <span className="text-[14px]">SEC</span>
      </p>
    </div>
  )
}

export default memo(CountDownTimer)
