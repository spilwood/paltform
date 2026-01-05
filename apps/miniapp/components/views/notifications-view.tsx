"use client"

import { useState } from "react"
import { Bell, Truck, CheckCircle2, Clock, Tag, Settings, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications, type Notification } from "@/lib/notifications-context"
import { hapticFeedback } from "@/lib/telegram"

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return "Только что"
  if (diffMins < 60) return `${diffMins} мин. назад`
  if (diffHours < 24) return `${diffHours} ч. назад`
  if (diffDays < 7) return `${diffDays} дн. назад`
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
}

const orderStatusIcons = {
  processing: { icon: Clock, color: "text-amber-500 bg-amber-500/20" },
  shipping: { icon: Truck, color: "text-blue-500 bg-blue-500/20" },
  delivered: { icon: CheckCircle2, color: "text-green-500 bg-green-500/20" },
}

export function NotificationsView() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id)
      hapticFeedback("selection")
    }
    setSelectedNotification(notification)
  }

  const handleMarkAllRead = () => {
    markAllAsRead()
    hapticFeedback("notification", "success")
  }

  const handleClearAll = () => {
    clearNotifications()
    hapticFeedback("notification", "warning")
  }

  const getNotificationIcon = (notification: Notification) => {
    if (notification.type === "order" && notification.orderStatus) {
      const status = orderStatusIcons[notification.orderStatus]
      return { Icon: status.icon, className: status.color }
    }
    if (notification.type === "promo") {
      return { Icon: Tag, className: "text-primary bg-primary/20" }
    }
    return { Icon: Bell, className: "text-muted-foreground bg-muted" }
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-foreground">Уведомления</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {unreadCount} новых
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">Статус заказов и акции</p>

        {/* Action buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-2 mt-4">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllRead}
                className="flex-1 h-9 rounded-xl text-xs bg-transparent"
              >
                <Check className="h-3.5 w-3.5 mr-1.5" />
                Прочитать все
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="flex-1 h-9 rounded-xl text-xs text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Очистить
            </Button>
          </div>
        )}
      </header>

      {/* Notifications list */}
      <div className="flex-1 overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Нет уведомлений</h3>
            <p className="text-sm text-muted-foreground max-w-[240px]">
              Здесь будут появляться уведомления о статусе ваших заказов и акциях
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const { Icon, className } = getNotificationIcon(notification)
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left bg-card rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                    notification.read ? "border-border" : "border-primary/50 bg-primary/5"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${className}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-medium text-foreground ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{notification.message}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">{formatTimeAgo(notification.timestamp)}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Notification settings hint */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Уведомления приходят автоматически при изменении статуса заказа
          </p>
        </div>
      </div>
    </div>
  )
}
