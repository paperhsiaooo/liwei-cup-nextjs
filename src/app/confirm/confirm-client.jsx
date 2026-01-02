'use client'

import { format } from 'date-fns'
import { notFound, useSearchParams } from 'next/navigation'

import { useOrderDetail } from '@/apis/hook/use-order'
import CheckoutProgress from '@/components/common/checkout-progress'
import UnauthorizedState from '@/components/common/unauthorized-state'
import { Button } from '@/components/ui/button'
import OrderSummary from '@/sections/checkout/components/order-summary'

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex gap-2 text-slate-700">
      <span className="min-w-[64px] text-sm font-medium text-slate-600">
        {label}
      </span>
      <span className="text-sm">{value}</span>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="h-24 rounded-2xl border bg-slate-100 animate-pulse"
        />
      ))}
    </div>
  )
}

function ConfirmClient() {
  const searchParams = useSearchParams()
  const orderNumber = (searchParams.get('orderNumber') || '').trim()

  if (!orderNumber) {
    notFound()
  }

  const {
    data,
    isLoading,
    error: orderError,
  } = useOrderDetail(orderNumber, { retry: false })

  if (orderError?.response?.status === 401) {
    return (
      <UnauthorizedState
        title="沒有權限"
        description="您沒有權限檢視這筆訂單。"
      />
    )
  }

  if (orderError?.response?.status === 404) {
    notFound()
  }

  const order = data?.data
  const customer = order?.customerInfo || {}
  const recipient = order?.recipientInfo || {}
  const store = order?.selectedStore || {}
  const deliveryNote = order?.deliveryNote || ''
  const formattedCreatedAt = order?.createdAt
    ? format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm:ss')
    : ''

  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        <CheckoutProgress currentStep={3} />

        <div className="mb-8 space-y-2">
          <h1 className="font-anton text-4xl text-blue-primary">訂單確認</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請確認您的訂單資訊。
          </p>
          <div className="text-sm text-slate-600">
            <span className="font-medium text-blue-primary">訂單編號：</span>
            <span>{orderNumber}</span>
            {formattedCreatedAt ? (
              <span className="ml-3 text-slate-500">
                建立時間：{formattedCreatedAt}
              </span>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : order ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
            <div className="order-1 space-y-6 lg:order-1">
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="font-anton text-xl text-blue-primary mb-4">
                  訂購人資訊
                </h2>
                <div className="space-y-2">
                  <InfoRow label="姓名" value={customer.name || '—'} />
                  <InfoRow label="電話" value={customer.phone || '—'} />
                  <InfoRow label="Email" value={customer.email || '—'} />
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h2 className="font-anton text-xl text-blue-primary mb-4">
                  收件資訊
                </h2>
                <div className="space-y-2">
                  <InfoRow label="姓名" value={recipient.name || '—'} />
                  <InfoRow label="電話" value={recipient.phone || '—'} />
                  <InfoRow
                    label="取貨門市"
                    value={
                      store.name || store.address
                        ? `${store.name ?? ''}${store.name && store.address ? '｜' : ''}${store.address ?? ''}`
                        : '—'
                    }
                  />
                  <InfoRow label="備註" value={deliveryNote || '—'} />
                </div>
              </div>
            </div>
            <div className="order-2 lg:order-2">
              <OrderSummary order={order} />
            </div>
            <div className="order-3 rounded-3xl border bg-white p-6 shadow-sm lg:order-3">
              <h2 className="font-anton text-xl text-blue-primary mb-4">
                下一步
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                請確認資料無誤後，點擊下方按鈕前往付款。
              </p>
              <Button
                type="button"
                className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90 font-anton tracking-widest"
              >
                前往付款
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border bg-white p-6 shadow-sm text-slate-700">
            目前無法取得訂單資料，請稍後再試。
          </div>
        )}

        {orderError && !isLoading && !order ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            取得訂單資料時發生錯誤，請稍後再試。
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ConfirmClient
