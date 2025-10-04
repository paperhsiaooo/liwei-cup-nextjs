import Image from 'next/image'
import { memo } from 'react'

import { InfoDate, InfoDestination, InfoDistance, InfoDuration } from './'

function Address() {
  return (
    <section className="root bg-orange-primary">
      <div className="relative pt-[500px] pb-5 max-w-[375px] mx-auto">
        <div className="absolute top-[120px] left-7 w-[157px] aspect-[1464/961]">
          <Image
            src="/images/picture/05.jpg"
            alt="picture-05"
            width={1464}
            height={961}
          />
        </div>

        <div className="absolute z-10 top-[150px] right-7 w-[145px] aspect-[1469/1753]">
          <Image
            src="/images/picture/04.jpg"
            alt="picture-04"
            width={1469}
            height={1753}
          />
        </div>

        <div className="absolute top-[266px] left-7 w-[277px] aspect-[2730/1400]">
          <Image
            src="/images/picture/03.jpg"
            alt="picture-04"
            width={2730}
            height={1400}
          />
        </div>

        <div className="absolute top-[440px] left-[48px] z-10">
          <p className="absolute left-[34px] top-[32px] w-4 h-4 bg-white" />
          <p className="absolute z-20 left-0 top-[56px] w-[52px] h-[107px] bg-[linear-gradient(160deg,_#71F57C_0%,_rgba(113,245,124,0)_62%)]" />
          <p className="absolute left-[38px] top-[106px] w-[28px] h-[28px] bg-[#70EEEA]" />
          <p className="absolute left-[80px] top-0 w-[12px] h-[12px] bg-white" />
        </div>

        {/* 板橋 */}
        <div className="relative flex justify-center items-center">
          <p className="font-noto-sans-jp font-black text-white text-[83px] leading-[140px]">
            板<br />橋
          </p>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="whitespace-nowrap font-noto-sans-jp font-black text-blue-primary text-[34px] leading-[120%] tracking-[5%] text-center">
              僑中分館
              <br />
              三米線
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
    </section>
  )
}

export default memo(Address)
