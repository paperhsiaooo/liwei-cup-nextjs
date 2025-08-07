import { Controller, useFormContext } from 'react-hook-form'

// ----------------------------------------------------------------------

export default function RHFTextField({ name, type, ...other }) {
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
            className="bg-white/40 rounded-[18px] min-h-[68px] py-4 px-6 outline-none"
          />
          {error && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
