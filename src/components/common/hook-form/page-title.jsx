import { memo } from 'react'

function PageTitle({ title }) {
  return (
    <div className="pb-2 relative lg:pb-[10px]">
      <h5 className="text-dark-900 mobile-regular-h2 text-center lg:desktop-regular-h5">
        {title}
      </h5>
      <span className="absolute z-10 -translate-x-1/2 translate-y-1/2 left-1/2 bottom-0 inline-block w-8 h-[2px] bg-primary-500 rounded-full" />
    </div>
  )
}

export default memo(PageTitle)
