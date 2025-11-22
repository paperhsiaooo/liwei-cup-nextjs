'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProduct } from '@/apis/hook/use-products'
import Loader from '@/components/common/loader'
import { Button } from '@/components/ui/button'
import { ImageSlider } from '@/components/ui/image-slider'
import { cn } from '@/lib/utils'
import useCartStore from '@/store/cart-context'
import { formatCurrencyNT } from '@/utils/currency'
import { extractImageUrl } from '@/utils/image'
import { showSuccessToast } from '@/utils/toast'

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

const resolveVariants = product =>
  Array.isArray(product?.variants) ? product.variants : []

const extractVariantId = variant => {
  if (!variant || typeof variant !== 'object') {
    return null
  }

  const toNumericId = value => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }

    if (typeof value === 'string') {
      const parsed = Number(value.trim())
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }

    return null
  }

  const directCandidates = [variant?.variantId, variant?.variant_id]
  for (const candidate of directCandidates) {
    const numericId = toNumericId(candidate)
    if (numericId !== null) {
      return numericId
    }
  }

  const rawCandidates = [
    variant?.raw?.id,
    variant?.raw?.sku_id,
    variant?.raw?.skuId,
  ]
  for (const candidate of rawCandidates) {
    const numericId = toNumericId(candidate)
    if (numericId !== null) {
      return numericId
    }
  }

  const fallbackCandidates = [variant?.skuId, variant?.skuCode]
  for (const candidate of fallbackCandidates) {
    const numericId = toNumericId(candidate)
    if (numericId !== null) {
      return numericId
    }
  }

  return null
}

const resolveImages = (product, selectedColor = null) => {
  if (!product) return [FALLBACK_IMAGE]

  // 如果有選中顏色，嘗試找到對應 variant 的圖片
  if (selectedColor) {
    const variants = resolveVariants(product)
    const matchingVariant = variants.find(variant => {
      const variantColor =
        variant?.color ||
        variant?.colorName ||
        variant?.optionColor ||
        variant?.label
      return variantColor === selectedColor
    })

    if (matchingVariant && Array.isArray(matchingVariant.images)) {
      // 處理 variant images（可能是字串或對象）
      const variantImages = matchingVariant.images
        .map(img => {
          // 如果是字串，直接使用
          if (typeof img === 'string') {
            return img.startsWith('//') ? `https:${img}` : img
          }
          // 如果是對象，提取 URL
          if (typeof img === 'object' && img !== null) {
            return extractImageUrl(img)
          }
          return null
        })
        .filter(Boolean)

      if (variantImages.length > 0) {
        return variantImages
      }
    }
  }

  // Fallback: 使用商品的主要圖片
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

  const result = uniqueList(sources)
    .map(src => {
      if (typeof src === 'string') {
        return src.startsWith('//') ? `https:${src}` : src
      }
      if (typeof src === 'object' && src !== null) {
        return extractImageUrl(src)
      }
      return null
    })
    .filter(Boolean)

  if (result.length === 0) {
    return [FALLBACK_IMAGE]
  }

  return result
}

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

function ProductDetailClient({ productId, initialData }) {
  const router = useRouter()
  const addItem = useCartStore(state => state.addItem)

  // 使用 useProduct hook 獲取商品資料
  const {
    data: productResponse,
    isLoading,
    isError,
    error,
  } = useProduct(productId, {
    initialData, // 使用 SSR 傳入的初始資料，避免重複請求
    retry: 1, // 失敗時重試 1 次
  })

  // 從 API 回應中提取商品資料
  const product = productResponse?.data?.product || null

  console.log('product: ', product)

  // 所有 hooks 必須在條件返回之前調用
  const colors = useMemo(() => resolveColors(product), [product])
  const sizes = useMemo(() => resolveSizes(product), [product])
  const priceLabel = useMemo(() => resolvePrice(product), [product])
  const description = useMemo(() => resolveDescription(product), [product])
  const variants = useMemo(() => resolveVariants(product), [product])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  // 初始化時就設置第一個顏色，避免顯示錯誤的圖片
  const [selectedColor, setSelectedColor] = useState(() => {
    // 如果 initialData 存在，從中提取第一個顏色
    if (initialData?.data?.product) {
      const initialColors = resolveColors(initialData.data.product)
      return initialColors.length > 0 ? initialColors[0] : ''
    }
    return ''
  })
  const [selectedSize, setSelectedSize] = useState(() => {
    // 如果 initialData 存在，從中提取第一個尺寸
    if (initialData?.data?.product) {
      const initialSizes = resolveSizes(initialData.data.product)
      return initialSizes.length > 0 ? initialSizes[0] : ''
    }
    return ''
  })
  const [quantity, setQuantity] = useState(1)
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [showImageModal, setShowImageModal] = useState(false)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)
  // 追蹤已載入的圖片，用於平滑切換
  const [loadedImages, setLoadedImages] = useState(new Set())

  const activeVariant = useMemo(() => {
    if (!variants || variants.length === 0) {
      return null
    }

    return (
      variants.find(variant => {
        const colorMatched = selectedColor
          ? variant?.color === selectedColor
          : true
        const sizeMatched = selectedSize ? variant?.size === selectedSize : true
        return colorMatched && sizeMatched
      }) ?? null
    )
  }, [selectedColor, selectedSize, variants])

  // 根據選中的顏色動態取得對應的圖片
  const images = useMemo(
    () => resolveImages(product, selectedColor),
    [product, selectedColor],
  )

  // 當商品資料載入後，只在沒有選中顏色時才設置第一個顏色（作為 fallback）
  useEffect(() => {
    if (colors.length > 0 && !selectedColor) {
      setSelectedColor(colors[0])
    }
    if (sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0])
    }
  }, [colors, sizes, selectedColor, selectedSize])

  // 當顏色變更時，重置圖片索引
  useEffect(() => {
    setActiveImageIndex(0)
    setThumbnailStartIndex(0)
    setIsImageLoading(true)
  }, [selectedColor])

  // 預載入所有圖片，優化切換體驗
  useEffect(() => {
    const preloadImage = imageUrl => {
      if (imageUrl && !loadedImages.has(imageUrl)) {
        const img = new window.Image()
        img.src = imageUrl
        img.onload = () => {
          setLoadedImages(prev => {
            const newSet = new Set(prev)
            newSet.add(imageUrl)
            return newSet
          })
        }
        img.onerror = () => {
          setLoadedImages(prev => {
            const newSet = new Set(prev)
            newSet.add(imageUrl)
            return newSet
          })
        }
      }
    }

    images.forEach(preloadImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  const activeImage =
    images[Math.min(activeImageIndex, images.length - 1)] || FALLBACK_IMAGE
  const isCurrentImageLoaded =
    loadedImages.has(activeImage) || activeImage === FALLBACK_IMAGE
  const shouldShowLoading = isImageLoading && !isCurrentImageLoaded

  // 統一處理圖片切換邏輯
  const handleImageChange = useCallback(
    (newIndex, imageUrl) => {
      if (loadedImages.has(imageUrl) || imageUrl === FALLBACK_IMAGE) {
        setActiveImageIndex(newIndex)
        setIsImageLoading(false)
      } else {
        setIsImageLoading(true)
        setActiveImageIndex(newIndex)
      }
    },
    [loadedImages],
  )

  // 統一處理圖片載入完成
  const handleImageLoad = useCallback(imageUrl => {
    setIsImageLoading(false)
    setLoadedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(imageUrl)
      return newSet
    })
  }, [])

  const handleQuantityChange = useCallback(direction => {
    setQuantity(prev => {
      if (direction === 'decrease') {
        return Math.max(1, prev - 1)
      }

      return Math.min(5, prev + 1) // 限制最多 5 個
    })
  }, [])

  // 統一處理加入購物車的邏輯
  const addToCart = useCallback(() => {
    if (!product?.productId && !product?.id) return

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
      variantId: extractVariantId(activeVariant),
      quantity,
    })

    showSuccessToast({
      title: '加入成功',
      description: '商品已加入購物車',
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
    activeVariant,
    selectedColor,
    selectedSize,
  ])

  const handleAddToCart = useCallback(() => {
    addToCart()
  }, [addToCart])

  const handleBuyNow = useCallback(() => {
    addToCart()
    router.push('/cart')
  }, [addToCart, router])

  const thumbnailList = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + 4,
  )
  const showSlider = images.length > 4
  const showMobileSlider = images.length > 3 // 手機版超過 3 張就使用 slider
  const canGoLeft = thumbnailStartIndex > 0
  const canGoRight = thumbnailStartIndex + 4 < images.length

  const handleThumbnailNavigation = useCallback(
    direction => {
      if (direction === 'left' && canGoLeft) {
        setThumbnailStartIndex(prev => Math.max(0, prev - 1))
      } else if (direction === 'right' && canGoRight) {
        setThumbnailStartIndex(prev => Math.min(images.length - 4, prev + 1))
      }
    },
    [canGoLeft, canGoRight, images.length],
  )

  // ESC 鍵關閉 Modal
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && showImageModal) {
        setShowImageModal(false)
      }
    }

    if (showImageModal) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  // 處理 loading 狀態
  if (isLoading && !product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    )
  }

  // 處理錯誤狀態
  if (isError || !product) {
    const errorMessage = error?.message || '商品資訊載入失敗，請稍後再試。'

    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="font-noto-sans-tc text-lg text-slate-600">
          {errorMessage}
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="cursor-pointer"
        >
          重新載入
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-10 1440:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] 1440:gap-16">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-md">
          {shouldShowLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-primary border-t-transparent" />
            </div>
          )}
          <Image
            src={activeImage}
            alt={`${product?.name || 'Product'} 預覽圖`}
            fill
            className="object-cover cursor-pointer transition-opacity duration-300"
            style={{ opacity: shouldShowLoading ? 0 : 1 }}
            sizes="(min-width: 1440px) 640px, (min-width: 768px) 75vw, 100vw"
            priority={activeImageIndex === 0}
            onLoad={() => handleImageLoad(activeImage)}
            onError={() => handleImageLoad(activeImage)}
            onClick={() => setShowImageModal(true)}
          />
        </div>

        {thumbnailList.length > 1 ? (
          <div className="mt-5">
            {/* 手機版：超過 3 張圖片使用 ImageSlider，否則使用縮圖網格 */}
            <div className="block sm:hidden">
              {showMobileSlider ? (
                <ImageSlider
                  images={images}
                  activeIndex={activeImageIndex}
                  onImageChange={newIndex => {
                    handleImageChange(newIndex, images[newIndex])
                  }}
                />
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {images.slice(0, 3).map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => handleImageChange(index, src)}
                      className={cn(
                        'relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all cursor-pointer',
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
                        sizes="(max-width: 640px) 33vw, 25vw"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 桌面版使用原有縮圖網格 */}
            <div className="hidden sm:block">
              {showSlider ? (
                <div className="relative">
                  {/* 左箭頭 */}
                  {canGoLeft && (
                    <button
                      type="button"
                      onClick={() => handleThumbnailNavigation('left')}
                      className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white cursor-pointer"
                      aria-label="上一張圖片"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15,18 9,12 15,6" />
                      </svg>
                    </button>
                  )}

                  {/* 右箭頭 */}
                  {canGoRight && (
                    <button
                      type="button"
                      onClick={() => handleThumbnailNavigation('right')}
                      className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white cursor-pointer"
                      aria-label="下一張圖片"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    </button>
                  )}

                  {/* 縮圖網格 */}
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {thumbnailList.map((src, index) => {
                      const actualIndex = thumbnailStartIndex + index
                      return (
                        <button
                          key={`${src}-${actualIndex}`}
                          type="button"
                          onClick={() => handleImageChange(actualIndex, src)}
                          className={cn(
                            'relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all cursor-pointer',
                            activeImageIndex === actualIndex
                              ? 'border-blue-primary ring-2 ring-blue-primary'
                              : 'border-transparent hover:border-blue-primary/50',
                          )}
                          aria-label={`預覽圖 ${actualIndex + 1}`}
                        >
                          <Image
                            src={src}
                            alt={`${product?.name || 'Product'} 預覽圖 ${actualIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1440px) 150px, (min-width: 768px) 25vw, 33vw"
                            loading="lazy"
                          />
                        </button>
                      )
                    })}
                  </div>

                  {/* 位置指示器 */}
                  <div className="mt-2 flex justify-center gap-1">
                    {Array.from({ length: Math.ceil(images.length / 4) }).map(
                      (_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setThumbnailStartIndex(index * 4)}
                          className={cn(
                            'h-2 w-2 rounded-full transition-colors cursor-pointer',
                            Math.floor(thumbnailStartIndex / 4) === index
                              ? 'bg-blue-primary'
                              : 'bg-slate-300',
                          )}
                          aria-label={`第 ${index + 1} 頁`}
                        />
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {thumbnailList.map((src, index) => (
                    <button
                      key={`${src}-${index}`}
                      type="button"
                      onClick={() => handleImageChange(index, src)}
                      className={cn(
                        'relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all cursor-pointer',
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
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          {product?.tag ? (
            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-green-primary px-3 py-1 text-xs font-bold text-blue-primary">
                {product.tag}
              </span>
            </div>
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
                    'flex h-10 w-10 items-center justify-center rounded-md border text-xs font-noto-sans-tc transition-colors',
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-anton text-blue-primary transition-colors hover:border-blue-primary/60 disabled:opacity-50 cursor-pointer leading-none"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-anton text-blue-primary transition-colors hover:border-blue-primary/60 disabled:opacity-50 cursor-pointer leading-none"
              disabled={quantity >= 5}
              aria-label="增加購買數量"
            >
              +
            </button>
          </div>
        </section>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            className="h-12 flex-1 border-blue-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-blue-primary hover:text-white cursor-pointer"
            onClick={handleAddToCart}
          >
            加入購物車
          </Button>
          <Button
            className="h-12 flex-1 bg-green-primary text-sm font-anton tracking-widest text-blue-primary hover:bg-green-primary/90 cursor-pointer"
            onClick={handleBuyNow}
          >
            立即購買
          </Button>
        </div>
      </div>

      {/* 圖片放大 Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            {/* 手機版關閉按鈕在上方，桌面版在右側 */}
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 cursor-pointer"
              aria-label="關閉圖片"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <Image
              src={activeImage}
              alt={`${product?.name || 'Product'} 放大圖`}
              width={800}
              height={800}
              className="max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-300"
              onClick={e => e.stopPropagation()}
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailClient
