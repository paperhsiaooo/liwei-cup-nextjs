import { twMerge } from 'tailwind-merge'

export default function ProgressPoint({ active = false, text = '' }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={twMerge(
          'w-3 h-3 bg-white rounded-full block',
          active && 'bg-blue-primary',
        )}
      />
      <p
        className={twMerge(
          'text-white text-sm font-bold 1440:text-lg',
          active && 'text-blue-primary',
        )}
      >
        {text}
      </p>
    </div>
  )
}
