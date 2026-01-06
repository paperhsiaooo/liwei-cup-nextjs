/* eslint-disable import/no-named-as-default */
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useSignup } from '@/apis/hook/use-auth'
import { PATH } from '@/routers/path'
import { showSuccessToast } from '@/utils/toast'

import { defaultValues, signupSchema } from '../schema/signup-schema'

export default function useSignupForm() {
  const router = useRouter()

  const methods = useReactHookForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  })

  const { mutateAsync, isPending } = useSignup(data => {
    if (data?.email) {
      posthog.capture('user_register_success', {
        email: data.email,
        has_invitation_code: Boolean(data.invitation_code),
        signup_method: 'email',
        status: data.status,
        is_resend: Boolean(data.is_resend),
      })
    }

    const description = data?.email
      ? `我們已將驗證信寄送至 ${data.email}，請於有效期限內完成驗證。`
      : '我們已寄出驗證信至您的信箱，請於有效期限內完成驗證。'

    showSuccessToast({
      title: data?.is_resend ? '已重新寄送驗證信' : '註冊成功',
      description,
      duration: 6000,
    })

    router.push(PATH.auth.login)
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(
    async data => {
      const hasInvitationCode =
        typeof data.invitationCode === 'string' &&
        data.invitationCode.trim().length > 0

      try {
        const payload = {
          email: data.email,
          password: data.password,
        }

        // 如果有填寫邀請碼，加入 payload
        if (hasInvitationCode) {
          payload.invitation_code = data.invitationCode.trim()
        }

        posthog.capture('user_register_attempt', {
          email: data.email,
          has_invitation_code: hasInvitationCode,
          signup_method: 'email',
        })

        await mutateAsync(payload)
      } catch (error) {
        // 錯誤已由 axios interceptor 處理
        console.error('Signup failed:', error)
      }
    },
    [mutateAsync],
  )

  return {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
  }
}
