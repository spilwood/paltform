"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@spilwood/ui"
import { ScrollAnimation } from "@/components/scroll-animation"

const faqs = [
  {
    question: "Какие породы дерева вы используете?",
    answer:
      "Мы работаем с двумя основными породами: берёзой и сосной. Берёза отличается светлой древесиной с характерным узором, а сосна — тёплыми оттенками и выраженными годовыми кольцами.",
  },
  {
    question: "Какие размеры спилов доступны?",
    answer:
      "Мы производим спилы диаметром от 10 до 40 см и толщиной от 1 до 5 см. Для пеньков высота варьируется от 10 до 30 см. Если вам нужен нестандартный размер — свяжитесь с нами для индивидуального заказа.",
  },
  {
    question: "Как осуществляется доставка?",
    answer:
      "Доставка осуществляется по всей России через маркетплейс Ozon. Мы тщательно упаковываем каждый заказ для безопасной транспортировки. Сроки доставки зависят от вашего региона.",
  },
  {
    question: "Можно ли заказать спилы оптом?",
    answer:
      "Да, мы работаем с оптовыми заказами для мастерских и магазинов. Свяжитесь с нами через Telegram для обсуждения условий и получения специальных цен.",
  },
  {
    question: "Спилы обработаны или сырые?",
    answer:
      "Все наши спилы проходят сушку и шлифовку. При необходимости можем предоставить необработанные спилы по запросу. Дополнительная обработка маслом или воском выполняется мастерами самостоятельно.",
  },
  {
    question: "Как стать мастером на вашем сайте?",
    answer:
      "Если вы создаёте изделия из наших спилов, вы можете разместить свои работы в разделе «Работы мастеров». Это бесплатно и даёт дополнительный трафик на ваши изделия. Свяжитесь с нами для размещения.",
  },
]

export function FaqSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <ScrollAnimation>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">FAQ</span>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">Частые вопросы</h2>
              <p className="mt-4 text-pretty text-muted-foreground">
                Ответы на популярные вопросы о наших спилах и работе. Не нашли ответ? Напишите нам в Telegram.
              </p>
            </ScrollAnimation>
          </div>

          <div className="lg:col-span-3">
            <ScrollAnimation delay={100}>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-base hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
