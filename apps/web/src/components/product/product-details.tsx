import { Tabs, TabsContent, TabsList, TabsTrigger } from "@spilwood/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { Check, X, Info, Truck, Shield, Leaf } from "lucide-react"
import type { Product } from "@/lib/data/products"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="mt-16 space-y-12">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium">Натуральный материал</h3>
          </div>
          <p className="text-sm text-muted-foreground">100% натуральная древесина без химической обработки</p>
        </div>

        <div className="rounded-lg border bg-card/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium">Готов к использованию</h3>
          </div>
          <p className="text-sm text-muted-foreground">Отшлифован и обработан, с естественной влажностью</p>
        </div>

        <div className="rounded-lg border bg-card/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium">Доставка Ozon</h3>
          </div>
          <p className="text-sm text-muted-foreground">Быстрая доставка по всей России через Ozon</p>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="usage">Применение</TabsTrigger>
          <TabsTrigger value="care">Уход</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">О товаре</h3>
            <p className="text-sm text-muted-foreground mb-1">Подробное описание и особенности</p>
          </div>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Каждый спил уникален благодаря природному рисунку годовых колец. Размеры и оттенки могут незначительно
              отличаться от фото — это особенность натурального материала.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Применение</h3>
            <p className="text-sm text-muted-foreground mb-4">Для каких целей подходит этот спил</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.usage.map((use) => (
              <Badge key={use} variant="secondary" className="px-3 py-1.5 text-sm font-normal">
                {use}
              </Badge>
            ))}
            <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">
              Декор интерьера
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-sm font-normal">
              Творческие проекты
            </Badge>
          </div>
        </TabsContent>

        <TabsContent value="care" className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Уход за изделием</h3>
            <p className="text-sm text-muted-foreground mb-4">Рекомендации по использованию и хранению</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Рекомендуется</p>
                <p className="mt-1 text-sm text-green-600/80 dark:text-green-400/80">
                  Покрыть лаком или маслом для дерева для продления срока службы
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Избегайте</p>
                <p className="mt-1 text-sm text-amber-600/80 dark:text-amber-400/80">
                  Прямого контакта с водой — дерево может деформироваться
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Спилы обработаны и готовы к использованию. Храните в сухом месте.
          </p>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Частые вопросы</h3>
          <p className="text-sm text-muted-foreground">Ответы на популярные вопросы о товаре</p>
        </div>
        <Accordion type="single" collapsible className="w-full rounded-lg border bg-card/30 px-6">
          <AccordionItem value="suitable" className="border-border/50">
            <AccordionTrigger className="text-left text-sm hover:no-underline">
              Для чего подходит этот спил?
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 pt-2 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 text-green-600" />
                    Подходит
                  </h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {product.usage.map((use) => (
                      <li key={use} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {use}
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      Декор интерьера
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      Творческие проекты
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <X className="h-4 w-4 text-red-600" />
                    Не подходит
                  </h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      Влажные помещения
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      Постоянный контакт с водой
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                      Улица без защиты
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery" className="border-border/50">
            <AccordionTrigger className="text-left text-sm hover:no-underline">
              Как осуществляется доставка?
            </AccordionTrigger>
            <AccordionContent>
              <p className="pt-2 text-sm text-muted-foreground">
                Доставка осуществляется через Ozon Доставку. Доступны различные способы: пункты выдачи, почтоматы,
                курьерская доставка. Сроки зависят от вашего региона — обычно 2-7 дней.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="care" className="border-border/50">
            <AccordionTrigger className="text-left text-sm hover:no-underline">
              Нужна ли дополнительная обработка?
            </AccordionTrigger>
            <AccordionContent>
              <p className="pt-2 text-sm text-muted-foreground">
                Спилы поставляются отшлифованными и готовыми к использованию. Для защиты древесины рекомендуем покрыть
                маслом или лаком, особенно если планируете использовать изделие для сервировки.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="natural" className="border-border/50">
            <AccordionTrigger className="text-left text-sm hover:no-underline">
              Почему спилы могут отличаться?
            </AccordionTrigger>
            <AccordionContent>
              <p className="pt-2 text-sm text-muted-foreground">
                Каждый спил — уникальное произведение природы. Рисунок годовых колец, оттенок древесины, форма коры
                могут отличаться. Указанный диаметр является примерным — допускается отклонение ±1-2 см.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
