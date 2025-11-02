import { ConsumerRightsView } from '@/sections/consumer-rights/views'

export const metadata = {
  title: '消費者權益',
  description:
    'リキイ 盃錦標賽消費者權益說明，包含七日鑑賞期、商品瑕疵處理、退換貨流程與相關權益保障。',
  keywords: [
    '消費者權益',
    '七日鑑賞期',
    '退換貨',
    '消費者保護法',
    '力維盃',
    'リキイ',
    'リキイ 盃',
  ],
  openGraph: {
    title: '消費者權益 | リキイ 盃錦標賽',
    description:
      'リキイ 盃錦標賽消費者權益說明，包含七日鑑賞期、商品瑕疵處理、退換貨流程。',
    url: 'https://liwei-cup.com/consumer-rights',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/consumer-rights',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function ConsumerRightsPage() {
  return <ConsumerRightsView />
}

export default ConsumerRightsPage
