import BgLayout from '@/layout/bg-layout'

function ConsumerRightsView() {
  return (
    <section id="consumer-rights">
      <BgLayout>
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">消費者權益</h1>
        <p className="mb-6 text-sm text-gray-800">最後更新日期：2025-09-29</p>

        <article className="space-y-6 leading-relaxed text-gray-800">
          <div>
            <h2 className="text-2xl font-semibold">
              一、七日鑑賞期（非試用期）
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>依《消費者保護法》，您享有商品到貨次日起七日之鑑賞期。</li>
              <li>
                鑑賞期非試用期，退貨時商品須保持全新、完整包裝與附件（含吊牌、配件、贈品、發票）。
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">二、商品瑕疵與寄錯</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                若商品有瑕疵或寄送錯誤，請於到貨七日內聯繫客服，我們將盡速處理換貨或退款，相關運費由本網站負擔。
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">三、個人因素退貨</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                非瑕疵之退貨，請於七日內提出申請並維持商品完整；退回運費由消費者自行負擔。
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">四、不適用退換貨之情形</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>已拆封之貼身或衛生考量商品。</li>
              <li>已使用、污損、氣味殘留或無法復原之商品。</li>
              <li>超過七日鑑賞期。</li>
              <li>客製化／預購特製品（下單後依規定不得任意退換）。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">五、退款作業</h2>
            <p>
              本網站於確認退回商品無誤後，七個工作日內完成退款（信用卡將依發卡行入帳期）。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">六、聯絡方式</h2>
            <address className="not-italic text-gray-700">
              客服信箱：
              <a
                className="text-blue-600 underline font-noto-sans-tc"
                href="mailto:support@liwei-cup.com"
              >
                support@liwei-cup.com
              </a>
            </address>
          </div>
        </article>
      </BgLayout>
    </section>
  )
}

export default ConsumerRightsView
