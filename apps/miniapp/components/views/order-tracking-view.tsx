"use client"

import { ChevronLeft, Package, Truck, CheckCircle2, MapPin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface OrderTrackingViewProps {
  orderId: string
  onBack: () => void
}

const orderSteps = [
  { id: "paid", label: "Оплачен", icon: CheckCircle2, completed: true, date: "28 ноя, 14:30" },
  { id: "processing", label: "Собирается", icon: Package, completed: true, date: "28 ноя, 15:00" },
  { id: "shipped", label: "Отправлен", icon: Truck, completed: true, date: "29 ноя, 10:15" },
  { id: "delivered", label: "Доставлен", icon: MapPin, completed: false, date: "Ожидается 1 дек" },
]

export function OrderTrackingView({ orderId, onBack }: OrderTrackingViewProps) {
  const [copied, setCopied] = useState(false)
  const trackingNumber = "RU123456789CN"

  const copyTracking = async () => {
    await navigator.clipboard.writeText(trackingNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Заказ #{orderId}</h1>
            <p className="text-xs text-muted-foreground">Отслеживание доставки</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* Tracking Number */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Трек-номер Ozon</p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-foreground">{trackingNumber}</span>
            <Button variant="ghost" size="icon" onClick={copyTracking} className="h-8 w-8">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Статус доставки</h3>
          <div className="relative">
            {orderSteps.map((step, index) => {
              const Icon = step.icon
              const isLast = index === orderSteps.length - 1

              return (
                <div key={step.id} className="flex gap-4 pb-6 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                        step.completed ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${step.completed ? "text-primary-foreground" : "text-muted-foreground"}`}
                      />
                    </div>
                    {!isLast && (
                      <div
                        className={`absolute top-10 w-0.5 h-[calc(100%-2.5rem)] ${
                          step.completed ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p
                      className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pickup Point */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Пункт выдачи</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Ozon Пункт выдачи</p>
              <p className="text-xs text-muted-foreground">ул. Тверская, 15</p>
              <p className="text-xs text-muted-foreground mt-1">Пн-Вс: 10:00 - 22:00</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Состав заказа</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Береза шлифованная 20см × 2</span>
              <span className="text-foreground">700 ₽</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Пенек интерьерный × 1</span>
              <span className="text-foreground">1200 ₽</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Итого</span>
              <span className="font-bold text-primary">2199 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
