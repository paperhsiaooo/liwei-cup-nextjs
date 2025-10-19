# 購物車翻譯對照表

## 英文 → 繁體中文翻譯

以下是購物車相關的翻譯對照表，請在實際開發時使用繁體中文版本：

### 主要介面文字

| 英文                         | 繁體中文         | 使用位置           |
| ---------------------------- | ---------------- | ------------------ |
| Shopping Cart                | 購物車           | 頁面標題、抽屜標題 |
| Order Summary                | 訂單摘要         | 結帳摘要區塊標題   |
| Item Subtotal                | 商品小計         | 價格明細           |
| Delivery Fee                 | 運費             | 價格明細           |
| Total                        | 總計             | 價格明細           |
| Proceed to Checkout          | 前往結帳         | 主要結帳按鈕       |
| Checkout                     | 前往結帳         | 抽屜結帳按鈕       |
| Product Information          | 商品資訊         | 表格標題（桌面版） |
| Unit Price                   | 單價             | 表格標題（桌面版） |
| QTY (Quantity)               | 數量             | 表格標題（桌面版） |
| Subtotal                     | 小計             | 表格標題（桌面版） |
| Your Shopping Cart is empty. | 您的購物車是空的 | 空狀態提示         |

### 輔助文字

| 英文        | 繁體中文   | 使用位置         |
| ----------- | ---------- | ---------------- |
| (3 items)   | (3 項商品) | 購物車標題       |
| Actions     | 操作       | 表格標題（隱藏） |
| Add to Cart | 加入購物車 | 商品詳情頁按鈕   |
| Remove      | 移除       | 移除按鈕 aria    |

### Aria Label 翻譯

| 英文                | 繁體中文   | 使用位置     |
| ------------------- | ---------- | ------------ |
| Increase quantity   | 增加數量   | + 按鈕 aria  |
| Decrease quantity   | 減少數量   | - 按鈕 aria  |
| Remove this item    | 移除此商品 | × 按鈕 aria  |
| Open shopping cart  | 開啟購物車 | Header 圖標  |
| Close shopping cart | 關閉購物車 | 抽屜關閉按鈕 |

---

## 實作範例

### 購物車頁面 (CartPageClient)

```jsx
// ❌ 錯誤：使用英文
<h1 className="font-anton text-4xl text-blue-primary">
  Shopping Cart
</h1>

// ✅ 正確：使用繁體中文
<h1 className="font-anton text-4xl text-blue-primary">
  購物車
</h1>
```

### 表格標題

```jsx
// ❌ 錯誤：使用英文
<div className="hidden border-b px-6 py-3 text-sm font-semibold text-slate-500 lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
  <span>Product Information</span>
  <span className="text-center">Unit Price</span>
  <span className="text-center">QTY</span>
  <span className="text-right">Subtotal</span>
  <span className="sr-only">Actions</span>
</div>

// ✅ 正確：使用繁體中文
<div className="hidden border-b px-6 py-3 text-sm font-semibold text-slate-500 lg:grid lg:grid-cols-[minmax(0,3.5fr)_1fr_1fr_1fr_auto]">
  <span>商品資訊</span>
  <span className="text-center">單價</span>
  <span className="text-center">數量</span>
  <span className="text-right">小計</span>
  <span className="sr-only">操作</span>
</div>
```

### 訂單摘要

```jsx
// ❌ 錯誤：使用英文
<div className="border-b pb-4">
  <h2 className="font-anton text-xl text-blue-primary">
    Order Summary
  </h2>
</div>

<div className="space-y-3 text-sm font-noto-sans-tc text-slate-600">
  <div className="flex items-center justify-between">
    <span>Item Subtotal</span>
    <span className="font-semibold text-blue-primary">
      {formatCurrencyNT(subtotal) || 'NT$ 0'}
    </span>
  </div>
  <div className="flex items-center justify-between">
    <span>Delivery Fee</span>
    <span className="text-muted-foreground">NT$ 0</span>
  </div>
  <div className="flex items-center justify-between pt-2 text-base font-semibold text-blue-primary">
    <span>Total</span>
    <span>{formatCurrencyNT(subtotal) || 'NT$ 0'}</span>
  </div>
</div>

// ✅ 正確：使用繁體中文
<div className="border-b pb-4">
  <h2 className="font-anton text-xl text-blue-primary">
    訂單摘要
  </h2>
</div>

<div className="space-y-3 text-sm font-noto-sans-tc text-slate-600">
  <div className="flex items-center justify-between">
    <span>商品小計</span>
    <span className="font-semibold text-blue-primary">
      {formatCurrencyNT(subtotal) || 'NT$ 0'}
    </span>
  </div>
  <div className="flex items-center justify-between">
    <span>運費</span>
    <span className="text-muted-foreground">NT$ 0</span>
  </div>
  <div className="flex items-center justify-between pt-2 text-base font-semibold text-blue-primary">
    <span>總計</span>
    <span>{formatCurrencyNT(subtotal) || 'NT$ 0'}</span>
  </div>
</div>
```

### 結帳按鈕

```jsx
// ❌ 錯誤：使用英文
<Button
  className="w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
  onClick={() => router.push('/checkout')}
>
  Proceed to Checkout
</Button>

// ✅ 正確：使用繁體中文
<Button
  className="w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
  onClick={() => router.push('/checkout')}
>
  前往結帳
</Button>
```

### 空狀態

```jsx
// ❌ 錯誤：使用英文
<div className="flex flex-col items-center gap-6 py-16 text-center">
  <h1 className="font-anton text-4xl text-blue-primary">
    Shopping Cart
  </h1>
  <p className="font-noto-sans-tc text-muted-foreground">
    Your Shopping Cart is empty.
  </p>
  <Button asChild className="bg-blue-primary text-white hover:bg-blue-primary/90">
    <Link href="/products">發現好物</Link>
  </Button>
</div>

// ✅ 正確：使用繁體中文
<div className="flex flex-col items-center gap-6 py-16 text-center">
  <h1 className="font-anton text-4xl text-blue-primary">
    購物車
  </h1>
  <p className="font-noto-sans-tc text-muted-foreground">
    您的購物車是空的
  </p>
  <Button asChild className="bg-blue-primary text-white hover:bg-blue-primary/90">
    <Link href="/products">發現好物</Link>
  </Button>
</div>
```

### 購物車抽屜

```jsx
// ❌ 錯誤：使用英文
<DrawerTitle className="text-xl font-anton text-blue-primary">
  Shopping Cart
</DrawerTitle>

// 空狀態
<p className="py-24 text-center text-sm text-muted-foreground">
  Your Shopping Cart is empty.
</p>

// 結帳按鈕
<Button
  className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
  onClick={handleCheckoutClick}
>
  Checkout
</Button>

// ✅ 正確：使用繁體中文
<DrawerTitle className="text-xl font-anton text-blue-primary">
  購物車
</DrawerTitle>

// 空狀態
<p className="py-24 text-center text-sm text-muted-foreground">
  您的購物車是空的
</p>

// 結帳按鈕
<Button
  className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90"
  onClick={handleCheckoutClick}
>
  前往結帳
</Button>
```

### Aria Labels

```jsx
// ❌ 錯誤：使用英文
<button
  type="button"
  onClick={() => incrementItem(item.id)}
  className="..."
  aria-label="Increase quantity"
>
  +
</button>

<button
  type="button"
  onClick={() => decrementItem(item.id)}
  className="..."
  aria-label="Decrease quantity"
>
  −
</button>

<button
  type="button"
  onClick={() => removeItem(item.id)}
  aria-label="Remove this item"
  className="..."
>
  ×
</button>

// ✅ 正確：使用繁體中文
<button
  type="button"
  onClick={() => incrementItem(item.id)}
  className="..."
  aria-label="增加數量"
>
  +
</button>

<button
  type="button"
  onClick={() => decrementItem(item.id)}
  className="..."
  aria-label="減少數量"
>
  −
</button>

<button
  type="button"
  onClick={() => removeItem(item.id)}
  aria-label="移除此商品"
  className="..."
>
  ×
</button>
```

---

## 注意事項

1. **保持一致性**：整個專案都應使用繁體中文，除非是品牌名稱或技術術語。

2. **使用者友善**：繁體中文更符合台灣使用者的閱讀習慣。

3. **無障礙性**：Aria labels 也應使用繁體中文，讓螢幕閱讀器能正確朗讀。

4. **測試代碼**：測試代碼中的文字斷言也應更新為繁體中文。

5. **字體設定**：繁體中文文字應使用 `font-noto-sans-tc` 類別。

---

## 檢查清單

在提交程式碼前，請確認：

- [ ] 所有使用者可見的文字都使用繁體中文
- [ ] Aria labels 使用繁體中文
- [ ] 測試代碼中的文字斷言更新為繁體中文
- [ ] 空狀態訊息使用繁體中文
- [ ] 按鈕文字使用繁體中文
- [ ] 表格標題使用繁體中文
- [ ] 錯誤訊息使用繁體中文
- [ ] 成功訊息使用繁體中文

---

**更新日期**：2025-10-19  
**維護者**：Paper Hsiao
