import { beforeEach, describe, expect, test } from '@jest/globals'
import { act, renderHook } from '@testing-library/react'

import useCheckoutStore, {
  createCheckoutInitialState,
} from '../checkout-context'

describe('useCheckoutStore', () => {
  beforeEach(() => {
    const store = useCheckoutStore.getState()
    store.clear()
  })

  test('應該有正確的初始狀態', () => {
    const store = useCheckoutStore.getState()
    const initialState = createCheckoutInitialState()

    expect(store.customerInfo).toEqual(initialState.customerInfo)
    expect(store.deliveryInfo).toEqual(initialState.deliveryInfo)
    expect(store.agreeToTerms).toBe(initialState.agreeToTerms)
  })

  describe('setCustomerInfo', () => {
    test('應該更新訂購人資訊', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })
      })

      expect(result.current.customerInfo).toEqual({
        fullName: '王小明',
        email: 'test@example.com',
        phone: '0912345678',
        gender: 'male',
      })
    })

    test('應該部分更新訂購人資訊', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
        })
      })

      act(() => {
        result.current.setCustomerInfo({
          phone: '0912345678',
        })
      })

      expect(result.current.customerInfo).toMatchObject({
        fullName: '王小明',
        email: 'test@example.com',
        phone: '0912345678',
      })
    })
  })

  describe('setDeliveryInfo', () => {
    test('應該更新收件人資訊', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setDeliveryInfo({
          deliveryName: '李小華',
          recipientPhone: '0987654321',
        })
      })

      expect(result.current.deliveryInfo).toMatchObject({
        deliveryName: '李小華',
        recipientPhone: '0987654321',
      })
    })

    test('應該更新 sameAsCustomer 狀態', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setDeliveryInfo({
          sameAsCustomer: true,
        })
      })

      expect(result.current.deliveryInfo.sameAsCustomer).toBe(true)
    })

    test('應該更新配送備註', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setDeliveryInfo({
          deliveryNote: '請於下午配送',
        })
      })

      expect(result.current.deliveryInfo.deliveryNote).toBe('請於下午配送')
    })
  })

  describe('setAgreeToTerms', () => {
    test('應該更新條款同意狀態', () => {
      const { result } = renderHook(() => useCheckoutStore())

      act(() => {
        result.current.setAgreeToTerms(true)
      })

      expect(result.current.agreeToTerms).toBe(true)

      act(() => {
        result.current.setAgreeToTerms(false)
      })

      expect(result.current.agreeToTerms).toBe(false)
    })
  })

  describe('clear', () => {
    test('應該清除所有資料', () => {
      const { result } = renderHook(() => useCheckoutStore())

      // 先設定一些資料
      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })

        result.current.setDeliveryInfo({
          deliveryName: '李小華',
          recipientPhone: '0987654321',
          storeId: '123456',
        })

        result.current.setAgreeToTerms(true)
      })

      // 清除所有資料
      act(() => {
        result.current.clear()
      })

      // 驗證所有資料已清除
      const clearedStore = useCheckoutStore.getState()
      const initialState = createCheckoutInitialState()
      expect(clearedStore.customerInfo).toEqual(initialState.customerInfo)
      expect(clearedStore.deliveryInfo).toEqual(initialState.deliveryInfo)
      expect(clearedStore.agreeToTerms).toBe(initialState.agreeToTerms)
    })
  })

  describe('綜合測試', () => {
    test('應該完整模擬使用者填寫流程', () => {
      const { result } = renderHook(() => useCheckoutStore())

      // 步驟 1: 填寫訂購人資訊
      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          email: 'test@example.com',
          phone: '0912345678',
          gender: 'male',
        })
      })

      expect(result.current.customerInfo).toEqual({
        fullName: '王小明',
        email: 'test@example.com',
        phone: '0912345678',
        gender: 'male',
      })

      // 步驟 2: 填寫收件人資訊
      act(() => {
        result.current.setDeliveryInfo({
          deliveryName: '李小華',
          recipientPhone: '0987654321',
        })
      })

      expect(result.current.deliveryInfo.deliveryName).toBe('李小華')
      expect(result.current.deliveryInfo.recipientPhone).toBe('0987654321')

      // 步驟 3: 同意條款
      act(() => {
        result.current.setAgreeToTerms(true)
      })

      expect(result.current.agreeToTerms).toBe(true)

      // 驗證所有資料都正確
      expect(result.current.customerInfo.fullName).toBe('王小明')
      expect(result.current.deliveryInfo.deliveryName).toBe('李小華')
      expect(result.current.agreeToTerms).toBe(true)
    })

    test('應該正確處理「同訂購人資訊」的情境', () => {
      const { result } = renderHook(() => useCheckoutStore())

      // 先填寫訂購人資訊
      act(() => {
        result.current.setCustomerInfo({
          fullName: '王小明',
          phone: '0912345678',
        })
      })

      // 勾選「同訂購人資訊」（在實際應用中會由組件處理複製）
      act(() => {
        result.current.setDeliveryInfo({
          sameAsCustomer: true,
          deliveryName: result.current.customerInfo.fullName,
          recipientPhone: result.current.customerInfo.phone,
        })
      })

      expect(result.current.deliveryInfo.sameAsCustomer).toBe(true)
      expect(result.current.deliveryInfo.deliveryName).toBe('王小明')
      expect(result.current.deliveryInfo.recipientPhone).toBe('0912345678')
    })
  })
})
