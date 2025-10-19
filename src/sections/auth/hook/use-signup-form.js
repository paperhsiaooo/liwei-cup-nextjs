import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useSignup } from '@/apis/hook/use-auth'
import { PATH } from '@/routers/path'
import useUserContext from '@/store/user-context'

import { defaultValues, signupSchema } from '../schema/signup-schema'

export default function useSignupForm() {
  const router = useRouter()
  const loginSuccess = useUserContext(state => state.loginSuccess)

  const methods = useReactHookForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  })

  const { mutateAsync, isPending } = useSignup(data => {
    // 更新 user store
    loginSuccess(data)

    // PostHog 追蹤
    if (data.email) {
      posthog.identify(data.email, {
        email: data.email,
        name: data.name,
        role: data.role,
        has_invitation_code: Boolean(data.has_invitation_code),
      })

      posthog.capture('user_signup', {
        email: data.email,
        has_invitation_code: Boolean(data.has_invitation_code),
        signup_method: 'email',
      })
    }

    // 導向個人資料頁面
    router.push(PATH.settings.profile)
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(
    async data => {
      try {
        const payload = {
          email: data.email,
          password: data.password,
        }

        // 如果有填寫邀請碼，加入 payload
        if (data.invitationCode && data.invitationCode.trim()) {
          payload.invitation_code = data.invitationCode.trim()
        }

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
