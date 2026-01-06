## Query String 規範（nuqs）

- **套件**：`nuqs`（已安裝於前端）。
- **規則**：所有查詢參數的讀取、序列化、更新，一律使用 `nuqs`
  提供的 parser／serializer／`useQueryState(s)`，禁止手動 `URLSearchParams` /
  `encodeURIComponent`。
- **Adapter**：已在 `src/app/layout.jsx` 加入 `NuqsAdapter`（Next App
  Router 環境必備），若異動 layout 必須保留。
- **常用模式**：
  - 讀取：`const [next] = useQueryState('next', parseAsString)`。
  - 序列化：`const qs = createSerializer({ orderNumber: parseAsString })({ orderNumber })`，再
    `router.push(\`/checkout?${qs}\`)`。
- **應用案例**：
  - 登入回跳：`/auth/login?next=/cart&resume=checkout` 使用 `createSerializer`
    生成。
  - Checkout orderNumber 導向：`/checkout?orderNumber=...` 使用
    `createSerializer` 生成。

> 更新日期：2026-01-03  
> 負責人：AI 助理（依使用者指示調整）
