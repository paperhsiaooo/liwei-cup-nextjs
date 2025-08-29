import { memo } from 'react'

import { Title } from '.'

function InfoDuration() {
  return (
    <div className="w-[160px] p-4 box-border">
      <Title title="Duration" />
      <p className="text-white font-anton font-normal leading-none mt-4">
        <span className="text-[78px]">6</span>
        <span className="text-[23px] ml-1">HRS</span>
      </p>
    </div>
  )
}

export default memo(InfoDuration)
