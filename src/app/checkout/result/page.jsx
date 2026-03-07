import { Suspense } from 'react'

import CheckoutResultClient from './result-client'

export const metadata = {
  title: '付款結果 | 力維盃',
  description: '查看您的付款結果',
}

// 顯示載入中狀態的骨架
function LoadingSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-slate-200" />
        <div className="mx-auto h-6 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mx-auto h-4 w-32 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  )
}

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <CheckoutResultClient />
    </Suspense>
  )
}
