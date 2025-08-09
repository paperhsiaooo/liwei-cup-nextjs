import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import useUserContext from '@/store/user-context'

import useForm from './hook/useForm'

function ProgressInviteForm() {
  const user = useUserContext(state => state.user)

  const { methods, handleSubmit, onSubmit, isPending } = useForm()

  return (
    <div className="flex flex-col gap-y-[110px] pt-10 pb-36">
      {user.isLogin ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4 max-w-[850px] mx-auto">
            <h4 className="text-blue-primary text-2xl font-noto-sans-tc font-bold text-center">
              邀請碼輸入
            </h4>
            <div className="">
              <RHFTextField
                name="inviteCode"
                type="text"
                className="font-bold text-center text-blue-primary"
              />
            </div>
            <button
              type="submit"
              className={twMerge(
                'bg-blue-primary py-4 rounded-[14px] min-h-[54px] cursor-pointer hover:bg-blue-primary/90 transition-colors duration-200',
                isPending && 'bg-gray-400',
              )}
            >
              <span className="text-white text-base">下一步</span>
            </button>
          </div>
        </FormProvider>
      ) : (
        <div className="flex flex-col items-center gap-y-6">
          <div className="relative w-[200px] aspect-square">
            <Image
              src="/images/qrCode.jpg"
              alt="line-invite-qr-code"
              fill={true}
              objectFit="contain"
            />
          </div>
          <button
            type="button"
            className={twMerge(
              'w-full bg-blue-primary py-4 rounded-[14px] min-h-[54px] cursor-pointer hover:bg-blue-primary/90 transition-colors duration-200',
              isPending && 'bg-gray-400',
            )}
          >
            <span className="text-white text-base leading-none">
              加入 Line 群組｜並下一步填寫資料
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProgressInviteForm
