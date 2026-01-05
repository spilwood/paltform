import { ScrollAnimation } from "@/components/scroll-animation"
import { TreeDeciduous, Axe, Package, Truck } from "lucide-react"

const steps = [
  {
    icon: TreeDeciduous,
    title: "Заготовка",
    description: "Отбираем качественную древесину берёзы и сосны из экологически чистых лесов Тверской области",
  },
  {
    icon: Axe,
    title: "Производство",
    description: "Распиливаем, шлифуем и обрабатываем каждый спил вручную с вниманием к деталям",
  },
  {
    icon: Package,
    title: "Упаковка",
    description: "Тщательно упаковываем спилы для безопасной транспортировки в любой регион России",
  },
  {
    icon: Truck,
    title: "Доставка",
    description: "Отправляем заказы через Ozon с быстрой и надёжной доставкой до двери",
  },
]

export function ProcessSection() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollAnimation>
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Как мы работаем</span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              От леса до вашего дома
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              Полный контроль качества на каждом этапе производства
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative mt-16">
          {/* Connection line */}
          <div className="absolute left-8 top-8 hidden h-[calc(100%-4rem)] w-px bg-border md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="grid gap-12 md:gap-0">
            {steps.map((step, index) => (
              <ScrollAnimation key={step.title} delay={index * 150}>
                <div
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`flex items-center gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground md:max-w-sm ml-12 md:ml-0 md:mr-0">{step.description}</p>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground md:relative md:left-auto md:mx-auto md:shrink-0">
                    <step.icon className="h-6 w-6" />
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden flex-1 md:block" />
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
