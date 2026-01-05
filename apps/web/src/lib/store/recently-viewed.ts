"use client"

import useSWR, { mutate } from "swr"
import type { Product } from "@/lib/data/products"

const RECENTLY_VIEWED_KEY = "spilwood-recently-viewed"
const MAX_ITEMS = 12

export interface RecentlyViewed {
  items: Product[]
  lastUpdated: number
}

function getInitialRecentlyViewed(): RecentlyViewed {
  if (typeof window === "undefined") return { items: [], lastUpdated: Date.now() }

  try {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY)
    if (stored) {
      return JSON.parse(stored) as RecentlyViewed
    }
  } catch {
    // ignore
  }
  return { items: [], lastUpdated: Date.now() }
}

function saveRecentlyViewed(data: RecentlyViewed) {
  if (typeof window !== "undefined") {
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(data))
  }
}

const recentlyViewedFetcher = (): RecentlyViewed => getInitialRecentlyViewed()

export function useRecentlyViewed() {
  const { data } = useSWR<RecentlyViewed>("recently-viewed", recentlyViewedFetcher, {
    fallbackData: { items: [], lastUpdated: Date.now() },
    revalidateOnFocus: false,
  })

  const addItem = (product: Product) => {
    const current = getInitialRecentlyViewed()
    // Remove if already exists
    const filtered = current.items.filter((item) => item.id !== product.id)
    // Add to front
    const newItems = [product, ...filtered].slice(0, MAX_ITEMS)
    const newData: RecentlyViewed = { items: newItems, lastUpdated: Date.now() }
    saveRecentlyViewed(newData)
    mutate("recently-viewed", newData, false)
  }

  const clearAll = () => {
    const newData: RecentlyViewed = { items: [], lastUpdated: Date.now() }
    saveRecentlyViewed(newData)
    mutate("recently-viewed", newData, false)
  }

  return {
    items: data?.items ?? [],
    addItem,
    clearAll,
  }
}
