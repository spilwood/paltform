import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@spilwood/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import { Textarea } from "@spilwood/ui"
import { Label } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Users, TrendingUp, Eye, CheckCircle2, MessageCircle, Camera, Sparkles, ArrowRight, Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Присоединиться к мастерам | Spilwood",
  description:
    "Станьте частью сообщества мастеров Spilwood. Покажите свои работы тысячам покупателей и получите дополнительный трафик.",
}

const benefits = [
  {
    icon: Eye,
    title: "Дополнительный трафик",
    description: "Ваши работы увидят тысячи посетителей нашего сайта, заинтересованных в изделиях из дерева",
  },
  {
    icon: TrendingUp,
    title: "SEO-видимость",
    description: "Каждая работа индексируется поисковиками и приводит новых клиентов из Google и Яндекс",
  },
  {
    icon: Users,
    title: "Доверие покупателей",
    description: "Клиенты доверяют изделиям из качественного материала Spilwood",
  },
  {
    icon: Star,
    title: "Бесплатное размещение",
    description: "Публикация работ на сайте абсолютно бесплатна для всех мастеров",
  },
]

const steps = [
  {
    number: "01",
    title: "Заполните заявку",
    description: "Расскажите о себе и своём творчестве",
  },
  {
    number: "02",
    title: "Пришлите фото работ",
    description: "Покажите свои лучшие изделия",
  },
  {
    number: "03",
    title: "Модерация",
    description: "Мы проверим заявку за 1-2 дня",
  },
  {
    number: "04",
    title: "Публикация",
    description: "Ваши работы появятся на сайте",
  },
]

export default function JoinMastersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <Breadcrumbs items={[{ label: "Работы мастеров", href: "/mastera" }, { label: "Присоединиться" }]} />

            <div className="mt-6 max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Для мастеров
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Присоединяйтесь к сообществу мастеров
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Покажите свои работы тысячам потенциальных клиентов. Мы поможем вам найти новых покупателей через наш
                сайт.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Benefits Grid */}
          <section>
            <h2 className="text-xl font-semibold">Преимущества для мастеров</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 font-medium">{benefit.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-16">
            <h2 className="text-xl font-semibold">Как это работает</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                    <div>
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute -right-2 top-4 hidden h-4 w-4 text-muted-foreground/50 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <section className="mt-16">
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold">Оставить заявку</h2>
                <p className="mt-2 text-muted-foreground">
                  Заполните форму, и мы свяжемся с вами в течение 1-2 рабочих дней.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Бесплатное размещение работ</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Личная страница мастера</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>Ссылки на ваши контакты</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span>SEO-оптимизация страниц</span>
                  </div>
                </div>
              </div>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Заявка на размещение</CardTitle>
                  <CardDescription>Расскажите о себе и своих работах</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ваше имя *</Label>
                        <Input id="name" placeholder="Иван Иванов" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Город</Label>
                        <Input id="city" placeholder="Москва" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telegram">Telegram</Label>
                        <Input id="telegram" placeholder="@username" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about">Расскажите о своём творчестве *</Label>
                      <Textarea
                        id="about"
                        placeholder="Чем занимаетесь, какие изделия создаёте, как давно работаете с деревом..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Ссылка на портфолио или соцсети</Label>
                      <Input id="portfolio" placeholder="https://instagram.com/..." />
                      <p className="text-xs text-muted-foreground">
                        Instagram, VK, Авито, Ярмарка мастеров или другая площадка
                      </p>
                    </div>

                    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                      <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm font-medium">Фотографии работ</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Пришлите 3-5 фото ваших лучших работ в Telegram после отправки заявки
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Отправить заявку
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
