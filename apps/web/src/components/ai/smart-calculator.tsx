"use client"

import { useState } from "react"
import { Button } from "@spilwood/ui"
import { Textarea } from "@spilwood/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import {
  Sparkles,
  Loader2,
  TreePine,
  TreeDeciduous,
  CircleDot,
  Layers,
  Clock,
  Lightbulb,
  ArrowRight,
  Check,
} from "lucide-react"
import Link from "next/link"

interface Recommendation {
  woodType: "birch" | "pine"
  productType: "slice" | "stump"
  diameter: number
  thickness: number
  quantity: number
  processing: "raw" | "sanded" | "oiled"
  reasoning: string
}

interface CalculatorResult {
  recommendations: Recommendation[]
  tips: string[]
  estimatedTime: string
}

const processingLabels = {
  raw: "Без обработки",
  sanded: "Шлифовка",
  oiled: "Шлифовка + масло",
}

const processingMultipliers = {
  raw: 1,
  sanded: 1.3,
  oiled: 1.6,
}

function calculatePrice(rec: Recommendation) {
  const basePrice = rec.woodType === "birch" ? 80 : 60
  const productMultiplier = rec.productType === "stump" ? 2.5 : 1
  const processingMultiplier = processingMultipliers[rec.processing]
  const diameterFactor = rec.diameter / 10
  const thicknessFactor = rec.productType === "slice" ? rec.thickness / 2 : rec.thickness / 10

  const pricePerUnit = Math.round(
    basePrice * productMultiplier * processingMultiplier * diameterFactor * thicknessFactor,
  )
  const discount = rec.quantity >= 50 ? 0.1 : rec.quantity >= 20 ? 0.05 : 0
  const total = Math.round(pricePerUnit * rec.quantity * (1 - discount))

  return { pricePerUnit, total, discount }
}

export function SmartCalculator() {
  const [description, setDescription] = useState("")
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleCalculate = async () => {
    if (!description.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/project-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription: description }),
      })
      const data = await response.json()
      setResult(data)
      setSelectedIndex(0)
    } catch (error) {
      console.error("Failed to calculate:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const exampleProjects = [
    "Хочу сделать 30 подставок под гостей на свадьбу с именами",
    "Нужны часы из спила дерева для гостиной",
    "Хочу 4 табурета-пенька для дачи",
    "Набор подставок под горячее, 6 штук",
  ]

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Калькулятор проектов</CardTitle>
              <p className="text-sm text-muted-foreground">Опишите ваш проект — AI подберёт оптимальные параметры</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <Textarea
            placeholder="Опишите ваш проект... Например: хочу сделать 50 подставок для гостей на свадьбу с выжиганием имён"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] resize-none"
          />

          <div className="flex flex-wrap gap-2">
            {exampleProjects.map((example) => (
              <Button
                key={example}
                variant="outline"
                size="sm"
                className="h-auto py-1 text-xs bg-transparent"
                onClick={() => setDescription(example)}
              >
                {example}
              </Button>
            ))}
          </div>

          <Button onClick={handleCalculate} disabled={isLoading || !description.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI анализирует проект...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Рассчитать
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="font-semibold">Рекомендации AI</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {result.recommendations.map((rec, index) => {
                const price = calculatePrice(rec)
                const isSelected = index === selectedIndex

                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          {index === 0 ? "Лучший выбор" : `Вариант ${index + 1}`}
                        </Badge>
                        {isSelected && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          {rec.woodType === "birch" ? (
                            <TreeDeciduous className="h-4 w-4 text-primary" />
                          ) : (
                            <TreePine className="h-4 w-4 text-primary" />
                          )}
                          <span>{rec.woodType === "birch" ? "Берёза" : "Сосна"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {rec.productType === "slice" ? (
                            <CircleDot className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Layers className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span>
                            {rec.productType === "slice" ? "Спил" : "Пенёк"} ⌀{rec.diameter} см × {rec.thickness} см
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {rec.quantity} шт. • {processingLabels[rec.processing]}
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-muted-foreground">{price.pricePerUnit} ₽/шт</span>
                        <span className="text-lg font-semibold">{price.total.toLocaleString("ru-RU")} ₽</span>
                      </div>
                      {price.discount > 0 && (
                        <Badge variant="secondary" className="mt-2 text-xs text-green-600">
                          Скидка {price.discount * 100}%
                        </Badge>
                      )}

                      <p className="mt-3 text-xs text-muted-foreground">{rec.reasoning}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Tips */}
          {result.tips.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Советы для проекта
                </div>
                <ul className="mt-3 space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Примерное время: {result.estimatedTime}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Button size="lg" className="w-full" asChild>
            <Link href="/zakaz">
              Оформить заказ по рекомендации
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}
