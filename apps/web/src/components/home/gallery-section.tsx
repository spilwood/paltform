"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { masterWorks, getMasterForWork } from "@/lib/data/masters"
import Link from "next/link"
import Image from "next/image"

export function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const works = masterWorks.slice(0, 6)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % works.length)
  }, [works.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const currentWork = works[currentIndex]
  const master = getMasterForWork(currentWork)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Галерея</span>
            <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Работы мастеров</h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
              Уникальные изделия, созданные из наших спилов талантливыми мастерами
            </p>
          </div>
          <Button variant="outline" asChild className="bg-transparent w-full sm:w-auto">
            <Link href="/mastera">
              Все работы
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-2xl bg-card">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <AspectRatio ratio={4 / 3} className="bg-muted">
                <Image
                  src={currentWork.images[0] || "/placeholder.svg?height=600&width=800&query=wooden craft handmade"}
                  alt={currentWork.title}
                  fill
                  className="object-cover transition-opacity duration-500"
                />
              </AspectRatio>
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <Badge variant="secondary" className="w-fit">
                  {currentWork.categoryName}
                </Badge>
                <h3 className="mt-4 text-xl sm:text-2xl font-medium lg:text-3xl">{currentWork.title}</h3>
                <p className="mt-4 text-sm sm:text-base text-muted-foreground">{currentWork.description}</p>

                {master && (
                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={master.avatar || "/placeholder.svg?height=40&width=40&query=person avatar"}
                        alt={master.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{master.name}</p>
                      <p className="text-xs text-muted-foreground">{master.location}</p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-2xl font-semibold">{currentWork.price.toLocaleString("ru-RU")} ₽</span>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href={`/mastera/raboty/${currentWork.slug}`}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {works.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevSlide} className="bg-transparent">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Предыдущий</span>
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} className="bg-transparent">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Следующий</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
