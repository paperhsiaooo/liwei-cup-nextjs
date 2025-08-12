import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

function ProgressDeclarations() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="rounded-[14px] bg-white p-3">123</div>
      <button type="submit" className={twMerge('btn-primary')}>
        <span className="text-white text-base">下一步</span>
      </button>
    </div>
  )
}

export default memo(ProgressDeclarations)
