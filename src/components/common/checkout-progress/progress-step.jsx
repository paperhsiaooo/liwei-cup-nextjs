'use client'

import { cn } from '@/lib/utils'

export default function ProgressStep({
  stepNumber,
  title,
  isActive,
  isCompleted,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      {/* 圓圈圖標 */}
      <div
        className={cn(
          'w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold',
          isActive || isCompleted
            ? 'bg-blue-primary text-white'
            : 'bg-slate-300 text-slate-600',
        )}
      >
        {stepNumber}
      </div>

      {/* 標題文字 */}
      <p
        className={cn(
          'text-xs md:text-sm font-noto-sans-tc text-center',
          isActive || isCompleted
            ? 'text-blue-primary font-semibold'
            : 'text-slate-600',
        )}
      >
        {title}
      </p>
    </div>
  )
}
