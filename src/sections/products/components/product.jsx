import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Container({ children, className }) {
  return (
    <div className={cn('inline-block border rounded-sm', className)}>
      {children}
    </div>
  )
}

function Content({ name, description, image, onBuyClick }) {
  return (
    <div>
      <div className="p-4 flex flex-col gap-1">
        <div className="relative aspect-square w-full">
          <Image src={image} alt={name} fill />
        </div>
        <div className="text-lg font-bold font-noto-sans-tc"> {name} </div>
        <div className="text-sm font-noto-sans-tc"> {description} </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onBuyClick}>
            購買
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Product = {
  Container: Container,
  Content: Content,
}

export default Product
