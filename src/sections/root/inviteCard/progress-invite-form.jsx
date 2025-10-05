'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

import FormProvider from '@/components/common/hook-form/form-provider'
import useUserContext from '@/store/user-context'

import RHFTextField from './components/rhf-text-field'
import useForm from './hook/useInviteCodeForm'
import useProgressContext, { STEP } from './store/progress-context'

function ProgressInviteForm() {
  const user = useUserContext(state => state.user)
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)

  const { methods, handleSubmit, onSubmit, isPending } = useForm()

  const handleOnLineNextBtnClick = useCallback(() => {
    setCurrentStep(STEP.PLAYER_INFO)
  }, [setCurrentStep])

  return (
    <div className="flex flex-col gap-y-[110px] pt-6 pb-20">
      {!user.isLogin ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 max-w-[850px] mx-auto 1440:gap-y-6">
            <h4 className="progress-title 1440:text-[34px]">邀請碼輸入</h4>
            <div className="">
              <RHFTextField
                name="inviteCode"
                type="text"
                className="font-bold text-center bg-white/40 text-blue-primary min-h-[54px] py-12 px-4 1440:py-16"
              />
            </div>
            <button
              type="submit"
              className={twMerge('btn-primary', isPending && 'bg-gray-400')}
            >
              <span className="text-white text-base 1440:text-[22px]">
                下一步
              </span>
            </button>
          </div>
        </FormProvider>
      ) : (
        <div className="flex flex-col items-center gap-y-6">
          <h4 className="progress-title 1440:text-[34px]">加入 Line 群組</h4>
          <Link
            href="https://line.me/ti/g/tjntwUbYwt"
            className="relative w-32 aspect-square 1440:w-[160px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/qrCode.jpg"
              alt="line-invite-qr-code"
              fill={true}
              objectFit="contain"
            />
          </Link>
          <button
            type="button"
            className={twMerge('btn-primary', isPending && 'bg-gray-400')}
            onClick={handleOnLineNextBtnClick}
          >
            <span className="text-white text-base leading-none 1440:text-[22px]">
              下一步 ｜ 填寫資料
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProgressInviteForm
