import LoginClient from './login-client'

export const metadata = {
  title: '會員登入 | 2025 力維盃排球錦標賽',
  description: '登入您的力維盃帳號，查看參賽資訊和訂單記錄',
  robots: 'noindex, nofollow',
}

export default function LoginPage() {
  return <LoginClient />
}
