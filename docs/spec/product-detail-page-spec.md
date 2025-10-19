# 產品細節頁面功能規格書

# Product Detail Page Specification

**版本 (Version)**: 1.0  
**建立日期 (Created Date)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Draft

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者查看商品詳細資訊、選擇規格、加入購物車或直接購買的完整商品詳情頁面。

### 1.2 使用者故事 (User Stories)

**US-1: 查看商品詳情**

> 作為一個**訪客或會員**，我想要查看商品的詳細資訊（圖片、描述、價格、規格），以便了解商品是否符合我的需求。

**US-2: 選擇商品規格**

> 作為一個**使用者**，我想要選擇商品的顏色和尺寸，以便購買符合我需求的商品規格。

**US-3: 調整購買數量**

> 作為一個**使用者**，我想要調整購買數量，以便購買多件相同商品。

**US-4: 加入購物車**

> 作為一個**使用者**，我想要將商品加入購物車，以便稍後一起結帳。

**US-5: 立即購買**

> 作為一個**使用者**，我想要直接購買商品，以便快速完成購買流程。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ 商品詳情頁面 (`/products/[productId]`)
- ✅ 商品圖片展示（主圖 + 縮圖切換）
- ✅ 商品資訊展示（名稱、價格、描述、標語）
- ✅ 商品標籤顯示（LIMITED, NEW, HOT, BEST SELLER）
- ✅ 商品規格選擇（顏色、尺寸）
- ✅ 數量選擇器（限制最多 5 個）
- ✅ 加入購物車功能
- ✅ 立即購買功能
- ✅ 圖片點擊放大功能
- ✅ 圖片載入狀態顯示
- ✅ API 錯誤處理與用戶友好提示
- ✅ 手機版圖片 Slider 切換
- ✅ 響應式設計
- ✅ SEO 優化（metadata, Open Graph）
- ✅ 404 處理（商品不存在）

#### 不包含功能 (Out of Scope)

- ❌ 商品分類（未來版本）
- ❌ 商品評價系統（未來版本）
- ❌ 商品推薦功能（未來版本）
- ❌ 商品比較功能（未來版本）
- ❌ 商品收藏功能（未來版本）
- ❌ 庫存顯示（目前使用 Mock Data）
- ❌ 商品分享功能（未來版本）

### 1.4 與現有系統的關係

**商品列表整合**

- 從 `/products` 頁面點擊商品卡片進入
- 使用相同的商品資料結構

**購物車整合**

- 加入購物車後更新 Cart Store
- 購物車抽屜顯示新增的商品
- 支援顏色、尺寸、數量的完整資訊

**結帳流程整合**

- 立即購買直接進入結帳流程
- 使用 `/api/checkout/intent` API
- 導向 `/checkout/pay` 頁面

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑                    | 檔案位置                                                 | 說明             |
| -------------- | ----------------------- | -------------------------------------------------------- | ---------------- |
| 商品詳情頁面   | `/products/[productId]` | `src/app/products/[productId]/page.jsx`                  | Server Component |
| 商品詳情客戶端 | -                       | `src/app/products/[productId]/product-detail-client.jsx` | Client Component |
| Mock Data      | -                       | `src/app/products/mock-data.js`                          | 測試用資料       |

### 2.2 檔案結構

```
src/
├── app/
│   └── products/
│       ├── [productId]/
│       │   ├── page.jsx                        # 商品詳情頁面入口（Server Component）
│       │   └── product-detail-client.jsx       # 商品詳情客戶端組件
│       └── mock-data.js                        # Mock 商品資料
├── components/
│   └── ui/
│       ├── button.jsx                          # 按鈕組件
│       ├── image-slider.jsx                    # 圖片滑動組件
│       └── slider.jsx                          # shadcn UI slider 組件
├── store/
│   └── cart-context.js                         # 購物車狀態管理
├── utils/
│   ├── currency.js                             # 貨幣格式化工具
│   └── utils.js                                # 通用工具函數
└── lib/
    └── utils.js                                # 類名合併工具
```

### 2.3 資料結構

**商品物件 (Product Object)**

```typescript
{
  productId: string                 // 商品唯一識別碼
  name: string                      // 商品名稱
  tagline?: string                  // 商品標語
  description: string               // 商品描述
  price: number                     // 商品價格（單位：新台幣）
  tag?: string                      // 標籤（LIMITED, NEW, HOT, BEST SELLER）
  colors?: string[]                 // 可選顏色
  sizes?: string[]                  // 可選尺寸
  heroImage: string                 // 主要圖片 URL
  images: string[]                  // 所有圖片 URL 陣列
}
```

**購物車項目 (Cart Item)**

```typescript
{
  id: string // 購物車項目唯一 ID (productId::color::size)
  productId: string // 商品 ID
  name: string // 商品名稱
  price: number // 商品價格
  image: string // 商品圖片
  color: string // 選擇的顏色
  size: string // 選擇的尺寸
  quantity: number // 購買數量
}
```

### 2.4 API 端點

**目前狀態**：使用 Mock Data (`mock-data.js`)

**結帳 API**：

| 端點                   | 方法 | 說明         | 回傳格式                        |
| ---------------------- | ---- | ------------ | ------------------------------- |
| `/api/checkout/intent` | POST | 建立購買意圖 | 303 Redirect to `/checkout/pay` |

**Request Body**:

```json
{
  "productId": "volleyball-socks-classic-se",
  "quantity": 2,
  "email": "user@example.com",
  "color": "2025藍",
  "size": "M (20-24.5cm)"
}
```

**Response**: 303 Redirect to `/checkout/pay`

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框、粗體字）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 響應式網格佈局
- ✅ 卡片式設計
- ✅ 互動式按鈕和選擇器

### 3.2 商品詳情頁面 UI

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │             │  │ 商品名稱                │   │
│  │             │  │ 商品標語                │   │
│  │   主圖      │  │                         │   │
│  │             │  │ NT$ 150                 │   │
│  │             │  │                         │   │
│  └─────────────┘  │ 商品描述                │   │
│                   │                         │   │
│  ┌─┬─┬─┬─┐       │                         │   │
│  │1│2│3│4│       │ 顏色: [藍] [麻米] [灰黑] │   │
│  └─┴─┴─┴─┘       │                         │   │
│                   │ 尺寸: [M] [L]           │   │
│                   │                         │   │
│                   │ 數量: [-] 1 [+]         │   │
│                   │                         │   │
│                   │ [ADD TO CART] [BUY NOW] │   │
│                   └─────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 3.3 組件規格

#### 3.3.1 圖片展示區域

**功能**：

- 主圖展示（aspect-square）
- 縮圖切換（最多 4 張）
- 圖片載入優化

**樣式**：

```jsx
<div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-md">
  <Image
    src={activeImage}
    alt={`${product?.name || 'Product'} 預覽圖`}
    fill
    className="object-contain"
    sizes="(min-width: 1440px) 640px, (min-width: 768px) 75vw, 100vw"
    priority
  />
</div>
```

#### 3.3.2 商品資訊區域

**功能**：

- 商品名稱（使用 `font-anton`）
- 商品標語（可選）
- 價格顯示（使用 `font-anton`，橘色）
- 商品描述

**樣式**：

```jsx
<div className="border-l-4 border-green-primary pl-4">
  <h1 className="font-anton text-3xl text-blue-primary 1440:text-[40px]">
    {product?.name || '商品詳情'}
  </h1>
  {product?.tagline && (
    <p className="mt-2 font-noto-sans-tc text-sm text-muted-foreground">
      {product.tagline}
    </p>
  )}
</div>
```

#### 3.3.3 規格選擇器

**顏色選擇器**：

```jsx
<div className="flex flex-wrap gap-2">
  {colors.map(color => (
    <button
      key={color}
      type="button"
      onClick={() => setSelectedColor(color)}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-noto-sans-tc transition-colors',
        selectedColor === color
          ? 'border-blue-primary bg-blue-primary text-white'
          : 'border-slate-300 bg-white text-blue-primary hover:border-blue-primary/60',
      )}
      aria-pressed={selectedColor === color}
    >
      {color}
    </button>
  ))}
</div>
```

**尺寸選擇器**：

```jsx
<div className="flex flex-wrap gap-2">
  {sizes.map(size => (
    <button
      key={size}
      type="button"
      onClick={() => setSelectedSize(size)}
      className={cn(
        'rounded-md border px-4 py-2 text-sm font-noto-sans-tc transition-colors',
        selectedSize === size
          ? 'border-blue-primary bg-blue-primary text-white'
          : 'border-slate-300 bg-white text-blue-primary hover:border-blue-primary/60',
      )}
      aria-pressed={selectedSize === size}
    >
      {size}
    </button>
  ))}
</div>
```

#### 3.3.4 數量選擇器

**功能**：

- 減少按鈕（-）
- 數量顯示
- 增加按鈕（+）
- 最小值為 1

**樣式**：

```jsx
<div className="inline-flex items-center gap-4">
  <button
    type="button"
    onClick={() => handleQuantityChange('decrease')}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-anton text-blue-primary transition-colors hover:border-blue-primary/60 disabled:opacity-50"
    disabled={quantity <= 1}
    aria-label="減少購買數量"
  >
    −
  </button>
  <span className="min-w-[2.5rem] text-center font-anton text-xl text-blue-primary">
    {quantity}
  </span>
  <button
    type="button"
    onClick={() => handleQuantityChange('increase')}
    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-anton text-blue-primary transition-colors hover:border-blue-primary/60"
    aria-label="增加購買數量"
  >
    +
  </button>
</div>
```

#### 3.3.5 操作按鈕

**加入購物車按鈕**：

```jsx
<Button
  variant="outline"
  className="h-12 flex-1 border-blue-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-blue-primary hover:text-white"
  onClick={handleAddToCart}
>
  ADD TO CART
</Button>
```

**立即購買按鈕**：

```jsx
<Button
  className="h-12 flex-1 bg-green-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-green-primary/90"
  onClick={handleBuyNow}
  disabled={isSubmitting}
>
  {isSubmitting ? 'PROCESSING…' : 'BUY NOW'}
</Button>
```

### 3.4 響應式佈局

| 螢幕尺寸 | 寬度           | 佈局方式     | 圖片區域 | 資訊區域 |
| -------- | -------------- | ------------ | -------- | -------- |
| Mobile   | < 640px        | 單欄垂直排列 | 100%     | 100%     |
| Tablet   | 640px - 1440px | 單欄垂直排列 | 100%     | 100%     |
| Desktop  | > 1440px       | 雙欄水平排列 | ~52%     | ~48%     |

**Tailwind 類別**：

```jsx
<div className="grid gap-10 1440:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] 1440:gap-16">
```

### 3.5 Loading 狀態

**立即購買按鈕 Loading**：

```jsx
<Button disabled={isSubmitting}>
  {isSubmitting ? 'PROCESSING…' : 'BUY NOW'}
</Button>
```

### 3.6 錯誤處理

**商品不存在**：

- 使用 Next.js `notFound()` 函數
- 顯示 404 頁面

**API 錯誤**：

- 顯示 console.error 記錄
- 不影響頁面正常運作

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 商品資訊展示

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者進入 `/products/[productId]` 頁面
2. 系統載入商品資料（目前為 Mock Data）
3. 系統展示商品資訊：
   - 商品名稱
   - 商品標語（如有）
   - 商品價格（格式化為 NT$ 150）
   - 商品描述
   - 商品圖片（主圖 + 縮圖）

**成功條件**：

- ✅ 所有商品資訊正確顯示
- ✅ 圖片正確載入和顯示
- ✅ 價格格式化正確
- ✅ 響應式佈局正常運作

**例外處理**：

- 商品不存在 → 顯示 404 頁面
- 圖片載入失敗 → 使用 fallback 圖片

---

### FR-2: 圖片切換功能

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 系統顯示主圖（第一張圖片）
2. 如有縮圖，顯示縮圖列表（最多 4 張）
3. 使用者點擊縮圖
4. 主圖切換為對應圖片

**成功條件**：

- ✅ 主圖正確顯示
- ✅ 縮圖正確顯示
- ✅ 點擊縮圖切換主圖
- ✅ 當前選中的縮圖有視覺回饋

---

### FR-3: 規格選擇功能

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 系統解析商品規格（顏色、尺寸）
2. 顯示可選的顏色和尺寸
3. 預設選擇第一個選項
4. 使用者點擊其他選項
5. 更新選中狀態

**成功條件**：

- ✅ 顏色選項正確顯示
- ✅ 尺寸選項正確顯示
- ✅ 預設選擇第一個選項
- ✅ 點擊後正確更新選中狀態
- ✅ 選中狀態有視覺回饋

**例外處理**：

- 無規格選項 → 不顯示規格選擇器
- 只有一種規格 → 自動選擇該規格

---

### FR-4: 數量選擇功能

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 預設數量為 1
2. 使用者點擊「+」按鈕
3. 數量增加 1（最大值為 5）
4. 使用者點擊「-」按鈕
5. 數量減少 1（最小值為 1）

**成功條件**：

- ✅ 預設數量為 1
- ✅ 「+」按鈕正確增加數量
- ✅ 「-」按鈕正確減少數量
- ✅ 數量不能小於 1
- ✅ 數量不能大於 5
- ✅ 數量為 1 時「-」按鈕禁用
- ✅ 數量為 5 時「+」按鈕禁用

---

### FR-5: 加入購物車功能

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者選擇商品規格和數量
2. 點擊「ADD TO CART」按鈕
3. 系統建立購物車項目
4. 更新 Cart Store
5. 購物車抽屜顯示新增項目

**購物車項目結構**：

```javascript
{
  id: "productId::color::size",  // 唯一識別碼
  productId: "volleyball-socks-classic-se",
  name: "Volleyball Socks Classic+ SE",
  price: 150,
  image: "https://example.com/image.jpg",
  color: "2025藍",
  size: "M (20-24.5cm)",
  quantity: 2
}
```

**成功條件**：

- ✅ 購物車項目正確建立
- ✅ Cart Store 正確更新
- ✅ 購物車抽屜顯示新增項目
- ✅ 相同規格商品數量累加

**例外處理**：

- 無效商品 ID → 不執行加入購物車
- 購物車儲存失敗 → 顯示錯誤訊息

---

### FR-6: 立即購買功能

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者選擇商品規格和數量
2. 點擊「BUY NOW」按鈕
3. 按鈕顯示 Loading 狀態
4. 呼叫 `/api/checkout/intent` API
5. 系統導向 `/checkout/pay` 頁面

**API 請求**：

```javascript
{
  productId: "volleyball-socks-classic-se",
  quantity: 2,
  email: "test@test.com",  // 目前為固定值
  color: "2025藍",
  size: "M (20-24.5cm)"
}
```

**成功條件**：

- ✅ 按鈕正確顯示 Loading 狀態
- ✅ API 請求正確發送
- ✅ 成功導向結帳頁面
- ✅ 訂單意圖正確儲存

**例外處理**：

- API 錯誤 → 顯示錯誤訊息，停止 Loading
- 網路錯誤 → 顯示錯誤訊息，允許重試

---

### FR-7: 商品標籤顯示

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 系統檢查商品是否有標籤
2. 如有標籤，在商品名稱下方顯示
3. 標籤樣式與商品列表頁保持一致

**標籤樣式**：

```jsx
{
  product?.tag && (
    <div className="mt-2">
      <span className="inline-flex items-center rounded-full bg-green-primary px-3 py-1 text-xs font-bold text-blue-primary">
        {product.tag}
      </span>
    </div>
  )
}
```

**成功條件**：

- ✅ 有標籤時正確顯示
- ✅ 無標籤時不顯示
- ✅ 樣式與商品列表頁一致

---

### FR-8: 圖片點擊放大功能

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 使用者點擊主圖
2. 開啟圖片放大 Modal
3. 顯示完整尺寸圖片
4. 支援鍵盤 ESC 關閉
5. 支援點擊背景關閉

**技術實作**：

- 使用 `z-[9999]` 確保 Modal 在 header 上方顯示
- 防止背景滾動（`document.body.style.overflow = 'hidden'`）
- 響應式圖片尺寸（`max-h-[90vh] max-w-[90vw]`）
- 響應式關閉按鈕位置：手機版在上方（`-top-12 right-0`），桌面版在右側（`sm:-right-12 sm:top-0`）

**成功條件**：

- ✅ 點擊主圖開啟放大 Modal
- ✅ 顯示完整尺寸圖片
- ✅ 支援多種關閉方式
- ✅ Modal 在 header 上方顯示
- ✅ 響應式關閉按鈕位置
- ✅ 響應式設計

---

### FR-9: 圖片載入狀態

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 圖片載入中顯示 Loading 狀態
2. 載入完成後顯示圖片
3. 載入失敗顯示 fallback 圖片

**成功條件**：

- ✅ 載入中顯示 Loading
- ✅ 載入完成正常顯示
- ✅ 載入失敗有 fallback

---

### FR-10: API 錯誤處理

**優先級**: 🟡 P1 (High)

**操作流程**：

1. API 錯誤時顯示用戶友好提示
2. 提供重試選項
3. 不影響頁面其他功能

**成功條件**：

- ✅ 錯誤訊息清晰易懂
- ✅ 提供重試機制
- ✅ 不影響其他功能

---

### FR-11: 手機版圖片 Slider

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 手機版：≤ 3 張圖片使用縮圖網格，> 3 張圖片使用 ImageSlider
2. ImageSlider 一次顯示 3 張圖片，以當前選中圖片為中心
3. 左右箭頭切換圖片（每次移動一張）
4. 支援滑動手勢（touch events）
5. 顯示當前圖片位置指示器
6. 桌面版保持原有縮圖網格顯示

**技術實作**：

- 使用自定義 `ImageSlider` 組件，支援 `itemsPerView` 參數（預設 3）
- 響應式顯示邏輯：`showMobileSlider = images.length > 3`
- 手機版：≤ 3 張圖片顯示縮圖網格，> 3 張圖片使用 Slider
- ImageSlider 使用 3 欄網格佈局（`grid grid-cols-3 gap-3`）
- 智能圖片範圍計算：以當前選中圖片為中心顯示 3 張圖片
- 桌面版：保持原有縮圖網格顯示
- 支援 touch 手勢：`onTouchStart`, `onTouchMove`, `onTouchEnd`
- 平滑動畫：`transition-transform duration-300 ease-in-out`

**成功條件**：

- ✅ 手機版正確顯示 Slider（> 3 張圖片時）
- ✅ 手機版正確顯示縮圖網格（≤ 3 張圖片時）
- ✅ ImageSlider 一次顯示 3 張圖片
- ✅ 以當前選中圖片為中心顯示
- ✅ 箭頭切換正常運作
- ✅ 支援滑動手勢
- ✅ 位置指示器正確
- ✅ 桌面版保持原有體驗

---

### FR-12: SEO 優化

**優先級**: 🟡 P1 (High)

**Metadata 設定**：

```javascript
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
```

**成功條件**：

- ✅ 動態生成頁面標題
- ✅ 動態生成頁面描述
- ✅ Open Graph 標籤正確設定
- ✅ 商品不存在時顯示預設 metadata

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/app/products/[productId]/__tests__/product-detail-client.test.jsx`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductDetailClient from '../product-detail-client'

const mockProduct = {
  productId: 'test-product',
  name: 'Test Product',
  tagline: 'Test Tagline',
  description: 'Test Description',
  price: 150,
  colors: ['藍色', '紅色'],
  sizes: ['M', 'L'],
  heroImage: 'https://example.com/image1.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
}

describe('ProductDetailClient', () => {
  test('應該顯示商品資訊', () => {
    render(<ProductDetailClient product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Tagline')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('NT$ 150')).toBeInTheDocument()
  })

  test('應該顯示顏色選擇器', () => {
    render(<ProductDetailClient product={mockProduct} />)

    expect(screen.getByText('藍色')).toBeInTheDocument()
    expect(screen.getByText('紅色')).toBeInTheDocument()
  })

  test('應該顯示尺寸選擇器', () => {
    render(<ProductDetailClient product={mockProduct} />)

    expect(screen.getByText('M')).toBeInTheDocument()
    expect(screen.getByText('L')).toBeInTheDocument()
  })

  test('應該顯示數量選擇器', () => {
    render(<ProductDetailClient product={mockProduct} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByLabelText('減少購買數量')).toBeInTheDocument()
    expect(screen.getByLabelText('增加購買數量')).toBeInTheDocument()
  })

  test('應該顯示操作按鈕', () => {
    render(<ProductDetailClient product={mockProduct} />)

    expect(screen.getByText('ADD TO CART')).toBeInTheDocument()
    expect(screen.getByText('BUY NOW')).toBeInTheDocument()
  })

  test('應該切換選中的顏色', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const redButton = screen.getByText('紅色')
    await user.click(redButton)

    expect(redButton).toHaveClass('bg-blue-primary', 'text-white')
  })

  test('應該切換選中的尺寸', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const largeButton = screen.getByText('L')
    await user.click(largeButton)

    expect(largeButton).toHaveClass('bg-blue-primary', 'text-white')
  })

  test('應該增加數量', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const increaseButton = screen.getByLabelText('增加購買數量')
    await user.click(increaseButton)

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('應該減少數量', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const increaseButton = screen.getByLabelText('增加購買數量')
    const decreaseButton = screen.getByLabelText('減少購買數量')

    await user.click(increaseButton)
    await user.click(decreaseButton)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('數量不能小於 1', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const decreaseButton = screen.getByLabelText('減少購買數量')
    await user.click(decreaseButton)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(decreaseButton).toBeDisabled()
  })

  test('應該切換圖片', async () => {
    render(<ProductDetailClient product={mockProduct} />)
    const user = userEvent.setup()

    const thumbnailButtons = screen.getAllByLabelText(/預覽圖/)
    if (thumbnailButtons.length > 1) {
      await user.click(thumbnailButtons[1])
      // 驗證主圖已切換
    }
  })
})
```

---

### 5.2 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/product-detail-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('商品詳情頁面整合測試', () => {
  test('完整商品瀏覽流程', async () => {
    // 1. 訪問商品詳情頁面
    // 2. 驗證商品資訊顯示
    // 3. 選擇顏色和尺寸
    // 4. 調整數量
    // 5. 點擊加入購物車
    // 6. 驗證購物車更新
  })

  test('立即購買流程', async () => {
    // 1. 訪問商品詳情頁面
    // 2. 選擇規格和數量
    // 3. 點擊立即購買
    // 4. 驗證 API 呼叫
    // 5. 驗證導向結帳頁面
  })

  test('圖片切換功能', async () => {
    // 1. 訪問有多張圖片的商品
    // 2. 點擊縮圖
    // 3. 驗證主圖切換
    // 4. 驗證選中狀態
  })

  test('響應式設計測試', async () => {
    // 1. 測試 Mobile viewport (390px)
    // 2. 驗證單欄佈局
    // 3. 測試 Desktop viewport (1440px)
    // 4. 驗證雙欄佈局
  })

  test('商品不存在處理', async () => {
    // 1. 訪問不存在的商品 ID
    // 2. 驗證顯示 404 頁面
  })
})
```

---

### 5.3 測試覆蓋率目標

| 類型                | 目標覆蓋率 | 說明                 |
| ------------------- | ---------- | -------------------- |
| ProductDetailClient | 90%+       | 核心業務邏輯高覆蓋率 |
| 購物車整合          | 100%       | 所有購物車操作都測試 |
| 整合測試            | 100%       | 所有關鍵流程全覆蓋   |

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
- ✅ 圖片預載入（priority 屬性）
- ✅ 資料快取（使用 cache 函數）

---

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 使用 Next.js Image 防止圖片注入攻擊
- ✅ 防止 XSS（React 自動跳脫）
- ✅ HTTPS 連線（生產環境）
- ✅ 輸入驗證（商品 ID 格式）

#### 資料驗證

- ✅ 驗證 productId 格式
- ✅ 處理無效的商品 ID（404 頁面）
- ✅ 處理損壞的圖片 URL
- ✅ 購物車資料驗證

---

### 6.3 SEO

**已實作**：

- ✅ 動態頁面 title 和 description
- ✅ Open Graph tags
- ✅ 商品名稱和描述優化

**未來考慮**：

- [ ] 結構化資料（Schema.org Product）
- [ ] 商品圖片 alt 文字優化
- [ ] 商品 URL 結構優化

---

### 6.4 無障礙性 (Accessibility)

#### 語義化 HTML

```jsx
<section className="root">
  <div className="wrapper">
    <h1>商品名稱</h1>
    <img alt="商品圖片" />
    <button aria-pressed={selected}>顏色選項</button>
  </div>
</section>
```

#### ARIA 標籤

```jsx
<button
  aria-pressed={selectedColor === color}
  aria-label="選擇顏色"
>
  顏色
</button>

<button
  aria-label="減少購買數量"
  disabled={quantity <= 1}
>
  −
</button>
```

#### 鍵盤導航

- Tab 順序：圖片 → 商品資訊 → 規格選擇 → 數量選擇 → 操作按鈕
- Enter 鍵選擇規格選項
- 所有互動元素可鍵盤存取

---

### 6.5 響應式設計

| 螢幕尺寸 | 測試裝置             | 佈局方式 | 圖片區域 | 資訊區域 |
| -------- | -------------------- | -------- | -------- | -------- |
| Mobile   | iPhone 12/13 (390px) | 單欄     | 100%     | 100%     |
| Tablet   | iPad (768px)         | 單欄     | 100%     | 100%     |
| Desktop  | 1440px               | 雙欄     | ~52%     | ~48%     |

**測試瀏覽器**：

- Chrome (最新版本)
- Safari (最新版本)
- Firefox (最新版本)
- Edge (最新版本)

---

## 7. 相依性與里程碑 (Dependencies & Milestones)

### 7.1 前置需求

| 項目          | 狀態      | 負責人 | 備註     |
| ------------- | --------- | ------ | -------- |
| 商品列表頁面  | ✅ 已完成 | -      | 現有實作 |
| 購物車系統    | ✅ 已完成 | -      | 現有實作 |
| 結帳 API      | ✅ 已完成 | -      | 現有實作 |
| Mock 商品資料 | ✅ 已完成 | -      | 現有實作 |

### 7.2 開發里程碑

#### Phase 1: 文檔與規劃（Week 1）

- [x] Spec 文檔完成
- [ ] 測試案例撰寫完成
- [ ] 設計稿確認
- [ ] 效能基準測試

#### Phase 2: 核心功能開發（Week 2）

- [ ] 商品資訊展示功能
- [ ] 圖片切換功能
- [ ] 規格選擇功能
- [ ] 數量選擇功能

#### Phase 3: 購物功能開發（Week 3）

- [ ] 加入購物車功能
- [ ] 立即購買功能
- [ ] 購物車整合測試
- [ ] 結帳流程整合

#### Phase 4: 優化與測試（Week 4）

- [ ] 響應式設計調整
- [ ] 效能優化
- [ ] 無障礙性測試
- [ ] 跨瀏覽器測試

#### Phase 5: 部署與監控（Week 5）

- [ ] Code Review
- [ ] 整合測試完成
- [ ] 部署至 Production
- [ ] 效能監控設定

---

### 7.3 風險評估

| 風險             | 影響等級 | 機率 | 應對策略                |
| ---------------- | -------- | ---- | ----------------------- |
| 圖片載入效能問題 | 🟡 中    | 低   | 使用 Next.js Image 優化 |
| 購物車整合問題   | 🟡 中    | 低   | 充分測試購物車功能      |
| 結帳流程問題     | 🟡 中    | 低   | 測試結帳 API 整合       |
| 響應式設計問題   | 🟢 低    | 低   | 持續測試多種裝置        |

---

## 8. 路由常數更新

更新 `src/routers/path.js`：

```javascript
export const PATH = {
  // ... 現有路由

  // 商品相關
  products: {
    list: '/products',
    detail: productId => `/products/${productId}`,
  },

  // 結帳相關
  checkout: {
    pay: '/checkout/pay',
  },
}
```

**使用範例**：

```javascript
import { PATH } from '@/routers/path'

// 導向商品詳情
router.push(PATH.products.detail('volleyball-socks-classic-se'))

// 導向結帳頁面
router.push(PATH.checkout.pay)
```

---

## 9. 後續版本規劃 (Future Enhancements)

### 商品詳情 v2.0

- [ ] 商品評價系統
- [ ] 商品推薦功能
- [ ] 商品比較功能
- [ ] 庫存顯示

### 商品詳情 v3.0

- [ ] 商品收藏功能
- [ ] 商品分享功能
- [ ] 商品問答功能
- [ ] 商品影片展示

### 商品詳情 v4.0

- [ ] AR 試穿功能
- [ ] 3D 商品展示
- [ ] 個人化推薦
- [ ] 即時客服

---

## 10. 常見問題 (FAQ)

**Q1: 為什麼商品詳情頁面使用雙欄佈局？**  
A: 在桌面版使用雙欄佈局可以同時展示商品圖片和詳細資訊，提供更好的瀏覽體驗。手機版則使用單欄佈局以適應小螢幕。

**Q2: 為什麼不顯示庫存數量？**  
A: 目前使用 Mock Data，沒有真實的庫存資訊。未來接真實 API 後會加入庫存顯示功能。

**Q3: 為什麼立即購買需要固定 email？**  
A: 目前是測試階段，使用固定 email。未來會整合用戶登入系統，使用真實的用戶 email。

**Q4: 購物車項目如何避免重複？**  
A: 使用 `productId::color::size`
作為唯一識別碼，相同規格的商品會累加數量，不同規格會建立新的購物車項目。

**Q5: 為什麼圖片使用 object-contain 而非 object-cover？**  
A: 使用 object-contain 確保商品圖片完整顯示，不會被裁切，讓用戶看到完整的商品外觀。

**Q6: 為什麼限制購買數量最多 5 個？**  
A: 基於商品性質和庫存管理考量，限制單次購買數量可確保更多用戶能購買到商品。

**Q7: 手機版圖片 Slider 如何運作？**  
A: 當圖片數量超過 3 張時，手機版會自動切換為 Slider 模式，一次顯示 3 張圖片，以當前選中圖片為中心，支援左右滑動和箭頭切換。3 張或以下時使用縮圖網格顯示。

**Q8: 圖片放大功能支援哪些操作？**  
A: 支援點擊主圖放大、ESC 鍵關閉、點擊背景關閉，並在放大模式下顯示完整解析度圖片。

**Q9: 為什麼圖片放大 Modal 使用 z-[9999]？**  
A: 確保 Modal 在所有其他元素（包括 header）上方顯示，避免被遮蓋。

**Q10: 手機版和桌面版的圖片切換方式有什麼不同？**  
A: 手機版：≤ 3 張圖片使用縮圖網格，>
3 張圖片使用滑動式 ImageSlider 組件，支援觸控手勢；桌面版使用縮圖網格，支援點擊切換。

**Q11: 為什麼手機版圖片放大 Modal 的關閉按鈕位置不同？**  
A: 手機版關閉按鈕放在上方避免被螢幕邊界遮住，桌面版放在右側提供更好的視覺體驗。

---

## 附錄 A: 開發規範 (Development Guidelines)

### A.1 按鈕樣式規範

#### 按鈕 Cursor 樣式

- **規範**：所有按鈕元素都必須加上 `cursor-pointer` class
- **適用範圍**：
  - 所有 `<button>` 元素
  - 所有具有 `onClick` 事件的元素
  - 所有可點擊的互動元素
- **實作範例**：

  ```jsx
  // ✅ 正確
  <button className="... cursor-pointer">按鈕</button>

  // ❌ 錯誤
  <button className="...">按鈕</button>
  ```

#### 符號垂直置中

- **規範**：按鈕內的符號（如 +、-）必須使用 `leading-none` 確保垂直置中
- **適用範圍**：包含單一符號的按鈕
- **實作範例**：

  ```jsx
  // ✅ 正確
  <button className="... text-2xl leading-none">+</button>

  // ❌ 錯誤
  <button className="... text-2xl">+</button>
  ```

### A.2 本地化規範

#### 按鈕文字

- **規範**：所有按鈕文字必須使用繁體中文
- **實作範例**：

  ```jsx
  // ✅ 正確
  <button>加入購物車</button>
  <button>立即購買</button>

  // ❌ 錯誤
  <button>ADD TO CART</button>
  <button>BUY NOW</button>
  ```

---

## 附錄 B: 參考資源

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Zustand State Management](https://zustand-demo.pmnd.rs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Schema.org Product](https://schema.org/Product)

---

## 附錄 B: 設計參考

**靈感來源**：

- Nike 商品詳情頁
- Uniqlo 商品展示
- 運動品牌電商設計

**設計重點**：

- 圖片為主導
- 資訊層次清晰
- 操作流程順暢
- 視覺回饋明確

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容     | 負責人      |
| ---- | ---------- | ------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立 | Paper Hsiao |

---

**相關文檔**：

- [商品列表頁面規格書](./products-page-spec.md)
- [購物車頁面規格書](./cart-page-spec.md)（未來）
- [結帳頁面規格書](./checkout-page-spec.md)（未來）

---

**文件結束**
