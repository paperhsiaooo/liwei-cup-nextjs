import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'

const inputStyledOptions = {
  normal: 'w-4 before:w-2',
  small: 'w-[14px] before:w-[5px]',
}

const labelStyledOptions = {
  normal: 'desktop-jf-h3',
  small: 'desktop-jf-h4',
}

export function RHFRadioButton({
  size = 'normal',
  id,
  name,
  label,
  value,
  disabled,
}) {
  const { control } = useFormContext()

  const inputStyle = inputStyledOptions[size]
  const labelStyle = labelStyledOptions[size]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className="flex flex-row items-center space-x-1">
            <input
              id={id}
              {...field}
              type="radio"
              value={value}
              onChange={event => field.onChange(event.target.value)}
              className={clsx(
                'appearance-none relative aspect-square border-[1px] rounded-full duration-100 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:aspect-square before:rounded-full before:bg-primary-main before:duration-200',
                inputStyle,
                field.value === value
                  ? 'border-primary-main before:opacity-100'
                  : 'border-primary-main before:opacity-0',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              disabled={disabled}
            />
            <label
              htmlFor={id}
              className={clsx(
                labelStyle,
                disabled
                  ? 'cursor-not-allowed text-dark-500'
                  : 'cursor-pointer text-primary-main',
              )}
            >
              {label}
            </label>
          </div>
        )
      }}
    />
  )
}
