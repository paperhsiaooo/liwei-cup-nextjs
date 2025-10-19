'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import CheckoutProgress from '@/components/common/checkout-progress'
import FormProvider from '@/components/common/hook-form/form-provider'
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

export default function CheckoutView() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // 購物車資料
  const items = useCartStore(state => state.items)

  // 會員資料
  const user = useUserContext(state => state.user)
  const isLogin = user.isLogin

  // Checkout Store
  const { customerInfo, deliveryInfo, agreeToTerms } = useCheckoutStore()
  const { setCustomerInfo, setDeliveryInfo, setAgreeToTerms } =
    useCheckoutStore()

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

  const { handleSubmit, setValue } = methods

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

  // 已登入使用者自動帶入資料
  useEffect(() => {
    if (isLogin && user.name && !customerInfo.fullName) {
      // 只在第一次進入且沒有儲存的資料時自動帶入
      setValue('fullName', user.name || '')
      setValue('phone', user.phone || '')
      // email 目前 user-context 沒有，待後續處理
    }
  }, [isLogin, user, customerInfo, setValue])

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
      setIsSubmitting(true)

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
        deliveryAddress: data.deliveryAddress,
        deliveryNote: data.deliveryNote,
      })

      setAgreeToTerms(data.agreeToTerms)

      // 導向訂單確認頁面
      router.push(PATH.confirm)
    } catch (error) {
      console.error('提交失敗:', error)
    } finally {
      setIsSubmitting(false)
    }
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
              <DeliveryInfoForm />

              {/* 條款同意 */}
              <TermsCheckbox />
            </div>

            {/* 右側：訂單摘要 */}
            <OrderSummary />
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
              disabled={isSubmitting}
              className="h-12 w-full bg-green-primary text-blue-primary hover:bg-green-primary/90 sm:w-auto font-anton tracking-widest"
            >
              {isSubmitting ? (
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
