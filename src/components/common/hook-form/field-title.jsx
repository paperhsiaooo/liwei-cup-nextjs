import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

function FieldTitle({
  title,
  sideColor = 'bg-primary-800',
  textClass = 'text-primary-800',
}) {
  return (
    <div className="flex items-center gap-x-3">
      <span
        className={twMerge('inline-block w-1 h-5 rounded-full', sideColor)}
      />
      <h4
        className={twMerge(
          'inline-block desktop-regular-h4 lg:desktop-regular-h3',
          textClass,
        )}
      >
        {title}
      </h4>
    </div>
  )
}

export default memo(FieldTitle)
