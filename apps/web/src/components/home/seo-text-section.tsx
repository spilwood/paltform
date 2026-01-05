import { Card, CardContent, CardHeader, CardTitle } from "@spilwood/ui"
import { ScrollAnimation } from "@/components/scroll-animation"

export function SeoTextSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <ScrollAnimation animation="fade-up">
          <Card className="max-w-2xl rounded-none border-0 bg-transparent shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl font-light tracking-tight md:text-3xl">
                Купить спилы дерева от производителя
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6 text-muted-foreground">
              <p className="leading-relaxed">
                Spilwood — производитель натуральных спилов и пеньков из берёзы и сосны. Наше производство расположено в
                Тверской области, где мы используем экологически чистую древесину из местных лесов.
              </p>
              <p className="leading-relaxed">
                Спилы дерева широко применяются в декоре интерьеров, на свадьбах и мероприятиях, в творческих
                мастерских. Мастера создают из них часы, подставки, сервировочные доски, настенный декор и многое
                другое.
              </p>
              <p className="leading-relaxed">
                Мы предлагаем спилы разных диаметров и толщины: от небольших срезов 10 см для подставок под кружки до
                крупных спилов 40 см для столешниц и часов. Доставка осуществляется по всей России через маркетплейс
                Ozon.
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  )
}
