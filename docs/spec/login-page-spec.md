# 登入頁面功能規格書

# Login Page Specification

**版本 (Version)**: 1.0  
**建立日期 (Created Date)**: 2025-10-19  
**負責人 (Owner)**: Paper Hsiao  
**狀態 (Status)**: Draft

---

## 1. 功能概述 (Feature Overview)

### 1.1 目標

提供使用者透過 Email 和密碼登入系統的功能。

### 1.2 使用者故事 (User Stories)

**US-1: 使用者登入**

> 作為一個**已註冊用戶**，我想要使用 Email 和密碼登入，以便存取我的個人資料和訂單。

**US-2: 密碼可見性控制**

> 作為一個**用戶**，我想要切換顯示/隱藏密碼，以確保輸入正確且保護隱私。

### 1.3 範圍 (Scope)

#### 包含功能 (In Scope)

- ✅ Email + 密碼登入頁面 (`/auth/login`)
- ✅ 表單驗證（Email 格式、密碼長度）
- ✅ 顯示/隱藏密碼功能
- ✅ 錯誤處理與提示訊息
- ✅ 登入成功後導向個人資料頁面
- ✅ PostHog 追蹤

#### 不包含功能 (Out of Scope)

- ❌ 忘記密碼功能（未來版本）
- ❌ 第三方登入（Google, Line 等）
- ❌ 記住我功能
- ❌ 註冊功能（見 `signup-page-spec.md`）

### 1.4 與現有系統的關係

**現有邀請碼登入流程**（保留）

- 位置：首頁邀請卡組件
- 流程：輸入邀請碼 → 自動登入 → 參賽者流程
- 未來可能移除，但本次開發暫時保留

**新的 Email/密碼登入流程**

- 位置：獨立頁面 `/auth/login`
- 流程：Email + 密碼 → 登入 → 個人資料頁面
- **共用相同的用戶系統**（只是登入方式不同）

---

## 2. 技術規格 (Technical Specifications)

### 2.1 路由設定

| 功能           | 路徑          | 檔案位置                              | 說明             |
| -------------- | ------------- | ------------------------------------- | ---------------- |
| 登入頁面       | `/auth/login` | `src/app/auth/login/page.jsx`         | Email 密碼登入   |
| 登入客戶端組件 | -             | `src/app/auth/login/login-client.jsx` | Client Component |

### 2.2 檔案結構

```
src/
├── app/
│   └── auth/
│       └── login/
│           ├── page.jsx                    # 登入頁面入口（Server Component）
│           └── login-client.jsx            # 登入客戶端組件
├── sections/
│   └── auth/
│       ├── views/
│       │   ├── login-view.jsx              # 登入視圖組件
│       │   └── index.js                    # 導出
│       ├── components/
│       │   ├── password-input.jsx          # 密碼輸入組件（顯示/隱藏）
│       │   └── auth-card.jsx               # 認證卡片容器（共用）
│       ├── hook/
│       │   └── use-login-form.js           # 登入表單邏輯
│       └── schema/
│           └── login-schema.js             # 登入表單驗證
├── apis/
│   └── hook/
│       └── use-auth.js                     # 認證相關 API hooks
└── routers/
    └── path.js                             # 更新路由常數
```

### 2.3 狀態管理

**User Store (Zustand)**

- 使用現有的 `useUserContext` (`src/store/user-context.js`)
- 登入成功後呼叫 `loginSuccess(data)` 更新狀態
- Token 儲存於 `sessionStorage` (key: `STORAGE_KEY` from `@/constants/jwt`)

```javascript
// 登入成功後的狀態更新
loginSuccess({
  name: data.name,
  email: data.email,
  nick_name: data.nick_name,
  role: data.role,
  // ... 其他用戶資料
})
```

### 2.4 API 端點

**登入 API**

| 端點              | 方法 | 說明           | 回傳格式                                      |
| ----------------- | ---- | -------------- | --------------------------------------------- |
| `/api/auth/login` | POST | Email 密碼登入 | `{ token, data: { name, email, role, ... } }` |

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response (成功)**:

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "使用者名稱",
      "nick_name": "暱稱",
      "role": "user",
      "is_participating": false,
      "is_checked_in": false
    }
  }
}
```

**Response (失敗)**:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_FAILED",
    "message": "Email 或密碼錯誤"
  }
}
```

### 2.5 表單驗證規則

```javascript
// src/sections/auth/schema/login-schema.js
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, '請輸入 Email').email('請輸入有效的 Email'),

  password: z.string().min(8, '密碼至少需要 8 個字元'),
})

export const defaultValues = {
  email: '',
  password: '',
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

### 3.2 登入頁面 UI

```
┌─────────────────────────────────────────┐
│          力維盃 2025 登入                 │
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
│                                         │
│  ┌───────────────────────────────────┐ │
│  │         登入                       │ │ ← 主按鈕 (blue-primary)
│  └───────────────────────────────────┘ │
│                                         │
│  還沒有帳號？ [立即註冊]                  │
│                                         │
└─────────────────────────────────────────┘
```

### 3.3 組件規格

#### 3.3.1 PasswordInput 組件

**功能**：

- 密碼輸入框
- 顯示/隱藏密碼切換按鈕（眼睛 icon）

**Props**：

```typescript
{
  name: string           // RHF field name
  placeholder?: string   // 預設: "請輸入密碼"
  label?: string         // 欄位標籤
}
```

**使用範例**：

```jsx
<PasswordInput name="password" label="密碼" placeholder="請輸入密碼" />
```

#### 3.3.2 AuthCard 組件

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

**位置**：表單下方，紅色文字  
**樣式**：`text-red-600 text-sm mt-2`

**錯誤訊息對照表**：

| 錯誤情境         | 訊息內容                       |
| ---------------- | ------------------------------ |
| Email 格式錯誤   | "請輸入有效的 Email"           |
| 密碼長度不足     | "密碼至少需要 8 個字元"        |
| Email 或密碼錯誤 | "Email 或密碼錯誤，請重新輸入" |
| 網路錯誤         | "網路連線異常，請稍後再試"     |

### 3.5 Loading 狀態

**按鈕 Loading**：

```jsx
<button disabled={isPending} className="...">
  {isPending ? <Loader /> : '登入'}
</button>
```

### 3.6 成功提示

**登入成功後**：

- 顯示簡短的歡迎訊息（1 秒）
- 自動導向 `/settings/profile`

---

## 4. 功能需求 (Functional Requirements)

### FR-1: 使用者登入

**優先級**: 🔴 P0 (Critical)

**前置條件**：

- 使用者已註冊帳號

**操作流程**：

1. 使用者進入 `/auth/login` 頁面
2. 輸入 Email 和密碼
3. 點擊「登入」按鈕
4. 系統驗證表單資料（前端驗證）
5. 呼叫 `/api/auth/login` API
6. 儲存 token 至 sessionStorage
7. 更新 Zustand user store
8. PostHog identify 使用者
9. 顯示歡迎訊息
10. 導向 `/settings/profile`

**例外處理**：

- Email 或密碼錯誤 → 顯示錯誤訊息，保留輸入資料
- 網路錯誤 → 顯示錯誤訊息，允許重試
- Token 儲存失敗 → 顯示錯誤訊息，清除登入狀態

**成功條件**：

- ✅ Token 成功儲存於 sessionStorage
- ✅ User store 正確更新
- ✅ 成功導向個人資料頁面
- ✅ PostHog 正確追蹤

---

### FR-2: 密碼顯示/隱藏

**優先級**: 🟡 P1 (High)

**操作流程**：

1. 密碼預設為隱藏狀態（••••）
2. 點擊眼睛 icon 切換顯示/隱藏
3. 顯示狀態顯示明文密碼
4. 再次點擊切換回隱藏狀態

**成功條件**：

- ✅ 預設為隱藏狀態
- ✅ 點擊後正確切換
- ✅ Icon 隨狀態變化（👁 / 👁‍🗨）

---

### FR-3: 表單驗證

**優先級**: 🔴 P0 (Critical)

**驗證時機**：

- onBlur: 欄位失焦時驗證
- onSubmit: 提交時完整驗證

**驗證項目**：

- Email 格式
- 密碼長度（≥ 8）

**成功條件**：

- ✅ 即時顯示驗證錯誤
- ✅ 錯誤訊息清晰易懂
- ✅ 阻止無效表單提交

---

### FR-4: PostHog 追蹤

**優先級**: 🟢 P2 (Medium)

**追蹤事件**：

```javascript
// 登入成功
posthog.identify(user.email, {
  email: user.email,
  name: user.name,
  role: user.role,
  login_method: 'email',
})

posthog.capture('user_login', {
  method: 'email',
})
```

---

### FR-5: 導向註冊頁面

**優先級**: 🟢 P2 (Medium)

**功能**：

- 頁面底部提供「還沒有帳號？立即註冊」連結
- 點擊後導向 `/auth/signup`

---

## 5. 測試規格 (Test Specifications)

### 5.1 單元測試 (Unit Tests)

#### 測試文件：`src/sections/auth/schema/__tests__/login-schema.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'
import { loginSchema } from '../login-schema'

describe('loginSchema', () => {
  describe('email validation', () => {
    test('應該接受有效的 email', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(result.success).toBe(true)
    })

    test('應該拒絕無效的 email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('Email')
    })

    test('應該拒絕空白 email', () => {
      const result = loginSchema.safeParse({
        email: '',
        password: 'password123',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('password validation', () => {
    test('應該接受至少 8 個字元的密碼', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '12345678',
      })
      expect(result.success).toBe(true)
    })

    test('應該拒絕少於 8 個字元的密碼', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '1234567',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('8')
    })
  })
})
```

#### 測試文件：`src/sections/auth/hook/__tests__/use-login-form.test.js`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { renderHook, waitFor } from '@testing-library/react'
import useLoginForm from '../use-login-form'

describe('useLoginForm', () => {
  test('應該初始化表單', () => {
    const { result } = renderHook(() => useLoginForm())

    expect(result.current.methods).toBeDefined()
    expect(result.current.handleSubmit).toBeDefined()
    expect(result.current.onSubmit).toBeDefined()
  })

  test('應該處理表單提交', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: true })
    const { result } = renderHook(() => useLoginForm(mockLogin))

    await result.current.onSubmit({
      email: 'test@example.com',
      password: 'password123',
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })

  test('應該處理 API 錯誤', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('Login failed'))
    const { result } = renderHook(() => useLoginForm(mockLogin))

    await expect(
      result.current.onSubmit({
        email: 'test@example.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow()
  })
})
```

---

### 5.2 組件測試 (Component Tests)

#### 測試文件：`src/sections/auth/views/__tests__/login-view.test.jsx`

```javascript
import { describe, test, expect, vi } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginView from '../login-view'

describe('LoginView', () => {
  test('應該渲染登入表單', () => {
    render(<LoginView />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/密碼/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /登入/i })).toBeInTheDocument()
  })

  test('應該顯示必填欄位錯誤', async () => {
    render(<LoginView />)
    const user = userEvent.setup()

    const submitButton = screen.getByRole('button', { name: /登入/i })
    await user.click(submitButton)

    expect(await screen.findByText(/請輸入 email/i)).toBeInTheDocument()
  })

  test('應該驗證 email 格式', async () => {
    render(<LoginView />)
    const user = userEvent.setup()

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'invalid-email')
    await user.tab() // trigger blur

    expect(await screen.findByText(/有效的 email/i)).toBeInTheDocument()
  })

  test('應該切換密碼顯示/隱藏', async () => {
    render(<LoginView />)
    const user = userEvent.setup()

    const passwordInput = screen.getByLabelText(/密碼/i)
    const toggleButton = screen.getByRole('button', { name: /顯示密碼/i })

    expect(passwordInput).toHaveAttribute('type', 'password')

    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')

    await user.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('成功登入應該導向個人資料頁', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: true })
    const mockPush = vi.fn()

    render(<LoginView onLogin={mockLogin} router={{ push: mockPush }} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/密碼/i), 'password123')
    await user.click(screen.getByRole('button', { name: /登入/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledWith('/settings/profile')
    })
  })

  test('應該顯示登入錯誤訊息', async () => {
    const mockLogin = vi.fn().mockRejectedValue(new Error('Email 或密碼錯誤'))

    render(<LoginView onLogin={mockLogin} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/密碼/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /登入/i }))

    expect(await screen.findByText(/email 或密碼錯誤/i)).toBeInTheDocument()
  })
})
```

---

### 5.3 整合測試 (Integration Tests)

#### 測試文件：`__tests__/e2e/login-flow.test.js`

```javascript
import { describe, test, expect } from '@jest/globals'

describe('登入流程整合測試', () => {
  test('完整登入流程', async () => {
    // 1. 訪問登入頁面
    // 2. 填寫 Email 和密碼
    // 3. 點擊登入按鈕
    // 4. 驗證 API 呼叫（POST /api/auth/login）
    // 5. 驗證 sessionStorage 儲存 token
    // 6. 驗證 user store 更新
    // 7. 驗證導向 /settings/profile
    // 8. 驗證 PostHog 追蹤
  })

  test('錯誤處理：登入失敗', async () => {
    // 1. 輸入錯誤的 Email 或密碼
    // 2. 驗證顯示錯誤訊息
    // 3. 驗證不會儲存 token
    // 4. 驗證不會更新 user store
    // 5. 驗證不會導向其他頁面
  })

  test('表單驗證流程', async () => {
    // 1. 提交空白表單
    // 2. 驗證顯示必填錯誤
    // 3. 輸入無效 Email
    // 4. 驗證顯示格式錯誤
    // 5. 輸入過短密碼
    // 6. 驗證顯示長度錯誤
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

| 指標         | 目標    | 說明               |
| ------------ | ------- | ------------------ |
| 頁面載入時間 | < 2 秒  | 首次載入完成時間   |
| API 回應時間 | < 1 秒  | 登入 API 回應      |
| 互動回饋     | < 100ms | 按鈕點擊、輸入回饋 |

**優化策略**：

- 使用 Next.js Image 優化背景圖片
- 表單驗證使用 debounce（300ms）
- 關鍵 CSS 內聯

---

### 6.2 安全性 (Security)

#### 前端安全措施

- ✅ 密碼欄位使用 `type="password"`
- ✅ Token 儲存於 sessionStorage（關閉瀏覽器即清除）
- ✅ 不在 console.log 輸出敏感資訊
- ✅ 使用 HTTPS（生產環境）
- ✅ 防止 XSS 攻擊（使用 React 自動跳脫）

#### 後端需配合（不在此 spec 範圍）

- 密碼加密儲存（bcrypt）
- JWT token 有效期設定
- Rate limiting（防暴力破解）
- CORS 設定

---

### 6.3 SEO

```javascript
// src/app/auth/login/page.jsx
export const metadata = {
  title: '會員登入 | 2025 力維盃排球錦標賽',
  description: '登入您的力維盃帳號，查看參賽資訊和訂單記錄',
  robots: 'noindex, nofollow', // 登入頁不需索引
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
```

#### 鍵盤導航

- Tab 順序：Email → 密碼 → 登入按鈕
- Enter 鍵提交表單
- Esc 鍵清除錯誤訊息

#### 螢幕閱讀器

- 所有輸入框提供 label
- 錯誤訊息提供 role="alert"
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

| 項目                       | 狀態      | 負責人       | 備註              |
| -------------------------- | --------- | ------------ | ----------------- |
| 後端 API `/api/auth/login` | ⏳ 待開發 | Backend Team | 需要 API 規格文件 |
| User store 結構確認        | ✅ 完成   | -            | 使用現有結構      |
| 設計稿                     | ⏳ 待確認 | Design Team  | 可用文字描述先行  |

### 7.2 開發里程碑

#### Phase 1: 規劃與準備（Week 1）

- [x] Spec 文檔完成
- [ ] 測試案例撰寫完成
- [ ] 後端 API 規格確認
- [ ] 設計稿/線框圖確認

#### Phase 2: 核心開發（Week 2）

- [ ] Schema 實作 + 單元測試
- [ ] Custom Hooks 實作 + 單元測試
- [ ] API 整合（使用 Mock API）
- [ ] PasswordInput 組件開發
- [ ] AuthCard 組件開發

#### Phase 3: 頁面開發（Week 3）

- [ ] 登入頁面 UI 實作
- [ ] 組件測試完成
- [ ] 響應式設計調整

#### Phase 4: 整合與測試（Week 4）

- [ ] 後端 API 整合（替換 Mock API）
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
| 設計稿延遲       | 🟡 中    | 低   | 使用文字描述和現有風格先行 |
| PostHog 整合問題 | 🟢 低    | 低   | 可選功能，不影響核心流程   |
| 測試覆蓋率不足   | 🟡 中    | 中   | 持續監控，提早介入         |

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

- [ ] 忘記密碼功能
- [ ] Email 驗證機制
- [ ] 第三方登入（Google, Line）
- [ ] 記住我功能（localStorage）

### 認證功能 v3.0

- [ ] 雙因素認證 (2FA)
- [ ] 生物辨識登入（TouchID, FaceID）
- [ ] QR Code 登入

---

## 附錄 A: 常見問題 (FAQ)

**Q1: 為什麼不使用 localStorage 儲存 token？**  
A: 基於安全性考量，使用 sessionStorage 可確保關閉瀏覽器後自動登出，降低 token 被盜用的風險。

**Q2: 為什麼登入後導向 `/settings/profile` 而非首頁？**  
A: 提供更明確的登入後體驗，讓用戶知道已成功登入並可管理個人資料。

**Q3: 是否支援行動裝置？**  
A: 完全支援，採用響應式設計，手機優先開發。

**Q4: 登入失敗後會保留輸入的資料嗎？**  
A: 會保留 Email，但密碼會清空（安全性考量）。

---

## 附錄 B: 參考資源

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostHog Documentation](https://posthog.com/docs)
- [WCAG 2.1 無障礙指南](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 變更記錄 (Change Log)

| 版本 | 日期       | 變更內容     | 負責人      |
| ---- | ---------- | ------------ | ----------- |
| 1.0  | 2025-10-19 | 初始版本建立 | Paper Hsiao |

---

**相關文檔**：

- [註冊頁面規格書](./signup-page-spec.md)
- [個人資料頁面規格書](./profile-page-spec.md)（未來）

---

**文件結束**
