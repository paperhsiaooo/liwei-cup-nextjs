import './index.css'

import GlobalComponents from '@/components/global-components'
import { AppProvider } from '@/provider'

export const metadata = {
  title: '2025 力維盃錦標賽',
  description:
    '力維盃官方網站 - 提供賽事資訊、報名參加、賽程安排與最新消息。歡迎參與這個充滿挑戰與樂趣的競賽活動。',
}

// import noto sans tc font
import { Noto_Sans_JP, Noto_Sans_TC } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700'],
})

function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className={(notoSansJP.className, notoSansTC.className)}>
        <AppProvider>
          <GlobalComponents>{children}</GlobalComponents>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
