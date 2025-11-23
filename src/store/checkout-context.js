import { create } from 'zustand'

const createInitialCustomerInfo = () => ({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
})

const createInitialDeliveryInfo = () => ({
  sameAsCustomer: false,
  deliveryName: '',
  recipientPhone: '',
  deliveryNote: '',
})

export const createCheckoutInitialState = () => ({
  customerInfo: createInitialCustomerInfo(),
  deliveryInfo: createInitialDeliveryInfo(),
  agreeToTerms: false,
})

const useCheckoutStore = create((set, get) => ({
  ...createCheckoutInitialState(),

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

  clear: () =>
    set(() => ({
      customerInfo: createInitialCustomerInfo(),
      deliveryInfo: createInitialDeliveryInfo(),
      agreeToTerms: false,
    })),
}))

export default useCheckoutStore
