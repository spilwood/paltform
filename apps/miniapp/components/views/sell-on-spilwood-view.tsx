"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Upload, Store, TrendingUp, DollarSign, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа").max(100, "Максимум 100 символов"),
  price: z.number().min(1, "Цена должна быть больше 0"),
  description: z.string().min(20, "Минимум 20 символов"),
  category: z.string(),
  stock: z.number().min(1, "Минимум 1 шт"),
})

type ProductFormData = z.infer<typeof productSchema>

export function SellOnSpilwoodView({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState<"info" | "form" | "success">("info")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "birch",
      stock: 1,
    },
  })

  const onSubmit = (data: ProductFormData) => {
    console.log("[v0] Product submission:", data)
    setCurrentStep("success")
    setTimeout(() => {
      reset()
      setUploadedImage(null)
      setCurrentStep("info")
      onBack()
    }, 3000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (currentStep === "success") {
    return (
      <div className="flex flex-col min-h-full items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
          <Package className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Товар отправлен!</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
          Ваш товар отправлен на модерацию. Мы проверим его и опубликуем в течение 24 часов.
        </p>
      </div>
    )
  }

  if (currentStep === "form") {
    return (
      <div className="flex flex-col min-h-full">
        <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => setCurrentStep("info")}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Добавить товар</h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 p-4 space-y-4">
          <div>
            <Label htmlFor="image">Фото товара</Label>
            <label
              htmlFor="image-upload"
              className="mt-2 w-full h-48 rounded-2xl border-2 border-dashed border-border bg-muted hover:bg-muted/80 flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden"
            >
              {uploadedImage ? (
                <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Нажмите для загрузки</span>
                </>
              )}
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <div>
            <Label htmlFor="name">Название товара</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Например: Панно из спилов"
              className="mt-2 h-12 rounded-xl"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Цена (₽)</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="0"
              className="mt-2 h-12 rounded-xl"
            />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="stock">Количество</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              placeholder="1"
              className="mt-2 h-12 rounded-xl"
            />
            {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Опишите ваш товар подробно..."
              className="mt-2 min-h-[120px] rounded-xl"
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <Button type="submit" className="w-full h-12 rounded-2xl bg-primary text-base font-medium">
            Опубликовать товар
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-card border-b border-border px-4 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Продавай на Spilwood</h1>
      </header>

      <div className="flex-1 p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Store className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Стань продавцом</h2>
              <p className="text-sm text-muted-foreground">Продавай свои изделия без комиссии</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Преимущества</h3>

          <Card className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">0% комиссии</h4>
                <p className="text-sm text-muted-foreground">
                  Мы не берем комиссию с продаж. Вся прибыль остается у вас. Мы просто витрина.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Своя доставка через Ozon</h4>
                <p className="text-sm text-muted-foreground">
                  Вы сами оформляете доставку через свой аккаунт Ozon. Полный контроль над процессом.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Готовая аудитория</h4>
                <p className="text-sm text-muted-foreground">
                  Тысячи покупателей уже ищут уникальные изделия из спилов.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-semibold text-foreground">Как это работает</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                1
              </span>
              <span>Покупаете спилы у Spilwood и создаете уникальные изделия</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                2
              </span>
              <span>Размещаете фото и описание товара на нашей витрине</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                3
              </span>
              <span>Покупатели связываются с вами напрямую через Telegram</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                4
              </span>
              <span>Вы оформляете доставку через свой аккаунт Ozon и получаете оплату напрямую</span>
            </li>
          </ol>
        </div>

        <Button onClick={() => setCurrentStep("form")} className="w-full h-12 rounded-2xl bg-primary text-base">
          Начать продавать
        </Button>
      </div>
    </div>
  )
}
