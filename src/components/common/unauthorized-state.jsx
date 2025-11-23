'use client'

import classNames from 'clsx'

import { Button } from '@/components/ui/button'

function ActionButtons({ actions = [] }) {
  if (!actions.length) {
    return null
  }

  return actions.map(
    ({ label, onClick, variant = 'default', className, ...btnProps }) => (
      <Button
        key={label}
        type="button"
        variant={variant}
        onClick={onClick}
        className={classNames('h-12 px-6', className)}
        {...btnProps}
      >
        {label}
      </Button>
    ),
  )
}

export default function UnauthorizedState({
  title = '沒有權限',
  description = '您沒有權限檢視此內容。',
  actions = [],
  className,
}) {
  return (
    <section className={classNames('root', className)}>
      <div className="wrapper py-10 1440:py-14 flex flex-col items-center text-center space-y-6">
        <h1 className="font-anton text-4xl text-blue-primary">{title}</h1>
        <p className="max-w-xl text-base text-slate-600">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ActionButtons actions={actions} />
        </div>
      </div>
    </section>
  )
}
