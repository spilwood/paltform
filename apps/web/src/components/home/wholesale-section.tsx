"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Ruler, Palette, Clock, Heart, Sparkles } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const benefits = [
  {
    icon: Ruler,
    title: "Любой размер",
    description: "Изготовим спилы под ваши параметры",
  },
  {
    icon: Palette,
    title: "Обработка на выбор",
    description: "Шлифовка, масло, лак или без обработки",
  },
  {
    icon: Clock,
    title: "Срок 3-7 дней",
    description: "Быстрое изготовление на заказ",
  },
  {
    icon: Heart,
    title: "С душой",
    description: "Каждое изделие уникально",
  },
]

export function WholesaleSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-600/10 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <ScrollAnimation>
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              >
                <Sparkles className="mr-1.5 h-3 w-3" />
                Персонализация
              </Badge>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Индивидуальные заказы{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  под ваш проект
                </span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <p className="mt-6 max-w-lg text-pretty text-lg text-zinc-400">
                Не нашли нужный размер или форму? Изготовим спилы и пеньки по вашим параметрам. Идеально для свадеб,
                фотосессий, интерьерных проектов и уникальных подарков.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 text-zinc-950 hover:from-amber-400 hover:to-orange-400"
                  asChild
                >
                  <Link href="/zakazat">
                    Оформить заказ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  asChild
                >
                  <Link href="/kontakty">Обсудить проект</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right content - benefits grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <ScrollAnimation key={benefit.title} delay={100 + index * 100}>
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-900/80">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 transition-colors duration-300 group-hover:bg-amber-500/20">
                      <benefit.icon className="h-6 w-6 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{benefit.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Bottom trust indicators */}
        <ScrollAnimation delay={600}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-zinc-800 pt-12 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-500">1000+</div>
              <div className="mt-1 text-sm text-zinc-500">Выполненных заказов</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-3xl font-bold text-amber-500">3-7 дней</div>
              <div className="mt-1 text-sm text-zinc-500">Срок изготовления</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-3xl font-bold text-amber-500">5-150 см</div>
              <div className="mt-1 text-sm text-zinc-500">Диапазон диаметров</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-3xl font-bold text-amber-500">100%</div>
              <div className="mt-1 text-sm text-zinc-500">Ручная работа</div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
