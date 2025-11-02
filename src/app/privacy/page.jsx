import { PrivacyView } from '@/sections/privacy/views'

export const metadata = {
  title: '隱私權政策',
  description:
    'リキイ 盃錦標賽隱私權政策，說明我們如何蒐集、處理與利用您的個人資料，並說明您可行使之權利。',
  keywords: [
    '隱私權政策',
    '個人資料保護',
    '力維盃',
    '資料蒐集',
    '個資法',
    'リキイ',
    'リキイ 盃',
  ],
  openGraph: {
    title: '隱私權政策 | リキイ 盃錦標賽',
    description:
      'リキイ 盃錦標賽隱私權政策，說明我們如何蒐集、處理與利用您的個人資料。',
    url: 'https://liwei-cup.com/privacy',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function PrivacyPage() {
  return <PrivacyView />
}

export default PrivacyPage
