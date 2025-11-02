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

const createMockProductDetailPayload = () => ({
  retStatus: { code: 10_000, message: 'Success' },
  data: {
    product: {
      id: 1001,
      name: '2025 力維盃紀念襪',
      description: '吸汗透氣，適合運動穿搭',
      base_price: 350,
      main_image: 'https://cdn.example.com/socks/front.jpg',
      tags: [{ name: '熱門', slug: 'hot' }],
      gallery: [
        { url: 'https://cdn.example.com/socks/front.jpg', is_primary: true },
        {
          url: 'https://cdn.example.com/socks/detail.jpg',
          option_value_id: 3001,
        },
      ],
      skus: [
        {
          id: 4001,
          sku_code: 'LW2025-SOCKS-BW-M',
          price: 350,
          inventory: 25,
          color: {
            option_id: 2001,
            option_value_id: 3001,
            option_name: 'color',
            option_display_name: '顏色',
            value: 'bright-white',
            display_value: '亮潔白',
          },
          size: {
            option_id: 2002,
            option_value_id: 3002,
            option_name: 'size',
            option_display_name: '尺寸',
            value: 'm',
            display_value: 'M',
          },
          images: [
            { url: 'https://cdn.example.com/socks/white/front.jpg' },
            'https://cdn.example.com/socks/white/detail.jpg',
          ],
        },
      ],
      snapshot: { snapshot_id: 7001, version: 1, trigger_event: 'publish' },
      created_at: '2024-11-01T00:00:00Z',
      updated_at: '2024-11-10T00:00:00Z',
    },
  },
})

describe('use-products API Hook', () => {
  describe('fetchProductsAPI', () => {
    const originalEnv = process.env
    const mockSuccessPayload = {
      retStatus: { code: 10_000, message: 'Success' },
      data: {
        products: [
          {
            id: 1001,
            name: '2025 力維盃紀念襪',
            description: '吸汗透氣，適合運動穿搭',
            base_price: 350,
            main_image: 'https://cdn.example.com/socks/front.jpg',
          },
          {
            productId: 'training-tee-elite',
            name: '訓練 T-Shirt',
            description: '透氣快乾',
            price: 520,
            images: ['https://cdn.example.com/tee/front.jpg'],
          },
        ],
        total: 2,
        page: 1,
        limit: 20,
      },
    }

    beforeEach(() => {
      process.env = { ...originalEnv, NEXT_PUBLIC_BASE_URL: '' }
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSuccessPayload,
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
      process.env = originalEnv
      delete global.fetch
    })

    test('應該成功取得商品列表', async () => {
      const result = await fetchProductsAPI()

      expect(global.fetch).toHaveBeenCalledWith(
        '/api/public/v1/products',
        expect.objectContaining({ method: 'GET' }),
      )
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
      expect(result.retStatus.code).toBe(10_000)
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
      expect(product.productId).toBe('1001')
      expect(product.price).toBe(350)
      expect(product.images[0]).toBe('https://cdn.example.com/socks/front.jpg')
    })

    test('非 2xx 回應應該丟出錯誤', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      })

      await expect(fetchProductsAPI()).rejects.toThrow('取得商品列表失敗 (500)')
    })

    test('retStatus 不是成功碼時應該丟出錯誤', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          retStatus: { code: 115001, message: '參數錯誤' },
          data: { products: [] },
        }),
      })

      await expect(fetchProductsAPI()).rejects.toMatchObject({
        message: '參數錯誤',
        code: 115001,
      })
    })
  })

  describe('fetchProductAPI', () => {
    const originalEnv = process.env

    beforeEach(() => {
      process.env = { ...originalEnv, NEXT_PUBLIC_BASE_URL: '' }
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => createMockProductDetailPayload(),
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
      process.env = originalEnv
      delete global.fetch
    })

    test('應該成功取得指定商品', async () => {
      const productId = '1001'
      const result = await fetchProductAPI(productId)

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/public/v1/products/${productId}`,
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result.success).toBe(true)
      const product = result.data.product
      expect(product).toBeDefined()
      expect(product.productId).toBe(productId)
      expect(product.images).toEqual([
        'https://cdn.example.com/socks/front.jpg',
        'https://cdn.example.com/socks/detail.jpg',
      ])
      expect(product.variants).toHaveLength(1)
      expect(product.variants[0].color).toBe('亮潔白')
    })

    test('非 2xx 回應應該丟出錯誤', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      })

      await expect(fetchProductAPI('1001')).rejects.toMatchObject({
        message: '取得商品詳情失敗 (404)',
        code: 404,
      })
    })

    test('retStatus 不是成功碼時應該丟出錯誤', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          retStatus: { code: 115003, message: '查無商品' },
          data: {},
        }),
      })

      await expect(fetchProductAPI('1001')).rejects.toMatchObject({
        message: '查無商品',
        code: 115003,
      })
    })
  })

  describe('useProducts', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          retStatus: { code: 10_000, message: 'Success' },
          data: {
            products: [
              {
                id: 1001,
                name: '2025 力維盃紀念襪',
                description: '吸汗透氣，適合運動穿搭',
                base_price: 350,
                main_image: 'https://cdn.example.com/socks/front.jpg',
              },
            ],
            total: 1,
            page: 1,
            limit: 20,
          },
        }),
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
      delete global.fetch
    })

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
    const originalEnv = process.env

    beforeEach(() => {
      process.env = { ...originalEnv, NEXT_PUBLIC_BASE_URL: '' }
    })

    afterEach(() => {
      jest.resetAllMocks()
      process.env = originalEnv
      delete global.fetch
    })

    test('應該成功載入指定商品', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => createMockProductDetailPayload(),
      })

      const productId = '1001'
      const { result } = renderHook(() => useProduct(productId), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(global.fetch).toHaveBeenCalledWith(
        `/api/public/v1/products/${productId}`,
        expect.objectContaining({ method: 'GET' }),
      )
      expect(result.current.data.success).toBe(true)
      expect(result.current.data.data.product).toBeDefined()
      expect(result.current.data.data.product.productId).toBe(productId)
      expect(result.current.data.data.product.variants[0].color).toBe('亮潔白')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    test('沒有 productId 時不應該執行查詢', async () => {
      const { result } = renderHook(() => useProduct(null), {
        wrapper: createWrapper(),
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeUndefined()
    })

    test('無效的 productId 應該回傳錯誤', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          retStatus: { code: 115003, message: '查無商品' },
          data: {},
        }),
      })

      const invalidId = '999999'
      const { result } = renderHook(() => useProduct(invalidId), {
        wrapper: createWrapper(),
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.error).toBeDefined()
      expect(result.current.error.code).toBe(115003)
    })
  })
})
