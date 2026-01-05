"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
}

export function ScrollAnimation({ children, className, delay = 0, direction = "up" }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getInitialStyles = () => {
    switch (direction) {
      case "up":
        return "translate-y-8 opacity-0"
      case "down":
        return "-translate-y-8 opacity-0"
      case "left":
        return "translate-x-8 opacity-0"
      case "right":
        return "-translate-x-8 opacity-0"
      case "fade":
        return "opacity-0"
      default:
        return "translate-y-8 opacity-0"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "translate-x-0 translate-y-0 opacity-100" : getInitialStyles(),
        className,
      )}
    >
      {children}
    </div>
  )
}
