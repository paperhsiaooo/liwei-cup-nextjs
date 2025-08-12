import { create } from 'zustand'

const useProgressContext = create(set => ({
  data: [
    {
      step: 1,
      title: '邀請碼輸入',
    },
    {
      step: 2,
      title: '球員資料',
    },
    {
      step: 3,
      title: '參戰宣言',
    },
    {
      step: 4,
      title: '完成！！',
    },
  ],
  currentStep: 1,
  setCurrentStep: step => set(() => ({ currentStep: step })),
  setData: data => set(() => ({ data })),
}))

export default useProgressContext
