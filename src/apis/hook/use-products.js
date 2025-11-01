import { useQuery } from '@tanstack/react-query'

import { handleApiResponse } from '@/apis/utils/api-client'
import { buildEndpoint } from '@/apis/utils/endpoints'
import {
  normalizeProduct,
  normalizeProductDetail,
} from '@/apis/utils/product-normalizer'

const PRODUCT_BASE_PATH = '/api/public/v1/products'

/**
 * 取得公開商品列表
 * @returns {Promise} 商品列表資料
 */
async function fetchProductsAPI() {
  const endpoint = buildEndpoint(PRODUCT_BASE_PATH)
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const payload = await handleApiResponse(response, '取得商品列表失敗')

  const rawProducts = Array.isArray(payload?.data?.products)
    ? payload.data.products
    : []
  const products = rawProducts.map(normalizeProduct)

  return {
    success: true,
    data: {
      products,
      total: payload?.data?.total ?? products.length,
      page: payload?.data?.page ?? 1,
      limit: payload?.data?.limit ?? products.length,
    },
    retStatus: payload.retStatus,
  }
}

/**
 * 取得單一商品詳情（Server Component 專用）
 * @param {string} productId - 商品 ID
 * @returns {Promise} 商品詳情資料
 */
async function fetchProductAPI(productId) {
  if (!productId) {
    const error = new Error('商品 ID 不可為空')
    error.code = 'PRODUCT_ID_REQUIRED'
    throw error
  }

  const safeId = encodeURIComponent(`${productId}`)
  let endpoint = buildEndpoint(`${PRODUCT_BASE_PATH}/${safeId}`)

  // 在 Server Component 中，如果 endpoint 是相對路徑，需要轉換為絕對 URL
  if (typeof window === 'undefined' && endpoint.startsWith('/')) {
    const baseUrl =
      process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || ''
    if (baseUrl) {
      endpoint = `${baseUrl.replace(/\/+$/, '')}${endpoint}`
    } else {
      // 如果沒有設定 BASE_URL，使用 localhost 作為 fallback（僅用於開發環境）
      if (process.env.NODE_ENV === 'development') {
        endpoint = `http://localhost:${process.env.PORT || 3000}${endpoint}`
      }
    }
  }

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  const payload = await handleApiResponse(response, '取得商品詳情失敗')

  const rawDetail = payload?.data?.product
  if (!rawDetail) {
    const error = new Error('商品詳情資料缺失')
    error.code = 'PRODUCT_DETAIL_MISSING'
    throw error
  }

  const product = normalizeProductDetail(rawDetail)
  if (!product) {
    const error = new Error('商品詳情解析失敗')
    error.code = 'PRODUCT_DETAIL_PARSE_ERROR'
    throw error
  }

  return {
    success: true,
    data: {
      product,
    },
    retStatus: payload.retStatus,
  }
}

/**
 * useProducts - 取得商品列表
 * @param {Object} options - React Query options
 * @returns {Object} React Query result
 */
export function useProducts(options = {}) {
  return useQuery({
    queryKey: ['products', 'list'],
    queryFn: () => fetchProductsAPI(),
    ...options,
  })
}

/**
 * useProduct - 取得單一商品詳情
 * @param {string} productId - 商品 ID
 * @param {Object} options - React Query options
 * @returns {Object} React Query result
 */
export function useProduct(productId, options = {}) {
  return useQuery({
    queryKey: ['products', 'detail', productId],
    queryFn: () => fetchProductAPI(productId),
    enabled: !!productId,
    ...options,
  })
}

export { fetchProductAPI, fetchProductsAPI }
