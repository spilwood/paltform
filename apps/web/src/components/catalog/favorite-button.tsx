"use client"

import type React from "react"

import { Button } from "@spilwood/ui"
import { Heart } from "lucide-react"
import { useFavorites } from "@/lib/store/favorites"
import type { Product } from "@/lib/data/products"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  product: Product
  variant?: "icon" | "default"
  className?: string
}

export function FavoriteButton({ product, variant = "icon", className }: FavoriteButtonProps) {
  const { toggleItem, isFavorite } = useFavorites()
  const isActive = isFavorite(product.id)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    if (!isActive) {
      toast.success("Добавлено в избранное", {
        description: product.name,
      })
    } else {
      toast.info("Удалено из избранного", {
        description: product.name,
      })
    }
  }

  if (variant === "icon") {
    return (
      <Button
        variant="secondary"
        size="icon"
        onClick={handleToggle}
        className={cn("h-8 w-8 bg-background/90 backdrop-blur-sm", className)}
        aria-label={isActive ? "Удалить из избранного" : "Добавить в избранное"}
      >
        <Heart className={cn("h-4 w-4 transition-colors", isActive && "fill-red-500 text-red-500")} />
      </Button>
    )
  }

  return (
    <Button variant={isActive ? "default" : "outline"} onClick={handleToggle} className={className}>
      <Heart className={cn("mr-2 h-4 w-4", isActive && "fill-current")} />
      {isActive ? "В избранном" : "В избранное"}
    </Button>
  )
}
