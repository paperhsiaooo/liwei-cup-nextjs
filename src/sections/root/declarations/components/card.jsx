import Image from 'next/image'

function Card({ children }) {
  return <div className="w-full">{children}</div>
}

function CardContent({ name = '', declaration = '', no = 0 }) {
  return (
    <div className="bg-yellow-primary rounded-3xl">
      <div className="relative p-5">
        {/* 頭像 */}
        <div className="relative w-[90px] aspect-square">
          <Image src="/images/avatar.png" alt="avatar" fill />
        </div>

        {/* 內容 */}
        <div className="relative z-10 space-y-1">
          <div className="flex flex-row justify-start items-end gap-x-3">
            <h3 className="text-3xl font-bold text-blue-primary font-noto-sans-jp">
              {name}
            </h3>
            <span className="inline-block w-[3px] h-7 bg-blue-primary mb-[2px]" />
            <div className="h-full flex flex-row items-end">
              <p className="text-base font-bold font-noto-sans-jp text-blue-primary">
                選填姓名
              </p>
            </div>
          </div>
          <p className="text-sm font-bold text-blue-primary font-noto-sans-jp">
            {declaration}
          </p>
        </div>

        {/* 序號 */}
        <div className="absolute z-10 top-5 right-5">
          <p className="text-xl text-white font-normal font-anton">{no}</p>
        </div>

        {/* 序號 - bg */}
        <div className="absolute z-0 top-5 right-3">
          <p className="text-[135px] leading-none text-white/25 font-normal font-anton">
            {no}
          </p>
        </div>
      </div>
    </div>
  )
}

export { Card, CardContent }
