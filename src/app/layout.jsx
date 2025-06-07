import './index.css'
import GlobalComponents from '@/components/global-components'
import { AppProvider } from '@/provider'

function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        <AppProvider>
          <GlobalComponents>{children}</GlobalComponents>
        </AppProvider>
      </body>
    </html>
  )
}

export default RootLayout
