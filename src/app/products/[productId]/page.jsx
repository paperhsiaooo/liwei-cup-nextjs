import { notFound } from 'next/navigation'
import { cache } from 'react'

import { getMockProduct } from '../mock-data'
import ProductDetailClient from './product-detail-client'

const getProduct = cache(async productId => {
  // Mimic async latency so the component behaviour stays intact.
  // eslint-disable-next-line no-undef
  await new Promise(resolve => setTimeout(resolve, 100))

  return getMockProduct(productId)
})

export async function generateMetadata({ params }) {
  const productId = params?.productId
  const product = await getProduct(productId)

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
}

async function ProductPage({ params }) {
  const productId = params?.productId
  const product = await getProduct(productId)

  if (!product) {
    notFound()
  }

  return (
    <section className="root">
      <div className="wrapper py-8 1440:py-12">
        <ProductDetailClient product={product} />
      </div>
    </section>
  )
}

export default ProductPage
