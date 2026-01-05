"use client"

import { useEffect, useState } from "react"
import { Check, ShoppingBag } from "lucide-react"

interface CartToastProps {
  message: string
  isVisible: boolean
  onHide: () => void
}

export function CartToast({ message, isVisible, onHide }: CartToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onHide, 300)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onHide])

  if (!isVisible && !show) return null

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-[400px] w-[calc(100%-32px)] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5" />
        </div>
        <span className="font-medium text-sm flex-1">{message}</span>
        <ShoppingBag className="w-5 h-5 opacity-70" />
      </div>
    </div>
  )
}
