"use client"

import { Truck, Package, Shield, Minus, Plus } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { useState } from "react"
import { Badge } from "@spilwood/ui"
import { Separator } from "@spilwood/ui"
import { Button } from "@spilwood/ui"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={product.inStock ? "default" : "secondary"}>
            {product.inStock ? "В наличии" : "Нет в наличии"}
          </Badge>
          <Badge variant="outline">{product.categoryName}</Badge>
          <Badge variant="outline" className="text-muted-foreground">
            SPW-{product.id.padStart(4, "0")}
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{product.name}</h1>
        <p className="text-4xl font-bold text-primary">{product.price} ₽</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Характеристики</h3>
        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Диаметр</span>
            <span className="font-medium">{product.diameter} см</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Толщина</span>
            <span className="font-medium">{product.thickness} см</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">Порода</span>
            <span className="font-medium">
              {product.category === "bereza" ? "Берёза" : product.category === "sosna" ? "Сосна" : "Берёза"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border bg-card/50 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Количество</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex h-9 w-14 items-center justify-center rounded-md border bg-background text-sm font-medium">
              {quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 bg-transparent"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <AddToCartButton product={product} quantity={quantity} className="w-full h-12 text-base" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/30 p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Truck className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Доставка по РФ</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/30 p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Надёжная упаковка</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/30 p-4 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Гарантия качества</span>
        </div>
      </div>
    </div>
  )
}
