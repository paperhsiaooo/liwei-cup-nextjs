import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useCheckoutStore = create(
  persist(
    (set, get) => ({
      // 訂購人資訊 (Custom Info)
      customerInfo: {
        fullName: '',
        email: '',
        phone: '',
        gender: '', // 'male' | 'female' | 'prefer-not-to-say' | ''
      },

      // 收件人資訊 (Delivery Detail)
      deliveryInfo: {
        sameAsCustomer: false,
        deliveryName: '',
        recipientPhone: '',
        deliveryAddress: '',
        deliveryNote: '',
      },

      // 同意條款
      agreeToTerms: false,

      // Actions
      setCustomerInfo: data =>
        set(state => ({
          customerInfo: { ...state.customerInfo, ...data },
        })),

      setDeliveryInfo: data =>
        set(state => ({
          deliveryInfo: { ...state.deliveryInfo, ...data },
        })),

      setAgreeToTerms: agreeToTerms =>
        set(() => ({
          agreeToTerms,
        })),

      // 複製訂購人資訊到收件人
      copyCustomerToDelivery: () => {
        const { customerInfo } = get()
        set(state => ({
          deliveryInfo: {
            ...state.deliveryInfo,
            deliveryName: customerInfo.fullName,
            recipientPhone: customerInfo.phone,
          },
        }))
      },

      // 清除結帳資料（訂單完成後）
      clear: () =>
        set(() => ({
          customerInfo: {
            fullName: '',
            email: '',
            phone: '',
            gender: '',
          },
          deliveryInfo: {
            sameAsCustomer: false,
            deliveryName: '',
            recipientPhone: '',
            deliveryAddress: '',
            deliveryNote: '',
          },
          agreeToTerms: false,
        })),
    }),
    {
      name: 'liwei-checkout',
      storage: createJSONStorage(() =>
        typeof window === 'undefined'
          ? {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
          : window.localStorage,
      ),
    },
  ),
)

export default useCheckoutStore
