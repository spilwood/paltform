import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import type { Metadata } from "next"
import Image from "next/image"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { CustomOrderForm } from "@/components/order/custom-order-form"
import { CustomOrderBenefits } from "@/components/order/custom-order-benefits"
import { CustomOrderFAQ } from "@/components/order/custom-order-faq"
import { OrderCalculator } from "@/components/order/order-calculator"
import { SmartCalculator } from "@/components/ai/smart-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Индивидуальный заказ | Spilwood",
  description:
    "Закажите распил дерева по индивидуальным размерам. Сосна и берёза на выбор. Производство в Тверской области.",
  openGraph: {
    title: "Индивидуальный заказ распила | Spilwood",
    description: "Закажите спилы и пеньки по вашим размерам. Сосна и берёза. Доставка по России.",
  },
}

export default function CustomOrderPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
          <div className="absolute inset-0">
            <Image src="/custom-order-hero-bg.jpg" alt="" fill className="object-cover opacity-15" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8">
            <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Индивидуальный заказ" }]} />

            <div className="mt-12 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Принимаем заявки
              </div>
              <h1 className="mt-6 text-balance text-4xl font-light leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Индивидуальный
                <br />
                <span className="text-muted-foreground">распил древесины</span>
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                Создаём спилы и пеньки по вашим размерам из отборной сосны и берёзы. Каждое изделие — уникальный рисунок
                годовых колец и природная красота.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <CustomOrderBenefits />

        {/* Main Content with Tabs */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Tabs defaultValue="ai-calculator" className="w-full">
              <TabsList className="mb-8 grid w-full max-w-lg grid-cols-3">
                <TabsTrigger value="ai-calculator">AI Расчёт</TabsTrigger>
                <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
                <TabsTrigger value="form">Форма заказа</TabsTrigger>
              </TabsList>

              <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
                {/* Left side - Decorative */}
                <div className="hidden lg:col-span-2 lg:block">
                  <div className="sticky top-28 space-y-8">
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src="/custom-order-workshop.jpg"
                        alt="Мастерская Spilwood"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </div>
                    <blockquote className="border-l-2 border-primary/30 pl-6">
                      <p className="text-lg italic text-muted-foreground">
                        «Каждый спил — это история дерева, запечатлённая в годовых кольцах. Мы бережно сохраняем эту
                        красоту.»
                      </p>
                      <footer className="mt-4 text-sm font-medium">— Команда Spilwood</footer>
                    </blockquote>
                  </div>
                </div>

                {/* Right side - Calculator/Form */}
                <div className="lg:col-span-3">
                  <TabsContent value="ai-calculator" className="mt-0">
                    <SmartCalculator />
                  </TabsContent>
                  <TabsContent value="calculator" className="mt-0">
                    <OrderCalculator />
                  </TabsContent>
                  <TabsContent value="form" className="mt-0">
                    <CustomOrderForm />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <CustomOrderFAQ />

        {/* Nature-inspired decorative footer */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                Производство в гармонии с природой
              </p>
              <h2 className="mt-4 text-2xl font-light md:text-3xl">Тверская область, Зубцовский район</h2>
              <p className="mt-4 text-muted-foreground">
                Мы работаем только с экологически чистой древесиной из лесов центральной России, сохраняя баланс между
                производством и природой.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
