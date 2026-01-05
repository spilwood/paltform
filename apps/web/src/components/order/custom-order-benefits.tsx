import { Card, CardContent } from "@/components/ui/card"
import { Ruler, Truck, Shield, Leaf, Clock, HeartHandshake } from "lucide-react"

const benefits = [
  {
    icon: Ruler,
    title: "Точные размеры",
    description: "Распил по вашим параметрам с точностью до сантиметра",
  },
  {
    icon: Leaf,
    title: "Экоматериалы",
    description: "Только отборная древесина из лесов Тверской области",
  },
  {
    icon: Clock,
    title: "Быстрое производство",
    description: "Изготовление заказа за 3-7 рабочих дней",
  },
  {
    icon: Truck,
    title: "Доставка по России",
    description: "Отправка через СДЭК, Почту России или Ozon",
  },
  {
    icon: Shield,
    title: "Гарантия качества",
    description: "Тщательная проверка каждого изделия",
  },
  {
    icon: HeartHandshake,
    title: "Индивидуальный подход",
    description: "Консультация и помощь в выборе параметров",
  },
]

export function CustomOrderBenefits() {
  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="border-0 bg-transparent shadow-none">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
