import { generateText } from "ai"
import { z } from "zod"

export const maxDuration = 60

const requestSchema = z.object({
  productName: z.string(),
  category: z.string(),
  diameter: z.number(),
  generateImage: z.boolean().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { productName, category, diameter, generateImage } = requestSchema.parse(body)

  const categoryRu = category === "bereza" ? "берёзы" : category === "sosna" ? "сосны" : "пенёк"

  // Generate text ideas
  const { text: ideas } = await generateText({
    model: "anthropic/claude-sonnet-4-20250514",
    prompt: `Ты эксперт по DIY и декору из натурального дерева. 

Сгенерируй 6 креативных идей применения для: ${productName} (спил ${categoryRu}, диаметр ${diameter} см).

Для каждой идеи укажи:
1. Название проекта (короткое, 2-4 слова)
2. Краткое описание (1-2 предложения)
3. Уровень сложности (легко/средне/сложно)
4. Примерное время изготовления

Формат ответа - JSON массив:
[
  {
    "title": "Название",
    "description": "Описание",
    "difficulty": "легко|средне|сложно",
    "time": "30 минут"
  }
]

Отвечай ТОЛЬКО JSON без дополнительного текста.`,
    maxOutputTokens: 1500,
  })

  let parsedIdeas = []
  try {
    parsedIdeas = JSON.parse(ideas)
  } catch {
    parsedIdeas = []
  }

  // Generate image if requested
  let generatedImage = null
  if (generateImage && parsedIdeas.length > 0) {
    try {
      const result = await generateText({
        model: "google/gemini-3-pro-image-preview",
        prompt: `Create a beautiful photo-realistic image of a handmade ${parsedIdeas[0].title} made from a natural ${category === "bereza" ? "birch" : "pine"} wood slice, ${diameter}cm diameter. 
The item should look professionally crafted, placed in a cozy home interior setting with warm natural lighting. 
Style: rustic, artisan, Instagram-worthy product photography.`,
        maxOutputTokens: 1000,
      })

      for (const file of result.files) {
        if (file.mediaType.startsWith("image/")) {
          generatedImage = {
            base64: file.base64,
            mediaType: file.mediaType,
          }
          break
        }
      }
    } catch (error) {
      console.error("Image generation failed:", error)
    }
  }

  return Response.json({
    ideas: parsedIdeas,
    image: generatedImage,
  })
}
