"use client"

import { ProductCard } from "./product-card"
import { ProductGridSkeleton } from "./product-card-skeleton"
import type { Product } from "@/lib/data/products"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useEffect, useState } from "react"

interface ProductGridProps {
  products: Product[]
  showSkeleton?: boolean
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, showSkeleton = false, columns = 4 }: ProductGridProps) {
  const [isLoading, setIsLoading] = useState(showSkeleton)

  useEffect(() => {
    if (showSkeleton) {
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [showSkeleton])

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }

  if (isLoading) {
    return <ProductGridSkeleton count={products.length || 4} />
  }

  return (
    <div className={`grid gap-6 md:gap-8 ${gridCols[columns]}`}>
      {products.map((product, index) => (
        <ScrollAnimation key={product.id} animation="fade-up" delay={50 + index * 50}>
          <ProductCard
            product={product}
            priority={index < 4} // First 4 products load with priority
          />
        </ScrollAnimation>
      ))}
    </div>
  )
}
