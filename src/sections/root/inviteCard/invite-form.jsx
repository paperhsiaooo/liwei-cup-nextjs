import { twMerge } from 'tailwind-merge'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import ProgressStep from '@/components/progress-step/progress-step'

import useForm from './hook/useForm'

function InviteForm() {
  const { methods, handleSubmit, onSubmit, isPending } = useForm()

  return (
    <div className="flex flex-col gap-y-[110px] pt-16 pb-36">
      <div className="w-full max-w-[940px] mx-auto">
        <ProgressStep />
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 max-w-[850px] mx-auto">
          <h4 className="text-blue-primary text-4xl font-bold text-center">
            邀請碼輸入
          </h4>
          <div className="mt-[18px] mb-6">
            <RHFTextField name="inviteCode" type="text" className="bg-white" />
          </div>
          <button
            type="submit"
            className={twMerge(
              'bg-blue-primary py-4 rounded-[18px] min-h-[68px] cursor-pointer hover:bg-blue-primary/90 transition-colors duration-200',
              isPending && 'bg-gray-400',
            )}
          >
            <span className="text-white text-[22px]">下一步</span>
          </button>
        </div>
      </FormProvider>
    </div>
  )
}

export default InviteForm
