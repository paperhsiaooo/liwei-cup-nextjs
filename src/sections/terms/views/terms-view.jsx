import BgLayout from '@/layout/bg-layout'

function TermsView() {
  return (
    <section id="terms">
      <BgLayout>
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">服務條款</h1>
        <p className="mb-6 text-sm text-gray-800">最後更新日期：2025-09-29</p>
        <article className="space-y-6 leading-relaxed text-gray-800">
          <div>
            <h2 className="text-2xl font-semibold">一、同意條款</h2>
            <p>
              您註冊或使用本網站即表示同意本條款及相關政策（含隱私權政策、消費者權益、退換貨政策）。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">二、會員帳號</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>註冊時請提供正確完整之資料，並維持最新。</li>
              <li>
                帳號限本人使用，請妥善保管登入憑證；因保管不善所致之風險由會員自負。
              </li>
              <li>若發現未經授權使用，請立即通知本網站。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">三、服務內容</h2>
            <p>
              本網站提供賽事報名、活動資訊、周邊商品購買、訂單查詢與客服支援等。實際功能以當前頁面與公告為準，本網站得隨時增修服務並於網站公告。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">四、使用規範</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>不得從事違法、侵害他人權益或影響系統安全之行為。</li>
              <li>不得未經授權擷取或使用他人資料、圖片、影音與內容。</li>
              <li>本網站可因維護、資安或政策需要暫停或終止全部或部分服務。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">五、交易與訂單</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                商品與價格以頁面顯示為準；訂單成立以系統完成結帳與通知為準。
              </li>
              <li>
                若因庫存、系統或其他不可抗力因素無法出貨，本網站得取消訂單並辦理退款。
              </li>
              <li>發票處理、出貨與配送將依頁面說明與退換貨政策進行。</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">六、智慧財產權</h2>
            <p>
              本網站之圖文、標誌、排版與程式等權利屬本網站或合法權利人所有，未經授權請勿使用。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">七、責任限制</h2>
            <p>
              在法律允許範圍內，本網站對於因不可抗力、第三方服務或使用者因素所致之損害不負賠償責任；對於付費服務，最高責任以該筆交易之金額為限。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">八、終止與停權</h2>
            <p>
              若會員違反法令或本條款，本網站得暫停或終止帳號與服務，並保留法律追訴權。
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">九、準據法與管轄</h2>
            <p>
              本條款以中華民國法律為準據法；如有爭議，除法律另有強制規定外，以臺灣臺中地方法院為第一審管轄法院。
            </p>
          </div>
        </article>
      </BgLayout>
    </section>
  )
}

export default TermsView
