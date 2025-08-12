import { Controller, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

// ----------------------------------------------------------------------

export default function RHFTextFieldTitle({
  title,
  name,
  type,
  className,
  ...other
}) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-y-1">
          <div className="relative flex flex-col gap-1">
            <h5 className="absolute top-1/2 -translate-y-1/2 px-4 text-blue-primary text-base font-bold">
              {title}
            </h5>
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
                'text-xl bg-white rounded-[18px] h-[54px] leading-[52px] py-4 px-4 outline-none',
                className,
              )}
            />
          </div>
          {error && (
            <label className="text-red-500 text-sm text-right mr-4 font-noto-sans-tc">
              {error?.message}
            </label>
          )}
        </div>
      )}
    />
  )
}
