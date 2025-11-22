# 結帳進度指示器規格書

# Checkout Progress Indicator Specification

**版本 (Version)**: 1.1  
**建立日期 (Created Date)**: 2025-01-27  
**最後更新 (Last Updated)**: 2025-01-27  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Completed

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

建立一個可重用的結帳進度指示器組件，用於顯示使用者在結帳流程中的當前位置，提升使用者體驗和流程清晰度。

### 1.2 使用者故事 (User Stories)

**US-1: 查看結帳進度**

> 作為一個**使用者**，我想要在結帳流程中看到我目前所在的步驟，以便了解整個流程的進度和剩餘步驟。

**US-2: 理解結帳流程**

> 作為一個**使用者**，我想要清楚了解結帳流程包含哪些步驟，以便預期接下來需要做什麼。

**US-3: 視覺化進度**

> 作為一個**使用者**，我想要透過視覺化的進度指示器了解我已經完成和尚未完成的步驟。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ 進度指示器組件（可重用）
- ✅ 三個步驟：購物車、填寫資訊、訂單確認（中文標題）
- ✅ 視覺狀態管理（已完成、當前、未完成）
- ✅ 響應式設計
- ✅ 整合到購物車頁面
- ✅ 整合到結帳頁面
- ✅ 整合到訂單確認頁面
- ✅ 連接線與圓圈中心對齊
- ✅ 文字標題與圓圈水平對齊

#### 不包含功能 (Out of Scope)

- ❌ 步驟間的導航功能（點擊跳轉）
- ❌ 動畫效果（未來版本）
- ❌ 自定義步驟配置（目前固定三步驟）
- ❌ 進度百分比顯示

### 1.4 與現有系統的關係

**購物車頁面整合**

- 在購物車頁面頂部顯示進度指示器
- 當前步驟：Shopping Cart（Step 1）

**結帳頁面整合**

- 在結帳頁面頂部顯示進度指示器
- 當前步驟：Fill Information（Step 2）

**訂單確認頁面整合**

- 在訂單確認頁面頂部顯示進度指示器
- 當前步驟：Order Confirmation（Step 3）

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑        | 檔案位置                                   | 當前步驟 | 狀態      |
| -------------- | ----------- | ------------------------------------------ | -------- | --------- |
| 購物車頁面     | `/cart`     | `src/app/cart/page.jsx`                    | Step 1   | ✅ 已完成 |
| 結帳頁面       | `/checkout` | `src/app/checkout/page.jsx`                | Step 2   | ✅ 已完成 |
| 訂單確認頁面   | `/confirm`  | `src/app/confirm/page.jsx`                 | Step 3   | ✅ 已完成 |
| 進度指示器組件 | -           | `src/components/common/checkout-progress/` | -        | ✅ 已完成 |

### 2.2 檔案結構

```
src/
├── app/
│   ├── cart/
│   │   ├── page.jsx                    # 購物車頁面（已存在）
│   │   └── cart-page-client.jsx        # 購物車客戶端組件（已存在）
│   ├── checkout/
│   │   ├── page.jsx                    # 結帳頁面（待建立）
│   │   └── checkout-client.jsx         # 結帳客戶端組件（待建立）
│   └── confirm/
│       ├── page.jsx                    # 訂單確認頁面（待建立）
│       └── confirm-client.jsx          # 訂單確認客戶端組件（待建立）
├── components/
│   └── common/
│       └── checkout-progress/
│           ├── checkout-progress.jsx   # 進度指示器主組件（已完成）
│           ├── progress-step.jsx       # 單個步驟組件（已棄用）
│           └── index.js                # 導出（已完成）
└── routers/
    └── path.js                         # 路由常數（需更新）
```

### 2.3 組件設計

#### 2.3.1 進度指示器主組件 (CheckoutProgress)

**功能**：顯示結帳流程的三個步驟和當前進度

**Props**：

```typescript
interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3 // 當前步驟（1: Shopping Cart, 2: Fill Information, 3: Order Confirmation）
  className?: string // 自定義樣式類別
}
```

**使用方式**：

```jsx
import CheckoutProgress from '@/components/common/checkout-progress'

// 在購物車頁面
<CheckoutProgress currentStep={1} />

// 在結帳頁面
<CheckoutProgress currentStep={2} />

// 在訂單確認頁面
<CheckoutProgress currentStep={3} />
```

#### 2.3.2 步驟組件 (ProgressStep)

**功能**：單個步驟的視覺呈現

**Props**：

```typescript
interface ProgressStepProps {
  stepNumber: number // 步驟編號（1, 2, 3）
  title: string // 步驟標題
  isActive: boolean // 是否為當前步驟
  isCompleted: boolean // 是否已完成
  className?: string // 自定義樣式類別
}
```

### 2.4 步驟定義

```javascript
const CHECKOUT_STEPS = [
  {
    step: 1,
    title: '購物車',
  },
  {
    step: 2,
    title: '填寫資訊',
  },
  {
    step: 3,
    title: '訂單確認',
  },
]
```

**說明**：

- 使用中文標題以符合專案的中文環境
- 簡化結構，只保留必要的 `step` 和 `title` 欄位
- `path` 和 `description` 欄位已移除，因為目前不需要導航功能

### 2.5 路由常數更新

```javascript
// src/routers/path.js
export const PATH = {
  // ... 現有路由

  // 購物流程
  cart: '/cart',
  checkout: {
    root: '/checkout',
    pay: '/checkout/pay',
  },
  confirm: '/confirm', // 新增

  // ... 其他路由
}
```

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框、粗體字）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 清晰的視覺層次
- ✅ 響應式設計

### 3.2 視覺設計規格

**桌面版佈局**：

```
┌─────────────────────────────────────────────────────────┐
│  [1] ────────── [2] ────────── [3]                      │
│   ●              ○              ○                       │
│ Shopping      Fill         Order                        │
│   Cart      Information  Confirmation                   │
└─────────────────────────────────────────────────────────┘
```

**手機版佈局**：

```
┌─────────────────────────────────────────────────────────┐
│  [1] ──── [2] ──── [3]                                  │
│   ●        ○        ○                                   │
│Shopping   Fill    Order                                 │
│  Cart   Information Confirmation                        │
└─────────────────────────────────────────────────────────┘
```

### 3.3 狀態設計

#### 3.3.1 步驟狀態

| 狀態     | 圓圈顏色       | 連接線顏色     | 文字顏色       | 說明       |
| -------- | -------------- | -------------- | -------------- | ---------- |
| 已完成   | `blue-primary` | `blue-primary` | `blue-primary` | 深藍色背景 |
| 當前步驟 | `blue-primary` | `blue-primary` | `blue-primary` | 深藍色背景 |
| 未完成   | `slate-300`    | `slate-300`    | `slate-600`    | 淺灰色背景 |

#### 3.3.2 視覺元素規格

**圓圈圖標**：

- 尺寸：`w-8 h-8` (32px)
- 圓圈：`rounded-full`
- 數字：白色文字，`font-bold`
- 已完成/當前：`bg-blue-primary text-white`
- 未完成：`bg-slate-300 text-slate-600`

**連接線**：

- 高度：`h-0.5` (2px)
- 已完成/當前：`bg-blue-primary`
- 未完成：`bg-slate-300`

**文字標籤**：

- 字體：`font-noto-sans-tc`
- 大小：`text-sm` (桌面版), `text-xs` (手機版)
- 已完成/當前：`text-blue-primary font-semibold`
- 未完成：`text-slate-600`

### 3.4 響應式設計

| 螢幕尺寸 | 寬度    | 佈局方式 | 圓圈尺寸  | 文字大小  | 間距    |
| -------- | ------- | -------- | --------- | --------- | ------- |
| Mobile   | < 768px | 水平排列 | `w-6 h-6` | `text-xs` | `gap-2` |
| Desktop  | ≥ 768px | 水平排列 | `w-8 h-8` | `text-sm` | `gap-8` |

### 3.5 組件結構

```jsx
<div className="checkout-progress">
  <div className="flex items-center justify-center gap-2 md:gap-8">
    {steps.map((step, index) => (
      <div key={step.step} className="flex items-center">
        {/* 步驟圓圈 */}
        <div className="relative">
          <div className={circleClasses}>{step.step}</div>
        </div>

        {/* 連接線（除了最後一個步驟） */}
        {index < steps.length - 1 && <div className={lineClasses} />}
      </div>
    ))}
  </div>

  {/* 步驟標題 */}
  <div className="flex items-center justify-center gap-2 md:gap-8 mt-2">
    {steps.map((step, index) => (
      <div key={step.step} className="text-center">
        <p className={titleClasses}>{step.title}</p>
      </div>
    ))}
  </div>
</div>
```

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 進度指示器顯示

**優先級**: 🔴 P0 (Critical)

**操作流程**：

1. 組件接收 `currentStep` prop
2. 根據 `currentStep` 計算每個步驟的狀態
3. 渲染對應的視覺狀態（已完成、當前、未完成）
4. 顯示步驟標題

**成功條件**：

- ✅ 正確顯示當前步驟
- ✅ 已完成步驟顯示為藍色
- ✅ 未完成步驟顯示為灰色
- ✅ 連接線狀態正確
- ✅ 響應式設計正常

### FR-2: 狀態計算邏輯

**優先級**: 🔴 P0 (Critical)

**計算規則**：

```javascript
const getStepStatus = (stepNumber, currentStep) => {
  if (stepNumber < currentStep) {
    return 'completed' // 已完成
  } else if (stepNumber === currentStep) {
    return 'active' // 當前步驟
  } else {
    return 'inactive' // 未完成
  }
}
```

**成功條件**：

- ✅ Step 1 在 `/cart` 頁面顯示為 active
- ✅ Step 2 在 `/checkout` 頁面顯示為 active
- ✅ Step 3 在 `/confirm` 頁面顯示為 active
- ✅ 已完成步驟正確標記為 completed
- ✅ 未完成步驟正確標記為 inactive

### FR-3: 響應式適配

**優先級**: 🟡 P1 (High)

**適配規則**：

- 手機版：較小的圓圈和文字，較緊湊的間距
- 桌面版：較大的圓圈和文字，較寬鬆的間距

**成功條件**：

- ✅ 手機版佈局正確
- ✅ 桌面版佈局正確
- ✅ 文字大小適配
- ✅ 間距適配

### FR-4: 購物車頁面整合

**優先級**: 🔴 P0 (Critical)

**整合位置**：

- 在購物車頁面標題上方顯示進度指示器
- 當前步驟：Step 1 (Shopping Cart)

**成功條件**：

- ✅ 進度指示器正確顯示在購物車頁面
- ✅ 當前步驟正確標記為 Step 1
- ✅ 樣式與頁面整體設計一致

### FR-5: 結帳頁面整合

**優先級**: 🔴 P0 (Critical)

**整合位置**：

- 在結帳頁面標題上方顯示進度指示器
- 當前步驟：Step 2 (Fill Information)

**成功條件**：

- ✅ 進度指示器正確顯示在結帳頁面
- ✅ 當前步驟正確標記為 Step 2
- ✅ Step 1 顯示為已完成狀態

### FR-6: 訂單確認頁面整合

**優先級**: 🟡 P1 (High)

**整合位置**：

- 在訂單確認頁面標題上方顯示進度指示器
- 當前步驟：Step 3 (Order Confirmation)

**成功條件**：

- ✅ 進度指示器正確顯示在訂單確認頁面
- ✅ 當前步驟正確標記為 Step 3
- ✅ 所有步驟顯示為已完成狀態

---

## 5. 實作細節

### 5.1 組件實作

#### 5.1.1 CheckoutProgress 主組件

```jsx
'use client'

import { cn } from '@/lib/utils'

const CHECKOUT_STEPS = [
  { step: 1, title: '購物車' },
  { step: 2, title: '填寫資訊' },
  { step: 3, title: '訂單確認' },
]

export default function CheckoutProgress({ currentStep, className }) {
  return (
    <div className={cn('w-full py-6', className)}>
      <div className="flex items-center justify-center">
        {CHECKOUT_STEPS.map((step, index) => (
          <div key={step.step} className="flex items-center">
            {/* 圓圈和標題的容器 */}
            <div className="flex flex-col items-center gap-2">
              {/* 圓圈 */}
              <div
                className={cn(
                  'w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold',
                  step.step === currentStep || step.step < currentStep
                    ? 'bg-blue-primary text-white'
                    : 'bg-slate-300 text-slate-600',
                )}
              >
                {step.step}
              </div>

              {/* 標題文字 */}
              <p
                className={cn(
                  'text-xs md:text-sm font-noto-sans-tc text-center whitespace-nowrap',
                  step.step === currentStep || step.step < currentStep
                    ? 'text-blue-primary font-semibold'
                    : 'text-slate-600',
                )}
              >
                {step.title}
              </p>
            </div>

            {/* 連接線 */}
            {index < CHECKOUT_STEPS.length - 1 && (
              <div
                className={cn(
                  'w-20 md:w-32 lg:w-48 h-0.5 mb-6',
                  step.step < currentStep ? 'bg-blue-primary' : 'bg-slate-300',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

**關鍵實作細節**：

1. **結構設計**：使用 `flex-col` 將圓圈和標題垂直排列在一起
2. **對齊方式**：
   - 圓圈和標題使用 `items-center` 確保水平居中對齊
   - 連接線使用 `mb-6` 向下偏移，與圓圈中心對齊
3. **連接線長度**：使用響應式寬度 `w-20 md:w-32 lg:w-48` 適應不同螢幕
4. **無間隙設計**：移除 `gap` 和 `mx` 讓線和圓圈緊密連接
5. **文字不換行**：使用 `whitespace-nowrap` 確保標題在一行顯示

#### 5.1.2 ProgressStep 子組件

```jsx
'use client'

import { cn } from '@/lib/utils'

// ⚠️ 此組件已棄用，不再使用
// 最終實作將圓圈和標題的渲染邏輯整合到主組件中
```

**說明**：在最終實作中，我們將圓圈和標題的渲染邏輯直接整合到主組件中，不再使用獨立的
`ProgressStep` 子組件。這樣做的原因：

1. **簡化結構**：減少不必要的組件抽象
2. **更好的對齊控制**：直接在主組件中控制圓圈、線條和標題的佈局關係
3. **提升效能**：減少組件層級，降低渲染開銷

原本的 `progress-step.jsx` 檔案仍然存在，但已不再被使用。

### 5.2 頁面整合

#### 5.2.1 購物車頁面整合

```jsx
// src/app/cart/cart-page-client.jsx
import CheckoutProgress from '@/components/common/checkout-progress'

function CartPageClient() {
  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={1} />

        {/* 現有購物車內容 */}
        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">購物車</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            確認商品資訊後即可前往結帳流程。
          </p>
        </div>

        {/* ... 現有購物車內容 */}
      </div>
    </section>
  )
}
```

#### 5.2.2 結帳頁面整合

```jsx
// src/app/checkout/checkout-client.jsx
import CheckoutProgress from '@/components/common/checkout-progress'

function CheckoutClient() {
  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={2} />

        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">結帳</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請填寫收件資訊以完成訂單。
          </p>
        </div>

        {/* 結帳表單內容 */}
      </div>
    </section>
  )
}
```

#### 5.2.3 訂單確認頁面整合

```jsx
// src/app/confirm/confirm-client.jsx
import CheckoutProgress from '@/components/common/checkout-progress'

function ConfirmClient() {
  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={3} />

        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">訂單確認</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請確認您的訂單資訊。
          </p>
        </div>

        {/* 訂單確認內容 */}
      </div>
    </section>
  )
}
```

---

## 6. 測試規格 (Test Specifications)

### 6.1 單元測試

#### 測試文件：`src/components/common/checkout-progress/__tests__/checkout-progress.test.jsx`

```javascript
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import CheckoutProgress from '../checkout-progress'

describe('CheckoutProgress', () => {
  test('應該正確顯示三個步驟', () => {
    render(<CheckoutProgress currentStep={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
    expect(screen.getByText('Fill Information')).toBeInTheDocument()
    expect(screen.getByText('Order Confirmation')).toBeInTheDocument()
  })

  test('Step 1 應該在 currentStep=1 時顯示為 active', () => {
    render(<CheckoutProgress currentStep={1} />)

    const step1Circle = screen.getByText('1').closest('div')
    expect(step1Circle).toHaveClass('bg-blue-primary', 'text-white')
  })

  test('Step 2 和 3 應該在 currentStep=1 時顯示為 inactive', () => {
    render(<CheckoutProgress currentStep={1} />)

    const step2Circle = screen.getByText('2').closest('div')
    const step3Circle = screen.getByText('3').closest('div')

    expect(step2Circle).toHaveClass('bg-slate-300', 'text-slate-600')
    expect(step3Circle).toHaveClass('bg-slate-300', 'text-slate-600')
  })

  test('Step 1 應該在 currentStep=2 時顯示為 completed', () => {
    render(<CheckoutProgress currentStep={2} />)

    const step1Circle = screen.getByText('1').closest('div')
    expect(step1Circle).toHaveClass('bg-blue-primary', 'text-white')
  })

  test('所有步驟應該在 currentStep=3 時顯示為 completed', () => {
    render(<CheckoutProgress currentStep={3} />)

    const step1Circle = screen.getByText('1').closest('div')
    const step2Circle = screen.getByText('2').closest('div')
    const step3Circle = screen.getByText('3').closest('div')

    expect(step1Circle).toHaveClass('bg-blue-primary', 'text-white')
    expect(step2Circle).toHaveClass('bg-blue-primary', 'text-white')
    expect(step3Circle).toHaveClass('bg-blue-primary', 'text-white')
  })
})
```

### 6.2 整合測試

#### 測試文件：`__tests__/e2e/checkout-progress.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('結帳進度指示器整合測試', () => {
  test('購物車頁面應該顯示正確的進度', async () => {
    // 1. 訪問購物車頁面
    // 2. 驗證進度指示器顯示
    // 3. 驗證 Step 1 為 active
    // 4. 驗證 Step 2 和 3 為 inactive
  })

  test('結帳頁面應該顯示正確的進度', async () => {
    // 1. 訪問結帳頁面
    // 2. 驗證進度指示器顯示
    // 3. 驗證 Step 1 為 completed
    // 4. 驗證 Step 2 為 active
    // 5. 驗證 Step 3 為 inactive
  })

  test('訂單確認頁面應該顯示正確的進度', async () => {
    // 1. 訪問訂單確認頁面
    // 2. 驗證進度指示器顯示
    // 3. 驗證所有步驟為 completed
  })

  test('響應式設計測試', async () => {
    // 1. 測試手機版 viewport
    // 2. 驗證圓圈和文字大小
    // 3. 測試桌面版 viewport
    // 4. 驗證圓圈和文字大小
  })
})
```

---

## 7. 非功能性需求 (Non-Functional Requirements)

### 7.1 效能 (Performance)

| 指標         | 目標   | 說明                   |
| ------------ | ------ | ---------------------- |
| 組件渲染時間 | < 10ms | 進度指示器組件渲染時間 |
| 記憶體使用   | < 1MB  | 組件記憶體佔用         |
| 包大小       | < 5KB  | 組件打包後大小         |

### 7.2 無障礙性 (Accessibility)

#### 語義化 HTML

```jsx
<nav aria-label="結帳進度" role="navigation">
  <ol className="flex items-center justify-center">
    <li aria-current={isActive ? 'step' : undefined}>
      <span className="sr-only">
        步驟 {stepNumber}: {title}
      </span>
      {/* 視覺元素 */}
    </li>
  </ol>
</nav>
```

#### ARIA 標籤

- 使用 `aria-current="step"` 標記當前步驟
- 使用 `aria-label` 提供步驟描述
- 使用 `role="navigation"` 標記導航區域

### 7.3 響應式設計

| 螢幕尺寸 | 寬度    | 圓圈尺寸 | 文字大小 | 間距 | 測試裝置             |
| -------- | ------- | -------- | -------- | ---- | -------------------- |
| Mobile   | < 768px | 24px     | 12px     | 8px  | iPhone 12/13 (390px) |
| Desktop  | ≥ 768px | 32px     | 14px     | 32px | 1440px               |

---

## 8. 相依性與里程碑 (Dependencies & Milestones)

### 8.1 前置需求

| 項目           | 狀態      | 負責人 | 備註                     |
| -------------- | --------- | ------ | ------------------------ |
| 購物車頁面     | ✅ 已完成 | -      | 需要整合進度指示器       |
| 結帳頁面       | ⏳ 待建立 | -      | 需要建立並整合進度指示器 |
| 訂單確認頁面   | ⏳ 待建立 | -      | 需要建立並整合進度指示器 |
| 進度指示器組件 | ⏳ 待建立 | -      | 主要開發項目             |

### 8.2 開發里程碑

#### Phase 1: 進度指示器組件開發（Week 1）

- [ ] 建立 CheckoutProgress 主組件
- [ ] 建立 ProgressStep 子組件
- [ ] 實作狀態計算邏輯
- [ ] 實作響應式設計
- [ ] 單元測試完成

#### Phase 2: 頁面整合（Week 1-2）

- [ ] 購物車頁面整合
- [ ] 結帳頁面建立與整合
- [ ] 訂單確認頁面建立與整合
- [ ] 路由常數更新

#### Phase 3: 測試與優化（Week 2）

- [ ] 整合測試完成
- [ ] 跨瀏覽器測試
- [ ] 無障礙性測試
- [ ] 效能優化

#### Phase 4: 部署與監控（Week 2）

- [ ] Code Review
- [ ] 部署至 Production
- [ ] 使用者測試

---

## 9. 問題討論

### Q1: 進度指示器的位置

**問題**：進度指示器應該放在頁面的哪個位置？

**選項**：

**A. 頁面頂部（Header 下方）**

- 優點：使用者進入頁面就能看到進度
- 缺點：可能與頁面標題重複

**B. 頁面標題上方**

- 優點：與頁面內容有明確關聯
- 缺點：可能被忽略

**C. 頁面標題下方**

- 優點：在標題和內容之間，視覺層次清晰
- 缺點：可能增加頁面長度

**Paper 的建議**：根據附圖，我建議放在頁面標題上方，這樣使用者能清楚看到整個流程的進度。您覺得如何？

---

### Q2: 步驟標題的語言

**問題**：步驟標題應該使用中文還是英文？

**選項**：

**A. 全中文**

- 優點：符合專案的中文環境
- 缺點：可能與現有的英文元素不一致

**B. 全英文**

- 優點：與附圖一致，國際化友好
- 缺點：可能與專案的中文環境不一致

**C. 混合使用**

- 優點：平衡中英文使用
- 缺點：可能造成不一致

**Paper 的建議**：根據附圖顯示的是英文標題，我建議使用英文標題以保持一致性。您覺得如何？

---

### Q3: 連接線的設計

**問題**：連接線應該使用實線還是虛線？

**選項**：

**A. 實線**

- 優點：視覺上更清晰，表示流程的連續性
- 缺點：可能過於強烈

**B. 虛線**

- 優點：視覺上較柔和，不會過於搶眼
- 缺點：可能不夠清晰

**C. 根據狀態變化**

- 已完成：實線
- 未完成：虛線
- 優點：視覺層次更豐富
- 缺點：實作較複雜

**Paper 的建議**：根據附圖，我建議使用實線，因為它更清晰地表示流程的連續性。您覺得如何？

---

### Q4: 響應式設計的斷點

**問題**：響應式設計應該使用哪個斷點？

**選項**：

**A. 使用 Tailwind 預設斷點**

- `sm: 640px`, `md: 768px`, `lg: 1024px`
- 優點：與專案其他部分一致
- 缺點：可能不夠精確

**B. 自定義斷點**

- 如 `mobile: 480px`, `tablet: 768px`
- 優點：更精確控制
- 缺點：需要額外配置

**C. 使用現有專案斷點**

- 如 `1440:` 斷點
- 優點：與專案一致
- 缺點：可能不適合所有情況

**Paper 的建議**：我建議使用 Tailwind 預設的 `md: 768px`
斷點，因為這與專案其他部分保持一致。您覺得如何？

---

### Q5: 動畫效果

**問題**：是否需要加入動畫效果？

**選項**：

**A. 無動畫**

- 優點：簡單直接，載入快速
- 缺點：可能缺乏視覺吸引力

**B. 簡單動畫**

- 如淡入效果、顏色過渡
- 優點：提升使用者體驗
- 缺點：增加複雜度

**C. 豐富動畫**

- 如進度條動畫、步驟切換動畫
- 優點：視覺效果佳
- 缺點：可能影響效能

**Paper 的建議**：目前階段我建議先不加入動畫，專注於核心功能。未來可以考慮加入簡單的顏色過渡動畫。您覺得如何？

---

## 10. 參考資源

- [Progress Indicators UX Best Practices](https://www.nngroup.com/articles/progress-indicators/)
- [Checkout Flow Design Patterns](https://baymard.com/blog/checkout-flow-design)
- [Accessible Progress Indicators](https://www.w3.org/WAI/ARIA/apg/patterns/feed/)
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)

---

## 11. 附錄

### 附錄 A: 組件使用範例

```jsx
// 在購物車頁面使用
import CheckoutProgress from '@/components/common/checkout-progress'

function CartPage() {
  return (
    <div>
      <CheckoutProgress currentStep={1} />
      {/* 其他內容 */}
    </div>
  )
}

// 在結帳頁面使用
function CheckoutPage() {
  return (
    <div>
      <CheckoutProgress currentStep={2} />
      {/* 其他內容 */}
    </div>
  )
}

// 在訂單確認頁面使用
function ConfirmPage() {
  return (
    <div>
      <CheckoutProgress currentStep={3} />
      {/* 其他內容 */}
    </div>
  )
}
```

### 附錄 B: 樣式類別參考

```css
/* 進度指示器容器 */
.checkout-progress {
  @apply w-full py-6;
}

/* 步驟圓圈 - 已完成/當前 */
.step-circle-active {
  @apply w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-primary text-white text-xs md:text-sm font-bold flex items-center justify-center;
}

/* 步驟圓圈 - 未完成 */
.step-circle-inactive {
  @apply w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-300 text-slate-600 text-xs md:text-sm font-bold flex items-center justify-center;
}

/* 連接線 - 已完成 */
.progress-line-completed {
  @apply w-8 md:w-16 h-0.5 bg-blue-primary;
}

/* 連接線 - 未完成 */
.progress-line-inactive {
  @apply w-8 md:w-16 h-0.5 bg-slate-300;
}

/* 步驟標題 - 已完成/當前 */
.step-title-active {
  @apply text-xs md:text-sm font-noto-sans-tc text-blue-primary font-semibold;
}

/* 步驟標題 - 未完成 */
.step-title-inactive {
  @apply text-xs md:text-sm font-noto-sans-tc text-slate-600;
}
```

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容                                                                                     | 負責人      |
| ---- | ---------- | -------------------------------------------------------------------------------------------- | ----------- |
| 1.0  | 2025-01-27 | 初始版本建立                                                                                 | Paper Hsiao |
| 1.1  | 2025-01-27 | 完成所有實作：中文標題、連接線與圓圈中心對齊、標題與圓圈水平對齊、無間隙緊密連接、響應式設計 | Paper Hsiao |

---

**相關文檔**：

- [購物車功能規格書](./cart-spec.md)
- [結帳頁面規格書](./checkout-page-spec.md)（待建立）
- [訂單確認頁面規格書](./confirm-page-spec.md)（待建立）

---

**文件結束**
