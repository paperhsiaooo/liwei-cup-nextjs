'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

/**
 * React Hook Form wrapper for shadcn Textarea component
 */
export function RHFTextarea({ name, className, ...other }) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <Textarea
            id={name}
            {...field}
            className={cn(
              className,
              error &&
                'border-red-500 focus:border-red-500 focus-visible:ring-red-500',
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...other}
          />
          {error && (
            <label id={`${name}-error`} className="text-sm text-red-500">
              {error.message}
            </label>
          )}
        </div>
      )}
    />
  )
}
