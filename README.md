# 2025 力維盃錦標賽官網（Next.js）

以 Next.js App
Router 打造的 2025 力維盃活動官網，提供賽事資訊、互動式報名流程、商品兌換與支付導向等功能，整合 PostHog 特性旗標、React
Query、Zustand 與 Tailwind CSS 4，支援前後端 API 串接與資料快取。

## 亮點功能

- 首頁動態體驗：倒數計時、跑馬燈式參戰宣言牆、常見問題與邀請卡流程等完整視覺呈現。
- 多步驟報名流程：以 `react-hook-form` + `zod` 驗證，搭配 PostHog 旗標
  `open-form-field` 控制啟用，並運用 Zustand 保存登入與流程狀態。
- 商品與支付串接：`/products` 透過客製 axios
  instance 呼叫遠端 API，`/api/checkout/intent`
  產生訂單意圖並以 Cookie 保存後導向 `/checkout/pay` 進行第三方支付自動送單。
- 靜態/動態資料來源：宣言選項與頭像從 jsDelivr
  CDN 抓取；主辦方公告、Q&A 以 React Server Components 搭配 incremental static
  regeneration。
- 追蹤與分析：PostHog（事件、Feature Flags）與可選用的 Google
  Analytics，皆支援 CSP nonce。
- 安全強化：`middleware.ts`
  設定 CSP、HSTS、COOP/CORP 等安全標頭；`next.config.mjs`
  控制允許的遠端圖片來源與 console 清除。

## 技術堆疊

- **核心框架**：Next.js 15、React 19
- **語言與工具**：JavaScript (ES2023)、Node.js v21.1.0（`.nvmrc`）
- **UI / 樣式**：Tailwind CSS v4、tw-animate-css、**shadcn/ui（唯一指定 UI
  Framework，基於 Radix primitives）**、Framer Motion
- **狀態管理與資料**：React Query 5、Zustand、Axios、自訂 `axs` helper、React
  Hook Form + Zod
- **追蹤分析**：PostHog、Google Analytics（可選）
- **品質**：ESLint（含 simple-import-sort、React Hooks 規則）、Prettier

> ⚠️ **重要政策**：本專案 **僅允許使用 shadcn/ui**
> 作為 UI 組件庫，禁止使用 Material-UI、Ant Design、Chakra UI 等其他 UI
> Framework。詳見 [UI Framework Policy](./docs/UI_FRAMEWORK_POLICY.md)。

## 快速開始

1. **安裝 Node 版本**
   ```bash
   nvm use
   ```
2. **安裝套件**
   ```bash
   yarn install
   ```
3. **設定環境變數** – 建議依 `.env.example` 建立 `.env.local`

   ```bash
   cp .env.example .env.local
   ```

   並依需求補齊下列值：

   | 變數                       | 必填 | 說明                                                                               |
   | -------------------------- | ---- | ---------------------------------------------------------------------------------- |
   | `BASE_URL`                 | 是   | 伺服器端請求的 API 根路徑，例如 `https://api.liwei-cup.tw`；也用於 server action。 |
   | `NEXT_PUBLIC_BASE_URL`     | 建議 | 瀏覽器端 axios 請求用的公開 API URL，若留空則使用同源。                            |
   | `NEXT_PUBLIC_POSTHOG_KEY`  | 否   | 啟用 PostHog（行為追蹤與特性旗標）。                                               |
   | `NEXT_PUBLIC_POSTHOG_HOST` | 否   | PostHog 自訂網域，預設 `https://us.i.posthog.com`。                                |
   | `NEXT_PUBLIC_GA_ID`        | 否   | Google Analytics GA4 代碼。                                                        |

4. **啟動開發伺服器**
   ```bash
   yarn dev
   ```
   於 <http://localhost:3000> 查看。

## NPM Script

| 指令         | 說明                                  |
| ------------ | ------------------------------------- |
| `yarn dev`   | 啟動開發模式。                        |
| `yarn build` | 建置生產版本。                        |
| `yarn start` | 以生產模式啟動（需先 `yarn build`）。 |
| `yarn lint`  | 執行 ESLint。                         |

## 目錄導覽

```
├── src
│   ├── app                 # Next.js App Router 路由
│   │   ├── (index)         # 首頁 (Root) Server Components
│   │   ├── products        # 商品清單 (Client Component)
│   │   ├── checkout/pay    # 支付導向頁 (Server + Client 混合)
│   │   ├── api             # Route Handlers (checkout intent、revalidate)
│   │   └── privacy         # 隱私權政策頁
│   ├── sections            # 首頁分段模組 (root、products、privacy)
│   ├── components          # 共用元件、shadcn/ui、對話框、Progress Step 等
│   ├── provider            # React Query、PostHog、全域 Provider
│   ├── store               # Zustand 狀態 (user、dialog、confetti)
│   ├── apis                # axios helpers 與 React Query Hooks
│   ├── utils               # JWT、Axios instance 等工具
│   └── constants           # 共用常數 (API code、URL、Cache key)
├── middleware.ts           # Content Security Policy 與 nonce 轉傳
├── next.config.mjs         # 圖片白名單、實驗設定、HTTP 標頭
├── .eslintrc.json / prettier.config.js
└── components.json         # shadcn/ui 設定
```

## 核心模組解說

- **Root 首頁 (`src/app/(index)/page.jsx`)**：組合倒數計時、口號、回憶、地址、參戰宣言列表、邀請卡流程與 Q&A，透過
  `ClientOnlyView` 控制僅於瀏覽器載入動畫（如 Confetti）。
- **參戰宣言 (`src/sections/root/declarations`)**：Server Component 抓取
  `BASE_URL` API (`/api/list/getBattleDeclarationList`) 與 CDN
  (`DeclarationsList.json`)；Client 端以跑馬燈方式呈現，並利用 `next`
  revalidate 標籤搭配手動重新整理 API。
- **邀請卡流程 (`src/sections/root/inviteCard`)**：以 PostHog 旗標啟用，含邀請碼驗證、球員資料、宣言提交與完成頁；`useLoginWithInvitationCode`
  綁定 axios helper `axs`，成功後寫入 sessionStorage
  JWT 並以 Zustand 保存使用者資料。
- **商品與支付**：`src/app/products/page.jsx` 讀取
  `/product/list`，點選購買後呼叫 `/api/checkout/intent` Route
  Handler，設定 HttpOnly Cookie 儲存訂單意圖再 303 導向
  `/checkout/pay`；後者在 Server Component 內向 `BASE_URL/api/payment/create`
  送出請求並以 `AutoSubmitForm` 自動表單 POST 至金流。
- **隱私權政策 (`src/sections/privacy/views/privacy-view.jsx`)**：純 RSC 內容頁，展示最新更新日期與政策條款，可另行串接 CMS。

## 整合與資料流

- `src/utils/axios.js` 依執行環境決定 `BASE_URL` /
  `NEXT_PUBLIC_BASE_URL`，並處理 JWT Authorization header 與 Toast 錯誤提示。
- `src/store/user-context.js` 保存登入使用者資料與表單暫存；`setSession`
  會在 token 快到期前觸發登出與導回首頁。
- 宣言與頭像檔自 `URL.BattleListCDN` + `VERSION` 常數組合（`src/constants`）。
- PostHog 初始化於 `src/provider/post-hog-provider.js`，Person
  Profile 僅記錄已識別使用者。

## 安全性與部署注意事項

- Middleware 產生 CSP nonce 並以 `Content-Security-Policy-Report-Only`
  標頭回傳，部署時可視需要改為強制模式。
- `next.config.mjs`
  預設封鎖 iframe、禁用多數瀏覽器能力（Permissions-Policy），建議確保部署平台支援自訂標頭。
- 生產環境請設定 `BASE_URL` 為 HTTPS，並於金流後端回傳正確 `action`、`TradeInfo`
  等欄位供 `/checkout/pay` 自動提交。

## 品質與開發規範

- 程式碼格式由 Prettier 控制 (`proseWrap: always`,
  `semi: false`)；請在提交前執行 `yarn lint`
  以確保匯入排序與 Hooks 規則符合要求。
- Tailwind CSS 4 採用 `@tailwindcss/postcss`；共用樣式集中於
  `src/app/index.css`，並定義 `root` / `wrapper` / `btn-primary` 等公用 class。
- **UI Framework 政策**：僅允許使用 shadcn/ui，詳見
  [UI Framework Policy](./.cursor/rules/ui-framework-policy.mdc)。
- **Material-UI 遷移計劃**：正在進行中，詳見
  [Migration from MUI](./docs/MIGRATION_FROM_MUI.md)。

## 文檔資源

- **開發規範**
  - [AI Development Workflow](./docs/AI_DEVELOPMENT_WORKFLOW.md) -
    AI 協助開發工作流程指南（含 UI 驗證規範）
  - [UI Framework Policy](./.cursor/rules/ui-framework-policy.mdc) -
    UI 組件庫使用政策（僅 shadcn/ui）
  - [Migration from MUI](./docs/MIGRATION_FROM_MUI.md) -
    Material-UI 遷移計劃與進度
- **測試報告**
  - [Checkout Test Report](./docs/CHECKOUT_TEST_REPORT.md)
  - [Products Test Report](./docs/PRODUCTS_TEST_REPORT.md)
  - [Test Execution Report](./docs/TEST_EXECUTION_REPORT.md)
- **功能規格**
  - [Checkout Page Spec](./docs/spec/checkout-page-spec.md)
  - [Products Page Spec](./docs/spec/products-page-spec.md)
  - [Cart Spec](./docs/spec/cart-spec.md)
  - [Login/Signup Spec](./docs/spec/login-page-spec.md)

## 其他備註

- 尚未建立自動化測試，可依需求補上 Playwright / Vitest 等方案。
- 若需擴充多語系，可整合 Next.js i18n 或簡易字串表，現階段語系為繁體中文。
