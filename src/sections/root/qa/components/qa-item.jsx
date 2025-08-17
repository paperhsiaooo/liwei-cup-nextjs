'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

function QaItem({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="border border-blue-primary overflow-hidden">
      {/* Question 部分 - 可點擊 */}
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-3 cursor-pointer text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center group"
      >
        <span className="font-bold text-base text-blue-primary pr-4">
          {question}
        </span>
        <svg
          className={cn(
            'w-5 h-5 text-gray-500 transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Answer 部分 - 可摺疊 */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div
          className="px-4 py-4 bg-white text-blue-primary text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: answer }}
        >
          {/* {answer} */}
        </div>
      </div>
    </div>
  )
}

export default QaItem
