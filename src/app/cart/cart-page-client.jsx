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

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  )

  if (items.length === 0) {
    return (
      <section className="root">
        <div className="wrapper flex flex-col items-center gap-6 py-16 text-center">
          <div className="max-w-lg space-y-4">
            <h1 className="font-anton text-4xl text-blue-primary">
              Shopping Cart
            </h1>
            <p className="font-noto-sans-tc text-muted-foreground">
              Your Shopping Cart is empty.
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
          <h1 className="font-anton text-4xl text-blue-primary">
            Shopping Cart
          </h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            確認商品資訊後即可前往結帳流程。
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
              <h2 className="font-anton text-xl text-blue-primary">
                Shopping Cart ({itemCount} items)
              </h2>
            </div>
            <div className="hidden border-b px-6 py-3 text-sm font-semibold text-slate-500 lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
              <span>Product Information</span>
              <span className="text-center">Unit Price</span>
              <span className="text-center">QTY</span>
              <span className="text-right">Subtotal</span>
              <span className="sr-only">Actions</span>
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
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto] lg:items-center">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
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
                              商品類別：{item.color}
                            </p>
                          ) : null}
                          {item.size ? (
                            <p className="text-xs text-muted-foreground">
                              商品 Size：{item.size}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="text-center text-sm font-medium text-slate-600 lg:text-left">
                        <span className="lg:hidden text-xs font-semibold text-slate-500">
                          Unit Price:{' '}
                        </span>
                        {formatCurrencyNT(item.price) || 'NT$ 0'}
                      </div>

                      <div className="flex items-center justify-start lg:justify-center">
                        <div className="inline-flex items-center rounded-full border border-slate-300 bg-white">
                          <button
                            type="button"
                            onClick={() => decrementItem(item.id)}
                            className="px-3 py-1 text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80"
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
                            className="px-3 py-1 text-lg leading-none text-blue-primary transition-colors hover:text-blue-primary/80"
                            aria-label="增加數量"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right text-sm font-semibold text-blue-primary">
                        <span className="lg:hidden text-xs font-semibold text-slate-500">
                          Subtotal:{' '}
                        </span>
                        {rowSubtotal || 'NT$ 0'}
                      </div>

                      <div className="flex justify-end lg:justify-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="移除此商品"
                          className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-red-300 hover:text-red-500"
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
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
            <div className="border-b pb-4">
              <h2 className="font-anton text-xl text-blue-primary">
                Order Summary
              </h2>
            </div>

            <div className="space-y-3 text-sm font-noto-sans-tc text-slate-600">
              <div className="flex items-center justify-between">
                <span>Item Subtotal</span>
                <span className="font-semibold text-blue-primary">
                  {formatCurrencyNT(subtotal) || 'NT$ 0'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery Fee</span>
                <span className="text-muted-foreground">NT$ 0</span>
              </div>
              <div className="flex items-center justify-between pt-2 text-base font-semibold text-blue-primary">
                <span>Total</span>
                <span>{formatCurrencyNT(subtotal) || 'NT$ 0'}</span>
              </div>
            </div>

            <Button
              className="w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CartPageClient
