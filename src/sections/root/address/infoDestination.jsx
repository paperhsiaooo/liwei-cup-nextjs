import { memo } from 'react'

import { Title } from '.'

function InfoDestination() {
  return (
    <div className="w-[160px] h-[160px] p-4 box-border">
      <Title title="Destination" />
      <p className="text-[18px] leading-snug text-white font-noto-sans-tc font-bold mt-[20px]">
        新北市板橋區
        <br />
        僑中一街 124 巷 27-5 號
      </p>
    </div>
  )
}

export default memo(InfoDestination)
