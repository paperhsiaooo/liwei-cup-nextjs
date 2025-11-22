// src/app/auth/verify/page.jsx
import Link from 'next/link'

import { PATH } from '@/routers/path'

function CheckIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75 9 17.25 19.5 6.75"
      />
    </svg>
  )
}

function AlertIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4m0 4h.01M10.477 4.395 2.89 17.26c-.78 1.338.195 3.014 1.695 3.014h14.83c1.5 0 2.475-1.676 1.695-3.014L13.523 4.395c-.75-1.286-2.296-1.286-3.046 0Z"
      />
    </svg>
  )
}

function ClockIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

function InfoIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8h.01M11 11h1v5m8-3a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
      />
    </svg>
  )
}

export function resolveStatus(statusCode) {
  if (statusCode === 200) return 'success'
  if (statusCode === 400 || statusCode === 422) return 'invalid'
  if (statusCode === 410) return 'expired'
  return 'error'
}

export const STATUS_CONTENT = {
  success: {
    status: 'success',
    accent: 'from-green-primary via-green-primary/80 to-blue-primary/70',
    iconRing: 'border-green-primary/50 text-green-primary',
    iconGradient: 'from-white via-green-primary/10 to-green-primary/25',
    badge: {
      text: '驗證成功',
      className:
        'border-green-primary/40 bg-green-primary/10 text-green-primary',
    },
    title: '驗證完成',
    description:
      '您的力維盃帳號已成功啟用，接下來就能輕鬆掌握賽事與專屬活動資訊。',
    hint: '如已登入，可直接關閉此頁面；若有任何問題，歡迎聯絡賽事工作小組。',
    actions: [
      {
        href: PATH.auth.login,
        label: '前往登入',
        variant: 'primary',
      },
      {
        href: PATH.root,
        label: '回首頁',
        variant: 'secondary',
      },
    ],
    icon: CheckIcon,
  },
  invalid: {
    status: 'invalid',
    accent: 'from-orange-primary via-orange-primary/80 to-yellow-primary/80',
    iconRing: 'border-orange-primary/50 text-orange-primary',
    iconGradient: 'from-white via-orange-primary/10 to-orange-primary/20',
    badge: {
      text: '連結無效',
      className:
        'border-orange-primary/40 bg-orange-primary/10 text-orange-primary',
    },
    title: '驗證失敗',
    description:
      '無法確認此驗證連結，可能是連結有誤或已被使用，請重新索取驗證信。',
    hint: '請回到註冊流程再次發送驗證信，或與客服聯繫協助處理。',
    actions: [
      {
        href: PATH.auth.signup,
        label: '回到註冊',
        variant: 'primary',
      },
      {
        href: PATH.root,
        label: '回首頁',
        variant: 'secondary',
      },
    ],
    icon: AlertIcon,
  },
  expired: {
    status: 'expired',
    accent: 'from-yellow-primary via-orange-primary/80 to-orange-primary/70',
    iconRing: 'border-orange-primary/50 text-orange-primary',
    iconGradient: 'from-white via-yellow-primary/15 to-orange-primary/25',
    badge: {
      text: '連結逾期',
      className:
        'border-yellow-primary/50 bg-yellow-primary/10 text-orange-primary',
    },
    title: '驗證連結已過期',
    description:
      '此驗證連結已超過有效期限，請重新申請一封新的驗證信以啟用帳號。',
    hint: '若您已完成付款或仍無法取得驗證信，請提供資料給客服協助處理。',
    actions: [
      {
        href: PATH.auth.signup,
        label: '重新申請',
        variant: 'primary',
      },
      {
        href: PATH.root,
        label: '回首頁',
        variant: 'secondary',
      },
    ],
    icon: ClockIcon,
  },
  'missing-token': {
    status: 'missing-token',
    accent: 'from-blue-primary via-blue-primary/70 to-slate-500/60',
    iconRing: 'border-blue-primary/40 text-blue-primary',
    iconGradient: 'from-white via-blue-primary/10 to-blue-primary/20',
    badge: {
      text: '缺少驗證碼',
      className: 'border-blue-primary/40 bg-blue-primary/10 text-blue-primary',
    },
    title: '無法完成驗證',
    description: '我們未收到驗證碼，請確認連結是否完整或重新複製信件中的網址。',
    hint: '若您是從手機開啟，建議長按複製完整連結後再貼到瀏覽器。',
    actions: [
      {
        href: PATH.auth.signup,
        label: '回到註冊',
        variant: 'primary',
      },
      {
        href: PATH.root,
        label: '回首頁',
        variant: 'secondary',
      },
    ],
    icon: InfoIcon,
  },
  error: {
    status: 'error',
    accent: 'from-blue-primary via-blue-primary/80 to-slate-600/70',
    iconRing: 'border-blue-primary/40 text-blue-primary',
    iconGradient: 'from-white via-blue-primary/10 to-blue-primary/20',
    badge: {
      text: '系統忙線',
      className: 'border-blue-primary/40 bg-blue-primary/10 text-blue-primary',
    },
    title: '系統暫時無法驗證',
    description: '伺服器目前無法完成驗證，請稍後重新整理或聯絡力維盃工作小組。',
    hint: '若問題持續發生，我們建議提供註冊用的電子信箱，以利後續追蹤。',
    actions: [
      {
        href: PATH.root,
        label: '回首頁',
        variant: 'primary',
      },
    ],
    icon: InfoIcon,
  },
}

export default async function VerifyPage({ searchParams }) {
  const token = searchParams?.token

  if (!token) {
    return <VerifyResult status="missing-token" />
  }

  const baseUrl = process.env.BASE_URL

  if (!baseUrl) {
    console.error('BASE_URL 環境變數未設定，無法發送驗證請求')
    return <VerifyResult status="error" />
  }

  let status = 'error'

  try {
    const response = await fetch(`${baseUrl}/api/public/v1/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store',
    })

    status = resolveStatus(response.status)
  } catch (error) {
    console.error('驗證 API 呼叫失敗', error)
    status = 'error'
  }

  return <VerifyResult status={status} />
}

export function VerifyResult({ status }) {
  const content = STATUS_CONTENT[status] ?? STATUS_CONTENT.error
  return <StatusCard {...content} />
}

export function StatusCard({
  accent,
  iconRing,
  iconGradient,
  badge,
  title,
  description,
  hint,
  actions = [],
  icon,
}) {
  const Icon = icon ?? InfoIcon

  return (
    <section className="root">
      <div className="wrapper flex min-h-screen items-center justify-center py-16">
        <article className="relative w-full max-w-[520px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
          <div
            className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${accent}`}
          />

          <div className="px-8 pb-12 pt-16 text-center sm:px-12">
            <div
              className={`mx-auto flex size-20 items-center justify-center rounded-full border-4 bg-gradient-to-br ${iconRing} ${iconGradient}`}
            >
              <Icon className="size-9 text-current sm:size-10" />
            </div>

            {badge ? (
              <span
                className={`mt-8 inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${badge.className}`}
              >
                {badge.text}
              </span>
            ) : null}

            <h1 className="mt-6 font-anton text-4xl text-blue-primary">
              {title}
            </h1>

            <p className="mt-4 text-base text-muted-foreground">
              {description}
            </p>

            {hint ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-4 text-sm leading-relaxed text-slate-600">
                {hint}
              </div>
            ) : null}

            {actions.length > 0 ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {actions.map(action => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={
                      action.variant === 'secondary'
                        ? 'inline-flex w-full items-center justify-center rounded-full border border-blue-primary/60 px-6 py-3 font-semibold text-blue-primary transition-colors hover:bg-blue-primary/10 sm:w-auto'
                        : 'inline-flex w-full items-center justify-center rounded-full bg-blue-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-primary/90 sm:w-auto'
                    }
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  )
}
