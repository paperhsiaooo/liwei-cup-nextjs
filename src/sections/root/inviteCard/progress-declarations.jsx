'use client'

import Image from 'next/image'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDeclarationsOptions } from '@/apis/hook/use-declarations'
import FormProvider from '@/components/common/hook-form/form-provider'

import CustomSelect from './components/custom-select'
import CustomTextarea from './components/custom-textarea'
import useDeclarationsForm from './hook/useDeclarationsForm'

function ProgressDeclarations() {
  const { methods, handleSubmit, onSubmit, onRefreshDeclarationSelect } =
    useDeclarationsForm()

  const {
    data: optionsData,
    isLoading,
    error,
  } = useDeclarationsOptions({ onSuccess: onRefreshDeclarationSelect })

  // 從 API 資料中獲取選項，假設 API 回傳格式為 { data: { option1: [], option2: [], option3: [] } }
  const options1 = optionsData?.data?.Category1 || []
  const options2 = optionsData?.data?.Category2 || []
  const options3 = optionsData?.data?.Category3 || []

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
    <FormProvider
      className="flex flex-col gap-y-6 pt-9 pb-20"
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
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
            disabled={isLoading}
            name="declaration1"
            placeholder="你的個性"
            options={options1}
          />
          <CustomSelect
            disabled={isLoading}
            name="declaration2"
            placeholder="你是誰"
            options={options2}
          />
          <CustomSelect
            disabled={isLoading}
            name="declaration3"
            placeholder="要告訴對手的話"
            options={options3}
          />
        </div>
        <CustomTextarea
          disabled={isLoading}
          name="messageToOrganizer"
          placeholder="預計要跟主辦方說的話"
        />
      </div>
      <button type="submit" className={twMerge('btn-primary')}>
        <span className="text-white text-base">送出</span>
      </button>
    </FormProvider>
  )
}

export default memo(ProgressDeclarations)
