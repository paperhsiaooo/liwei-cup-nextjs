import BgLayout from '@/layout/bg-layout'

function ReturnPolicyView() {
  return (
    <section id="return-policy">
      <BgLayout>
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">退換貨政策</h1>
        <p className="mb-6 text-sm text-gray-800">最後更新日期：2025-09-29</p>

        <article className="space-y-6 leading-relaxed text-gray-800">
          <div>
            <h2 className="text-2xl font-semibold">一、申請期限與資格</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>請於到貨次日起七日內（含例假日）透過客服提出退換貨申請。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">二、申請流程</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>聯繫客服 → 提供訂單編號、問題描述與照片（若為瑕疵）。</li>
              <li>收到審核通知 → 依指示寄回（或安排物流到宅取件）。</li>
              <li>檢查驗收 → 通過後辦理退款或換貨。</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">三、運費與方式</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>瑕疵／寄錯：往返運費由本網站負擔。</li>
              <li>
                個人因素退貨：運費由消費者負擔；若原訂單含免運，退款時將扣除實際運費。
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">四、退款時程</h2>
            <p>
              本網站於驗收無誤後七個工作日內完成退款；信用卡退款以發卡行作業時間為準。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">五、以下情形恕不受理</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>超過七日鑑賞期。</li>
              <li>已使用、污損、缺件、吊牌剪除、包裝破損或無法復原者。</li>
              <li>客製化／預購特製品（非商品瑕疵）。</li>
              <li>因個人偏好（色差、尺寸不合且屬主觀認定）但已使用之情形。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">六、贈品</h2>
            <p>退貨需退贈品；遺失或毀損可能影響退貨權益。</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">七、聯絡方式</h2>
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

export default ReturnPolicyView
