import { NextResponse } from 'next/server'

const SUCCESS_CODE = 10_000
const INVALID_INPUT_CODE = 111_001
const AUTH_TOKEN_NOT_FOUND_CODE = 111_005
const SERVER_ERROR_CODE = 111_002

const ORDER_PATH = '/api/private/v1/order'

const requiredItemFields = ['productId', 'variantId', 'quantity']

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

function isValidPositiveInteger(value) {
  const numberValue = Number(value)
  return Number.isSafeInteger(numberValue) && numberValue > 0
}

function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return 'items 至少需要一筆商品'
  }

  const invalidIndex = items.findIndex(item => {
    if (typeof item !== 'object' || item === null) {
      return true
    }

    return requiredItemFields.some(field => {
      if (!(field in item)) {
        return true
      }

      if (field === 'quantity') {
        return !isValidPositiveInteger(item[field])
      }

      return !isValidPositiveInteger(item[field])
    })
  })

  if (invalidIndex !== -1) {
    return `items[${invalidIndex}] 資料格式不正確`
  }

  return ''
}

export async function POST(request) {
  const body = await request.json().catch(() => null)
  const hasClientIntentId =
    typeof body?.clientIntentId === 'string' &&
    body.clientIntentId.trim().length > 0
  if (!hasClientIntentId) {
    return buildResponse(400, INVALID_INPUT_CODE, 'clientIntentId 不可為空')
  }
  const validationMessage = validateItems(body?.items)

  if (validationMessage) {
    return buildResponse(400, INVALID_INPUT_CODE, validationMessage)
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

  const upstreamUrl = new URL(ORDER_PATH, upstreamBase).toString()

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const payload = await upstreamResponse
      .json()
      .catch(() => ({ data: null, retStatus: { code: SERVER_ERROR_CODE } }))

    // 後端成功回應時直接回傳
    if (upstreamResponse.ok && payload?.retStatus?.code === SUCCESS_CODE) {
      return NextResponse.json(payload, {
        status: upstreamResponse.status,
      })
    }

    // 若後端回傳錯誤碼，沿用其錯誤結構與 HTTP 狀態碼
    if (payload?.retStatus?.code) {
      return NextResponse.json(payload, {
        status: upstreamResponse.status,
      })
    }

    return buildResponse(502, SERVER_ERROR_CODE, '後端回應格式異常，請稍後再試')
  } catch (error) {
    console.error('[api/order/create] upstream error', error)
    return buildResponse(
      502,
      SERVER_ERROR_CODE,
      '無法連線到後端服務，請稍後再試',
    )
  }
}
