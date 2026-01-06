'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

/**
 * React Hook Form wrapper for shadcn Checkbox component
 */
export function RHFCheckbox({
  name,
  label,
  className,
  children,
  onCheckedChange,
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
        const handleCheckedChange = checked => {
          field.onChange(checked)
          if (onCheckedChange) {
            onCheckedChange(checked)
          }
        }

        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={handleCheckedChange}
                className={cn(className)}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...other}
              />
              {(label || children) && (
                <label
                  htmlFor={name}
                  className="inline-flex items-center cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {children || label}
                </label>
              )}
            </div>
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
