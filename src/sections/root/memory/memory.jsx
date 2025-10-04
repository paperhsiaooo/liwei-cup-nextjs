import Image from 'next/image'

import { cn } from '@/lib/utils'

function Memory({ className }) {
  return (
    <div className={cn('bg-blue-primary', className)}>
      <div className="relative max-w-[375px] mx-auto w-full h-[1190px]">
        {/* On the count, every shot is the true of yourself */}
        <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 w-[271px] h-[82px]">
          <p className="text-green-primary text-left font-anton font-normal text-[22px] leading-tight">
            ON
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            THE
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            COUNT,
          </p>
          <p className="text-green-primary text-left font-anton font-normal text-[22px] leading-tight">
            EVERY
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            SHOT
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            IS
          </p>
          <p className="text-white text-left font-anton font-normal text-[22px] leading-tight">
            THE TRUE OF YOURSELF
          </p>
        </div>

        {/* 球場上每一次喊聲，都是你・真實的樣子 */}
        <div className="absolute top-[264px] right-8 z-10 flex flex-row">
          <p
            style={{ writingMode: 'vertical-rl' }}
            className="text-white text-nowrap font-noto-sans-tc font-bold text-xl leading-tight tracking-[0.3em]"
          >
            都是你・<span className="text-orange-primary">真實的樣子</span>
          </p>
          <p
            style={{ writingMode: 'vertical-rl' }}
            className="text-white text-nowrap font-noto-sans-tc font-bold text-xl leading-tight tracking-[0.3em]"
          >
            球場上每一次喊聲
          </p>
        </div>

        {/* 這裡只留下 敢贏的人 */}
        <div className="absolute top-[650px] right-[100px] z-10">
          <p className="text-white text-nowrap font-noto-sans-tc font-extrabold text-[45px] leading-tight">
            這裡&nbsp;&nbsp;只留下
          </p>
          <p className="text-orange-primary text-nowrap font-noto-sans-tc font-extrabold text-[45px] leading-tight">
            敢贏的人
          </p>
        </div>

        {/* Deco-01 */}
        <div className="absolute top-[460px] left-[146px] z-10">
          <p className="absolute left-0 top-0 w-[10px] h-[10px] bg-white" />
          <p className="absolute left-[20px] top-[28px] w-[14px] h-[14px] bg-white" />
          <p className="absolute z-20 left-[20px] top-[48px] w-[33px] h-[107px] bg-[linear-gradient(160deg,_#71F57C_0%,_rgba(113,245,124,0)_62%)]" />
          <p className="absolute left-[8px] top-[88px] w-[22px] h-[22px] bg-[#70EEEA]" />
        </div>

        {/* Deco-02 */}
        <div className="absolute top-[760px] left-[254px] z-10">
          <p className="absolute z-10 left-1 top-0 w-[10px] h-[10px] bg-white" />
          <p className="absolute left-[8px] -top-[20px] w-[25px] h-[58px] bg-[linear-gradient(180deg,_#FA7025_10%,_rgba(250,112,37,0)_62%)]" />
        </div>

        {/* Deco-03 */}
        <div className="absolute top-[872px] left-[174px] z-10">
          <p className="absolute z-10 left-1 top-0 w-[10px] h-[26px] bg-orange-primary" />
          <p className="absolute z-10 -left-[36px] top-0 w-[35px] h-[26px] bg-orange-primary" />
          <p className="absolute z-20 -left-[202px] top-0 w-[160px] h-[26px] bg-[linear-gradient(-90deg,_#FA7025_0%,_#60A0FF_45%,_rgba(85,187,227,0)_100%)]" />
        </div>

        {/* Deco-04 */}
        <div className="absolute top-[1062px] left-[42px] z-20">
          <p className="absolute left-0 top-0 w-[14px] h-[14px] bg-white" />
          <p className="absolute z-20 left-0 top-5 w-[33px] h-[107px] bg-[linear-gradient(160deg,_#60A0FF_0%,_rgba(96,160,255,0)_62%)]" />
          <p className="absolute -left-[12px] top-[60px] w-[22px] h-[22px] bg-[#70EEEA]" />
          <p className="absolute left-[26px] top-[90px] w-[10px] h-[10px] bg-white" />
        </div>

        <div className="aspect-[274/445] w-[150px] absolute z-0 left-0 top-[266px]">
          <Image
            src="/images/picture/07.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={274}
            height={445}
          />
        </div>

        <div className="aspect-square w-[81px] absolute z-0 left-[190px] top-[450px]">
          <Image
            src="/images/picture/08.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={162}
            height={16}
          />
        </div>

        <div className="aspect-[143/204] w-[73px] absolute z-0 left-[290px] top-[512px]">
          <Image
            src="/images/picture/09.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={143}
            height={204}
          />
        </div>

        <div className="aspect-[275/138] w-[275px] absolute z-0 left-1.5 top-[750px]">
          <Image
            src="/images/picture/10.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={275}
            height={138}
          />
        </div>

        <div className="aspect-[439/277] w-[218px] absolute z-10 left-[64px] top-[980px]">
          <Image
            src="/images/picture/11.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={439}
            height={277}
          />
        </div>

        <div className="aspect-[89/115] w-[89px] absolute z-0 left-[264px] top-[1100px]">
          <Image
            src="/images/picture/12.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={89}
            height={115}
          />
        </div>

        <div className="aspect-square w-[110px] absolute z-0 left-[128px] top-[1160px]">
          <Image
            src="/images/picture/13.jpg"
            alt="main-bg"
            className="object-cover w-full"
            width={220}
            height={220}
          />
        </div>
      </div>
    </div>
  )
}

export default Memory
