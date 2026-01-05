"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Clock, Lightbulb, Loader2, ImageIcon, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Idea {
  title: string
  description: string
  difficulty: "легко" | "средне" | "сложно"
  time: string
}

interface InspirationGeneratorProps {
  productName: string
  category: string
  diameter: number
}

export function InspirationGenerator({ productName, category, diameter }: InspirationGeneratorProps) {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [image, setImage] = useState<{ base64: string; mediaType: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)

  const generateIdeas = async (withImage = false) => {
    if (withImage) {
      setIsGeneratingImage(true)
    } else {
      setIsLoading(true)
    }

    try {
      const response = await fetch("/api/ai/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          category,
          diameter,
          generateImage: withImage,
        }),
      })

      const data = await response.json()
      setIdeas(data.ideas || [])
      if (data.image) {
        setImage(data.image)
      }
    } catch (error) {
      console.error("Failed to generate ideas:", error)
    } finally {
      setIsLoading(false)
      setIsGeneratingImage(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "легко":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "средне":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "сложно":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Генератор идей</h3>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => generateIdeas(false)} disabled={isLoading || isGeneratingImage} variant="outline">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Генерация...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Сгенерировать идеи
              </>
            )}
          </Button>
          <Button onClick={() => generateIdeas(true)} disabled={isLoading || isGeneratingImage}>
            {isGeneratingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Создание...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />С картинкой
              </>
            )}
          </Button>
        </div>
      </div>

      {ideas.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, index) => (
            <Card
              key={index}
              className={cn(
                "transition-all hover:shadow-md hover:-translate-y-1",
                index === 0 && image && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-start justify-between gap-2 text-base">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    {idea.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{idea.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className={getDifficultyColor(idea.difficulty)}>
                    {idea.difficulty}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {idea.time}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {image && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ImageIcon className="h-4 w-4 text-primary" />
              AI-сгенерированное изображение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg">
              <img
                src={`data:${image.mediaType};base64,${image.base64}`}
                alt="AI generated inspiration"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              * Изображение создано AI для вдохновения. Реальный результат может отличаться.
            </p>
          </CardContent>
        </Card>
      )}

      {ideas.length === 0 && !isLoading && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Lightbulb className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-2 text-sm text-muted-foreground">
            Нажмите кнопку выше, чтобы получить креативные идеи применения этого спила
          </p>
        </div>
      )}
    </div>
  )
}
