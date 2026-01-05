"use client"

import { useEffect, useState } from "react"

interface FlyToCartProps {
  startPosition: { x: number; y: number } | null
  onComplete: () => void
}

export function FlyToCartAnimation({ startPosition, onComplete }: FlyToCartProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (startPosition) {
      setPosition(startPosition)
      setIsAnimating(true)

      // Animate to cart button position (bottom center)
      requestAnimationFrame(() => {
        setPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight - 40,
        })
      })

      const timeout = setTimeout(() => {
        setIsAnimating(false)
        onComplete()
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [startPosition, onComplete])

  if (!isAnimating || !startPosition) return null

  return (
    <div
      className="fixed z-[200] w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center pointer-events-none"
      style={{
        left: position.x - 24,
        top: position.y - 24,
        transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: isAnimating && position.y > startPosition.y ? "scale(0.3)" : "scale(1)",
        opacity: isAnimating && position.y > startPosition.y ? 0 : 1,
      }}
    >
      <div className="w-8 h-8 rounded-lg bg-primary-foreground/20" />
    </div>
  )
}
