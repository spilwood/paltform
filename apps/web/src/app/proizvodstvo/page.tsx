import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { MapPin, TreePine, Ruler, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { SizeChart } from "@/components/size-chart"
import { ScrollAnimation } from "@/components/scroll-animation"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Производство спилов — о нас и процессе | Spilwood",
  description:
    "Производство спилов дерева в Тверской области. Честный рассказ о процессе, контроле качества и особенностях натурального материала.",
}

const processSteps = [
  {
    title: "Заготовка древесины",
    description: "Используем берёзу и сосну из лесов Тверской области. Работаем только с экологически чистым сырьём.",
    image: "/production-step-1.jpg",
  },
  {
    title: "Распил на спилы",
    description: "Распиливаем стволы на спилы нужной толщины. Контролируем диаметр и качество каждого среза.",
    image: "/production-step-2.jpg",
  },
  {
    title: "Шлифовка и обработка",
    description: "Шлифуем поверхность до гладкости и обрабатываем от вредителей. Продаём с естественной влажностью.",
    image: "/production-step-3.jpg",
  },
  {
    title: "Сортировка и упаковка",
    description: "Сортируем по размерам и качеству. Упаковываем для безопасной доставки через Ozon.",
    image: "/production-step-4.jpg",
  },
]

export default function ProizvodstvoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Breadcrumbs items={[{ label: "Производство" }]} />

          <ScrollAnimation>
            <h1 className="mt-8 text-4xl font-light tracking-tight md:text-5xl">Наше производство</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Мы — небольшое производство в Тверской области. Рассказываем честно, как делаем спилы.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={100}>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Тверская область, Россия</span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="mt-12 overflow-hidden rounded-lg">
              <AspectRatio ratio={21 / 9}>
                <Image
                  src="/production-workshop-hero.jpg"
                  alt="Мастерская Spilwood"
                  fill
                  className="object-cover"
                  priority
                />
              </AspectRatio>
            </div>
          </ScrollAnimation>

          {/* Size Chart Section */}
          <section className="mt-24">
            <ScrollAnimation>
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Размеры</h2>
              <p className="mt-2 text-2xl font-light">Выберите подходящий размер</p>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="mt-8">
                <SizeChart />
              </div>
            </ScrollAnimation>
          </section>

          {/* Process Steps */}
          <section className="mt-24">
            <ScrollAnimation>
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Процесс</h2>
            </ScrollAnimation>

            <div className="mt-12 space-y-24">
              {processSteps.map((step, index) => (
                <ScrollAnimation key={step.title} delay={index * 100}>
                  <div
                    className={`flex flex-col gap-12 md:flex-row md:items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2">
                      <div className="overflow-hidden rounded-lg">
                        <AspectRatio ratio={4 / 3}>
                          <Image
                            src={step.image || "/placeholder.svg"}
                            alt={step.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </AspectRatio>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <span className="text-xs text-muted-foreground">0{index + 1}</span>
                      <h3 className="mt-2 text-2xl font-light">{step.title}</h3>
                      <p className="mt-4 text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          <section className="mt-24 border-t border-border pt-16">
            <ScrollAnimation>
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Что мы гарантируем
              </h2>
            </ScrollAnimation>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: TreePine,
                  title: "Натуральное дерево",
                  description: "Только настоящая берёза и сосна из экологически чистых лесов Тверской области.",
                },
                {
                  icon: Ruler,
                  title: "Контроль размеров",
                  description: "Указанные диаметры соответствуют реальным с допуском ±1-2 см.",
                },
                {
                  icon: Shield,
                  title: "Обработка",
                  description: "Спилы отшлифованы и готовы к использованию.",
                },
              ].map((item, index) => (
                <ScrollAnimation key={item.title} delay={index * 100}>
                  <Card className="h-full border-border">
                    <CardContent className="p-8">
                      <item.icon className="h-6 w-6" />
                      <h3 className="mt-4 font-medium">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          <ScrollAnimation>
            <section className="mt-24">
              <Card className="border-border">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div>
                      <h2 className="text-xl font-light">Честно об ограничениях</h2>
                      <div className="mt-6 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
                        <p>
                          <strong className="text-foreground">Трещины.</strong> Дерево — живой материал. Мелкие трещины
                          могут появляться в процессе сушки.
                        </p>
                        <p>
                          <strong className="text-foreground">Неидеальная форма.</strong> Спилы не бывают идеально
                          круглыми — они повторяют форму ствола.
                        </p>
                        <p>
                          <strong className="text-foreground">Цвет и узор.</strong> Каждый спил уникален. Фото на сайте
                          — пример.
                        </p>
                        <p>
                          <strong className="text-foreground">Влажность.</strong> Не рекомендуем использовать спилы на
                          улице без защиты.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </ScrollAnimation>

          {/* SEO Text */}
          <section className="mt-24 border-t border-border pt-16">
            <h2 className="text-2xl font-light tracking-tight">Производство спилов в Тверской области</h2>
            <div className="mt-6 max-w-2xl space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Spilwood — небольшое семейное производство, основанное в 2025 году. Мы специализируемся на спилах и
                пеньках из берёзы и сосны для декора, творчества и интерьерных решений.
              </p>
              <p className="leading-relaxed">
                Наша мастерская расположена в Тверской области — регионе с богатыми лесными ресурсами. Мы не посредники:
                сами заготавливаем древесину, сами обрабатываем и сортируем каждый спил.
              </p>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
