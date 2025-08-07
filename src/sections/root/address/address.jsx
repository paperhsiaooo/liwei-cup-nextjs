import { memo } from 'react'

import { Title } from './'

function Address() {
  return (
    <main className="bg-orange-primary">
      <div className="py-10">
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
        <div className="flex justify-center max-w-[320px] mx-auto">
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-[160px] p-4 box-border">
              <Title title="Date" />
            </div>
            <div className="w-[160px] p-4 box-border">
              <Title title="Distance" />
            </div>
            <div className="w-[160px] p-4 box-border">
              <Title title="Destination" />
            </div>
            <div className="w-[160px] p-4 box-border">
              <Title title="Duration" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default memo(Address)
