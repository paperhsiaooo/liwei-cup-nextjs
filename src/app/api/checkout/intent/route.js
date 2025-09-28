import { cookies, headers } from 'next/headers'
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
  // 雲端環境可能位於反向代理後方（host 會變成 localhost:PORT），改用 forwarded headers 建立正確的絕對網址
  const headerList = headers()
  const rawForwardedHost = headerList.get('x-forwarded-host')
  const forwardedHost = rawForwardedHost
    ? rawForwardedHost.split(',')[0].trim()
    : null
  const hostHeader = headerList.get('host')
  const host = forwardedHost || hostHeader

  const rawForwardedProto = headerList.get('x-forwarded-proto')
  const forwardedProto = rawForwardedProto
    ? rawForwardedProto.split(',')[0].trim()
    : null
  const defaultProto =
    host && (host.includes('localhost') || host.startsWith('127.'))
      ? 'http'
      : 'https'
  const proto = forwardedProto || defaultProto

  const baseUrl = host ? `${proto}://${host}` : new URL(req.url).origin
  const redirectUrl = new URL('/checkout/pay', baseUrl)

  return NextResponse.redirect(redirectUrl, 303)
}
