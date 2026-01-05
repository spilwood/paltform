import { Factory, Ruler, Package, Truck } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const benefits = [
  {
    number: "01",
    icon: Factory,
    title: "Производитель",
    description: "Собственное производство в Тверской области. Не перекупщики.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Натуральные размеры",
    description: "Естественные размеры спилов. Каждый уникален по форме и диаметру.",
  },
  {
    number: "03",
    icon: Package,
    title: "Для мастеров",
    description: "Материал для изделий на продажу. Стабильное качество.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Ozon доставка",
    description: "Быстрая и надёжная доставка по всей России.",
  },
]

export function BenefitsSection() {
  return (
    <section className="border-t border-border bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Почему выбирают Spilwood</h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Мы не посредники — мы производим спилы сами и знаем о них всё
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <ScrollAnimation key={benefit.number} delay={index * 100}>
              <div className="group h-full rounded-lg border border-border/50 bg-card/50 p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-md hover:-translate-y-1">
                <div className="pb-2">
                  <span className="text-xs text-muted-foreground">{benefit.number}</span>
                  <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <benefit.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                </div>
                <div className="pt-0">
                  <p className="leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
