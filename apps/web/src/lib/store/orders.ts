import useSWR, { mutate } from "swr"
import type { CartItem } from "./cart"

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"

export interface ShippingAddress {
  fullName: string
  phone: string
  email: string
  city: string
  address: string
  postalCode: string
  comment?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shipping: ShippingAddress
  status: OrderStatus
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

const ORDERS_KEY = "spilwood-orders"

function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(ORDERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }
}

export function useOrders() {
  const { data: orders } = useSWR<Order[]>("orders", getStoredOrders, {
    fallbackData: [],
    revalidateOnFocus: false,
  })

  const createOrder = (items: CartItem[], total: number, shipping: ShippingAddress): Order => {
    const order: Order = {
      id: `SPW-${Date.now().toString(36).toUpperCase()}`,
      items,
      total,
      shipping,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const currentOrders = getStoredOrders()
    const newOrders = [order, ...currentOrders]
    saveOrders(newOrders)
    mutate("orders", newOrders, false)

    return order
  }

  const getOrderById = (id: string): Order | undefined => {
    return orders?.find((order) => order.id === id)
  }

  return {
    orders: orders ?? [],
    createOrder,
    getOrderById,
  }
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Ожидает оплаты",
    confirmed: "Подтверждён",
    processing: "В обработке",
    shipped: "Отправлен",
    delivered: "Доставлен",
    cancelled: "Отменён",
  }
  return labels[status]
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-cyan-100 text-cyan-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }
  return colors[status]
}
