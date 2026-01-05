"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/data/products"

interface CompareState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearAll: () => void
  isInCompare: (productId: string) => boolean
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items
        if (items.length >= 4) return // Max 4 items
        if (items.find((p) => p.id === product.id)) return
        set({ items: [...items, product] })
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((p) => p.id !== productId) })
      },
      clearAll: () => set({ items: [] }),
      isInCompare: (productId) => get().items.some((p) => p.id === productId),
    }),
    {
      name: "compare-storage",
    },
  ),
)
