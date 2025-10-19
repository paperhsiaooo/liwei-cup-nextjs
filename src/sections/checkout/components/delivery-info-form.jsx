'use client'

import { useFormContext } from 'react-hook-form'

import { RHFCheckbox } from '@/components/common/hook-form/rhf-checkbox'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { RHFTextarea } from '@/components/common/hook-form/rhf-textarea'

export default function DeliveryInfoForm() {
  const { watch, setValue } = useFormContext()
  const sameAsCustomer = watch('sameAsCustomer')

  // 監聽 sameAsCustomer 變化
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
