import QaItem from './qa-item'

function QaContainer() {
  const qaList = [
    {
      question: '什麼是「リキイ 盃」？',
      answer:
        '<b>リキイ 盃（力維盃）</b>是一個想邀請身邊認識的球友們齊聚一堂的活動，不只是比賽，更是彼此交流、結識新朋友、一起享受打球樂趣的契機。希望讓每個參與的人，都能留下開心的回憶✨。<br /><br />「即使不像當年打得一樣好，但想和這些人再多打一下球」',
    },
    {
      question: '如何報名參加比賽？',
      answer:
        '本次活動採用邀請制，每位選手都會收到一張專屬的邀請卡，當天只要憑卡即可入場並參加比賽。<br /><br />請記得攜帶邀請卡，這是確認參賽資格重要的憑證。',
    },
    {
      question: '地點和時間？',
      answer:
        '比賽地點在「三米線僑中館」，詳細地址為「新北市板橋區僑中一街 124 巷 27-5 號」<br /><br />活動時間為 11/15 12:20~18:40。',
    },
    {
      question: '規則有哪些？',
      answer: `
      ① 每場比賽採 31 分制，沒有 deuce（平分加賽），先達 31 分即獲勝。<br /><br />
      ② 本賽事採用 <b>女子網高（224cm）</b>，男生須從後排起跳進攻（雙腳不得踩或越過前排線）、女生不強制需要碰球，戰術可自由發揮。<br /><br />
      ③ <b>越界</b> 或 <b>觸網</b> 皆視為失分，依裁判判定執行。<br /><br />
      ④ 其餘部分皆遵照一般女子排球規則（FIVB 標準）。
      `,
    },
    {
      question: '是否可以臨時加人參賽？如果臨時無法參賽，可以更換或取消嗎？',
      answer:
        '本比賽不開放臨時新增球員。若參賽者因故無法參賽，請事先通知主辦方。若需更換球員，需經主辦方同意，並於比賽前完成確認。',
    },
    {
      question: '我想贊助比賽，要怎麼做？',
      answer:
        '本活動不接受任何形式的現金贊助，僅開放實物或服務協助。您的支持，將成為 リキイ 盃更加熱血、更加難忘的重要力量！<br /><br /> 👉🏼 <a href="https://forms.gle/33AnQWEcQsF3KQZn9" target="_blank" rel="noopener noreferrer">點此填寫贊助表單</a>',
    },
    {
      question: '比賽結束後會有比賽照片或影片嗎？會在哪裡公布？',
      answer:
        '將會有夥伴協助拍攝動態與靜態影像。照片與影片將於比賽結束後，陸續公布於「リキイ 盃」活動群組，供選手與觀眾瀏覽及下載。',
    },
  ]

  return (
    <div className="space-y-2 1440:space-y-4">
      {qaList.map((qa, index) => (
        <QaItem
          key={index}
          question={qa.question}
          answer={qa.answer}
          defaultOpen={index === 0} // 第一個項目預設展開
        />
      ))}
    </div>
  )
}

export default QaContainer
