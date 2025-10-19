'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import useCartStore from '@/store/cart-context'
import { formatCurrencyNT } from '@/utils/currency'

function CartPageClient() {
  const router = useRouter()
  const items = useCartStore(state => state.items)
  const incrementItem = useCartStore(state => state.incrementItem)
  const decrementItem = useCartStore(state => state.decrementItem)
  const removeItem = useCartStore(state => state.removeItem)

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  if (items.length === 0) {
    return (
      <section className="root">
        <div className="wrapper flex flex-col items-center gap-6 py-16 text-center">
          <div className="max-w-lg space-y-4">
            <h1 className="font-anton text-4xl text-blue-primary">購物車</h1>
            <p className="font-noto-sans-tc text-muted-foreground">
              您的購物車是空的
            </p>
          </div>
          <Button
            asChild
            className="bg-blue-primary text-white hover:bg-blue-primary/90"
          >
            <Link href="/products">發現好物</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">購物車</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            確認商品資訊後即可前往結帳流程。
          </p>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
              <h2 className="font-anton text-xl text-blue-primary">購物車</h2>
            </div>
            <div className="lg:overflow-x-auto">
              <div className="lg:min-w-[900px]">
                <div className="hidden border-b px-6 py-3 text-sm font-semibold text-slate-500 lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:gap-4">
                  <span>商品資訊</span>
                  <span className="text-center">單價</span>
                  <span className="text-center">數量</span>
                  <span className="text-right">小計</span>
                  <span className="sr-only">操作</span>
                </div>

                <div className="divide-y">
                  {items.map(item => {
                    const rowSubtotal = formatCurrencyNT(
                      item.price * item.quantity,
                    )
                    return (
                      <article
                        key={item.id}
                        className="px-6 py-6 text-sm font-noto-sans-tc"
                      >
                        {/* 桌面版：表格式佈局 */}
                        <div className="hidden lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:items-center lg:gap-4">
                          <div className="flex gap-4">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                  No Image
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <p className="font-semibold text-blue-primary">
                                {item.name}
                              </p>
                              {item.color ? (
                                <p className="text-xs text-muted-foreground">
                                  {item.color}
                                </p>
                              ) : null}
                              {item.size ? (
                                <p className="text-xs text-muted-foreground">
                                  {item.size}
                                </p>
                              ) : null}
                            </div>
                          </div>

                          <div className="text-center text-sm font-medium text-slate-600">
                            {formatCurrencyNT(item.price) || 'NT$ 0'}
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
                              <button
                                type="button"
                                onClick={() => decrementItem(item.id)}
                                className="px-3 py-1 text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80 cursor-pointer"
                                aria-label="減少數量"
                              >
                                −
                              </button>
                              <span className="px-4 text-base font-semibold text-blue-primary">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => incrementItem(item.id)}
                                className="px-3 py-1 text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80 cursor-pointer"
                                aria-label="增加數量"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right text-sm font-semibold text-blue-primary">
                            {rowSubtotal || 'NT$ 0'}
                          </div>

                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label="移除此商品"
                              className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-red-300 hover:text-red-500 cursor-pointer"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* 手機版：卡片式佈局 */}
                        <div className="flex gap-3 lg:hidden">
                          <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="100px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col">
                            <div className="mb-1 flex items-start justify-between gap-2">
                              <h3 className="text-sm font-semibold leading-tight text-blue-primary">
                                {item.name}
                              </h3>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label="移除此商品"
                                className="-mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-red-500"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            </div>

                            {item.color || item.size ? (
                              <p className="mb-3 text-xs text-muted-foreground">
                                {[item.color, item.size]
                                  .filter(Boolean)
                                  .join(' / ')}
                              </p>
                            ) : (
                              <div className="mb-3" />
                            )}

                            <div className="mt-auto flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <p className="text-lg font-bold text-blue-primary sm:order-2">
                                {rowSubtotal || 'NT$ 0'}
                              </p>

                              <div className="inline-flex items-center rounded-full border border-slate-300 bg-white sm:order-1">
                                <button
                                  type="button"
                                  onClick={() => decrementItem(item.id)}
                                  className="flex h-8 w-8 items-center justify-center text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80 cursor-pointer"
                                  aria-label="減少數量"
                                >
                                  −
                                </button>
                                <span className="min-w-[2rem] px-2 text-center text-sm font-semibold text-blue-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => incrementItem(item.id)}
                                  className="flex h-8 w-8 items-center justify-center text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80 cursor-pointer"
                                  aria-label="增加數量"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <aside className="ml-auto w-full space-y-6 rounded-3xl border bg-white p-6 shadow-sm lg:w-[350px]">
            <div className="border-b pb-4">
              <h2 className="font-anton text-xl text-blue-primary">訂單摘要</h2>
            </div>

            <div className="space-y-3 text-sm font-noto-sans-tc text-slate-600">
              <div className="flex items-center justify-between">
                <span>商品小計</span>
                <span className="font-semibold text-blue-primary">
                  {formatCurrencyNT(subtotal) || 'NT$ 0'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>運費</span>
                <span className="text-muted-foreground">NT$ 0</span>
              </div>
              <div className="flex items-center justify-between pt-2 text-base font-semibold text-blue-primary">
                <span>總計</span>
                <span>{formatCurrencyNT(subtotal) || 'NT$ 0'}</span>
              </div>
            </div>

            <Button
              className="w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
              onClick={() => router.push('/checkout')}
            >
              前往結帳
            </Button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CartPageClient
