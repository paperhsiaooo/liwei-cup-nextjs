import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useLogin } from '@/apis/hook/use-auth'
import { PATH } from '@/routers/path'
import useUserContext from '@/store/user-context'

import { defaultValues, loginSchema } from '../schema/login-schema'

export default function useLoginForm() {
  const router = useRouter()
  const loginSuccess = useUserContext(state => state.loginSuccess)

  const methods = useReactHookForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  })

  const { mutateAsync, isPending } = useLogin(data => {
    // 更新 user store
    loginSuccess(data)

    // PostHog 追蹤
    if (data.email) {
      posthog.identify(data.email, {
        email: data.email,
        name: data.name,
        role: data.role,
        login_method: 'email',
      })

      posthog.capture('user_login', {
        method: 'email',
      })
    }

    // 導向個人資料頁面
    router.push(PATH.settings.profile)
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(
    async data => {
      try {
        await mutateAsync({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        // 錯誤已由 axios interceptor 處理
        console.error('Login failed:', error)
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
