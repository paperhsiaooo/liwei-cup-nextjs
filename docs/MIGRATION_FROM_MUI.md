# Material-UI 遷移計劃

**建立日期**：2025-10-19  
**優先級**：高  
**負責人**：開發團隊

---

## 🎯 遷移目標

本文檔記錄專案從 Material-UI (MUI) 遷移到 shadcn/ui 的計劃和進度。

---

## 📊 現況分析

### 目前使用 MUI 的檔案

#### 1. React Hook Form 包裝組件

**檔案位置**：

- `src/components/common/hook-form/rhf-select.js` ❌ **使用 MUI Select**

**狀態**：需要遷移

**影響範圍**：

- `src/sections/checkout/components/customer-info-form.jsx` (已遷移 ✅)
- 其他可能使用此組件的頁面

---

## ✅ 已完成遷移

### 1. Checkout 頁面 - 性別選擇下拉選單

**日期**：2025-10-19

**變更內容**：

- ✅ 創建 `RHFShadcnSelect` 組件
- ✅ 更新 `customer-info-form.jsx` 使用新組件
- ✅ 測試通過
- ✅ Build 成功

**檔案**：

- 新增：`src/components/common/hook-form/rhf-shadcn-select.jsx`
- 更新：`src/sections/checkout/components/customer-info-form.jsx`

**相關 Commit**：`feat: migrate checkout gender select from MUI to shadcn/ui`

---

## 📋 待遷移清單

### 優先級 1：立即遷移（新功能頁面）

無待遷移項目

---

### 優先級 2：計劃遷移（現有功能）

#### 1. Profile 頁面

**檔案**：`src/sections/profile/member-profile.jsx`

**使用的 MUI 組件**：

- 需檢查是否使用 MUI 組件

**遷移步驟**：

1. [ ] 檢查檔案內容
2. [ ] 識別使用的 MUI 組件
3. [ ] 安裝對應的 shadcn/ui 組件
4. [ ] 替換組件
5. [ ] 更新樣式為 Tailwind CSS
6. [ ] 測試功能
7. [ ] 執行 lint 和 build 檢查

---

#### 2. Invite Card - Custom Select

**檔案**：`src/sections/root/inviteCard/components/custom-select.jsx`

**狀態**：✅ **已使用 shadcn/ui**

**說明**：此組件已正確使用 shadcn/ui 的 Select 組件，無需遷移。

---

### 優先級 3：遺留組件重構

#### 1. RHFSelect (MUI 版本)

**檔案**：`src/components/common/hook-form/rhf-select.js`

**狀態**：❌ **使用 MUI Select**

**遷移策略**：

- 選項 A：逐步棄用，等待所有使用者遷移到 `RHFShadcnSelect`
- 選項 B：直接重構為使用 shadcn/ui（推薦）

**決策**：選擇 **選項 A**

**原因**：

- 避免影響現有功能
- 新功能統一使用 `RHFShadcnSelect`
- 逐步淘汰舊組件

**待辦事項**：

1. [ ] 搜尋所有使用 `RHFSelect` 的檔案
2. [ ] 評估遷移工作量
3. [ ] 制定遷移時程
4. [ ] 逐一遷移
5. [ ] 刪除 `rhf-select.js`

---

## 🔍 查找使用 MUI 的指令

```bash
# 查找所有引入 @mui/material 的檔案
grep -r "from '@mui/material'" src/

# 查找特定 MUI 組件
grep -r "import.*Select.*from '@mui/material'" src/
grep -r "import.*TextField.*from '@mui/material'" src/
grep -r "import.*Button.*from '@mui/material'" src/

# 查找使用 RHFSelect 的檔案
grep -r "RHFSelect" src/ --include="*.jsx" --include="*.js"
```

---

## 📝 遷移模板

### 步驟 1：創建 shadcn/ui 包裝組件

```jsx
// src/components/common/hook-form/rhf-[component].jsx
'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { [Component] } from '@/components/ui/[component]'

export function RHF[Component]({ name, ...props }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <[Component] {...field} {...props} />
          {error && <span className="text-sm text-red-500">{error.message}</span>}
        </div>
      )}
    />
  )
}
```

### 步驟 2：替換使用

```jsx
// ❌ 舊的方式
import { RHFSelect } from '@/components/common/hook-form/rhf-select'
import { MenuItem } from '@mui/material'
;<RHFSelect name="field">
  {options.map(opt => (
    <MenuItem key={opt.value} value={opt.value}>
      {opt.label}
    </MenuItem>
  ))}
</RHFSelect>

// ✅ 新的方式
import { RHFShadcnSelect } from '@/components/common/hook-form/rhf-shadcn-select'
;<RHFShadcnSelect name="field" options={options} placeholder="請選擇" />
```

### 步驟 3：更新樣式

```jsx
// ❌ 舊的 MUI sx prop
<RHFSelect
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
    },
  }}
/>

// ✅ 新的 Tailwind CSS
<RHFShadcnSelect
  className="rounded-lg border-2 border-slate-300"
/>
```

---

## 🧪 測試檢查清單

每次遷移完成後，必須執行：

- [ ] 功能測試：所有互動正常運作
- [ ] 視覺測試：UI 顯示正確
- [ ] 響應式測試：各螢幕尺寸正常
- [ ] 無障礙測試：鍵盤導航、螢幕閱讀器
- [ ] 單元測試：相關測試通過
- [ ] Lint 檢查：`npm run lint`
- [ ] Build 檢查：`npm run build`

---

## 📈 進度追蹤

| 組件                     | 狀態      | 完成日期   | 負責人       |
| ------------------------ | --------- | ---------- | ------------ |
| Checkout - Gender Select | ✅ 完成   | 2025-10-19 | AI Assistant |
| Profile Page             | ⏳ 待檢查 | -          | -            |
| RHFSelect 使用者遷移     | 📋 計劃中 | -          | -            |
| RHFSelect 組件移除       | 📋 計劃中 | -          | -            |

---

## 🎯 最終目標

- [ ] 移除所有 MUI 依賴
- [ ] 統一使用 shadcn/ui
- [ ] 更新 package.json 移除 `@mui/material`
- [ ] 更新文檔
- [ ] 團隊培訓

---

## 📚 相關文檔

- [UI Framework Policy](../.cursor/rules/ui-framework-policy.mdc)
- [shadcn/ui 官方文檔](https://ui.shadcn.com/)
- [Checkout UI Redesign Report](./CHECKOUT_UI_REDESIGN_REPORT.md)

---

**最後更新**：2025-10-19  
**下次審查日期**：2025-11-19
