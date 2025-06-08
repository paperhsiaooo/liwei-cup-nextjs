'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { loginWithInvitationCodeAPI } from '@/apis/hook/use-user'
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

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['user/loginWithInvitationCode'],
    mutationFn: payload => loginWithInvitationCodeAPI(payload),
    onSuccess: data => {
      console.log('[invite-card] data:', data)
    },
  })

  const onSubmit = useCallback(
    async data => {
      const payload = {
        invitation_code: data.inviteCode,
      }

      await mutateAsync(payload)
    },
    [mutateAsync],
  )

  return (
    <section className="root bg-gray-300">
      <div className="wrapper min-h-[400px]">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <div>
              <p>邀請碼</p>
              <RHFTextField name="inviteCode" type="text" />
            </div>
            <button
              type="submit"
              className={twMerge(
                'bg-blue-400 text-sm text-white py-1 px-2 rounded-md',
                isPending && 'bg-gray-400',
              )}
            >
              送出
            </button>
          </div>
        </FormProvider>
      </div>
    </section>
  )
}

export default InviteCard
