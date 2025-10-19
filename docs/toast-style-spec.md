# Toast Style Specification

**版本**: 1.0  
**建立日期**: 2025-10-19  
**負責人**: Paper Hsiao

---

## 1. Toast 目的

- 即時傳達操作結果（成功、錯誤、警告、資訊）
- 保持負擔低：自動消失、不阻斷使用流程
- 與力維盃網站的視覺風格一致（運動、活力、對比強烈）

---

## 2. 位置與行為

| 項目       | 設定                                   |
| ---------- | -------------------------------------- |
| 顯示位置   | 右上角（`top-right`）                  |
| 進出動畫   | 由右滑入、透明度淡出                   |
| 顯示時間   | 預設 3 秒，可配置                      |
| 可否堆疊   | 可以，最多顯示 3 個                    |
| 互動行為   | Hover 暫停倒數、可手動關閉             |
| 無障礙支援 | `role="status"` + `aria-live="polite"` |

---

## 3. 樣式規範

### 3.1 基本結構

```jsx
<div className="flex max-w-[320px] items-center gap-3 rounded-2xl border-2 border-blue-primary bg-white px-5 py-4 font-noto-sans-tc text-blue-primary shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-300 sm:max-w-[360px]">
  <Icon className="flex-shrink-0 size-6" />
  <div className="flex-1">
    <p className="text-sm font-bold leading-tight">標題</p>
    <p className="text-xs text-slate-600 leading-relaxed">內容文字</p>
  </div>
  <button className="size-7 rounded-full border border-blue-primary/40 text-blue-primary/60 hover:text-blue-primary cursor-pointer">
    <DismissIcon />
  </button>
</div>
```

### 3.2 色系定義

| 類型    | 背景色     | 邊框色                | 文字色              | Icon |
| ------- | ---------- | --------------------- | ------------------- | ---- |
| Success | `bg-white` | `border-blue-primary` | `text-blue-primary` | ✅   |
| Error   | `bg-white` | `border-red-500`      | `text-red-600`      | ⚠️   |
| Warning | `bg-white` | `border-orange-500`   | `text-orange-500`   | !    |
| Info    | `bg-white` | `border-blue-400`     | `text-blue-500`     | ℹ️   |

- Toast 採白底，使用品牌色邊框與文字（保持高對比）；陰影使用
  `shadow-[0_12px_30px_rgba(0,0,0,0.1)]`
- 文字採用 `font-noto-sans-tc`，標題 `font-semibold`、內文 `font-medium`
- Icon 建議使用 `lucide-react` 同系列圖示

### 3.3 間距與尺寸

- 外距：`gap-3`，上下 `py-4`、左右 `px-5`
- 圓角：`rounded-2xl`
- Icon 尺寸：`size-6`
- Close 按鈕：`size-7`，邊框 1px 白色 40% 透明度

---

## 4. 使用指引

### 4.1 成功提示

- 使用時機：加入購物車成功、設定儲存成功等
- 建議文案：
  - 標題：`加入成功`
  - 內容：`商品已加入購物車，可於右上角查看` 或依情境調整
- 程式呼叫：

```javascript
import toast from 'react-hot-toast'
import { showSuccessToast } from '@/utils/toast'

toast.custom(t => (
  <SuccessToast
    toastId={t.id}
    title="加入成功"
    description="商品已加入購物車，可於右上角查看"
  />
))
```

### 4.2 錯誤提示

- 使用時機：API 失敗、表單驗證錯誤等
- 建議文案：
  - 標題：`操作失敗`
  - 內容：`請稍後再試或聯絡客服`

### 4.3 警告提示

- 使用時機：庫存不足、即將過期等
- 建議文案：
  - 標題：`注意`
  - 內容：`該商品庫存較低，建議盡快結帳`

### 4.4 資訊提示

- 使用時機：功能導覽、活動通知
- 建議文案：
  - 標題：`小提醒`
  - 內容：`登錄會員可獲得 50 點集點`

---

## 5. React 實作範例

### 5.1 Toast Provider

`src/components/global-components.jsx` 已掛載全域 `Toaster`：

```jsx
<Toaster position="top-right" toastOptions={{ duration: 3000 }} />
```

### 5.2 自訂 Toast 元件建議

建立 `src/components/common/toast/toast-message.jsx`：

```jsx
export function SuccessToast({ toastId, title, description }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border-2 border-green-200 bg-green-500/95 px-5 py-4 text-white shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
      <CheckCircle className="size-6" />
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        {description ? (
          <p className="text-xs text-white/90 leading-relaxed">{description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={() => toast.dismiss(toastId)}
        className="size-7 rounded-full border border-white/40 text-white/80 transition hover:text-white cursor-pointer"
        aria-label="關閉通知"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
```

### 5.3 呼叫方式

```javascript
import toast from 'react-hot-toast'
import { SuccessToast } from '@/components/common/toast/toast-message'

toast.custom(
  t => (
    <SuccessToast
      toastId={t.id}
      title="加入成功"
      description="商品已加入購物車"
      visible={t.visible}
    />
  ),
  {
    duration: 3000,
  },
)
```

---

## 6. 無障礙與國際化

- Toast 元件需加入 `role="status"` 與 `aria-live="polite"`，確保螢幕報讀
- 文字內容必須使用繁體中文，可透過 i18n 管理
- Close 按鈕需有 `aria-label="關閉通知"`

---

## 7. 測試重點

| 項目     | 驗證內容                               |
| -------- | -------------------------------------- |
| 顯示位置 | 於右上角顯示，滾動時仍固定位置         |
| 色彩對比 | 背景與文字對比符合 WCAG AA（4.5:1）    |
| 自動關閉 | 預設 3 秒自動消失，Hover 時暫停計時    |
| 多筆通知 | 同時顯示 3 筆以內不重疊                |
| 手動關閉 | Close 按鈕可立即關閉                   |
| 行為測試 | 成功、錯誤、警告、資訊皆可正常呼叫顯示 |

---

## 8. 版本紀錄

| 版本 | 日期       | 內容         |
| ---- | ---------- | ------------ |
| 1.0  | 2025-10-19 | 初版規格建立 |
