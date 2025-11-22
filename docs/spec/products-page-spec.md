# 商品列表頁面功能規格書

# Products Page Specification

**版本 (Version)**: 1.0  
**建立日期 (Created Date)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Draft

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者瀏覽力維盃紀念商品的頁面，展示所有可兌換的排球周邊商品，並可點擊進入商品詳情頁面。

### 1.2 使用者故事 (User Stories)

**US-1: 瀏覽商品列表**

> 作為一個**訪客或會員**，我想要瀏覽所有可兌換的商品，以便了解有哪些力維盃紀念商品可以購買或兌換。

**US-2: 查看商品資訊**

> 作為一個**使用者**，我想要在商品卡片上直接看到商品名稱、價格、標籤和圖片，以便快速篩選感興趣的商品。

**US-3: 進入商品詳情**

> 作為一個**使用者**，我想要點擊商品卡片進入詳細頁面，以便了解完整的商品規格和購買/兌換資訊。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ 商品列表頁面 (`/products`)
- ✅ 商品卡片展示（名稱、價格、標籤、圖片、描述）
- ✅ 響應式網格佈局（手機/平板/桌面）
- ✅ Loading 狀態顯示
- ✅ 錯誤處理與提示
- ✅ 導向商品詳情頁面
- ✅ SEO 優化（metadata, Open Graph）

#### 不包含功能 (Out of Scope)

- ❌ 商品篩選功能（未來版本）
- ❌ 商品排序功能（未來版本）
- ❌ 商品搜尋功能（未來版本）
- ❌ 加入購物車功能（在商品詳情頁處理）
- ❌ 商品收藏功能（未來版本）

### 1.4 與現有系統的關係

**Header 導航整合**

- 「發現好物」按鈕連結至 `/products`
- 與購物車、用戶登入狀態共用同一個 header

**購物流程整合**

- 商品列表 → 商品詳情 → 加入購物車 → 結帳流程
- 本頁面專注於「商品展示」，不包含購買邏輯

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑                    | 檔案位置                                | 說明             |
| -------------- | ----------------------- | --------------------------------------- | ---------------- |
| 商品列表頁面   | `/products`             | `src/app/products/page.jsx`             | Server Component |
| 商品列表客戶端 | -                       | `src/app/products/products-client.jsx`  | Client Component |
| 商品詳情頁面   | `/products/[productId]` | `src/app/products/[productId]/page.jsx` | Dynamic Route    |
| Mock Data      | -                       | `src/app/products/mock-data.js`         | 測試用資料       |

### 2.2 檔案結構

```
src/
├── app/
│   └── products/
│       ├── page.jsx                        # 商品列表頁面入口（Server Component）
│       ├── products-client.jsx             # 商品列表客戶端組件
│       ├── mock-data.js                    # Mock 商品資料
│       └── [productId]/
│           ├── page.jsx                    # 商品詳情頁面
│           └── product-detail-client.jsx   # 商品詳情客戶端組件
├── sections/
│   └── products/
│       ├── views/
│       │   ├── products-view.jsx           # 商品列表視圖（未來重構）
│       │   └── index.js                    # 導出
│       └── components/
│           └── product.jsx                 # 商品卡片組件（Compound Component）
├── apis/
│   └── hook/
│       └── use-products.js                 # 商品相關 API hooks（未來）
└── routers/
    └── path.js                             # 更新路由常數
```

### 2.3 資料結構

**商品物件 (Product Object)**

```typescript
{
  productId: string                 // 商品唯一識別碼
  name: string                      // 商品名稱
  tagline?: string                  // 商品標語（用於詳情頁）
  description: string               // 商品描述
  price: number                     // 商品價格（單位：新台幣）
  tag?: string                      // 標籤（LIMITED, NEW, HOT, BEST SELLER）
  colors?: string[]                 // 可選顏色（用於詳情頁）
  sizes?: string[]                  // 可選尺寸（用於詳情頁）
  heroImage: string                 // 主要圖片 URL
  images: string[]                  // 所有圖片 URL 陣列
}
```

**範例資料**

```javascript
{
  productId: 'volleyball-socks-classic-se',
  name: 'Volleyball Socks Classic+ SE',
  description: '採用吸濕排汗纖維與加強足弓支撐，提供長時間的穩定包覆與舒適腳感。',
  price: 150,
  tag: 'LIMITED',
  heroImage: 'https://example.com/image.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg']
}
```

### 2.4 API 端點（未來實作）

**目前狀態**：使用 Mock Data (`mock-data.js`)

**未來 API 規劃**：

| 端點                | 方法 | 說明         | 回傳格式              |
| ------------------- | ---- | ------------ | --------------------- |
| `/api/products`     | GET  | 取得商品列表 | `{ products: [...] }` |
| `/api/products/:id` | GET  | 取得商品詳情 | `{ product: {...} }`  |

**Response 格式**

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "productId": "volleyball-socks-classic-se",
        "name": "Volleyball Socks Classic+ SE",
        "description": "...",
        "price": 150,
        "tag": "LIMITED",
        "heroImage": "...",
        "images": ["..."]
      }
    ]
  }
}
```

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框 `border-8`、粗體字 `font-bold`）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 卡片式設計
- ✅ 響應式網格佈局
- ✅ Hover 效果（陰影加深）

### 3.2 商品列表頁面 UI

```
┌─────────────────────────────────────────────────┐
│                  PRODUCTS                       │
│              換取你的紀念時刻                      │
│                                                 │
│  ┌──────────┐  ┌──────────┐                    │
│  │          │  │          │                    │
│  │  商品圖  │  │  商品圖  │                    │
│  │          │  │          │                    │
│  │ 商品名稱 │  │ 商品名稱 │                    │
│  │ 商品描述 │  │ 商品描述 │                    │
│  │ NT$ 150  │  │ NT$ 480  │                    │
│  └──────────┘  └──────────┘                    │
│                                                 │
│  ┌──────────┐  ┌──────────┐                    │
│  │          │  │          │                    │
│  │  商品圖  │  │  商品圖  │                    │
│  │          │  │          │                    │
│  └──────────┘  └──────────┘                    │
└─────────────────────────────────────────────────┘
```

### 3.3 組件規格

#### 3.3.1 Product.Container 組件

**功能**：商品卡片容器，處理導航和樣式

**Props**：

```typescript
{
  children: ReactNode       // 卡片內容
  className?: string        // 自訂樣式
  href?: string            // 導向連結（商品詳情頁）
  onClick?: () => void     // 點擊事件（可選）
}
```

**使用範例**：

```jsx
<Product.Container href="/products/product-id-123">
  <Product.Content {...productData} />
</Product.Container>
```

#### 3.3.2 Product.Content 組件

**功能**：商品卡片內容，展示商品資訊

**Props**：

```typescript
{
  name: string             // 商品名稱
  description: string      // 商品描述
  image: string           // 商品圖片 URL
  tag?: string            // 標籤（LIMITED, NEW, HOT, BEST SELLER）
  price?: number          // 商品價格
}
```

**使用範例**：

```jsx
<Product.Content
  name="Volleyball Socks Classic+ SE"
  description="採用吸濕排汗纖維..."
  image="https://example.com/image.jpg"
  price={150}
  tag="LIMITED"
/>
```

### 3.4 標籤 (Tag) 樣式

| 標籤名稱      | 文字顏色       | 背景顏色        | 用途說明 |
| ------------- | -------------- | --------------- | -------- |
| `LIMITED`     | `blue-primary` | `green-primary` | 限量商品 |
| `NEW`         | `blue-primary` | `green-primary` | 新品上市 |
| `HOT`         | `blue-primary` | `green-primary` | 熱銷商品 |
| `BEST SELLER` | `blue-primary` | `green-primary` | 最佳銷售 |

### 3.5 響應式佈局

| 螢幕尺寸 | 寬度           | 網格欄數 | Gap  |
| -------- | -------------- | -------- | ---- |
| Mobile   | < 640px        | 1 欄     | 20px |
| Tablet   | 640px - 1024px | 2 欄     | 20px |
| Desktop  | > 1024px       | 2 欄     | 20px |

**Tailwind 類別**：

```jsx
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
```

### 3.6 Loading 狀態

**顯示時機**：首次載入商品列表時

**UI 設計**：

```jsx
<div className="flex justify-center py-16">
  <Loader />
</div>
```

### 3.7 錯誤狀態

**顯示時機**：API 錯誤或資料載入失敗

**UI 設計**：

```jsx
<div className="p-10 text-red-500">發生錯誤，請稍後再試</div>
```

### 3.8 空狀態（未來功能）

**顯示時機**：無商品資料時

**UI 設計**：

```jsx
<div className="flex flex-col items-center py-16 text-gray-500">
  <p className="text-lg">目前沒有商品</p>
  <p className="text-sm">請稍後再來看看</p>
</div>
```

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 商品列表展示

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者進入 `/products` 頁面
2. 系統顯示 Loading 狀態
3. 系統載入商品列表（目前為 Mock Data）
4. 系統以網格方式展示所有商品
5. 每個商品卡片顯示：
   - 商品圖片（aspect ratio 400:600）
   - 標籤（如有）
   - 商品名稱
   - 商品描述
   - 商品價格

**成功條件**：

- ✅ 所有商品正確顯示
- ✅ 圖片正確載入
- ✅ 價格格式化為新台幣（NT$ 150）
- ✅ 響應式佈局正常運作

**例外處理**：

- 資料載入失敗 → 顯示錯誤訊息
- 圖片載入失敗 → 使用 Next.js Image 的預設處理（placeholder）

---

### FR-2: 商品卡片互動

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者 hover 商品卡片
2. 卡片陰影加深（`shadow-xs` → `shadow-md`）
3. 使用者點擊商品卡片
4. 系統導向商品詳情頁 `/products/[productId]`

**成功條件**：

- ✅ Hover 效果正常運作
- ✅ 點擊後正確導向詳情頁
- ✅ URL 正確包含 productId
- ✅ 使用 Next.js Link 進行導航（無重新載入）

---

### FR-3: Loading 與錯誤處理

**優先級**: 🔴 P0 (Critical)

**Loading 狀態**：

- 顯示 Loader 組件
- 位置：頁面中央
- 最短顯示時間：120ms（避免閃爍）

**錯誤處理**：

- 顯示錯誤訊息
- 文字顏色：紅色 (`text-red-500`)
- 錯誤訊息：「發生錯誤」

**成功條件**：

- ✅ Loading 正確顯示和隱藏
- ✅ 錯誤訊息清晰易懂
- ✅ 不影響其他頁面功能

---

### FR-4: SEO 優化

**優先級**: 🟡 P1 (High)

**Metadata 設定**：

```javascript
export const metadata = {
  title: '商品兌換',
  description:
    '2025 力維盃錦標賽商品兌換專區，使用活動點數兌換精美排球周邊商品與紀念品。',
  keywords: ['力維盃商品', '排球周邊', '商品兌換', '力維盃紀念品', '排球商品'],
  openGraph: {
    title: '商品兌換 | 2025 力維盃錦標賽',
    description:
      '2025 力維盃錦標賽商品兌換專區，使用活動點數兌換精美排球周邊商品與紀念品。',
    url: 'https://liwei-cup.com/products',
  },
  alternates: {
    canonical: 'https://liwei-cup.com/products',
  },
}
```

**結構化資料**（未來考慮）：

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "name": "Volleyball Socks Classic+ SE",
      "offers": {
        "@type": "Offer",
        "price": "150",
        "priceCurrency": "TWD"
      }
    }
  ]
}
```

---

### FR-5: 圖片優化

**優先級**: 🟡 P1 (High)

**使用 Next.js Image 組件**：

```jsx
<Image
  src={image}
  alt={name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
/>
```

**優化策略**：

- ✅ 使用 `fill` 屬性自動調整尺寸
- ✅ `object-cover` 確保圖片填滿容器
- ✅ 提供 `sizes` 屬性優化載入
- ✅ 自動生成 WebP 格式（Next.js 預設）
- ✅ Lazy loading（Next.js 預設）

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/sections/products/components/__tests__/product.test.jsx`

```javascript
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import Product from '../product'

describe('Product Component', () => {
  describe('Product.Container', () => {
    test('應該渲染為 Link 當提供 href', () => {
      render(
        <Product.Container href="/products/123">
          <div>Content</div>
        </Product.Container>,
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/products/123')
    })

    test('應該渲染為 div 當沒有提供 href', () => {
      render(
        <Product.Container>
          <div>Content</div>
        </Product.Container>,
      )

      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })

    test('應該套用正確的樣式類別', () => {
      const { container } = render(
        <Product.Container href="/test">
          <div>Content</div>
        </Product.Container>,
      )

      const link = container.querySelector('a')
      expect(link).toHaveClass('border-8', 'border-blue-primary')
    })
  })

  describe('Product.Content', () => {
    const mockProduct = {
      name: 'Test Product',
      description: 'Test Description',
      image: 'https://example.com/image.jpg',
      price: 150,
      tag: 'LIMITED',
    }

    test('應該顯示商品名稱', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    test('應該顯示商品描述', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    test('應該顯示格式化的價格', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('NT$ 150')).toBeInTheDocument()
    })

    test('應該顯示標籤', () => {
      render(<Product.Content {...mockProduct} />)
      expect(screen.getByText('LIMITED')).toBeInTheDocument()
    })

    test('當沒有價格時不應該顯示價格', () => {
      const { container } = render(
        <Product.Content {...mockProduct} price={undefined} />,
      )
      expect(screen.queryByText(/NT\$/)).not.toBeInTheDocument()
    })

    test('當沒有標籤時不應該顯示標籤', () => {
      render(<Product.Content {...mockProduct} tag={undefined} />)
      expect(screen.queryByText('LIMITED')).not.toBeInTheDocument()
    })
  })
})
```

---

### 5.2 組件測試 (Component Tests)

#### 測試文件：`src/app/products/__tests__/products-client.test.jsx`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import ProductsClient from '../products-client'

// Mock getMockProductList
vi.mock('../mock-data', () => ({
  getMockProductList: vi.fn(() => [
    {
      productId: 'test-1',
      name: 'Test Product 1',
      description: 'Description 1',
      price: 150,
      tag: 'LIMITED',
      images: ['https://example.com/1.jpg'],
    },
    {
      productId: 'test-2',
      name: 'Test Product 2',
      description: 'Description 2',
      price: 480,
      tag: 'NEW',
      images: ['https://example.com/2.jpg'],
    },
  ]),
}))

describe('ProductsClient', () => {
  test('應該顯示 Loading 狀態', () => {
    render(<ProductsClient />)
    expect(screen.getByRole('status')).toBeInTheDocument() // Loader
  })

  test('應該載入並顯示商品列表', async () => {
    render(<ProductsClient />)

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument()
      expect(screen.getByText('Test Product 2')).toBeInTheDocument()
    })
  })

  test('應該顯示頁面標題', async () => {
    render(<ProductsClient />)

    await waitFor(() => {
      expect(screen.getByText('PRODUCTS')).toBeInTheDocument()
      expect(screen.getByText('換取你的紀念時刻')).toBeInTheDocument()
    })
  })

  test('應該使用網格佈局展示商品', async () => {
    const { container } = render(<ProductsClient />)

    await waitFor(() => {
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2')
    })
  })

  test('錯誤時應該顯示錯誤訊息', async () => {
    const { getMockProductList } = await import('../mock-data')
    getMockProductList.mockImplementation(() => {
      throw new Error('Load error')
    })

    render(<ProductsClient />)

    await waitFor(() => {
      expect(screen.getByText('發生錯誤')).toBeInTheDocument()
    })
  })
})
```

---

### 5.3 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/products-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('商品列表頁面整合測試', () => {
  test('完整商品瀏覽流程', async () => {
    // 1. 訪問 /products
    // 2. 等待商品列表載入
    // 3. 驗證所有商品卡片顯示
    // 4. 驗證響應式佈局
    // 5. 點擊商品卡片
    // 6. 驗證導向商品詳情頁
  })

  test('Loading 狀態顯示', async () => {
    // 1. 訪問 /products
    // 2. 驗證 Loading 元件顯示
    // 3. 等待資料載入完成
    // 4. 驗證 Loading 元件消失
  })

  test('錯誤處理流程', async () => {
    // 1. 模擬 API 錯誤
    // 2. 訪問 /products
    // 3. 驗證錯誤訊息顯示
    // 4. 驗證不會顯示商品列表
  })

  test('響應式設計測試', async () => {
    // 1. 測試 Mobile viewport (390px)
    // 2. 驗證 1 欄佈局
    // 3. 測試 Tablet viewport (768px)
    // 4. 驗證 2 欄佈局
    // 5. 測試 Desktop viewport (1440px)
    // 6. 驗證 2 欄佈局
  })

  test('圖片優化驗證', async () => {
    // 1. 訪問 /products
    // 2. 驗證使用 Next.js Image 組件
    // 3. 驗證 lazy loading 正常運作
    // 4. 驗證圖片 aspect ratio 正確
  })
})
```

---

### 5.4 測試覆蓋率目標

| 類型           | 目標覆蓋率 | 說明                    |
| -------------- | ---------- | ----------------------- |
| Product 組件   | 100%       | 所有 props 和狀態都測試 |
| ProductsClient | 90%+       | 核心業務邏輯高覆蓋率    |
| 整合測試       | 100%       | 所有關鍵流程全覆蓋      |

---

## 6. 非功能性需求 (Non-Functional Requirements)

### 6.1 效能 (Performance)

| 指標         | 目標    | 說明                           |
| ------------ | ------- | ------------------------------ |
| 首次內容繪製 | < 1.5秒 | FCP (First Contentful Paint)   |
| 最大內容繪製 | < 2.5秒 | LCP (Largest Contentful Paint) |
| 首次輸入延遲 | < 100ms | FID (First Input Delay)        |
| 累積佈局偏移 | < 0.1   | CLS (Cumulative Layout Shift)  |

**優化策略**：

- ✅ 使用 Next.js Image 自動優化圖片
- ✅ Server Component 減少 JavaScript bundle
- ✅ CSS-in-JS 最小化（使用 Tailwind）
- ✅ 資料預載入（使用 cache）

---

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 使用 Next.js Image 防止圖片注入攻擊
- ✅ 所有外部連結使用 `rel="noopener noreferrer"`
- ✅ 防止 XSS（React 自動跳脫）
- ✅ HTTPS 連線（生產環境）

#### 資料驗證

- ✅ 驗證 productId 格式
- ✅ 處理無效的商品 ID（404 頁面）
- ✅ 處理損壞的圖片 URL

---

### 6.3 SEO

**已實作**：

- ✅ 頁面 title 和 description
- ✅ Open Graph tags
- ✅ Canonical URL
- ✅ 關鍵字設定

**未來考慮**：

- [ ] 結構化資料（Schema.org Product）
- [ ] 麵包屑導航
- [ ] 商品 sitemap

---

### 6.4 無障礙性 (Accessibility)

#### 語義化 HTML

```jsx
<section className="root">
  <div className="wrapper">
    <h1>PRODUCTS</h1>
    <div className="grid">
      <article>商品卡片</article>
    </div>
  </div>
</section>
```

#### ARIA 標籤

```jsx
<Link href={...} aria-label={`查看 ${name} 商品詳情`}>
  <Image src={...} alt={`${name} 商品圖片`} />
</Link>
```

#### 鍵盤導航

- Tab 順序：從左到右，從上到下
- Enter 鍵點擊商品卡片
- 所有互動元素可鍵盤存取

---

### 6.5 響應式設計

| 螢幕尺寸 | 測試裝置             | 網格欄數 | 卡片寬度 |
| -------- | -------------------- | -------- | -------- |
| Mobile   | iPhone 12/13 (390px) | 1 欄     | 100%     |
| Tablet   | iPad (768px)         | 2 欄     | ~48%     |
| Desktop  | 1440px               | 2 欄     | ~48%     |

**測試瀏覽器**：

- Chrome (最新版本)
- Safari (最新版本)
- Firefox (最新版本)
- Edge (最新版本)

---

## 7. 相依性與里程碑 (Dependencies & Milestones)

### 7.1 前置需求

| 項目                     | 狀態      | 負責人       | 備註               |
| ------------------------ | --------- | ------------ | ------------------ |
| 後端 API `/api/products` | ⏳ 待開發 | Backend Team | 目前使用 Mock Data |
| 商品詳情頁面             | ✅ 已完成 | -            | 現有實作           |
| Product 組件             | ✅ 已完成 | -            | 現有實作           |
| 設計稿                   | ⏳ 待確認 | Design Team  | 目前使用暫定設計   |

### 7.2 開發里程碑

#### Phase 1: 文檔與規劃（Week 1）

- [x] Spec 文檔完成
- [ ] 測試案例撰寫完成
- [ ] 後端 API 規格確認
- [ ] 設計稿確認

#### Phase 2: 優化與重構（Week 2）

- [ ] 將 ProductsClient 邏輯移至 ProductsView
- [ ] 實作 useProducts hook（準備接後端 API）
- [ ] 組件單元測試完成
- [ ] 效能優化（圖片、載入速度）

#### Phase 3: API 整合（Week 3）

- [ ] 後端 API 整合
- [ ] 移除 Mock Data
- [ ] 錯誤處理優化
- [ ] Loading 狀態優化

#### Phase 4: 進階功能（Week 4+）

- [ ] 商品篩選功能
- [ ] 商品排序功能
- [ ] 商品搜尋功能
- [ ] 無限捲動（Infinite Scroll）

#### Phase 5: 測試與部署（Week 5）

- [ ] 整合測試完成
- [ ] 跨瀏覽器測試
- [ ] 效能測試（Lighthouse）
- [ ] 無障礙性測試
- [ ] Code Review
- [ ] 部署至 Production

---

### 7.3 風險評估

| 風險             | 影響等級 | 機率 | 應對策略                       |
| ---------------- | -------- | ---- | ------------------------------ |
| 後端 API 延遲    | 🟡 中    | 中   | 持續使用 Mock Data 開發        |
| 圖片載入效能問題 | 🟡 中    | 低   | 使用 Next.js Image 優化        |
| 響應式設計問題   | 🟢 低    | 低   | 持續測試多種裝置               |
| SEO 效果不佳     | 🟢 低    | 低   | 定期檢查 Google Search Console |

---

## 8. 路由常數更新

更新 `src/routers/path.js`：

```javascript
export const PATH = {
  root: '/',

  // 商品相關
  products: {
    list: '/products',
    detail: productId => `/products/${productId}`,
  },

  // 認證相關
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },

  // 設定頁面
  settings: {
    profile: '/settings/profile',
  },

  // 購物流程
  cart: '/cart',
  checkout: '/checkout',
}
```

**使用範例**：

```javascript
import { PATH } from '@/routers/path'

// 導向商品列表
router.push(PATH.products.list)

// 導向商品詳情
router.push(PATH.products.detail('volleyball-socks-classic-se'))
```

---

## 9. 後續版本規劃 (Future Enhancements)

### 商品列表 v2.0

- [ ] 商品篩選（依價格、標籤、類別）
- [ ] 商品排序（價格高低、最新、最熱門）
- [ ] 商品搜尋功能
- [ ] 收藏商品功能

### 商品列表 v3.0

- [ ] 無限捲動（Infinite Scroll）
- [ ] 商品比較功能
- [ ] 快速預覽（Quick View）
- [ ] 虛擬捲動（Virtual Scroll）優化大量商品

### 商品列表 v4.0

- [ ] AI 推薦商品
- [ ] 個人化商品排序
- [ ] 即時庫存顯示
- [ ] 限時優惠倒數

---

## 10. 常見問題 (FAQ)

**Q1: 為什麼目前使用 Mock Data？**  
A: 後端 API 尚在開發中，使用 Mock Data 可讓前端先行開發並測試 UI/UX，後續整合 API 時只需替換資料來源。

**Q2: 為什麼商品列表只有 2 欄佈局？**  
A: 考慮商品卡片需要足夠空間展示圖片和資訊，2 欄佈局在各裝置上提供最佳的視覺體驗。

**Q3: 為什麼不直接在列表加入購物車？**  
A: 商品有多種規格（顏色、尺寸），需要在詳情頁選擇後才能加入購物車，確保購買體驗完整。

**Q4: 圖片 aspect ratio 為什麼是 400:600？**  
A: 垂直比例更適合展示商品細節，且符合常見的產品攝影比例。

**Q5: 為什麼不實作商品分類？**  
A: 目前商品數量較少，待商品增加後再考慮分類功能，避免過早優化。

---

## 附錄 A: 參考資源

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Grid](https://tailwindcss.com/docs/grid-template-columns)
- [Web.dev Performance](https://web.dev/performance/)
- [Schema.org Product](https://schema.org/Product)

---

## 附錄 B: 設計參考

**靈感來源**：

- Nike 商品列表頁
- Uniqlo 商品展示
- 運動品牌電商設計

**設計重點**：

- 簡潔大方
- 圖片為主
- 資訊清晰
- 互動流暢

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容     | 負責人      |
| ---- | ---------- | ------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立 | Paper Hsiao |

---

**相關文檔**：

- [商品詳情頁面規格書](./product-detail-page-spec.md)（未來）
- [購物車頁面規格書](./cart-page-spec.md)（未來）
- [登入頁面規格書](./login-page-spec.md)

---

**文件結束**
