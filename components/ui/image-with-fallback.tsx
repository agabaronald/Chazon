'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'src'> & {
  src: string
  fallbackSrc?: string
}

export function ImageWithFallback({ src, fallbackSrc = '/default-avatar.png', alt, ...rest }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc)
      }}
    />
  )
}
