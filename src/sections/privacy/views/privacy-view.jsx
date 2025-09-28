import BgLayout from '@/layout/bg-layout'

function PrivacyView() {
  return (
    <section id="privacy">
      <BgLayout>
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">隱私權政策</h1>
        <p className="mb-6 text-sm text-gray-800">最後更新日期：2025-09-29</p>

        <div className="space-y-6 leading-relaxed text-gray-800">
          <p>
            力維盃（以下稱「本網站」或「本活動」）重視您的隱私，依據《個人資料保護法》與相關法令，說明我們如何蒐集、處理與利用您的個人資料，並說明您可行使之權利。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">一、蒐集目的與法源</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>活動報名、賽事安排與通知（契約履行／合法權益）</li>
            <li>商品販售、出貨與退換（契約履行／合法權益）</li>
            <li>客服與申訴處理（契約履行／合法權益／法律義務）</li>
            <li>行銷與活動訊息（經您同意或基於合法權益）</li>
            <li>資訊安全、詐騙防制與法令遵循（法律義務／公共利益）</li>
          </ol>

          <h2 className="mt-8 text-2xl font-semibold">
            二、蒐集之個人資料類別
          </h2>
          <p>將視目的而異，可能包含下列類別（例如且不限於）：</p>
          <ul className="list-disc list-inside space-y-2">
            <li>基本識別：姓名、暱稱、性別、生日。</li>
            <li>聯絡方式：電子郵件、行動電話、通訊地址。</li>
            <li>
              交易與配送：收件人姓名、地址、聯絡電話、訂單資料、發票資料。
            </li>
            <li>
              金流相關：付款方式、部分交易識別資訊（由合作金流保管之必要資訊）。
            </li>
            <li>
              網站使用：IP 位址、瀏覽器與裝置資訊、Cookie/SDK 事件、使用紀錄。
            </li>
            <li>
              活動必要：球隊名稱、衣服尺寸、餐食偏好、緊急聯絡人等活動執行所需資料。
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">
            三、利用期間、地區、對象與方式
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-medium">期間：</span>
              蒐集目的存續期間、依法令之保存期間，或您撤回同意／請求刪除之前。
            </li>
            <li>
              <span className="font-medium">地區：</span>
              中華民國境內及提供服務或合作廠商所在地。
            </li>
            <li>
              <span className="font-medium">對象：</span>
              本網站、受託處理之第三方（如：金流、物流、客服與行銷服務商）、依法有權機關。
            </li>
            <li>
              <span className="font-medium">方式：</span>
              自動化或非自動化之處理與利用，包含電子、紙本與雲端系統。
            </li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">四、第三方與國際傳輸</h2>
          <p>
            為完成交易與服務，本網站可能於必要範圍內提供資料予合作夥伴（如金流、物流、客服／簡訊與電子信件服務商、雲端主機）。若涉及跨境傳輸，將依相關法令與合約要求進行保護。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">五、資訊安全</h2>
          <p>
            我們採行合理之技術與組織措施（存取控管、加密傳輸、權限管理、稽核紀錄），降低未授權存取、洩漏、竄改或毀損之風險。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">六、您的權利</h2>
          <p>
            您可依《個資法》行使：查詢或請求閱覽、製給複製本、補充或更正、停止蒐集處理利用、刪除等權利。申請方式請聯繫下列窗口，我們將依法於合理期間內處理（可能酌收必要成本費用）。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">七、Cookie 與類似技術</h2>
          <p>
            本網站可能使用 Cookie／本地儲存／SDK
            追蹤，以提供登入、購物車、成效統計與個人化內容。您可於瀏覽器設定限制或刪除
            Cookie，但部分功能可能受影響。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">八、未成年人</h2>
          <p>
            未滿二十歲者，應由法定代理人閱讀並同意本政策後使用服務或提供資料。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">九、政策變更</h2>
          <p>
            本政策得視需求調整並公告於本網站，修訂自公告日起生效。重大變更將以合適方式另行通知。
          </p>

          <h2 className="mt-8 text-2xl font-semibold">十、聯絡方式</h2>
          <p className="not-italic text-gray-700">
            主辦單位：力維盃活動籌備團隊
            <br />
            客服信箱：
            <a
              className="text-blue-600 underline font-noto-sans-tc"
              href="mailto:support@liweicup.tw"
            >
              support@liweicup.tw
            </a>
            <br />
            聯絡電話：02-0000-0000（週一至週五 10:00–18:00）
            <br />
            通訊地址：請以訂單或官網公告為準
          </p>
        </div>
      </BgLayout>
    </section>
  )
}

export default PrivacyView
