"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "order" | "promo" | "system"
  orderId?: string
  orderStatus?: "processing" | "shipping" | "delivered"
  read: boolean
  timestamp: Date
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

const STORAGE_KEY = "spilwood_notifications"

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setNotifications(parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) })))
      } catch (e) {
        console.error("Failed to load notifications", e)
      }
    }

    // Add demo notifications if empty
    if (!saved) {
      const demoNotifications: Notification[] = [
        {
          id: "demo-1",
          title: "Заказ отправлен",
          message: "Ваш заказ #SW-2847 передан в службу доставки Ozon",
          type: "order",
          orderId: "SW-2847",
          orderStatus: "shipping",
          read: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        },
        {
          id: "demo-2",
          title: "Заказ принят",
          message: "Ваш заказ #SW-2831 принят в обработку. Ожидайте уведомление об отправке.",
          type: "order",
          orderId: "SW-2831",
          orderStatus: "processing",
          read: false,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        },
        {
          id: "demo-3",
          title: "Скидка 15%",
          message: "Используйте промокод WINTER15 на все товары из сосны до конца недели!",
          type: "promo",
          read: true,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
      ]
      setNotifications(demoNotifications)
    }
  }, [])

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false,
      timestamp: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])

    // Trigger haptic feedback
    if (typeof window !== "undefined" && window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success")
    }
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}
