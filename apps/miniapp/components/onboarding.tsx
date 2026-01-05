"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TreePine, Truck, Gift, ChevronRight, X } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    icon: TreePine,
    title: "Добро пожаловать в Spilwood!",
    description: "Натуральные спилы дерева ручной работы для декора, творчества и интерьера",
    color: "bg-primary",
  },
  {
    icon: Truck,
    title: "Удобная доставка",
    description: "Быстрая доставка через Ozon в любой пункт выдачи по всей России",
    color: "bg-blue-500",
  },
  {
    icon: Gift,
    title: "Бонусная программа",
    description: "Получайте кэшбэк 5% с каждой покупки и обменивайте баллы на скидки",
    color: "bg-amber-500",
  },
]

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("spilwood_onboarding_complete")
    if (!hasSeenOnboarding) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    localStorage.setItem("spilwood_onboarding_complete", "true")
    setIsVisible(false)
    onComplete()
  }

  if (!isVisible) return null

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in fade-in duration-300">
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" onClick={handleComplete} className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div
          className={`w-24 h-24 rounded-3xl ${slide.color} flex items-center justify-center mb-8 animate-in zoom-in duration-500`}
        >
          <Icon className="h-12 w-12 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3 animate-in slide-in-from-bottom duration-500">
          {slide.title}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-[280px] animate-in slide-in-from-bottom duration-500 delay-100">
          {slide.description}
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="w-full h-14 rounded-2xl text-base font-semibold">
          {currentSlide < slides.length - 1 ? (
            <>
              Далее
              <ChevronRight className="h-5 w-5 ml-1" />
            </>
          ) : (
            "Начать покупки"
          )}
        </Button>
      </div>
    </div>
  )
}
