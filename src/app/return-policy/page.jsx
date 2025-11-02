import { ReturnPolicyView } from '@/sections/return-policy/views'

export const metadata = {
  title: '退換貨政策',
  description:
    'リキイ 盃錦標賽退換貨政策，詳細說明申請期限、流程、運費規範、退款時程與不受理情形。',
  keywords: [
    '退換貨政策',
    '退貨流程',
    '換貨規定',
    '退款時程',
    '力維盃',
    'リキイ',
    'リキイ 盃',
  ],
  openGraph: {
    title: '退換貨政策 | リキイ 盃錦標賽',
    description:
      'リキイ 盃錦標賽退換貨政策，詳細說明申請期限、流程、運費規範。',
    url: 'https://liwei-cup.com/return-policy',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/return-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

function ReturnPolicyPage() {
  return <ReturnPolicyView />
}

export default ReturnPolicyPage
