import Link from "next/link"
import { Button } from "@spilwood/ui"
import { AspectRatio } from "@spilwood/ui"
import { ArrowRight, Check } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const features = [
  "Дополнительный трафик на ваши изделия",
  "Доверие к материалу от производителя",
  "SEO-видимость в поисковых системах",
]

export function MastersCtaSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollAnimation animation="fade-right">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Для мастеров</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Покупаете спилы у Spilwood — продавайте свои изделия через наш сайт
              </h2>
              <p className="mt-6 text-pretty text-muted-foreground">
                Разместите свои работы в разделе «Работы мастеров». Получайте заказы от покупателей, которые ищут
                уникальные изделия из дерева.
              </p>

              <ul className="mt-8 space-y-3">
                {features.map((feature, _index) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-10 px-8" asChild>
                <Link href="/mastera">
                  Разместить работу
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-left" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-lg">
                  <img
                    src="/wooden-clock-handmade-craft-rustic.jpg"
                    alt="Часы из спила"
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
                <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                  <img
                    src="/wooden-coasters-set-handmade-natural.jpg"
                    alt="Подставки из спилов"
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="mt-8 space-y-4">
                <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
                  <img
                    src="/wooden-serving-board-epoxy-resin-art.jpg"
                    alt="Сервировочная доска"
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
                <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-lg">
                  <img
                    src="/wooden-wall-art-decor-handmade.jpg"
                    alt="Декор на стену"
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
