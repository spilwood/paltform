"use client"

import { useEffect } from "react"
import { useRecentlyViewed } from "@/lib/store/recently-viewed"
import type { Product } from "@/lib/data/products"

interface ProductViewTrackerProps {
  product: Product
}

export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  const { addItem } = useRecentlyViewed()

  useEffect(() => {
    // Small delay to avoid tracking on quick navigations
    const timeout = setTimeout(() => {
      addItem(product)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [product, addItem])

  return null
}
