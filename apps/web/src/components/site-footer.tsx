import Link from "next/link"
import { Separator } from "@spilwood/ui"
import { Button } from "@spilwood/ui"
import { Send } from "lucide-react"

const footerLinks = {
  catalog: [
    { name: "Спилы берёзы", href: "/spily/bereza" },
    { name: "Спилы сосны", href: "/spily/sosna" },
    { name: "Пеньки", href: "/penki" },
  ],
  info: [
    { name: "Производство", href: "/proizvodstvo" },
    { name: "Применение", href: "/primenenie" },
    { name: "Доставка", href: "/dostavka" },
  ],
  community: [
    { name: "Работы мастеров", href: "/mastera" },
    { name: "Блог", href: "/blog" },
    { name: "Контакты", href: "/kontakty" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-medium tracking-tight">
              Spilwood
            </Link>
            <p className="mt-4 sm:mt-6 text-sm leading-relaxed text-muted-foreground">
              Производитель спилов и пеньков из берёзы и сосны. Основано в 2025 году.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Самозанятая Карпычева О.А.
              <br />
              Тверская область, Зубцовский район
            </p>
            <Button className="mt-4 sm:mt-6 gap-2 w-full sm:w-auto" asChild>
              <a href="https://t.me/spilwood_bot" target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4" />
                Магазин в Telegram
              </a>
            </Button>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Каталог</h3>
            <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-muted-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Информация</h3>
            <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-muted-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Сообщество</h3>
            <ul className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-muted-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mt-12 sm:mt-16 md:mt-20" />
        <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 md:flex-row md:items-center">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              © 2025–{new Date().getFullYear()} Spilwood. Все права защищены.
            </p>
            <p className="text-xs text-muted-foreground">Самозанятая Карпычева Ольга Александровна</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <Link href="/politika" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/oferta" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
