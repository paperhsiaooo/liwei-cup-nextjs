import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'

function CustomTextarea({ disabled, name, placeholder }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Textarea
            className="text-sm font-anton h-40"
            disabled={disabled}
            placeholder={placeholder}
            value={field.value}
            onChange={event => {
              field.onChange(event)
            }}
          />
        )
      }}
    />
  )
}

export default CustomTextarea
