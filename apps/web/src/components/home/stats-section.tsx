"use client"

import { useEffect, useState, useRef } from "react"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Card } from "@spilwood/ui"
import { TreeDeciduous, Users, Truck, Star } from "lucide-react"

const stats = [
  { value: 5000, suffix: "+", label: "Спилов произведено", icon: TreeDeciduous, description: "За всё время работы" },
  { value: 300, suffix: "+", label: "Довольных клиентов", icon: Users, description: "По всей России" },
  { value: 89, suffix: "", label: "Регионов доставки", icon: Truck, description: "Отправляем СДЭК" },
  { value: 4.9, suffix: "", label: "Рейтинг на Ozon", icon: Star, decimals: 1, description: "На основе отзывов" },
]

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number
  suffix: string
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(current)
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
        {/* Section header */}
        <ScrollAnimation>
          <div className="mb-12 text-center md:mb-16">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Spilwood в цифрах</p>
            <h2 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">Нам доверяют по всей России</h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <ScrollAnimation key={stat.label} delay={index * 100}>
                <Card className="group relative overflow-hidden border-border/50 bg-background/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-background hover:shadow-lg md:p-8">
                  {/* Hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-2.5 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </div>

                    {/* Label */}
                    <p className="mt-2 font-medium text-foreground/80">{stat.label}</p>

                    {/* Description */}
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">{stat.description}</p>
                  </div>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
