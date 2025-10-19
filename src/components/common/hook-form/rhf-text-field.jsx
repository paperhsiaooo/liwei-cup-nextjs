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
            id={name}
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
              'min-h-[48px] rounded-lg border-2 bg-white px-3 py-2 text-sm outline-none transition-colors border-slate-300 focus:border-blue-primary',
              className,
              error && 'border-red-500 focus:border-red-500',
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          {error && (
            <label id={`${name}-error`} className="text-sm text-red-500">
              {error?.message}
            </label>
          )}
        </div>
      )}
    />
  )
}
