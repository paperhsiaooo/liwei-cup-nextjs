import { memo } from 'react'

import { Title } from '.'

function InfoDestination() {
  return (
    <div className="w-[160px] h-[160px] p-4 box-border">
      <Title title="Destination" />
      <p className="text-[18px] leading-snug text-white font-noto-sans-tc font-bold mt-[40px]">
        新北市林口區
        <br />
        仁愛路一段 2 號
      </p>
    </div>
  )
}

export default memo(InfoDestination)
