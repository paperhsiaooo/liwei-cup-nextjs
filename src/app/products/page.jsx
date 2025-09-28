'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import Product from '@/sections/products/components/product'
import http from '@/utils/axios'

function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await http.get('/product/list')
        const payload = res?.data
        const list = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.list)
            ? payload.list
            : Array.isArray(payload)
              ? payload
              : []
        if (mounted) setProducts(list)
      } catch (err) {
        if (mounted) setError(err?.message || '發生錯誤')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleProductBuyClick = useCallback(
    async product => {
      try {
        const res = await fetch('/api/checkout/intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.productId,
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
    },
    [router],
  )

  if (loading) {
    return <div className="p-10">載入中...</div>
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-wrap gap-4 p-10">
      {products.map(p => (
        <Product.Container key={p.productId} className="w-[300px]">
          <Product.Content
            name={p.name}
            description={p.description}
            image={'https://picsum.photos/200/300'}
            onBuyClick={() => handleProductBuyClick(p)}
          />
        </Product.Container>
      ))}
    </div>
  )
}

export default ProductsPage
