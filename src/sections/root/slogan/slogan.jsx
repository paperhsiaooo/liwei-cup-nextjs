import Image from 'next/image'

function Slogan() {
  return (
    <div className="bg-white">
      <div className="relative max-w-[375px] mx-auto">
        {/* Word - 不僅要參加，更要留下 */}
        <div className="absolute top-6 left-9">
          <p className="font-black font-noto-sans-jp text-blue-primary text-[32px] leading-[120%]">
            不僅&nbsp;&nbsp;&nbsp;&nbsp;要參加
            <br />
            更要留下
          </p>
        </div>

        {/* Word - passionate */}
        <div className="absolute top-28 right-9">
          <p className="font-anton font-normal text-4xl uppercase text-green-primary">
            passionate
          </p>
        </div>

        <div className="absolute top-[140px] left-0 w-[90%] aspect-[2049/1537]">
          <Image
            src="/images/picture/02.jpg"
            alt="slogan"
            width={714}
            height={408}
          />
        </div>

        <div className="absolute top-80 -right-1">
          <p className="absolute -top-3 right-16 text-4xl text-white font-noto-sans-tc font-bold">
            你的名字
          </p>
          <div className="h-10 flex flex-row gap-x-1.5">
            <div className="w-2.5 h-full bg-green-primary" />
            <div className="w-8 h-full bg-green-primary" />
            <div className="w-64 h-full bg-gradient-to-r from-[#71F57C] via-[#60A0FF] to-[#55BBE300]" />
          </div>
        </div>

        <div className="w-full aspect-[320/216]" />
      </div>
    </div>
  )
}

export default Slogan
