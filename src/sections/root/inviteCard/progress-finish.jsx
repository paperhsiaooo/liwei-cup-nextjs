'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import useConfettiContext from '@/store/confetti-context'

function ProgressFinish() {
  const [showConfetti, setShowConfetti] = useState(false)
  const setRunStart = useConfettiContext(state => state.setRunStart)

  useEffect(() => {
    // 延遲顯示彩帶動畫
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    setRunStart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 彩帶粒子配置
  const confettiParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: ['#71f57c', '#ffcc05', '#fa7025', '#71f57c', '#233145'][i % 5],
    delay: i * 0.1,
    rotation: Math.random() * 360,
    x: (i % 4) * 25 - 37.5, // 分散在不同位置
    y: -50 - (i % 3) * 50,
  }))

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative px-4 py-20">
      {/* 彩帶動畫 */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-3 h-8 rounded-sm"
              style={{
                backgroundColor: particle.color,
                left: `50%`,
                top: `30%`,
                transformOrigin: 'center',
              }}
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                x: particle.x + (Math.random() - 0.5) * 100,
                y: particle.y + Math.random() * 200 + 100,
                rotate: particle.rotation + 360,
                opacity: [1, 1, 0],
                scale: [0, 1, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* 主要內容 */}
      <div className="flex flex-col items-center gap-y-6 relative z-10">
        {/* 成功圖標 */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </motion.div>

        {/* 成功文字 */}
        <motion.h2
          className="text-3xl font-bold text-blue-primary font-noto-sans-tc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          已收到你的資料
        </motion.h2>

        {/* 額外的慶祝動畫效果 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="w-32 h-32 bg-green-primary/20 rounded-full mx-auto mt-8" />
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressFinish
