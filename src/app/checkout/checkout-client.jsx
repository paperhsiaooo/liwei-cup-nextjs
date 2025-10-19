'use client'

import CheckoutProgress from '@/components/common/checkout-progress'

function CheckoutClient() {
  return (
    <section className="root">
      <div className="wrapper py-10 1440:py-14">
        {/* 進度指示器 */}
        <CheckoutProgress currentStep={2} />

        <div className="mb-8 space-y-3">
          <h1 className="font-anton text-4xl text-blue-primary">結帳</h1>
          <p className="font-noto-sans-tc text-muted-foreground">
            請填寫收件資訊以完成訂單。
          </p>
        </div>

        {/* 結帳表單內容 */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="font-anton text-xl text-blue-primary mb-6">
              收件資訊
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  姓名 *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                  placeholder="請輸入您的姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  電話 *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                  placeholder="請輸入您的電話號碼"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  地址 *
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-primary focus:border-transparent"
                  placeholder="請輸入您的完整地址"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button className="w-full bg-green-primary text-blue-primary font-bold py-3 px-6 rounded-lg hover:bg-green-primary/90 transition-colors">
                確認訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutClient
