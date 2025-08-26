import { memo } from 'react'

import { Title } from '.'

function InfoDistance() {
  return (
    <div className="relative w-[160px] h-[160px] p-4 box-border">
      <Title title="Distance" />
      <p className="text-white leading-none mt-[50px]">
        <span className="text-[18px] font-noto-sans-tc font-black mr-1">
          約
        </span>
        <span className="text-[60px] font-anton font-normal">2.1</span>
        <span className="text-[18px] font-anton font-normal ml-1">KM</span>
      </p>
    </div>
  )
}

export default memo(InfoDistance)
