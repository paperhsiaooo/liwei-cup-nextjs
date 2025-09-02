import Image from 'next/image'
import { memo } from 'react'

import { InfoDate, InfoDestination, InfoDistance, InfoDuration } from './'

function Address() {
  return (
    <section className="root bg-orange-primary">
      <div className="relative pt-[560px] max-w-[375px] mx-auto">
        <div className="absolute top-[148px] left-7 w-[157px] aspect-[314/206]">
          <Image
            src="/images/picture/05.jpg"
            alt="picture-05"
            width={314}
            height={206}
          />
        </div>

        <div className="absolute z-10 top-44 right-7 w-[145px] aspect-[290/346]">
          <Image
            src="/images/picture/04.jpg"
            alt="picture-04"
            width={290}
            height={346}
          />
        </div>

        <div className="absolute top-[300px] left-7 w-[277px] aspect-[554/284]">
          <Image
            src="/images/picture/03.jpg"
            alt="picture-04"
            width={554}
            height={284}
          />
        </div>

        <div className="absolute top-[490px] left-12 w-[92px] aspect-[185/448]">
          <Image
            src="/images/particle-01.png"
            alt="particle-01"
            width={185}
            height={448}
          />
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
