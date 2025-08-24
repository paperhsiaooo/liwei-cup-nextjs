import Image from 'next/image'

import { CountDownTimer } from '.'

function Main() {
  return (
    <section className="root overflow-hidden">
      <div className="aspect-[397/250] w-[200px] absolute z-0 left-1/2 -translate-x-1/2">
        <Image
          src="/images/win-01.png"
          alt="main-bg"
          className="object-cover"
          fill
        />
      </div>
      <div className="relative z-10 pt-[50px] pb-10">
        <div className="absolute z-0 top-[310px] bg-[#FFCC05] w-full h-[5px]" />
        <div className="absolute z-0 top-[320px] bg-[#FFCC05] w-full h-[500px]" />
        <div className="relative z-20 aspect-[2042/1102] w-[700px] left-1/2 -translate-x-1/2 mb-4">
          <Image
            src="/images/main-cover-01.png"
            alt="main-bg"
            className="object-cover"
            fill
          />
        </div>
        <CountDownTimer />
      </div>
    </section>
  )
}

export default Main
