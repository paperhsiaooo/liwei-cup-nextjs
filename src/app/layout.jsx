import './index.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import GlobalComponents from '@/components/global-components'
import { AppProvider } from '@/provider'

export const metadata = {
  title: '2025 力維盃錦標賽',
  description:
    '聲音與氣味會淡去，唯有拚搏的樣子留存在最後。力維盃，用一場比賽，把青春刻進記憶深處。這不只是排球賽，更是一場關於熱血、友情與信念的旅程。每一次奔跑與吶喊，都將成為日後回望時，最難忘的光影殘影。',
  keywords: 'li wei,li-wei,paper,paperhsiaooo,排球,錦標賽,力維盃',
  metadataBase: new URL('https://liwei-cup.com/'),
}

// import noto sans tc font
import { Anton, Antonio, Noto_Sans_JP, Noto_Sans_TC } from 'next/font/google'

import PostHogProvider from '@/provider/post-hog-provider'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  preload: true,
})

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
})

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700'],
})

function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body
        className={`${notoSansJP.className} ${notoSansTC.className} ${anton.className} ${antonio.className}`}
      >
        <AppProvider>
          <PostHogProvider>
            <GlobalComponents>{children}</GlobalComponents>
          </PostHogProvider>
        </AppProvider>
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  )
}

export default RootLayout
