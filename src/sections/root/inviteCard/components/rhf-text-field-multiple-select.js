import { Controller, useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

// ----------------------------------------------------------------------

export default function RHFTextFieldMultipleSelect({ title, name }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative flex flex-col gap-1">
          <h5 className="absolute top-4 px-4 text-blue-primary text-base font-bold">
            {title}
          </h5>
          <div className="flex flex-col gap-y-2 pb-2 bg-white rounded-[18px] pt-14 font-noto-sans-tc">
            <div className="flex gap-x-2 h-[38px] px-3">
              <button
                type="button"
                className={twMerge(
                  'flex-1 h-full rounded-[10px] text-gray-primary w-[100px] duration-150',
                  field.value === 'xs' && 'bg-green-primary text-white',
                )}
                onClick={() => field.onChange('xs')}
              >
                XS
              </button>
              <button
                type="button"
                className={twMerge(
                  'h-full flex-1 rounded-[10px] text-gray-primary w-[100px] duration-150',
                  field.value === 's' && 'bg-green-primary text-white',
                )}
                onClick={() => field.onChange('s')}
              >
                S
              </button>
            </div>
            <div className="flex gap-x-2 h-[38px] px-3">
              <button
                type="button"
                className={twMerge(
                  'flex-1 h-full rounded-[10px] text-gray-primary w-[100px] duration-150',
                  field.value === 'm' && 'bg-green-primary text-white',
                )}
                onClick={() => field.onChange('m')}
              >
                M
              </button>
              <button
                type="button"
                className={twMerge(
                  'h-full flex-1 rounded-[10px] text-gray-primary w-[100px] duration-150',
                  field.value === 'l' && 'bg-green-primary text-white',
                )}
                onClick={() => field.onChange('l')}
              >
                L
              </button>
            </div>
            <div className="flex gap-x-2 h-[38px] px-3">
              <button
                type="button"
                className={twMerge(
                  'w-[calc(50%-6px)] h-full rounded-[10px] text-gray-primary duration-150',
                  field.value === 'xl' && 'bg-green-primary text-white',
                )}
                onClick={() => field.onChange('xl')}
              >
                XL
              </button>
            </div>
          </div>
          {error && (
            <label className="text-red-500 text-sm text-right mr-4">
              {error?.message}
            </label>
          )}
        </div>
      )}
    />
  )
}
