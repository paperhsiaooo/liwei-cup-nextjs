import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { formatCurrencyNT } from '@/utils/currency'

function Container({ children, className, href, onClick }) {
  const Component = href ? Link : 'div'

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'group inline-block border-8 border-blue-primary overflow-hidden bg-white shadow-xs transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary',
        href ? 'cursor-pointer' : '',
        className,
      )}
    >
      {children}
    </Component>
  )
}

function Content({ name, description, image, tag, price }) {
  const shouldDisplayPrice =
    typeof price === 'number'
      ? price > 0
      : price !== undefined && price !== null && price !== ''

  const displayPrice = shouldDisplayPrice ? formatCurrencyNT(price) : ''

  return (
    <div className="relative">
      <div className="relative aspect-[400/600] w-full bg-secondary">
        <Image src={image} alt={name} fill className="object-cover" />
        {tag ? (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-sm bg-green-primary px-2 py-1 text-blue-primary text-[11px] font-antonio tracking-wide">
            {tag}
          </span>
        ) : null}

        <div className="p-6 sm:p-4 xl:p-8 flex flex-col gap-3 absolute bottom-0 left-1/2 -translate-x-1/2 w-full">
          <div className="flex items-start justify-between gap-3">
            <p className="text-blue-primary text-2xl leading-tight font-noto-sans-tc font-black sm:text-xl xl:text-3xl">
              {name}
            </p>
          </div>
          {description ? (
            <p className="p-4 bg-primary/80 text-gray-200 text-base leading-snug font-noto-sans-tc sm:text-sm xl:text-lg">
              {description}
            </p>
          ) : null}
          {displayPrice ? (
            <span className="text-orange-primary font-noto-sans-jp font-black text-2xl sm:text-xl xl:text-3xl">
              {displayPrice}
            </span>
          ) : null}
        </div>
      </div>

      {/* <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-blue-primary text-base leading-tight font-noto-sans-tc font-extrabold">
            {name}
          </p>
          {displayPrice ? (
            <span className="text-orange-primary font-anton text-lg">
              {displayPrice}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="text-muted-foreground text-sm leading-snug font-noto-sans-tc">
            {description}
          </p>
        ) : null}
      </div> */}
    </div>
  )
}

export const Product = {
  Container: Container,
  Content: Content,
}

export default Product
