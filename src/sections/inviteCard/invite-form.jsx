import { twMerge } from 'tailwind-merge'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'

import useForm from './hook/useForm'

function InviteForm() {
  const { methods, handleSubmit, onSubmit, isPending } = useForm()

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <div>
          <p>邀請碼</p>
          <RHFTextField name="inviteCode" type="text" />
        </div>
        <button
          type="submit"
          className={twMerge(
            'bg-blue-400 text-sm text-white py-2 px-2 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500',
            isPending && 'bg-gray-400',
          )}
        >
          送出
        </button>
      </div>
    </FormProvider>
  )
}

export default InviteForm
