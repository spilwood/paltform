"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function StickyCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      // Show after scrolling past first viewport
      setIsVisible(scrollY > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isDismissed) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 pb-safe backdrop-blur transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        <Button className="flex-1 gap-2 h-12 text-base" asChild>
          <Link href="/zakaz">
            <ShoppingBag className="h-5 w-5" />
            Заказать спилы
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsDismissed(true)} className="shrink-0 h-12 w-12">
          <X className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </Button>
      </div>
    </div>
  )
}
