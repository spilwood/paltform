"use client"

import { ChevronLeft, Heart, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/wishlist-context"
import { useCart } from "@/lib/cart-context"

interface WishlistViewProps {
  onBack: () => void
}

export function WishlistView({ onBack }: WishlistViewProps) {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (product: any) => {
    addItem(product)
    removeFromWishlist(product.id)
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">Избранное</h1>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Пока пусто</h2>
          <p className="text-sm text-muted-foreground">Добавляйте товары в избранное, чтобы не потерять их</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Избранное</h1>
              <p className="text-xs text-muted-foreground">{items.length} товаров</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={clearWishlist} className="text-muted-foreground">
            <Trash2 className="h-4 w-4 mr-1" />
            Очистить
          </Button>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 bg-card rounded-2xl p-3 border border-border">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground line-clamp-2 mb-1">{item.name}</h3>
              <p className="text-base font-semibold text-primary">{item.price} ₽</p>
              <div className="flex items-center gap-2 mt-2">
                <Button size="sm" onClick={() => handleAddToCart(item)} className="h-8 rounded-lg text-xs gap-1">
                  <Plus className="h-3 w-3" />В корзину
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(item.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
