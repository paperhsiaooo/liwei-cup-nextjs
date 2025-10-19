'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

// 密碼強度計算函數
export function calculatePasswordStrength(password) {
  let score = 0

  if (password.length >= 8) score++ // 基本長度
  if (password.length >= 12) score++ // 較長
  if (/[a-z]/.test(password)) score++ // 小寫字母
  if (/[A-Z]/.test(password)) score++ // 大寫字母
  if (/[0-9]/.test(password)) score++ // 數字
  if (/[^A-Za-z0-9]/.test(password)) score++ // 特殊符號

  if (score <= 2) return { level: 'weak', label: '弱', color: 'red', score }
  if (score <= 4)
    return { level: 'medium', label: '中等', color: 'orange', score }
  return { level: 'strong', label: '強', color: 'green', score }
}

export default function PasswordInput({
  name,
  label = '密碼',
  placeholder = '請輸入密碼',
  showStrength = false,
  ...other
}) {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const password = watch(name)
  const error = errors[name]

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name)}
          {...other}
          className={`w-full rounded-lg border-2 px-4 py-3 pr-12 transition-colors focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-gray-300 focus:border-blue-primary'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
          aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p
          id={`${name}-error`}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error.message}
        </p>
      )}

      {showStrength && password && password.length > 0 && (
        <div className="mt-2">
          <PasswordStrength password={password} />
        </div>
      )}
    </div>
  )
}

// PasswordStrength component imported inline
function PasswordStrength({ password, className = '' }) {
  const strength = calculatePasswordStrength(password)
  const { label, color, score } = strength

  const colors = {
    red: {
      bar: 'bg-red-500',
      text: 'text-red-500',
    },
    orange: {
      bar: 'bg-orange-500',
      text: 'text-orange-500',
    },
    green: {
      bar: 'bg-green-500',
      text: 'text-green-500',
    },
  }

  const filledBars = Math.min(Math.ceil((score / 6) * 5), 5)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-1 gap-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index < filledBars ? colors[color].bar : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <span className={`text-sm font-medium ${colors[color].text}`}>
        {label}
      </span>
    </div>
  )
}
