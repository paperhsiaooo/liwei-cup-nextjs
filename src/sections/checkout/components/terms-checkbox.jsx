'use client'

import Link from 'next/link'

import { RHFCheckbox } from '@/components/common/hook-form/rhf-checkbox'

export default function TermsCheckbox() {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="p-6">
        <div className="rounded-lg border-2 border-green-primary/30 bg-green-primary/10 p-4">
          <RHFCheckbox
            name="agreeToTerms"
            label={
              <span className="text-sm font-noto-sans-tc leading-relaxed text-slate-700">
                我已詳閱並同意網站的
                <Link
                  href="/terms"
                  target="_blank"
                  className="mx-1 font-semibold text-blue-primary underline hover:text-blue-600"
                  onClick={e => e.stopPropagation()}
                >
                  服務條款
                </Link>
                與
                <Link
                  href="/privacy"
                  target="_blank"
                  className="mx-1 font-semibold text-blue-primary underline hover:text-blue-600"
                  onClick={e => e.stopPropagation()}
                >
                  隱私權政策
                </Link>
                <span className="text-red-500">*</span>
              </span>
            }
            className="border-blue-primary data-[state=checked]:bg-blue-primary data-[state=checked]:border-blue-primary"
          />
        </div>
      </div>
    </div>
  )
}
