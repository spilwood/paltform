import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react"

export const metadata = {
  title: "Контакты — Spilwood",
  description: "Свяжитесь с нами для заказа спилов и пеньков. Тверская область, Зубцовский район.",
}

export default function KontaktyPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Контакты", href: "/kontakty" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl font-light tracking-tight md:text-5xl">Контакты</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Свяжитесь с нами любым удобным способом. Мы всегда рады ответить на ваши вопросы.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-medium">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Тверская область
                <br />
                Зубцовский район
                <br />
                Россия
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-medium">
                <Mail className="h-5 w-5 text-muted-foreground" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:info@spilwood.ru"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                info@spilwood.ru
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-medium">
                <Phone className="h-5 w-5 text-muted-foreground" />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:+79001234567" className="text-muted-foreground hover:text-foreground transition-colors">
                +7 (900) 123-45-67
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-medium">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Время работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Пн–Пт: 9:00 — 18:00
                <br />
                Сб–Вс: выходной
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg font-medium">
                <Send className="h-5 w-5 text-muted-foreground" />
                Telegram магазин
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Заказывайте спилы и пеньки через наш Telegram мини-апп. Удобный каталог, быстрое оформление заказа и
                оперативная связь с менеджером.
              </p>
              <Button className="gap-2" asChild>
                <a href="https://t.me/spilwood_bot" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  Открыть Telegram магазин
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        <div className="text-center">
          <h2 className="text-2xl font-light tracking-tight">О компании</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Spilwood — производитель спилов и пеньков из берёзы и сосны. Основано в 2025 году в Тверской области,
            Зубцовский район. Мы производим качественные спилы для декора, творчества и интерьера с доставкой по всей
            России через Ozon.
          </p>
        </div>
      </div>
    </main>
  )
}
