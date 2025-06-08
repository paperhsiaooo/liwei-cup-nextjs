import clsx from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

export function RHFCheckbox({ name, id, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div
            {...other}
            className={twMerge(
              'relative flex justify-center items-center',
              other.className,
            )}
          >
            <input
              id={id}
              {...field}
              disabled={other.disabled}
              type="checkbox"
              className={clsx(
                'appearance-none w-4 h-4 border-1 rounded-[2px] border-primary-main bg-white',
                field.value ? 'bg-primary-600' : 'border-dark-500 bg-white',
                other.disabled
                  ? 'cursor-not-allowed !bg-gray-300'
                  : 'cursor-pointer',
              )}
            />
            {field.value && (
              <FaCheck className="absolute pointer-events-none text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-main" />
            )}
          </div>
        )
      }}
    />
  )
}
