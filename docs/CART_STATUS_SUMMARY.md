# 購物車功能現況總結

**建立日期**：2025-10-19  
**維護者**：Paper Hsiao

---

## 📊 問題一：翻譯更新狀態

### ✅ 已完成翻譯更新

所有購物車相關的英文已翻譯為繁體中文：

#### 購物車頁面 (`src/app/cart/cart-page-client.jsx`)

| 原英文                       | 繁體中文          | 位置         |
| ---------------------------- | ----------------- | ------------ |
| Shopping Cart                | 購物車            | 主標題       |
| Your Shopping Cart is empty. | 您的購物車是空的  | 空狀態提示   |
| Shopping Cart (X items)      | 購物車 (X 項商品) | 商品列表標題 |
| Product Information          | 商品資訊          | 表格標題     |
| Unit Price                   | 單價              | 表格標題     |
| QTY                          | 數量              | 表格標題     |
| Subtotal                     | 小計              | 表格標題     |
| Actions                      | 操作              | 表格標題     |
| Order Summary                | 訂單摘要          | 側邊欄標題   |
| Item Subtotal                | 商品小計          | 價格明細     |
| Delivery Fee                 | 運費              | 價格明細     |
| Total                        | 總計              | 價格明細     |
| Proceed to Checkout          | 前往結帳          | 結帳按鈕     |

#### 購物車抽屜 (`src/components/cart/cart-drawer.jsx`)

| 原英文                       | 繁體中文         | 位置       |
| ---------------------------- | ---------------- | ---------- |
| Shopping Cart                | 購物車           | 抽屜標題   |
| Your Shopping Cart is empty. | 您的購物車是空的 | 空狀態提示 |
| Checkout                     | 前往結帳         | 結帳按鈕   |

### 📚 翻譯對照文件

已建立完整的翻譯對照表：`docs/TRANSLATION_GUIDE.md`

包含：

- 完整的英中對照表
- 實作範例（正確 ✅ 和錯誤 ❌ 對比）
- Aria labels 翻譯
- 檢查清單

---

## 🛒 問題二：購物車是否支援多商品？

### ✅ 是的，購物車**完全支援**多商品

#### 1. 購物車狀態管理 (Zustand Store)

**檔案**：`src/store/cart-context.js`

購物車使用 Zustand 管理狀態，完全支援多商品：

```javascript
{
  items: [
    {
      id: 'product-1::藍色::M',
      productId: 'product-1',
      name: '商品 A',
      price: 150,
      quantity: 2,
      color: '藍色',
      size: 'M',
    },
    {
      id: 'product-2::紅色::L',
      productId: 'product-2',
      name: '商品 B',
      price: 200,
      quantity: 1,
      color: '紅色',
      size: 'L',
    },
  ]
}
```

**支援的操作**：

- ✅ `addItem()` - 加入多個不同商品
- ✅ `removeItem()` - 移除指定商品
- ✅ `incrementItem()` - 增加商品數量
- ✅ `decrementItem()` - 減少商品數量
- ✅ `updateQuantity()` - 更新商品數量
- ✅ `clear()` - 清空購物車
- ✅ `getCount()` - 取得商品總數

#### 2. 購物車 ID 策略

**唯一識別碼生成**：

```javascript
const createCartKey = ({ productId, color, size }) =>
  [productId ?? '', color ?? '', size ?? ''].join('::')
```

**優點**：

- 相同商品不同規格（顏色、尺寸）會被視為不同項目
- 相同商品相同規格會累加數量
- 避免購物車項目衝突

**範例**：

```
product-1::藍色::M     ← 商品 1，藍色，M 尺寸
product-1::紅色::M     ← 商品 1，紅色，M 尺寸（不同項目）
product-1::藍色::L     ← 商品 1，藍色，L 尺寸（不同項目）
product-2::黃色::      ← 商品 2，黃色，無尺寸
```

#### 3. 購物車頁面展示

**檔案**：`src/app/cart/cart-page-client.jsx`

購物車頁面使用 `items.map()` 渲染所有商品：

```jsx
{
  items.map(item => {
    const rowSubtotal = formatCurrencyNT(item.price * item.quantity)
    return <article key={item.id}>{/* 商品資訊、數量控制、小計 */}</article>
  })
}
```

**價格計算**：

```javascript
// 商品總數（數量總和）
const itemCount = useMemo(
  () => items.reduce((total, item) => total + item.quantity, 0),
  [items],
)

// 商品總價
const subtotal = useMemo(
  () => items.reduce((total, item) => total + item.price * item.quantity, 0),
  [items],
)
```

#### 4. 購物車抽屜展示

**檔案**：`src/components/cart/cart-drawer.jsx`

抽屜同樣支援多商品展示：

```jsx
{
  items.map(item => <article key={item.id}>{/* 簡化版商品資訊 */}</article>)
}
```

#### 5. LocalStorage 持久化

**Storage Key**: `liwei-cart`

購物車資料會自動儲存到 LocalStorage，支援多商品持久化：

```json
{
  "state": {
    "items": [
      { "id": "...", "productId": "...", ... },
      { "id": "...", "productId": "...", ... },
      { "id": "...", "productId": "...", ... }
    ]
  }
}
```

---

## ⚠️ 重要發現：結帳流程的限制

雖然購物車**完全支援多商品**，但結帳流程有重要限制：

### ❌ 問題 1：缺少 `/checkout` 頁面

**現況**：

- 購物車頁面點擊「前往結帳」會導向 `/checkout`
- **這個頁面不存在**（會顯示 404）

**影響**：

- 使用者無法從購物車進入結帳流程
- 多商品購物車功能無法完整使用

### ❌ 問題 2：API 只支援單一商品

**現況**：

- `/api/checkout/intent` 只接受單一商品格式：

```javascript
{
  "productId": "product-1",
  "quantity": 2,
  "email": "user@example.com",
  "color": "藍色",
  "size": "M"
}
```

- **不支援多商品陣列**

**影響**：

- 即使建立了 `/checkout` 頁面，後端也無法處理多商品訂單
- 需要修改 API 來支援多商品結帳

---

## 🔧 解決方案建議

### Phase 1：建立 `/checkout` 頁面（優先 P0）

建立 `src/app/checkout/page.jsx`：

1. **讀取購物車內容**

   - 從 Zustand Store 讀取 `items`
   - 顯示訂單摘要

2. **收集收件人資訊**

   - 姓名、電話、電子郵件
   - 收件地址
   - 使用 React Hook Form + Zod 驗證

3. **確認訂單**
   - 顯示所有商品
   - 顯示總金額
   - 提供「確認並付款」按鈕

### Phase 2：修改結帳 API（優先 P0）

修改 `/api/checkout/intent` 支援多商品：

**修改前（單一商品）**：

```javascript
POST /api/checkout/intent
{
  "productId": "product-1",
  "quantity": 2,
  "email": "user@example.com",
  "color": "藍色",
  "size": "M"
}
```

**修改後（多商品）**：

```javascript
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
  "customerInfo": {
    "name": "王小明",
    "email": "user@example.com",
    "phone": "0912345678",
    "address": "台北市信義區..."
  }
}
```

### Phase 3：整合付款流程（優先 P0）

1. **修改 `/checkout/pay` 頁面**

   - 支援多商品訂單
   - 計算總金額
   - 生成付款表單

2. **更新 AutoSubmitForm**
   - 支援多商品付款資訊
   - 傳遞正確的訂單資料

### Phase 4：測試與優化（優先 P1）

1. **整合測試**

   - 測試多商品加入購物車
   - 測試多商品結帳流程
   - 測試付款流程

2. **錯誤處理**
   - 商品庫存檢查
   - 價格變動處理
   - API 錯誤處理

---

## 📋 總結

### ✅ 已支援功能

1. **購物車狀態管理** - 完全支援多商品
2. **購物車頁面** - 可展示多個商品
3. **購物車抽屜** - 可展示多個商品
4. **數量管理** - 可調整每個商品的數量
5. **價格計算** - 正確計算多商品總價
6. **持久化** - LocalStorage 儲存多商品

### ❌ 需要開發功能

1. **結帳頁面** (`/checkout`) - **目前不存在**
2. **多商品結帳 API** - **目前只支援單一商品**
3. **收件人資訊表單** - **尚未實作**
4. **多商品付款流程** - **尚未實作**

### 🎯 結論

**購物車本身完全支援多商品**，但結帳流程還需要開發。目前的狀態：

- ✅ 使用者可以加入多個商品到購物車
- ✅ 使用者可以在購物車頁面看到所有商品
- ✅ 使用者可以調整每個商品的數量
- ❌ 使用者**無法**從購物車進入結帳（頁面 404）
- ❌ 使用者**無法**完成多商品訂單購買

---

## 🚀 下一步行動

建議優先開發順序：

1. **立即處理（P0）**：

   - [ ] 建立 `/checkout` 頁面
   - [ ] 修改結帳 API 支援多商品
   - [ ] 建立收件人資訊表單

2. **高優先級（P1）**：

   - [ ] 整合付款流程
   - [ ] 商品庫存檢查
   - [ ] 價格變動處理

3. **中優先級（P2）**：
   - [ ] 優惠券功能
   - [ ] 購物車商品推薦
   - [ ] 運費計算

---

**文件建立日期**：2025-10-19  
**相關文檔**：

- [購物車規格書](./spec/cart-spec.md)
- [翻譯對照表](./TRANSLATION_GUIDE.md)
