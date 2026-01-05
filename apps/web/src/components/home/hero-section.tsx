import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Send, MapPin, Truck, TreePine, Star } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.1),transparent)]" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left column - Content */}
          <div className="max-w-2xl">
            <ScrollAnimation>
              <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-sm font-medium">
                <MapPin className="h-3.5 w-3.5" />
                Тверская область, Зубцовский район
              </Badge>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                Спилы и пеньки
                <span className="block text-muted-foreground">от производителя</span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation delay={150}>
              <p className="mt-6 max-w-lg text-pretty text-base text-muted-foreground md:text-lg">
                Натуральные спилы берёзы и сосны для декора, творчества и интерьера. Собственное производство с
                контролем качества на каждом этапе.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/spily">
                    Смотреть каталог
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                  <a href="https://t.me/spilwood_bot" target="_blank" rel="noopener noreferrer">
                    <Send className="h-4 w-4" />
                    Telegram
                  </a>
                </Button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={250}>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span>500+ отзывов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Доставка по России</span>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right column - Featured cards */}
          <ScrollAnimation delay={300}>
            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Main image card */}
                <div className="sm:col-span-2 aspect-[16/9] overflow-hidden rounded-xl">
                  <img
                    src="/hero-wood-slices-stumps-birch-pine.jpg"
                    alt="Спилы березы и сосны, пеньки - продукция Spilwood"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Feature card 1 */}
                <Card className="group cursor-pointer transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <TreePine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Берёза и сосна</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Два вида древесины для любых задач</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Feature card 2 */}
                <Card className="group cursor-pointer transition-colors hover:bg-muted/50">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="rounded-lg bg-primary/10 p-2.5">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Ozon доставка</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Быстрая отправка по всей России</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
