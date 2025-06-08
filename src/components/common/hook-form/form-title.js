import { memo } from 'react'

function FormTitle({ title, musted, htmlFor }) {
  return (
    <label className="space-x-1 flex items-center" htmlFor={htmlFor}>
      {musted && (
        <span className="desktop-regular-h5 text-primary-main desktop-jf-h3">
          *
        </span>
      )}
      <span className="text-primary-main desktop-jf-h3">{title}</span>
    </label>
  )
}

export default memo(FormTitle)
