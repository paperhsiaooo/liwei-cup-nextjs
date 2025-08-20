'use client'

import 'swiper/css'
import './style/index.css'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Card, CardContent } from '.'

function Declaration() {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        centeredSlides={true}
        onSwiper={swiper => console.log(swiper)}
      >
        <SwiperSlide>
          <Card>
            <CardContent
              name="以龍"
              declaration="拚盡每一球，不為勝負，只為無悔揮灑的汗水與熱血！球場，就是我的戰場！"
              no="23"
            />
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card>
            <CardContent
              name="以龍"
              declaration="拚盡每一球，不為勝負，只為無悔揮灑的汗水與熱血！球場，就是我的戰場！"
              no="23"
            />
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card>
            <CardContent
              name="以龍"
              declaration="拚盡每一球，不為勝負，只為無悔揮灑的汗水與熱血！球場，就是我的戰場！"
              no="23"
            />
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card>
            <CardContent
              name="以龍"
              declaration="拚盡每一球，不為勝負，只為無悔揮灑的汗水與熱血！球場，就是我的戰場！"
              no="23"
            />
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Declaration
