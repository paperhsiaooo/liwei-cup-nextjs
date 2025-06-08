import { Controller, useFormContext } from 'react-hook-form'

// ----------------------------------------------------------------------

export default function RHFTextField({ name, type, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
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
            className="border rounded-sm py-2 px-3 outline-none"
          />
          {error && (
            <label className="text-red-500 text-sm">{error?.message}</label>
          )}
        </div>
      )}
    />
  )
}
