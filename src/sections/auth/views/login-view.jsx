'use client'

import Link from 'next/link'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import Loader from '@/components/common/loader'
import { PATH } from '@/routers/path'

import { AuthCard } from '../components'
import PasswordInput from '../components/password-input'
import useLoginForm from '../hook/use-login-form'

export default function LoginView() {
  const { methods, handleSubmit, onSubmit, isPending } = useLoginForm()

  return (
    <div className="min-h-screen bg-green-primary py-12">
      <AuthCard title="力維盃 2025 登入">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email 欄位 */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base font-semibold text-slate-700"
              >
                Email
              </label>
              <RHFTextField
                name="email"
                placeholder="example@email.com"
                type="email"
              />
            </div>

            {/* 密碼欄位 */}
            <PasswordInput name="password" label="密碼" />

            {/* 登入按鈕 */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-lg bg-blue-primary py-3 font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? <Loader /> : '登入'}
            </button>

            {/* 註冊連結 */}
            <div className="text-center text-sm text-gray-600">
              還沒有帳號？{' '}
              <Link
                href={PATH.auth.signup}
                className="font-bold text-blue-primary hover:underline"
              >
                立即註冊
              </Link>
            </div>
          </div>
        </FormProvider>
      </AuthCard>
    </div>
  )
}
