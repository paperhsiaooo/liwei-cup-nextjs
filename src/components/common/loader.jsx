'use client'

import Image from 'next/image'

function Loader({ className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/social-media/icon.png"
        alt="載入中"
        width={64}
        height={64}
        className="h-12 w-12 animate-spin"
        priority
      />
    </div>
  )
}

export default Loader
