import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, MapPin, ShieldCheck, Clock, Send } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка Ozon — Spilwood",
  description: "Доставка спилов и пеньков по России через Ozon. Пункты выдачи и курьерская доставка по вашему адресу.",
}

export default function DostavkaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <Breadcrumbs items={[{ label: "Доставка" }]} />
            <div className="mt-6 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Доставка Ozon</h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Отправляем заказы по всей России через сервис Ozon Доставка — в пункты выдачи или курьером до двери.
              </p>
            </div>
          </div>
        </section>

        {/* Main Info Cards */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  Способы доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Через Ozon можно отправлять посылки по России — в наши пункты выдачи или с доставкой курьером по
                  адресу, который вы укажете.
                </p>
                <p className="leading-relaxed">
                  Вы выбираете удобный способ получения при оформлении заказа. Доставка осуществляется в тысячи пунктов
                  выдачи Ozon по всей стране.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  Верификация отправителя
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Данные аккаунта Ozon отправителя должны быть подтверждены через Ozon Банк или Госуслуги — это можно
                  сделать при оформлении отправки.
                </p>
                <p className="leading-relaxed">
                  Все наши отправления проходят проверку, что гарантирует безопасность и надёжность доставки.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Как происходит доставка</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                    1
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">Оформите заказ</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Выберите товар в каталоге и свяжитесь с нами через Telegram или на сайте
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                    2
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">Укажите адрес</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Выберите пункт выдачи Ozon или укажите адрес для курьерской доставки
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                    3
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">Мы отправим</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Упакуем заказ и передадим в Ozon. Вы получите трек-номер для отслеживания
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-semibold text-primary">
                    4
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold">Получите посылку</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Заберите заказ в пункте выдачи или примите от курьера по вашему адресу
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-dashed">
              <CardHeader>
                <MapPin className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">По всей России</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Доставляем в любой регион через сеть пунктов выдачи Ozon
                </p>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader>
                <Clock className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">Быстрая обработка</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Отправляем заказы в течение 1-2 рабочих дней после оформления
                </p>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader>
                <Package className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">Надёжная упаковка</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Каждый спил упаковываем бережно, чтобы он дошёл в идеальном состоянии
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Готовы оформить заказ?</h2>
            <p className="mt-3 text-muted-foreground">
              Свяжитесь с нами удобным способом, и мы поможем с выбором и доставкой
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="https://t.me/spilwood_bot" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  Telegram магазин
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/spily">Смотреть каталог</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* SEO Text */}
        <section className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="mx-auto max-w-3xl space-y-4 text-muted-foreground">
              <h2 className="text-xl font-semibold text-foreground">Доставка спилов по России</h2>
              <p className="leading-relaxed">
                Spilwood использует для доставки сервис Ozon Доставка, который обеспечивает быструю и надёжную отправку
                товаров по всей территории России. Вы можете выбрать удобный пункт выдачи Ozon рядом с домом или
                заказать курьерскую доставку по указанному адресу.
              </p>
              <p className="leading-relaxed">
                Все отправления проходят верификацию через Ozon Банк или Госуслуги, что гарантирует безопасность и
                надёжность доставки. Каждый заказ мы бережно упаковываем, чтобы спилы дошли до вас в идеальном
                состоянии.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
