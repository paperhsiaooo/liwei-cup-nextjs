function BgLayout({ children }) {
  return (
    <div className="flex flex-col">
      <div className="pb-1 border-[#FFCC08] border-b-4 mb-1 shrink-0">
        <div className="w-full h-8 [background-image:url('/images/deco-01.png')] bg-repeat bg-size-[auto_32px]" />
      </div>
      <div className="bg-[#ffcc08] flex-1">
        <div className="wrapper">
          <div className="py-6">{children}</div>
        </div>
      </div>
      <div className="pt-1 border-[#FFCC08] border-t-4 mt-1 shrink-0">
        <div className="w-full h-8 [background-image:url('/images/deco-01.png')] bg-repeat bg-size-[auto_32px]" />
      </div>
    </div>
  )
}

export default BgLayout
