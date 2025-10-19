'use client'

import { useEffect, useState } from 'react'

import Loader from '@/components/common/loader'
import Product from '@/sections/products/components/product'

import { getMockProductList } from './mock-data'

function ProductsClient() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    setError('')
    setLoading(true)

    const timer = setTimeout(() => {
      if (!mounted) return
      try {
        const list = getMockProductList()
        setProducts(Array.isArray(list) ? list : [])
      } catch (err) {
        console.error('>>> [ProductsClient] load mock error: ', err)
        setError('發生錯誤')
      } finally {
        setLoading(false)
      }
    }, 120)

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    )
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>
  }

  return (
    <section className="root">
      <div className="wrapper py-8 1440:py-12">
        <div className="flex flex-col items-center text-blue-primary mb-6 1440:mb-10">
          <h1 className="font-anton font-normal leading-none text-[48px] 1440:text-[84px]">
            PRODUCTS
          </h1>
          <p className="text-center text-base font-noto-sans-tc 1440:text-lg">
            換取你的紀念時刻
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          {products.map(p => (
            <Product.Container
              key={p.productId}
              href={p?.productId ? `/products/${p.productId}` : undefined}
            >
              <Product.Content
                name={p.name}
                description={p.description}
                image={
                  (Array.isArray(p?.images) && p.images.length > 0
                    ? p.images[0]
                    : p.heroImage || p.image) ?? 'https://picsum.photos/640/640'
                }
                price={p.price ?? undefined}
                tag={p.tag ?? undefined}
              />
            </Product.Container>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductsClient
