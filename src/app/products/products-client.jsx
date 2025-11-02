'use client'

import { useProducts } from '@/apis/hook/use-products'
import Loader from '@/components/common/loader'
import { ProductsView } from '@/sections/products/views'

function ProductsClient() {
  // 使用 React Query hook 取得商品列表
  const { data, isLoading, error } = useProducts()

  // Loading 狀態
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    )
  }

  // 錯誤狀態
  if (error) {
    const errorMessage =
      error?.error?.message || error?.message || '發生錯誤，請稍後再試'

    return (
      <div className="p-10 text-center text-red-500">
        <p className="text-lg font-bold">{errorMessage}</p>
        <p className="text-sm mt-2">請稍後再試</p>
      </div>
    )
  }

  // 取得商品資料
  const products = data?.data?.products || []

  return <ProductsView initialProducts={products} />
}

export default ProductsClient
