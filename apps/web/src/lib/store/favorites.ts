"use client"

import useSWR, { mutate } from "swr"
import type { Product } from "@/lib/data/products"

const FAVORITES_KEY = "spilwood-favorites"

export interface Favorites {
  items: Product[]
}

function getInitialFavorites(): Favorites {
  if (typeof window === "undefined") return { items: [] }

  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (stored) {
      return JSON.parse(stored) as Favorites
    }
  } catch {
    // ignore
  }
  return { items: [] }
}

function saveFavorites(data: Favorites) {
  if (typeof window !== "undefined") {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data))
  }
}

const favoritesFetcher = (): Favorites => getInitialFavorites()

export function useFavorites() {
  const { data } = useSWR<Favorites>("favorites", favoritesFetcher, {
    fallbackData: { items: [] },
    revalidateOnFocus: false,
  })

  const addItem = (product: Product) => {
    const current = getInitialFavorites()
    if (current.items.some((item) => item.id === product.id)) return
    const newItems = [...current.items, product]
    const newData: Favorites = { items: newItems }
    saveFavorites(newData)
    mutate("favorites", newData, false)
  }

  const removeItem = (productId: string) => {
    const current = getInitialFavorites()
    const newItems = current.items.filter((item) => item.id !== productId)
    const newData: Favorites = { items: newItems }
    saveFavorites(newData)
    mutate("favorites", newData, false)
  }

  const toggleItem = (product: Product) => {
    const current = getInitialFavorites()
    const exists = current.items.some((item) => item.id === product.id)
    if (exists) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const isFavorite = (productId: string) => {
    return data?.items.some((item) => item.id === productId) ?? false
  }

  const clearAll = () => {
    const newData: Favorites = { items: [] }
    saveFavorites(newData)
    mutate("favorites", newData, false)
  }

  return {
    items: data?.items ?? [],
    count: data?.items.length ?? 0,
    addItem,
    removeItem,
    toggleItem,
    isFavorite,
    clearAll,
  }
}
