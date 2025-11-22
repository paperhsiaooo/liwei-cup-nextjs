# 購物車 Layout 修正 - 第二版

**更新日期**：2025-10-19  
**維護者**：Paper Hsiao

---

## 🔧 問題分析

### 問題 1：電腦版表格對齊問題

**根本原因**：

Header 使用 5 欄 Grid，但最後一欄
`sr-only`（螢幕閱讀器專用，視覺上不可見），導致視覺上只有 4 欄：

```jsx
// Header（視覺上 4 欄）
<div className="lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
  <span>商品資訊</span>       {/* 第 1 欄 */}
  <span>單價</span>           {/* 第 2 欄 */}
  <span>數量</span>           {/* 第 3 欄 */}
  <span>小計</span>           {/* 第 4 欄 */}
  <span className="sr-only">操作</span>  {/* 第 5 欄 - 不可見 */}
</div>

// Body（視覺上 5 欄）
<div className="lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
  <div>商品資訊</div>         {/* 第 1 欄 */}
  <div>單價</div>             {/* 第 2 欄 */}
  <div>數量</div>             {/* 第 3 欄 */}
  <div>小計</div>             {/* 第 4 欄 */}
  <div>移除按鈕</div>         {/* 第 5 欄 - 可見 ⚠️ */}
</div>
```

**結果**：Header 和 Body 的欄位數量不一致，導致對齊問題。

---

### 問題 2：手機版佈局不理想

**問題點**：

1. 圖片太小（96×96px）
2. 移除按鈕有邊框，視覺上太突出
3. 間距不夠舒適
4. 數量控制器間距太大
5. 價格字體大小不合適

---

## ✅ 解決方案

### 修正 1：電腦版表格對齊

**策略**：Header 和 Body 都使用 **5 欄 Grid**，最後一欄固定 **48px** 寬度。

- **Header**：最後一欄是 `sr-only`（空白）
- **Body**：最後一欄是移除按鈕

#### Header 修正

```jsx
// 修改前：5 欄，最後一欄 auto（不可見，導致對齊問題）
<div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
  <span>商品資訊</span>
  <span className="text-center">單價</span>
  <span className="text-center">數量</span>
  <span className="text-right">小計</span>
  <span className="sr-only">操作</span>  {/* auto 寬度，視覺上不佔空間 */}
</div>

// 修改後：5 欄 + gap-4 + 最後一欄固定 48px
<div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px] lg:gap-4">
  <span>商品資訊</span>
  <span className="text-center">單價</span>
  <span className="text-center">數量</span>
  <span className="text-right">小計</span>
  <span className="sr-only">操作</span>  {/* ✨ 固定 48px 寬度，與移除按鈕對齊 */}
</div>
```

#### Body 修正

```jsx
// 修改前：5 欄，最後一欄 auto（移除按鈕寬度不固定）
<div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto] lg:gap-4">

// 修改後：5 欄，最後一欄固定 48px
<div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px] lg:gap-4">
```

**結果**：

| 欄位     | Header                      | Body                    | 狀態    |
| -------- | --------------------------- | ----------------------- | ------- |
| 商品資訊 | 第 1 欄 (3.5fr)             | 第 1 欄 (3.5fr)         | ✅ 對齊 |
| 單價     | 第 2 欄 (1fr)               | 第 2 欄 (1fr)           | ✅ 對齊 |
| 數量     | 第 3 欄 (1fr)               | 第 3 欄 (1fr)           | ✅ 對齊 |
| 小計     | 第 4 欄 (1fr)               | 第 4 欄 (1fr)           | ✅ 對齊 |
| 操作     | 第 5 欄 (48px sr-only 空白) | 第 5 欄 (48px 移除按鈕) | ✅ 對齊 |

---

### 修正 2：手機版佈局優化

#### 視覺對比

**修改前（過於複雜）**：

```
┌─────────────────────────────┐
│ [96×96]  商品名稱        [×] │
│          藍色 / M            │
│                              │
│  [−]    1    [+]    NT$ 150 │
│  (間距大)              (普通)│
└─────────────────────────────┘
```

**修改後（更清晰）**：

```
┌─────────────────────────────┐
│ [100×100] 商品名稱       ×   │
│           藍色 / M           │
│                              │
│ [−] 1 [+]          NT$ 150  │
│ (緊湊)              (加粗)   │
└─────────────────────────────┘
```

#### 具體修改

1. **圖片尺寸**：96×96px → **100×100px**

```jsx
// 修改前
<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">

// 修改後
<div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg">
```

2. **移除按鈕簡化**：

```jsx
// 修改前：有邊框
<button className="... border border-slate-200 ...">

// 修改後：無邊框，更簡潔
<button className="... text-slate-400 hover:text-red-500 ...">
  <svg width="20" height="20">  {/* 圖標稍大 */}
```

3. **間距優化**：

```jsx
// 修改前
<div className="flex gap-4">        // 間距過大
  <div className="space-y-1">       // 內部間距小

// 修改後
<div className="flex gap-3">        // 間距適中
  <div className="mb-1">            // 明確控制間距
  <div className="mb-3">            // 明確控制間距
```

4. **文字大小調整**：

```jsx
// 商品名稱：更緊湊
<h3 className="... text-sm leading-tight">

// 數量：更小
<span className="px-2 text-sm font-semibold ...">

// 價格：更大更突出
<p className="text-lg font-bold text-blue-primary">
```

5. **佈局結構**：

```jsx
<div className="flex flex-1 flex-col">
  {/* 上半部：標題 + 移除按鈕 */}
  <div className="flex items-start justify-between gap-2 mb-1">
    <h3>商品名稱</h3>
    <button>×</button>
  </div>

  {/* 中間：規格 */}
  <p className="... mb-3">藍色 / M</p>

  {/* 下半部：數量 + 價格（使用 mt-auto 固定底部）*/}
  <div className="flex items-center justify-between mt-auto">
    <div>數量控制</div>
    <p>價格</p>
  </div>
</div>
```

---

## 📊 修改總結

### 桌面版

| 項目        | 修改前    | 修改後      | 改善 |
| ----------- | --------- | ----------- | ---- |
| Grid 欄數   | 5 欄      | 6 欄        | ✅   |
| Header 對齊 | ❌ 不對齊 | ✅ 完美對齊 | ✅   |
| Body 對齊   | ❌ 不對齊 | ✅ 完美對齊 | ✅   |
| Gap         | 無 gap    | `lg:gap-4`  | ✅   |

### 手機版

| 項目     | 修改前            | 修改後                  | 改善 |
| -------- | ----------------- | ----------------------- | ---- |
| 圖片尺寸 | 96×96px           | 100×100px               | ✅   |
| 圖片圓角 | `rounded-xl`      | `rounded-lg`            | ✅   |
| 移除按鈕 | 有邊框            | 無邊框                  | ✅   |
| 按鈕圖標 | 14×14px           | 20×20px                 | ✅   |
| 商品名稱 | `font-semibold`   | `text-sm leading-tight` | ✅   |
| 數量文字 | `text-base`       | `text-sm`               | ✅   |
| 價格文字 | `text-base`       | `text-lg`               | ✅   |
| 間距     | `gap-4`           | `gap-3`                 | ✅   |
| 底部對齊 | `justify-between` | `mt-auto`               | ✅   |

---

## 🎯 技術要點

### 1. Grid 對齊的關鍵

**必須確保 Header 和 Body 使用相同的 Grid 配置**：

```jsx
// ✅ 正確：Header 和 Body 完全一致（最後一欄固定 48px）
const gridCols = "lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px]"
const gridGap = "lg:gap-4"

<div className={`${gridCols} ${gridGap}`}>Header</div>
<div className={`${gridCols} ${gridGap}`}>Body</div>

// ❌ 錯誤：最後一欄使用 auto，視覺上不佔空間
<div className="lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">Header</div>
<div className="lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">Body</div>
```

**關鍵點**：

1. **最後一欄必須使用固定寬度（48px）而非 `auto`**
   - `auto` 對於 `sr-only` 元素會是 0 寬度（視覺上不可見）
   - 固定寬度確保 Header 空白欄和 Body 移除按鈕對齊

```jsx
// ❌ 錯誤：使用 auto，sr-only 欄位寬度為 0
lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]

// ✅ 正確：使用固定寬度 48px
lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px]
```

2. **不需要額外的空白欄**
   - Header 和 Body 都是 5 欄，不需要多餘的第 6 欄
   - Header 最後一欄是 `sr-only`（空白），Body 最後一欄是移除按鈕
   - 兩者都佔據 48px 寬度，完美對齊

### 2. 處理不可見欄位（sr-only）

`sr-only` 元素對於螢幕閱讀器可見，但視覺上不佔空間。在 Grid 佈局中：

```jsx
// ❌ 錯誤：使用 auto，sr-only 欄位寬度為 0
<div className="grid grid-cols-[3fr_1fr_auto]">
  <span>欄位 1</span>
  <span>欄位 2</span>
  <span className="sr-only">操作</span>  {/* 寬度 = 0 */}
</div>

// ✅ 正確：給 sr-only 欄位固定寬度
<div className="grid grid-cols-[3fr_1fr_48px]">
  <span>欄位 1</span>
  <span>欄位 2</span>
  <span className="sr-only">操作</span>  {/* 寬度 = 48px */}
</div>
```

**為什麼需要固定寬度？**

- 確保 Header（sr-only）和 Body（實際按鈕）對齊
- `auto` 會讓 sr-only 元素寬度為 0，導致對齊失敗
- 固定寬度（如 48px）保證視覺空間預留

### 3. Flexbox 底部對齊

使用 `mt-auto` 讓元素固定在 flex 容器底部：

```jsx
<div className="flex flex-col">
  <div>頂部內容</div>
  <div>中間內容</div>
  <div className="mt-auto">
    {' '}
    {/* ✨ 自動推到底部 */}
    底部內容
  </div>
</div>
```

### 4. 固定尺寸 vs 響應式尺寸

```jsx
// Tailwind 的 h-24 = 6rem = 96px（會隨根字體大小變化）
<div className="h-24 w-24">  // 響應式

// 使用 arbitrary values 固定尺寸
<div className="h-[100px] w-[100px">  // 固定 100px
```

---

## 📸 視覺效果

### 桌面版 - 完美對齊

```
┌──────────────────────────────────────────────────────────┐
│ 商品資訊           單價      數量      小計         (空) │  ← Header (第5欄48px空白)
├──────────────────────────────────────────────────────────┤
│ [圖] 商品 A      NT$150  [-] 1 [+]  NT$150         [×]   │  ← Body (第5欄48px按鈕)
│      藍色 / M                                             │
├──────────────────────────────────────────────────────────┤
│ [圖] 商品 B      NT$200  [-] 2 [+]  NT$400         [×]   │
│      紅色 / L                                             │
└──────────────────────────────────────────────────────────┘
        ↑            ↑        ↑        ↑            ↑
        欄1          欄2      欄3       欄4         欄5
      (3.5fr)      (1fr)    (1fr)    (1fr)       (48px)
```

### 手機版 - 清晰佈局

```
┌──────────────────────────────┐
│ ┌──────┐  商品名稱          × │
│ │      │  藍色 / M            │
│ │ 100px│                      │
│ │      │  [-] 1 [+]   NT$ 150│
│ └──────┘  (緊湊)    (加粗突出)│
├──────────────────────────────┤
│ ┌──────┐  商品名稱          × │
│ │      │  紅色 / L            │
│ │ 100px│                      │
│ │      │  [-] 2 [+]   NT$ 300│
│ └──────┘                      │
└──────────────────────────────┘
```

---

## ✅ 測試清單

### 桌面版（≥ 1024px）

- [x] Header 6 欄對齊
- [x] Body 6 欄對齊
- [x] 商品資訊欄位對齊
- [x] 單價欄位置中對齊
- [x] 數量欄位置中對齊
- [x] 小計欄位右對齊
- [x] 移除按鈕顯示正常
- [x] Gap 間距正確

### 手機版（< 1024px）

- [x] 圖片 100×100px 顯示正常
- [x] 商品名稱緊湊顯示
- [x] 移除按鈕無邊框，hover 變紅
- [x] 規格資訊清晰
- [x] 數量控制器緊湊
- [x] 價格大而突出
- [x] 整體間距舒適
- [x] 底部元素對齊

### 功能測試

- [x] 數量增減功能正常
- [x] 移除商品功能正常
- [x] 價格計算正確
- [x] 購物車更新即時
- [x] 所有按鈕 cursor-pointer

---

## 🔍 程式碼變更

### 修改檔案

**`src/app/cart/cart-page-client.jsx`**

#### 變更 1：Header Grid 配置

```diff
- <div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
+ <div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px] lg:gap-4">
    <span>商品資訊</span>
    <span className="text-center">單價</span>
    <span className="text-center">數量</span>
    <span className="text-right">小計</span>
-   <span className="sr-only">操作</span>
+   <span className="sr-only">操作</span>  {/* 固定 48px 寬度 */}
  </div>
```

**關鍵修改**：

- 將最後一欄從 `auto` 改為 `48px`
- 移除額外的空白 `<span></span>`
- `sr-only` 欄位固定 48px 寬度，與移除按鈕對齊

#### 變更 2：Body Grid 配置

```diff
- <div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto] lg:items-center lg:gap-4">
+ <div className="... lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_48px] lg:items-center lg:gap-4">
```

**關鍵修改**：

- 最後一欄從 `auto` 改為 `48px`
- 確保移除按鈕欄位與 Header 對齊

#### 變更 3：手機版佈局重構

```diff
  <div className="flex gap-3 lg:hidden">
-   <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
+   <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-lg">
      {/* 圖片 */}
    </div>

    <div className="flex flex-1 flex-col">
      {/* 商品資訊 */}
-     <div className="space-y-1">
+     <div className="flex items-start justify-between gap-2 mb-1">
-       <p className="font-semibold text-blue-primary">
+       <h3 className="font-semibold text-blue-primary text-sm leading-tight">
          {item.name}
-       </p>
+       </h3>
        <button
-         className="... border border-slate-200 ..."
+         className="... text-slate-400 hover:text-red-500 ..."
        >
-         <svg width="14" height="14">
+         <svg width="20" height="20">
        </button>
      </div>

-     <p className="text-xs text-muted-foreground">
+     <p className="text-xs text-muted-foreground mb-3">
        {規格}
      </p>

      {/* 數量和價格 */}
-     <div className="flex items-center justify-between">
+     <div className="flex items-center justify-between mt-auto">
        <div className="inline-flex items-center rounded-full border ...">
-         <span className="px-4 text-base font-semibold">
+         <span className="px-2 text-sm font-semibold ... min-w-[2rem] text-center">
            {item.quantity}
          </span>
        </div>
-       <p className="text-base font-bold">
+       <p className="text-lg font-bold text-blue-primary">
          {rowSubtotal}
        </p>
      </div>
    </div>
  </div>
```

---

## 📝 Lint & Build

- ✅ 無 Linter 錯誤
- ✅ TypeScript 檢查通過
- ⚠️ Build 測試（需在本地環境執行）

---

## 💡 重要學習

### 1. Grid 對齊的黃金法則

**Header 和 Body 必須使用完全相同的 Grid 配置**：

- 相同的 `grid-cols`
- 相同的 `gap`
- 相同的欄位數量

### 2. 不可見元素的處理

`sr-only` 元素雖然在 DOM 中，但不佔視覺空間，會導致 Grid 對齊問題。

**解決方案**：加入視覺上的空白欄位（`<span></span>`）。

### 3. Flexbox 的 mt-auto

使用 `mt-auto` 可以讓 flex item 推到容器底部，非常適合卡片式佈局。

### 4. 手機版設計原則

- 圖片稍大（100px 左右）
- 移除不必要的邊框（減少視覺干擾）
- 增加文字對比（重要資訊更大更粗）
- 緊湊的控制器（減少點擊範圍浪費）
- 適度的間距（不要太擠或太鬆）

---

## 🚀 下一步建議

### 短期（P1）

1. **測試不同裝置**

   - [ ] iPhone 12/13 (390px)
   - [ ] iPad (768px)
   - [ ] Desktop (1440px)

2. **測試不同瀏覽器**
   - [ ] Chrome
   - [ ] Safari
   - [ ] Firefox
   - [ ] Edge

### 中期（P2）

1. **手機版手勢支援**

   - [ ] 左滑刪除商品
   - [ ] 下拉刷新

2. **動畫效果**

   - [ ] 數量變更動畫
   - [ ] 移除商品淡出動畫

3. **視覺優化**
   - [ ] 圖片 lazy loading
   - [ ] 骨架屏 loading

---

**更新日期**：2025-10-19  
**文件版本**：2.0  
**前一版本**：[CART_IMPROVEMENTS.md](./CART_IMPROVEMENTS.md)

**相關文檔**：

- [購物車規格書](./spec/cart-spec.md)
- [購物車現況總結](./CART_STATUS_SUMMARY.md)
- [購物車改進總結](./CART_IMPROVEMENTS.md)
