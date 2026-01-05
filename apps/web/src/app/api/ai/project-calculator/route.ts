import { generateObject } from "ai"
import { z } from "zod"

export const maxDuration = 30

const projectSchema = z.object({
  recommendations: z
    .array(
      z.object({
        woodType: z.enum(["birch", "pine"]).describe("Рекомендуемый тип дерева"),
        productType: z.enum(["slice", "stump"]).describe("Тип изделия"),
        diameter: z.number().describe("Рекомендуемый диаметр в см"),
        thickness: z.number().describe("Рекомендуемая толщина/высота в см"),
        quantity: z.number().describe("Рекомендуемое количество"),
        processing: z.enum(["raw", "sanded", "oiled"]).describe("Рекомендуемая обработка"),
        reasoning: z.string().describe("Почему эти параметры подходят"),
      }),
    )
    .min(1)
    .max(3),
  tips: z.array(z.string()).describe("Полезные советы для проекта"),
  estimatedTime: z.string().describe("Примерное время на проект"),
})

export async function POST(req: Request) {
  const { projectDescription } = await req.json()

  const { object } = await generateObject({
    model: "anthropic/claude-sonnet-4-20250514",
    schema: projectSchema,
    prompt: `Ты эксперт по работе с деревом и DIY-проектам. Клиент описал свой проект:

"${projectDescription}"

Подбери оптимальные параметры спилов или пеньков для этого проекта.

Учитывай:
- Берёза: светлая, прочная, хороша для декора и поделок
- Сосна: тёплый оттенок, выразительные кольца, дешевле
- Спилы: толщина 1-5 см, для плоских изделий
- Пеньки: высота 10-40 см, для мебели и подставок
- Диаметры: 5-40 см
- Обработка: raw (без), sanded (шлифовка), oiled (шлифовка+масло)

Для свадьбы обычно нужна береза со шлифовкой.
Для подставок под горячее лучше сосна с маслом.
Для часов нужен диаметр 20-35 см.
Для подставок под кружки: 8-12 см.

Предложи 1-3 варианта и практические советы.`,
    maxOutputTokens: 1500,
  })

  return Response.json(object)
}
