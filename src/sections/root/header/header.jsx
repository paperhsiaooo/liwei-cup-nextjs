'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import CartDrawer from '@/components/cart/cart-drawer'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

function Header() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0
      const goingDown = y > lastYRef.current
      const delta = Math.abs(y - lastYRef.current)

      if (delta > 4) {
        setHidden(goingDown && y > 24)
        lastYRef.current = y
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-200 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="bg-white/90 backdrop-blur-md border-b">
          <div className="wrapper relative flex items-center justify-between gap-4 py-3">
            <div className="flex flex-1 items-center justify-start 1440:hidden">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <button
                    aria-label="Open menu"
                    className="inline-flex size-9 items-center justify-center rounded-md border bg-white text-blue-primary"
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
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </DrawerTrigger>
                <DrawerContent side="left">
                  <DrawerHeader className="p-0">
                    <DrawerTitle className="sr-only">主選單</DrawerTitle>
                    <div className="flex items-center justify-end border-b pb-3">
                      <DrawerClose asChild>
                        <button
                          aria-label="Close menu"
                          className="inline-flex size-8 items-center justify-center rounded-md border"
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
                    </div>
                  </DrawerHeader>
                  <nav className="flex flex-col gap-2 pt-4">
                    <DrawerClose asChild>
                      <Link
                        href="/products"
                        className="block w-full rounded-md px-2 py-3 font-noto-sans-tc text-blue-primary/90 transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        發現好物
                      </Link>
                    </DrawerClose>
                    <DrawerClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/#invite">立即報名</Link>
                      </Button>
                    </DrawerClose>
                  </nav>
                </DrawerContent>
              </Drawer>
            </div>

            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-3 1440:justify-start"
            >
              <Image
                src="/social-media/logo_main.png"
                alt="Liwei Cup Logo"
                width={36}
                height={36}
                className="size-9"
                priority
              />
            </Link>

            <nav className="pointer-events-auto hidden items-center gap-3 1440:absolute 1440:left-1/2 1440:top-1/2 1440:flex 1440:-translate-x-1/2 1440:-translate-y-1/2">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-full border border-transparent px-5 text-sm font-semibold leading-none text-blue-primary transition-colors hover:border-blue-primary hover:bg-blue-primary/5"
              >
                發現好物
              </Link>
              <Button
                asChild
                className="h-11 rounded-full px-6 text-sm font-semibold leading-none"
              >
                <Link href="/#invite">立即報名</Link>
              </Button>
            </nav>

            <div className="flex flex-1 items-center justify-end gap-2">
              <CartDrawer />
            </div>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[60px]" />
    </>
  )
}

export default Header
