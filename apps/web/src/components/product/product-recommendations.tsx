"use client"

import { useMemo } from "react"
import { products, type Product } from "@/lib/data/products"
import { ProductCard } from "@/components/catalog/product-card"
import { useRecentlyViewed } from "@/lib/store/recently-viewed"

interface ProductRecommendationsProps {
  currentProduct?: Product
  maxItems?: number
}

export function ProductRecommendations({ currentProduct, maxItems = 4 }: ProductRecommendationsProps) {
  const { items: recentlyViewed } = useRecentlyViewed()

  const recommendations = useMemo(() => {
    // Get categories from recently viewed items
    const viewedCategories = recentlyViewed.map((p) => p.category)
    const viewedIds = new Set(recentlyViewed.map((p) => p.id))

    // Filter out current product and already viewed products
    let candidates = products.filter((p) => {
      if (currentProduct && p.id === currentProduct.id) return false
      if (viewedIds.has(p.id)) return false
      return true
    })

    // Sort by relevance (same category as recently viewed gets priority)
    candidates = candidates.sort((a, b) => {
      const aScore = viewedCategories.filter((c) => c === a.category).length
      const bScore = viewedCategories.filter((c) => c === b.category).length

      // If same category relevance, prioritize in-stock items
      if (aScore === bScore) {
        if (a.inStock && !b.inStock) return -1
        if (!a.inStock && b.inStock) return 1
        return 0
      }

      return bScore - aScore
    })

    return candidates.slice(0, maxItems)
  }, [recentlyViewed, currentProduct, maxItems])

  if (recommendations.length === 0) return null

  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Рекомендуем</span>
        <h2 className="mt-2 text-2xl font-light tracking-tight">Вам может понравиться</h2>
        <div className="mt-8 grid gap-6 grid-cols-2 md:grid-cols-4">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
