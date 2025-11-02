'use client'

import Link from 'next/link'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import Loader from '@/components/common/loader'
import { PATH } from '@/routers/path'

import { AuthCard } from '../components'
import PasswordInput from '../components/password-input'
import useSignupForm from '../hook/use-signup-form'

export default function SignupView() {
  const { methods, handleSubmit, onSubmit, isPending } = useSignupForm()

  return (
    <div className="min-h-screen bg-green-primary py-12">
      <AuthCard title="力維盃 2025 註冊">
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
            <PasswordInput name="password" label="密碼" showStrength={true} />

            {/* 確認密碼欄位 */}
            <PasswordInput name="confirmPassword" label="確認密碼" />

            {/* 邀請碼欄位（選填） */}
            <div>
              <label
                htmlFor="invitationCode"
                className="mb-2 block text-base font-semibold text-slate-700"
              >
                邀請碼（選填）
              </label>
              <RHFTextField name="invitationCode" placeholder="ABC123" />
              <p className="mt-1 text-sm text-blue-primary">
                💡 有邀請碼可享特殊優惠！
              </p>
            </div>

            {/* 註冊按鈕 */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full cursor-pointer rounded-lg bg-blue-primary py-3 font-bold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? <Loader /> : '註冊'}
            </button>

            {/* 登入連結 */}
            <div className="text-center text-sm text-gray-600">
              已有帳號？{' '}
              <Link
                href={PATH.auth.login}
                className="font-bold text-blue-primary hover:underline"
              >
                立即登入
              </Link>
            </div>
          </div>
        </FormProvider>
      </AuthCard>
    </div>
  )
}
