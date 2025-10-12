'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useCartStore from '@/store/cart-context'
import { formatCurrencyNT } from '@/utils/currency'

const FALLBACK_IMAGE = 'https://picsum.photos/640/640'

const uniqueList = list =>
  Array.from(
    // eslint-disable-next-line no-undef
    new Set(
      (Array.isArray(list) ? list : [])
        .filter(Boolean)
        .map(item => (typeof item === 'string' ? item.trim() : item)),
    ),
  ).filter(Boolean)

const resolveImages = product => {
  if (!product) return [FALLBACK_IMAGE]

  const sources = [
    product?.heroImage,
    product?.image,
    product?.imageUrl,
    product?.coverImage,
    product?.thumbnail,
    ...(Array.isArray(product?.images) ? product.images : []),
    ...(Array.isArray(product?.gallery) ? product.gallery : []),
    ...(Array.isArray(product?.thumbnails) ? product.thumbnails : []),
  ]

  const result = uniqueList(sources).map(src =>
    typeof src === 'string' && src.startsWith('//') ? `https:${src}` : src,
  )

  if (result.length === 0) {
    return [FALLBACK_IMAGE]
  }

  return result
}

const resolveVariants = product =>
  Array.isArray(product?.variants) ? product.variants : []

const resolveColors = product => {
  const colorsFromList = uniqueList(product?.colors || product?.colorOptions)
  const variantColors = uniqueList(
    resolveVariants(product).map(variant => {
      const raw =
        variant?.color ||
        variant?.colorName ||
        variant?.optionColor ||
        variant?.label
      return typeof raw === 'string' ? raw : null
    }),
  )
  const fallback = typeof product?.color === 'string' ? [product.color] : []

  return uniqueList([...colorsFromList, ...variantColors, ...fallback])
}

const resolveSizes = product => {
  const sizeList = uniqueList(product?.sizes || product?.sizeOptions)
  const variantSizes = uniqueList(
    resolveVariants(product).map(variant => {
      const raw =
        variant?.size ||
        variant?.sizeName ||
        variant?.optionSize ||
        variant?.label
      return typeof raw === 'string' ? raw : null
    }),
  )
  const fallback = typeof product?.size === 'string' ? [product.size] : []

  return uniqueList([...sizeList, ...variantSizes, ...fallback])
}

const resolvePrice = product =>
  product
    ? formatCurrencyNT(
        product?.price ??
          product?.priceText ??
          product?.amount ??
          product?.displayPrice ??
          '',
      ) || null
    : null

const resolveDescription = product =>
  product?.description?.trim() ||
  product?.summary?.trim() ||
  product?.content?.trim() ||
  ''

function ProductDetailClient({ product }) {
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)

  const images = useMemo(() => resolveImages(product), [product])
  const colors = useMemo(() => resolveColors(product), [product])
  const sizes = useMemo(() => resolveSizes(product), [product])
  const priceLabel = useMemo(() => resolvePrice(product), [product])
  const description = useMemo(() => resolveDescription(product), [product])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(colors[0] || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeImage =
    images[Math.min(activeImageIndex, images.length - 1)] || FALLBACK_IMAGE

  const handleQuantityChange = useCallback(direction => {
    setQuantity(prev => {
      if (direction === 'decrease') {
        return Math.max(1, prev - 1)
      }

      return prev + 1
    })
  }, [])

  const handleAddToCart = useCallback(() => {
    if (!product?.productId && !product?.id) {
      return
    }

    const productId = product?.productId || product?.id
    const primaryImage =
      images.length > 0
        ? images[0]
        : product?.heroImage || product?.image || FALLBACK_IMAGE

    addItem({
      productId,
      name: product?.name || '商品',
      price:
        typeof product?.price === 'number' ? product.price : product?.amount,
      image: primaryImage,
      color: selectedColor || '',
      size: selectedSize || '',
      quantity,
    })
  }, [
    addItem,
    images,
    product?.amount,
    product?.heroImage,
    product?.id,
    product?.image,
    product?.name,
    product?.price,
    product?.productId,
    quantity,
    selectedColor,
    selectedSize,
  ])

  const handleBuyNow = useCallback(async () => {
    if (!product?.productId || isSubmitting) return

    try {
      setIsSubmitting(true)
      const res = await fetch('/api/checkout/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.productId,
          quantity,
          email: 'test@test.com',
          color: selectedColor || undefined,
          size: selectedSize || undefined,
        }),
        credentials: 'same-origin',
      })

      if (res.redirected) {
        router.push(res.url)
        return
      }

      if (!res.ok) {
        const maybeJson = await res.json().catch(() => null)
        throw new Error(maybeJson?.error || 'Request failed')
      }
    } catch (error) {
      console.error('[product-detail] handleBuyNow error: ', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [
    isSubmitting,
    product?.productId,
    quantity,
    router,
    selectedColor,
    selectedSize,
  ])

  const thumbnailList = images.slice(0, 4)

  return (
    <div className="grid gap-10 1440:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] 1440:gap-16">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-md">
          <Image
            src={activeImage}
            alt={`${product?.name || 'Product'} 預覽圖`}
            fill
            className="object-contain"
            sizes="(min-width: 1440px) 640px, (min-width: 768px) 75vw, 100vw"
            priority
          />
        </div>

        {thumbnailList.length > 1 ? (
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {thumbnailList.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all',
                  activeImageIndex === index
                    ? 'border-blue-primary ring-2 ring-blue-primary'
                    : 'border-transparent hover:border-blue-primary/50',
                )}
                aria-label={`預覽圖 ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`${product?.name || 'Product'} 預覽圖 ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1440px) 150px, (min-width: 768px) 25vw, 33vw"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div className="border-l-4 border-green-primary pl-4">
          <h1 className="font-anton text-3xl text-blue-primary 1440:text-[40px]">
            {product?.name || '商品詳情'}
          </h1>
          {product?.tagline ? (
            <p className="mt-2 font-noto-sans-tc text-sm text-muted-foreground">
              {product.tagline}
            </p>
          ) : null}
        </div>

        {priceLabel ? (
          <p className="font-anton text-2xl text-orange-primary 1440:text-[30px]">
            {priceLabel}
          </p>
        ) : null}

        {description ? (
          <p className="font-noto-sans-tc text-base leading-7 text-slate-600">
            {description}
          </p>
        ) : null}

        {colors.length > 0 ? (
          <section className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              顏色
            </span>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-noto-sans-tc transition-colors',
                    selectedColor === color
                      ? 'border-blue-primary bg-blue-primary text-white'
                      : 'border-slate-300 bg-white text-blue-primary hover:border-blue-primary/60',
                  )}
                  aria-pressed={selectedColor === color}
                >
                  {color}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {sizes.length > 0 ? (
          <section className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              尺寸
            </span>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'rounded-md border px-4 py-2 text-sm font-noto-sans-tc transition-colors',
                    selectedSize === size
                      ? 'border-blue-primary bg-blue-primary text-white'
                      : 'border-slate-300 bg-white text-blue-primary hover:border-blue-primary/60',
                  )}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <section className="flex flex-col gap-3">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            購買數量
          </span>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleQuantityChange('decrease')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-anton text-blue-primary transition-colors hover:border-blue-primary/60 disabled:opacity-50"
              disabled={quantity <= 1}
              aria-label="減少購買數量"
            >
              −
            </button>
            <span className="min-w-[2.5rem] text-center font-anton text-xl text-blue-primary">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange('increase')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-anton text-blue-primary transition-colors hover:border-blue-primary/60"
              aria-label="增加購買數量"
            >
              +
            </button>
          </div>
        </section>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="h-12 flex-1 border-blue-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-blue-primary hover:text-white"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
          <Button
            className="h-12 flex-1 bg-green-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-green-primary/90"
            onClick={handleBuyNow}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'PROCESSING…' : 'BUY NOW'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailClient
