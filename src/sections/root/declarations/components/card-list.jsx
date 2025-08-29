'use client'

import 'swiper/css'
import '../style/index.css'

import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card, CardContent } from '..'

function CardList({ battleDeclarations = {}, declarationsOptions = [] }) {
  // 辅助函数：根据 category 和 value 查找对应的 label
  const findDeclarationText = (category, value) => {
    const categoryData = declarationsOptions[category]
    if (!categoryData) return ''

    const item = categoryData.find(option => option.value === value)
    return item ? item.label : ''
  }

  // 辅助函数：处理 declaration_data 字符串
  const parseDeclarationData = declarationData => {
    if (!declarationData) return ['', '', '']

    const values = declarationData.split(',').map(v => v.trim())

    return [
      findDeclarationText('Category1', values[0] || ''),
      findDeclarationText('Category2', values[1] || ''),
      findDeclarationText('Category3', values[2] || ''),
    ]
  }

  return (
    <div className="relative z-10">
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        centeredSlides={true}
        autoplay={{
          delay: 1000 * 5,
        }}
        modules={[Autoplay]}
      >
        {battleDeclarations?.map(declaration => {
          const [declaration1, declaration2, declaration3] =
            parseDeclarationData(declaration.declaration_data)

          return (
            <SwiperSlide key={declaration.id}>
              <Card>
                <CardContent
                  name={declaration.nick_name}
                  declaration1={declaration1}
                  declaration2={declaration2}
                  declaration3={declaration3}
                  no={declaration.id}
                />
              </Card>
            </SwiperSlide>
          )
        })}
      </Swiper>

      {battleDeclarations?.length > 0 && (
        <div className="absolute bottom-0 z-0 w-full bg-green-primary h-24" />
      )}
    </div>
  )
}

export default CardList
