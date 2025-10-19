# 註冊頁面功能規格書

# Signup Page Specification

**版本 (Version)**: 1.0  
**建立日期 (Created Date)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Draft

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者透過 Email 和密碼註冊新帳號的功能，支援邀請碼優惠機制。

### 1.2 使用者故事 (User Stories)

**US-1: 使用者註冊**

> 作為一個**新用戶**，我想要使用 Email 和密碼註冊帳號，以便使用網站的完整功能。

**US-2: 邀請碼註冊優惠**

> 作為一個**有邀請碼的用戶**，我想要在註冊時輸入邀請碼，以便獲得特殊折扣和紀錄。

**US-3: 密碼安全**

> 作為一個**用戶**，我想要知道我的密碼強度，並能切換顯示/隱藏密碼，以確保帳號安全。

**US-4: 密碼確認**

> 作為一個**用戶**，我想要再次輸入密碼確認，以避免因打錯而無法登入。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ Email + 密碼 + 邀請碼（選填）註冊頁面 (`/auth/signup`)
- ✅ 表單驗證（Email 格式、密碼長度、密碼複雜度、確認密碼一致性）
- ✅ 密碼強度指示器
- ✅ 顯示/隱藏密碼功能
- ✅ 錯誤處理與提示訊息
- ✅ 註冊成功後導向個人資料頁面
- ✅ PostHog 追蹤

#### 不包含功能 (Out of Scope)

- ❌ Email 驗證機制（未來版本）
- ❌ 第三方註冊（Google, Line 等）
- ❌ 手機號碼註冊
- ❌ 登入功能（見 `login-page-spec.md`）

### 1.4 與現有系統的關係

**邀請碼註冊優惠機制**

- 註冊時可選填邀請碼
- 有填寫邀請碼的用戶會在後端記錄關聯
- 後端會提供特殊折扣（由後端處理）
- **邀請碼無效不會阻擋註冊**（顯示錯誤但仍可完成註冊）

**與 Email/密碼登入整合**

- 註冊成功後即完成登入
- 共用相同的用戶系統和 User Store
- Token 機制與登入頁面一致

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑           | 檔案位置                                | 說明             |
| -------------- | -------------- | --------------------------------------- | ---------------- |
| 註冊頁面       | `/auth/signup` | `src/app/auth/signup/page.jsx`          | Email 密碼註冊   |
| 註冊客戶端組件 | -              | `src/app/auth/signup/signup-client.jsx` | Client Component |

### 2.2 檔案結構

```
src/
├── app/
│   └── auth/
│       └── signup/
│           ├── page.jsx                    # 註冊頁面入口（Server Component）
│           └── signup-client.jsx           # 註冊客戶端組件
├── sections/
│   └── auth/
│       ├── views/
│       │   ├── signup-view.jsx             # 註冊視圖組件
│       │   └── index.js                    # 導出
│       ├── components/
│       │   ├── password-input.jsx          # 密碼輸入組件（顯示/隱藏）
│       │   ├── password-strength.jsx       # 密碼強度指示器
│       │   └── auth-card.jsx               # 認證卡片容器（共用）
│       ├── hook/
│       │   └── use-signup-form.js          # 註冊表單邏輯
│       └── schema/
│           └── signup-schema.js            # 註冊表單驗證
├── apis/
│   └── hook/
│       └── use-auth.js                     # 認證相關 API hooks
└── routers/
    └── path.js                             # 更新路由常數
```

### 2.3 狀態管理

**User Store (Zustand)**

- 使用現有的 `useUserContext` (`src/store/user-context.js`)
- 註冊成功後呼叫 `loginSuccess(data)` 更新狀態
- Token 儲存於 `sessionStorage` (key: `STORAGE_KEY` from `@/constants/jwt`)

```javascript
// 註冊成功後的狀態更新
loginSuccess({
  name: data.name,
  email: data.email,
  nick_name: data.nick_name,
  role: data.role,
  has_invitation_code: Boolean(invitationCode),
  // ... 其他用戶資料
})
```

### 2.4 API 端點

**註冊 API**

| 端點               | 方法 | 說明           | 回傳格式                                      |
| ------------------ | ---- | -------------- | --------------------------------------------- |
| `/api/auth/signup` | POST | Email 密碼註冊 | `{ token, data: { name, email, role, ... } }` |

**Request Body**:

```json
{
  "email": "newuser@example.com",
  "password": "Password123",
  "invitation_code": "ABC123" // 選填
}
```

**Response (成功)**:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_124",
      "email": "newuser@example.com",
      "name": "",
      "nick_name": "",
      "role": "user",
      "has_invitation_code": true,
      "is_participating": false,
      "is_checked_in": false
    }
  }
}
```

**Response (失敗 - Email 已註冊)**:

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "此 Email 已被註冊"
  }
}
```

**Response (失敗 - 邀請碼無效)**:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INVITATION_CODE",
    "message": "邀請碼無效或已過期"
  }
}
```

### 2.5 表單驗證規則

```javascript
// src/sections/auth/schema/signup-schema.js
import { z } from 'zod'

export const signupSchema = z
  .object({
    email: z.string().min(1, '請輸入 Email').email('請輸入有效的 Email'),

    password: z
      .string()
      .min(8, '密碼至少需要 8 個字元')
      .regex(/[A-Z]/, '密碼需包含至少一個大寫字母')
      .regex(/[a-z]/, '密碼需包含至少一個小寫字母')
      .regex(/[0-9]/, '密碼需包含至少一個數字'),

    confirmPassword: z.string().min(1, '請確認密碼'),

    invitationCode: z.string().optional(), // 選填
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '兩次輸入的密碼不一致',
    path: ['confirmPassword'],
  })

export const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  invitationCode: '',
}
```

---

## 3. UI/UX 規格

### 3.1 設計風格

**遵循專案設計系統**

- ✅ 運動風格（粗邊框 `border-8`、粗體字 `font-bold`）
- ✅ 藍綠橘配色（`blue-primary`, `green-primary`, `orange-primary`）
- ✅ 卡片式設計居中
- ✅ 響應式設計（手機優先）

### 3.2 註冊頁面 UI

```
┌─────────────────────────────────────────┐
│          力維盃 2025 註冊                 │
│                                         │
│  Email                                  │
│  ┌───────────────────────────────────┐ │
│  │ example@email.com                 │ │
│  └───────────────────────────────────┘ │
│                                         │
│  密碼                                    │
│  ┌───────────────────────────────┬─┐   │
│  │ ••••••••                      │👁│   │
│  └───────────────────────────────┴─┘   │
│  密碼強度: ▓▓▓░░ 中等                     │
│                                         │
│  確認密碼                                 │
│  ┌───────────────────────────────┬─┐   │
│  │ ••••••••                      │👁│   │
│  └───────────────────────────────┴─┘   │
│                                         │
│  邀請碼（選填）                           │
│  ┌───────────────────────────────────┐ │
│  │ ABC123                            │ │
│  └───────────────────────────────────┘ │
│  💡 有邀請碼可享特殊優惠！                  │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │         註冊                       │ │ ← 主按鈕 (blue-primary)
│  └───────────────────────────────────┘ │
│                                         │
│  已有帳號？ [立即登入]                     │
│                                         │
└─────────────────────────────────────────┘
```

### 3.3 組件規格

#### 3.3.1 PasswordInput 組件（共用）

**功能**：

- 密碼輸入框
- 顯示/隱藏密碼切換按鈕（眼睛 icon）

**Props**：

```typescript
{
  name: string           // RHF field name
  placeholder?: string   // 預設: "請輸入密碼"
  label?: string         // 欄位標籤
  showStrength?: boolean // 是否顯示強度指示器
}
```

**使用範例**：

```jsx
<PasswordInput
  name="password"
  label="密碼"
  placeholder="請輸入密碼"
  showStrength={true}
/>
```

#### 3.3.2 PasswordStrength 組件

**功能**：

- 顯示密碼強度（弱/中/強）
- 根據密碼複雜度計算強度

**強度計算邏輯**：

```javascript
function calculatePasswordStrength(password) {
  let score = 0

  if (password.length >= 8) score++ // 基本長度
  if (password.length >= 12) score++ // 較長
  if (/[a-z]/.test(password)) score++ // 小寫字母
  if (/[A-Z]/.test(password)) score++ // 大寫字母
  if (/[0-9]/.test(password)) score++ // 數字
  if (/[^A-Za-z0-9]/.test(password)) score++ // 特殊符號

  if (score <= 2) return { level: 'weak', label: '弱', color: 'red' }
  if (score <= 4) return { level: 'medium', label: '中等', color: 'orange' }
  return { level: 'strong', label: '強', color: 'green' }
}
```

**視覺呈現**：

```jsx
// 弱
<div className="flex items-center gap-2">
  <div className="flex gap-1">
    <div className="w-8 h-2 bg-red-500 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
  </div>
  <span className="text-red-500 text-sm">弱</span>
</div>

// 中等
<div className="flex items-center gap-2">
  <div className="flex gap-1">
    <div className="w-8 h-2 bg-orange-500 rounded" />
    <div className="w-8 h-2 bg-orange-500 rounded" />
    <div className="w-8 h-2 bg-orange-500 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
    <div className="w-8 h-2 bg-gray-200 rounded" />
  </div>
  <span className="text-orange-500 text-sm">中等</span>
</div>

// 強
<div className="flex items-center gap-2">
  <div className="flex gap-1">
    <div className="w-8 h-2 bg-green-500 rounded" />
    <div className="w-8 h-2 bg-green-500 rounded" />
    <div className="w-8 h-2 bg-green-500 rounded" />
    <div className="w-8 h-2 bg-green-500 rounded" />
    <div className="w-8 h-2 bg-green-500 rounded" />
  </div>
  <span className="text-green-500 text-sm">強</span>
</div>
```

**Props**：

```typescript
{
  password: string       // 密碼值
  className?: string     // 自訂樣式
}
```

#### 3.3.3 AuthCard 組件（共用）

**功能**：

- 認證頁面的卡片容器
- 統一樣式和佈局

**Props**：

```typescript
{
  title: string // 卡片標題
  children: ReactNode // 表單內容
}
```

### 3.4 錯誤訊息顯示

**位置**：欄位下方或表單底部，紅色文字  
**樣式**：`text-red-600 text-sm mt-2`

**錯誤訊息對照表**：

| 錯誤情境       | 訊息內容                           | 顯示位置         |
| -------------- | ---------------------------------- | ---------------- |
| Email 格式錯誤 | "請輸入有效的 Email"               | Email 欄位下方   |
| 密碼長度不足   | "密碼至少需要 8 個字元"            | 密碼欄位下方     |
| 密碼缺少大寫   | "密碼需包含至少一個大寫字母"       | 密碼欄位下方     |
| 密碼缺少小寫   | "密碼需包含至少一個小寫字母"       | 密碼欄位下方     |
| 密碼缺少數字   | "密碼需包含至少一個數字"           | 密碼欄位下方     |
| 密碼不一致     | "兩次輸入的密碼不一致"             | 確認密碼欄位下方 |
| Email 已被註冊 | "此 Email 已被註冊，請直接登入"    | 表單底部         |
| 邀請碼無效     | "邀請碼無效或已過期（不影響註冊）" | 邀請碼欄位下方   |
| 網路錯誤       | "網路連線異常，請稍後再試"         | 表單底部         |

### 3.5 提示訊息

**邀請碼提示**：

- 位置：邀請碼欄位下方
- 樣式：`text-blue-primary text-sm mt-1`
- 內容：💡 有邀請碼可享特殊優惠！

### 3.6 Loading 狀態

**按鈕 Loading**：

```jsx
<button disabled={isPending} className="...">
  {isPending ? <Loader /> : '註冊'}
</button>
```

### 3.7 成功提示

**註冊成功後**：

- 顯示簡短的歡迎訊息（1 秒）
- 自動導向 `/settings/profile`

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 使用者註冊

**優先級**: 🔴 P0 (Critical)

**前置條件**：

- 無（任何人都可註冊）

**操作流程**：

1. 使用者進入 `/auth/signup` 頁面
2. 輸入 Email、密碼、確認密碼
3. （選填）輸入邀請碼
4. 系統即時顯示密碼強度
5. 點擊「註冊」按鈕
6. 系統驗證表單資料（前端驗證）
7. 呼叫 `/api/auth/signup` API
8. 後端處理：
   - 檢查 Email 是否已註冊
   - 驗證邀請碼（如有填寫）
   - 建立用戶帳號
   - 紀錄邀請碼關聯（如有）
9. 儲存 token 至 sessionStorage
10. 更新 Zustand user store
11. PostHog identify 使用者
12. 顯示歡迎訊息
13. 導向 `/settings/profile`

**例外處理**：

- Email 已被註冊 → 顯示錯誤訊息，提示前往登入
- 邀請碼無效 → 顯示警告訊息，但不阻擋註冊
- 網路錯誤 → 顯示錯誤訊息，允許重試

**成功條件**：

- ✅ 帳號成功建立
- ✅ Token 成功儲存於 sessionStorage
- ✅ User store 正確更新
- ✅ 成功導向個人資料頁面
- ✅ PostHog 正確追蹤

---

### FR-2: 密碼強度指示

**優先級**: 🟡 P1 (High)

**功能說明**：

- 即時計算並顯示密碼強度
- 使用視覺化進度條 + 文字標示
- 顏色區分強度（紅/橘/綠）

**觸發時機**：

- onChange: 密碼欄位輸入時即時更新

**計算邏輯**（詳見 3.3.2）：

- 弱 (1-2 分): 僅滿足最小長度
- 中 (3-4 分): 包含大小寫 + 數字
- 強 (5-6 分): 包含大小寫 + 數字 + 特殊符號

**成功條件**：

- ✅ 密碼輸入時即時更新
- ✅ 視覺呈現清晰易懂
- ✅ 不影響表單提交

---

### FR-3: 密碼顯示/隱藏

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 密碼和確認密碼預設為隱藏狀態（••••）
2. 點擊眼睛 icon 切換顯示/隱藏
3. 顯示狀態顯示明文密碼
4. 再次點擊切換回隱藏狀態
5. 兩個密碼欄位獨立控制

**成功條件**：

- ✅ 預設為隱藏狀態
- ✅ 點擊後正確切換
- ✅ Icon 隨狀態變化
- ✅ 兩個欄位獨立控制

---

### FR-4: 確認密碼驗證

**優先級**: 🔴 P0 (Critical)

**驗證規則**：

- 確認密碼必須與密碼相同

**驗證時機**：

- onBlur: 確認密碼欄位失焦時
- onSubmit: 提交時

**成功條件**：

- ✅ 密碼一致時可提交
- ✅ 密碼不一致時顯示錯誤
- ✅ 錯誤訊息清晰明確

---

### FR-5: 邀請碼選填機制

**優先級**: 🟡 P1 (High)

**功能說明**：

- 邀請碼為選填欄位
- 有填寫時後端會驗證並記錄
- 邀請碼無效時顯示警告但不阻擋註冊
- 顯示提示訊息鼓勵填寫

**驗證流程**：

```
填寫邀請碼？
  ├─ 否 → 直接註冊成功
  └─ 是 → 後端驗證
       ├─ 有效 → 記錄關聯 + 註冊成功
       └─ 無效 → 顯示警告 + 仍可註冊成功
```

**成功條件**：

- ✅ 未填邀請碼可正常註冊
- ✅ 有效邀請碼正確記錄
- ✅ 無效邀請碼不阻擋註冊

---

### FR-6: 表單驗證

**優先級**: 🔴 P0 (Critical)

**驗證時機**：

- onBlur: 欄位失焦時驗證
- onChange: 密碼強度即時計算
- onSubmit: 提交時完整驗證

**驗證項目**：

- Email 格式
- 密碼長度（≥ 8）
- 密碼複雜度（大寫 + 小寫 + 數字）
- 確認密碼一致性

**成功條件**：

- ✅ 即時顯示驗證錯誤
- ✅ 錯誤訊息清晰易懂
- ✅ 阻止無效表單提交

---

### FR-7: PostHog 追蹤

**優先級**: 🟢 P2 (Medium)

**追蹤事件**：

```javascript
// 註冊成功
posthog.identify(user.email, {
  email: user.email,
  name: user.name,
  role: user.role,
  has_invitation_code: Boolean(invitationCode),
})

posthog.capture('user_signup', {
  email: user.email,
  has_invitation_code: Boolean(invitationCode),
  signup_method: 'email',
  invitation_code_valid: invitationCodeValid, // 如有填寫
})
```

---

### FR-8: 導向登入頁面

**優先級**: 🟢 P2 (Medium)

**功能**：

- 頁面底部提供「已有帳號？立即登入」連結
- 點擊後導向 `/auth/login`

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/sections/auth/schema/__tests__/signup-schema.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'
import { signupSchema } from '../signup-schema'

describe('signupSchema', () => {
  const validData = {
    email: 'test@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
  }

  test('應該接受有效的註冊資料', () => {
    const result = signupSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  test('應該接受包含邀請碼的註冊資料', () => {
    const result = signupSchema.safeParse({
      ...validData,
      invitationCode: 'ABC123',
    })
    expect(result.success).toBe(true)
  })

  test('應該拒絕密碼不一致', () => {
    const result = signupSchema.safeParse({
      ...validData,
      confirmPassword: 'DifferentPassword',
    })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toContain('不一致')
  })

  test('應該拒絕不符合複雜度的密碼', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: 'lowercase',
      confirmPassword: 'lowercase',
    })
    expect(result.success).toBe(false)
  })

  test('應該拒絕缺少大寫字母的密碼', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: 'password123',
      confirmPassword: 'password123',
    })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toContain('大寫')
  })

  test('應該拒絕缺少數字的密碼', () => {
    const result = signupSchema.safeParse({
      ...validData,
      password: 'Password',
      confirmPassword: 'Password',
    })
    expect(result.success).toBe(false)
    expect(result.error.issues[0].message).toContain('數字')
  })
})
```

#### 測試文件：`src/sections/auth/components/__tests__/password-strength.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'
import { calculatePasswordStrength } from '../password-strength'

describe('calculatePasswordStrength', () => {
  test('應該判定弱密碼', () => {
    expect(calculatePasswordStrength('12345678').level).toBe('weak')
    expect(calculatePasswordStrength('password').level).toBe('weak')
  })

  test('應該判定中等密碼', () => {
    expect(calculatePasswordStrength('Password123').level).toBe('medium')
    expect(calculatePasswordStrength('Pass1234').level).toBe('medium')
  })

  test('應該判定強密碼', () => {
    expect(calculatePasswordStrength('Password123!@#').level).toBe('strong')
    expect(calculatePasswordStrength('MyP@ssw0rd123').level).toBe('strong')
  })

  test('應該根據長度增加分數', () => {
    const short = calculatePasswordStrength('Pass123')
    const long = calculatePasswordStrength('Password123456')
    expect(long.score).toBeGreaterThan(short.score)
  })
})
```

---

### 5.2 組件測試 (Component Tests)

#### 測試文件：`src/sections/auth/views/__tests__/signup-view.test.jsx`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupView from '../signup-view'

describe('SignupView', () => {
  test('應該渲染註冊表單', () => {
    render(<SignupView />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^密碼/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/確認密碼/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/邀請碼/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /註冊/i })).toBeInTheDocument()
  })

  test('應該顯示密碼強度指示器', async () => {
    render(<SignupView />)
    const user = userEvent.setup()

    const passwordInput = screen.getByLabelText(/^密碼/i)

    await user.type(passwordInput, '12345678')
    expect(screen.getByText(/弱/i)).toBeInTheDocument()

    await user.clear(passwordInput)
    await user.type(passwordInput, 'Password123')
    expect(screen.getByText(/中等/i)).toBeInTheDocument()

    await user.clear(passwordInput)
    await user.type(passwordInput, 'Password123!@#')
    expect(screen.getByText(/強/i)).toBeInTheDocument()
  })

  test('應該驗證確認密碼一致性', async () => {
    render(<SignupView />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/^密碼/i), 'Password123')
    await user.type(screen.getByLabelText(/確認密碼/i), 'DifferentPass')
    await user.click(screen.getByRole('button', { name: /註冊/i }))

    expect(await screen.findByText(/不一致/i)).toBeInTheDocument()
  })

  test('邀請碼欄位應該是選填', async () => {
    render(<SignupView />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^密碼/i), 'Password123')
    await user.type(screen.getByLabelText(/確認密碼/i), 'Password123')
    // 不填邀請碼

    await user.click(screen.getByRole('button', { name: /註冊/i }))

    // 不應該有邀請碼必填錯誤
    expect(screen.queryByText(/請輸入邀請碼/i)).not.toBeInTheDocument()
  })

  test('應該顯示邀請碼提示訊息', () => {
    render(<SignupView />)

    expect(screen.getByText(/有邀請碼可享特殊優惠/i)).toBeInTheDocument()
  })

  test('成功註冊應該導向個人資料頁', async () => {
    const mockSignup = vi.fn().mockResolvedValue({ success: true })
    const mockPush = vi.fn()

    render(<SignupView onSignup={mockSignup} router={{ push: mockPush }} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^密碼/i), 'Password123')
    await user.type(screen.getByLabelText(/確認密碼/i), 'Password123')
    await user.click(screen.getByRole('button', { name: /註冊/i }))

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/settings/profile')
    })
  })

  test('應該顯示 Email 已被註冊錯誤', async () => {
    const mockSignup = vi.fn().mockRejectedValue({
      error: { code: 'EMAIL_EXISTS', message: '此 Email 已被註冊' },
    })

    render(<SignupView onSignup={mockSignup} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'existing@example.com')
    await user.type(screen.getByLabelText(/^密碼/i), 'Password123')
    await user.type(screen.getByLabelText(/確認密碼/i), 'Password123')
    await user.click(screen.getByRole('button', { name: /註冊/i }))

    expect(await screen.findByText(/已被註冊/i)).toBeInTheDocument()
  })

  test('應該切換密碼顯示/隱藏（兩個欄位獨立）', async () => {
    render(<SignupView />)
    const user = userEvent.setup()

    const passwordInput = screen.getByLabelText(/^密碼/i)
    const confirmInput = screen.getByLabelText(/確認密碼/i)
    const toggleButtons = screen.getAllByRole('button', { name: /顯示密碼/i })

    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmInput).toHaveAttribute('type', 'password')

    await user.click(toggleButtons[0]) // 切換第一個
    expect(passwordInput).toHaveAttribute('type', 'text')
    expect(confirmInput).toHaveAttribute('type', 'password') // 第二個不變
  })
})
```

---

### 5.3 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/signup-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('註冊流程整合測試', () => {
  test('完整註冊流程（無邀請碼）', async () => {
    // 1. 訪問註冊頁面
    // 2. 填寫表單（Email, 密碼, 確認密碼）
    // 3. 點擊註冊按鈕
    // 4. 驗證 API 呼叫（POST /api/auth/signup）
    // 5. 驗證 sessionStorage 儲存 token
    // 6. 驗證 user store 更新
    // 7. 驗證導向 /settings/profile
    // 8. 驗證 PostHog 追蹤
  })

  test('完整註冊流程（含邀請碼）', async () => {
    // 1. 訪問註冊頁面
    // 2. 填寫表單（Email, 密碼, 確認密碼, 邀請碼）
    // 3. 點擊註冊按鈕
    // 4. 驗證 API 呼叫包含邀請碼
    // 5. 驗證邀請碼關聯記錄
    // 6. 驗證 PostHog 追蹤包含邀請碼資訊
  })

  test('邀請碼無效但仍可註冊', async () => {
    // 1. 填寫表單並輸入無效邀請碼
    // 2. 提交表單
    // 3. 驗證顯示邀請碼警告訊息
    // 4. 驗證註冊仍然成功
    // 5. 驗證用戶未關聯邀請碼
  })

  test('錯誤處理：Email 已被註冊', async () => {
    // 1. 嘗試註冊已存在的 Email
    // 2. 驗證顯示錯誤訊息
    // 3. 驗證不會導向其他頁面
    // 4. 驗證表單資料保留
  })

  test('密碼強度即時更新', async () => {
    // 1. 進入註冊頁面
    // 2. 逐步輸入密碼
    // 3. 驗證強度指示器即時更新
    // 4. 驗證視覺呈現正確
  })
})
```

---

### 5.4 測試覆蓋率目標

| 類型         | 目標覆蓋率 | 說明                 |
| ------------ | ---------- | -------------------- |
| Schema 驗證  | 100%       | 所有驗證規則都需測試 |
| Custom Hooks | 90%+       | 核心業務邏輯高覆蓋率 |
| UI 組件      | 80%+       | 關鍵互動和渲染測試   |
| 整合測試     | 100%       | 所有關鍵流程全覆蓋   |

---

## 6. 非功能性需求 (Non-Functional Requirements)

### 6.1 效能 (Performance)

| 指標         | 目標     | 說明                          |
| ------------ | -------- | ----------------------------- |
| 頁面載入時間 | < 2 秒   | 首次載入完成時間              |
| API 回應時間 | < 1.5 秒 | 註冊 API 回應（含邀請碼驗證） |
| 互動回饋     | < 100ms  | 按鈕點擊、輸入回饋            |
| 密碼強度計算 | < 50ms   | 即時計算不影響輸入體驗        |

**優化策略**：

- 使用 Next.js Image 優化背景圖片
- 表單驗證使用 debounce（300ms）
- 密碼強度計算使用 useMemo
- 關鍵 CSS 內聯

---

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 密碼欄位使用 `type="password"`
- ✅ 強制密碼複雜度（大小寫 + 數字）
- ✅ 確認密碼機制防止打錯
- ✅ Token 儲存於 sessionStorage（關閉瀏覽器即清除）
- ✅ 不在 console.log 輸出敏感資訊
- ✅ 使用 HTTPS（生產環境）
- ✅ 防止 XSS 攻擊（使用 React 自動跳脫）

#### 後端需配合（不在此 spec 範圍）

- 密碼加密儲存（bcrypt）
- Email 唯一性檢查
- 邀請碼驗證機制
- Rate limiting（防止大量註冊攻擊）
- CORS 設定

---

### 6.3 SEO

```javascript
// src/app/auth/signup/page.jsx
export const metadata = {
  title: '會員註冊 | 2025 力維盃排球錦標賽',
  description: '註冊力維盃帳號，享受完整的賽事服務和會員優惠',
  robots: 'noindex, nofollow', // 註冊頁不需索引
}
```

---

### 6.4 無障礙性 (Accessibility)

#### ARIA 標籤

```jsx
<input
  type="email"
  aria-label="Email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>

<span id="email-error" role="alert">
  {errorMessage}
</span>

<div aria-live="polite" aria-atomic="true">
  密碼強度: {strengthLabel}
</div>
```

#### 鍵盤導航

- Tab 順序：Email → 密碼 → 確認密碼 → 邀請碼 → 註冊按鈕
- Enter 鍵提交表單
- Esc 鍵清除錯誤訊息

#### 螢幕閱讀器

- 所有輸入框提供 label
- 錯誤訊息提供 role="alert"
- 密碼強度變化提供 aria-live
- Loading 狀態提供 aria-busy

---

### 6.5 響應式設計

| 螢幕尺寸 | 寬度           | 佈局調整                     |
| -------- | -------------- | ---------------------------- |
| Mobile   | < 640px        | 單欄，卡片寬度 100%          |
| Tablet   | 640px - 1024px | 單欄，卡片最大寬度 500px     |
| Desktop  | > 1024px       | 單欄居中，卡片最大寬度 600px |

**測試裝置**：

- iPhone 12/13 (390x844)
- iPad (768x1024)
- Desktop 1920x1080

---

## 7. 相依性與里程碑 (Dependencies & Milestones)

### 7.1 前置需求

| 項目                        | 狀態      | 負責人       | 備註                   |
| --------------------------- | --------- | ------------ | ---------------------- |
| 後端 API `/api/auth/signup` | ⏳ 待開發 | Backend Team | 需要 API 規格文件      |
| 邀請碼驗證機制              | ⏳ 待開發 | Backend Team | 需定義邀請碼格式和規則 |
| User store 結構確認         | ✅ 完成   | -            | 使用現有結構           |
| 設計稿                      | ⏳ 待確認 | Design Team  | 可用文字描述先行       |

### 7.2 開發里程碑

#### Phase 1: 規劃與準備（Week 1）

- [x] Spec 文檔完成
- [ ] 測試案例撰寫完成
- [ ] 後端 API 規格確認
- [ ] 邀請碼機制確認
- [ ] 設計稿/線框圖確認

#### Phase 2: 核心開發（Week 2）

- [ ] Schema 實作 + 單元測試
- [ ] Custom Hooks 實作 + 單元測試
- [ ] API 整合（使用 Mock API）
- [ ] PasswordInput 組件開發（共用）
- [ ] PasswordStrength 組件開發
- [ ] AuthCard 組件開發（共用）

#### Phase 3: 頁面開發（Week 3）

- [ ] 註冊頁面 UI 實作
- [ ] 組件測試完成
- [ ] 響應式設計調整
- [ ] 密碼強度互動優化

#### Phase 4: 整合與測試（Week 4）

- [ ] 後端 API 整合（替換 Mock API）
- [ ] 邀請碼機制測試
- [ ] 整合測試完成
- [ ] 跨瀏覽器測試
- [ ] 效能測試（Lighthouse）
- [ ] 無障礙性測試

#### Phase 5: 部署與監控（Week 5）

- [ ] Code Review
- [ ] UAT（User Acceptance Testing）
- [ ] 部署至 Staging 環境
- [ ] 部署至 Production 環境
- [ ] PostHog 追蹤驗證

---

### 7.3 風險評估

| 風險             | 影響等級 | 機率 | 應對策略                   |
| ---------------- | -------- | ---- | -------------------------- |
| 後端 API 延遲    | 🔴 高    | 中   | 使用 Mock API 先行開發前端 |
| 邀請碼機制未定義 | 🟡 中    | 中   | 先實作基本驗證，後續擴充   |
| 密碼強度計算效能 | 🟢 低    | 低   | 使用 useMemo 優化          |
| 設計稿延遲       | 🟡 中    | 低   | 使用文字描述和現有風格先行 |
| PostHog 整合問題 | 🟢 低    | 低   | 可選功能，不影響核心流程   |

---

## 8. 路由常數更新

更新 `src/routers/path.js`：

```javascript
export const PATH = {
  // ... 現有路由

  // 認證相關
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout', // 未來功能
  },

  // 設定頁面
  settings: {
    profile: '/settings/profile',
  },
}
```

---

## 9. 後續版本規劃 (Future Enhancements)

### 認證功能 v2.0

- [ ] Email 驗證機制（註冊後發送驗證信）
- [ ] 第三方註冊（Google, Line）
- [ ] 手機號碼註冊
- [ ] 推薦人系統（擴充邀請碼功能）

### 認證功能 v3.0

- [ ] 社交帳號連結
- [ ] 多重邀請碼（可輸入多個）
- [ ] 邀請碼統計儀表板

---

## 附錄 A: 常見問題 (FAQ)

**Q1: 邀請碼無效會阻擋註冊嗎？**  
A: 不會。邀請碼為選填且無效時不阻擋註冊，只會顯示警告訊息。

**Q2: 為什麼需要確認密碼？**  
A: 防止用戶打錯密碼後無法登入。這是常見的安全最佳實踐。

**Q3: 密碼強度如何計算？**  
A: 根據長度、大小寫、數字、特殊符號綜合評分，詳見 3.3.2。

**Q4: 註冊後需要 Email 驗證嗎？**  
A: 目前版本不需要，但未來版本會加入此功能。

**Q5: 密碼複雜度要求是什麼？**  
A: 至少 8 個字元，包含大寫字母、小寫字母和數字。

---

## 附錄 B: 邀請碼機制說明

### 邀請碼格式（需與後端確認）

```
長度: 6-8 字元
格式: 英數字組合（A-Z, 0-9）
範例: ABC123, LIWEI2025
```

### 邀請碼優惠內容（由後端定義）

- 商品折扣
- 特殊權限
- 活動優先報名
- 詳細優惠內容由行銷活動決定

### 邀請碼驗證流程

```
前端
  ├─ 格式驗證（長度、字元）
  └─ 提交至後端

後端
  ├─ 檢查邀請碼是否存在
  ├─ 檢查是否已過期
  ├─ 檢查使用次數限制
  └─ 記錄關聯
```

---

## 附錄 C: 參考資源

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostHog Documentation](https://posthog.com/docs)
- [WCAG 2.1 無障礙指南](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Password Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容     | 負責人      |
| ---- | ---------- | ------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立 | Paper Hsiao |

---

**相關文檔**：

- [登入頁面規格書](./login-page-spec.md)
- [個人資料頁面規格書](./profile-page-spec.md)（未來）

---

**文件結束**
