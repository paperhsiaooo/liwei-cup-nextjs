import { create } from 'zustand'

export const STEP = {
  INVITE_CODE: 1,
  PLAYER_INFO: 2,
  DECLARATIONS: 3,
  COMPLETE: 4,
}

const useProgressContext = create(set => ({
  data: [
    {
      step: STEP.INVITE_CODE,
      title: '邀請碼輸入',
    },
    {
      step: STEP.PLAYER_INFO,
      title: '球員資料',
    },
    {
      step: STEP.DECLARATIONS,
      title: '參戰宣言',
    },
    {
      step: STEP.COMPLETE,
      title: '完成！！',
    },
  ],
  currentStep: STEP.INVITE_CODE,
  setCurrentStep: step => set(() => ({ currentStep: step })),
  setData: data => set(() => ({ data })),
}))

export default useProgressContext
