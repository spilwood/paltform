"use client"

import { useState } from "react"
import { Button } from "@spilwood/ui"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import { Label } from "@spilwood/ui"
import { Textarea } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { Sparkles, Loader2, FileText, Search, DollarSign, Copy, Check, Wand2 } from "lucide-react"
import { toast } from "sonner"

interface DescriptionResult {
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  tags: string[]
}

interface SeoResult {
  metaTitle: string
  metaDescription: string
  h1: string
  keywords: string[]
  altText: string
}

interface PricingResult {
  suggestedPrice: number
  priceRange: { min: number; max: number }
  factors: { factor: string; impact: string }[]
  recommendation: string
}

export function MasterAssistant() {
  const [activeTab, setActiveTab] = useState("description")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Form fields
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [materials, setMaterials] = useState("")
  const [size, setSize] = useState("")
  const [currentDescription, setCurrentDescription] = useState("")
  const [complexity, setComplexity] = useState("")
  const [timeSpent, setTimeSpent] = useState("")

  // Results
  const [descriptionResult, setDescriptionResult] = useState<DescriptionResult | null>(null)
  const [seoResult, setSeoResult] = useState<SeoResult | null>(null)
  const [pricingResult, setPricingResult] = useState<PricingResult | null>(null)

  const handleGenerate = async (action: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/master-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          productName,
          category,
          materials,
          size,
          currentDescription,
          complexity,
          timeSpent,
        }),
      })
      const data = await response.json()

      if (data.type === "description") {
        setDescriptionResult(data.data)
      } else if (data.type === "seo") {
        setSeoResult(data.data)
      } else if (data.type === "pricing") {
        setPricingResult(data.data)
      }
    } catch (error) {
      console.error("Failed to generate:", error)
      toast.error("Ошибка генерации")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    toast.success("Скопировано!")
    setTimeout(() => setCopiedField(null), 2000)
  }

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(text, field)}>
      {copiedField === field ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
    </Button>
  )

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wand2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Ассистент мастера</CardTitle>
            <CardDescription>Помогу с описаниями, SEO и ценами</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Описание</span>
            </TabsTrigger>
            <TabsTrigger value="seo" className="gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">SEO</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Цена</span>
            </TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description" className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Название изделия</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Часы из спила дуба"
                />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Часы из дерева" />
              </div>
              <div className="space-y-2">
                <Label>Материалы</Label>
                <Input
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="Дуб, эпоксидная смола"
                />
              </div>
              <div className="space-y-2">
                <Label>Размер</Label>
                <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="30 см диаметр" />
              </div>
            </div>

            <Button
              onClick={() => handleGenerate("description")}
              disabled={isLoading || !productName}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Сгенерировать описание
                </>
              )}
            </Button>

            {descriptionResult && (
              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Название</Label>
                    <CopyButton text={descriptionResult.title} field="title" />
                  </div>
                  <p className="mt-1 font-medium">{descriptionResult.title}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Короткое описание</Label>
                    <CopyButton text={descriptionResult.shortDescription} field="short" />
                  </div>
                  <p className="mt-1 text-sm">{descriptionResult.shortDescription}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Полное описание</Label>
                    <CopyButton text={descriptionResult.fullDescription} field="full" />
                  </div>
                  <p className="mt-1 text-sm">{descriptionResult.fullDescription}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">Особенности</Label>
                  <ul className="mt-2 space-y-1">
                    {descriptionResult.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">Теги</Label>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {descriptionResult.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="mt-6 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Название изделия</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Часы из спила дуба"
                />
              </div>
              <div className="space-y-2">
                <Label>Текущее описание</Label>
                <Textarea
                  value={currentDescription}
                  onChange={(e) => setCurrentDescription(e.target.value)}
                  placeholder="Вставьте текущее описание для оптимизации..."
                  rows={3}
                />
              </div>
            </div>

            <Button onClick={() => handleGenerate("seo")} disabled={isLoading || !productName} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Оптимизация...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Оптимизировать SEO
                </>
              )}
            </Button>

            {seoResult && (
              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Meta Title</Label>
                    <CopyButton text={seoResult.metaTitle} field="metaTitle" />
                  </div>
                  <p className="mt-1 text-sm font-medium">{seoResult.metaTitle}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Meta Description</Label>
                    <CopyButton text={seoResult.metaDescription} field="metaDesc" />
                  </div>
                  <p className="mt-1 text-sm">{seoResult.metaDescription}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">H1</Label>
                    <CopyButton text={seoResult.h1} field="h1" />
                  </div>
                  <p className="mt-1 font-medium">{seoResult.h1}</p>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Alt-текст для фото</Label>
                    <CopyButton text={seoResult.altText} field="alt" />
                  </div>
                  <p className="mt-1 text-sm">{seoResult.altText}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">Ключевые слова</Label>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {seoResult.keywords.map((kw, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Название изделия</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Часы из спила дуба"
                />
              </div>
              <div className="space-y-2">
                <Label>Категория</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Часы из дерева" />
              </div>
              <div className="space-y-2">
                <Label>Материалы</Label>
                <Input
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="Дуб, эпоксидная смола"
                />
              </div>
              <div className="space-y-2">
                <Label>Размер</Label>
                <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="30 см диаметр" />
              </div>
              <div className="space-y-2">
                <Label>Сложность работы</Label>
                <Input
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  placeholder="Высокая (эпоксидная смола)"
                />
              </div>
              <div className="space-y-2">
                <Label>Время изготовления</Label>
                <Input value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)} placeholder="8 часов" />
              </div>
            </div>

            <Button onClick={() => handleGenerate("pricing")} disabled={isLoading || !productName} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Анализ...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Рассчитать цену
                </>
              )}
            </Button>

            {pricingResult && (
              <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Рекомендуемая цена</span>
                  <span className="text-2xl font-bold text-primary">
                    {pricingResult.suggestedPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Диапазон рынка</span>
                  <span>
                    {pricingResult.priceRange.min.toLocaleString("ru-RU")} —{" "}
                    {pricingResult.priceRange.max.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">Факторы ценообразования</Label>
                  <div className="mt-2 space-y-2">
                    {pricingResult.factors.map((f, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{f.factor}</span>
                        <Badge variant="secondary" className="text-xs">
                          {f.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">Рекомендация</Label>
                  <p className="mt-1 text-sm">{pricingResult.recommendation}</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
