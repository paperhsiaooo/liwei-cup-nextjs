import { memo } from 'react'

function Title({ title = 'unknown' }) {
  return (
    <div className="flex flex-row justify-start items-center gap-x-2">
      <span className="w-[11px] h-[11px] rounded-full bg-green-primary inline-block" />
      <p className="text-blue-primary text-[16px] leading-[100%] font-antonio font-bold">{`// ${title}`}</p>
    </div>
  )
}

export default memo(Title)
