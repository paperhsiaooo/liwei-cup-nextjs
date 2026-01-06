'use client'

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

export default function PasswordStrength({ password, className = '' }) {
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
    <div
      className={`flex items-center gap-2 ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
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
        密碼強度: {label}
      </span>
    </div>
  )
}
