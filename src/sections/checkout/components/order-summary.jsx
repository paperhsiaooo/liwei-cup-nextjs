'use client'

import Image from 'next/image'

import { formatCurrencyNT } from '@/utils/currency'

export default function OrderSummary({ order }) {
  const items = Array.isArray(order?.items) ? order.items : []

  const subtotal =
    typeof order?.subtotal === 'number'
      ? order.subtotal
      : items.reduce((total, item) => total + (item?.totalPrice || 0), 0)

  const discount = typeof order?.discount === 'number' ? order.discount : 0
  const shippingFee =
    typeof order?.shippingFee === 'number' ? order.shippingFee : 0

  const total =
    typeof order?.total === 'number' && order.total > 0
      ? order.total
      : subtotal - discount + shippingFee

  return (
    <aside className="ml-auto w-full rounded-3xl border bg-white shadow-sm lg:w-[350px] lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)]">
      <div className="border-b px-6 py-5">
        <h2 className="font-anton text-xl text-blue-primary">訂單摘要</h2>
      </div>

      <div className="space-y-4 p-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        {/* 商品列表 */}
        <div className="space-y-3 border-b pb-4">
          {items.length === 0 ? (
            <p className="text-sm text-slate-600">目前沒有訂單商品</p>
          ) : (
            items.map(item => (
              <div
                key={`${item.productId}-${item.variantId ?? 'default'}`}
                className="flex items-center gap-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200">
                      <span className="text-xs text-slate-400">無圖片</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="truncate text-sm font-semibold text-blue-primary">
                    {item.productName}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-600">{item.description}</p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-blue-primary">
                    {formatCurrencyNT(item.totalPrice ?? 0)}
                  </p>
                  <p className="text-xs text-slate-600">x{item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 價格明細 */}
        <div className="space-y-3 font-noto-sans-tc text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>商品小計</span>
            <span className="font-semibold text-blue-primary">
              {formatCurrencyNT(subtotal)}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between">
              <span>折扣</span>
              <span className="font-semibold text-orange-primary">
                -{formatCurrencyNT(discount)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>運費</span>
            <span className="font-semibold text-blue-primary">
              {formatCurrencyNT(shippingFee)}
            </span>
          </div>

          {/* 總計 */}
          <div className="flex items-center justify-between border-t pt-3 text-base font-semibold text-blue-primary">
            <span className="font-anton text-lg">總計</span>
            <span className="font-anton text-lg text-orange-primary">
              {formatCurrencyNT(total)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
