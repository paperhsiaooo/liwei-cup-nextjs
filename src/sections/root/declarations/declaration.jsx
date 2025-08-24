'use client'

import 'swiper/css'
import './style/index.css'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CountDownTimer } from '../main'
import { Card, CardContent } from '.'

function Declaration() {
  return (
    <section className="root">
      <div className="flex flex-col gap-y-7 pt-6">
        <div className="w-full max-w-[320px] mx-auto">
          <h3 className="text-blue-primary text-4xl font-black font-noto-sans-tc text-center">
            只接發球
          </h3>
          <div className="relative w-full aspect-[2421/1537] my-6">
            <Image src={'/images/picture/01.jpg'} alt="declaration" fill />
          </div>
          <h3 className="text-blue-primary text-4xl font-black font-noto-sans-tc text-center">
            不接命運
          </h3>
        </div>

        <CountDownTimer type="secondary" />

        <div className="relative z-10">
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
      </div>

      <div className="absolute bottom-0 z-0 w-full bg-green-primary h-24" />
    </section>
  )
}

export default Declaration
