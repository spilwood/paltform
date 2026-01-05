"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface ProductReview {
  id: string
  author: string
  rating: number
  text: string
  date: string
  photos?: string[]
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  description?: string
  origin?: string
  diameter?: string
  thickness?: string
  features?: string[]
  rating?: number
  reviewCount?: number
  popularity?: number
  addedDate?: Date
  stock?: number
  relatedProducts?: string[]
  reviews?: ProductReview[]
  sellerId?: string
  sellerName?: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  toastMessage: string
  showToast: boolean
  hideToast: () => void
  viewedProducts: Product[]
  addViewedProduct: (product: Product) => void
  flyAnimationStart: { x: number; y: number } | null
  triggerFlyAnimation: (x: number, y: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [viewedProducts, setViewedProducts] = useState<Product[]>([])
  const [flyAnimationStart, setFlyAnimationStart] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const savedCart = localStorage.getItem("spilwood_cart")
    const savedViewed = localStorage.getItem("spilwood_viewed")

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to load cart from localStorage", e)
      }
    }

    if (savedViewed) {
      try {
        setViewedProducts(JSON.parse(savedViewed))
      } catch (e) {
        console.error("Failed to load viewed products from localStorage", e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("spilwood_cart", JSON.stringify(items))
  }, [items])

  useEffect(() => {
    localStorage.setItem("spilwood_viewed", JSON.stringify(viewedProducts))
  }, [viewedProducts])

  const addItem = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setToastMessage(`${product.name} добавлен в корзину`)
    setShowToast(true)

    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium")
    }
  }

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => setItems([])

  const addViewedProduct = useCallback((product: Product) => {
    setViewedProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id)
      return [...filtered, product].slice(-10)
    })
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const hideToast = useCallback(() => {
    setShowToast(false)
  }, [])

  const triggerFlyAnimation = useCallback((x: number, y: number) => {
    setFlyAnimationStart({ x, y })
    setTimeout(() => setFlyAnimationStart(null), 600)
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        toastMessage,
        showToast,
        hideToast,
        viewedProducts,
        addViewedProduct,
        flyAnimationStart,
        triggerFlyAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        HapticFeedback?: {
          impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
          notificationOccurred: (type: "error" | "success" | "warning") => void
          selectionChanged: () => void
        }
      }
    }
  }
}
