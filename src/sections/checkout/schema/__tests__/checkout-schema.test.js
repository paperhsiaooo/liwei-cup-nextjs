import { describe, expect, test } from '@jest/globals'

import { checkoutSchema } from '../checkout-schema'

describe('checkoutSchema', () => {
  const validData = {
    fullName: '王小明',
    email: 'test@example.com',
    phone: '0912345678',
    gender: 'male',
    sameAsCustomer: false,
    deliveryName: '李小華',
    recipientPhone: '0987654321',
    deliveryNote: '請於下午配送',
    agreeToTerms: true,
  }

  test('應該接受完整有效的資料', () => {
    const result = checkoutSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  describe('訂購人資訊驗證', () => {
    test('應該拒絕空白全名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        fullName: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('請輸入全名')
    })

    test('應該拒絕過短的全名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        fullName: '王',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('至少需要 2 個字元')
    })

    test('應該拒絕過長的全名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        fullName: 'a'.repeat(51),
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('最多 50 個字元')
    })

    test('應該拒絕空白 Email', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        email: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('請輸入信箱')
    })

    test('應該拒絕無效的 Email 格式', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('Email')
    })

    test('應該接受有效的 Email 格式', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        email: 'test@example.com',
      })
      expect(result.success).toBe(true)
    })

    test('應該拒絕空白手機號碼', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        phone: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('請輸入聯絡電話')
    })

    test('應該拒絕無效的手機號碼格式', () => {
      const invalidPhones = [
        '1234567890', // 不是09開頭
        '091234567', // 少一碼
        '09123456789', // 多一碼
        '0812345678', // 不是09開頭
        'abcd123456', // 包含字母
      ]

      invalidPhones.forEach(phone => {
        const result = checkoutSchema.safeParse({
          ...validData,
          phone,
        })
        expect(result.success).toBe(false)
        expect(result.error.issues[0].message).toContain('手機號碼格式')
      })
    })

    test('應該接受有效的手機號碼格式', () => {
      const validPhones = [
        '0912345678',
        '0987654321',
        '0900000000',
        '0999999999',
      ]

      validPhones.forEach(phone => {
        const result = checkoutSchema.safeParse({
          ...validData,
          phone,
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('收件人資訊驗證', () => {
    test('應該拒絕空白收件人姓名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryName: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('收件人姓名')
    })

    test('應該拒絕過短的收件人姓名', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryName: '李',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('至少需要 2 個字元')
    })

    test('應該拒絕空白收件人電話', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        recipientPhone: '',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('收件人電話')
    })

    test('應該拒絕無效的收件人電話格式', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        recipientPhone: '1234567890',
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('手機號碼格式')
    })
  })

  describe('條款同意驗證', () => {
    test('應該拒絕未同意條款', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        agreeToTerms: false,
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('服務條款')
    })

    test('應該接受已同意條款', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        agreeToTerms: true,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('選填欄位', () => {
    test('性別可以為空', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        gender: '',
      })
      expect(result.success).toBe(true)
    })

    test('配送備註可以為空', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryNote: '',
      })
      expect(result.success).toBe(true)
    })

    test('應該拒絕過長的配送備註', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryNote: 'a'.repeat(201),
      })
      expect(result.success).toBe(false)
      expect(result.error.issues[0].message).toContain('200')
    })

    test('應該接受合理長度的配送備註', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        deliveryNote: '請於下午配送，謝謝',
      })
      expect(result.success).toBe(true)
    })

    test('門市電話可以為空', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        storeTel: '',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('性別選項驗證', () => {
    test('應該接受有效的性別選項', () => {
      const validGenders = ['male', 'female', 'prefer-not-to-say', '']

      validGenders.forEach(gender => {
        const result = checkoutSchema.safeParse({
          ...validData,
          gender,
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('綜合驗證', () => {
    test('應該拒絕多個欄位同時錯誤', () => {
      const result = checkoutSchema.safeParse({
        fullName: '',
        email: 'invalid',
        phone: '123',
        gender: '',
        sameAsCustomer: false,
        deliveryName: '',
        recipientPhone: '456',
        deliveryNote: '',
        agreeToTerms: false,
      })

      expect(result.success).toBe(false)
      expect(result.error.issues.length).toBeGreaterThan(1)
    })

    test('應該接受最小有效資料（不含選填欄位）', () => {
      const result = checkoutSchema.safeParse({
        fullName: '王小明',
        email: 'test@example.com',
        phone: '0912345678',
        gender: '',
        sameAsCustomer: false,
        deliveryName: '李小華',
        recipientPhone: '0987654321',
        deliveryNote: '',
        agreeToTerms: true,
      })

      expect(result.success).toBe(true)
    })
  })
})
