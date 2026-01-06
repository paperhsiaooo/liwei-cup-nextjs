'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { useOrderDetail, useUpdateOrder } from '@/apis/hook/use-order'
import CheckoutProgress from '@/components/common/checkout-progress'
import FormProvider from '@/components/common/hook-form/form-provider'
import UnauthorizedState from '@/components/common/unauthorized-state'
import { Button } from '@/components/ui/button'
import { PATH } from '@/routers/path'
import useCartStore from '@/store/cart-context'
import useCheckoutStore from '@/store/checkout-context'
import useUserContext from '@/store/user-context'

import CustomerInfoForm from '../components/customer-info-form'
import DeliveryInfoForm from '../components/delivery-info-form'
import OrderSummary from '../components/order-summary'
import TermsCheckbox from '../components/terms-checkbox'
import { checkoutSchema, defaultValues } from '../schema/checkout-schema'

export default function CheckoutView({ orderNumber = '' }) {
  const router = useRouter()
  const [isRouting, startRouting] = useTransition()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // 購物車資料
  const items = useCartStore(state => state.items)

  // 會員資料
  const user = useUserContext(state => state.user)
  const isLogin = user.isLogin

  // Checkout Store
  const { customerInfo, deliveryInfo, agreeToTerms } = useCheckoutStore()
  const { setCustomerInfo, setDeliveryInfo, setAgreeToTerms, clear } =
    useCheckoutStore()

  const { data: orderDetailResponse, error: orderDetailError } = useOrderDetail(
    orderNumber,
    {
      enabled: Boolean(orderNumber),
      retry: false,
    },
  )
  const orderCustomerInfo = orderDetailResponse?.data?.customerInfo
  const orderRecipientInfo = orderDetailResponse?.data?.recipientInfo
  const orderDeliveryNote = orderDetailResponse?.data?.deliveryNote
  const orderSelectedStore = orderDetailResponse?.data?.selectedStore

  const ecpayMerchantTradeNo = useMemo(() => {
    if (!orderDetailResponse?.data?.ecpayMerchantTradeNo) {
      return ''
    }
    return orderDetailResponse.data.ecpayMerchantTradeNo
  }, [orderDetailResponse])

  // React Hook Form
  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...defaultValues,
      // 從 store 恢復資料
      ...customerInfo,
      ...deliveryInfo,
      agreeToTerms,
    },
  })

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods

  const isOrderDetailUnauthorized =
    Boolean(orderNumber) && orderDetailError?.response?.status === 401

  const { mutateAsync: updateOrder } = useUpdateOrder(orderNumber)

  const previousOrderNumberRef = useRef(null)

  useEffect(() => {
    if (previousOrderNumberRef.current === orderNumber) {
      return
    }

    clear()
    reset({
      ...defaultValues,
    })
    previousOrderNumberRef.current = orderNumber
  }, [clear, orderNumber, reset])

  // 標記初始加載完成
  useEffect(() => {
    setIsInitialLoad(false)
  }, [])

  // 檢查購物車是否為空（但跳過初始加載）
  useEffect(() => {
    if (!isInitialLoad && items.length === 0) {
      router.push(PATH.cart)
    }
  }, [items, router, isInitialLoad])

  // 從訂單詳情帶入此前填寫的訂購人資訊
  useEffect(() => {
    if (!orderNumber || !orderCustomerInfo) {
      return
    }

    const nextCustomerInfo = {
      fullName: orderCustomerInfo.name || '',
      email: orderCustomerInfo.email || '',
      phone: orderCustomerInfo.phone || '',
      gender: orderCustomerInfo.gender || '',
    }

    setCustomerInfo(nextCustomerInfo)
    Object.entries(nextCustomerInfo).forEach(([field, value]) => {
      setValue(field, value || '')
    })
  }, [orderCustomerInfo, orderNumber, setCustomerInfo, setValue])

  useEffect(() => {
    if (!orderNumber) {
      return
    }

    const hasRecipient = Boolean(
      orderRecipientInfo?.name || orderRecipientInfo?.phone,
    )
    const hasNote = Boolean(orderDeliveryNote)
    const hasStore = Boolean(
      orderSelectedStore?.id ||
        orderSelectedStore?.name ||
        orderSelectedStore?.address ||
        orderSelectedStore?.phone,
    )

    if (!hasRecipient && !hasNote && !hasStore) {
      return
    }

    const nextDeliveryInfo = {
      deliveryName: orderRecipientInfo?.name || '',
      recipientPhone: orderRecipientInfo?.phone || '',
      deliveryNote: orderDeliveryNote || '',
      storeId: orderSelectedStore?.id || '',
      storeName: orderSelectedStore?.name || '',
      storeAddress: orderSelectedStore?.address || '',
      storeTel: orderSelectedStore?.phone || '',
    }

    setDeliveryInfo(nextDeliveryInfo)
    Object.entries(nextDeliveryInfo).forEach(([field, value]) => {
      if (value !== undefined && value !== null) {
        setValue(field, value)
      }
    })
  }, [
    orderNumber,
    orderRecipientInfo?.name,
    orderRecipientInfo?.phone,
    orderDeliveryNote,
    orderSelectedStore?.id,
    orderSelectedStore?.name,
    orderSelectedStore?.address,
    orderSelectedStore?.phone,
    setDeliveryInfo,
    setValue,
  ])

  // 已登入使用者自動帶入資料（仍維持既有行為）
  useEffect(() => {
    if (isLogin && user.name && !customerInfo.fullName) {
      setValue('fullName', user.name || '')
      setValue('phone', user.phone || '')
    }
  }, [customerInfo.fullName, isLogin, setValue, user])

  // 處理表單驗證錯誤
  const onError = errors => {
    // 獲取第一個錯誤欄位的名稱
    const firstErrorField = Object.keys(errors)[0]

    if (firstErrorField) {
      // 找到對應的 DOM 元素
      const errorElement = document.getElementById(firstErrorField)

      if (errorElement) {
        // 滾動到該元素，並添加一些偏移量以確保標題可見
        errorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })

        // 延遲 focus，確保滾動完成後再 focus
        setTimeout(() => {
          errorElement.focus()
        }, 500)
      }
    }
  }

  // 提交表單
  const onSubmit = async data => {
    try {
      if (!orderNumber) {
        router.push(PATH.cart)
        return
      }

      // 儲存資料到 Checkout Store
      setCustomerInfo({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
      })

      setDeliveryInfo({
        sameAsCustomer: data.sameAsCustomer,
        deliveryName: data.deliveryName,
        recipientPhone: data.recipientPhone,
        deliveryNote: data.deliveryNote,
      })

      setAgreeToTerms(data.agreeToTerms)

      await updateOrder({
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.phone,
        customerGender: data.gender || undefined,
        recipientName: data.deliveryName,
        recipientPhone: data.recipientPhone,
        deliveryNote: data.deliveryNote || undefined,
      })

      // 導向訂單確認頁面（攜帶 orderNumber）
      startRouting(() => {
        const confirmUrl = orderNumber
          ? `${PATH.confirm}?orderNumber=${encodeURIComponent(orderNumber)}`
          : PATH.confirm
        router.push(confirmUrl)
      })
    } catch (error) {
      console.error('提交失敗:', error)
    }
  }

  if (isOrderDetailUnauthorized) {
    return (
      <UnauthorizedState
        title="沒有權限"
        description="您沒有權限檢視這筆訂單。請確認已登入正確帳號，或洽客服協助。"
        actions={[
          {
            label: '前往登入',
            variant: 'outline',
            className:
              'border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white',
            onClick: () => router.push(PATH.auth.login),
          },
          {
            label: '返回商品頁',
            className: 'bg-blue-primary text-white hover:bg-blue-primary/90',
            onClick: () => router.push(PATH.products.list),
          },
        ]}
      />
    )
  }

  // 如果購物車為空，不渲染表單
  if (items.length === 0) {
    return null
  }

  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={2} />

        {/* 頁面標題 */}
        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">結帳</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請填寫收件資訊以完成訂單
          </p>
        </div>

        {/* 表單 */}
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_350px]">
            {/* 左側：表單區 */}
            <div className="space-y-6">
              {/* 訂購人資訊 */}
              <CustomerInfoForm />

              {/* 收件人資訊 */}
              <DeliveryInfoForm
                orderNumber={orderNumber}
                merchantTradeNo={ecpayMerchantTradeNo}
                selectedStore={orderDetailResponse?.data?.selectedStore}
              />

              {/* 條款同意 */}
              <TermsCheckbox />
            </div>

            {/* 右側：訂單摘要 */}
            <OrderSummary order={orderDetailResponse?.data} />
          </div>

          {/* 按鈕區 */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(PATH.cart)}
              className="h-12 w-full border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回購物車
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || isRouting}
              className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90 sm:w-auto font-anton tracking-widest"
            >
              {isSubmitting || isRouting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  處理中...
                </>
              ) : (
                '確認訂單'
              )}
            </Button>
          </div>
        </FormProvider>
      </div>
    </section>
  )
}
