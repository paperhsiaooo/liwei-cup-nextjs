'use client'

import Image from 'next/image'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDeclarationsOptions } from '@/apis/hook/use-declarations'

import CustomSelect from './components/custom-select'

function ProgressDeclarations() {
  const { data: optionsData, isLoading, error } = useDeclarationsOptions()

  console.log('optionsData: ', optionsData)

  // 從 API 資料中獲取選項，假設 API 回傳格式為 { data: { option1: [], option2: [], option3: [] } }
  const options1 = optionsData?.data?.Category1 || []
  const options2 = optionsData?.data?.Category2 || []
  const options3 = optionsData?.data?.Category3 || []

  // 如果正在載入，顯示載入狀態
  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-6 pt-9 pb-20">
        <div className="relative rounded-[8px] bg-white px-4 pb-5 pt-3 flex flex-col gap-y-3">
          <div className="text-center text-gray-500">載入中...</div>
        </div>
      </div>
    )
  }

  // 如果有錯誤，顯示錯誤狀態
  if (error) {
    return (
      <div className="flex flex-col gap-y-6 pt-9 pb-20">
        <div className="relative rounded-[8px] bg-white px-4 pb-5 pt-3 flex flex-col gap-y-3">
          <div className="text-center text-red-500">載入失敗，請稍後再試</div>
        </div>
      </div>
    )
  }

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
          <CustomSelect placeholder="你的個性" options={options1} />
          <CustomSelect placeholder="你是誰" options={options2} />
          <CustomSelect placeholder="要告訴對手的話" options={options3} />
        </div>
      </div>
      <button type="submit" className={twMerge('btn-primary')}>
        <span className="text-white text-base">完成</span>
      </button>
    </div>
  )
}

export default memo(ProgressDeclarations)
