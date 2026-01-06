# 結帳頁面功能規格書

# Checkout Page Specification

**版本 (Version)**: 1.0  
**建立日期 (Created Date)**: 2025-10-19  
**最後更新 (Last Updated)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: In Development

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者在購物車確認商品後，填寫訂購人資訊和收件人資訊的結帳頁面，支援 7-11 店到店配送方式。

### 1.2 使用者故事 (User Stories)

**US-1: 填寫訂購人資訊**

> 作為一個**使用者**，我想要填寫訂購人的基本資訊（姓名、信箱、電話），以便網站記錄此筆訂單的訂購者。

**US-2: 填寫收件人資訊**

> 作為一個**使用者**，我想要填寫收件人資訊，因為收件人可能與訂購人不同（送禮、代購等情境）。

**US-3: 選擇 7-11 店到店門市**

> 作為一個**使用者**，我想要選擇 7-11 門市作為收件地點，以便我方便取貨。

**US-4: 快速複製訂購人資訊**

> 作為一個**使用者**，當訂購人和收件人是同一人時，我想要一鍵複製資訊，避免重複輸入。

**US-5: 同意服務條款**

> 作為一個**使用者**，我需要同意服務條款和隱私權政策才能繼續結帳，確保我了解網站的使用規範。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ 訂購人資訊表單（Custom Info）
  - 全名
  - 信箱
  - 聯絡電話
  - 性別（選填）
- ✅ 收件人資訊表單（Delivery Detail）
  - 收件人姓名
  - 收件人電話
  - 7-11 店到店門市選擇
  - 配送備註（選填）
- ✅ 一鍵複製訂購人資訊到收件人（Checkbox）
- ✅ 同意服務條款 Checkbox（必選）
- ✅ 訂單摘要顯示（商品、小計、運費、總計）
- ✅ 表單驗證（React Hook Form + Zod）
- ✅ 已登入使用者自動帶入資料
- ✅ 資料持久化（Zustand + LocalStorage）
- ✅ 結帳進度指示器（Step 2）
- ✅ 響應式設計

#### 不包含功能 (Out of Scope)

- ❌ 宅配到府（目前只支援 7-11 店到店）
- ❌ 其他超商（全家、萊爾富等）
- ❌ 優惠券功能（未來版本）
- ❌ 多地址管理（未來版本）
- ❌ 發票資訊填寫（未來版本）

### 1.4 與現有系統的關係

**購物車整合**

- 前置頁面：`/cart`（購物車頁面）
- 讀取購物車資料：`useCartStore`
- 如果購物車為空，導回購物車頁面

**訂單確認整合**

- 後續頁面：`/confirm`（訂單確認頁面）
- 傳遞結帳資料：`useCheckoutStore`

**會員資料整合**

- 讀取會員資料：`useUserContext`
- 已登入使用者自動帶入資料作為預設值

**7-11 店到店整合**

- 使用 7-11 提供的門市選擇 API
- 詳細串接流程待後續提供

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑        | 檔案位置                               | 說明             |
| -------------- | ----------- | -------------------------------------- | ---------------- |
| 結帳頁面       | `/checkout` | `src/app/checkout/page.jsx`            | Server Component |
| 結帳客戶端組件 | -           | `src/app/checkout/checkout-client.jsx` | Client Component |

### 2.2 檔案結構

```
src/
├── app/
│   └── checkout/
│       ├── page.jsx                       # 結帳頁面入口（Server Component）
│       └── checkout-client.jsx            # 結帳客戶端組件（已存在，需重構）
├── sections/
│   └── checkout/
│       ├── views/
│       │   ├── checkout-view.jsx          # 結帳視圖主組件
│       │   └── index.js                   # 導出
│       ├── components/
│       │   ├── customer-info-form.jsx     # 訂購人資訊表單
│       │   ├── delivery-info-form.jsx     # 收件人資訊表單
│       │   ├── store-selector.jsx         # 7-11 門市選擇組件
│       │   ├── order-summary.jsx          # 訂單摘要組件
│       │   └── terms-checkbox.jsx         # 條款同意 Checkbox
│       ├── hook/
│       │   ├── use-checkout-form.js       # 結帳表單邏輯
│       │   └── use-store-selector.js      # 門市選擇邏輯
│       └── schema/
│           └── checkout-schema.js         # 結帳表單驗證
├── store/
│   └── checkout-context.js                # 結帳狀態管理（新增）
├── components/
│   └── common/
│       └── checkout-progress/             # 進度指示器（已存在）
└── routers/
    └── path.js                            # 路由常數（已存在）
```

### 2.3 狀態管理

#### 2.3.1 Checkout Store (新增)

```javascript
// src/store/checkout-context.js
import { create } from 'zustand'

const createInitialCustomerInfo = () => ({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
})

const createInitialDeliveryInfo = () => ({
  sameAsCustomer: false,
  deliveryName: '',
  recipientPhone: '',
  deliveryNote: '',
})

const useCheckoutStore = create((set, get) => ({
  customerInfo: createInitialCustomerInfo(),
  deliveryInfo: createInitialDeliveryInfo(),
  agreeToTerms: false,

  setCustomerInfo: data =>
    set(state => ({
      customerInfo: { ...state.customerInfo, ...data },
    })),

  setDeliveryInfo: data =>
    set(state => ({
      deliveryInfo: { ...state.deliveryInfo, ...data },
    })),

  setAgreeToTerms: agreeToTerms =>
    set(() => ({
      agreeToTerms,
    })),

  copyCustomerToDelivery: () => {
    const { customerInfo } = get()
    set(state => ({
      deliveryInfo: {
        ...state.deliveryInfo,
        deliveryName: customerInfo.fullName,
        recipientPhone: customerInfo.phone,
      },
    }))
  },

  clear: () =>
    set(() => ({
      customerInfo: createInitialCustomerInfo(),
      deliveryInfo: createInitialDeliveryInfo(),
      agreeToTerms: false,
    })),
}))

export default useCheckoutStore
```

#### 2.3.2 整合現有 Store

**讀取購物車資料**：

```javascript
import useCartStore from '@/store/cart-context'

const items = useCartStore(state => state.items)
const subtotal = useMemo(
  () => items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items],
)
```

**讀取會員資料**：

```javascript
import useUserContext from '@/store/user-context'

const user = useUserContext(state => state.user)
const isLogin = user.isLogin

// 已登入使用者自動帶入資料
useEffect(() => {
  if (isLogin && user.name) {
    setValue('fullName', user.name)
    setValue('phone', user.phone || '')
    // email 從哪裡來？user-context 沒有 email 欄位
  }
}, [isLogin, user, setValue])
```

**注意**：`user-context` 目前沒有 `email` 欄位，可能需要：

- 後續新增 `email` 到 user store
- 或從 API 額外取得

### 2.4 資料結構

#### 2.4.1 Checkout Form Data

```typescript
interface CheckoutFormData {
  // 訂購人資訊 (Custom Info)
  fullName: string // 全名（必填）
  email: string // 信箱（必填）
  phone: string // 聯絡電話（必填）
  gender?: 'male' | 'female' | 'prefer-not-to-say' // 性別（選填）

  // 收件人資訊 (Delivery Detail)
  sameAsCustomer: boolean // 同訂購人資訊（Checkbox 狀態）
  deliveryName: string // 收件人姓名（必填）
  recipientPhone: string // 收件人電話（必填）

  // 7-11 店到店
  storeId: string // 門市代碼（必填）
  storeName: string // 門市名稱（自動帶入）
  storeAddress: string // 門市地址（自動帶入）
  storeTel?: string // 門市電話（自動帶入，選填）

  // 配送備註
  deliveryNote?: string // 配送備註（選填）

  // 條款同意
  agreeToTerms: boolean // 同意條款（必填）
}
```

#### 2.4.2 7-11 Store Data

```typescript
interface StoreData {
  storeId: string // 門市代碼（例如：123456）
  storeName: string // 門市名稱（例如：信義門市）
  storeAddress: string // 門市地址
  storeTel?: string // 門市電話（選填）
}
```

#### 2.4.3 Order Summary Data

```typescript
interface OrderSummary {
  items: CartItem[] // 購物車商品
  subtotal: number // 商品小計
  shippingFee: number // 運費（目前固定 60 元）
  discount: number // 折扣（未來功能，目前為 0）
  total: number // 總計
}
```

### 2.5 表單驗證規則

```javascript
// src/sections/checkout/schema/checkout-schema.js
import { z } from 'zod'

export const checkoutSchema = z
  .object({
    // 訂購人資訊 (Custom Info)
    fullName: z
      .string()
      .min(1, '請輸入全名')
      .min(2, '姓名至少需要 2 個字元')
      .max(50, '姓名最多 50 個字元'),

    email: z.string().min(1, '請輸入信箱').email('請輸入有效的 Email 格式'),

    phone: z
      .string()
      .min(1, '請輸入聯絡電話')
      .regex(/^09\d{8}$/, '請輸入有效的手機號碼格式（09xxxxxxxx）'),

    gender: z
      .enum(['male', 'female', 'prefer-not-to-say', ''])
      .optional()
      .default(''),

    // 收件人資訊 (Delivery Detail)
    sameAsCustomer: z.boolean().default(false),

    deliveryName: z
      .string()
      .min(1, '請輸入收件人姓名')
      .min(2, '姓名至少需要 2 個字元')
      .max(50, '姓名最多 50 個字元'),

    recipientPhone: z
      .string()
      .min(1, '請輸入收件人電話')
      .regex(/^09\d{8}$/, '請輸入有效的手機號碼格式（09xxxxxxxx）'),

    // 7-11 店到店
    storeId: z.string().min(1, '請選擇 7-11 門市'),
    storeName: z.string(),
    storeAddress: z.string(),
    storeTel: z.string().optional(),

    // 配送備註
    deliveryNote: z.string().max(200, '備註最多 200 個字元').optional(),

    // 條款同意
    agreeToTerms: z.boolean().refine(val => val === true, {
      message: '請同意服務條款與隱私權政策',
    }),
  })
  .refine(
    data => {
      // 如果勾選「同訂購人資訊」，自動驗證通過
      // 實際複製邏輯在 onChange 中處理
      return true
    },
    {
      message: '',
    },
  )

export const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  sameAsCustomer: false,
  deliveryName: '',
  recipientPhone: '',
  storeId: '',
  storeName: '',
  storeAddress: '',
  storeTel: '',
  deliveryNote: '',
  agreeToTerms: false,
}
```

### 2.6 API 端點（待後端開發）

#### 2.6.1 提交訂單 API

| 端點                | 方法 | 說明     | 回傳格式 |
| ------------------- | ---- | -------- | -------- |
| `/api/order/create` | POST | 建立訂單 | 訂單資料 |

**Request Body**:

```json
{
  "customerInfo": {
    "fullName": "王小明",
    "email": "test@example.com",
    "phone": "0912345678",
    "gender": "male"
  },
  "deliveryInfo": {
    "deliveryName": "李小華",
    "recipientPhone": "0987654321",
    "storeId": "123456",
    "storeName": "信義門市",
    "storeAddress": "台北市信義區信義路五段7號",
    "storeTel": "02-2345-6789",
    "deliveryNote": "請於下午配送"
  },
  "items": [
    {
      "productId": "product-1",
      "name": "Volleyball Socks Classic+ SE",
      "price": 150,
      "quantity": 2,
      "color": "2025藍",
      "size": "M (20-24.5cm)"
    }
  ],
  "subtotal": 780,
  "shippingFee": 60,
  "total": 840
}
```

**Response (成功)**:

```json
{
  "success": true,
  "data": {
    "orderId": "ORDER-20251019-001",
    "status": "pending_payment",
    "total": 840,
    "paymentUrl": "/checkout/pay?orderId=ORDER-20251019-001"
  }
}
```

**Response (失敗)**:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_STORE",
    "message": "選擇的門市無效或已關閉"
  }
}
```

#### 2.6.2 7-11 門市選擇 API

**注意**：7-11 門市選擇 API 的詳細串接流程待後續提供。

預期整合方式：

- 開啟 7-11 官方提供的門市選擇介面（iframe 或新視窗）
- 使用者選擇門市後，回傳門市資訊
- 前端接收並儲存門市資訊

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框、粗體字）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 卡片式設計
- ✅ 響應式設計（手機優先）
- ✅ 清晰的視覺層次

### 3.2 結帳頁面 UI

#### 3.2.1 桌面版佈局（左右分欄）

```
┌──────────────────────────────────────────────────────────────┐
│ CheckoutProgress (currentStep={2})                           │
├──────────────────────────────────────────────────────────────┤
│ 結帳                                                          │
│ 請填寫收件資訊以完成訂單                                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌────────────────────────────┐  ┌────────────────────────┐ │
│ │ 訂購人資訊                  │  │ 訂單摘要               │ │
│ ├────────────────────────────┤  ├────────────────────────┤ │
│ │ 全名 *                     │  │ [圖] 商品 A            │ │
│ │ ┌────────────────────────┐ │  │      2025藍 / M        │ │
│ │ │ 王小明                  │ │  │      2 × NT$ 150      │ │
│ │ └────────────────────────┘ │  │                        │ │
│ │                            │  │ [圖] 商品 B            │ │
│ │ 信箱 *                     │  │      午夜藍 / S        │ │
│ │ ┌────────────────────────┐ │  │      1 × NT$ 480      │ │
│ │ │ test@example.com       │ │  │────────────────────────│ │
│ │ └────────────────────────┘ │  │ 商品小計   NT$ 780     │ │
│ │                            │  │ 運費 (7-11) NT$ 60     │ │
│ │ 聯絡電話 *                 │  │────────────────────────│ │
│ │ ┌────────────────────────┐ │  │ 總計       NT$ 840     │ │
│ │ │ 0912-345-678           │ │  └────────────────────────┘ │
│ │ └────────────────────────┘ │                            │
│ │                            │                            │
│ │ 性別                       │                            │
│ │ ┌────────────────────────┐ │                            │
│ │ │ 請選擇 ▼               │ │                            │
│ │ └────────────────────────┘ │                            │
│ └────────────────────────────┘                            │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 收件人資訊                                                │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ ☐ 同訂購人資訊                                            │ │
│ │                                                           │ │
│ │ 收件人姓名 *                                              │ │
│ │ ┌───────────────────────────────────────────────────────┐ │ │
│ │ │ 李小華                                                 │ │ │
│ │ └───────────────────────────────────────────────────────┘ │ │
│ │                                                           │ │
│ │ 收件人電話 *                                              │ │
│ │ ┌───────────────────────────────────────────────────────┐ │ │
│ │ │ 0987-654-321                                          │ │ │
│ │ └───────────────────────────────────────────────────────┘ │ │
│ │                                                           │ │
│ │ 配送門市 * (7-11 店到店)                                  │ │
│ │ ┌───────────────────────────────────────────────────────┐ │ │
│ │ │ [🏪 選擇 7-11 門市]                                    │ │ │
│ │ └───────────────────────────────────────────────────────┘ │ │
│ │                                                           │ │
│ │ ✓ 已選擇：信義門市                                        │ │
│ │   台北市信義區信義路五段7號                                │ │
│ │   門市代碼：123456                                        │ │
│ │   [變更門市]                                              │ │
│ │                                                           │ │
│ │ 配送備註（選填）                                          │ │
│ │ ┌───────────────────────────────────────────────────────┐ │ │
│ │ │ 請於下午配送...                                        │ │ │
│ │ └───────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ☑ 我同意網站的「服務條款」與「隱私權政策」*               │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                              │
│ [< 返回購物車]                              [確認訂單 >]     │
└──────────────────────────────────────────────────────────────┘
```

#### 3.2.2 手機版佈局（垂直排列）

```
┌─────────────────────────────────────┐
│ CheckoutProgress (Step 2)           │
├─────────────────────────────────────┤
│ 結帳                                 │
│ 請填寫收件資訊以完成訂單              │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 訂購人資訊                       │ │
│ │ [表單欄位...]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 收件人資訊                       │ │
│ │ [表單欄位...]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 訂單摘要                         │ │
│ │ [商品列表...]                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ☑ 同意條款                       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [返回購物車]                        │
│ [確認訂單]                          │
└─────────────────────────────────────┘
```

### 3.3 組件規格

#### 3.3.1 訂購人資訊表單 (CustomerInfoForm)

**功能**：收集訂購此單的用戶基本資訊

**欄位**：

1. **全名**（必填）
   - Input type: text
   - Placeholder: "請輸入全名"
   - 驗證：2-50 字元

2. **信箱**（必填）
   - Input type: email
   - Placeholder: "example@email.com"
   - 驗證：Email 格式

3. **聯絡電話**（必填）
   - Input type: tel
   - Placeholder: "0912-345-678"
   - 驗證：09 開頭，共 10 碼

4. **性別**（選填）
   - Select
   - 選項：
     - "請選擇"（預設）
     - "男"（male）
     - "女"（female）
     - "不願透露"（prefer-not-to-say）

**樣式**：

```jsx
<div className="rounded-3xl border bg-white p-6 shadow-sm">
  <h2 className="font-anton text-xl text-blue-primary mb-6">訂購人資訊</h2>
  {/* 表單欄位 */}
</div>
```

#### 3.3.2 收件人資訊表單 (DeliveryInfoForm)

**功能**：收集送達時的收件人資訊和配送方式

**欄位**：

1. **同訂購人資訊**（Checkbox）
   - 勾選後自動複製訂購人的姓名和電話
   - 取消勾選後清空欄位

2. **收件人姓名**（必填）
   - Input type: text
   - Placeholder: "請輸入收件人姓名"
   - 驗證：2-50 字元

3. **收件人電話**（必填）
   - Input type: tel
   - Placeholder: "0912-345-678"
   - 驗證：09 開頭，共 10 碼

4. **配送門市**（必填）
   - 7-11 店到店門市選擇
   - 詳見 3.3.3

5. **配送備註**（選填）
   - Textarea
   - Placeholder: "例如：請於下午配送"
   - 驗證：最多 200 字元

**樣式**：

```jsx
<div className="rounded-3xl border bg-white p-6 shadow-sm">
  <h2 className="font-anton text-xl text-blue-primary mb-6">收件人資訊</h2>
  {/* Checkbox */}
  {/* 表單欄位 */}
</div>
```

#### 3.3.3 7-11 門市選擇組件 (StoreSelector)

**功能**：讓使用者選擇 7-11 門市

**狀態 1：未選擇門市**

```jsx
<div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
  <MapPin className="mx-auto mb-2 h-8 w-8 text-slate-400" />
  <p className="text-sm text-slate-600 mb-4">請選擇取貨門市</p>
  <Button onClick={handleOpenStoreSelector}>
    <Store className="mr-2 h-4 w-4" />
    選擇 7-11 門市
  </Button>
</div>
```

**狀態 2：已選擇門市**

```jsx
<div className="border border-green-500 rounded-lg p-4 bg-green-50">
  <div className="flex items-start justify-between">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Check className="h-5 w-5 text-green-600" />
        <p className="font-semibold text-blue-primary">信義門市</p>
      </div>
      <p className="text-sm text-slate-600">台北市信義區信義路五段7號</p>
      <p className="text-xs text-slate-500 mt-1">門市代碼：123456</p>
    </div>
    <Button variant="ghost" size="sm" onClick={handleOpenStoreSelector}>
      變更
    </Button>
  </div>
</div>
```

**門市選擇邏輯**：

```javascript
const handleOpenStoreSelector = () => {
  // 1. 開啟 7-11 門市選擇介面（iframe 或新視窗）
  // 2. 等待使用者選擇門市
  // 3. 接收門市資訊
  // 4. 更新表單資料
  // 詳細串接流程待後續提供
}
```

#### 3.3.4 訂單摘要組件 (OrderSummary)

**功能**：顯示購物車商品和價格摘要

**桌面版**：右側固定欄位，350px 寬度

**手機版**：全寬顯示

**內容**：

```jsx
<aside className="rounded-3xl border bg-white p-6 shadow-sm lg:sticky lg:top-4">
  <h2 className="font-anton text-xl text-blue-primary mb-6">訂單摘要</h2>

  {/* 商品列表（簡化版） */}
  <div className="space-y-4 mb-4">
    {items.map(item => (
      <div key={item.id} className="flex items-center gap-3">
        <Image
          src={item.image}
          alt={item.name}
          width={60}
          height={60}
          className="rounded-lg"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-primary">{item.name}</p>
          <p className="text-xs text-slate-600">
            {item.color} / {item.size}
          </p>
          <p className="text-xs text-slate-600">
            {item.quantity} × NT$ {item.price}
          </p>
        </div>
        <p className="font-semibold text-blue-primary">
          NT$ {item.price * item.quantity}
        </p>
      </div>
    ))}
  </div>

  {/* 價格摘要 */}
  <div className="border-t pt-4 space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-slate-600">商品小計</span>
      <span className="font-semibold">NT$ {subtotal}</span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-slate-600">運費 (7-11 店到店)</span>
      <span className="font-semibold">NT$ {shippingFee}</span>
    </div>

    <div className="flex justify-between text-lg font-bold text-blue-primary border-t pt-2 mt-2">
      <span>總計</span>
      <span>NT$ {total}</span>
    </div>
  </div>
</aside>
```

#### 3.3.5 條款同意 Checkbox (TermsCheckbox)

**功能**：使用者必須同意服務條款和隱私權政策才能繼續

```jsx
<div className="rounded-3xl border bg-slate-50 p-4">
  <label className="flex items-start gap-3 cursor-pointer">
    <Checkbox name="agreeToTerms" className="mt-1" required />
    <span className="text-sm text-slate-700 leading-relaxed">
      我同意網站的
      <Link
        href="/terms"
        target="_blank"
        className="text-blue-primary underline hover:text-blue-600 mx-1"
      >
        服務條款
      </Link>
      與
      <Link
        href="/privacy"
        target="_blank"
        className="text-blue-primary underline hover:text-blue-600 mx-1"
      >
        隱私權政策
      </Link>
      <span className="text-red-500">*</span>
    </span>
  </label>
</div>
```

**驗證**：

- 必須勾選才能提交表單
- 錯誤訊息：「請同意服務條款與隱私權政策」

**連結行為**：

- 在新視窗開啟（`target="_blank"`）
- 不會導致當前頁面跳轉和資料遺失

### 3.4 錯誤訊息顯示

**位置**：欄位下方，紅色文字  
**樣式**：`text-red-600 text-sm mt-1`

**錯誤訊息對照表**：

| 欄位       | 錯誤情境 | 訊息內容                                 |
| ---------- | -------- | ---------------------------------------- |
| 全名       | 必填未填 | "請輸入全名"                             |
| 全名       | 長度不足 | "姓名至少需要 2 個字元"                  |
| 全名       | 長度過長 | "姓名最多 50 個字元"                     |
| 信箱       | 必填未填 | "請輸入信箱"                             |
| 信箱       | 格式錯誤 | "請輸入有效的 Email 格式"                |
| 聯絡電話   | 必填未填 | "請輸入聯絡電話"                         |
| 聯絡電話   | 格式錯誤 | "請輸入有效的手機號碼格式（09xxxxxxxx）" |
| 收件人姓名 | 必填未填 | "請輸入收件人姓名"                       |
| 收件人電話 | 必填未填 | "請輸入收件人電話"                       |
| 收件人電話 | 格式錯誤 | "請輸入有效的手機號碼格式（09xxxxxxxx）" |
| 配送門市   | 未選擇   | "請選擇 7-11 門市"                       |
| 配送備註   | 長度過長 | "備註最多 200 個字元"                    |
| 同意條款   | 未勾選   | "請同意服務條款與隱私權政策"             |

### 3.5 Loading 狀態

**按鈕 Loading**：

```jsx
<Button type="submit" disabled={isSubmitting} className="w-full lg:w-auto">
  {isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      處理中...
    </>
  ) : (
    '確認訂單'
  )}
</Button>
```

### 3.6 響應式設計

| 螢幕尺寸 | 寬度     | 佈局方式                     | 訂單摘要位置   |
| -------- | -------- | ---------------------------- | -------------- |
| Mobile   | < 1024px | 單欄垂直排列，訂單摘要在下方 | 全寬           |
| Desktop  | ≥ 1024px | 左右分欄（7:3 或 2:1）       | 右側固定 350px |

**Tailwind 類別**：

```jsx
// 主容器
<div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
  {/* 左側表單 */}
  <div className="space-y-6">{/* 表單區塊 */}</div>

  {/* 右側訂單摘要 */}
  <aside className="lg:sticky lg:top-4 lg:h-fit">{/* 訂單摘要 */}</aside>
</div>
```

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 填寫訂購人資訊

**優先級**: 🔴 P0 (Critical)

**前置條件**：

- 購物車有商品（`items.length > 0`）
- 使用者進入結帳頁面 `/checkout`

**操作流程**：

1. 頁面載入時檢查購物車狀態
2. 如果購物車為空，自動導回 `/cart` 並顯示提示
3. 顯示結帳進度指示器（Step 2）
4. 如果使用者已登入：
   - 自動帶入會員姓名（`user.name`）
   - 自動帶入會員電話（`user.phone`，如有）
   - 允許使用者修改（不更新會員資料）
5. 使用者填寫訂購人資訊：
   - 全名（必填）
   - 信箱（必填）
   - 聯絡電話（必填）
   - 性別（選填）
6. 即時驗證（onBlur）

**例外處理**：

- 購物車為空 → 導回 `/cart`，顯示 toast：「購物車是空的，請先加入商品」
- 驗證失敗 → 顯示欄位錯誤訊息

**成功條件**：

- ✅ 購物車有商品時正常顯示表單
- ✅ 已登入使用者自動帶入資料
- ✅ 欄位驗證正確運作
- ✅ 錯誤訊息清晰明確

---

### FR-2: 填寫收件人資訊

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者查看收件人資訊區塊
2. 如果收件人與訂購人相同：
   - 勾選「同訂購人資訊」Checkbox
   - 系統自動複製訂購人的姓名和電話到收件人欄位
3. 如果收件人與訂購人不同：
   - 手動填寫收件人姓名和電話
4. 即時驗證（onBlur）

**Checkbox 行為**：

```javascript
// 勾選時
if (checked) {
  setValue('deliveryName', getValues('fullName'))
  setValue('recipientPhone', getValues('phone'))
}

// 取消勾選時
if (!checked) {
  // 保留已填寫的資料，不清空
  // 或根據 UX 需求決定是否清空
}
```

**例外處理**：

- 訂購人資訊未填寫完整 → 勾選 Checkbox 時顯示提示：「請先完整填寫訂購人資訊」
- 驗證失敗 → 顯示欄位錯誤訊息

**成功條件**：

- ✅ Checkbox 正確複製資料
- ✅ 欄位驗證正確運作
- ✅ 使用者可以手動修改複製的資料

---

### FR-3: 選擇 7-11 店到店門市

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者點擊「選擇 7-11 門市」按鈕
2. 系統開啟 7-11 官方門市選擇介面
   - **詳細串接流程待後續提供**
3. 使用者在 7-11 介面中選擇門市
4. 系統接收門市資訊（門市代碼、名稱、地址、電話）
5. 更新表單資料（`storeId`, `storeName`, `storeAddress`, `storeTel`）
6. 顯示已選擇的門市資訊
7. 使用者可以點擊「變更」按鈕重新選擇

**門市資訊顯示**：

```javascript
// 顯示格式
{
  storeId: "123456",
  storeName: "信義門市",
  storeAddress: "台北市信義區信義路五段7號",
  storeTel: "02-2345-6789"
}
```

**例外處理**：

- 未選擇門市就提交表單 → 顯示錯誤：「請選擇 7-11 門市」
- 門市選擇介面開啟失敗 → 顯示錯誤訊息，允許重試
- 門市無效或已關閉 → 後端驗證時回傳錯誤，顯示提示並要求重新選擇

**成功條件**：

- ✅ 成功開啟門市選擇介面
- ✅ 正確接收並顯示門市資訊
- ✅ 可以變更門市
- ✅ 門市資訊正確傳遞到後端

**待實作**：

- 7-11 門市選擇 API 串接流程
- 門市資訊格式確認
- 錯誤處理邏輯

---

### FR-4: 填寫配送備註

**優先級**: 🟢 P2 (Medium)

**操作流程**：

1. 使用者可選填配送備註（Textarea）
2. 最多 200 個字元
3. 例如：「請於下午配送」、「請勿在上午配送」等

**驗證**：

- 字元數限制：≤ 200

**成功條件**：

- ✅ 可以輸入備註
- ✅ 字元數驗證正確
- ✅ 備註正確傳遞到後端

---

### FR-5: 同意服務條款

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 使用者查看服務條款 Checkbox
2. 點擊「服務條款」或「隱私權政策」連結（新視窗開啟）
3. 閱讀條款內容
4. 返回結帳頁面
5. 勾選 Checkbox 表示同意

**連結行為**：

- 服務條款：`/terms`（新視窗開啟）
- 隱私權政策：`/privacy`（新視窗開啟）

**驗證**：

- 必須勾選才能提交表單
- 未勾選顯示錯誤：「請同意服務條款與隱私權政策」

**成功條件**：

- ✅ 連結正確開啟
- ✅ 不影響當前頁面資料
- ✅ 驗證正確運作

---

### FR-6: 查看訂單摘要

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 系統讀取購物車資料（`useCartStore`）
2. 計算價格：
   - 商品小計 = Σ(單價 × 數量)
   - 運費 = 60 元（固定）
   - 總計 = 商品小計 + 運費
3. 顯示訂單摘要（右側或下方）

**計算邏輯**：

```javascript
const items = useCartStore(state => state.items)

const subtotal = useMemo(
  () => items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items],
)

const shippingFee = 60 // 固定運費

const total = subtotal + shippingFee
```

**運費規則**（目前）：

- 固定 NT$ 60（7-11 店到店）
- **免運規則待後續補充**

**成功條件**：

- ✅ 價格計算正確
- ✅ 商品資訊完整顯示
- ✅ 響應式設計正確

---

### FR-7: 提交訂單

**優先級**: 🔴 P0 (Critical)

**前置條件**：

- 所有必填欄位已填寫
- 表單驗證通過
- 已選擇 7-11 門市
- 已同意服務條款

**操作流程**：

1. 使用者點擊「確認訂單」按鈕
2. 系統執行前端驗證（React Hook Form + Zod）
3. 如果驗證失敗：
   - 顯示欄位錯誤訊息
   - 捲動到第一個錯誤欄位
   - 停止提交
4. 如果驗證通過：
   - 顯示 Loading 狀態
   - 準備訂單資料
   - 儲存到 `useCheckoutStore`
   - 導向 `/confirm`（訂單確認頁面）

**資料準備**：

```javascript
const orderData = {
  customerInfo: {
    fullName: getValues('fullName'),
    email: getValues('email'),
    phone: getValues('phone'),
    gender: getValues('gender'),
  },
  deliveryInfo: {
    deliveryName: getValues('deliveryName'),
    recipientPhone: getValues('recipientPhone'),
    storeId: getValues('storeId'),
    storeName: getValues('storeName'),
    storeAddress: getValues('storeAddress'),
    storeTel: getValues('storeTel'),
    deliveryNote: getValues('deliveryNote'),
  },
  items: items,
  subtotal: subtotal,
  shippingFee: shippingFee,
  total: total,
  agreeToTerms: true,
}

// 儲存到 store
setCustomerInfo(orderData.customerInfo)
setDeliveryInfo(orderData.deliveryInfo)
setAgreeToTerms(true)

// 導向確認頁面
router.push('/confirm')
```

**例外處理**：

- 驗證失敗 → 顯示錯誤訊息，停止提交
- 購物車在提交前被清空 → 導回購物車頁面
- 導航失敗 → 顯示錯誤訊息，允許重試

**成功條件**：

- ✅ 驗證正確執行
- ✅ 資料正確儲存到 store
- ✅ 成功導向確認頁面
- ✅ Loading 狀態正確顯示

**注意**：

- 在 `/checkout` 階段「不呼叫後端 API」
- 只進行前端驗證和資料準備
- 實際建立訂單在 `/confirm` 頁面確認後執行

---

### FR-8: 返回購物車

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 使用者點擊「返回購物車」按鈕
2. 系統暫存當前表單資料於 `useCheckoutStore`（僅存在記憶體，重新整理即清除）
3. 導向 `/cart`
4. 使用者再次進入 `/checkout?orderNumber=...` 時，呼叫 order detail
   API 並以 response 自動回填欄位

**成功條件**：

- ✅ 成功導回購物車頁面
- ✅ 再次進入時可透過 API 回填資料

---

### FR-9: 資料回填（Order Detail API）

**優先級**: 🟡 P1 (High)

**功能說明**：

- `/checkout` 若帶有 `orderNumber`，頁面應自動呼叫 order detail API
- API response 需要包含
  `customerInfo`（姓名、電話、Email、性別）以及已選物流資訊
- 取得資料後，透過 `setValue` 與 `useCheckoutStore` 即時回填欄位

**實作建議**：

```javascript
const { data: orderDetail } = useOrderDetail(orderNumber, {
  enabled: Boolean(orderNumber),
})

useEffect(() => {
  if (!orderNumber || !orderDetail?.data?.customerInfo) return

  const { name, email, phone, gender } = orderDetail.data.customerInfo
  setCustomerInfo({
    fullName: name || '',
    email: email || '',
    phone: phone || '',
    gender: gender || '',
  })
  setValue('fullName', name || '')
  setValue('email', email || '')
  setValue('phone', phone || '')
  setValue('gender', gender || '')
}, [orderDetail, orderNumber])
```

**成功條件**：

- ✅ 只要 API 有資料，欄位就能立即回填
- ✅ 未帶 `orderNumber` 時不觸發 API 呼叫
- ✅ 回填後仍可由使用者編輯，並同步更新 `useCheckoutStore`

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/sections/checkout/schema/__tests__/checkout-schema.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'
import { checkoutSchema } from '../checkout-schema'

describe('checkoutSchema', () => {
  const validData = {
    fullName: '王小明',
    email: 'test@example.com',
    phone: '0912345678',
    gender: 'male',
    sameAsCustomer: false,
    deliveryName: '李小華',
    recipientPhone: '0987654321',
    storeId: '123456',
    storeName: '信義門市',
    storeAddress: '台北市信義區信義路五段7號',
    storeTel: '02-2345-6789',
    deliveryNote: '請於下午配送',
    agreeToTerms: true,
  }

  test('應該接受完整有效的資料', () => {
    const result = checkoutSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe('訂購人資訊驗證', () => {
    test('應該拒絕空白全名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        fullName: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('請輸入全名')
    })

    test('應該拒絕過短的全名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        fullName: '王',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('至少需要 2 個字元')
    })

    test('應該拒絕無效的 Email 格式', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('Email')
    })

    test('應該拒絕無效的手機號碼格式', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        phone: '1234567890',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('手機號碼格式')
    })
  })

  describe('收件人資訊驗證', () => {
    test('應該拒絕空白收件人姓名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryName: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('收件人姓名')
    })

    test('應該拒絕未選擇門市', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        storeId: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('門市')
    })
  })

  describe('條款同意驗證', () => {
    test('應該拒絕未同意條款', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        agreeToTerms: false,
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('服務條款')
    })
  })

  describe('選填欄位', () => {
    test('性別可以為空', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        gender: '',
      })
      expect(result.success).toBe(true)
    })

    test('配送備註可以為空', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryNote: '',
      })
      expect(result.success).toBe(true)
    })

    test('應該拒絕過長的配送備註', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryNote: 'a'.repeat(201),
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('200')
    })
  })
})
```

#### 測試文件：`src/store/__tests__/checkout-context.test.js`

```javascript
import { describe, test, expect, beforeEach } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'
import useCheckoutStore from '../checkout-context'

describe('Checkout Store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCheckoutStore())
    act(() => {
      result.current.clear()
    })
  })

  describe('setCustomerInfo', () => {
    test('應該正確設置訂購人資訊', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })
      })

      expect(result.current.customerInfo.fullName).toBe('王小明')
      expect(result.current.customerInfo.email).toBe('test@example.com')
    })
  })

  describe('copyCustomerToDelivery', () => {
    test('應該正確複製訂購人資訊到收件人', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })

        result.current.copyCustomerToDelivery()
      })

      expect(result.current.deliveryInfo.deliveryName).toBe('王小明')
      expect(result.current.deliveryInfo.recipientPhone).toBe('0912345678')
    })
  })

  describe('clear', () => {
    test('應該清除所有結帳資料', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })

        result.current.clear()
      })

      expect(result.current.customerInfo.fullName).toBe('')
      expect(result.current.customerInfo.email).toBe('')
      expect(result.current.agreeToTerms).toBe(false)
    })
  })
})
```

### 5.2 組件測試 (Component Tests)

#### 測試文件：`src/sections/checkout/views/__tests__/checkout-view.test.jsx`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutView from '../checkout-view'

// Mock useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock useCartStore
vi.mock('@/store/cart-context', () => ({
  default: vi.fn(() => ({
    items: [
      {
        id: 'test-1',
        name: 'Test Product',
        price: 150,
        quantity: 2,
      },
    ],
  })),
}))

describe('CheckoutView', () => {
  test('應該渲染結帳表單', () => {
    render(<CheckoutView />)

    expect(screen.getByText('訂購人資訊')).toBeInTheDocument()
    expect(screen.getByText('收件人資訊')).toBeInTheDocument()
    expect(screen.getByText('訂單摘要')).toBeInTheDocument()
  })

  test('應該顯示必填欄位錯誤', async () => {
    render(<CheckoutView />)
    const user = userEvent.setup()

    const submitButton = screen.getByRole('button', { name: /確認訂單/i })
    await user.click(submitButton)

    expect(await screen.findByText(/請輸入全名/i)).toBeInTheDocument()
    expect(await screen.findByText(/請輸入信箱/i)).toBeInTheDocument()
  })

  test('同訂購人資訊 Checkbox 應該複製資料', async () => {
    render(<CheckoutView />)
    const user = userEvent.setup()

    // 填寫訂購人資訊
    await user.type(screen.getByLabelText(/全名/i), '王小明')
    await user.type(screen.getByLabelText(/聯絡電話/i), '0912345678')

    // 勾選同訂購人資訊
    const sameAsCustomerCheckbox = screen.getByLabelText(/同訂購人資訊/i)
    await user.click(sameAsCustomerCheckbox)

    // 驗證收件人資訊是否已複製
    const deliveryNameInput = screen.getByLabelText(/收件人姓名/i)
    const recipientPhoneInput = screen.getByLabelText(/收件人電話/i)

    expect(deliveryNameInput).toHaveValue('王小明')
    expect(recipientPhoneInput).toHaveValue('0912345678')
  })

  test('應該驗證條款必須同意', async () => {
    render(<CheckoutView />)
    const user = userEvent.setup()

    // 填寫完整表單但不勾選條款
    await user.type(screen.getByLabelText(/全名/i), '王小明')
    await user.type(screen.getByLabelText(/信箱/i), 'test@example.com')
    await user.type(screen.getByLabelText(/聯絡電話/i), '0912345678')

    const submitButton = screen.getByRole('button', { name: /確認訂單/i })
    await user.click(submitButton)

    expect(await screen.findByText(/請同意服務條款/i)).toBeInTheDocument()
  })
})
```

### 5.3 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/checkout-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('結帳流程整合測試', () => {
  test('完整結帳流程', async () => {
    // 1. 從購物車頁面點擊「前往結帳」
    // 2. 驗證進入 /checkout 頁面
    // 3. 驗證購物車商品正確顯示
    // 4. 填寫訂購人資訊
    // 5. 勾選「同訂購人資訊」
    // 6. 驗證收件人資訊自動填入
    // 7. 選擇 7-11 門市
    // 8. 勾選同意條款
    // 9. 點擊「確認訂單」
    // 10. 驗證導向 /confirm 頁面
    // 11. 驗證資料正確傳遞
  })

  test('已登入使用者自動帶入資料', async () => {
    // 1. 模擬已登入狀態
    // 2. 進入結帳頁面
    // 3. 驗證訂購人資訊已自動填入
    // 4. 驗證可以修改資料
  })

  test('購物車為空時導回購物車頁面', async () => {
    // 1. 清空購物車
    // 2. 嘗試進入 /checkout
    // 3. 驗證自動導回 /cart
    // 4. 驗證顯示提示訊息
  })

  test('資料持久化測試', async () => {
    // 1. 填寫部分表單資料
    // 2. 重新整理頁面
    // 3. 驗證資料保留
    // 4. 完成訂單
    // 5. 驗證資料清除
  })

  test('表單驗證流程', async () => {
    // 1. 提交空白表單
    // 2. 驗證顯示所有必填錯誤
    // 3. 填寫無效的 Email
    // 4. 驗證顯示格式錯誤
    // 5. 填寫無效的手機號碼
    // 6. 驗證顯示格式錯誤
    // 7. 未勾選條款
    // 8. 驗證顯示條款錯誤
  })

  test('7-11 門市選擇流程', async () => {
    // 1. 點擊「選擇 7-11 門市」
    // 2. 驗證開啟門市選擇介面
    // 3. 選擇門市
    // 4. 驗證門市資訊正確顯示
    // 5. 點擊「變更門市」
    // 6. 驗證可以重新選擇
  })
})
```

### 5.4 測試覆蓋率目標

| 類型         | 目標覆蓋率 | 說明                 |
| ------------ | ---------- | -------------------- |
| Schema 驗證  | 100%       | 所有驗證規則都需測試 |
| Store        | 100%       | 所有狀態邏輯都需測試 |
| Custom Hooks | 90%+       | 核心業務邏輯高覆蓋率 |
| UI 組件      | 80%+       | 關鍵互動和渲染測試   |
| 整合測試     | 100%       | 所有關鍵流程全覆蓋   |

---

## 6. 非功能性需求 (Non-Functional Requirements)

### 6.1 效能 (Performance)

| 指標          | 目標    | 說明                   |
| ------------- | ------- | ---------------------- |
| 頁面載入時間  | < 2 秒  | 首次載入完成時間       |
| 表單驗證      | < 50ms  | 即時驗證回應時間       |
| 互動回饋      | < 100ms | 按鈕點擊、輸入回饋     |
| Checkbox 複製 | < 50ms  | 複製訂購人資訊到收件人 |

**優化策略**：

- 使用 Next.js Image 優化圖片
- 表單驗證使用 debounce（300ms）
- 使用 useMemo 優化價格計算
- 關鍵 CSS 內聯

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 表單資料驗證（React Hook Form + Zod）
- ✅ XSS 防護（React 自動跳脫）
- ✅ LocalStorage 資料加密（如需要）
- ✅ HTTPS（生產環境）
- ✅ 不在 console.log 輸出敏感資訊

#### 後端需配合（不在此 spec 範圍）

- 訂單資料驗證
- 門市有效性檢查
- 價格重新計算（防止前端竄改）
- Rate limiting（防止濫用）
- CORS 設定

### 6.3 SEO

```javascript
// src/app/checkout/page.jsx
export const metadata = {
  title: '結帳 | 2025 力維盃排球錦標賽',
  description: '填寫收件資訊以完成訂單',
  robots: 'noindex, nofollow', // 結帳頁不需索引
}
```

### 6.4 無障礙性 (Accessibility)

#### 語義化 HTML

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  <fieldset>
    <legend>訂購人資訊</legend>
    {/* 表單欄位 */}
  </fieldset>

  <fieldset>
    <legend>收件人資訊</legend>
    {/* 表單欄位 */}
  </fieldset>
</form>
```

#### ARIA 標籤

```jsx
<input
  type="text"
  aria-label="全名"
  aria-describedby="fullName-error"
  aria-invalid={hasError}
  aria-required="true"
/>

<span id="fullName-error" role="alert">
  {errorMessage}
</span>
```

#### 鍵盤導航

- Tab 順序：依表單邏輯順序
- Enter 鍵提交表單
- Esc 鍵清除錯誤訊息（如適用）

#### 螢幕閱讀器

- 所有輸入框提供 label
- 錯誤訊息提供 role="alert"
- Loading 狀態提供 aria-busy
- Checkbox 狀態清晰標示

### 6.5 響應式設計

| 螢幕尺寸 | 寬度     | 佈局方式        | 訂單摘要位置 |
| -------- | -------- | --------------- | ------------ |
| Mobile   | < 1024px | 單欄垂直排列    | 下方全寬     |
| Desktop  | ≥ 1024px | 左右分欄（7:3） | 右側 350px   |

**測試裝置**：

- iPhone 12/13 (390x844)
- iPad (768x1024)
- Desktop 1920x1080

---

## 7. 相依性與里程碑 (Dependencies & Milestones)

### 7.1 前置需求

| 項目              | 狀態      | 負責人       | 備註                        |
| ----------------- | --------- | ------------ | --------------------------- |
| 購物車功能        | ✅ 完成   | -            | 已實作                      |
| 購物車 Store      | ✅ 完成   | -            | 已實作                      |
| User Store        | ✅ 完成   | -            | 已實作（需確認 email 欄位） |
| 結帳進度指示器    | ✅ 完成   | -            | 已實作                      |
| 7-11 門市選擇 API | ⏳ 待串接 | Backend Team | 串接流程待提供              |
| 後端訂單 API      | ⏳ 待開發 | Backend Team | `/api/order/create`         |
| 設計稿            | ⏳ 待確認 | Design Team  | 可用文字描述先行            |

### 7.2 開發里程碑

#### Phase 1: 核心開發（Week 1）

- [x] Spec 文檔完成
- [ ] Schema 實作 + 單元測試
- [ ] Checkout Store 實作 + 單元測試
- [ ] 訂購人資訊表單組件
- [ ] 收件人資訊表單組件
- [ ] 訂單摘要組件
- [ ] 條款 Checkbox 組件

#### Phase 2: 整合開發（Week 2）

- [ ] 結帳頁面主視圖實作
- [ ] 表單驗證整合
- [ ] 已登入使用者資料帶入
- [ ] Checkbox 複製功能
- [ ] 資料持久化
- [ ] 響應式設計調整

#### Phase 3: 7-11 整合（Week 2-3）

- [ ] 門市選擇組件骨架
- [ ] 等待後端提供串接流程
- [ ] 實作門市選擇整合
- [ ] 門市資訊顯示
- [ ] 錯誤處理

#### Phase 4: 測試與優化（Week 3）

- [ ] 組件測試完成
- [ ] 整合測試完成
- [ ] 跨瀏覽器測試
- [ ] 效能測試（Lighthouse）
- [ ] 無障礙性測試

#### Phase 5: 部署與監控（Week 4）

- [ ] Code Review
- [ ] UAT（User Acceptance Testing）
- [ ] 部署至 Staging 環境
- [ ] 部署至 Production 環境
- [ ] PostHog 追蹤驗證

### 7.3 風險評估

| 風險                  | 影響等級 | 機率 | 應對策略                     |
| --------------------- | -------- | ---- | ---------------------------- |
| 7-11 API 串接延遲     | 🔴 高    | 中   | 先實作組件骨架，預留介接位置 |
| 後端 API 延遲         | 🟡 中    | 中   | 前端先完成，使用 Mock Data   |
| User Store 缺少 email | 🟡 中    | 高   | 後續新增或從 API 取得        |
| 設計稿延遲            | 🟢 低    | 低   | 使用文字描述和現有風格先行   |
| 測試覆蓋率不足        | 🟡 中    | 中   | 持續監控，提早介入           |

---

## 8. 待確認事項 (Pending Items)

### 8.1 需要後續補充

**P0 (Critical)**

1. **7-11 店到店 API 串接流程**
   - 如何開啟門市選擇介面？
   - 回傳資料格式？
   - 錯誤處理機制？

2. **User Store Email 欄位**
   - `user-context` 目前沒有 `email` 欄位
   - 需要新增還是從 API 取得？

**P1 (High)**

3. **免運費規則**
   - 目前固定 NT$ 60
   - 免運條件待後續補充
   - 計算邏輯待實作

4. **後端訂單 API 規格**
   - Request/Response 格式確認
   - 錯誤碼定義
   - 測試環境端點

**P2 (Medium)**

5. **PostHog 追蹤**
   - 需要追蹤哪些事件？
   - 事件命名規範？

6. **錯誤訊息文案**
   - 是否需要多語系？
   - 特殊錯誤情境的文案？

---

## 9. API 規格建議 (API Specification Recommendations)

### 9.1 建立訂單 API

**端點**: `POST /api/order/create`

**Request Headers**:

```
Content-Type: application/json
Authorization: Bearer {token} // 如需要
```

**Request Body**:

```json
{
  "customerInfo": {
    "fullName": "王小明",
    "email": "test@example.com",
    "phone": "0912345678",
    "gender": "male"
  },
  "deliveryInfo": {
    "deliveryName": "李小華",
    "recipientPhone": "0987654321",
    "storeId": "123456",
    "storeName": "信義門市",
    "storeAddress": "台北市信義區信義路五段7號",
    "storeTel": "02-2345-6789",
    "deliveryNote": "請於下午配送"
  },
  "items": [
    {
      "productId": "product-1",
      "name": "Volleyball Socks Classic+ SE",
      "price": 150,
      "quantity": 2,
      "color": "2025藍",
      "size": "M (20-24.5cm)"
    }
  ],
  "payment": {
    "subtotal": 780,
    "shippingFee": 60,
    "discount": 0,
    "total": 840
  }
}
```

**Response (成功)**:

```json
{
  "success": true,
  "data": {
    "orderId": "ORDER-20251019-001",
    "orderNumber": "2025101900001",
    "status": "pending_payment",
    "total": 840,
    "createdAt": "2025-10-19T10:30:00Z",
    "paymentUrl": "/checkout/pay?orderId=ORDER-20251019-001"
  }
}
```

**Response (失敗 - 門市無效)**:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_STORE",
    "message": "選擇的門市無效或已關閉",
    "field": "storeId"
  }
}
```

**Response (失敗 - 商品缺貨)**:

```json
{
  "success": false,
  "error": {
    "code": "OUT_OF_STOCK",
    "message": "商品 Volleyball Socks Classic+ SE (2025藍 / M) 已售完",
    "field": "items[0]",
    "productId": "product-1"
  }
}
```

**錯誤碼定義**:

| 錯誤碼           | HTTP Status | 說明         | 處理方式                   |
| ---------------- | ----------- | ------------ | -------------------------- |
| INVALID_STORE    | 400         | 門市無效     | 顯示錯誤，要求重新選擇門市 |
| OUT_OF_STOCK     | 400         | 商品缺貨     | 顯示錯誤，導回購物車頁面   |
| PRICE_MISMATCH   | 400         | 價格不符     | 顯示提示，重新計算價格     |
| VALIDATION_ERROR | 400         | 欄位驗證錯誤 | 顯示欄位錯誤訊息           |
| UNAUTHORIZED     | 401         | 未授權       | 導向登入頁面               |
| SERVER_ERROR     | 500         | 伺服器錯誤   | 顯示錯誤，允許重試         |

---

## 10. 附錄 (Appendix)

### 附錄 A: 運費計算邏輯（待補充）

```javascript
// 目前版本：固定運費
const shippingFee = 60

// 未來版本：免運邏輯（待補充）
function calculateShippingFee(subtotal) {
  // 待補充免運規則
  // 例如：
  // if (subtotal >= 1000) return 0
  // return 60

  return 60
}
```

### 附錄 B: 7-11 門市選擇整合範例（待補充）

```javascript
// 門市選擇整合邏輯（待後續提供詳細流程）
function handleOpenStoreSelector() {
  // 1. 開啟 7-11 門市選擇介面
  // 2. 等待使用者選擇
  // 3. 接收門市資訊
  // 4. 更新表單
  // 詳細實作待後續補充
}
```

### 附錄 C: 性別選項定義

```javascript
export const GENDER_OPTIONS = [
  { value: '', label: '請選擇' },
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
  { value: 'prefer-not-to-say', label: '不願透露' },
]
```

### 附錄 D: 表單欄位 Placeholder 文案

| 欄位       | Placeholder        |
| ---------- | ------------------ |
| 全名       | 請輸入全名         |
| 信箱       | example@email.com  |
| 聯絡電話   | 0912-345-678       |
| 性別       | 請選擇             |
| 收件人姓名 | 請輸入收件人姓名   |
| 收件人電話 | 0912-345-678       |
| 配送備註   | 例如：請於下午配送 |

### 附錄 E: 參考資源

- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [7-11 物流說明](https://www.7-11.com.tw/)（待確認）

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容                                   | 負責人      |
| ---- | ---------- | ------------------------------------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立，包含所有核心需求和待確認事項 | Paper Hsiao |

---

**相關文檔**：

- [購物車功能規格書](./cart-spec.md)
- [結帳進度指示器規格書](./checkout-progress-spec.md)
- [訂單確認頁面規格書](./confirm-page-spec.md)（待建立）
- [登入頁面規格書](./login-page-spec.md)
- [註冊頁面規格書](./signup-page-spec.md)

---

**文件結束**
