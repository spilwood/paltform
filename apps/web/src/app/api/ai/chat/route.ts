import { convertToModelMessages, streamText, tool, type UIMessage } from "ai"
import { z } from "zod"
import { products } from "@/lib/data/products"

export const maxDuration = 30

const systemPrompt = `Ты — AI помощник магазина Spilwood, специализирующегося на продаже натуральных спилов дерева и пеньков.

Твоя задача — помочь клиентам подобрать идеальный товар для их целей.

Доступные категории товаров:
- Спилы берёзы (светлая древесина с характерной белой корой)
- Спилы сосны (тёплые янтарные оттенки с выраженными годовыми кольцами)
- Пеньки (декоративные столбики для интерьера)

Ты можешь:
1. Задавать уточняющие вопросы о назначении (свадьба, декор, мебель, творчество)
2. Узнавать предпочтения по размеру и бюджету
3. Рекомендовать конкретные товары из каталога
4. Объяснять особенности разных видов дерева

Будь дружелюбным и полезным. Отвечай на русском языке. Если клиент не уточнил что ему нужно — задай уточняющие вопросы.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const productsInfo = products.map((p) => ({
    name: p.name,
    category: p.categoryName,
    diameter: p.diameter,
    thickness: p.thickness,
    price: p.price,
    inStock: p.inStock,
    usage: p.usage,
    slug: p.slug,
    categorySlug: p.category,
  }))

  const result = streamText({
    model: "anthropic/claude-sonnet-4-20250514",
    system: systemPrompt + `\n\nАктуальный каталог товаров:\n${JSON.stringify(productsInfo, null, 2)}`,
    messages: convertToModelMessages(messages),
    tools: {
      recommendProducts: tool({
        description: "Показать клиенту рекомендуемые товары на основе его запроса",
        inputSchema: z.object({
          productSlugs: z.array(z.string()).describe("Массив slug-ов рекомендуемых товаров"),
          reason: z.string().describe("Краткое объяснение почему эти товары подходят"),
        }),
        execute: async ({ productSlugs, reason }) => {
          const recommended = products.filter((p) => productSlugs.includes(p.slug))
          return { products: recommended, reason }
        },
      }),
    },
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
