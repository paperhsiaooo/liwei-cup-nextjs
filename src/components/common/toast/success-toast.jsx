'use client'

import { CheckCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function SuccessToast({
  toastId,
  title = '加入成功',
  description,
  visible = true,
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const show = mounted && visible

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex max-w-[320px] items-center gap-3 rounded-2xl border-2 border-blue-primary bg-white px-5 py-4 font-noto-sans-tc text-blue-primary shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out sm:max-w-[360px] ${
        show
          ? 'translate-x-0 opacity-100'
          : 'translate-x-3 opacity-0 pointer-events-none'
      }`}
    >
      <CheckCircle className="size-6 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">{title}</p>
        {description ? (
          <p className="text-xs leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="關閉通知"
        onClick={() => toast.dismiss(toastId)}
        className="flex size-7 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-red-300 hover:text-red-500 cursor-pointer"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SuccessToast
