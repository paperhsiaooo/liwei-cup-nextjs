import { memo } from 'react'

import { Title } from '.'

function InfoDate() {
  return (
    <div className="w-[160px] p-4 box-border flex flex-col gap-y-3">
      <Title title="Date" />
      <p className="text-white font-antonio font-bold text-[18px]">
        2025,SATURDAY
      </p>
      <p className="relative text-white flex gap-x-7">
        <span className="inline-block text-[60px] leading-none font-anton font-normal">
          11
        </span>
        <span className="inline-block absolute bottom-0 left-[54px] -translate-x-1/2 text-[36px] font-noto-sans-jp font-black">
          /
        </span>
        <span className="inline-block text-[60px] leading-none font-anton font-normal">
          15
        </span>
      </p>
    </div>
  )
}

export default memo(InfoDate)
