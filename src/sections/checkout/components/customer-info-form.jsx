'use client'

import { RHFSelect } from '@/components/common/hook-form/rhf-select'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'

import { GENDER_OPTIONS } from '../schema/checkout-schema'

export default function CustomerInfoForm() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="border-b px-6 py-5">
        <h2 className="font-anton text-xl text-blue-primary">訂購人資訊</h2>
      </div>

      <div className="space-y-5 p-6">
        {/* 全名 */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            全名 <span className="text-red-500">*</span>
          </label>
          <RHFTextField
            name="fullName"
            placeholder="請輸入全名"
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>

        {/* 信箱 */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            信箱 <span className="text-red-500">*</span>
          </label>
          <RHFTextField
            name="email"
            type="email"
            placeholder="example@email.com"
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>

        {/* 聯絡電話 */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            聯絡電話 <span className="text-red-500">*</span>
          </label>
          <RHFTextField
            name="phone"
            type="tel"
            placeholder="0912-345-678"
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>

        {/* 性別 */}
        <div>
          <label
            htmlFor="gender"
            className="mb-2 block text-base font-semibold text-slate-700"
          >
            性別
          </label>
          <RHFSelect
            name="gender"
            placeholder="請選擇性別"
            options={GENDER_OPTIONS}
            className="w-full min-h-[48px] rounded-lg border-2 border-slate-300 px-3 py-2 text-sm transition-colors focus:border-blue-primary focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}
