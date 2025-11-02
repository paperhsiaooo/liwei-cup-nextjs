'use client'

import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import useCartStore from '@/store/cart-context'
import { formatCurrencyNT } from '@/utils/currency'

function CartDrawer() {
  const router = useRouter()
  const items = useCartStore(state => state.items)
  const removeItem = useCartStore(state => state.removeItem)
  const [open, setOpen] = useState(false)

  const itemCount = useMemo(() => items.length, [items])

  const handleCheckoutClick = () => {
    setOpen(false)
    router.push('/cart')
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-full border border-blue-primary bg-white text-blue-primary transition-colors hover:bg-blue-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary 1440:h-11 1440:w-11"
          aria-label="開啟購物車"
        >
          <ShoppingCart className="size-5" aria-hidden />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-primary px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          ) : null}
        </button>
      </DrawerTrigger>
      <DrawerContent className="grid grid-rows-[auto,1fr,auto] p-0">
        <DrawerHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
          <DrawerTitle className="text-xl font-anton text-blue-primary">
            購物車
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="關閉購物車"
              className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary"
            >
              <svg
                width="18"
                height="18"
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
          </DrawerClose>
        </DrawerHeader>

        <div className="overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="py-24 text-center text-sm text-muted-foreground">
              您的購物車是空的
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map(item => (
                <article
                  key={item.id}
                  className="flex gap-4 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    {item.image ? (
                      <Link
                        href={
                          item.productId
                            ? `/products/${item.productId}`
                            : `/products`
                        }
                        className="absolute inset-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <Link
                    href={
                      item.productId
                        ? `/products/${item.productId}`
                        : `/products`
                    }
                    className="flex flex-1 flex-col gap-2 text-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-blue-primary">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={event => {
                          event.preventDefault()
                          event.stopPropagation()
                          removeItem(item.id)
                        }}
                        aria-label="移除商品"
                        className="inline-flex size-6 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-red-400 hover:text-red-500"
                      >
                        <svg
                          width="14"
                          height="14"
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
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {item.color ? <p>{item.color}</p> : null}
                      {item.size ? <p>{item.size}</p> : null}
                    </div>
                    <p className="font-anton text-base text-blue-primary">
                      {item.quantity} ×{' '}
                      {formatCurrencyNT(item.price) || 'NT$ 0'}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <DrawerFooter className="border-t px-6 py-4">
            <Button
              className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
              onClick={handleCheckoutClick}
            >
              前往結帳
            </Button>
          </DrawerFooter>
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

export default CartDrawer
