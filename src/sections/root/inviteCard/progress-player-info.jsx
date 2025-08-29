'use client'

import { memo } from 'react'

import FormProvider from '@/components/common/hook-form/form-provider'
import { ROLE } from '@/config/constants'

import RHFTextFieldMultipleSelect from './components/rhf-text-field-multiple-select'
import RHFTextFieldTitle from './components/rhf-text-field-title'
import RHFTextFieldYesNo from './components/rhf-text-field-yes-no'
import usePlayerInfoForm from './hook/usePlayerInfoForm'

function ProgressPlayerInfo() {
  const { user, methods, isParticipating, handleSubmit, onSubmit } =
    usePlayerInfoForm()

  return (
    <div className="flex flex-col pt-6 pb-20">
      <h4 className="progress-title">球員資料</h4>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4 max-w-[850px] mx-auto pt-6">
          <RHFTextFieldTitle
            title="暱稱"
            name="nickName"
            type="text"
            placeholder="(๑•̀ㅂ•́)و✧ チビちゃん"
            className="text-right text-blue-primary pl-20 placeholder:font-noto-sans-jp placeholder:text-[#233145]/20 font-normal"
          />

          {(user.role === ROLE.PLAYER || user.role === ROLE.OTHER) && (
            <RHFTextFieldYesNo
              title="是否參戰"
              name="isParticipating"
              className="text-right text-blue-primary pl-20 placeholder:font-noto-sans-jp placeholder:text-[#233145]/20 font-normal"
            />
          )}

          {isParticipating === 0 && (
            <div className="flex flex-col gap-y-1">
              <RHFTextFieldTitle
                title="收件地址"
                name="address"
                type="text"
                placeholder="請輸入有效地址"
                className="text-right text-blue-primary pl-24 placeholder:font-noto-sans-jp placeholder:text-[#233145]/20 font-normal"
              />
              <p className="text-sm text-gray-primary px-2">
                旅外選手請輸入有效的海外收件地址。
              </p>
            </div>
          )}
          <RHFTextFieldMultipleSelect
            title="衣服尺寸"
            name="shirtSize"
            className="text-right text-blue-primary pl-20 placeholder:font-noto-sans-jp placeholder:text-[#233145]/20 font-normal"
          />
          <button type="submit" className={'btn-primary'}>
            <span className="text-white text-base">
              {user.isCheckedIn ? '更新資料' : '下一步'}
            </span>
          </button>
        </div>
      </FormProvider>
    </div>
  )
}

export default memo(ProgressPlayerInfo)
