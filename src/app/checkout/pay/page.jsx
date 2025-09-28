import { cookies } from 'next/headers'

import AutoSubmitForm from './autoSubmitForm'

export default async function CheckoutPayPage() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('order_intent')

  if (!cookie?.value) {
    return <p>訂單資訊遺失，請回上一頁重試</p>
  }

  const intent = JSON.parse(cookie.value)
  console.log('[CheckoutPayPage] cookie: ', cookie)

  const res = await fetch(process.env.BASE_URL + '/api/payment/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // 後端會在 bizOrderId 未帶時自動生成並回傳
    body: JSON.stringify(intent),
    // 若同網域可帶 credentials，跨網域請設定 CORS
    // credentials: "include",
    cache: 'no-store',
  })

  const json = await res.json()
  console.log('[CheckoutPayPage] json: ', json)

  if (!res.ok || json?.retStatus?.code !== 10000) {
    return <p>建立付款失敗，請回上一頁重試</p>
  }

  const data = json.data

  return (
    <AutoSubmitForm
      action={data.action}
      merchantId={data.merchantId}
      tradeInfo={data.tradeInfo}
      tradeSha={data.tradeSha}
      version={data.version}
      productId={intent.productId}
      bizOrderId={data.bizOrderId}
    />
  )
}
