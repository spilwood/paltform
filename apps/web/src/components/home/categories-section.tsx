import Link from "next/link"
import { Badge } from "@spilwood/ui"
import { Card, CardContent } from "@spilwood/ui"
import { AspectRatio } from "@spilwood/ui"
import { ArrowUpRight } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const categories = [
  {
    title: "Спилы берёзы",
    description: "Светлая древесина с характерным узором. Диаметр от 10 до 40 см.",
    image: "/birch-wood-slices-stacked-natural-white-bark.jpg",
    href: "/spily/bereza",
    badge: "Популярное",
  },
  {
    title: "Спилы сосны",
    description: "Тёплые оттенки с выраженными годовыми кольцами. Разные размеры.",
    image: "/pine-wood-slices-annual-rings-warm-tone.jpg",
    href: "/spily/sosna",
    badge: null,
  },
  {
    title: "Пеньки",
    description: "Декоративные пеньки для интерьера и мероприятий. Высота 10–30 см.",
    image: "/decorative-wooden-stumps-rustic-style.jpg",
    href: "/penki",
    badge: null,
  },
]

export function CategoriesSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollAnimation>
          <h2 className="text-3xl font-light tracking-tight md:text-4xl">Каталог</h2>
        </ScrollAnimation>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <ScrollAnimation key={category.title} delay={index * 150}>
              <Link href={category.href} className="group block">
                <Card className="overflow-hidden rounded-none border-0 bg-transparent shadow-none">
                  <CardContent className="p-0">
                    <AspectRatio ratio={4 / 5} className="overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </AspectRatio>
                    <div className="mt-6 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium transition-colors group-hover:text-primary">
                          {category.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      {category.badge ? (
                        <Badge variant="secondary" className="shrink-0 rounded-none">
                          {category.badge}
                        </Badge>
                      ) : (
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={450}>
          <div className="mt-12 text-center">
            <Link
              href="/mastera"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Смотреть работы мастеров
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
