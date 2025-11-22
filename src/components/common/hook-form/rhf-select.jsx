'use client'

import { Controller, useFormContext } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/**
 * React Hook Form wrapper for shadcn Select component
 */
export function RHFSelect({
  name,
  placeholder = '請選擇',
  options = [],
  disabled = false,
  className = '',
  ...other
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // 如果 value 是空字串或 falsy，傳 undefined 給 Select 以顯示 placeholder
        const value = field.value ? String(field.value) : undefined

        return (
          <div className="flex flex-col gap-1">
            <Select
              disabled={disabled}
              value={value}
              onValueChange={newValue => {
                field.onChange(newValue)
              }}
              {...other}
            >
              <SelectTrigger
                id={name}
                className={cn(
                  className,
                  error &&
                    'border-red-500 focus:border-red-500 focus:ring-red-500',
                )}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(option => (
                    <SelectItem
                      key={option.value}
                      value={String(option.value)}
                      className="text-sm"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && (
              <label id={`${name}-error`} className="text-sm text-red-500">
                {error.message}
              </label>
            )}
          </div>
        )
      }}
    />
  )
}
