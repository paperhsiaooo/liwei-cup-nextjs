import Image from 'next/image'
import { Suspense } from 'react'

import { CountDownTimer } from '../main'
import CardContainer from './components/card-container'

function Declaration() {
  return (
    <section className="root">
      <div className="flex flex-col gap-y-7 pt-6">
        <div className="w-full max-w-[320px] mx-auto">
          <h3 className="text-blue-primary text-4xl font-black font-noto-sans-tc text-center">
            只接發球
          </h3>
          <div className="relative w-full aspect-[2421/1537] my-6">
            <Image
              src={'/images/picture/01.jpg'}
              alt="declaration"
              width={2421}
              height={1537}
            />
          </div>
          <h3 className="text-blue-primary text-4xl font-black font-noto-sans-tc text-center">
            不接命運
          </h3>
        </div>

        <CountDownTimer type="secondary" />

        <Suspense fallback={<div>Loading...</div>}>
          <CardContainer />
        </Suspense>
      </div>
    </section>
  )
}

export default Declaration
