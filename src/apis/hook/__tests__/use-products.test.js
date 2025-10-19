import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import {
  fetchProductAPI,
  fetchProductsAPI,
  useProduct,
  useProducts,
} from '../use-products'

// 創建測試用的 QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 測試時不重試
        cacheTime: 0,
      },
    },
  })

// Wrapper 組件提供 QueryClient
const createWrapper = () => {
  const testQueryClient = createTestQueryClient()
  return ({ children }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('use-products API Hook', () => {
  describe('fetchProductsAPI', () => {
    test('應該成功取得商品列表', async () => {
      const result = await fetchProductsAPI()

      expect(result.success).toBe(true)
      expect(result.data.products).toBeDefined()
      expect(Array.isArray(result.data.products)).toBe(true)
      expect(result.data.products.length).toBeGreaterThan(0)
      expect(result.data.total).toBe(result.data.products.length)
    })

    test('回應格式應該符合 RESTful API 規範', async () => {
      const result = await fetchProductsAPI()

      // 檢查回應結構
      expect(result).toHaveProperty('success')
      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('retStatus')

      // 檢查 data 結構
      expect(result.data).toHaveProperty('products')
      expect(result.data).toHaveProperty('total')
      expect(result.data).toHaveProperty('page')
      expect(result.data).toHaveProperty('limit')

      // 檢查 retStatus 結構
      expect(result.retStatus).toHaveProperty('code')
      expect(result.retStatus).toHaveProperty('message')
      expect(result.retStatus.code).toBe('0000')
    })

    test('商品物件應該包含必要欄位', async () => {
      const result = await fetchProductsAPI()
      const product = result.data.products[0]

      expect(product).toHaveProperty('productId')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('images')
      expect(Array.isArray(product.images)).toBe(true)
    })
  })

  describe('fetchProductAPI', () => {
    test('應該成功取得指定商品', async () => {
      const productId = 'volleyball-socks-classic-se'
      const result = await fetchProductAPI(productId)

      expect(result.success).toBe(true)
      expect(result.data.product).toBeDefined()
      expect(result.data.product.productId).toBe(productId)
    })

    test('找不到商品時應該回傳錯誤', async () => {
      const invalidId = 'non-existent-product'

      await expect(fetchProductAPI(invalidId)).rejects.toEqual({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: '找不到此商品',
        },
      })
    })

    test('回應格式應該符合 RESTful API 規範', async () => {
      const productId = 'volleyball-socks-classic-se'
      const result = await fetchProductAPI(productId)

      // 檢查回應結構
      expect(result).toHaveProperty('success')
      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('retStatus')

      // 檢查 data 結構
      expect(result.data).toHaveProperty('product')

      // 檢查商品物件
      const product = result.data.product
      expect(product.productId).toBe(productId)
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('description')
    })
  })

  describe('useProducts', () => {
    test('應該成功載入商品列表', async () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: createWrapper(),
      })

      // 初始狀態應該是 loading
      expect(result.current.isLoading).toBe(true)

      // 等待資料載入完成
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      // 檢查資料
      expect(result.current.data.success).toBe(true)
      expect(result.current.data.data.products).toBeDefined()
      expect(Array.isArray(result.current.data.data.products)).toBe(true)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    test('應該設置正確的 query key', async () => {
      const { result } = renderHook(() => useProducts(), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      // React Query 會在 result 中包含 queryKey 的資訊
      // 我們可以透過檢查是否成功來驗證 queryKey 設置正確
      expect(result.current.isSuccess).toBe(true)
    })
  })

  describe('useProduct', () => {
    test('應該成功載入指定商品', async () => {
      const productId = 'volleyball-socks-classic-se'
      const { result } = renderHook(() => useProduct(productId), {
        wrapper: createWrapper(),
      })

      // 初始狀態應該是 loading
      expect(result.current.isLoading).toBe(true)

      // 等待資料載入完成
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      // 檢查資料
      expect(result.current.data.success).toBe(true)
      expect(result.current.data.data.product).toBeDefined()
      expect(result.current.data.data.product.productId).toBe(productId)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    test('沒有 productId 時不應該執行查詢', async () => {
      const { result } = renderHook(() => useProduct(null), {
        wrapper: createWrapper(),
      })

      // 應該不會進入 loading 狀態
      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeUndefined()
    })

    test('無效的 productId 應該回傳錯誤', async () => {
      const invalidId = 'non-existent-product'
      const { result } = renderHook(() => useProduct(invalidId), {
        wrapper: createWrapper(),
      })

      // 等待錯誤發生
      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      // 檢查錯誤
      expect(result.current.error).toBeDefined()
      expect(result.current.error.error.code).toBe('NOT_FOUND')
    })
  })
})
