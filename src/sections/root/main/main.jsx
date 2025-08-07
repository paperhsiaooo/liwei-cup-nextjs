import Image from 'next/image'

function Main() {
  return (
    <main className="root overflow-hidden">
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
        <div className="relative z-10">
          <p className="text-center font-anton font-normal text-4xl text-white flex justify-center items-end flex-row gap-x-3">
            <span className="text-[30px]">15</span>
            <span className="text-[14px]">DAYS</span>
            <span className="text-[30px]">23</span>
            <span className="text-[14px]">HRS</span>
            <span className="text-[30px]">51</span>
            <span className="text-[14px]">MINS</span>
            <span className="text-[30px]">41</span>
            <span className="text-[14px]">SEC</span>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Main
