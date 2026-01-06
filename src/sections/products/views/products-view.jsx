'use client'

import { useEffect, useState } from 'react'

import { PATH } from '@/routers/path'
import Product from '@/sections/products/components/product'

function ProductsView({ initialProducts }) {
  const safeInitialProducts = Array.isArray(initialProducts)
    ? initialProducts
    : []

  const [products, setProducts] = useState(safeInitialProducts)

  // 如果沒有初始資料，可以在這裡載入
  useEffect(() => {
    if (Array.isArray(initialProducts)) {
      setProducts(initialProducts)
    } else {
      setProducts([])
    }
  }, [initialProducts])

  // Loading 和 Error 狀態已在 ProductsClient 中處理
  // 這裡只處理空狀態
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-gray-500">
        <p className="text-lg font-bold">目前沒有商品</p>
        <p className="text-sm mt-2">請稍後再來看看</p>
      </div>
    )
  }

  return (
    <section className="root">
      <div className="wrapper py-8 1440:py-12">
        {/* 頁面標題 */}
        <div className="flex flex-col items-center text-blue-primary mb-6 1440:mb-10">
          <h1 className="font-anton font-normal leading-none text-[48px] 1440:text-[84px]">
            PRODUCTS
          </h1>
          <p className="text-center text-base font-noto-sans-tc 1440:text-lg">
            換取你的紀念時刻
          </p>
        </div>

        {/* 商品網格 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          {products.map(product => {
            const {
              id,
              name,
              description,
              price,
              tag,
              images,
              heroImage,
              image,
            } = product

            // 取得商品圖片
            const productImage =
              (Array.isArray(images) && images.length > 0
                ? images[0]
                : heroImage || image) ?? 'https://picsum.photos/640/640'

            return (
              <Product.Container
                key={id}
                href={id ? PATH.products.detail(id) : undefined}
              >
                <Product.Content
                  name={name}
                  description={description}
                  image={productImage}
                  price={price ?? undefined}
                  tag={tag ?? undefined}
                />
              </Product.Container>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductsView
