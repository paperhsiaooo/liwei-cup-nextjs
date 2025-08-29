import { memo } from 'react'

import { QaContainer } from '.'

function Qa() {
  return (
    <section className="root">
      <span className="absolute top-2 left-0 w-full h-2 bg-green-primary" />
      <div className="wrapper max-w-[350px] mx-auto pt-10 pb-5 space-y-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-start items-center text-blue-primary">
            <h1 className="font-anton font-normal leading-snug text-[84px] whitespace-nowrap">
              Q & A
            </h1>
            <p className="text-base max-w-[260px] text-center mx-auto">
              一起深度了解
              <br />
              關於「リキイ 盃」的常見問題，
              <br />
              讓你迅速找到好解答！
            </p>
          </div>
          <QaContainer />
        </div>
        <p className="text-base text-[#233145]/30 font-noto-sans-tc text-center">
          #リキイ 盃 2025
        </p>
      </div>
    </section>
  )
}

export default memo(Qa)
