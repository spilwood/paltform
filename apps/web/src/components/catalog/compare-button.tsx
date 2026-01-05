"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { GitCompareArrows, Check } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { useCompare } from "@/lib/store/compare"

interface CompareButtonProps {
  product: Product
  variant?: "icon" | "full"
}

export function CompareButton({ product, variant = "icon" }: CompareButtonProps) {
  const { addItem, removeItem, isInCompare, items } = useCompare()
  const inCompare = isInCompare(product.id)
  const isFull = items.length >= 4

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inCompare) {
      removeItem(product.id)
    } else if (!isFull) {
      addItem(product)
    }
  }

  if (variant === "icon") {
    return (
      <Button
        size="icon"
        variant={inCompare ? "default" : "outline"}
        className="h-8 w-8"
        onClick={handleClick}
        disabled={!inCompare && isFull}
        title={inCompare ? "Убрать из сравнения" : "Добавить к сравнению"}
      >
        {inCompare ? <Check className="h-4 w-4" /> : <GitCompareArrows className="h-4 w-4" />}
      </Button>
    )
  }

  return (
    <Button size="sm" variant={inCompare ? "default" : "outline"} onClick={handleClick} disabled={!inCompare && isFull}>
      {inCompare ? (
        <>
          <Check className="h-3 w-3" />В сравнении
        </>
      ) : (
        <>
          <GitCompareArrows className="h-3 w-3" />
          Сравнить
        </>
      )}
    </Button>
  )
}
