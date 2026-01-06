import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import AutoSubmitForm from './autoSubmitForm'

const ERROR_MESSAGES = {
  117002: '訂單已付款完成',
  117003: '訂單已取消',
  117004: '訂單不存在',
  117007: '您沒有權限存取此訂單',
}

export default async function CheckoutPayPage({ searchParams }) {
  const params = await searchParams
  const orderNumber = params?.orderNumber?.trim()

  if (!orderNumber) {
    redirect('/cart')
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('acToken')?.value

  if (!accessToken) {
    const qs = new URLSearchParams({ orderNumber }).toString()
    redirect(`/auth/login?next=/checkout/pay?${qs}`)
  }

  console.log('[CheckoutPayPage] orderNumber:', orderNumber)

  const res = await fetch(
    process.env.BASE_URL + '/api/private/v1/payment/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `acToken=${accessToken}`,
      },
      body: JSON.stringify({ orderNumber }),
      cache: 'no-store',
    },
  )

  const json = await res.json()
  console.log('[CheckoutPayPage] response:', json)

  if (!res.ok || json?.retStatus?.code !== 10000) {
    const code = json?.retStatus?.code
    const errorMessage = ERROR_MESSAGES[code] || '建立付款失敗，請回上一頁重試'

    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-slate-700">{errorMessage}</p>
          <a
            href="/cart"
            className="mt-4 inline-block text-blue-primary underline"
          >
            返回購物車
          </a>
        </div>
      </div>
    )
  }

  const data = json.data

  return (
    <AutoSubmitForm
      action={data.action}
      merchantId={data.merchantId}
      tradeInfo={data.tradeInfo}
      tradeSha={data.tradeSha}
      version={data.version}
      bizOrderId={data.bizOrderId}
    />
  )
}
