import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"

export const metadata = {
  title: "Публичная оферта — Spilwood",
  description: "Публичная оферта на продажу товаров интернет-магазина Spilwood",
}

export default function OfertaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Публичная оферта", href: "/oferta" },
        ]}
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Публичная оферта</CardTitle>
          <p className="text-sm text-muted-foreground">Редакция от 01.01.2025</p>
        </CardHeader>
        <CardContent className="prose prose-neutral max-w-none dark:prose-invert">
          <section className="space-y-4">
            <h2 className="text-lg font-medium">1. Общие положения</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Настоящий документ является официальным предложением (публичной офертой) самозанятой Карпычевой Ольги
              Александровны (далее — Продавец) для любого физического или юридического лица (далее — Покупатель)
              заключить договор купли-продажи товаров, представленных на сайте spilwood.ru.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец осуществляет деятельность в качестве самозанятого (плательщика налога на профессиональный доход)
              на территории Тверской области, Зубцовский район.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Акцептом (принятием) настоящей оферты является оформление заказа на сайте или в Telegram-боте Продавца.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">2. Предмет договора</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец обязуется передать Покупателю товары (спилы дерева, пеньки и сопутствующие изделия из древесины),
              а Покупатель обязуется принять и оплатить товары в соответствии с условиями настоящей оферты.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Ассортимент, характеристики и цены товаров указаны на сайте spilwood.ru и в Telegram-боте @spilwood_bot.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">3. Оформление заказа</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Покупатель может оформить заказ следующими способами:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Через корзину на сайте spilwood.ru</li>
              <li>Через Telegram-бот @spilwood_bot</li>
              <li>По электронной почте info@spilwood.ru</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              После оформления заказа Покупатель получает подтверждение с номером заказа и деталями. Продавец
              связывается с Покупателем для уточнения деталей доставки и оплаты.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">4. Цены и оплата</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Цены на товары указаны в рублях Российской Федерации и включают все применимые налоги. Стоимость доставки
              оплачивается дополнительно и рассчитывается индивидуально.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">Способы оплаты:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Банковский перевод на карту</li>
              <li>Оплата при получении (для некоторых регионов)</li>
              <li>Онлайн-оплата через платёжные системы</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец формирует чек в соответствии с требованиями законодательства о налоге на профессиональный доход.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">5. Доставка</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Доставка осуществляется транспортными компаниями (СДЭК, Почта России и др.) или курьерской службой.
              Стоимость и сроки доставки зависят от региона и веса заказа.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Возможен самовывоз из Тверской области, Зубцовский район (по предварительной договорённости).
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Риск случайной гибели или повреждения товара переходит к Покупателю с момента передачи товара транспортной
              компании или курьеру.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">6. Качество товара</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец гарантирует, что товары изготовлены из натуральной древесины и соответствуют заявленным
              характеристикам. В силу природного происхождения материала возможны незначительные отличия по цвету,
              текстуре и размеру — это не является дефектом.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Все спилы проходят первичную обработку и шлифовку. Продукция поставляется с естественной влажностью
              древесины.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">7. Возврат и обмен</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Покупатель вправе отказаться от товара надлежащего качества в течение 14 дней с момента получения при
              условии сохранения товарного вида и потребительских свойств.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              В случае обнаружения дефектов (трещины, сколы, повреждения), возникших по вине Продавца или транспортной
              компании, Покупатель вправе требовать замены товара или возврата денежных средств.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Для возврата или обмена необходимо связаться с Продавцом по электронной почте или в Telegram.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">8. Ответственность сторон</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец не несёт ответственности за ненадлежащее исполнение обязательств, если это вызвано действиями
              третьих лиц (транспортных компаний, почтовых служб) или обстоятельствами непреодолимой силы.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Покупатель несёт ответственность за достоверность предоставленных данных для доставки.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">9. Разрешение споров</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Все споры и разногласия решаются путём переговоров. При невозможности достижения согласия споры
              рассматриваются в соответствии с действующим законодательством Российской Федерации.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">10. Реквизиты Продавца</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Самозанятая:</strong> Карпычева Ольга Александровна
              <br />
              <strong>Статус:</strong> Плательщик налога на профессиональный доход
              <br />
              <strong>Регион деятельности:</strong> Тверская область, Зубцовский район
              <br />
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@spilwood.ru" className="text-primary hover:underline">
                info@spilwood.ru
              </Link>
              <br />
              <strong>Сайт:</strong>{" "}
              <Link href="https://spilwood.ru" className="text-primary hover:underline">
                spilwood.ru
              </Link>
              <br />
              <strong>Telegram:</strong>{" "}
              <Link href="https://t.me/spilwood_bot" className="text-primary hover:underline">
                @spilwood_bot
              </Link>
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
