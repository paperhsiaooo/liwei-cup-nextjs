# 購物車功能規格書

# Shopping Cart Specification

**版本 (Version)**: 1.1  
**建立日期 (Created Date)**: 2025-10-19  
**最後更新 (Last Updated)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Updated

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者完整的購物車體驗，包含商品暫存、數量管理、價格計算和結帳流程，讓使用者可以一次購買多個商品。

### 1.2 使用者故事 (User Stories)

**US-1: 查看購物車**

> 作為一個**使用者**，我想要隨時查看我的購物車內容，以便了解我已選購的商品和總金額。

**US-2: 管理購物車商品**

> 作為一個**使用者**，我想要在購物車中調整商品數量或移除商品，以便控制我的購買清單。

**US-3: 購物車持久化**

> 作為一個**使用者**，我希望我的購物車內容能夠保存，即使關閉瀏覽器後再次開啟，購物車內容仍然存在。

**US-4: 快速查看購物車**

> 作為一個**使用者**，我想要在任何頁面都能快速查看購物車，不需要離開當前頁面。

**US-5: 前往結帳**

> 作為一個**使用者**，我想要從購物車前往結帳流程，以便完成購買。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ 購物車狀態管理（Zustand + LocalStorage）
- ✅ 購物車抽屜（Header 快速查看）
- ✅ 購物車頁面（`/cart`）
- ✅ 商品數量管理（增加、減少、移除）
- ✅ 購物車商品資訊展示（圖片、名稱、規格、價格）
- ✅ 價格計算（單項小計、總計）
- ✅ 空購物車狀態
- ✅ 響應式設計
- ✅ 購物車持久化
- ⏳ 結帳流程整合（待完善）

#### 不包含功能 (Out of Scope)

- ❌ 優惠券功能（未來版本）
- ❌ 購物車分享功能（未來版本）
- ❌ 購物車商品推薦（未來版本）
- ❌ 多地址管理（未來版本）
- ❌ 配送方式選擇（目前免運費）
- ❌ 購物車商品庫存檢查（未來版本）

### 1.4 與現有系統的關係

**商品詳情整合**

- 從商品詳情頁加入購物車
- 支援商品規格（顏色、尺寸）
- 相同規格商品數量累加

**Header 導航整合**

- Header 顯示購物車圖標和數量徽章
- 點擊購物車圖標開啟抽屜

**結帳流程整合**

- 購物車頁面 → 結帳頁面（待開發）
- 購物車抽屜 → 購物車頁面

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能         | 路徑    | 檔案位置                              | 說明             |
| ------------ | ------- | ------------------------------------- | ---------------- |
| 購物車頁面   | `/cart` | `src/app/cart/page.jsx`               | Server Component |
| 購物車客戶端 | -       | `src/app/cart/cart-page-client.jsx`   | Client Component |
| 購物車抽屜   | -       | `src/components/cart/cart-drawer.jsx` | Client Component |
| 購物車狀態   | -       | `src/store/cart-context.js`           | Zustand Store    |

### 2.2 檔案結構

```
src/
├── app/
│   └── cart/
│       ├── page.jsx                    # 購物車頁面入口（Server Component）
│       └── cart-page-client.jsx        # 購物車客戶端組件
├── components/
│   └── cart/
│       └── cart-drawer.jsx             # 購物車抽屜組件
├── store/
│   └── cart-context.js                 # 購物車狀態管理（Zustand）
├── utils/
│   ├── currency.js                     # 貨幣格式化工具
│   └── utils.js                        # 通用工具函數
└── routers/
    └── path.js                         # 路由常數
```

### 2.3 資料結構

**購物車項目 (Cart Item)**

```typescript
{
  id: string // 購物車項目唯一 ID (格式: productId::color::size)
  productId: string // 商品 ID
  name: string // 商品名稱
  price: number // 商品價格（單位：新台幣）
  image: string // 商品圖片 URL
  color: string // 選擇的顏色（可為空）
  size: string // 選擇的尺寸（可為空）
  quantity: number // 購買數量
}
```

**購物車狀態 (Cart State)**

```typescript
{
  items: CartItem[]         // 購物車商品陣列
  addItem: (item) => void   // 加入商品到購物車
  removeItem: (id) => void  // 移除商品
  clear: () => void         // 清空購物車
  updateQuantity: (id, quantity) => void  // 更新商品數量
  incrementItem: (id) => void            // 增加商品數量
  decrementItem: (id) => void            // 減少商品數量
  getCount: () => number                 // 取得購物車商品總數
}
```

**範例資料**

```javascript
{
  id: "volleyball-socks-classic-se::2025藍::M (20-24.5cm)",
  productId: "volleyball-socks-classic-se",
  name: "Volleyball Socks Classic+ SE",
  price: 150,
  image: "https://example.com/image.jpg",
  color: "2025藍",
  size: "M (20-24.5cm)",
  quantity: 2
}
```

### 2.4 購物車 ID 生成策略

**生成規則**：

```javascript
const createCartKey = ({ productId, color, size }) =>
  [productId ?? '', color ?? '', size ?? ''].join('::')
```

**範例**：

- `volleyball-socks-classic-se::2025藍::M (20-24.5cm)` - 完整規格
- `volleyball-tshirt::紅色::` - 只有顏色沒有尺寸
- `volleyball-bag::::` - 沒有規格選項

**優點**：

- 相同商品不同規格會被視為不同項目
- 避免購物車項目衝突
- 易於識別和除錯

### 2.5 LocalStorage 持久化

**Storage Key**: `liwei-cart`

**儲存內容**:

```json
{
  "state": {
    "items": [
      {
        "id": "volleyball-socks-classic-se::2025藍::M (20-24.5cm)",
        "productId": "volleyball-socks-classic-se",
        "name": "Volleyball Socks Classic+ SE",
        "price": 150,
        "image": "https://example.com/image.jpg",
        "color": "2025藍",
        "size": "M (20-24.5cm)",
        "quantity": 2
      }
    ]
  },
  "version": 0
}
```

**SSR 處理**：

```javascript
storage: createJSONStorage(() =>
  typeof window === 'undefined'
    ? {
        getItem: () => null,
        setItem: () => undefined,
        removeItem: () => undefined,
      }
    : window.localStorage,
)
```

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框、粗體字）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 卡片式設計
- ✅ 響應式網格佈局
- ✅ 清晰的視覺層次

### 3.2 購物車頁面 UI

**桌面版佈局（垂直排列）**：

```
┌─────────────────────────────────────────────────────────┐
│                       購物車                            │
│                 確認商品資訊後即可前往結帳流程             │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 購物車                                               │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ 商品資訊     單價    數量    小計             操作   │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ [圖] 商品 A   NT$150  [-] 2 [+]  NT$ 300      [X]  │ │
│  │     2025藍 / M                                      │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ [圖] 商品 B   NT$480  [-] 1 [+]  NT$ 480      [X]  │ │
│  │     午夜藍 / S                                      │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│                                      ┌──────────────┐  │
│                                      │ 訂單摘要     │  │
│                                      ├──────────────┤  │
│                                      │ 商品小計     │  │
│                                      │  NT$ 780     │  │
│                                      │              │  │
│                                      │ 運費         │  │
│                                      │  NT$ 0       │  │
│                                      │              │  │
│                                      │ 總計         │  │
│                                      │  NT$ 780     │  │
│                                      │              │  │
│                                      │ [前往結帳]   │  │
│                                      │              │  │
│                                      └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**手機版佈局（卡片式）**：

```
┌─────────────────────────────────────────────────────────┐
│                       購物車                            │
│                 確認商品資訊後即可前往結帳流程             │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 購物車                                               │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ┌──────┐ 商品 A                                ×   │ │
│  │ │      │ 2025藍 / M                               │ │
│  │ │ 100px│ [-] 2 [+]                    NT$ 300     │ │
│  │ │      │                                         │ │
│  │ └──────┘                                         │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ┌──────┐ 商品 B                                ×   │ │
│  │ │      │ 午夜藍 / S                               │ │
│  │ │ 100px│ [-] 1 [+]                    NT$ 480     │ │
│  │ │      │                                         │ │
│  │ └──────┘                                         │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ 訂單摘要                                            │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ 商品小計                    NT$ 780                 │ │
│  │ 運費                        NT$ 0                   │ │
│  │ 總計                        NT$ 780                 │ │
│  │                                                      │ │
│  │ [前往結帳]                                          │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 購物車抽屜 UI

```
┌──────────────────────────┐
│ 購物車               [X] │
├──────────────────────────┤
│                          │
│ [圖] 商品 A               │
│      2 × NT$ 150         │
│                     [X]  │
├──────────────────────────┤
│ [圖] 商品 B               │
│      1 × NT$ 150         │
│                     [X]  │
├──────────────────────────┤
│                          │
│    [前往結帳]            │
└──────────────────────────┘
```

### 3.4 購物車圖標徽章

```
┌──────────┐
│  🛒 (3)  │  ← 購物車數量徽章
└──────────┘
```

### 3.5 組件規格

#### 3.5.1 購物車頁面組件 (CartPageClient)

**功能**：完整的購物車頁面，展示所有商品和結帳資訊

**Props**: 無（從 Zustand Store 讀取）

**狀態管理**：

```javascript
const items = useCartStore(state => state.items)
const incrementItem = useCartStore(state => state.incrementItem)
const decrementItem = useCartStore(state => state.decrementItem)
const removeItem = useCartStore(state => state.removeItem)
```

**計算屬性**：

```javascript
// 商品總數（數量總和）
const itemCount = useMemo(
  () => items.reduce((total, item) => total + item.quantity, 0),
  [items],
)

// 小計
const subtotal = useMemo(
  () => items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items],
)
```

#### 3.5.2 購物車抽屜組件 (CartDrawer)

**功能**：Header 上的快速購物車查看，支援移除商品和前往購物車頁面

**Props**: 無（從 Zustand Store 讀取）

**狀態管理**：

```javascript
const items = useCartStore(state => state.items)
const removeItem = useCartStore(state => state.removeItem)
const [open, setOpen] = useState(false)
```

**互動行為**：

- 點擊 Header 購物車圖標開啟抽屜
- 點擊商品圖片/名稱導向商品詳情頁
- 點擊移除按鈕移除商品
- 點擊 Checkout 按鈕關閉抽屜並導向購物車頁面

### 3.6 購物車商品項目 UI

**購物車頁面版本**：

```jsx
{
  /* 桌面版 Header */
}
;<div className="hidden border-b px-6 py-3 text-sm font-semibold text-slate-500 lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:gap-4">
  <span>商品資訊</span>
  <span className="text-center">單價</span>
  <span className="text-center">數量</span>
  <span className="text-right">小計</span>
  <span className="sr-only">操作</span>
</div>

{
  /* 桌面版 Body */
}
;<div className="hidden lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:items-center lg:gap-4">
  {/* 商品資訊 */}
  <div className="flex gap-4">
    <Image /> {/* 80×80px */}
    <div>
      <p>商品名稱</p>
      <p>2025藍</p>
      <p>M (20-24.5cm)</p>
    </div>
  </div>

  {/* 單價 */}
  <div className="text-center">NT$ 150</div>

  {/* 數量選擇器 */}
  <div className="flex justify中心">
    <div className="inline-flex items中心 rounded-full border">
      <button>−</button>
      <span>2</span>
      <button>+</button>
    </div>
  </div>

  {/* 小計 */}
  <div className="text-right">NT$ 300</div>

  {/* 移除按鈕 */}
  <div className="flex justify中心">
    <button>×</button>
  </div>
</div>

{
  /* 手機版 */
}
;<div className="flex gap-3 lg:hidden">
  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg">
    <Image /> {/* 100×100px */}
  </div>

  <div className="flex flex-1 flex-col">
    <div className="mb-1 flex items-start justify-between gap-2">
      <h3 className="text-sm font-semibold leading-tight text-blue-primary">
        商品名稱
      </h3>
      <button className="text-slate-400 hover:text-red-500">×</button>
    </div>

    <p className="mb-3 text-xs text-muted-foreground">2025藍 / M (20-24.5cm)</p>

    <div className="mt-auto flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-lg font-bold text-blue-primary sm:order-2">NT$ 300</p>

      <div className="inline-flex items中心 rounded-full border sm:order-1">
        <button>−</button>
        <span>2</span>
        <button>+</button>
      </div>
    </div>
  </div>
</div>
```

**購物車抽屜版本**：

```jsx
<div className="flex gap-4">
  <Image /> {/* 80×80px */}
  <div>
    <h3>商品名稱</h3>
    <p>藍色</p>
    <p>M</p>
    <p>2 × NT$ 150</p>
  </div>
  <button>×</button>
</div>
```

### 3.7 空購物車狀態

**購物車頁面版本**：

```jsx
<div className="flex flex-col items-center gap-6 py-16 text-center">
  <h1>購物車</h1>
  <p>您的購物車是空的</p>
  <Button asChild>
    <Link href="/products">發現好物</Link>
  </Button>
</div>
```

**購物車抽屜版本**：

```jsx
<p className="py-24 text-center text-sm">您的購物車是空的</p>
```

### 3.8 響應式佈局

| 螢幕尺寸 | 寬度     | 佈局方式     | 商品資訊欄位 | 訂單摘要位置   |
| -------- | -------- | ------------ | ------------ | -------------- |
| Mobile   | < 1024px | 單欄垂直排列 | 卡片式佈局   | 下方全寬       |
| Desktop  | > 1024px | 單欄垂直排列 | Grid 5 欄    | 下方靠右 350px |

**Tailwind 類別**：

```jsx
// 主要佈局（垂直排列）
<div className="space-y-8">

// 商品列表 Header（僅桌面版顯示）
<div className="hidden lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:gap-4">

// 商品項目（桌面版）
<div className="hidden lg:grid lg:grid-cols-[1fr_100px_130px_120px_48px] lg:items-center lg:gap-4">

// 商品項目（手機版）
<div className="flex gap-3 lg:hidden">

// 訂單摘要（靠右對齊，固定寬度）
<aside className="ml-auto w-full space-y-6 rounded-3xl border bg-white p-6 shadow-sm lg:w-[350px]">
```

### 3.9 訂單摘要區塊規格

**位置**：購物車商品列表下方  
**對齊方式**：靠右對齊  
**寬度**：固定 350px（桌面版）  
**響應式**：手機版全寬，桌面版固定寬度

**Grid 欄位寬度規格**：

| 欄位     | 寬度    | 說明                                  |
| -------- | ------- | ------------------------------------- |
| 商品資訊 | `1fr`   | 彈性寬度，適應不同長度的商品名稱      |
| 單價     | `100px` | 固定寬度，足夠顯示 "NT$ 9,999"        |
| 數量     | `130px` | 固定寬度，容納數量控制器 `[-] 99 [+]` |
| 小計     | `120px` | 固定寬度，足夠顯示 "NT$ 99,999"       |
| 操作     | `48px`  | 固定寬度，容納移除按鈕                |

**互動元素指引**：凡是視覺上或功能上視為「按鈕」的元素（例如數量增減、移除按鈕、行動 CTA），必須附帶
`cursor-pointer`，確保使用者游標提示一致。

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 加入購物車

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者在商品詳情頁選擇規格和數量
2. 點擊「加入購物車」按鈕
3. 系統呼叫 `addItem()` 函數
4. 系統檢查是否已有相同規格商品（使用 ID 比對）
5. 如果已存在：累加數量
6. 如果不存在：新增項目
7. 更新 LocalStorage
8. 更新 Header 購物車徽章數量

**成功條件**：

- ✅ 商品正確加入購物車
- ✅ 相同規格商品數量正確累加
- ✅ 購物車徽章數量正確更新
- ✅ LocalStorage 正確儲存

**例外處理**：

- 無效商品 ID → 不執行加入
- LocalStorage 已滿 → 顯示錯誤訊息

---

### FR-2: 查看購物車內容

**優先級**: 🔴 P0 (Critical)

**操作流程**：

**方式 A：購物車抽屜**

1. 使用者點擊 Header 購物車圖標
2. 系統開啟購物車抽屜
3. 系統顯示購物車商品列表（簡化版）
4. 使用者可點擊商品圖片/名稱查看詳情
5. 使用者可點擊移除按鈕移除商品
6. 使用者可點擊 Checkout 前往購物車頁面

**方式 B：購物車頁面**

1. 使用者導航至 `/cart`
2. 系統顯示完整購物車頁面
3. 系統顯示商品列表（含數量控制）
4. 系統顯示訂單摘要（小計、運費、總計）
5. 系統顯示「前往結帳」按鈕

**成功條件**：

- ✅ 購物車抽屜正確開啟和關閉
- ✅ 所有商品正確顯示
- ✅ 商品資訊完整（圖片、名稱、規格、價格、數量）
- ✅ 價格計算正確
- ✅ 空購物車顯示友善提示

---

### FR-3: 調整商品數量

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者在購物車頁面點擊「+」按鈕
2. 系統呼叫 `incrementItem(id)` 函數
3. 系統增加該商品數量 +1
4. 系統更新 LocalStorage
5. 系統重新計算價格

或

1. 使用者在購物車頁面點擊「-」按鈕
2. 系統呼叫 `decrementItem(id)` 函數
3. 系統減少該商品數量 -1
4. 如果數量變為 0，系統移除該商品
5. 系統更新 LocalStorage
6. 系統重新計算價格

**成功條件**：

- ✅ 數量正確增加
- ✅ 數量正確減少
- ✅ 數量為 0 時自動移除商品
- ✅ 價格正確更新
- ✅ LocalStorage 正確更新

**限制**：

- 目前無數量上限（未來可加入庫存檢查）
- 最小數量為 1（減到 0 會移除）

---

### FR-4: 移除購物車商品

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者點擊商品的移除按鈕（× 圖標）
2. 系統呼叫 `removeItem(id)` 函數
3. 系統從購物車移除該商品
4. 系統更新 LocalStorage
5. 系統重新計算價格
6. 系統更新購物車徽章數量

**成功條件**：

- ✅ 商品正確移除
- ✅ 價格正確更新
- ✅ LocalStorage 正確更新
- ✅ 購物車徽章數量正確更新
- ✅ 如果購物車變空，顯示空狀態

---

### FR-5: 價格計算

**優先級**: 🔴 P0 (Critical)

**計算規則**：

```javascript
// 單項小計 = 單價 × 數量
const itemSubtotal = item.price * item.quantity

// 商品總計 = Σ(單價 × 數量)
const subtotal = items.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
)

// 運費（目前固定為 0）
const shippingFee = 0

// 訂單總計 = 商品總計 + 運費
const total = subtotal + shippingFee
```

**顯示格式**：

```javascript
formatCurrencyNT(150) // "NT$ 150"
formatCurrencyNT(1500) // "NT$ 1,500"
```

**成功條件**：

- ✅ 單項小計計算正確
- ✅ 商品總計計算正確
- ✅ 訂單總計計算正確
- ✅ 價格格式化正確（千分位、貨幣符號）
- ✅ 即時更新（數量變動時）

---

### FR-6: 購物車持久化

**優先級**: 🔴 P0 (Critical)

**持久化策略**：

1. 使用 Zustand persist middleware
2. 儲存於 LocalStorage（key: `liwei-cart`）
3. 只儲存 `items` 陣列（使用 `partialize`）
4. SSR 環境返回 null（避免錯誤）

**恢復流程**：

1. 頁面載入時自動從 LocalStorage 讀取
2. 反序列化 JSON 資料
3. 恢復購物車狀態
4. 更新 UI

**成功條件**：

- ✅ 關閉瀏覽器後購物車內容保留
- ✅ 重新開啟瀏覽器後購物車內容正確恢復
- ✅ 不同裝置/瀏覽器購物車獨立
- ✅ SSR 環境不會報錯

**限制**：

- LocalStorage 容量限制（約 5-10MB）
- 跨裝置不同步（未來可考慮後端同步）
- 不處理過期商品（未來功能）

---

### FR-7: 前往結帳

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者在購物車頁面點擊「Proceed to Checkout」按鈕
2. 系統導航至 `/checkout`（待開發）
3. 系統傳遞購物車資料到結帳頁面

**目前狀態**：

- ⚠️ `/checkout` 頁面不存在（會 404）
- ⚠️ 結帳流程尚未實作
- ⚠️ 只支援單一商品立即購買（商品詳情頁 Buy Now）

**未來需求**：

- [ ] 建立 `/checkout` 頁面
- [ ] 收集收件人資訊（姓名、電話、地址）
- [ ] 支援多商品結帳
- [ ] 整合付款 API

---

### FR-8: 購物車徽章

**優先級**: 🟡 P1 (High)

**功能**：

- 顯示購物車商品數量（項目數，非總數量）
- 當購物車為空時不顯示徽章
- 即時更新

**計算方式**：

```javascript
const itemCount = items.length // 項目數
```

**UI 設計**：

```jsx
{
  itemCount > 0 && (
    <span className="absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-primary px-1 text-[10px] font-bold text-white">
      {itemCount}
    </span>
  )
}
```

**成功條件**：

- ✅ 數量正確顯示
- ✅ 數量為 0 時不顯示
- ✅ 即時更新（加入/移除商品時）
- ✅ 樣式正確（橘色背景、白色文字）

---

### FR-9: 購物車空狀態

**優先級**: 🟡 P1 (High)

**觸發條件**：

- 購物車沒有任何商品（`items.length === 0`）

**UI 設計**：

**購物車頁面**：

- 顯示「Shopping Cart」標題
- 顯示「Your Shopping Cart is empty.」訊息
- 提供「發現好物」按鈕導向商品列表頁

**購物車抽屜**：

- 顯示「Your Shopping Cart is empty.」訊息
- 不顯示 Checkout 按鈕

**成功條件**：

- ✅ 空狀態正確顯示
- ✅ 訊息清晰友善
- ✅ 提供明確的下一步行動（前往商品列表）

---

### FR-10: 購物車抽屜互動

**優先級**: 🟡 P1 (High)

**功能**：

1. **開啟/關閉抽屜**

   - 點擊 Header 購物車圖標開啟
   - 點擊關閉按鈕（×）關閉
   - 點擊背景（overlay）關閉

2. **商品項目點擊**

   - 點擊商品圖片導向商品詳情頁
   - 點擊商品名稱導向商品詳情頁
   - 點擊會自動關閉抽屜（使用 Link）

3. **移除商品**

   - 點擊移除按鈕（×）移除商品
   - 使用 `event.preventDefault()` 和 `event.stopPropagation()` 防止導航

4. **前往購物車頁面**
   - 點擊「Checkout」按鈕
   - 關閉抽屜並導向 `/cart`

**成功條件**：

- ✅ 抽屜正確開啟和關閉
- ✅ 點擊商品正確導向詳情頁
- ✅ 移除商品不會觸發導航
- ✅ Checkout 按鈕正確導向購物車頁面
- ✅ 動畫流暢

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/store/__tests__/cart-context.test.js`

```javascript
import { describe, test, expect, beforeEach } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import useCartStore from '../cart-context'

describe('Cart Store', () => {
  beforeEach(() => {
    // 清空購物車
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.clear()
    })
  })

  describe('addItem', () => {
    test('應該正確加入商品', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          image: 'https://example.com/image.jpg',
          color: '藍色',
          size: 'M',
          quantity: 1,
        })
      })

      expect(result.current.items).toHaveLength(1)
      expect(result.current.items[0].name).toBe('Test Product')
    })

    test('相同規格商品應該累加數量', () => {
      const { result } = renderHook(() => useCartStore())

      const item = {
        productId: 'test-product',
        name: 'Test Product',
        price: 150,
        color: '藍色',
        size: 'M',
        quantity: 1,
      }

      act(() => {
        result.current.addItem(item)
        result.current.addItem(item)
      })

      expect(result.current.items).toHaveLength(1)
      expect(result.current.items[0].quantity).toBe(2)
    })

    test('不同規格商品應該分開儲存', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          color: '藍色',
          size: 'M',
          quantity: 1,
        })

        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          color: '紅色',
          size: 'M',
          quantity: 1,
        })
      })

      expect(result.current.items).toHaveLength(2)
    })
  })

  describe('removeItem', () => {
    test('應該正確移除商品', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          quantity: 1,
        })
      })

      const itemId = result.current.items[0].id

      act(() => {
        result.current.removeItem(itemId)
      })

      expect(result.current.items).toHaveLength(0)
    })
  })

  describe('incrementItem', () => {
    test('應該正確增加商品數量', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          quantity: 1,
        })
      })

      const itemId = result.current.items[0].id

      act(() => {
        result.current.incrementItem(itemId)
      })

      expect(result.current.items[0].quantity).toBe(2)
    })
  })

  describe('decrementItem', () => {
    test('應該正確減少商品數量', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          quantity: 2,
        })
      })

      const itemId = result.current.items[0].id

      act(() => {
        result.current.decrementItem(itemId)
      })

      expect(result.current.items[0].quantity).toBe(1)
    })

    test('數量為 1 時減少應該移除商品', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product',
          name: 'Test Product',
          price: 150,
          quantity: 1,
        })
      })

      const itemId = result.current.items[0].id

      act(() => {
        result.current.decrementItem(itemId)
      })

      expect(result.current.items).toHaveLength(0)
    })
  })

  describe('getCount', () => {
    test('應該正確計算購物車商品總數', () => {
      const { result } = renderHook(() => useCartStore())

      act(() => {
        result.current.addItem({
          productId: 'test-product-1',
          name: 'Test Product 1',
          price: 150,
          quantity: 2,
        })

        result.current.addItem({
          productId: 'test-product-2',
          name: 'Test Product 2',
          price: 200,
          quantity: 3,
        })
      })

      expect(result.current.getCount()).toBe(5)
    })
  })
})
```

---

### 5.2 組件測試 (Component Tests)

#### 測試文件：`src/app/cart/__tests__/cart-page-client.test.jsx`

```javascript
import { describe, test, expect, vi, beforeEach } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartPageClient from '../cart-page-client'
import useCartStore from '@/store/cart-context'

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('CartPageClient', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
  })

  test('空購物車應該顯示空狀態', () => {
    render(<CartPageClient />)

    expect(screen.getByText('您的購物車是空的')).toBeInTheDocument()
    expect(screen.getByText('發現好物')).toBeInTheDocument()
  })

  test('應該顯示購物車商品', () => {
    useCartStore.getState().addItem({
      productId: 'test-product',
      name: 'Test Product',
      price: 150,
      quantity: 1,
      image: 'https://example.com/image.jpg',
      color: '藍色',
      size: 'M',
    })

    render(<CartPageClient />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('商品類別：藍色')).toBeInTheDocument()
    expect(screen.getByText('商品 Size：M')).toBeInTheDocument()
    expect(screen.getByText('NT$ 150')).toBeInTheDocument()
  })

  test('應該正確計算價格', () => {
    useCartStore.getState().addItem({
      productId: 'test-product-1',
      name: 'Test Product 1',
      price: 150,
      quantity: 2,
    })

    useCartStore.getState().addItem({
      productId: 'test-product-2',
      name: 'Test Product 2',
      price: 200,
      quantity: 1,
    })

    render(<CartPageClient />)

    expect(screen.getByText('NT$ 500')).toBeInTheDocument() // Subtotal
  })

  test('應該增加商品數量', async () => {
    useCartStore.getState().addItem({
      productId: 'test-product',
      name: 'Test Product',
      price: 150,
      quantity: 1,
    })

    render(<CartPageClient />)
    const user = userEvent.setup()

    const incrementButton = screen.getByLabelText('增加數量')
    await user.click(incrementButton)

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  test('應該減少商品數量', async () => {
    useCartStore.getState().addItem({
      productId: 'test-product',
      name: 'Test Product',
      price: 150,
      quantity: 2,
    })

    render(<CartPageClient />)
    const user = userEvent.setup()

    const decrementButton = screen.getByLabelText('減少數量')
    await user.click(decrementButton)

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  test('應該移除商品', async () => {
    useCartStore.getState().addItem({
      productId: 'test-product',
      name: 'Test Product',
      price: 150,
      quantity: 1,
    })

    render(<CartPageClient />)
    const user = userEvent.setup()

    const removeButton = screen.getByLabelText('移除此商品')
    await user.click(removeButton)

    await waitFor(() => {
      expect(screen.getByText('您的購物車是空的')).toBeInTheDocument()
    })
  })
})
```

---

### 5.3 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/cart-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('購物車整合測試', () => {
  test('完整購物流程', async () => {
    // 1. 訪問商品詳情頁
    // 2. 選擇規格和數量
    // 3. 點擊加入購物車
    // 4. 驗證購物車徽章更新
    // 5. 開啟購物車抽屜
    // 6. 驗證商品顯示
    // 7. 點擊 Checkout
    // 8. 驗證導向購物車頁面
    // 9. 調整數量
    // 10. 驗證價格更新
    // 11. 移除商品
    // 12. 驗證空狀態
  })

  test('購物車持久化測試', async () => {
    // 1. 加入商品到購物車
    // 2. 重新整理頁面
    // 3. 驗證購物車內容保留
    // 4. 關閉並重新開啟瀏覽器
    // 5. 驗證購物車內容保留
  })

  test('多商品管理測試', async () => {
    // 1. 加入多個不同商品
    // 2. 加入相同商品不同規格
    // 3. 驗證購物車正確顯示
    // 4. 調整各商品數量
    // 5. 驗證價格正確計算
    // 6. 移除部分商品
    // 7. 驗證剩餘商品正確
  })

  test('響應式設計測試', async () => {
    // 1. 測試 Mobile viewport (390px)
    // 2. 驗證購物車抽屜顯示
    // 3. 測試 Desktop viewport (1440px)
    // 4. 驗證購物車頁面雙欄佈局
  })
})
```

---

### 5.4 測試覆蓋率目標

| 類型           | 目標覆蓋率 | 說明                       |
| -------------- | ---------- | -------------------------- |
| Cart Store     | 100%       | 所有狀態管理邏輯都測試     |
| CartPageClient | 90%+       | 核心業務邏輯高覆蓋率       |
| CartDrawer     | 90%+       | 互動邏輯和狀態管理高覆蓋率 |
| 整合測試       | 100%       | 所有關鍵流程全覆蓋         |

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

- ✅ 使用 `useMemo` 優化價格計算
- ✅ 使用 Next.js Image 優化圖片載入
- ✅ LocalStorage 操作異步化
- ✅ 避免不必要的重新渲染

**購物車操作效能**：

- 加入購物車：< 100ms
- 移除商品：< 50ms
- 更新數量：< 50ms
- 開啟抽屜：< 200ms

---

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 使用 Zustand 防止狀態污染
- ✅ LocalStorage 資料驗證（防止手動修改）
- ✅ 價格計算在前端和後端都驗證
- ✅ 防止 XSS（React 自動跳脫）

#### 資料驗證

```javascript
// 加入購物車前驗證
if (!item?.productId) {
  return // 無效商品 ID
}

// 價格驗證
const price =
  typeof item?.price === 'number'
    ? item.price
    : Number(String(item?.price ?? '').replace(/[^\d.]/g, '')) || 0

// 數量驗證
const quantity = Number(item?.quantity) > 0 ? Number(item.quantity) : 1
```

#### LocalStorage 安全

- 只儲存必要資訊（不儲存敏感資料）
- 定期清理過期資料（未來功能）
- 跨頁面同步（使用 storage event）

---

### 6.3 SEO

**已實作**：

- ✅ 頁面 title 和 description
- ✅ 語義化 HTML 標籤

**Metadata 設定**：

```javascript
export const metadata = {
  title: '購物車',
  description: '檢視您的購物車內容並準備結帳。',
}
```

**未來考慮**：

- [ ] 結構化資料（Schema.org Cart）
- [ ] Open Graph tags
- [ ] Canonical URL

---

### 6.4 無障礙性 (Accessibility)

#### 語義化 HTML

```jsx
<section className="root">
  <div className="wrapper">
    <h1>Shopping Cart</h1>
    <article>購物車商品項目</article>
    <aside>訂單摘要</aside>
  </div>
</section>
```

#### ARIA 標籤

```jsx
<button aria-label="增加數量" onClick={...}>+</button>
<button aria-label="減少數量" onClick={...}>−</button>
<button aria-label="移除此商品" onClick={...}>×</button>
<button aria-label="開啟購物車" onClick={...}>🛒</button>
```

#### 鍵盤導航

- Tab 順序：商品項目 → 數量控制 → 移除按鈕 → 結帳按鈕
- Enter 鍵操作所有按鈕
- ESC 鍵關閉購物車抽屜

---

### 6.5 響應式設計

| 螢幕尺寸 | 測試裝置             | 佈局方式                    | 商品顯示 |
| -------- | -------------------- | --------------------------- | -------- |
| Mobile   | iPhone 12/13 (390px) | 單欄垂直排列                | 簡化版   |
| Tablet   | iPad (768px)         | 單欄垂直排列                | 完整版   |
| Desktop  | 1440px               | 雙欄（商品列表 + 結帳摘要） | 完整版   |

**測試瀏覽器**：

- Chrome (最新版本)
- Safari (最新版本)
- Firefox (最新版本)
- Edge (最新版本)

---

## 7. 相依性與里程碑 (Dependencies & Milestones)

### 7.1 前置需求

| 項目         | 狀態      | 負責人       | 備註           |
| ------------ | --------- | ------------ | -------------- |
| 商品詳情頁面 | ✅ 已完成 | -            | 加入購物車功能 |
| 購物車頁面   | ✅ 已完成 | -            | 現有實作       |
| 購物車抽屜   | ✅ 已完成 | -            | 現有實作       |
| 購物車 Store | ✅ 已完成 | -            | 現有實作       |
| 結帳頁面     | ⏳ 待開發 | Backend Team | 多商品結帳支援 |
| 付款 API     | ⏳ 待開發 | Backend Team | 購物車結帳整合 |

### 7.2 開發里程碑

#### Phase 1: 文檔與規劃（已完成）

- [x] Spec 文檔完成
- [ ] 測試案例撰寫完成
- [ ] 與設計團隊確認 UI/UX

#### Phase 2: 功能完善（Week 1-2）

- [ ] 建立 `/checkout` 頁面
- [ ] 實作多商品結帳流程
- [ ] 收集使用者收件資訊
- [ ] 整合付款 API

#### Phase 3: 優化與測試（Week 3）

- [ ] 購物車持久化優化（過期處理、價格變動檢查）
- [ ] 效能優化（大量商品時的渲染優化）
- [ ] 單元測試完成
- [ ] 組件測試完成

#### Phase 4: 進階功能（Week 4+）

- [ ] 優惠券功能
- [ ] 購物車商品推薦
- [ ] 購物車分享功能
- [ ] 庫存即時檢查

#### Phase 5: 部署與監控（Week 5）

- [ ] 整合測試完成
- [ ] 跨瀏覽器測試
- [ ] 效能測試（Lighthouse）
- [ ] 無障礙性測試
- [ ] Code Review
- [ ] 部署至 Production

---

### 7.3 風險評估

| 風險                  | 影響等級 | 機率 | 應對策略                             |
| --------------------- | -------- | ---- | ------------------------------------ |
| 結帳頁面開發延遲      | 🔴 高    | 中   | 先完成購物車功能，結帳流程分階段開發 |
| LocalStorage 容量限制 | 🟡 中    | 低   | 監控儲存大小，提供清理機制           |
| 價格變動同步問題      | 🟡 中    | 中   | 結帳時重新驗證價格                   |
| 商品過期/下架處理     | 🟡 中    | 中   | 結帳時檢查商品狀態                   |

---

## 8. 改進建議與待解決問題

### 8.1 必須解決的問題（P0）

#### 1. 建立 `/checkout` 頁面

**問題**：

- 購物車頁面點擊「Proceed to Checkout」會導向不存在的 `/checkout` 頁面（404）
- 目前只支援單一商品立即購買，不支援購物車多商品結帳

**建議**：

```javascript
// src/app/checkout/page.jsx
// 1. 讀取購物車內容
// 2. 收集收件人資訊（姓名、電話、地址）
// 3. 確認訂單摘要
// 4. 導向付款頁面
```

**優先級**: 🔴 P0

---

#### 2. 多商品結帳流程

**問題**：

- 目前 `/api/checkout/intent` 只支援單一商品
- 需要支援購物車多商品結帳

**建議**：

```javascript
// 修改 API 請求格式
POST /api/checkout/intent
{
  "items": [
    {
      "productId": "product-1",
      "quantity": 2,
      "color": "藍色",
      "size": "M"
    },
    {
      "productId": "product-2",
      "quantity": 1,
      "color": "紅色",
      "size": "L"
    }
  ],
  "email": "user@example.com",
  "name": "王小明",
  "phone": "0912345678",
  "address": "台北市信義區..."
}
```

**優先級**: 🔴 P0

---

### 8.2 優化建議（P1）

#### 1. 購物車商品庫存檢查

**問題**：

- 使用者可能加入已售完的商品
- 數量可能超過庫存

**建議**：

- 加入購物車時檢查庫存
- 結帳時再次驗證庫存
- 顯示庫存狀態（有貨/缺貨/剩餘數量）

**優先級**: 🟡 P1

---

#### 2. 商品價格變動處理

**問題**：

- 商品加入購物車後，價格可能變動
- 使用者看到的價格可能與實際不符

**建議**：

- 結帳時重新取得商品價格
- 如果價格有變動，顯示提示訊息
- 更新購物車中的價格

```javascript
// 結帳時驗證價格
const validateCartPrices = async items => {
  const updatedItems = await Promise.all(
    items.map(async item => {
      const latestProduct = await getProduct(item.productId)
      if (latestProduct.price !== item.price) {
        return {
          ...item,
          price: latestProduct.price,
          priceChanged: true,
        }
      }
      return item
    }),
  )
  return updatedItems
}
```

**優先級**: 🟡 P1

---

#### 3. 購物車過期處理

**問題**：

- LocalStorage 中的購物車可能包含已下架的商品
- 沒有過期時間管理

**建議**：

- 加入購物車項目時間戳記
- 定期清理超過 X 天的商品（如 30 天）
- 頁面載入時檢查商品是否還存在

```javascript
// 購物車項目加入時間戳記
{
  id: "...",
  productId: "...",
  // ... 其他欄位
  addedAt: Date.now(), // 加入時間
}

// 清理過期商品
const cleanExpiredItems = () => {
  const now = Date.now()
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

  set(state => ({
    items: state.items.filter(
      item => now - item.addedAt < thirtyDaysMs
    ),
  }))
}
```

**優先級**: 🟡 P1

---

#### 4. 購物車數量上限

**問題**：

- 目前沒有數量上限
- 使用者可能加入過多商品

**建議**：

- 設定單一商品最大數量（如 10 個）
- 設定購物車最大項目數（如 20 項）
- 顯示限制提示訊息

```javascript
// 商品詳情頁
const MAX_QUANTITY_PER_ITEM = 10

// 購物車
const MAX_CART_ITEMS = 20

const addItem = item => {
  set(state => {
    // 檢查購物車項目數
    if (state.items.length >= MAX_CART_ITEMS) {
      alert('購物車已滿，請先移除部分商品')
      return state
    }

    // 檢查單一商品數量
    const existingItem = state.items.find(i => i.id === item.id)
    if (existingItem && existingItem.quantity >= MAX_QUANTITY_PER_ITEM) {
      alert(`單一商品最多只能購買 ${MAX_QUANTITY_PER_ITEM} 個`)
      return state
    }

    // ... 原有邏輯
  })
}
```

**優先級**: 🟡 P1

---

#### 5. 購物車同步優化

**問題**：

- 多個分頁同時修改購物車可能不同步

**建議**：

- 監聽 `storage` 事件
- 跨分頁自動同步購物車狀態

```javascript
// 監聽 storage 事件
useEffect(() => {
  const handleStorageChange = e => {
    if (e.key === 'liwei-cart') {
      // 重新載入購物車狀態
      window.location.reload()
    }
  }

  window.addEventListener('storage', handleStorageChange)
  return () => window.removeEventListener('storage', handleStorageChange)
}, [])
```

**優先級**: 🟢 P2

---

### 8.3 未來功能建議（P2-P3）

#### 1. 優惠券功能（P2）

- 使用者輸入優惠碼
- 系統驗證優惠碼
- 計算折扣金額
- 顯示折扣後價格

#### 2. 購物車商品推薦（P2）

- 根據購物車內容推薦相關商品
- 「購買此商品的人也購買了...」
- 顯示在購物車頁面側邊欄

#### 3. 購物車分享功能（P3）

- 生成購物車分享連結
- 其他人可透過連結查看購物車內容
- 複製到自己的購物車

#### 4. 儲存多個購物車（P3）

- 使用者可建立多個購物車
- 為不同場合準備不同購物車
- 切換購物車

#### 5. 購物車提醒（P3）

- 購物車有商品但未結帳
- N 天後發送提醒郵件
- 提供優惠碼促進轉換

---

## 9. 問題討論

### Q1: 結帳流程設計

**問題**：購物車結帳流程應該如何設計？

**選項**：

**A. 一頁式結帳**

- 所有資訊在同一頁面填寫
- 優點：流程簡單，轉換率較高
- 缺點：頁面較長，可能讓使用者感到壓力

**B. 多步驟結帳**

- Step 1: 確認購物車
- Step 2: 填寫收件資訊
- Step 3: 選擇付款方式
- Step 4: 確認訂單
- 優點：每一步驟清楚，使用者不會感到overwhelmed
- 缺點：流程較長，可能增加流失率

**C. 簡化兩步驟**

- Step 1: 填寫收件資訊
- Step 2: 確認訂單並付款
- 優點：平衡簡單與清晰
- 缺點：需要設計良好的 UI/UX

**Paper 的建議**：你偏好哪種結帳流程？還是有其他想法？

---

### Q2: 收件資訊管理

**問題**：使用者的收件資訊應該如何管理？

**選項**：

**A. 使用登入使用者資料**

- 從會員資料自動帶入
- 使用者可修改
- 需要登入才能結帳

**B. 允許訪客結帳**

- 不需登入也能結帳
- 每次手動填寫資訊
- 結帳後可選擇註冊會員

**C. 混合模式**

- 登入使用者：自動帶入資料
- 訪客：手動填寫資訊
- 提供「記住我的資訊」選項（LocalStorage）

**Paper 的建議**：考慮到專案是賽事商品兌換，使用者體驗應該優先，你覺得應該強制登入還是允許訪客結帳？

---

### Q3: 購物車數量顯示

**問題**：Header 購物車徽章應該顯示什麼數字？

**選項**：

**A. 商品項目數**

- `items.length`
- 範例：2 個不同商品 = 顯示 2
- 優點：更簡潔
- 缺點：看不出實際購買數量

**B. 商品總數量**

- `items.reduce((sum, item) => sum + item.quantity, 0)`
- 範例：2 個商品，各 2 件 = 顯示 4
- 優點：更準確反映購買數量
- 缺點：數字可能較大

**目前實作**：項目數（`items.length`）

**Paper 的建議**：你覺得哪種顯示方式更好？需要調整嗎？

---

### Q4: 購物車持久化策略

**問題**：購物車應該保存多久？

**選項**：

**A. 永久保存**

- 不設定過期時間
- 優點：使用者隨時回來都能看到購物車
- 缺點：可能包含已下架或過期商品

**B. 設定過期時間**

- 如 30 天後清空
- 優點：避免過期商品累積
- 缺點：使用者可能期待購物車永久保存

**C. 登入使用者永久，訪客有期限**

- 登入使用者：同步到後端，永久保存
- 訪客：LocalStorage，30 天過期
- 優點：平衡使用者體驗和資料管理
- 缺點：實作較複雜

**目前實作**：永久保存（無過期時間）

**Paper 的建議**：考慮到專案性質，你覺得應該設定過期時間嗎？如果設定，多久合適？

---

### Q5: 空購物車體驗

**問題**：空購物車頁面應該如何設計以提高轉換率？

**選項**：

**A. 簡單提示 + 按鈕**

- 目前實作：「Your Shopping Cart is empty.」+ 發現好物按鈕
- 優點：簡潔直接
- 缺點：可能不夠吸引人

**B. 推薦商品**

- 顯示熱門商品或新品
- 使用者可直接加入購物車
- 優點：增加轉換機會
- 缺點：需要商品推薦邏輯

**C. 個人化推薦**

- 根據瀏覽歷史推薦
- 顯示「你可能喜歡的商品」
- 優點：更精準的推薦
- 缺點：需要追蹤使用者行為

**Paper 的建議**：你希望空購物車頁面有更豐富的內容嗎？還是維持簡潔的設計？

---

### Q6: 運費計算策略

**問題**：未來如果要加入運費，應該如何設計？

**選項**：

**A. 固定運費**

- 所有訂單統一運費（如 NT$ 60）
- 滿額免運費（如滿 NT$ 1000 免運）
- 優點：簡單明確
- 缺點：不夠彈性

**B. 依地區計算**

- 台北/新北：NT$ 60
- 其他地區：NT$ 80
- 離島：NT$ 150
- 優點：更合理的運費
- 缺點：需要地址資料

**C. 依重量計算**

- 根據商品總重量計算
- 優點：最公平
- 缺點：實作複雜，使用者難以預測

**目前實作**：免運費（`shippingFee = 0`）

**Paper 的建議**：未來如果要加入運費機制，你偏好哪種方式？還是暫時維持免運？

---

## 10. 參考資源

- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [LocalStorage Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [E-commerce UX Best Practices](https://baymard.com/blog/ecommerce-cart-abandonment)
- [Shopping Cart Patterns](https://www.smashingmagazine.com/2018/01/shopping-cart-ux-design/)

---

## 11. 附錄

### 附錄 A: 購物車狀態管理最佳實踐

```javascript
// ✅ 推薦：使用 useMemo 優化計算
const subtotal = useMemo(
  () => items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items],
)

// ❌ 避免：每次渲染都重新計算
const subtotal = items.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
)
```

### 附錄 B: LocalStorage 容量管理

```javascript
// 檢查 LocalStorage 使用量
const getLocalStorageSize = () => {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length
    }
  }
  return (total / 1024).toFixed(2) + ' KB'
}

// 清理 LocalStorage
const cleanupLocalStorage = () => {
  // 移除過期資料
  // 壓縮資料
  // 通知使用者
}
```

### 附錄 C: 購物車 URL 參數分享（未來功能）

```javascript
// 生成分享連結
const generateShareLink = items => {
  const cartData = items.map(item => ({
    p: item.productId,
    q: item.quantity,
    c: item.color,
    s: item.size,
  }))

  const encoded = btoa(JSON.stringify(cartData))
  return `${window.location.origin}/cart?share=${encoded}`
}

// 解析分享連結
const parseShareLink = shareParam => {
  try {
    const decoded = atob(shareParam)
    const cartData = JSON.parse(decoded)
    return cartData.map(item => ({
      productId: item.p,
      quantity: item.q,
      color: item.c,
      size: item.s,
    }))
  } catch {
    return []
  }
}
```

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容     | 負責人      |
| ---- | ---------- | ------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立 | Paper Hsiao |

---

**相關文檔**：

- [商品列表頁面規格書](./products-page-spec.md)
- [商品詳情頁面規格書](./product-detail-page-spec.md)
- [結帳頁面規格書](./checkout-page-spec.md)（待建立）
- [登入頁面規格書](./login-page-spec.md)

---

**文件結束**
