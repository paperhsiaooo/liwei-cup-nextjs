'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import Product from '@/sections/products/components/product'

function ProductsPage() {
  const router = useRouter()

  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch('/api/checkout/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: '測試商品一',
          quantity: 1,
          email: 'test@test.com',
        }),
        credentials: 'same-origin',
      })

      if (res.redirected) {
        router.push(res.url)
        return
      }

      if (!res.ok) {
        const maybeJson = await res.json().catch(() => null)
        throw new Error(maybeJson?.error || 'Request failed')
      }
    } catch (error) {
      console.error('>>> [handleProductBuyClick] error: ', error)
    }
  }, [router])

  const handleProductBuyClick = () => {
    fetchProduct()
  }

  return (
    <div className="flex flex-wrap gap-4 p-10">
      <Product.Container className="w-[300px]">
        <Product.Content
          name="力維盃限量排球衣"
          description="「不僅要參加，更要留下」，是參賽者的承諾，更是所有參賽者的共同心聲。用一場比賽，把青春刻進記憶深處。這不只是排球賽，更是一場關於熱血、友情與信念的旅程。每一次奔跑與吶喊，都將成為日後回望時，最難忘的光影殘影。"
          image="https://picsum.photos/200/300"
          onBuyClick={handleProductBuyClick}
        />
      </Product.Container>
    </div>
  )
}

export default ProductsPage
