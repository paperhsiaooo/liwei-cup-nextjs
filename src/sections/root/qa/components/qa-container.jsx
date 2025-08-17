import QaItem from './qa-item'

function QaContainer() {
  const qaList = [
    {
      question: '什麼是「リキイ 盃」？',
      answer:
        '「力維盃」是一場靈感來自我前司曾舉辦的「創動盃」，但因各種原因沒有參加到覺得好可惜。<br /><br />所以我想透過「力維盃」，邀請身邊認識的球友們齊聚一堂，不只是比賽，更是彼此交流、結識新朋友、一起享受打球樂趣的契機。這是一場屬於大家的賽事，希望讓每個參與的人，都能留下開心的回憶。🏐✨',
    },
    {
      question: '如何參加比賽？',
      answer:
        '您可以透過我們的官方網站進行報名，填寫相關資料並完成報名流程。請注意報名截止日期，以免錯過參賽機會。',
    },
    {
      question: '比賽有什麼獎品？',
      answer:
        '我們為優勝者準備了豐富的獎品，包括現金獎勵、遊戲周邊商品以及特別的榮譽證書。詳細獎品內容會在比賽前公布。',
    },
    {
      question: '參賽有年齡限制嗎？',
      answer:
        '是的，參賽者需要年滿18歲。未滿18歲的參賽者需要監護人同意並簽署相關文件。',
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
