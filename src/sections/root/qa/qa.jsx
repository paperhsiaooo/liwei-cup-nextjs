import { memo } from 'react'

import { QaContainer } from '.'

function Qa() {
  return (
    <div className="relative">
      <span className="absolute top-2 left-0 w-full h-2 bg-green-primary" />
      <div className="wrapper max-w-[350px] mx-auto py-14 flex flex-col gap-6">
        <div className="flex flex-col justify-start items-start text-blue-primary">
          <h1 className="font-anton font-normal leading-snug text-6xl whitespace-nowrap">
            Q & A
          </h1>
          <p className="text-sm">
            一起深度了解關於「リキイ 盃」的常見問題， 讓你迅速找到好解答！
          </p>
        </div>
        <QaContainer />
      </div>
    </div>
  )
}

export default memo(Qa)
