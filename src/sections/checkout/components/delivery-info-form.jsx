'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { RHFCheckbox } from '@/components/common/hook-form/rhf-checkbox'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { RHFTextarea } from '@/components/common/hook-form/rhf-textarea'

export default function DeliveryInfoForm() {
  const { watch, setValue } = useFormContext()
  const sameAsCustomer = watch('sameAsCustomer')

  const handle711ButtonClick = useCallback(() => {
    // 必須用真實 form POST 到 ECPay，不能 fetch；此法避免 nested form
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = `${process.env.NEXT_PUBLIC_ECPAY_LOGISTICS_URL}`

    const append = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }

    // 依照你的需求填入固定或動態值（可改為從 react-hook-form 取值）
    append('MerchantID', process.env.NEXT_PUBLIC_ECPAY_MERCHANT_ID)
    append('MerchantTradeNo', 'TEST20251024A') // 可改為實際 cartId 或 orderDraftId
    append('LogisticsType', 'CVS')
    append('LogisticsSubType', 'UNIMARTC2C')
    append('IsCollection', 'N')
    append(
      'ServerReplyURL',
      `${process.env.NEXT_PUBLIC_ECPAY_SERVER_REPLY_URL}`,
    )

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }, [])

  // 監聽 sameAsCustomer 變化（若勾選，將訂購人資料同步到收件人）
  const handleSameAsCustomerChange = checked => {
    if (checked) {
      const fullName = watch('fullName')
      const phone = watch('phone')
      setValue('deliveryName', fullName)
      setValue('recipientPhone', phone)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b px-6 py-5">
        <h2 className="font-anton text-xl text-blue-primary">收件人資訊</h2>
      </div>

      <div className="space-y-5 p-6">
        {/* 同訂購人資訊 Checkbox */}
        <div className="rounded-lg border-2 border-green-primary/30 bg-green-primary/10 p-4">
          <RHFCheckbox
            name="sameAsCustomer"
            label={
              <span className="text-sm font-semibold text-blue-primary">
                同訂購人資訊
              </span>
            }
            className="border-blue-primary data-[state=checked]:bg-blue-primary data-[state=checked]:border-blue-primary"
            onCheckedChange={handleSameAsCustomerChange}
          />
        </div>

        {/* 收件人姓名 */}
        <div>
          <label
            htmlFor="deliveryName"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            收件人姓名 <span className="text-red-500">*</span>
          </label>
          <RHFTextField
            name="deliveryName"
            placeholder="請輸入收件人姓名"
            disabled={sameAsCustomer}
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          />
        </div>

        {/* 收件人電話 */}
        <div>
          <label
            htmlFor="recipientPhone"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            收件人電話 <span className="text-red-500">*</span>
          </label>
          <RHFTextField
            name="recipientPhone"
            type="tel"
            placeholder="0912-345-678"
            disabled={sameAsCustomer}
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
          />
        </div>

        <button
          type="button"
          onClick={handle711ButtonClick}
          className="inline-flex items-center justify-center rounded-lg border-2 border-blue-primary px-4 py-2 text-sm font-semibold text-blue-primary transition hover:bg-blue-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-primary/50"
          aria-label="選擇 7-11 門市（開啟電子地圖）"
        >
          選擇 7-11 門市
        </button>

        {/* 配送地址 */}
        <div>
          <label
            htmlFor="deliveryAddress"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            配送地址 <span className="text-red-500">*</span>
          </label>
          <RHFTextarea
            name="deliveryAddress"
            placeholder="請輸入完整配送地址"
            rows={2}
            className="w-full min-h-[110px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>

        {/* 配送備註 */}
        <div>
          <label
            htmlFor="deliveryNote"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            配送備註
          </label>
          <RHFTextarea
            name="deliveryNote"
            placeholder="例如：請於下午配送、放置大門口"
            rows={3}
            className="w-full min-h-[110px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
