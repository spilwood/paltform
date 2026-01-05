import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Какие породы дерева доступны для заказа?",
    answer:
      "Мы работаем с двумя породами: берёза и сосна. Берёза отличается светлым цветом и выразительным рисунком годовых колец, идеальна для декора. Сосна имеет тёплый желтоватый оттенок и характерный хвойный аромат.",
  },
  {
    question: "Какие размеры можно заказать?",
    answer:
      "Диаметр спилов и пеньков — от 5 до 40 см. Толщина спилов — от 1 до 5 см. Высота пеньков — от 10 до 40 см. Если вам нужны другие размеры, укажите это в комментарии к заявке.",
  },
  {
    question: "Сколько времени занимает изготовление?",
    answer:
      "Стандартный срок изготовления — 3-7 рабочих дней в зависимости от объёма заказа и типа обработки. Для срочных заказов свяжитесь с нами напрямую через Telegram.",
  },
  {
    question: "Как происходит доставка?",
    answer:
      "Доставка осуществляется по всей России через СДЭК, Почту России или Ozon. Также возможен самовывоз из Зубцовского района Тверской области. Стоимость доставки рассчитывается отдельно.",
  },
  {
    question: "Можно ли заказать спилы с корой?",
    answer:
      "Да, мы можем сохранить натуральную кору на изделии. Это придаёт спилу естественный вид и особый шарм. Укажите это пожелание при оформлении заказа.",
  },
  {
    question: "Какие виды обработки доступны?",
    answer:
      "Мы предлагаем три варианта: без обработки (натуральный вид), шлифовка (гладкая поверхность) и шлифовка с покрытием маслом (защита и подчёркивание текстуры). Выбор обработки влияет на итоговую стоимость.",
  },
]

export function CustomOrderFAQ() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-light md:text-3xl">Частые вопросы</h2>
          <p className="mt-3 text-muted-foreground">Ответы на популярные вопросы об индивидуальных заказах</p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
