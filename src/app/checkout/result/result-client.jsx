'use client'

import { CheckCircle, Loader2, RefreshCw, XCircle } from 'lucide-react'
import Link from 'next/link'
import { parseAsString, useQueryStates } from 'nuqs'
import { useCallback, useEffect, useState } from 'react'

import { useOrderDetail } from '@/apis/hook/use-order'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PATH } from '@/routers/path'

const MAX_POLLING_ATTEMPTS = 5
const POLLING_INTERVAL_MS = 1500

export default function CheckoutResultClient() {
  // 使用 nuqs 解析 query string
  const [params] = useQueryStates({
    status: parseAsString.withDefault('processing'),
    orderNumber: parseAsString,
    message: parseAsString,
  })

  const { status, orderNumber, message } = params

  // 輪詢計數器
  const [pollingCount, setPollingCount] = useState(0)
  const [shouldPoll, setShouldPoll] = useState(status === 'processing')

  // 查詢訂單詳情
  const {
    data: orderData,
    isLoading,
    isError,
    error,
    refetch,
  } = useOrderDetail(orderNumber, {
    enabled: Boolean(orderNumber),
    retry: false,
    refetchInterval: shouldPoll ? POLLING_INTERVAL_MS : false,
  })

  const order = orderData?.data

  // 處理輪詢邏輯
  useEffect(() => {
    if (!shouldPoll) return

    // 如果訂單已付款，停止輪詢
    if (order?.status === 'paid') {
      setShouldPoll(false)
      return
    }

    // 達到最大輪詢次數，停止輪詢
    if (pollingCount >= MAX_POLLING_ATTEMPTS) {
      setShouldPoll(false)
      return
    }

    setPollingCount(prev => prev + 1)
  }, [order?.status, pollingCount, shouldPoll])

  // 判斷 token 是否過期（401 錯誤）
  const isTokenExpired =
    isError &&
    (error?.response?.status === 401 || error?.response?.status === 403)

  // 計算最終顯示狀態
  const displayStatus = useCallback(() => {
    // 如果訂單已查到且狀態為 paid，顯示成功
    if (order?.status === 'paid') return 'success'

    // 如果 URL 明確帶 success 且沒有訂單資料（可能 token 過期），仍顯示成功基本資訊
    if (status === 'success') return 'success'

    // 如果明確是失敗
    if (status === 'failed') return 'failed'

    // 其他情況（processing 或輪詢中）
    return 'processing'
  }, [order?.status, status])

  const currentStatus = displayStatus()

  // 手動重試
  const handleRetry = () => {
    setPollingCount(0)
    setShouldPoll(true)
    refetch()
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-2xl border-4 border-slate-900 bg-white p-8 shadow-lg">
        {/* 狀態圖示 */}
        <div className="mb-6 flex justify-center">
          {currentStatus === 'success' && (
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          )}
          {currentStatus === 'failed' && (
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="h-16 w-16 text-red-600" />
            </div>
          )}
          {currentStatus === 'processing' && (
            <div className="rounded-full bg-blue-100 p-4">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
            </div>
          )}
        </div>

        {/* 標題 */}
        <h1
          className={cn(
            'mb-4 text-center font-anton text-2xl font-bold tracking-wide',
            currentStatus === 'success' && 'text-green-600',
            currentStatus === 'failed' && 'text-red-600',
            currentStatus === 'processing' && 'text-blue-600',
          )}
        >
          {currentStatus === 'success' && '付款成功！'}
          {currentStatus === 'failed' && '付款失敗'}
          {currentStatus === 'processing' && '付款處理中...'}
        </h1>

        {/* 訂單資訊 */}
        {orderNumber && (
          <div className="mb-6 space-y-2 rounded-lg bg-slate-50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">訂單編號</span>
              <span className="font-medium text-slate-900">{orderNumber}</span>
            </div>

            {order && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">付款金額</span>
                  <span className="font-medium text-slate-900">
                    NT$ {order.totalAmount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">付款方式</span>
                  <span className="font-medium text-slate-900">信用卡</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* 失敗訊息 */}
        {currentStatus === 'failed' && message && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            <p className="font-medium">失敗原因：</p>
            <p>{message}</p>
          </div>
        )}

        {/* Token 過期提示 */}
        {isTokenExpired && currentStatus === 'success' && (
          <div className="mb-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
            <p>登入已逾期，需重新登入才能查看訂單詳情。</p>
            <p className="mt-1 text-xs">
              付款已成功處理，您可以稍後在訂單列表中查看。
            </p>
          </div>
        )}

        {/* 處理中提示 */}
        {currentStatus === 'processing' && (
          <div className="mb-6 text-center text-sm text-slate-600">
            {isLoading ? (
              <p>正在確認付款狀態...</p>
            ) : pollingCount >= MAX_POLLING_ATTEMPTS ? (
              <div className="space-y-2">
                <p>付款狀態確認中，請稍後查看訂單。</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRetry}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  重新確認
                </Button>
              </div>
            ) : (
              <p>
                正在確認付款狀態 ({pollingCount}/{MAX_POLLING_ATTEMPTS})...
              </p>
            )}
          </div>
        )}

        {/* 成功提示 */}
        {currentStatus === 'success' && !isTokenExpired && (
          <div className="mb-6 text-center text-sm text-slate-600">
            <p>感謝您的購買！我們將盡快處理您的訂單。</p>
            {order?.customerEmail && (
              <p className="mt-1">
                訂單確認信已寄送至：
                <span className="font-medium">{order.customerEmail}</span>
              </p>
            )}
          </div>
        )}

        {/* 賽事活動提示 */}
        {currentStatus === 'success' && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-700">
            <p className="font-medium">🏐 期待在賽場上見到您！</p>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {currentStatus === 'success' && (
            <>
              <Button
                asChild
                className="flex-1 bg-blue-primary hover:bg-blue-primary/90"
              >
                <Link href={PATH.products.list}>繼續購物</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href={PATH.root}>回到首頁</Link>
              </Button>
            </>
          )}

          {currentStatus === 'failed' && (
            <>
              {orderNumber && (
                <Button
                  asChild
                  className="flex-1 bg-orange-primary hover:bg-orange-primary/90"
                >
                  <Link
                    href={`${PATH.checkout.pay}?orderNumber=${orderNumber}`}
                  >
                    重新付款
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="flex-1">
                <Link href={PATH.cart}>返回購物車</Link>
              </Button>
            </>
          )}

          {currentStatus === 'processing' && !isLoading && (
            <Button asChild variant="outline" className="flex-1">
              <Link href={PATH.root}>回到首頁</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
