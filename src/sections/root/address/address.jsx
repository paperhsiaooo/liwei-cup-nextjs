import { memo } from 'react'

import { InfoDate, InfoDestination, InfoDistance, InfoDuration } from './'

function Address() {
  return (
    <main className="bg-orange-primary">
      <div className="pt-10">
        {/* 師大 */}
        <div className="relative flex justify-center items-center">
          <p className="font-noto-sans-jp font-black text-white text-[83px] leading-[140px]">
            師<br />大
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="whitespace-nowrap font-noto-sans-jp font-black text-blue-primary text-[34px] leading-[120%] tracking-[5%] text-center">
              林口分部
              <br />
              體育館
            </p>
          </div>
        </div>

        {/* 資訊 */}
        <div className="relative flex justify-center max-w-[320px] mx-auto">
          <div className="w-full flex flex-row flex-wrap">
            <InfoDate />
            <InfoDistance />
            <InfoDestination />
            <InfoDuration />
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-blue-primary" />
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-[95%] bg-blue-primary" />
        </div>
      </div>
    </main>
  )
}

export default memo(Address)
