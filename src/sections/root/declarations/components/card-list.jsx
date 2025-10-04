'use client'

import '../style/index.css'

import { Card, CardContent } from '..'

function CardList({ battleDeclarations = [], declarationsOptions = [] }) {
  // 輔助函數：根據 category 和 value 查找對應的 label
  const findDeclarationText = (category, value) => {
    const categoryData = declarationsOptions[category]
    if (!categoryData) return ''

    const item = categoryData.find(option => option.value === value)
    return item ? item.label : ''
  }

  // 輔助函數：處理 declaration_data 字串
  const parseDeclarationData = declarationData => {
    if (!declarationData) return ['', '', '']

    const values = declarationData.split(',').map(v => v.trim())

    return [
      findDeclarationText('Category1', values[0] || ''),
      findDeclarationText('Category2', values[1] || ''),
      findDeclarationText('Category3', values[2] || ''),
    ]
  }

  // 將數據按 15 個一組分組，確保每組都有足夠的內容
  const chunkArray = (array, chunkSize) => {
    const chunks = []
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize))
    }
    return chunks
  }

  const declarationChunks = chunkArray(battleDeclarations, 15)

  // 如果最後一行少於15個，從開頭補充
  if (declarationChunks.length > 0) {
    const lastChunk = declarationChunks[declarationChunks.length - 1]
    if (lastChunk.length < 15) {
      const remaining = 15 - lastChunk.length
      const supplement = battleDeclarations.slice(0, remaining)
      lastChunk.push(...supplement)
    }
  }

  // 跑馬燈動畫組件
  const MarqueeRow = ({
    declarations,
    direction = 'left',
    speed = 50,
    isLastRow = false,
  }) => {
    const animationClass =
      direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

    // 如果是最後一行且少於 15 個，需要特殊處理
    const repeatCount = isLastRow && declarations.length < 15 ? 4 : 3

    return (
      <div className="overflow-hidden whitespace-nowrap">
        <div
          className={`inline-flex gap-4 ${animationClass}`}
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          {/* 根據行數決定重複次數，確保無縫循環 */}
          {Array.from({ length: repeatCount }, () => declarations)
            .flat()
            .map((declaration, index) => {
              const [declaration1, declaration2, declaration3] =
                parseDeclarationData(declaration.declaration_data)

              return (
                <div
                  key={`${declaration.id}-${index}`}
                  className="flex-shrink-0 w-[282px]"
                >
                  <Card>
                    <CardContent
                      name={declaration.nick_name}
                      declaration1={declaration1}
                      declaration2={declaration2}
                      declaration3={declaration3}
                      no={declaration.id}
                    />
                  </Card>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10">
      {declarationChunks.map((chunk, rowIndex) => {
        return (
          <div key={rowIndex} className="relative z-10 mb-4">
            <MarqueeRow
              declarations={chunk}
              direction={rowIndex % 2 === 0 ? 'left' : 'right'}
              speed={100 + rowIndex * 10}
            />
          </div>
        )
      })}

      {battleDeclarations?.length > 0 && (
        <div className="absolute -bottom-4 z-0 w-full bg-green-primary h-24" />
      )}
    </div>
  )
}

export default CardList
