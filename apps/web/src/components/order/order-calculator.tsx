"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@spilwood/ui"
import { Label } from "@spilwood/ui"
import { Slider } from "@spilwood/ui"
import { Badge } from "@spilwood/ui"
import { Button } from "@spilwood/ui"
import { Input } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { ToggleGroup, ToggleGroupItem } from "@spilwood/ui"
import { TreePine, TreeDeciduous, CircleDot, Layers, Calculator, ArrowRight, Check, Percent } from "lucide-react"
import Link from "next/link"

type WoodType = "birch" | "pine"
type ProductType = "slice" | "stump"
type Processing = "raw" | "sanded" | "oiled"

interface CalculatorState {
  woodType: WoodType
  productType: ProductType
  diameter: number
  thickness: number
  quantity: number
  processing: Processing
}

const processingLabels: Record<Processing, string> = {
  raw: "Без обработки",
  sanded: "Шлифовка",
  oiled: "Шлифовка + масло",
}

const processingMultipliers: Record<Processing, number> = {
  raw: 1,
  sanded: 1.3,
  oiled: 1.6,
}

export function OrderCalculator() {
  const [state, setState] = useState<CalculatorState>({
    woodType: "birch",
    productType: "slice",
    diameter: 20,
    thickness: 3,
    quantity: 10,
    processing: "raw",
  })

  const price = useMemo(() => {
    const basePrice = state.woodType === "birch" ? 80 : 60
    const productMultiplier = state.productType === "stump" ? 2.5 : 1
    const processingMultiplier = processingMultipliers[state.processing]
    const diameterFactor = state.diameter / 10
    const thicknessFactor = state.productType === "slice" ? state.thickness / 2 : state.thickness / 10

    const pricePerUnit = Math.round(
      basePrice * productMultiplier * processingMultiplier * diameterFactor * thicknessFactor,
    )

    return {
      perUnit: pricePerUnit,
      total: pricePerUnit * state.quantity,
      discount: state.quantity >= 50 ? 0.1 : state.quantity >= 20 ? 0.05 : 0,
    }
  }, [state])

  const finalTotal = Math.round(price.total * (1 - price.discount))

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <CardHeader className="space-y-1 border-b bg-muted/30 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg">Калькулятор стоимости</CardTitle>
              <CardDescription className="text-sm">Рассчитайте стоимость заказа онлайн</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="hidden gap-1.5 sm:flex">
            <Percent className="h-3 w-3" />
            до 10% скидка
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-6">
        {/* Wood Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Порода дерева</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, woodType: "birch" }))}
              className={`group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all ${
                state.woodType === "birch"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/birch-wood-slices-stacked-natural-white-bark.jpg"
                  alt="Берёза"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreeDeciduous className="h-4 w-4 text-primary" />
                    <span className="font-medium">Берёза</span>
                  </div>
                  {state.woodType === "birch" && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Светлая, прочная, с красивой текстурой</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  от 80 ₽
                </Badge>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, woodType: "pine" }))}
              className={`group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all ${
                state.woodType === "pine"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/pine-wood-slice-distinct-amber-rings.jpg"
                  alt="Сосна"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TreePine className="h-4 w-4 text-primary" />
                    <span className="font-medium">Сосна</span>
                  </div>
                  {state.woodType === "pine" && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Тёплый оттенок, выразительные годичные кольца</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  от 60 ₽
                </Badge>
              </div>
            </button>
          </div>
        </div>

        {/* Product Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Тип изделия</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, productType: "slice", thickness: 3 }))}
              className={`group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all ${
                state.productType === "slice"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/pine-wood-slice-rings-natural-pattern.jpg"
                  alt="Спил дерева"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-4 w-4 text-primary" />
                    <span className="font-medium">Спил</span>
                  </div>
                  {state.productType === "slice" && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Тонкий срез 1-5 см для декора и поделок</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setState((s) => ({ ...s, productType: "stump", thickness: 15 }))}
              className={`group relative overflow-hidden rounded-xl border-2 p-0 text-left transition-all ${
                state.productType === "stump"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/wooden-stump-rustic-decor-natural.jpg"
                  alt="Пенёк"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    <span className="font-medium">Пенёк</span>
                  </div>
                  {state.productType === "stump" && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Высокий пенёк 10-40 см для мебели</p>
              </div>
            </button>
          </div>
        </div>

        {/* Diameter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Диаметр</Label>
            <Badge variant="secondary" className="font-mono">
              {state.diameter} см
            </Badge>
          </div>
          <Slider
            value={[state.diameter]}
            onValueChange={([v]) => setState((s) => ({ ...s, diameter: v }))}
            min={5}
            max={40}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 см</span>
            <span>40 см</span>
          </div>
        </div>

        {/* Thickness/Height */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{state.productType === "slice" ? "Толщина" : "Высота"}</Label>
            <Badge variant="secondary" className="font-mono">
              {state.thickness} см
            </Badge>
          </div>
          <Slider
            value={[state.thickness]}
            onValueChange={([v]) => setState((s) => ({ ...s, thickness: v }))}
            min={state.productType === "slice" ? 1 : 10}
            max={state.productType === "slice" ? 5 : 40}
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{state.productType === "slice" ? "1 см" : "10 см"}</span>
            <span>{state.productType === "slice" ? "5 см" : "40 см"}</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Количество</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={1}
              max={1000}
              value={state.quantity}
              onChange={(e) => setState((s) => ({ ...s, quantity: Math.max(1, Number.parseInt(e.target.value, 10) || 1) }))}
              className="w-24 text-center font-mono"
            />
            <span className="text-sm text-muted-foreground">штук</span>
            {price.discount > 0 && (
              <Badge variant="default" className="ml-auto">
                Скидка {price.discount * 100}%
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">От 20 шт. — скидка 5%, от 50 шт. — скидка 10%</p>
        </div>

        {/* Processing */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Обработка</Label>
          <ToggleGroup
            type="single"
            value={state.processing}
            onValueChange={(v) => v && setState((s) => ({ ...s, processing: v as Processing }))}
            className="flex flex-wrap gap-2"
          >
            {(Object.keys(processingLabels) as Processing[]).map((p) => (
              <ToggleGroupItem
                key={p}
                value={p}
                className="px-4 data-[state=on]:border-primary data-[state=on]:bg-primary/5"
              >
                {processingLabels[p]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Separator />

        {/* Price Summary */}
        <div className="space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Цена за 1 шт.</span>
            <span className="font-mono">{price.perUnit} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Количество</span>
            <span className="font-mono">{state.quantity} шт.</span>
          </div>
          {price.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Скидка {price.discount * 100}%</span>
              <span className="font-mono">-{Math.round(price.total * price.discount)} ₽</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between">
            <span className="font-medium">Итого</span>
            <span className="text-2xl font-semibold">{finalTotal.toLocaleString("ru-RU")} ₽</span>
          </div>
          <p className="text-xs text-muted-foreground">* Окончательная цена после согласования деталей заказа</p>
        </div>

        <Button size="lg" className="w-full" asChild>
          <Link href="/zakaz">
            Оформить заказ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
