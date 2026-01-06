'use client'

import { useEffect } from 'react'

function AutoSubmitForm({
  action,
  merchantId,
  tradeInfo,
  tradeSha,
  version,
  bizOrderId,
}) {
  useEffect(() => {
    // 存下 bizOrderId 以便重試（同一業務訂單重用）
    try {
      localStorage.setItem(`lastBizOrderId`, bizOrderId)
    } catch {}

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = action

    const add = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.appendChild(input)
    }

    // 注意：送藍新需使用固定欄位名稱（大寫/原始）
    add('MerchantID', merchantId)
    add('TradeInfo', tradeInfo)
    add('TradeSha', tradeSha)
    add('Version', version)

    document.body.appendChild(form)
    form.submit()
  }, [action, merchantId, tradeInfo, tradeSha, version, bizOrderId])

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-slate-700">付款中...</div>
        <div className="mt-4 h-2 w-48 mx-auto rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full w-1/2 bg-blue-primary animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default AutoSubmitForm
