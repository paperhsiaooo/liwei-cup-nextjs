'use client'

import { Skeleton } from '@mui/material'
import { useEffect } from 'react'

function AutoSubmitForm({
  action,
  merchantId,
  tradeInfo,
  tradeSha,
  version,
  productId,
  bizOrderId,
}) {
  useEffect(() => {
    // 存下 bizOrderId 以便重試（同一業務訂單重用）
    try {
      localStorage.setItem(`bizOrderId:${productId}`, bizOrderId)
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
  }, [action, merchantId, tradeInfo, tradeSha, version, productId, bizOrderId])

  return (
    <>
      <form action={action} method="post">
        <input type="hidden" name="merchantId" value={merchantId} />
        <input type="hidden" name="tradeInfo" value={tradeInfo} />
        <input type="hidden" name="tradeSha" value={tradeSha} />
        <input type="hidden" name="version" value={version} />
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="bizOrderId" value={bizOrderId} />
      </form>

      <div className="w-full h-dvh flex items-center justify-center">
        <div className="text-2xl font-bold">
          付款中...
          <Skeleton />
        </div>
      </div>
    </>
  )
}

export default AutoSubmitForm
