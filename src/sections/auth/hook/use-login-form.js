/* eslint-disable import/no-named-as-default */
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

  const { mutateAsync, isPending } = useLogin(async data => {
    const payload = data ?? {}

    // 更新 user store（資料為空時仍會標記登入狀態）
    await loginSuccess(payload)

    const email = methods.getValues('email')

    if (email) {
      posthog.identify(email, {
        email,
        login_method: 'email',
      })

      posthog.capture('user_login', {
        method: 'email',
        email,
      })
    }

    router.push(PATH.settings.profile)
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(
    async formData => {
      try {
        await mutateAsync({
          email: formData.email,
          password: formData.password,
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
