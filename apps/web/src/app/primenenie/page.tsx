import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Palette, UtensilsCrossed, Heart, Sparkles, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Применение спилов дерева — идеи и варианты использования | Spilwood",
  description:
    "Для чего можно использовать спилы дерева: декор интерьера, часы, подставки, сервировка, свадьбы и мероприятия.",
}

const useCases = [
  {
    title: "Интерьерный декор",
    description:
      "Настенные панно, подставки под цветы, рамки для фото. Спилы добавляют тепло и природность в интерьер.",
    image: "/use-cases/interior-decor.jpg",
    icon: Palette,
    products: ["Спилы берёзы 30-40 см", "Пеньки"],
    tag: "Популярное",
  },
  {
    title: "Часы",
    description:
      "Настенные и настольные часы из спила — популярный DIY-проект. Простой в реализации и эффектный результат.",
    image: "/use-cases/wood-clocks.jpg",
    icon: Clock,
    products: ["Спилы берёзы 20-35 см", "Спилы сосны 25-35 см"],
    tag: "DIY",
  },
  {
    title: "Сервировка и кухня",
    description: "Сервировочные доски, подставки под горячее, тарелки для подачи сыра и закусок.",
    image: "/use-cases/serving-boards.jpg",
    icon: UtensilsCrossed,
    products: ["Спилы берёзы 15-25 см", "Спилы сосны 20-30 см"],
    tag: "Практично",
  },
  {
    title: "Свадьбы и мероприятия",
    description: "Подставки под тарелки, номерки столов, декор кэнди-бара, подставки для свечей.",
    image: "/use-cases/wedding-decor.jpg",
    icon: Heart,
    products: ["Спилы разных размеров", "Пеньки"],
    tag: "Декор",
  },
  {
    title: "Творчество и хобби",
    description: "Роспись, декупаж, выжигание, эпоксидная смола. Идеальная основа для творческих экспериментов.",
    image: "/use-cases/wood-crafts.jpg",
    icon: Sparkles,
    products: ["Любые спилы"],
    tag: "Творчество",
  },
  {
    title: "Фотография",
    description: "Фотофоны, подставки для предметной съёмки. Текстура дерева создаёт красивый естественный фон.",
    image: "/use-cases/photo-props.jpg",
    icon: Camera,
    products: ["Спилы 30-40 см", "Пеньки"],
    tag: "Фото",
  },
]

export default function PrimeneniePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <Breadcrumbs items={[{ label: "Применение" }]} />
            <div className="mt-6 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Применение спилов дерева</h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Спилы — универсальный материал с множеством применений. Рассказываем, для чего их используют наши
                покупатели.
              </p>
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              return (
                <Link key={useCase.title} href="/spily" className="group block">
                  <Card className="h-full overflow-hidden p-0 transition-all duration-200 hover:shadow-md">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                      <Image
                        src={useCase.image || "/placeholder.svg"}
                        alt={useCase.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {useCase.tag}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h2 className="font-semibold leading-tight group-hover:text-primary">{useCase.title}</h2>
                          <p className="text-sm text-muted-foreground line-clamp-2">{useCase.description}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-5 py-3">
                      <div className="flex w-full items-center justify-between text-sm">
                        <span className="text-muted-foreground">{useCase.products[0]}</span>
                        <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Подробнее
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Готовы выбрать спил?</h2>
              <p className="mt-3 text-muted-foreground">Перейдите в каталог и найдите материал для вашего проекта</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/spily">
                    Смотреть каталог
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/mastera">Работы мастеров</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <section className="border-t">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-semibold">Для чего используют спилы дерева</h2>
              <div className="mt-4 space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Спилы дерева — натуральный материал, который находит применение в самых разных областях: от декора
                  интерьера до творческих проектов. Благодаря уникальной текстуре и природному рисунку каждый спил
                  становится особенным элементом.
                </p>
                <p className="leading-relaxed">
                  Наиболее популярные направления — создание часов, сервировочных досок и интерьерного декора. Также
                  спилы активно используются на свадьбах и мероприятиях, в качестве фотофонов и основы для
                  художественных работ.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
