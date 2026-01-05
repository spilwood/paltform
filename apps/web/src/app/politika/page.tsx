import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"

export const metadata = {
  title: "Политика конфиденциальности — Spilwood",
  description: "Политика конфиденциальности и обработки персональных данных интернет-магазина Spilwood",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Политика конфиденциальности", href: "/politika" },
        ]}
      />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-medium">Политика конфиденциальности</CardTitle>
          <p className="text-sm text-muted-foreground">Редакция от 01.01.2025</p>
        </CardHeader>
        <CardContent className="prose prose-neutral max-w-none dark:prose-invert">
          <section className="space-y-4">
            <h2 className="text-lg font-medium">1. Общие положения</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении всей
              информации, которую самозанятая Карпычева Ольга Александровна (далее — Продавец), может получить о
              покупателе во время использования сайта spilwood.ru, его сервисов и программ.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец осуществляет деятельность в качестве самозанятого на территории Тверской области, Зубцовский
              район.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">2. Персональные данные</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              В рамках настоящей Политики под персональными данными понимается:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Фамилия, имя, отчество</li>
              <li>Адрес электронной почты</li>
              <li>Номер телефона</li>
              <li>Адрес доставки</li>
              <li>Иная информация, необходимая для оформления и доставки заказа</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">3. Цели сбора персональных данных</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец собирает и использует персональные данные в следующих целях:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Идентификация покупателя для оформления заказа</li>
              <li>Обработка и доставка заказов</li>
              <li>Связь с покупателем для уточнения деталей заказа</li>
              <li>Информирование о статусе заказа</li>
              <li>Предоставление персонализированных рекомендаций</li>
              <li>Улучшение качества обслуживания</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">4. Хранение и защита данных</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец принимает необходимые организационные и технические меры для защиты персональных данных
              покупателя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования,
              распространения.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Персональные данные хранятся на защищённых серверах и не передаются третьим лицам, за исключением случаев,
              необходимых для доставки заказа (службы доставки).
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">5. Права покупателя</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">Покупатель имеет право:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Получить информацию о своих персональных данных</li>
              <li>Требовать уточнения или удаления своих персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Для реализации своих прав покупатель может обратиться по электронной почте:{" "}
              <Link href="mailto:info@spilwood.ru" className="text-primary hover:underline">
                info@spilwood.ru
              </Link>
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">6. Cookies и аналитика</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Сайт использует файлы cookies для улучшения работы сайта и анализа посещаемости. Покупатель может
              отключить cookies в настройках своего браузера, однако это может повлиять на функциональность сайта.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">7. Изменение Политики</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Продавец имеет право вносить изменения в настоящую Политику. Новая редакция Политики вступает в силу с
              момента её размещения на сайте. Продолжение использования сайта после внесения изменений означает согласие
              покупателя с новой редакцией Политики.
            </p>
          </section>

          <Separator className="my-6" />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">8. Контактные данные</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong>Самозанятая:</strong> Карпычева Ольга Александровна
              <br />
              <strong>Регион деятельности:</strong> Тверская область, Зубцовский район
              <br />
              <strong>Email:</strong>{" "}
              <Link href="mailto:info@spilwood.ru" className="text-primary hover:underline">
                info@spilwood.ru
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
