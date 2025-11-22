'use client'

import { cn } from '@/lib/utils'

const CHECKOUT_STEPS = [
  { step: 1, title: '購物車' },
  { step: 2, title: '填寫資訊' },
  { step: 3, title: '訂單確認' },
]

export default function CheckoutProgress({ currentStep, className }) {
  return (
    <div className={cn('w-full py-6', className)}>
      <div className="flex items-center justify-center">
        {CHECKOUT_STEPS.map((step, index) => (
          <div key={step.step} className="flex items-center">
            {/* 圓圈和標題的容器 */}
            <div className="flex flex-col items-center gap-2">
              {/* 圓圈 */}
              <div
                className={cn(
                  'w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold',
                  step.step === currentStep || step.step < currentStep
                    ? 'bg-blue-primary text-white'
                    : 'bg-slate-300 text-slate-600',
                )}
              >
                {step.step}
              </div>

              {/* 標題文字 */}
              <p
                className={cn(
                  'text-xs md:text-sm font-noto-sans-tc text-center whitespace-nowrap',
                  step.step === currentStep || step.step < currentStep
                    ? 'text-blue-primary font-semibold'
                    : 'text-slate-600',
                )}
              >
                {step.title}
              </p>
            </div>

            {/* 連接線 */}
            {index < CHECKOUT_STEPS.length - 1 && (
              <div
                className={cn(
                  'w-20 md:w-32 lg:w-48 h-0.5 mb-6',
                  step.step < currentStep ? 'bg-blue-primary' : 'bg-slate-300',
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
