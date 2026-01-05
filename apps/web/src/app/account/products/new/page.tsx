"use client"

import type React from "react"

import { useAuth } from "@/lib/store/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AccountNav } from "@/components/account/account-nav"
import { Button } from "@spilwood/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import { Label } from "@spilwood/ui"
import { Textarea } from "@spilwood/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@spilwood/ui"
import { Switch } from "@spilwood/ui"
import { Spinner } from "@spilwood/ui"
import { Alert, AlertDescription } from "@spilwood/ui"
import { ArrowLeft, X, CheckCircle2, AlertCircle, ImagePlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MasterAssistant } from "@/components/ai/master-assistant"

const categories = [
  "Спилы дерева",
  "Часы из дерева",
  "Сервировочные доски",
  "Декор интерьера",
  "Свадебный декор",
  "Мебель",
  "Другое",
]

export default function NewProductPage() {
  const { isAuthenticated, isCraftsman, addProduct } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [inStock, setInStock] = useState(true)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/account/login")
    } else if (!isCraftsman) {
      router.push("/account")
    }
  }, [isAuthenticated, isCraftsman, router])

  if (!isAuthenticated || !isCraftsman) {
    return null
  }

  const handleAddImage = () => {
    // Mock image upload - in real app would open file picker
    const mockImages = ["/handmade-wood-product.jpg", "/wooden-craft.png", "/artisan-wood-piece.jpg"]
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)]
    if (images.length < 5) {
      setImages([...images, randomImage])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !description || !price || !category) {
      setError("Заполните все обязательные поля")
      return
    }

    if (images.length === 0) {
      setError("Добавьте хотя бы одно изображение")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    addProduct({
      name,
      description,
      price: Number(price),
      category,
      inStock,
      images,
    })

    setSuccess(true)
    setTimeout(() => {
      router.push("/account/products")
    }, 2000)
  }

  if (success) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <Card className="mx-auto max-w-md">
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-xl font-medium">Изделие добавлено!</h2>
            <p className="mt-2 text-muted-foreground">Ваше изделие успешно добавлено в каталог</p>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/account/products" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Назад к изделиям
          </Link>
        </Button>
        <h1 className="text-3xl font-light tracking-tight">Добавить изделие</h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <AccountNav />
        </aside>

        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          {/* Main Form */}
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Фотографии</CardTitle>
                  <CardDescription>Добавьте до 5 фотографий вашего изделия</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                    {images.map((img, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Фото ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        <ImagePlus className="h-8 w-8" />
                        <span className="text-xs">Добавить</span>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Название изделия *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Например: Часы из спила дуба"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Описание *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Опишите ваше изделие: материалы, размеры, особенности..."
                      rows={5}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена (₽) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Категория *</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="inStock" className="font-medium">
                        В наличии
                      </Label>
                      <p className="text-sm text-muted-foreground">Изделие доступно для заказа</p>
                    </div>
                    <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/account/products">Отмена</Link>
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Сохранение...
                    </>
                  ) : (
                    "Опубликовать"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="hidden xl:block">
            <div className="sticky top-24">
              <MasterAssistant />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
