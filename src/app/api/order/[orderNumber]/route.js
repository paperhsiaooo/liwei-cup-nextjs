import { NextResponse } from 'next/server'

const SUCCESS_CODE = 10_000
const INVALID_INPUT_CODE = 111_001
const AUTH_TOKEN_NOT_FOUND_CODE = 111_005
const SERVER_ERROR_CODE = 111_002

const ORDER_PATH = '/api/private/v1/order'

function buildResponse(status, code, message = '', data = null) {
  return NextResponse.json(
    {
      data,
      retStatus: {
        code,
        message,
      },
    },
    { status },
  )
}
export async function GET(request, { params }) {
  const orderNumber = params?.orderNumber

  if (!orderNumber) {
    return buildResponse(400, INVALID_INPUT_CODE, 'orderNumber 缺失')
  }

  const authorization = request.headers.get('authorization')
  if (!authorization) {
    return buildResponse(
      401,
      AUTH_TOKEN_NOT_FOUND_CODE,
      '缺少授權資訊，請重新登入',
    )
  }

  const upstreamBase =
    process.env.GO_SERVICE_BASE_URL ||
    process.env.LIWEI_GO_SERVICE_BASE_URL ||
    process.env.BASE_URL

  if (!upstreamBase) {
    return buildResponse(
      500,
      SERVER_ERROR_CODE,
      '後端服務位址尚未設定，請通知系統管理員',
    )
  }

  const upstreamUrl = new URL(
    `${ORDER_PATH}/${encodeURIComponent(orderNumber)}`,
    upstreamBase,
  ).toString()

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        Authorization: authorization,
      },
      cache: 'no-store',
    })

    const payload = await upstreamResponse
      .json()
      .catch(() => ({ data: null, retStatus: { code: SERVER_ERROR_CODE } }))

    if (upstreamResponse.ok && payload?.retStatus?.code === SUCCESS_CODE) {
      return NextResponse.json(payload, {
        status: upstreamResponse.status,
      })
    }

    if (payload?.retStatus?.code) {
      return NextResponse.json(payload, {
        status: upstreamResponse.status,
      })
    }

    return buildResponse(502, SERVER_ERROR_CODE, '後端回應格式異常，請稍後再試')
  } catch (error) {
    console.error('[api/order/[orderNumber]] upstream error', error)
    return buildResponse(
      502,
      SERVER_ERROR_CODE,
      '無法連線到後端服務，請稍後再試',
    )
  }
}
