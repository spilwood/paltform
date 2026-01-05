import useSWR, { mutate } from "swr"
import type { Product } from "@/lib/data/products"

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

const CART_KEY = "spilwood-cart"

function getInitialCart(): Cart {
  if (typeof window === "undefined") return { items: [], total: 0 }

  try {
    const stored = localStorage.getItem(CART_KEY)
    if (stored) {
      const cart = JSON.parse(stored) as Cart
      return cart
    }
  } catch {
    // ignore
  }
  return { items: [], total: 0 }
}

function saveCart(cart: Cart) {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

// SWR fetcher for cart
const cartFetcher = (): Cart => getInitialCart()

export function useCart() {
  const { data: cart } = useSWR<Cart>("cart", cartFetcher, {
    fallbackData: { items: [], total: 0 },
    revalidateOnFocus: false,
  })

  const addItem = (product: Product, quantity = 1) => {
    const currentCart = getInitialCart()
    const existingIndex = currentCart.items.findIndex((item) => item.product.id === product.id)

    let newItems: CartItem[]
    if (existingIndex >= 0) {
      newItems = currentCart.items.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item,
      )
    } else {
      newItems = [...currentCart.items, { product, quantity }]
    }

    const newCart: Cart = { items: newItems, total: calculateTotal(newItems) }
    saveCart(newCart)
    mutate("cart", newCart, false)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const currentCart = getInitialCart()
    const newItems =
      quantity > 0
        ? currentCart.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        : currentCart.items.filter((item) => item.product.id !== productId)

    const newCart: Cart = { items: newItems, total: calculateTotal(newItems) }
    saveCart(newCart)
    mutate("cart", newCart, false)
  }

  const removeItem = (productId: string) => {
    const currentCart = getInitialCart()
    const newItems = currentCart.items.filter((item) => item.product.id !== productId)
    const newCart: Cart = { items: newItems, total: calculateTotal(newItems) }
    saveCart(newCart)
    mutate("cart", newCart, false)
  }

  const clearCart = () => {
    const newCart: Cart = { items: [], total: 0 }
    saveCart(newCart)
    mutate("cart", newCart, false)
  }

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return {
    cart: cart ?? { items: [], total: 0 },
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }
}
