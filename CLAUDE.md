# CLAUDE.md — liwei-cup-nextjs

> 力維盃排球錦標賽 (リキイ 盃) 前端專案。父層 `liwei-cup/CLAUDE.md` 涵蓋整體架構與後端說明，本文件聚焦前端。

## 指令

```bash
nvm use                      # Node v22.20.0 (見 .nvmrc)
yarn dev                     # 開發伺服器 localhost:3000
yarn build                   # 正式環境建置
yarn lint                    # ESLint 檢查
yarn lint --fix              # 自動修正
yarn test                    # Jest watch mode
yarn test:ci                 # CI 模式 + coverage
yarn test:coverage           # 單次 coverage 報告
yarn test:playwright-ct      # Playwright 元件測試 (Chromium)
```

執行單一測試：
```bash
npx jest src/store/__tests__/checkout-context.test.js
npx playwright test -c playwright-ct.config.js tests/components/xxx.spec.jsx
```

## 專案架構

```
src/
├── app/                          # Next.js App Router
│   ├── layout.jsx                # 根 Layout (字型、metadata、SEO JSON-LD)
│   ├── (index)/page.jsx          # 首頁
│   ├── (protect)/                # 需登入路由
│   │   └── settings/profile/     # 個人資料頁
│   ├── api/                      # Route Handlers (BFF 代理)
│   │   ├── checkout/intent/      # 結帳意圖 (存 cookie → 導轉付款頁)
│   │   ├── order/create/         # 建立訂單
│   │   ├── order/[orderNumber]/  # 查詢訂單
│   │   └── revalidate/           # ISR 重新驗證
│   ├── auth/                     # 登入 / 註冊 / 驗證
│   │   ├── login/                # login-client.jsx
│   │   ├── signup/               # signup-client.jsx
│   │   └── verify/
│   ├── cart/                     # 購物車 (cart-page-client.jsx)
│   ├── checkout/                 # 結帳流程
│   │   ├── checkout-client.jsx   # 結帳表單
│   │   ├── pay/                  # 付款頁 (Server Component → 藍新金流)
│   │   │   ├── page.jsx          # 呼叫 payment/create API
│   │   │   └── autoSubmitForm.jsx # 自動 POST 到藍新
│   │   └── result/               # 付款結果 (result-client.jsx, 輪詢訂單狀態)
│   ├── confirm/                  # 訂單確認頁 (confirm-client.jsx)
│   ├── products/                 # 商品列表 + 詳情
│   │   ├── page.jsx              # 列表 (products-client.jsx)
│   │   └── [productId]/          # 詳情 (product-detail-client.jsx)
│   ├── shop/complete/            # 購物完成頁
│   ├── consumer-rights/          # 消費者權益
│   ├── privacy/                  # 隱私權政策
│   ├── return-policy/            # 退貨政策
│   ├── terms/                    # 服務條款
│   ├── robots.js                 # SEO robots
│   └── sitemap.js                # SEO sitemap
│
├── sections/                     # 頁面專屬元件 (按 feature 分)
│   ├── auth/
│   │   ├── views/                # login-view, signup-view
│   │   ├── components/           # auth-card, password-input, password-strength
│   │   ├── hook/                 # use-login-form, use-signup-form
│   │   └── schema/               # login-schema, signup-schema (Zod)
│   ├── checkout/
│   │   ├── views/                # checkout-view
│   │   ├── components/           # customer-info-form, delivery-info-form, order-summary, terms-checkbox
│   │   └── schema/               # checkout-schema (Zod)
│   ├── products/
│   │   ├── views/                # products-view
│   │   └── components/           # product
│   ├── profile/                  # member-profile
│   ├── root/                     # 首頁各區塊
│   │   ├── header/               # Header 元件
│   │   ├── footer/               # Footer 元件
│   │   ├── main/                 # 主視覺 + 倒數計時
│   │   ├── declarations/         # 應戰宣言卡片
│   │   ├── inviteCard/           # 邀請卡流程 (多步驟表單 + 本地 store)
│   │   │   ├── hook/             # useCheckAuth, useDeclarationsForm, useInviteCodeForm, usePlayerInfoForm
│   │   │   ├── schema/           # Zod 驗證 schemas
│   │   │   └── store/            # progress-context (本地進度 store)
│   │   ├── address/              # 活動地址資訊
│   │   ├── slogan/               # 標語
│   │   ├── qa/                   # FAQ 問答
│   │   ├── memory/               # 回憶區
│   │   └── music/                # 音樂 (Spotify embed)
│   ├── consumer-rights/views/
│   ├── privacy/views/
│   ├── return-policy/views/
│   └── terms/views/
│
├── components/                   # 共用元件
│   ├── ui/                       # shadcn/ui 元件
│   │   ├── button.jsx
│   │   ├── checkbox.jsx
│   │   ├── dialog.jsx
│   │   ├── drawer.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── slider.jsx
│   │   ├── textarea.jsx
│   │   └── image-slider.jsx
│   ├── common/
│   │   ├── hook-form/            # React Hook Form 封裝元件
│   │   │   ├── form-provider.jsx
│   │   │   ├── rhf-text-field.jsx
│   │   │   ├── rhf-select.jsx
│   │   │   ├── rhf-checkbox.jsx
│   │   │   ├── rhf-radio-button.jsx
│   │   │   ├── rhf-textarea.jsx
│   │   │   ├── field-title.jsx
│   │   │   ├── form-title.jsx
│   │   │   └── page-title.jsx
│   │   ├── checkout-progress/    # 結帳進度條
│   │   ├── client-only/          # Client-only 包裝
│   │   ├── custom-dialog/        # 全域 Dialog
│   │   ├── toast/                # 自訂 Toast
│   │   ├── loader.jsx            # 載入中
│   │   └── unauthorized-state.jsx
│   ├── cart/cart-drawer.jsx       # 購物車側邊欄
│   ├── progress-step/            # 進度步驟元件
│   ├── global-components.jsx     # 全域元件 (Header + Footer + Toaster + Dialog)
│   ├── confetti-runner.jsx       # 紙花動畫控制
│   ├── confetti-view.jsx
│   └── spotify-embed.jsx
│
├── apis/
│   ├── hook/                     # React Query hooks
│   │   ├── use-auth.js           # useLogin, useSignup (mutation)
│   │   ├── use-order.js          # useCreateOrder, useUpdateOrder, useOrderDetail
│   │   ├── use-products.js       # useProducts, useProduct (fetch-based, 非 axs)
│   │   ├── use-declarations.js   # 應戰宣言
│   │   └── use-user.js           # 使用者資料
│   ├── constants/
│   │   └── api-code.js           # SUCCESS_CODE (10000) + ERROR_CODE 對照表
│   └── utils/
│       ├── api-client.js         # handleApiResponse (fetch 用)
│       ├── endpoints.js          # resolveBaseUrl, buildEndpoint
│       └── product-normalizer.js # normalizeProduct, normalizeProductDetail, normalizeProductVariant
│
├── store/                        # Zustand 全域狀態
│   ├── cart-context.js           # 購物車 (persist → localStorage, key: 'liwei-cart')
│   ├── checkout-context.js       # 結帳表單 (customerInfo, deliveryInfo, agreeToTerms)
│   ├── user-context.js           # 使用者登入狀態
│   ├── dialog-context.js         # 全域 Dialog 開關
│   └── confetti-context.js       # 紙花動畫狀態
│
├── provider/
│   ├── index.js                  # 匯出 AppProvider
│   ├── app-provider.js           # 包裝 ReactQueryProvider
│   ├── react-query-provider.js   # TanStack React Query
│   └── post-hog-provider.js      # PostHog 分析
│
├── routers/
│   └── path.js                   # PATH 路由常數 (products, auth, checkout, cart, confirm, shop)
│
├── constants/
│   ├── cache-key.js              # CACHE_KEY (React Query keys)
│   ├── jwt.js                    # STORAGE_KEY ('jwt_access_token_liwei_cup')
│   ├── url.js                    # URL.BattleListCDN (jsDelivr)
│   └── version.js                # VERSION (CDN 版號: BattleListCDN, AvatarCDN, MemberDeclarationsCDN)
│
├── config/
│   └── constants.js              # ROLE (player, staff, other)
│
├── layout/
│   └── bg-layout.jsx             # 黃色背景裝飾 Layout
│
├── lib/
│   └── utils.js                  # cn() = twMerge(clsx(...))
│
└── utils/
    ├── axios.js                  # axiosInstance + axs() + axsCDN()
    ├── utils.js                  # jwtDecode, isValidToken, tokenExpired, setSession
    ├── currency.js               # formatCurrencyNT()
    ├── image.js                  # extractImageUrl()
    ├── array.js                  # toArray, uniqueList
    └── toast.js                  # Toast 工具
```

## 重要慣例

### UI 框架
**只能使用 shadcn/ui**，禁止其他 UI 框架。
- `@mui/material` 目前仍在 dependencies 中（歷史因素），新功能一律使用 shadcn/ui
- shadcn/ui 元件放在 `src/components/ui/`

### 語言
- **JavaScript (.js/.jsx)**，非 TypeScript
- 元件檔：`kebab-case.jsx`
- 邏輯檔：`kebab-case.js`
- Hook：`use-xxx.js`（apis/hook）或 `useXxx.js`（sections 內部）
- Store：`xxx-context.js`

### Prettier 設定 (`prettier.config.js`)
- 無分號 (`semi: false`)
- 單引號 (`singleQuote: true`)
- Trailing comma: `all`
- Print width: `80`
- Arrow parens: `avoid`

### Import 排序
使用 `eslint-plugin-simple-import-sort` 自動排序。

### 元件拆分模式
- **Server Component (`page.jsx`)** → 負責資料取得、metadata、權限檢查
- **Client Component (`xxx-client.jsx`)** → 實際互動 UI，以 `'use client'` 開頭
- 每個路由頁面通常有 `page.jsx` + 對應的 `xxx-client.jsx`

### sections 目錄結構
```
sections/[feature]/
├── views/          # 頁面主視圖
├── components/     # feature 專屬元件
├── hook/           # feature 專屬 hooks
├── schema/         # Zod 驗證 schema
└── store/          # feature 專屬 Zustand store (少數情況)
```

## 關鍵檔案速查

| 用途 | 路徑 |
|------|------|
| 根 Layout | `src/app/layout.jsx` |
| 全域元件 (Header/Footer/Toast/Dialog) | `src/components/global-components.jsx` |
| 路由路徑常數 | `src/routers/path.js` |
| Zustand stores | `src/store/*.js` |
| React Query hooks | `src/apis/hook/use-*.js` |
| API 回應碼定義 | `src/apis/constants/api-code.js` |
| Axios instance + axs() | `src/utils/axios.js` |
| fetch 用 API client | `src/apis/utils/api-client.js` |
| Endpoint 建構 | `src/apis/utils/endpoints.js` |
| 商品資料正規化 | `src/apis/utils/product-normalizer.js` |
| cn() utility | `src/lib/utils.js` |
| JWT 工具 | `src/utils/utils.js` |
| 貨幣格式化 | `src/utils/currency.js` |
| App providers | `src/provider/app-provider.js` |
| RHF 封裝元件 | `src/components/common/hook-form/` |
| CDN 版號 | `src/constants/version.js` |

## 程式碼模式

### API 呼叫 — Client Component (axs)
`axs(endpoint, payload, method)` — 包裝 axios，自動處理 `retStatus.code` 和錯誤 toast。
```js
import { axs } from '@/utils/axios'

const data = await axs('/private/v1/order', { items })           // POST (預設)
const data = await axs('/public/v1/products', null, 'GET')       // GET
```

### API 呼叫 — Server Component / Route Handler (fetch)
使用 `handleApiResponse` + `buildEndpoint` 工具：
```js
import { handleApiResponse } from '@/apis/utils/api-client'
import { buildEndpoint } from '@/apis/utils/endpoints'

const res = await fetch(buildEndpoint('/api/public/v1/products'), { method: 'GET' })
const payload = await handleApiResponse(res, '取得失敗')
```

需帶認證時讀取 httpOnly Cookie：
```js
import { cookies } from 'next/headers'
const cookieStore = await cookies()
const accessToken = cookieStore.get('acToken')?.value
// 轉發 Cookie
fetch(url, { headers: { Cookie: `acToken=${accessToken}` } })
```

### API 呼叫 — 兩種模式比較
| | axs (Client) | fetch + handleApiResponse (Server) |
|---|---|---|
| 使用場景 | Client Component / React Query mutationFn | Server Component / Route Handler |
| 認證 | 自動帶 Bearer token (sessionStorage) | 手動讀 cookie 轉發 |
| 錯誤處理 | 自動 toast | 需手動處理 |
| 範例 | `use-auth.js`, `use-order.js` | `use-products.js`, `checkout/pay/page.jsx` |

### React Query Hook 模式
```js
// Query (GET)
export function useProducts(options = {}) {
  return useQuery({
    queryKey: ['products', 'list'],
    queryFn: () => fetchProductsAPI(),
    ...options,
  })
}

// Mutation (POST/PUT)
export function useCreateOrder(onSuccess) {
  return useMutation({
    mutationKey: ['order', 'create'],
    mutationFn: payload => createOrderAPI(payload),
    onSuccess: data => { onSuccess?.(data?.data) },
  })
}
```

### Zustand Store 模式
```js
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// 帶持久化 (cart)
const useCartStore = create(
  persist(
    (set, get) => ({ items: [], addItem: item => set(state => ({ ... })) }),
    { name: 'liwei-cart', storage: createJSONStorage(() => localStorage) },
  ),
)

// 不帶持久化 (dialog, confetti, user)
const useDialogContext = create(set => ({
  isOpen: false,
  setIsOpen: isOpen => set(() => ({ isOpen })),
}))
```

### 表單處理
使用 React Hook Form + Zod + 封裝元件：
```js
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
```

### cn() — Tailwind class merge
```js
import { cn } from '@/lib/utils'
<div className={cn('base-class', condition && 'conditional-class')} />
```

### nuqs — URL query state
付款結果頁使用 `nuqs` 管理 URL query 參數：
```js
import { parseAsString, useQueryStates } from 'nuqs'
const [params] = useQueryStates({
  status: parseAsString.withDefault('processing'),
  orderNumber: parseAsString,
})
```

## 測試

### Jest (單元測試)
- 設定：`jest.config.js`
- Setup：`jest.setup.js`
- 環境：jsdom
- Coverage threshold：**70%** (branches, functions, lines, statements)
- 測試檔位置：`__tests__/` 目錄或 `*.test.js` / `*.spec.js`
- 已有測試：`use-products.test.js`, `checkout-schema.test.js`, `product.test.jsx`, `products-view.test.jsx`, `checkout-context.test.js`

### Playwright (元件測試)
- 設定：`playwright-ct.config.js`
- 測試目錄：`tests/components/`
- Mock：`tests/mocks/` (e.g. next-link mock)
- 僅跑 Chromium
- Vite 解析 `@/` alias

## 認證機制

**雙軌認證：**
- **httpOnly Cookie (`acToken`)** — Server Component 讀取，用於付款等 server-side 操作
- **sessionStorage (`jwt_access_token_liwei_cup`)** — Client Component 用，axios 攔截器自動帶 Bearer token

登入流程：
1. `POST /api/public/v1/auth/login` → 後端設定 httpOnly Cookie
2. 前端同時存 token 到 sessionStorage（透過 `setSession()`）
3. Server Component 用 `cookies().get('acToken')` 讀取
4. Client Component 用 axios 攔截器自動帶 Authorization header

## 付款流程

```
購物車 (/cart)
  → 結帳頁 (/checkout) — 填寫客戶/收件資訊 (Zustand checkout store)
  → 建立訂單 — POST /api/private/v1/order
  → 確認頁 (/confirm?orderNumber=xxx) — 顯示訂單摘要
  → 付款頁 (/checkout/pay?orderNumber=xxx)
      Server Component 呼叫 POST /api/private/v1/payment/create
      → 取得藍新金流參數 (action, MerchantID, TradeInfo, TradeSha, Version)
  → AutoSubmitForm 自動建立 form POST 到藍新金流閘道
  → 藍新金流付款完成 → 導回 /checkout/result
  → 付款結果頁 — 輪詢訂單狀態 (最多 5 次, 間隔 1.5 秒)
```

關鍵檔案：
- `src/app/checkout/page.jsx` + `checkout-client.jsx` — 結帳表單
- `src/app/checkout/pay/page.jsx` — Server Component 呼叫 payment API
- `src/app/checkout/pay/autoSubmitForm.jsx` — 自動提交到藍新
- `src/app/checkout/result/result-client.jsx` — 付款結果 + 輪詢
- `src/app/confirm/confirm-client.jsx` — 訂單確認
- `src/store/checkout-context.js` — 結帳表單狀態
- `src/store/cart-context.js` — 購物車狀態

## 環境變數

| 變數 | 用途 |
|------|------|
| `BASE_URL` | Go 後端 URL (Server Component / Route Handler 用) |
| `NEXT_PUBLIC_BASE_URL` | Go 後端 URL (Client Component 用，可為空則 same-origin) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (僅 production) |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL |

## Provider 包裝順序

```
RootLayout
  └── NuqsAdapter (URL query state)
      └── AppProvider
          └── ReactQueryProvider (TanStack React Query)
              └── PostHogProvider (分析)
                  └── GlobalComponents (Header + Footer + Toaster + Dialog)
                      └── {children}
```

## 字型

透過 `next/font/google` 載入，定義在 `src/app/layout.jsx`：
- **Noto Sans TC** — 主要中文字型 (400, 700, 900)
- **Noto Sans JP** — 日文字型 (400, 700, 900)
- **Anton** — 標題裝飾字型 (400)
- **Antonio** — 輔助字型 (400, 700)
