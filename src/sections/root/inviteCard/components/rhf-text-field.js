import { Controller, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

// ----------------------------------------------------------------------

export default function RHFTextField({ name, type, className, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          <input
            type={type}
            name={name}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={event => {
              if (type === 'number') {
                field.onChange(Number(event.target.value))
              } else {
                field.onChange(event.target.value)
              }
            }}
            {...other}
            className={twMerge(
              'text-xl rounded-[14px] outline-none',
              className,
            )}
          />
          {error && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
