'use client'

import { memo } from 'react'
import { useTimer } from 'react-timer-hook'
import { twMerge } from 'tailwind-merge'

function CountDownTimer({ type = 'primary' | 'secondary' }) {
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date(2025, 11, 15, 12, 0, 0),
  })

  return (
    <div className="relative z-10">
      <p className="text-center font-anton font-normal text-4xl text-white flex justify-center items-end flex-row gap-x-3">
        <span
          suppressHydrationWarning={true}
          className={twMerge(
            'text-[30px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-blue-primary',
          )}
        >
          {days}
        </span>
        <span
          className={twMerge(
            'text-[14px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-green-primary',
          )}
        >
          DAYS
        </span>
        <span
          suppressHydrationWarning={true}
          className={twMerge(
            'text-[30px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-blue-primary',
          )}
        >
          {hours}
        </span>
        <span
          className={twMerge(
            'text-[14px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-green-primary',
          )}
        >
          HRS
        </span>
        <span
          suppressHydrationWarning={true}
          className={twMerge(
            'text-[30px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-blue-primary',
          )}
        >
          {minutes}
        </span>
        <span
          className={twMerge(
            'text-[14px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-green-primary',
          )}
        >
          MINS
        </span>
        <span
          suppressHydrationWarning={true}
          className={twMerge(
            'text-[30px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-blue-primary',
          )}
        >
          {seconds}
        </span>
        <span
          className={twMerge(
            'text-[14px]',
            type === 'primary' && 'text-white',
            type === 'secondary' && 'text-green-primary',
          )}
        >
          SEC
        </span>
      </p>
    </div>
  )
}

export default memo(CountDownTimer)
