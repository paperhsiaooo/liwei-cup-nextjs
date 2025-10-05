import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

function CustomTextarea({ disabled, name, placeholder, className }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Textarea
            className={cn(className, 'text-sm font-anton h-40 1440:text-lg')}
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
