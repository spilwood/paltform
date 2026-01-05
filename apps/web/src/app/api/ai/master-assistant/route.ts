import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const requestSchema = z.object({
  action: z.enum(["description", "seo", "pricing"]),
  productName: z.string().optional(),
  category: z.string().optional(),
  materials: z.string().optional(),
  size: z.string().optional(),
  currentDescription: z.string().optional(),
  complexity: z.string().optional(),
  timeSpent: z.string().optional(),
})

const descriptionSchema = z.object({
  title: z.string().describe("SEO-оптимизированное название товара"),
  shortDescription: z.string().describe("Короткое описание для карточки товара (до 100 символов)"),
  fullDescription: z.string().describe("Полное описание для страницы товара (200-400 символов)"),
  features: z.array(z.string()).describe("Список ключевых особенностей (3-5 пунктов)"),
  tags: z.array(z.string()).describe("Теги для поиска (5-8 тегов)"),
})

const seoSchema = z.object({
  metaTitle: z.string().describe("SEO заголовок страницы (до 60 символов)"),
  metaDescription: z.string().describe("SEO описание страницы (до 160 символов)"),
  h1: z.string().describe("Заголовок H1 для страницы"),
  keywords: z.array(z.string()).describe("Ключевые слова для продвижения"),
  altText: z.string().describe("Alt-текст для изображений"),
})

const pricingSchema = z.object({
  suggestedPrice: z.number().describe("Рекомендуемая цена в рублях"),
  priceRange: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .describe("Диапазон цен на рынке"),
  factors: z
    .array(
      z.object({
        factor: z.string(),
        impact: z.string(),
      }),
    )
    .describe("Факторы, влияющие на цену"),
  recommendation: z.string().describe("Рекомендация по ценообразованию"),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { action, productName, category, materials, size, currentDescription, complexity, timeSpent } =
    requestSchema.parse(body)

  if (action === "description") {
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4-20250514",
      schema: descriptionSchema,
      prompt: `Ты копирайтер для маркетплейса изделий из дерева. 
      
Создай продающее описание для изделия:
- Название: ${productName || "не указано"}
- Категория: ${category || "не указана"}
- Материалы: ${materials || "натуральное дерево"}
- Размер: ${size || "не указан"}

Требования:
- Тёплый, дружелюбный тон
- Акцент на ручной работе и уникальности
- Практические преимущества для покупателя
- Эмоциональная связь с природой
- SEO-оптимизация для поиска`,
      maxOutputTokens: 1500,
    })
    return Response.json({ type: "description", data: object })
  }

  if (action === "seo") {
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4-20250514",
      schema: seoSchema,
      prompt: `Ты SEO-специалист для маркетплейса изделий ручной работы из дерева.

Создай SEO-оптимизацию для изделия:
- Название: ${productName || "не указано"}
- Категория: ${category || "не указана"}
- Текущее описание: ${currentDescription || "нет описания"}

Оптимизируй для запросов:
- Купить изделия из дерева
- Ручная работа из дерева
- Декор из натурального дерева
- Подарки из дерева`,
      maxOutputTokens: 1000,
    })
    return Response.json({ type: "seo", data: object })
  }

  if (action === "pricing") {
    const { object } = await generateObject({
      model: "anthropic/claude-sonnet-4-20250514",
      schema: pricingSchema,
      prompt: `Ты консультант по ценообразованию для мастеров изделий из дерева в России.

Проанализируй и предложи цену для изделия:
- Название: ${productName || "не указано"}
- Категория: ${category || "не указана"}
- Материалы: ${materials || "натуральное дерево"}
- Размер: ${size || "средний"}
- Сложность работы: ${complexity || "средняя"}
- Время на изготовление: ${timeSpent || "не указано"}

Учитывай:
- Средние цены на маркетплейсах (Ozon, Wildberries)
- Стоимость материалов
- Время мастера (минимум 300-500 руб/час)
- Уникальность ручной работы
- Конкурентоспособность`,
      maxOutputTokens: 1000,
    })
    return Response.json({ type: "pricing", data: object })
  }

  return Response.json({ error: "Unknown action" }, { status: 400 })
}
