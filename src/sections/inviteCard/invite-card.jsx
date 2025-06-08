'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'

import formSchema from './form-schema'

function InviteCard() {
  const { defaultValues, baseSchema } = formSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(async data => {
    const payload = {
      inviteCode: data.inviteCode,
    }

    console.log(payload)
  }, [])

  return (
    <div className="root">
      <div className="wrapper">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <div>
              <p>邀請碼</p>
              <RHFTextField name="inviteCode" type="text" />
            </div>
            <button
              type="submit"
              className="bg-blue-400 text-sm text-white py-1 px-2 rounded-md"
            >
              送出
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default InviteCard
