import Image from 'next/image'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import CustomSelect from './components/custom-select'

function ProgressDeclarations() {
  return (
    <div className="flex flex-col gap-y-6 pt-9 pb-20">
      <div className="relative rounded-[8px] bg-white px-4 pb-5 pt-3 flex flex-col gap-y-3">
        <div className="absolute top-5 left-5 w-[19px] aspect-square">
          <Image
            src="/images/random.png"
            alt="icon"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-[22px] leading-normal font-bold text-blue-primary text-center">
          我的參戰宣言
        </h3>
        <div className="flex flex-col gap-y-3">
          <CustomSelect
            placeholder="選擇一號選項"
            options={[
              { label: '1', value: '一號選項' },
              { label: '2', value: '二號選項' },
            ]}
          />
          <CustomSelect
            placeholder="選擇二號選項"
            options={[
              { label: '1', value: '一號選項' },
              { label: '2', value: '二號選項' },
            ]}
          />
          <CustomSelect
            placeholder="選擇三號選項"
            options={[
              { label: '1', value: '一號選項' },
              { label: '2', value: '二號選項' },
            ]}
          />
        </div>
      </div>
      <button type="submit" className={twMerge('btn-primary')}>
        <span className="text-white text-base">完成</span>
      </button>
    </div>
  )
}

export default memo(ProgressDeclarations)
