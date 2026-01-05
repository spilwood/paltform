"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/cart"
import type { Product } from "@/lib/data/products"
import { ShoppingBag, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  variant = "default",
  size = "lg",
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    toast.success("Добавлено в корзину", {
      description: `${product.name} × ${quantity}`,
      action: {
        label: "В корзину",
        onClick: () => (window.location.href = "/checkout"),
      },
    })
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={!product.inStock || added}
      className={`rounded-none ${className}`}
      variant={variant}
      size={size}
    >
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Добавлено
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.inStock ? "В корзину" : "Нет в наличии"}
        </>
      )}
    </Button>
  )
}
