import QaItem from './qa-item'

function QaContainer() {
  const qaList = [
    {
      question: '什麼是「リキイ 盃」？',
      answer:
        '「力維盃」是一個想邀請身邊認識的球友們齊聚一堂的活動，不只是比賽，更是彼此交流、結識新朋友、一起享受打球樂趣的契機。希望讓每個參與的人，都能留下開心的回憶✨。<br /><br />「即使我們不像當年打得一樣好，但想和這些人再多打一下球」的想法，就是力維盃想表達的意義。',
    },
    {
      question: '如何報名參加比賽？',
      answer:
        '本次活動採用邀請制，每位選手都會收到都會收到一張專屬的邀請卡，當天只要憑卡即可入場並參加比賽。<br /><br />請記得攜帶邀請卡，這是確認參賽資格重要的憑證。',
    },
    {
      question: '我想贊助比賽，要怎麼做？',
      answer:
        '本活動不接受任何形式的現金贊助，僅開放實物或服務協助。您的支持，將成為力維盃更加熱血、更加難忘的重要力量！<br /><br /> 👉🏼 <a href="https://forms.gle/33AnQWEcQsF3KQZn9" target="_blank" rel="noopener noreferrer">點此填寫贊助表單</a>',
    },
    {
      question: '關於比賽規則與分隊',
      answer: '本此',
    },
  ]

  return (
    <div className="space-y-2">
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
