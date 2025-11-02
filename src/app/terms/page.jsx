import { TermsView } from '@/sections/terms/views'

export const metadata = {
  title: '服務條款',
  description:
    'リキイ 盃錦標賽服務條款，說明使用本網站及參與活動之相關權利義務、交易規範與法律責任。',
  keywords: [
    '服務條款',
    '使用條款',
    '力維盃',
    '法律條款',
    '用戶協議',
    'リキイ',
    'リキイ 盃',
  ],
  openGraph: {
    title: '服務條款 | リキイ 盃錦標賽',
    description:
      'リキイ 盃錦標賽服務條款，說明使用本網站及參與活動之相關權利義務。',
    url: 'https://liwei-cup.com/terms',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function TermsPage() {
  return <TermsView />
}

export default TermsPage
