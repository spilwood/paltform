"use client"

import { useState } from "react"
import { Send, TreeDeciduous, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customOrderFormSchema, type CustomOrderFormData } from "@/lib/validation-schemas"

const woodTypes = [
  { id: "birch", name: "Береза", color: "bg-amber-100", textColor: "text-amber-900", borderColor: "border-amber-400" },
  { id: "pine", name: "Сосна", color: "bg-yellow-100", textColor: "text-yellow-900", borderColor: "border-yellow-500" },
  { id: "oak", name: "Дуб", color: "bg-orange-100", textColor: "text-orange-900", borderColor: "border-orange-500" },
]

export function CustomOrderView() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CustomOrderFormData>({
    resolver: zodResolver(customOrderFormSchema),
    defaultValues: {
      diameter: 30,
      thickness: 3,
      quantity: 1,
      comment: "",
    },
  })

  const woodType = watch("woodType")
  const diameter = watch("diameter")
  const thickness = watch("thickness")
  const quantity = watch("quantity")

  const calculatePrice = () => {
    if (!woodType || !diameter || !thickness || !quantity) return 0
    const basePrice = 50
    const diameterMultiplier = diameter * 5
    const thicknessMultiplier = thickness * 10
    const woodMultiplier = woodType === "oak" ? 1.5 : woodType === "pine" ? 1 : 1.2
    return Math.round((basePrice + diameterMultiplier + thicknessMultiplier) * woodMultiplier * quantity)
  }

  const onSubmit = async (data: CustomOrderFormData) => {
    setIsSubmitting(true)
    console.log("[v0] Custom order form data:", data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <TreeDeciduous className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Индивидуальный распил</h1>
            <p className="text-xs text-muted-foreground">Создайте спил по своим размерам</p>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 p-4 space-y-6">
          {/* Wood Type Select */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Тип древесины</Label>
            {errors.woodType && <p className="text-xs text-destructive">{errors.woodType.message}</p>}
            <Controller
              name="woodType"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-3 gap-3">
                  {woodTypes.map((wood) => (
                    <button
                      key={wood.id}
                      type="button"
                      onClick={() => field.onChange(wood.id)}
                      className={cn(
                        "relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 active:scale-95",
                        wood.color,
                        field.value === wood.id
                          ? `${wood.borderColor} ring-2 ring-primary/20 shadow-md`
                          : "border-transparent",
                      )}
                    >
                      {/* Wood grain texture simulation */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 shadow-inner flex items-center justify-center overflow-hidden">
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            background:
                              wood.id === "birch"
                                ? "repeating-linear-gradient(90deg, #f5e6d3 0px, #e8d5c4 2px, #f5e6d3 4px)"
                                : wood.id === "pine"
                                  ? "repeating-linear-gradient(90deg, #e6c89c 0px, #d4a574 3px, #e6c89c 6px)"
                                  : "repeating-linear-gradient(90deg, #8b6914 0px, #6b4423 2px, #8b6914 4px)",
                          }}
                        />
                      </div>
                      <span className={cn("text-sm font-medium", wood.textColor)}>{wood.name}</span>
                      {/* Selection indicator */}
                      {field.value === wood.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Diameter Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Диаметр</Label>
              <span className="text-lg font-semibold text-primary">{diameter} см</span>
            </div>
            <Controller
              name="diameter"
              control={control}
              render={({ field }) => (
                <div className="px-1">
                  <Slider
                    value={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                    min={10}
                    max={100}
                    step={5}
                    className="py-2"
                  />
                </div>
              )}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10 см</span>
              <span>100 см</span>
            </div>
          </div>

          {/* Thickness Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Толщина</Label>
              <span className="text-lg font-semibold text-primary">{thickness} см</span>
            </div>
            <Controller
              name="thickness"
              control={control}
              render={({ field }) => (
                <div className="px-1">
                  <Slider
                    value={[field.value]}
                    onValueChange={(values) => field.onChange(values[0])}
                    min={2}
                    max={10}
                    step={1}
                    className="py-2"
                  />
                </div>
              )}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>2 см</span>
              <span>10 см</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Количество спилов</Label>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex items-center justify-between bg-secondary rounded-2xl p-2">
                    <button
                      type="button"
                      onClick={() => field.onChange(Math.max(1, field.value - 1))}
                      disabled={field.value <= 1}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95",
                        field.value <= 1
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-card text-foreground shadow-sm hover:bg-card/80",
                      )}
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-foreground">{field.value}</span>
                      <span className="text-xs text-muted-foreground">шт.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => field.onChange(Math.min(50, field.value + 1))}
                      disabled={field.value >= 50}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95",
                        field.value >= 50
                          ? "bg-muted text-muted-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
                      )}
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  {/* Quick quantity buttons */}
                  <div className="flex gap-2">
                    {[1, 5, 10, 20].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => field.onChange(num)}
                        className={cn(
                          "flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95",
                          field.value === num
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-muted-foreground hover:text-foreground border border-border",
                        )}
                      >
                        {num} шт
                      </button>
                    ))}
                  </div>
                </>
              )}
            />
          </div>

          {/* Comment Textarea */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Комментарий к заказу</Label>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <Textarea
                  placeholder="Дополнительные пожелания: шлифовка, покрытие маслом, особая форма..."
                  {...field}
                  className="min-h-[100px] rounded-xl resize-none text-base"
                />
              )}
            />
          </div>

          {/* Price Preview Card */}
          {woodType && (
            <div className="bg-secondary rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ориентировочная цена</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {quantity > 1
                      ? `${Math.round(calculatePrice() / quantity)} ₽ × ${quantity} шт`
                      : "Точная цена после подтверждения"}
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary">~{calculatePrice()} ₽</p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-20 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
          <Button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={`w-full h-14 rounded-2xl text-base font-semibold transition-all duration-300 ${
              isSubmitted ? "bg-green-500 hover:bg-green-500" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Отправляем...
              </span>
            ) : isSubmitted ? (
              <span className="flex items-center gap-2">✓ Заявка отправлена!</span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Рассчитать и отправить заявку
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
