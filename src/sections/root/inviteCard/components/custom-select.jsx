import { Controller, useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function CustomSelect({ disabled, name, placeholder, options = [] }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const value = field.value ? String(field.value) : ''

        return (
          <Select
            disabled={disabled}
            value={value}
            onValueChange={event => {
              field.onChange(event)
            }}
          >
            <SelectTrigger className="w-full 1440:text-lg 1440:px-3 1440:py-5">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="1440:text-lg"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}

export default CustomSelect
