'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

function ImageSlider({
  images,
  activeIndex,
  onImageChange,
  className,
  itemsPerView = 3,
}) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)

  useEffect(() => {
    setCurrentIndex(activeIndex)
  }, [activeIndex])

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1
    setCurrentIndex(newIndex)
    onImageChange(newIndex)
  }, [currentIndex, images.length, onImageChange])

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    onImageChange(newIndex)
  }, [currentIndex, images.length, onImageChange])

  // 計算當前顯示的圖片範圍
  const getVisibleImages = useCallback(() => {
    const start = Math.max(0, currentIndex - Math.floor(itemsPerView / 2))
    const end = Math.min(images.length, start + itemsPerView)
    const actualStart = Math.max(0, end - itemsPerView)

    return {
      start: actualStart,
      end,
      images: images.slice(actualStart, end),
    }
  }, [currentIndex, images, itemsPerView])

  const handleTouchStart = useCallback(e => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setCurrentX(e.touches[0].clientX)
  }, [])

  const handleTouchMove = useCallback(
    e => {
      if (!isDragging) return
      setCurrentX(e.touches[0].clientX)
    },
    [isDragging],
  )

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return

    const diff = startX - currentX
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }

    setIsDragging(false)
    setStartX(0)
    setCurrentX(0)
  }, [isDragging, startX, currentX, handleNext, handlePrev])

  if (images.length <= 1) {
    return null
  }

  const visibleImages = getVisibleImages()

  return (
    <div className={cn('relative w-full', className)}>
      {/* 圖片容器 */}
      <div
        className="relative p-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 左箭頭 */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white cursor-pointer"
          aria-label="上一張圖片"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* 右箭頭 */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow-md transition-colors hover:bg-white cursor-pointer"
          aria-label="下一張圖片"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-3 gap-3">
          {visibleImages.images.map((src, index) => {
            const actualIndex = visibleImages.start + index
            return (
              <button
                key={`${src}-${actualIndex}`}
                type="button"
                onClick={() => {
                  setCurrentIndex(actualIndex)
                  onImageChange(actualIndex)
                }}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-2xl border bg-white shadow-sm transition-all cursor-pointer',
                  currentIndex === actualIndex
                    ? 'border-blue-primary ring-2 ring-blue-primary'
                    : 'border-transparent hover:border-blue-primary/50',
                )}
                aria-label={`預覽圖 ${actualIndex + 1}`}
              >
                <Image
                  src={src}
                  alt={`商品圖片 ${actualIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 33vw, 25vw"
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* 位置指示器 */}
      <div className="mt-3 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setCurrentIndex(index)
              onImageChange(index)
            }}
            className={cn(
              'h-2 w-2 rounded-full transition-colors cursor-pointer',
              currentIndex === index ? 'bg-blue-primary' : 'bg-slate-300',
            )}
            aria-label={`第 ${index + 1} 張圖片`}
          />
        ))}
      </div>
    </div>
  )
}

export { ImageSlider }
