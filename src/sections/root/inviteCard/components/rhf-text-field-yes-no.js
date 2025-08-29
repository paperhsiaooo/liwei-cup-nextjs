import { Controller, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

// ----------------------------------------------------------------------

export default function RHFTextFieldYesNo({ title, name }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative flex flex-col gap-1">
          <h5 className="absolute top-1/2 -translate-y-1/2 px-4 text-blue-primary text-base font-bold">
            {title}
          </h5>
          <div className="flex gap-x-2 bg-white rounded-[18px] h-[54px] py-2 pl-24 pr-2">
            <button
              type="button"
              className={twMerge(
                'flex-1 h-full rounded-[10px] text-gray-primary w-[100px] duration-150 cursor-pointer',
                field.value === 0 && 'bg-green-primary text-white',
              )}
              onClick={() => field.onChange(0)}
            >
              否
            </button>
            <button
              type="button"
              className={twMerge(
                'h-full flex-1 rounded-[10px] text-gray-primary w-[100px] duration-150 cursor-pointer',
                field.value === 1 && 'bg-green-primary text-white',
              )}
              onClick={() => field.onChange(1)}
            >
              是
            </button>
          </div>
          {error && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
