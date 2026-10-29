import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  eager?: boolean
  onUnavailable?: () => void
}

export function MenuImage({ src, alt, className, width, height, eager, onUnavailable }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => {
        setFailed(true)
        onUnavailable?.()
      }}
    />
  )
}
