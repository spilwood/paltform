"use client"

import { useRecentlyViewed } from "@/lib/store/recently-viewed"
import { ProductCard } from "@/components/catalog/product-card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function RecentlyViewed() {
  const { items, clearAll } = useRecentlyViewed()

  if (items.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Недавно просмотренные
            </span>
            <h2 className="mt-2 text-2xl font-light tracking-tight">Вы смотрели</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            <X className="mr-2 h-4 w-4" />
            Очистить
          </Button>
        </div>
        <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {items.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
