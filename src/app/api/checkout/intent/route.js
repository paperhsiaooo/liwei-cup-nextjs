import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json().catch(() => null)

  if (!body?.productId || !body?.quantity || !body?.email) {
    return NextResponse.json({ error: 'invalid input' }, { status: 400 })
  }

  // 將訂單意圖存入 HttpOnly Cookie（短時效，例如 10 分鐘）
  const cookieStore = await cookies()
  cookieStore.set('order_intent', JSON.stringify(body), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 10 * 60,
    path: '/',
  })

  console.log(
    '>>> [checkout/intent] order_intent: ',
    cookieStore.get('order_intent'),
  )

  // 303 導向支付導轉頁
  return NextResponse.redirect(new URL('/checkout/pay', req.url), 303)
}
