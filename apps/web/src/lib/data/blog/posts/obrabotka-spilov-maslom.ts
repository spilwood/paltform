import type { BlogPost } from "../types";

export const post: BlogPost = {
  id: "2",
  title: "Полный гайд по обработке спилов маслом: выбор, нанесение, уход",
  slug: "obrabotka-spilov-maslom",
  excerpt:
    "Разбираемся в типах масел для дерева: датское, льняное, тунговое, минеральное. Какое выбрать для разных задач и как правильно наносить для идеального результата.",
  content: `
    <p class="lead">Масло — один из лучших способов обработки древесины. Оно проникает в структуру дерева, защищает от влаги и загрязнений, при этом сохраняя натуральный вид и тактильные ощущения. В этом гайде разберём все нюансы выбора и применения масел для спилов.</p>

    <h2>Зачем обрабатывать спилы маслом?</h2>
    <p>Необработанная древесина уязвима перед внешними воздействиями. Масляная пропитка решает сразу несколько задач:</p>
    <ul>
      <li><strong>Защита от влаги</strong> — масло заполняет поры и предотвращает впитывание воды</li>
      <li><strong>Предотвращение растрескивания</strong> — древесина меньше реагирует на перепады влажности</li>
      <li><strong>Проявление текстуры</strong> — рисунок годовых колец становится контрастнее и выразительнее</li>
      <li><strong>Защита от загрязнений</strong> — пятна не впитываются в структуру дерева</li>
      <li><strong>Приятные тактильные ощущения</strong> — поверхность становится шелковистой</li>
    </ul>

    <figure class="my-8">
      <img src="/blog/oil-comparison.jpg" alt="Сравнение обработанного и необработанного спила" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Слева — спил без обработки, справа — после нанесения датского масла</figcaption>
    </figure>

    <h2>Типы масел для дерева</h2>

    <h3>Датское масло (Danish Oil)</h3>
    <p>Смесь тунгового или льняного масла с лаком и растворителем. Самый популярный выбор для декоративных изделий.</p>
    <div class="grid md:grid-cols-2 gap-4 my-4">
      <div class="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
        <p class="font-medium text-green-800 dark:text-green-200 mb-2">Плюсы:</p>
        <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
          <li>Легко наносится</li>
          <li>Быстро сохнет (4-6 часов)</li>
          <li>Даёт лёгкий блеск</li>
          <li>Хорошая защита</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
        <p class="font-medium text-red-800 dark:text-red-200 mb-2">Минусы:</p>
        <ul class="text-red-700 dark:text-red-300 text-sm space-y-1">
          <li>Не подходит для пищевых изделий</li>
          <li>Требует хорошей вентиляции</li>
          <li>Дороже натуральных масел</li>
        </ul>
      </div>
    </div>

    <figure class="my-8">
      <img src="/blog/danish-oil.jpg" alt="Нанесение датского масла" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Датское масло идеально для декоративных спилов</figcaption>
    </figure>

    <h3>Льняное масло</h3>
    <p>Классический натуральный выбор. Бывает сырое и варёное (олифа).</p>
    <div class="grid md:grid-cols-2 gap-4 my-4">
      <div class="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
        <p class="font-medium text-green-800 dark:text-green-200 mb-2">Плюсы:</p>
        <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
          <li>100% натуральное</li>
          <li>Доступная цена</li>
          <li>Глубоко проникает в древесину</li>
          <li>Безопасно для пищевых изделий (сырое)</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
        <p class="font-medium text-red-800 dark:text-red-200 mb-2">Минусы:</p>
        <ul class="text-red-700 dark:text-red-300 text-sm space-y-1">
          <li>Долго сохнет (до 7 дней)</li>
          <li>Может желтеть со временем</li>
          <li>Слабая поверхностная защита</li>
        </ul>
      </div>
    </div>

    <h3>Тунговое масло</h3>
    <p>Премиальное масло из семян тунгового дерева. Создаёт прочную водостойкую плёнку.</p>
    <div class="grid md:grid-cols-2 gap-4 my-4">
      <div class="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
        <p class="font-medium text-green-800 dark:text-green-200 mb-2">Плюсы:</p>
        <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
          <li>Отличная водостойкость</li>
          <li>Не желтеет</li>
          <li>Устойчиво к царапинам</li>
          <li>Натуральный матовый финиш</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
        <p class="font-medium text-red-800 dark:text-red-200 mb-2">Минусы:</p>
        <ul class="text-red-700 dark:text-red-300 text-sm space-y-1">
          <li>Высокая цена</li>
          <li>Долго сохнет</li>
          <li>Может мутнеть при неправильном нанесении</li>
        </ul>
      </div>
    </div>

    <h3>Минеральное масло</h3>
    <p>Пищевое вазелиновое масло — лучший выбор для сервировочных досок и изделий, контактирующих с едой.</p>
    <div class="grid md:grid-cols-2 gap-4 my-4">
      <div class="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
        <p class="font-medium text-green-800 dark:text-green-200 mb-2">Плюсы:</p>
        <ul class="text-green-700 dark:text-green-300 text-sm space-y-1">
          <li>Полностью безопасно для пищи</li>
          <li>Без запаха и цвета</li>
          <li>Не портится</li>
          <li>Доступная цена</li>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
        <p class="font-medium text-red-800 dark:text-red-200 mb-2">Минусы:</p>
        <ul class="text-red-700 dark:text-red-300 text-sm space-y-1">
          <li>Не полимеризуется (не создаёт плёнку)</li>
          <li>Требует регулярного обновления</li>
          <li>Слабая защита от воды</li>
        </ul>
      </div>
    </div>

    <figure class="my-8">
      <img src="/blog/oil-types.jpg" alt="Разные виды масел для дерева" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Популярные масла для обработки древесины</figcaption>
    </figure>

    <h2>Как выбрать масло для вашего проекта</h2>
    
    <table class="w-full my-8 text-sm">
      <thead>
        <tr class="border-b">
          <th class="text-left py-2">Изделие</th>
          <th class="text-left py-2">Рекомендуемое масло</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="py-2">Часы, панно, декор</td>
          <td class="py-2">Датское масло, тунговое масло</td>
        </tr>
        <tr class="border-b">
          <td class="py-2">Сервировочные доски</td>
          <td class="py-2">Минеральное масло, смесь масла и воска</td>
        </tr>
        <tr class="border-b">
          <td class="py-2">Подставки под горячее</td>
          <td class="py-2">Тунговое масло, твёрдый воск</td>
        </tr>
        <tr class="border-b">
          <td class="py-2">Мебель, столешницы</td>
          <td class="py-2">Датское масло, масло-воск</td>
        </tr>
        <tr class="border-b">
          <td class="py-2">Детские изделия</td>
          <td class="py-2">Минеральное масло, пищевой воск</td>
        </tr>
      </tbody>
    </table>

    <h2>Подготовка поверхности</h2>
    <p>Правильная подготовка — половина успеха. Масло проявит все дефекты шлифовки, поэтому не пропускайте этот этап.</p>

    <h3>Порядок шлифовки:</h3>
    <ol>
      <li><strong>Зернистость 80</strong> — удаление грубых неровностей, следов от пилы</li>
      <li><strong>Зернистость 120</strong> — выравнивание поверхности</li>
      <li><strong>Зернистость 180</strong> — подготовка к финишной обработке</li>
      <li><strong>Зернистость 240</strong> — финишная шлифовка для гладкости</li>
      <li><strong>Зернистость 320-400</strong> — опционально, для зеркальной поверхности</li>
    </ol>

    <figure class="my-8">
      <img src="/blog/oil-prep.jpg" alt="Подготовка спила к нанесению масла" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Тщательная шлифовка перед нанесением масла</figcaption>
    </figure>

    <div class="bg-muted p-6 rounded-lg my-8">
      <p class="font-medium mb-2">Лайфхак</p>
      <p class="text-muted-foreground">После шлифовки 180 протрите спил влажной губкой и дайте высохнуть. Это поднимет ворс древесины, который вы уберёте финишной шлифовкой. В результате поверхность останется гладкой даже при контакте с влагой.</p>
    </div>

    <h2>Техника нанесения масла</h2>

    <h3>Что понадобится:</h3>
    <ul>
      <li>Масло для дерева</li>
      <li>Безворсовая ткань или кисть</li>
      <li>Мелкая наждачная бумага (400-600)</li>
      <li>Перчатки</li>
      <li>Хорошо проветриваемое помещение</li>
    </ul>

    <h3>Пошаговый процесс:</h3>

    <figure class="my-8">
      <img src="/blog/oil-application.jpg" alt="Нанесение масла на спил" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Равномерное нанесение масла вдоль волокон</figcaption>
    </figure>

    <ol>
      <li><strong>Первый слой:</strong> нанесите масло обильно, дайте впитаться 15-20 минут</li>
      <li><strong>Удаление излишков:</strong> тщательно протрите сухой тканью, не оставляя масляных луж</li>
      <li><strong>Просушка:</strong> оставьте на 24 часа в проветриваемом месте</li>
      <li><strong>Межслойная шлифовка:</strong> слегка пройдитесь наждачкой 400, удалите пыль</li>
      <li><strong>Второй слой:</strong> нанесите тонким слоем, удалите излишки через 10 минут</li>
      <li><strong>Третий слой (опционально):</strong> для максимальной защиты повторите процедуру</li>
    </ol>

    <div class="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-6 rounded-lg my-8">
      <p class="font-medium mb-2 text-amber-800 dark:text-amber-200">Важно!</p>
      <p class="text-amber-700 dark:text-amber-300">Ткань, пропитанная маслом, может самовоспламениться! После работы разложите её на негорючей поверхности или замочите в воде перед утилизацией.</p>
    </div>

    <h2>Финишный результат</h2>

    <figure class="my-8">
      <img src="/blog/oil-result.jpg" alt="Спил после обработки маслом" class="rounded-lg w-full" />
      <figcaption class="text-center text-sm text-muted-foreground mt-2">Берёзовый спил после трёх слоёв датского масла</figcaption>
    </figure>

    <h2>Уход за обработанными изделиями</h2>
    <ul>
      <li>Протирайте сухой или слегка влажной тканью</li>
      <li>Избегайте длительного контакта с водой</li>
      <li>Обновляйте покрытие раз в 6-12 месяцев (для активно используемых изделий)</li>
      <li>Для сервировочных досок — обновляйте минеральное масло раз в месяц</li>
    </ul>

    <h2>Заключение</h2>
    <p>Масляная обработка — это искусство, которое приходит с практикой. Начните с датского масла — оно прощает ошибки и даёт стабильный результат. С опытом вы сможете экспериментировать с другими составами и находить идеальные решения для каждого проекта.</p>
  `,
  image: "/blog/oil-hero.jpg",
  video: "/blog/oil-video.mp4",
  category: "Советы",
  publishedAt: "2025-01-10",
  readTime: 15,
  author: "Команда Spilwood",
  tags: ["обработка", "масло", "уход", "гайд", "датское масло"],
};
