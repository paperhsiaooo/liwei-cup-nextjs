## Checkout Intent / Idempotency 規格

- **目標**：在「前往結帳」流程中，避免重複建立訂單，並支援 401 後登入自動恢復建立訂單。
  - 後端已以 Redis (`clientIntentId`) 實作 idempotency：同 intent 回傳相同 `orderNumber`。

### 前端流程

- 建立訂單時產生 `clientIntentId`（UUID；無 crypto 時以時間戳 + random
  fallback），payload 帶 `{ items, clientIntentId }`。
- 若 API 回傳 401：
  - 將 `{ clientIntentId, ts, from: '/cart' }` 存 `sessionStorage` key
    `pendingCheckoutIntent`。
  - 導向 `/auth/login?next=/cart&resume=checkout`。
- 登入成功後：
  - Login 頁面依 `next` 參數導向（若無則回設定頁）。
  - `/cart` 頁面載入且 user 已登入時，如偵測 `pendingCheckoutIntent`，會以原
    `clientIntentId` 自動重試建立訂單，成功後清除 intent 並跳轉
    `/checkout?orderNumber=...`。
- 建立訂單成功：清除 `pendingCheckoutIntent`。

### 風險與防呆

- 若後端支援 idempotency，應以 `clientIntentId`
  在 Redis/DB 做防重：同 intent 多次請求回傳同一 `orderNumber`。
- 若登入後購物車為空或商品資訊缺失，前端會提示並不送單，同時停用自動重試。
- `pendingCheckoutIntent` 僅暫存在 sessionStorage，避免跨裝置/長時間殘留。

> 更新日期：2026-01-03  
> 負責人：AI 助理（依使用者指示調整）
