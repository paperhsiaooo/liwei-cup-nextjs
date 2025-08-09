import { twMerge } from 'tailwind-merge'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'

import useForm from './hook/useForm'

function InviteForm() {
  const { methods, handleSubmit, onSubmit, isPending } = useForm()

  return (
    <div className="flex flex-col gap-y-[110px] pt-10 pb-36">
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
    </div>
  )
}

export default InviteForm
