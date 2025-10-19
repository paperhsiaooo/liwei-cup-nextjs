import { useQuery } from '@tanstack/react-query'

import { MOCK_PRODUCTS } from '@/app/products/mock-data'

// ------------------------------------------------------------
// Mock API Functions (模擬 RESTful API)
// ------------------------------------------------------------

/**
 * 模擬 GET /api/products - 取得商品列表
 * @returns {Promise} 商品列表資料
 */
async function fetchProductsAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // 模擬 RESTful API 回應格式
        const response = {
          success: true,
          data: {
            products: MOCK_PRODUCTS,
            total: MOCK_PRODUCTS.length,
            page: 1,
            limit: 20,
          },
          retStatus: {
            code: '0000',
            message: 'Success',
          },
        }
        resolve(response)
      } catch (error) {
        reject({
          success: false,
          error: {
            code: 'FETCH_ERROR',
            message: '取得商品列表失敗',
          },
        })
      }
    }, 500) // 模擬網路延遲 500ms
  })
}

/**
 * 模擬 GET /api/products/:id - 取得單一商品
 * @param {string} productId - 商品 ID
 * @returns {Promise} 商品詳情資料
 */
async function fetchProductAPI(productId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const product = MOCK_PRODUCTS.find(p => p.productId === productId)

        if (!product) {
          reject({
            success: false,
            error: {
              code: 'NOT_FOUND',
              message: '找不到此商品',
            },
          })
          return
        }

        // 模擬 RESTful API 回應格式
        const response = {
          success: true,
          data: {
            product,
          },
          retStatus: {
            code: '0000',
            message: 'Success',
          },
        }
        resolve(response)
      } catch (error) {
        reject({
          success: false,
          error: {
            code: 'FETCH_ERROR',
            message: '取得商品詳情失敗',
          },
        })
      }
    }, 300) // 模擬網路延遲 300ms
  })
}

// ------------------------------------------------------------
// React Query Hooks
// ------------------------------------------------------------

/**
 * useProducts - 取得商品列表
 * @param {Object} options - React Query options
 * @returns {Object} React Query result
 *
 * @example
 * const { data, isLoading, error } = useProducts()
 * // data.data.products - 商品陣列
 * // data.data.total - 商品總數
 */
export function useProducts(options = {}) {
  return useQuery({
    queryKey: ['products', 'list'],
    queryFn: () => fetchProductsAPI(),
    staleTime: 5 * 60 * 1000, // 5 分鐘內資料視為新鮮
    cacheTime: 10 * 60 * 1000, // 快取保留 10 分鐘
    ...options,
  })
}

/**
 * useProduct - 取得單一商品詳情
 * @param {string} productId - 商品 ID
 * @param {Object} options - React Query options
 * @returns {Object} React Query result
 *
 * @example
 * const { data, isLoading, error } = useProduct('volleyball-socks-classic-se')
 * // data.data.product - 商品物件
 */
export function useProduct(productId, options = {}) {
  return useQuery({
    queryKey: ['products', 'detail', productId],
    queryFn: () => fetchProductAPI(productId),
    enabled: !!productId, // 只有在有 productId 時才執行
    staleTime: 5 * 60 * 1000, // 5 分鐘內資料視為新鮮
    cacheTime: 10 * 60 * 1000, // 快取保留 10 分鐘
    ...options,
  })
}

// ------------------------------------------------------------
// 導出 API 函數（供測試使用）
// ------------------------------------------------------------
export { fetchProductAPI, fetchProductsAPI }
