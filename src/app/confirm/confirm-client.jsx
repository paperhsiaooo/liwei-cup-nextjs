'use client'

import CheckoutProgress from '@/components/common/checkout-progress'

function ConfirmClient() {
  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={3} />

        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">訂單確認</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請確認您的訂單資訊。
          </p>
        </div>

        {/* 訂單確認內容 */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 訂單摘要 */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="font-anton text-xl text-blue-primary mb-6">
              訂單摘要
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-slate-600">商品小計</span>
                <span className="font-semibold text-blue-primary">NT$ 780</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-slate-600">運費</span>
                <span className="text-slate-600">NT$ 0</span>
              </div>

              <div className="flex justify-between items-center py-3 text-lg font-bold">
                <span className="text-blue-primary">總計</span>
                <span className="text-blue-primary">NT$ 780</span>
              </div>
            </div>
          </div>

          {/* 收件資訊確認 */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="font-anton text-xl text-blue-primary mb-6">
              收件資訊
            </h2>

            <div className="space-y-3 text-slate-600">
              <div>
                <span className="font-medium">姓名：</span>
                <span>王小明</span>
              </div>

              <div>
                <span className="font-medium">電話：</span>
                <span>0912345678</span>
              </div>

              <div>
                <span className="font-medium">地址：</span>
                <span>台北市信義區信義路五段7號</span>
              </div>
            </div>
          </div>

          {/* 商品清單 */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="font-anton text-xl text-blue-primary mb-6">
              商品清單
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 py-3 border-b">
                <div className="w-16 h-16 bg-slate-100 rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-primary">
                    Volleyball Socks Classic+ SE
                  </h3>
                  <p className="text-sm text-slate-600">
                    2025藍 / M (20-24.5cm)
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-primary">NT$ 300</p>
                  <p className="text-sm text-slate-600">數量：2</p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-3 border-b">
                <div className="w-16 h-16 bg-slate-100 rounded-lg"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-primary">
                    Volleyball T-Shirt
                  </h3>
                  <p className="text-sm text-slate-600">午夜藍 / S</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-primary">NT$ 480</p>
                  <p className="text-sm text-slate-600">數量：1</p>
                </div>
              </div>
            </div>
          </div>

          {/* 確認按鈕 */}
          <div className="text-center">
            <button className="bg-green-primary text-blue-primary font-bold py-4 px-8 rounded-lg hover:bg-green-primary/90 transition-colors text-lg">
              確認並付款
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmClient
