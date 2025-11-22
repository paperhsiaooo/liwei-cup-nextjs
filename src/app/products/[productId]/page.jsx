import { notFound } from 'next/navigation'

import { fetchProductAPI } from '@/apis/hook/use-products'

import ProductDetailClient from './product-detail-client'

export async function generateMetadata({ params }) {
  const productId = params?.productId

  try {
    const result = await fetchProductAPI(productId)
    const product = result?.data?.product

    if (!product) {
      return {
        title: '商品詳情 | 2025 力維盃錦標賽',
        description: '商品資訊暫時無法取得，請稍後再試。',
      }
    }

    const name = product?.name || '商品詳情'
    const description =
      product?.description ||
      product?.summary ||
      '探索 2025 力維盃錦標賽的特色商品與周邊。'

    return {
      title: `${name} | 2025 力維盃錦標賽`,
      description,
      openGraph: {
        title: `${name} | 2025 力維盃錦標賽`,
        description,
      },
    }
  } catch (error) {
    return {
      title: '商品詳情 | 2025 力維盃錦標賽',
      description: '商品資訊暫時無法取得，請稍後再試。',
    }
  }
}

async function ProductPage({ params }) {
  const productId = params?.productId

  if (!productId) {
    notFound()
  }

  let initialData = null

  try {
    const result = await fetchProductAPI(productId)
    initialData = result
  } catch (error) {
    // 如果 API 請求失敗，讓 Client Component 處理錯誤狀態
    // 不直接 notFound()，以便顯示錯誤訊息
  }

  return (
    <section className="root">
      <div className="wrapper py-8 1440:py-12">
        <ProductDetailClient productId={productId} initialData={initialData} />
      </div>
    </section>
  )
}

export default ProductPage
