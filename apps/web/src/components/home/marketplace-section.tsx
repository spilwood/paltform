import { Button } from "@spilwood/ui"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ExternalLink } from "lucide-react"

const marketplaces = [
  {
    name: "Ozon",
    description: "Основная площадка продаж",
    href: "https://ozon.ru",
    logo: "/ozon-logo.png",
  },
  {
    name: "Telegram",
    description: "Прямые заказы и консультации",
    href: "https://t.me/spilwood_bot",
    logo: "/telegram-logo.png",
  },
]

export function MarketplaceSection() {
  return (
    <section className="border-t border-border py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Покупайте там, где удобно</h2>
              <p className="mt-2 text-muted-foreground">Наши спилы доступны на маркетплейсах и в Telegram</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {marketplaces.map((marketplace) => (
                <Button
                  key={marketplace.name}
                  variant="outline"
                  className="h-auto gap-3 bg-transparent px-6 py-4"
                  asChild
                >
                  <a href={marketplace.href} target="_blank" rel="noopener noreferrer">
                    <div className="text-left">
                      <div className="font-medium">{marketplace.name}</div>
                      <div className="text-xs text-muted-foreground">{marketplace.description}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
