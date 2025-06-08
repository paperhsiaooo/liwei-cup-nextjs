import './index.css'

import GlobalComponents from '@/components/global-components'
import { AppProvider } from '@/provider'

export const metadata = {
  title: '力維盃',
  description: '力維盃',
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
